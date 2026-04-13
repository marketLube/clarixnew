import { isValidObjectId } from 'mongoose';
import type { Request, Response } from 'express';
import { asyncHandler, ApiResponse, ApiError, deleteFileFromS3 } from '../../../utils/index.js';
import { Course } from '../models/courseModel.js';
import { College } from '../../colleges/models/collegeModel.js';
import { Stream } from '../../streams/model/streamModel.js';

const capitalize = (str: string) => {
    if (!str) return str;
    // For now, let's just return as is or trim it, 
    // because aggressive capitalization breaks names like "Science & Research"
    return str.trim();
};


const calculateFeesRange = (courses: any[]) => {
    if (!courses || !Array.isArray(courses) || courses.length === 0) return 'N/A';

    const fees = courses
        .map((c: any) => {
            const feeStr = c.fees?.toString().replace(/[^0-9.]/g, '');
            return feeStr ? parseFloat(feeStr) : NaN;
        })
        .filter((f: any) => !isNaN(f));

    if (fees.length === 0) return 'N/A';

    const minFee = Math.min(...fees);
    const maxFee = Math.max(...fees);

    const formatNumber = (num: number) => {
        if (num >= 100000) return `${(num / 100000).toFixed(1).replace(/\.0$/, '')}L`;
        if (num >= 1000) return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
        return num.toString();
    };

    return minFee === maxFee
        ? `₹${formatNumber(minFee)}`
        : `₹${formatNumber(minFee)} - ₹${formatNumber(maxFee)}`;
};

const parseJSON = (value: any) => {
    if (!value) return undefined;
    if (typeof value === 'string') {
        try {
            return JSON.parse(value);
        } catch {
            return value;
        }
    }
    return value;
};


const listCourses = asyncHandler(async (req: Request, res: Response) => {
    const {
        page = 1,
        limit = 10,
        search,
        type,
        sortBy = 'createdAt',
        order = 'desc'
    } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build query filter
    const filter: any = {};

    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: 'i' } },
            { 'description.content': { $regex: search, $options: 'i' } },
        ];
    }

    if (type && type !== 'all') {
        filter.type = type;
    }

    // Build sort object
    const sortField = sortBy as string;
    const sortOrder = order === 'desc' ? -1 : 1;

    // Execute query
    const [courses, total] = await Promise.all([
        Course.find(filter)
            .sort([[sortField, sortOrder]])
            .populate('stream', 'name')
            .skip(skip)
            .limit(limitNum)
            .lean(),
        Course.countDocuments(filter),
    ]);

    return ApiResponse.success(
        res,
        200,
        {
            courses,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum),
            },
        },
        'Courses fetched successfully'
    );
});


const createCourse = asyncHandler(async (req: Request, res: Response) => {
    const courseData = req.body;
    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] };

    // Extract uploaded file URLs
    const cardImage = files?.cardImage?.[0]?.location;
    const heroImage = files?.heroImage?.[0]?.location;
    const descriptionImage = files?.descriptionImage?.[0]?.location;

    // Parse JSON fields from FormData
    const eligibility = parseJSON(courseData.eligibility) || [];
    const descriptionObj = parseJSON(courseData.description) || {};
    const whyChoose = parseJSON(courseData.whyChoose) || {};
    const syllabus = parseJSON(courseData.syllabus) || {};
    const careerOpportunities = parseJSON(courseData.careerOpportunities) || {};
    const about = parseJSON(courseData.about) || {};
    const faqs = parseJSON(courseData.faqs) || {};

    // Sanitize description image field
    if (descriptionObj.image === '[object Object]') {
        descriptionObj.image = undefined;
    }

    // Build course data object with proper structure
    const processedData = {
        name: courseData.name,
        shortDescription: courseData.shortDescription,
        stream: courseData.stream,
        type: courseData.type,
        duration: courseData.duration,
        fees: courseData.fees,
        intakeCapacity: courseData.intakeCapacity,
        eligibility,
        cardImage: cardImage || '',
        heroImage: heroImage || '',
        description: {
            title: descriptionObj.title || '',
            content: descriptionObj.content || '',
            image: descriptionImage || descriptionObj.image || '',
        },
        whyChoose: {
            title: whyChoose.title || '',
            description: whyChoose.description || '',
            reasons: whyChoose.reasons || [],
        },
        syllabus: {
            title: syllabus.title || '',
            semesters: syllabus.semesters || [],
        },
        careerOpportunities: {
            title: careerOpportunities.title || '',
            items: careerOpportunities.items || [],
        },
        about: {
            title: about.title || '',
            description: about.description || '',
            points: about.points || [],
        },
        faqs: {
            title: faqs.title || '',
            description: faqs.description || '',
            items: faqs.items || [],
        },
    };

    // Create and save new course
    const newCourse = new Course(processedData);
    await newCourse.save();

    // Populate stream before returning
    // Stream is now a string, no need to populate

    return ApiResponse.created(
        res,
        newCourse,
        'Course created successfully'
    );
});

const updateCourse = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] };

    // Extract uploaded file URLs
    const cardImage = files?.cardImage?.[0]?.location;
    const heroImage = files?.heroImage?.[0]?.location;
    const descriptionImage = files?.descriptionImage?.[0]?.location;

    // Fetch existing course to delete old images if new ones are uploaded
    const existingCourse = await Course.findById(id);
    if (!existingCourse) {
        throw new ApiError(404, 'Course not found');
    }

    // Delete old files from S3 if new files are being uploaded
    if (cardImage && existingCourse.cardImage) {
        await deleteFileFromS3(existingCourse.cardImage);
    }
    if (heroImage && existingCourse.heroImage) {
        await deleteFileFromS3(existingCourse.heroImage);
    }
    if (descriptionImage && existingCourse.description?.image) {
        await deleteFileFromS3(existingCourse.description.image);
    }

    // Parse JSON fields
    const processedUpdateData: any = {};

    // Parse and assign fields that may be JSON strings
    const jsonFields = ['eligibility', 'whyChoose', 'syllabus', 'careerOpportunities', 'description', 'about', 'faqs'];
    jsonFields.forEach(field => {
        if (updateData[field]) {
            const parsed = parseJSON(updateData[field]);
            // For description, preserve the existing image if not being updated
            if (field === 'description' && parsed) {
                processedUpdateData[field] = {
                    ...parsed,
                    // Keep existing image if no new one is uploaded
                    image: descriptionImage || parsed.image || existingCourse.description?.image
                };
            } else {
                processedUpdateData[field] = parsed;
            }
        }
    });

    // Copy over non-JSON fields
    const directFields = ['name', 'shortDescription', 'stream', 'type', 'duration', 'fees', 'intakeCapacity'];
    directFields.forEach(field => {
        if (updateData[field] !== undefined) {
            processedUpdateData[field] = updateData[field];
        }
    });

    // Handle image updates
    if (cardImage) processedUpdateData.cardImage = cardImage;
    if (heroImage) processedUpdateData.heroImage = heroImage;

    // Update course
    const updatedCourse = await Course.findByIdAndUpdate(
        id,
        { $set: processedUpdateData },
        { new: true, runValidators: true }
    ).lean();

    if (!updatedCourse) {
        throw new ApiError(404, 'Course not found');
    }

    return ApiResponse.success(
        res,
        200,
        updatedCourse,
        'Course updated successfully'
    );
});

const getCourseById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const course = await Course.findById(id)
        .populate('stream', 'name')
        .lean();

    if (!course) {
        throw new ApiError(404, 'Course not found');
    }

    // Find colleges that offer this course
    const collegesData = await College.find({ courses: id } as any).populate('university')
        .populate('recruiters')
        .populate('scholarships').
        limit(4)
        .lean();

    const colleges = collegesData.map((college: any) => ({
        ...college,
        annualFeesRange: calculateFeesRange(college.courses)
    }));

    return ApiResponse.success(
        res,
        200,
        {
            ...course,
            colleges: colleges || []
        },
        'Course fetched successfully'
    );
});

const deleteCourse = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
        throw new ApiError(404, 'Course not found');
    }

    return ApiResponse.success(
        res,
        200,
        { id },
        'Course deleted successfully'
    );
});

export const courseController = {
    listCourses,
    createCourse,
    updateCourse,
    getCourseById,
    deleteCourse,
};

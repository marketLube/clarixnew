import { Types, isValidObjectId } from 'mongoose';
import type { Request, Response, NextFunction } from 'express';
import { asyncHandler, ApiResponse, ApiError, deleteFileFromS3 } from '../../../utils/index.js';
import { College } from '../models/collegeModel.js';
import { Course } from '../../courses/models/courseModel.js';
import { Stream } from '../../streams/model/streamModel.js';

/**
 * Parse a single fee value from a string.
 * Handles formats like:
 *   "₹2,09,550 / year (IITs)" → 209550
 *   "₹50,000"                 → 50000
 *   "₹5,00,000"               → 500000
 *   "15 Lakh"                  → 1500000
 *   "2.5L"                     → 250000
 */
const parseSingleFee = (str: string): number => {
    const cleaned = str.trim();

    // Check for "Lakh" or "L" multiplier
    const lakhMatch = cleaned.match(/([\d,.]+)\s*(?:lakh|lac|l)\b/i);
    if (lakhMatch) {
        const num = parseFloat(lakhMatch[1]!.replace(/,/g, ''));
        return isNaN(num) ? NaN : num * 100000;
    }

    // Check for "Crore" or "Cr" multiplier
    const croreMatch = cleaned.match(/([\d,.]+)\s*(?:crore|cr)\b/i);
    if (croreMatch) {
        const num = parseFloat(croreMatch[1]!.replace(/,/g, ''));
        return isNaN(num) ? NaN : num * 10000000;
    }

    // Check for "K" multiplier
    const kMatch = cleaned.match(/([\d,.]+)\s*k\b/i);
    if (kMatch) {
        const num = parseFloat(kMatch[1]!.replace(/,/g, ''));
        return isNaN(num) ? NaN : num * 1000;
    }

    // Plain number with commas: "₹2,09,550" or "₹50,000"
    const numMatch = cleaned.match(/([\d,]+(?:\.\d+)?)/);
    if (numMatch) {
        const num = parseFloat(numMatch[1]!.replace(/,/g, ''));
        return isNaN(num) ? NaN : num;
    }

    return NaN;
};

/**
 * Extract all fee values from a fee string that may contain ranges.
 * Handles: "₹2-15 Lakh / year" → [200000, 1500000]
 *          "₹50,000 - ₹5,00,000 / year" → [50000, 500000]
 *          "₹2,09,550 / year" → [209550]
 */
const extractFeeValues = (feeStr: string): number[] => {
    if (!feeStr) return [];

    // Check for range pattern like "₹2-15 Lakh" (numbers separated by dash with a shared unit)
    const rangeWithUnitMatch = feeStr.match(/([\d,.]+)\s*[-–]\s*([\d,.]+)\s*(lakh|lac|l|crore|cr|k)/i);
    if (rangeWithUnitMatch) {
        const unit = rangeWithUnitMatch[3]!.toLowerCase();
        let multiplier = 1;
        if (/^(lakh|lac|l)$/i.test(unit)) multiplier = 100000;
        else if (/^(crore|cr)$/i.test(unit)) multiplier = 10000000;
        else if (/^k$/i.test(unit)) multiplier = 1000;

        const low = parseFloat(rangeWithUnitMatch[1]!.replace(/,/g, '')) * multiplier;
        const high = parseFloat(rangeWithUnitMatch[2]!.replace(/,/g, '')) * multiplier;
        const values: number[] = [];
        if (!isNaN(low)) values.push(low);
        if (!isNaN(high)) values.push(high);
        return values;
    }

    // Check for range pattern like "₹50,000 - ₹5,00,000"
    const parts = feeStr.split(/\s*[-–]\s*(?=₹|Rs|INR|\d)/i);
    if (parts.length > 1) {
        return parts.map(p => parseSingleFee(p)).filter(n => !isNaN(n));
    }

    // Single value
    const val = parseSingleFee(feeStr);
    return isNaN(val) ? [] : [val];
};

const calculateFeesRange = (courses: any[]) => {
    if (!courses || !Array.isArray(courses) || courses.length === 0) return 'N/A';

    const allFees: number[] = [];
    for (const c of courses) {
        const values = extractFeeValues(c.fees?.toString() || '');
        allFees.push(...values);
    }

    if (allFees.length === 0) return 'N/A';

    const minFee = Math.min(...allFees);
    const maxFee = Math.max(...allFees);

    const formatNumber = (num: number) => {
        if (num >= 100000) return `${(num / 100000).toFixed(1).replace(/\.0$/, '')}L`;
        if (num >= 1000) return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
        return num.toString();
    };

    return minFee === maxFee
        ? `₹${formatNumber(minFee)}`
        : `₹${formatNumber(minFee)} - ₹${formatNumber(maxFee)}`;
};

const processCampusLifeImages = (campusLife: any[], files: Express.MulterS3.File[]) => {
    if (!campusLife || !Array.isArray(campusLife) || !files || files.length === 0) return campusLife;

    return campusLife.map((item: any) => {
        if (typeof item.image === 'string' && item.image.startsWith('FILE_')) {
            const index = parseInt(item.image.split('_')[1]);
            if (!isNaN(index) && files[index]) {
                return { ...item, image: files[index].location };
            }
        }
        return item;
    });
};

const listColleges = asyncHandler(async (req: Request, res: Response) => {
    const {
        page = 1,
        limit = 10,
        search,
        type,
        location,
        stream,
        category,
        country,
        ranking,
        sortBy = 'createdAt',
        order = 'desc',
    } = req.query;

    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(Math.max(1, Number(limit) || 10), 50); // cap at 50
    const skip = (pageNum - 1) * limitNum;

    // --- Build base match filter (fields on the college document) ---
    const matchFilter: any = {};

    if (search) {
        matchFilter.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
        ];
    }

    if (type) {
        matchFilter.type = type as string;
    }

    if (location) {
        const locationFilter = {
            $or: [
                { city: { $regex: location, $options: 'i' } },
                { state: { $regex: location, $options: 'i' } },
            ],
        };
        if (matchFilter.$or) {
            matchFilter.$and = [{ $or: matchFilter.$or }, locationFilter];
            delete matchFilter.$or;
        } else {
            Object.assign(matchFilter, locationFilter);
        }
    }

    if (category) {
        matchFilter.category = category as string;
    }

    if (country) {
        matchFilter.country = { $regex: `^${country}$`, $options: 'i' };
    }

    // --- Handle ranking filter: filter by minimum rating ---
    if (ranking) {
        const rankingStr = (ranking as string).toLowerCase();
        if (rankingStr === 'top-10') {
            matchFilter.rating = { $gte: 4.5 };
        } else if (rankingStr === 'top-50') {
            matchFilter.rating = { $gte: 4.0 };
        } else if (rankingStr === 'top-100') {
            matchFilter.rating = { $gte: 3.5 };
        } else {
            // If a numeric rating threshold is passed, use it directly
            const ratingVal = parseFloat(ranking as string);
            if (!isNaN(ratingVal)) {
                matchFilter.rating = { $gte: ratingVal };
            }
        }
    }

    // --- Handle stream filter: find matching course IDs first ---
    if (stream) {
        const streamStr = stream as string;
        const streamMatch: any = {};
        if (isValidObjectId(streamStr)) {
            streamMatch.stream = new Types.ObjectId(streamStr);
        } else {
            streamMatch.stream = streamStr;
        }
        const matchingCourseIds = await Course.find(streamMatch).distinct('_id');
        matchFilter.courses = { $in: matchingCourseIds };
    }

    // --- Sort, paginate, then populate ---
    const sortField = sortBy as string;
    const sortOrder = order === 'desc' ? -1 : 1;

    const [total, paginatedColleges] = await Promise.all([
        College.countDocuments(matchFilter),
        College.find(matchFilter)
            .select('-admissionFaqs -courseFaqs -feesPaymentFaqs -scholarshipFaqs -campusLife -hostelImages -labsImages -eventsImages -description')
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limitNum)
            .populate('university', 'name')
            .populate('recruiters', 'name logo')
            .populate('courses', 'name fees duration stream')
            .populate('scholarships', 'scholarshipName')
            .allowDiskUse(true)
            .lean(),
    ]);

    // Resolve category name from streams if it's an ObjectId
    for (const college of paginatedColleges as any[]) {
        if (isValidObjectId(college.category)) {
            const streamDoc = await Stream.findById(college.category).lean();
            if (streamDoc) {
                college.category = (streamDoc as any).name;
            }
        }
    }

    const totalCourse = await Course.countDocuments();

    const colleges = (paginatedColleges as any[]).map((college: any) => ({
        ...college,
        annualFeesRange: calculateFeesRange(college.courses)
    }));

    return ApiResponse.success(
        res,
        200,
        {
            colleges,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum),
            },
            matrix: [
                {
                    label: "Total Colleges",
                    value: total,
                },
                {
                    label: "Total Courses",
                    value: totalCourse,
                }
            ]
        },
        'Colleges fetched successfully'
    );
});

const createCollege = asyncHandler(async (req: Request, res: Response) => {
    const collegeData = req.body;
    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] };


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

    const capitalize = (str: string) => {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };


    const logo = files?.logo?.[0]?.location;
    const brochure = files?.brochure?.[0]?.location;
    const campusImages = files?.campusImages?.map(file => file.location) || [];
    const hostelImages = files?.hostelImages?.map(file => file.location) || [];
    const labsImages = files?.labsImages?.map(file => file.location) || [];
    const eventsImages = files?.eventsImages?.map(file => file.location) || [];

    // Parse JSON string fields
    const placementTrends = parseJSON(collegeData.placementTrends);
    const recruiters = parseJSON(collegeData.recruiters);
    const courses = parseJSON(collegeData.courses);
    const scholarships = parseJSON(collegeData.scholarships);
    // const facilities = parseJSON(collegeData.facilities);
    // const clubsandsocieties = parseJSON(collegeData.clubsandsocieties);
    const admissionFaqs = parseJSON(collegeData.admissionFaqs);
    const courseFaqs = parseJSON(collegeData.courseFaqs);
    const feesPaymentFaqs = parseJSON(collegeData.feesPaymentFaqs);
    const scholarshipFaqs = parseJSON(collegeData.scholarshipFaqs);
    let campusLife = parseJSON(collegeData.campusLife);

    if (campusLife && files?.campusLifeImages) {
        campusLife = processCampusLifeImages(campusLife, files.campusLifeImages);
    }


    // Helper to calculate total annual fee
    const calculateTotalAnnualFee = (data: any) => {
        const fees = [
            data.hostelFee,
            data.messFee,
            data.libraryFee,
            data.laboratoryFee,
            data.sportsFee
        ];

        const total = fees.reduce((acc, fee) => {
            if (!fee) return acc;
            const cleanFee = parseFloat(fee.toString().replace(/[^0-9.]/g, ''));
            return acc + (isNaN(cleanFee) ? 0 : cleanFee);
        }, 0);        // Format to Indian currency system (e.g. 1,00,000)
        return {
            total: total > 0 ? `₹${total.toLocaleString('en-IN')}` : '0',
            avg: total > 0 ? `₹${(total / 5).toLocaleString('en-IN')}` : '0'
        };
    };

    const annualFeeData = calculateTotalAnnualFee(collegeData);

    // Prepare college data with processed values
    const processedData = {
        ...collegeData,
        // Fix enum values
        type: capitalize(collegeData.type),
        // File URLs
        logo,
        brochure,
        // Gallery images
        campusImages,
        hostelImages,
        labsImages,
        eventsImages,
        // Parsed arrays
        accreditation: parseJSON(collegeData.accreditation),
        admissionMode: parseJSON(collegeData.admissionMode),
        placementTrends,
        recruiters,
        courses,
        scholarships,
        // facilities,
        // clubsandsocieties,
        // FAQs
        admissionFaqs,
        courseFaqs,
        feesPaymentFaqs,
        scholarshipFaqs,
        campusLife,
        category: capitalize(collegeData.category),
        annualFee: annualFeeData.total,
        avgAnnualFee: annualFeeData.avg,
    };

    const newCollege = new College(processedData);
    await newCollege.save();

    return ApiResponse.created(
        res,
        newCollege,
        'College created successfully'
    );
});


const updateCollege = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const collegeData = req.body;
    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] };


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


    const capitalize = (str: string) => {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const logo = files?.logo?.[0]?.location;
    const brochure = files?.brochure?.[0]?.location;

    const placementTrends = parseJSON(collegeData?.placementTrends);
    const recruiters = parseJSON(collegeData?.recruiters);
    const courses = parseJSON(collegeData?.courses);
    const scholarships = parseJSON(collegeData?.scholarships);
    const admissionFaqs = parseJSON(collegeData?.admissionFaqs);
    const courseFaqs = parseJSON(collegeData?.courseFaqs);
    const feesPaymentFaqs = parseJSON(collegeData?.feesPaymentFaqs);
    const scholarshipFaqs = parseJSON(collegeData?.scholarshipFaqs);
    const campusLife = processCampusLifeImages(parseJSON(collegeData?.campusLife), files?.campusLifeImages || []);

    const updateData: any = {
        ...collegeData,
        type: collegeData?.type ? capitalize(collegeData?.type) : undefined,
        accreditation: parseJSON(collegeData?.accreditation),
        admissionMode: parseJSON(collegeData?.admissionMode),
        placementTrends,
        recruiters,
        courses,
        scholarships,
        // Gallery images (Handle multi-upload update)
        campusImages: [
            ...(parseJSON(collegeData?.campusImages) || []),
            ...(files?.campusImages?.map(f => f.location) || [])
        ],
        hostelImages: [
            ...(parseJSON(collegeData?.hostelImages) || []),
            ...(files?.hostelImages?.map(f => f.location) || [])
        ],
        labsImages: [
            ...(parseJSON(collegeData?.labsImages) || []),
            ...(files?.labsImages?.map(f => f.location) || [])
        ],
        eventsImages: [
            ...(parseJSON(collegeData?.eventsImages) || []),
            ...(files?.eventsImages?.map(f => f.location) || [])
        ],
        // FAQs
        admissionFaqs,
        courseFaqs,
        feesPaymentFaqs,
        scholarshipFaqs,
        campusLife,
        category: capitalize(collegeData.category),
    };

    delete updateData.logo;
    delete updateData.brochure;

    const existingCollege = await College.findById(id);
    if (!existingCollege) {
        throw new ApiError(404, 'College not found');
    }

    // --- S3 CLEANUP LOGIC ---

    // 1. Handle Logo and Brochure
    if (logo && existingCollege.logo) {
        await deleteFileFromS3(existingCollege.logo);
    }
    if (brochure && existingCollege.brochure) {
        await deleteFileFromS3(existingCollege.brochure);
    }

    // 2. Handle Gallery Categories Cleanup
    const galleryCategories: ('campusImages' | 'hostelImages' | 'labsImages' | 'eventsImages')[] = [
        'campusImages', 'hostelImages', 'labsImages', 'eventsImages'
    ];

    for (const category of galleryCategories) {
        const incomingUrls = parseJSON(collegeData?.[category]) || [];
        const currentUrls = existingCollege[category] || [];

        // Identify URLs present in DB but NOT in the incoming "to-keep" list
        const urlsToDelete = currentUrls.filter(url => !incomingUrls.includes(url));

        for (const url of urlsToDelete) {
            await deleteFileFromS3(url);
        }
    }

    // 3. Handle Campus Life Cleanup
    const incomingCampusLife = parseJSON(collegeData?.campusLife) || [];
    const currentCampusLife = existingCollege.campusLife || [];

    // Identify images that were in the DB but are no longer in any campusLife item
    const incomingCampusLifeUrls = campusLife.map((item: any) => item.image).filter(Boolean);
    const currentCampusLifeUrls = currentCampusLife.map((item: any) => item.image).filter(Boolean);

    const campusLifeUrlsToDelete = currentCampusLifeUrls.filter(url => !incomingCampusLifeUrls.includes(url));

    for (const url of campusLifeUrlsToDelete) {
        await deleteFileFromS3(url);
    }

    // --- APPLY UPDATES ---

    if (logo) updateData.logo = logo;
    if (brochure) updateData.brochure = brochure;

    if (
        collegeData.hostelFee !== undefined ||
        collegeData.messFee !== undefined ||
        collegeData.libraryFee !== undefined ||
        collegeData.laboratoryFee !== undefined ||
        collegeData.sportsFee !== undefined
    ) {
        const fees = [
            collegeData.hostelFee !== undefined ? collegeData.hostelFee : existingCollege.hostelFee,
            collegeData.messFee !== undefined ? collegeData.messFee : existingCollege.messFee,
            collegeData.libraryFee !== undefined ? collegeData.libraryFee : existingCollege.libraryFee,
            collegeData.laboratoryFee !== undefined ? collegeData.laboratoryFee : existingCollege.laboratoryFee,
            collegeData.sportsFee !== undefined ? collegeData.sportsFee : existingCollege.sportsFee
        ];

        const total = fees.reduce((acc, fee) => {
            if (!fee) return acc;
            const cleanFee = parseFloat(fee.toString().replace(/[^0-9.]/g, ''));
            return acc + (isNaN(cleanFee) ? 0 : cleanFee);
        }, 0);

        updateData.annualFee = total > 0 ? `₹${total.toLocaleString('en-IN')}` : '0';
        updateData.avgAnnualFee = total > 0 ? `₹${(total / 5).toLocaleString('en-IN')}` : '0';
    }

    const updatedCollege = await College.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    )
        .populate('university')
        .populate('recruiters')
        .populate('scholarships');

    if (updatedCollege && isValidObjectId(updatedCollege.category)) {
        const stream = await Stream.findById(updatedCollege.category);
        if (stream) {
            (updatedCollege as any).category = stream.name;
        }
    }

    if (!updatedCollege) {
        throw new ApiError(404, 'College not found');
    }

    const collegeObj = updatedCollege.toObject();
    (collegeObj as any).annualFeesRange = calculateFeesRange(collegeObj?.courses as any);

    return ApiResponse.success(
        res,
        200,
        collegeObj,
        'College updated successfully'
    );
});

const getCollegeById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const college = await College.findById(id)
        .populate('university')
        .populate('recruiters')
        .populate({
            path: 'courses',
            populate: {
                path: 'stream',
                select: 'name'
            }
        })
        .populate('scholarships').lean();

    if (!college) {
        throw new ApiError(404, 'College not found');
    }

    if (isValidObjectId((college as any).category)) {
        const stream = await Stream.findById((college as any).category);
        if (stream) {
            (college as any).category = stream.name;
        }
    }

    (college as any).annualFeesRange = calculateFeesRange((college as any).courses);

    return ApiResponse.success(
        res,
        200,
        college,
        'College details fetched successfully'
    );
});

const deleteCollege = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedCollege = await College.findByIdAndDelete(id);

    if (!deletedCollege) {
        throw new ApiError(404, 'College not found');
    }

    return ApiResponse.success(
        res,
        200,
        null,
        'College deleted successfully'
    );
});

export const collegeController = {
    listColleges,
    createCollege,
    updateCollege,
    getCollegeById,
    deleteCollege,
};

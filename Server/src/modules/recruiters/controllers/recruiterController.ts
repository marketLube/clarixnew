import type { Request, Response } from 'express';
import { asyncHandler, ApiResponse, ApiError } from '../../../utils/index.js';
import { Recruiter } from '../models/recruiterModel.js';

const listRecruiters = asyncHandler(async (req: Request, res: Response) => {
    const {
        page = 1,
        limit = 10,
        search,
        sortBy = 'createdAt',
        order = 'desc'
    } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const filter: any = {};

    if (search) {
        filter.$or = [
            { companyName: { $regex: search, $options: 'i' } },
            { jobTitle: { $regex: search, $options: 'i' } },
        ];
    }

    const sortField = sortBy as string;
    const sortOrder = order === 'desc' ? -1 : 1;

    const [recruiters, total] = await Promise.all([
        Recruiter.find(filter)
            .sort([[sortField, sortOrder]])
            .skip(skip)
            .limit(limitNum)
            .lean(),
        Recruiter.countDocuments(filter),
    ]);

    return ApiResponse.success(
        res,
        200,
        {
            recruiters,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum),
            },
        },
        'Recruiters fetched successfully'
    );
});

const createRecruiter = asyncHandler(async (req: Request, res: Response) => {
    const { companyName, jobTitle, hiringDuration, industry } = req.body;
    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] };

    const logo = files?.logo?.[0]?.location;

    const processedData = {
        companyName,
        jobTitle,
        hiringDuration,
        industry: industry || undefined,
        logo: logo || undefined,
    };

    const newRecruiter = new Recruiter(processedData);
    await newRecruiter.save();

    return ApiResponse.created(
        res,
        newRecruiter,
        'Recruiter created successfully'
    );
});

const updateRecruiter = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] };

    const processedUpdateData: any = {};

    const directFields = ['companyName', 'jobTitle', 'hiringDuration', 'industry'];
    directFields.forEach(field => {
        if (updateData[field] !== undefined) {
            processedUpdateData[field] = updateData[field];
        }
    });

    if (files?.logo?.[0]?.location) {
        processedUpdateData.logo = files.logo[0].location;
    }

    const updatedRecruiter = await Recruiter.findByIdAndUpdate(
        id,
        { $set: processedUpdateData },
        { new: true, runValidators: true }
    ).lean();

    if (!updatedRecruiter) {
        throw new ApiError(404, 'Recruiter not found');
    }

    return ApiResponse.success(
        res,
        200,
        updatedRecruiter,
        'Recruiter updated successfully'
    );
});

const getRecruiterById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const recruiter = await Recruiter.findById(id).lean();

    if (!recruiter) {
        throw new ApiError(404, 'Recruiter not found');
    }

    return ApiResponse.success(
        res,
        200,
        recruiter,
        'Recruiter fetched successfully'
    );
});

const deleteRecruiter = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedRecruiter = await Recruiter.findByIdAndDelete(id);

    if (!deletedRecruiter) {
        throw new ApiError(404, 'Recruiter not found');
    }

    return ApiResponse.success(
        res,
        200,
        { id },
        'Recruiter deleted successfully'
    );
});

export const recruiterController = {
    listRecruiters,
    createRecruiter,
    updateRecruiter,
    getRecruiterById,
    deleteRecruiter,
};

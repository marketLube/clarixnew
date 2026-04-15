import type { Request, Response } from 'express';
import { asyncHandler, ApiResponse, ApiError } from '../../../utils/index.js';
import { Job } from '../model/jobModel.js';

function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const listJobs = asyncHandler(async (req: Request, res: Response) => {
    const {
        page = 1,
        limit = 10,
        search,
        jobType,
        location,
        status,
        sortBy = 'createdAt',
        order = 'desc',
    } = req.query;

    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(Math.max(1, Number(limit) || 10), 50);
    const skip = (pageNum - 1) * limitNum;

    const pipeline: any[] = [];

    const matchCriteria: any[] = [];

    if (search) {
        matchCriteria.push({
            $or: [
                { jobTitle: { $regex: escapeRegex(search as string), $options: 'i' } },
                { companyName: { $regex: escapeRegex(search as string), $options: 'i' } },
                { shortDescription: { $regex: escapeRegex(search as string), $options: 'i' } },
            ],
        });
    }

    if (jobType) {
        matchCriteria.push({ jobType: jobType });
    }

    if (location) {
        matchCriteria.push({ location: { $regex: escapeRegex(location as string), $options: 'i' } });
    }

    if (status) {
        matchCriteria.push({ isActive: status === 'active' });
    }

    if (matchCriteria.length > 0) {
        pipeline.push({ $match: { $and: matchCriteria } });
    }

    const sortField = sortBy as string;
    const sortOrder = order === 'desc' ? -1 : 1;
    pipeline.push({ $sort: { [sortField]: sortOrder } });

    pipeline.push({
        $facet: {
            metadata: [{ $count: 'total' }],
            data: [{ $skip: skip }, { $limit: limitNum }],
        },
    });

    const [result] = await Job.aggregate(pipeline);

    const jobs = result.data;
    const total = result.metadata[0]?.total || 0;

    return ApiResponse.success(
        res,
        200,
        {
            jobs,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum),
            },
        },
        'Jobs fetched successfully'
    );
});

const createJob = asyncHandler(async (req: Request, res: Response) => {
    const jobData = req.body;

    const newJob = new Job({
        ...jobData,
    });

    await newJob.save();

    return ApiResponse.created(
        res,
        newJob,
        'Job created successfully'
    );
});

const updateJob = asyncHandler(async (req: Request, res: Response) => {
    const { ...updateData } = req.body;
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, 'Job ID is required');
    }

    const updatedJob = await Job.findByIdAndUpdate(
        id,
        {
            ...updateData,
        },
        { new: true, runValidators: true }
    );

    if (!updatedJob) {
        throw new ApiError(404, 'Job not found');
    }

    return ApiResponse.success(
        res,
        200,
        updatedJob,
        'Job updated successfully'
    );
});

const getJobById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
        throw new ApiError(404, 'Job not found');
    }

    return ApiResponse.success(
        res,
        200,
        job,
        'Job fetched successfully'
    );
});

const deleteJob = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
        throw new ApiError(404, 'Job not found');
    }

    return ApiResponse.success(
        res,
        200,
        null,
        'Job deleted successfully'
    );
});

export const jobController = {
    listJobs,
    createJob,
    updateJob,
    getJobById,
    deleteJob,
};

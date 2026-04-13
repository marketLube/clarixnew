import type { Request, Response } from 'express';
import { asyncHandler, ApiResponse, ApiError } from '../../../utils/index.js';
import { Scholarship } from '../model/scholorshipModel.js';

const listScholarships = asyncHandler(async (req: Request, res: Response) => {
    const {
        page = 1,
        limit = 10,
        search,
        status,
        type,
        fundingType,
        sortBy = 'createdAt',
        order = 'desc',
    } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const pipeline: any[] = [];

    // Match stage
    const matchCriteria: any[] = [];

    if (search) {
        matchCriteria.push({
            scholarshipName: { $regex: search, $options: 'i' },
        });
    }

    if (status) {
        matchCriteria.push({ isActive: status === 'active' });
    }

    if (type) {
        matchCriteria.push({ scholarshipType: type });
    }

    if (fundingType) {
        matchCriteria.push({ fundingType: fundingType });
    }

    if (matchCriteria.length > 0) {
        pipeline.push({ $match: { $and: matchCriteria } });
    }

    // Sort stage
    const sortField = sortBy as string;
    const sortOrder = order === 'desc' ? -1 : 1;
    pipeline.push({ $sort: { [sortField]: sortOrder } });

    // Facet for pagination and data
    pipeline.push({
        $facet: {
            metadata: [{ $count: 'total' }],
            data: [{ $skip: skip }, { $limit: limitNum }],
        },
    });

    const [result] = await Scholarship.aggregate(pipeline);

    const scholarships = result.data;
    const total = result.metadata[0]?.total || 0;

    return ApiResponse.success(
        res,
        200,
        {
            scholarships,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum),
            },
        },
        'Scholarships fetched successfully'
    );
});

const createScholarship = asyncHandler(async (req: Request, res: Response) => {
    const scholarshipData = req.body;

    const newScholarship = new Scholarship({
        ...scholarshipData,
    });

    await newScholarship.save();

    return ApiResponse.created(
        res,
        newScholarship,
        'Scholarship created successfully'
    );
});

const updateScholarship = asyncHandler(async (req: Request, res: Response) => {
    const { ...updateData } = req.body;
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, 'Scholarship ID is required');
    }

    const updatedScholarship = await Scholarship.findByIdAndUpdate(
        id,
        {
            ...updateData,
        },
        { new: true, runValidators: true }
    );

    if (!updatedScholarship) {
        throw new ApiError(404, 'Scholarship not found');
    }

    return ApiResponse.success(
        res,
        200,
        updatedScholarship,
        'Scholarship updated successfully'
    );
});

const getScholarshipById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const scholarship = await Scholarship.findById(id);

    if (!scholarship) {
        throw new ApiError(404, 'Scholarship not found');
    }

    return ApiResponse.success(
        res,
        200,
        scholarship,
        'Scholarship fetched successfully'
    );
});

const deleteScholarship = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedScholarship = await Scholarship.findByIdAndDelete(id);

    if (!deletedScholarship) {
        throw new ApiError(404, 'Scholarship not found');
    }

    return ApiResponse.success(
        res,
        200,
        null,
        'Scholarship deleted successfully'
    );
});

export const scholarshipController = {
    listScholarships,
    createScholarship,
    updateScholarship,
    getScholarshipById,
    deleteScholarship,
};

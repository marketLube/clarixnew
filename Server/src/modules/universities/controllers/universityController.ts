import type { Request, Response } from 'express';
import { asyncHandler, ApiResponse, ApiError } from '../../../utils/index.js';
import { University } from '../models/universityModel.js';

function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const listUniversities = asyncHandler(async (req: Request, res: Response) => {
    const {
        page = 1,
        limit = 10,
        search,
        type,
        sortBy = 'createdAt',
        order = 'desc'
    } = req.query;

    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(Math.max(1, Number(limit) || 10), 50);
    const skip = (pageNum - 1) * limitNum;

    const filter: any = {};

    if (search) {
        filter.$or = [
            { name: { $regex: escapeRegex(search as string), $options: 'i' } },
            { city: { $regex: escapeRegex(search as string), $options: 'i' } },
            { state: { $regex: escapeRegex(search as string), $options: 'i' } },
        ];
    }

    if (type && type !== 'all') {
        filter.type = type;
    }

    const sortField = sortBy as string;
    const sortOrder = order === 'desc' ? -1 : 1;

    const [universities, total] = await Promise.all([
        University.find(filter)
            .sort([[sortField, sortOrder]])
            .skip(skip)
            .limit(limitNum)
            .lean(),
        University.countDocuments(filter),
    ]);

    return ApiResponse.success(
        res,
        200,
        {
            universities,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum),
            },
        },
        'Universities fetched successfully'
    );
});

const createUniversity = asyncHandler(async (req: Request, res: Response) => {
    const { name, type, state, city, establishedYear } = req.body;

    const processedData = {
        name,
        type,
        state,
        city,
        establishedYear: Number(establishedYear),
    };

    const newUniversity = new University(processedData);
    await newUniversity.save();

    return ApiResponse.created(
        res,
        newUniversity,
        'University created successfully'
    );
});

const updateUniversity = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    const processedUpdateData: any = {};

    const directFields = ['name', 'type', 'state', 'city'];
    directFields.forEach(field => {
        if (updateData[field] !== undefined) {
            processedUpdateData[field] = updateData[field];
        }
    });

    if (updateData.establishedYear !== undefined) {
        processedUpdateData.establishedYear = Number(updateData.establishedYear);
    }

    const updatedUniversity = await University.findByIdAndUpdate(
        id,
        { $set: processedUpdateData },
        { new: true, runValidators: true }
    ).lean();

    if (!updatedUniversity) {
        throw new ApiError(404, 'University not found');
    }

    return ApiResponse.success(
        res,
        200,
        updatedUniversity,
        'University updated successfully'
    );
});

const getUniversityById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const university = await University.findById(id).lean();

    if (!university) {
        throw new ApiError(404, 'University not found');
    }

    return ApiResponse.success(
        res,
        200,
        university,
        'University fetched successfully'
    );
});

const deleteUniversity = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedUniversity = await University.findByIdAndDelete(id);

    if (!deletedUniversity) {
        throw new ApiError(404, 'University not found');
    }

    return ApiResponse.success(
        res,
        200,
        { id },
        'University deleted successfully'
    );
});

export const universityController = {
    listUniversities,
    createUniversity,
    updateUniversity,
    getUniversityById,
    deleteUniversity,
};

import type { Request, Response } from 'express';
import { asyncHandler, ApiResponse, ApiError } from '../../../utils/index.js';
import { Exam } from '../model/examModel.js';
import { Stream } from '../../streams/model/streamModel.js';
import mongoose, { isValidObjectId } from 'mongoose';

function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const capitalize = (str: string) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const listExams = asyncHandler(async (req: Request, res: Response) => {
    const {
        page = 1,
        limit = 10,
        search,
        status,
        stream,
        sortBy = 'createdAt',
        order = 'desc',
    } = req.query;

    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(Math.max(1, Number(limit) || 10), 50);
    const skip = (pageNum - 1) * limitNum;

    // 1. Initial Match Stage (Must be first to correctly filter by stream ObjectId and be performant)
    const matchCriteria: any = {};

    if (search) {
        matchCriteria.$or = [
            { fullName: { $regex: escapeRegex(search as string), $options: 'i' } },
            { shortName: { $regex: escapeRegex(search as string), $options: 'i' } },
        ];
    }

    if (status) {
        matchCriteria.isActive = status === 'active';
    }

    if (stream) {
        if (isValidObjectId(stream)) {
            matchCriteria.stream = new mongoose.Types.ObjectId(stream as string);
        }
    }

    const pipeline: any[] = [];

    if (Object.keys(matchCriteria).length > 0) {
        pipeline.push({ $match: matchCriteria });
    }

    // 2. Lookup logic after filtering
    pipeline.push(
        {
            $lookup: {
                from: 'streams',
                localField: 'stream',
                foreignField: '_id',
                as: 'stream_obj'
            }
        },
        {
            $addFields: {
                stream: {
                    $cond: {
                        if: { $gt: [{ $size: '$stream_obj' }, 0] },
                        then: { $arrayElemAt: ['$stream_obj.name', 0] },
                        else: '$stream'
                    }
                }
            }
        },
        {
            $project: {
                stream_obj: 0
            }
        }
    );

    // 3. Sort stage
    const sortField = sortBy as string;
    const sortOrder = order === 'desc' ? -1 : 1;
    pipeline.push({ $sort: { [sortField]: sortOrder } });

    // 4. Facet for pagination and actual data
    pipeline.push({
        $facet: {
            metadata: [{ $count: 'total' }],
            data: [{ $skip: skip }, { $limit: limitNum }],
        },
    });

    const [result] = await Exam.aggregate(pipeline);

    const exams = result.data;
    const total = result.metadata[0]?.total || 0;

    return ApiResponse.success(
        res,
        200,
        {
            exams,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum),
            },
        },
        'Exams fetched successfully'
    );
});

const createExam = asyncHandler(async (req: Request, res: Response) => {
    const examData = req.body;
    const file = req.file as Express.MulterS3.File | undefined;

    // Helper function to safely parse JSON strings
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

    // Extract logo URL from uploaded file
    const logo = file?.location || examData.logo;

    // Parse qualification required if it's a JSON string
    const qualificationRequired = parseJSON(examData.qualificationRequired);

    const newExam = new Exam({
        ...examData,
        logo,
        qualificationRequired,
        stream: examData.stream || undefined,
    });

    await newExam.save();

    return ApiResponse.created(
        res,
        newExam,
        'Exam created successfully'
    );
});

const updateExam = asyncHandler(async (req: Request, res: Response) => {
    const { ...updateData } = req.body;
    const { id } = req.params;
    const file = req.file as Express.MulterS3.File | undefined;

    if (!id) {
        throw new ApiError(400, 'Exam ID is required');
    }

    // Helper function to safely parse JSON strings
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

    // Extract logo URL from uploaded file if provided
    const logo = file?.location;

    // Parse qualification required if it's provided and is a JSON string
    const qualificationRequired = updateData.qualificationRequired
        ? parseJSON(updateData.qualificationRequired)
        : undefined;

    const dataToUpdate: any = {
        ...updateData,
    };

    if (updateData.stream) {
        dataToUpdate.stream = updateData.stream;
    }

    if (logo) {
        dataToUpdate.logo = logo;
    }

    if (qualificationRequired) {
        dataToUpdate.qualificationRequired = qualificationRequired;
    }

    const updatedExam = await Exam.findByIdAndUpdate(
        id,
        dataToUpdate,
        { new: true, runValidators: true }
    ).populate('stream', 'name').lean();

    if (!updatedExam) {
        throw new ApiError(404, 'Exam not found');
    }

    return ApiResponse.success(
        res,
        200,
        updatedExam,
        'Exam updated successfully'
    );
});

const getExamById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const exam = await Exam.findById(id).populate('stream', 'name').lean();

    if (!exam) {
        throw new ApiError(404, 'Exam not found');
    }

    return ApiResponse.success(
        res,
        200,
        exam,
        'Exam fetched successfully'
    );
});

const deleteExam = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedExam = await Exam.findByIdAndDelete(id);

    if (!deletedExam) {
        throw new ApiError(404, 'Exam not found');
    }

    return ApiResponse.success(
        res,
        200,
        null,
        'Exam deleted successfully'
    );
});

export const examController = {
    listExams,
    createExam,
    updateExam,
    getExamById,
    deleteExam,
};

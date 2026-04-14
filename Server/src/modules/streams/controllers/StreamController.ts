import type { Request, Response } from 'express';
import { asyncHandler, ApiResponse, ApiError } from '../../../utils/index.js';
import { Stream } from '../model/streamModel.js';
import { Exam } from '../../exams/model/examModel.js';
import { Course } from '../../courses/models/courseModel.js';
import { College } from '../../colleges/models/collegeModel.js';

const listStreams = asyncHandler(async (req: Request, res: Response) => {
    const {
        page = 1,
        limit = 10,
        search,
        enabled,
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
        ];
    }

    if (enabled !== undefined) {
        filter.enabled = enabled === 'true';
    }

    // Build sort
    const sortField = sortBy as string;
    const sortOrder = order === 'desc' ? -1 : 1;

    // Execute query
    const [streamsData, total] = await Promise.all([
        Stream.find(filter)
            .sort([[sortField, sortOrder]])
            .skip(skip)
            .limit(limitNum)
            .lean(),
        Stream.countDocuments(filter),
    ]);

    // Enhance streams with current exam and college counts
    const streams = await Promise.all(streamsData.map(async (stream: any) => {
        const examsCount = await Exam.countDocuments({ stream: stream._id });
        const courseIds = await Course.find({ stream: stream._id }).distinct('_id');
        const collegesCount = courseIds.length > 0
            ? await College.countDocuments({ courses: { $in: courseIds } })
            : 0;
        return { ...stream, examsCount, collegesCount };
    }));

    return ApiResponse.success(
        res,
        200,
        {
            streams,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum),
            },
        },
        'Streams fetched successfully'
    );
});

const createStream = asyncHandler(async (req: Request, res: Response) => {
    const streamData = req.body;
    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] };

    // Extract uploaded image URL
    const image = files?.image?.[0]?.location;

    // Build stream data object
    const processedData = {
        name: streamData.name,
        collegesCount: streamData.collegesCount !== undefined
            ? Number(streamData.collegesCount)
            : 0,
        examsCount: streamData.examsCount !== undefined
            ? Number(streamData.examsCount)
            : 0,
        image: image || streamData.image || '',
        enabled: streamData.enabled !== undefined
            ? (streamData.enabled === 'true' || streamData.enabled === true)
            : true,
    };

    // Create and save new stream
    const newStream = new Stream(processedData);
    await newStream.save();

    return ApiResponse.created(
        res,
        newStream,
        'Stream created successfully'
    );
});

const updateStream = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] };

    // Extract uploaded image URL if present
    const image = files?.image?.[0]?.location;

    // Build update object
    const processedUpdateData: any = {};

    // Handle simple fields
    if (updateData.name !== undefined) processedUpdateData.name = updateData.name;
    if (updateData.collegesCount !== undefined) {
        processedUpdateData.collegesCount = Number(updateData.collegesCount);
    }
    if (updateData.examsCount !== undefined) {
        processedUpdateData.examsCount = Number(updateData.examsCount);
    }
    if (updateData.enabled !== undefined) {
        processedUpdateData.enabled = updateData.enabled === 'true' || updateData.enabled === true;
    }

    // Handle image update
    if (image) processedUpdateData.image = image;

    // Update stream
    const updatedStream = await Stream.findByIdAndUpdate(
        id,
        { $set: processedUpdateData },
        { new: true, runValidators: true }
    ).lean();

    if (!updatedStream) {
        throw new ApiError(404, 'Stream not found');
    }

    return ApiResponse.success(
        res,
        200,
        updatedStream,
        'Stream updated successfully'
    );
});

const getStreamById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const stream = await Stream.findById(id).lean();

    if (!stream) {
        throw new ApiError(404, 'Stream not found');
    }

    return ApiResponse.success(
        res,
        200,
        stream,
        'Stream fetched successfully'
    );
});

const deleteStream = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedStream = await Stream.findByIdAndDelete(id);

    if (!deletedStream) {
        throw new ApiError(404, 'Stream not found');
    }

    return ApiResponse.success(
        res,
        200,
        { id },
        'Stream deleted successfully'
    );
});

const toggleStreamStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const stream = await Stream.findById(id);

    if (!stream) {
        throw new ApiError(404, 'Stream not found');
    }

    stream.enabled = !stream.enabled;
    await stream.save();

    return ApiResponse.success(
        res,
        200,
        stream,
        `Stream ${stream.enabled ? 'enabled' : 'disabled'} successfully`
    );
});

export const streamController = {
    listStreams,
    createStream,
    updateStream,
    getStreamById,
    deleteStream,
    toggleStreamStatus,
};

import type { Request, Response } from 'express';
import { asyncHandler, ApiResponse, ApiError } from '../../../utils/index.js';
import { Review } from '../model/reviewModel.js';

const listReviews = asyncHandler(async (req: Request, res: Response) => {
    const {
        page = 1,
        limit = 10,
        search,
        status,
        collegeId,
        reviewType,
        sortBy = 'createdAt',
        order = 'desc',
    } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const pipeline: any[] = [];

    const matchCriteria: any[] = [];

    if (search) {
        matchCriteria.push({
            $or: [
                { userName: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
                { collegeName: { $regex: search, $options: 'i' } },
            ],
        });
    }

    if (status) {
        matchCriteria.push({ status: status });
    }

    if (collegeId) {
        matchCriteria.push({ collegeId: collegeId });
    }

    if (reviewType) {
        matchCriteria.push({ reviewType: reviewType });
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

    const [result] = await Review.aggregate(pipeline);

    const reviews = result.data;
    const total = result.metadata[0]?.total || 0;

    return ApiResponse.success(
        res,
        200,
        {
            reviews,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum),
            },
        },
        'Reviews fetched successfully'
    );
});

const createReview = asyncHandler(async (req: Request, res: Response) => {
    const reviewData = req.body;

    if (req.file) {
        // @ts-ignore
        reviewData.userAvatar = (req.file as any).location || req.file.path;
    }

    const newReview = new Review({
        ...reviewData,
    });

    await newReview.save();

    return ApiResponse.created(
        res,
        newReview,
        'Review submitted successfully'
    );
});

const updateReview = asyncHandler(async (req: Request, res: Response) => {
    const { ...updateData } = req.body;
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, 'Review ID is required');
    }

    const updatedReview = await Review.findByIdAndUpdate(
        id,
        {
            ...updateData,
        },
        { new: true, runValidators: true }
    );

    if (!updatedReview) {
        throw new ApiError(404, 'Review not found');
    }

    return ApiResponse.success(
        res,
        200,
        updatedReview,
        'Review updated successfully'
    );
});

const getReviewById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const review = await Review.findById(id).populate('collegeId', 'name');

    if (!review) {
        throw new ApiError(404, 'Review not found');
    }

    return ApiResponse.success(
        res,
        200,
        review,
        'Review fetched successfully'
    );
});

const deleteReview = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
        throw new ApiError(404, 'Review not found');
    }

    return ApiResponse.success(
        res,
        200,
        null,
        'Review deleted successfully'
    );
});

const getReviewStats = asyncHandler(async (req: Request, res: Response) => {
    const stats = await Review.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: 1 },
                pending: {
                    $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] }
                },
                approved: {
                    $sum: { $cond: [{ $eq: ["$status", "Approved"] }, 1, 0] }
                },
                rejected: {
                    $sum: { $cond: [{ $eq: ["$status", "Rejected"] }, 1, 0] }
                }
            }
        }
    ]);

    const result = stats[0] || { total: 0, pending: 0, approved: 0, rejected: 0 };

    return ApiResponse.success(
        res,
        200,
        result,
        'Review stats fetched successfully'
    );
});

export const reviewController = {
    listReviews,
    createReview,
    updateReview,
    getReviewById,
    deleteReview,
    getReviewStats,
};

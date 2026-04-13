import { Schema, model, Document } from 'mongoose';

interface IReview extends Document {
    userName: string;
    userAvatar?: string;
    reviewType: 'College' | 'Organization';
    collegeId?: Schema.Types.ObjectId;
    collegeName?: string;
    reviewDate: Date;
    content: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    city: string;
    course: string;
}

const reviewSchema = new Schema<IReview>(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
        },
        userAvatar: {
            type: String,
            trim: true,
        },
        reviewType: {
            type: String,
            enum: ['College', 'Organization'],
            required: true,
            default: 'College',
        },
        collegeId: {
            type: Schema.Types.ObjectId,
            ref: 'College',
        },
        collegeName: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        course: {
            type: String,
            trim: true,
        },
        reviewDate: {
            type: Date,
            default: Date.now,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending',
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export const Review = model<IReview>('Review', reviewSchema);

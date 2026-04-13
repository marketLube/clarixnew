import { Schema, model } from 'mongoose';

export type BlogStatus = 'Draft' | 'Published';

export interface Blog {
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    thumbnail?: string;
    status: BlogStatus;
    tags?: string[];
    views: number;
    date?: Date;
    readTime?: string;
    category?: string;
}

const blogSchema = new Schema<Blog>(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, trim: true, unique: true },
        excerpt: { type: String, trim: true },
        content: { type: String, required: true, trim: true },
        thumbnail: { type: String, trim: true },
        status: {
            type: String,
            enum: ['Draft', 'Published'],
            default: 'Draft',
        },
        tags: [{ type: String, trim: true }],
        views: { type: Number, default: 0, min: 0 },
        date: { type: Date },
        readTime: { type: String, trim: true },
        category: { type: String, trim: true },
    },
    {
        timestamps: true,
    }
);

export const BlogModel = model<Blog>('Blog', blogSchema);

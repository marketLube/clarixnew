import type { Request, Response } from 'express';
import { asyncHandler, ApiResponse, ApiError } from '../../../utils/index.js';
import { BlogModel } from '../model/blogModel.js';
import type { BlogStatus } from '../model/blogModel.js';

function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const listBlogs = asyncHandler(async (req: Request, res: Response) => {
    const {
        page = 1,
        limit = 10,
        search,
        status,
        sortBy = 'createdAt',
        order = 'desc',
    } = req.query;

    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(Math.max(1, Number(limit) || 10), 50);
    const skip = (pageNum - 1) * limitNum;

    const filter: any = {};

    if (search) {
        filter.$or = [
            { title: { $regex: escapeRegex(search as string), $options: 'i' } },
            { tags: { $regex: escapeRegex(search as string), $options: 'i' } },
        ];
    }

    if (status && (status === 'Draft' || status === 'Published')) {
        filter.status = status;
    }

    const sortField = sortBy as string;
    const sortOrder = order === 'desc' ? -1 : 1;

    const [blogs, total] = await Promise.all([
        BlogModel.find(filter)
            .sort([[sortField, sortOrder]])
            .skip(skip)
            .limit(limitNum)
            .lean(),
        BlogModel.countDocuments(filter),
    ]);

    return ApiResponse.success(
        res,
        200,
        {
            blogs,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum),
            },
        },
        'Blogs fetched successfully',
    );
});

const createBlog = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] } | undefined;

    const thumbnailUrl = files?.thumbnail?.[0]?.location;

    const title = String(body.title || '').trim();
    const slug = String(body.slug || '').trim()
        || title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    const excerpt = String(body.excerpt || '').trim() || undefined;
    const content = String(body.content || '').trim();
    const status: BlogStatus =
        body.status === 'Published' || body.status === 'Draft'
            ? body.status
            : 'Draft';

    if (!title || !content) {
        throw new ApiError(400, 'Title and content are required');
    }

    const tags =
        typeof body.tags === 'string'
            ? body.tags
                .split(',')
                .map((t: string) => t.trim())
                .filter(Boolean)
            : Array.isArray(body.tags)
                ? body.tags
                    .map((t: any) => String(t || '').trim())
                    .filter(Boolean)
                : [];

    const existing = await BlogModel.findOne({ slug });
    if (existing) {
        throw new ApiError(400, 'A blog with this slug already exists');
    }

    const blog = await BlogModel.create({
        title,
        slug,
        excerpt,
        content,
        thumbnail: thumbnailUrl || body.thumbnail || undefined,
        status,
        tags,
        views: 0,
        date: body.date ? new Date(body.date) : undefined,
        readTime: String(body.readTime || '').trim(),
        category: String(body.category || '').trim()
    } as any);

    return ApiResponse.created(res, blog, 'Blog created successfully');
});

const getBlogById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
        throw new ApiError(400, 'Blog ID is required');
    }

    const stringId = Array.isArray(id) ? String(id[0]) : String(id);
    let blog;
    
    // Check if id is a valid ObjectId
    if (stringId.match(/^[0-9a-fA-F]{24}$/)) {
        blog = await BlogModel.findById(stringId).lean();
    } 
    
    // If not found by ID or id is not ObjectId, try slug
    if (!blog) {
        blog = await BlogModel.findOne({ slug: stringId }).lean();
    }

    if (!blog) {
        throw new ApiError(404, 'Blog not found');
    }
    return ApiResponse.success(res, 200, blog, 'Blog fetched successfully');
});


const updateBlog = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;
    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] } | undefined;

    const existingBlog = await BlogModel.findById(id);
    if (!existingBlog) {
        throw new ApiError(404, 'Blog not found');
    }

    const thumbnailUrl = files?.thumbnail?.[0]?.location;

    if (body.title) existingBlog.title = String(body.title).trim();
    
    // Only update slug if title changed significantly or explicitly requested, 
    // but usually slug should remain stable to preserve SEO. 
    // Let's assume slug updates are optional or manual.
    if (body.slug) existingBlog.slug = String(body.slug).trim();

    if (body.excerpt !== undefined) existingBlog.excerpt = String(body.excerpt).trim();
    if (body.content) existingBlog.content = String(body.content).trim();
    if (thumbnailUrl) existingBlog.thumbnail = thumbnailUrl;
    if (body.status && (body.status === 'Published' || body.status === 'Draft')) {
        existingBlog.status = body.status;
    }
    
    if (body.date) existingBlog.date = new Date(body.date);
    if (body.readTime) existingBlog.readTime = String(body.readTime).trim();
    if (body.category) existingBlog.category = String(body.category).trim();

    if (body.tags) {
        existingBlog.tags = typeof body.tags === 'string'
            ? body.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
            : Array.isArray(body.tags)
                ? body.tags.map((t: any) => String(t || '').trim()).filter(Boolean)
                : existingBlog.tags;
    }

    await existingBlog.save();

    return ApiResponse.success(res, 200, existingBlog, 'Blog updated successfully');
});

const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, 'Blog ID is required');
    }

    const blog = await BlogModel.findByIdAndDelete(id);

    if (!blog) {
        throw new ApiError(404, 'Blog not found');
    }

    return ApiResponse.success(res, 200, null, 'Blog deleted successfully');
});

export const blogController = {
    listBlogs,
    createBlog,
    getBlogById,
    updateBlog,
    deleteBlog,
};

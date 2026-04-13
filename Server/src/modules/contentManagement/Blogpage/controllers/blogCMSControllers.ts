import type { Request, Response } from 'express';
import { asyncHandler, ApiResponse, ApiError } from '../../../../utils/index.js';
import { BlogPage } from '../model/blogCMSmodel.js';

// Helper function to parse flat FormData fields with bracket notation into nested objects
const parseNestedFormData = (flatData: any): any => {
    if (!flatData || typeof flatData !== 'object') {
        return flatData || {};
    }

    const result: Record<string, any> = {};
    const keys = Object.keys(flatData);

    for (const key of keys) {
        const value = flatData[key];
        const match = key.match(/^([^\[]+)(.*)$/);

        if (!match || !match[1]) {
            result[key] = value;
            continue;
        }

        const rootKey = match[1];
        const bracketPart = match[2] || '';

        if (!bracketPart) {
            result[rootKey] = value;
            continue;
        }

        const bracketMatches = bracketPart.match(/\[([^\]]+)\]/g);
        if (!bracketMatches || bracketMatches.length === 0) {
            result[rootKey] = value;
            continue;
        }

        const path = bracketMatches.map((b: string) => b.slice(1, -1)).filter((s): s is string => s !== undefined);

        if (!result[rootKey]) {
            result[rootKey] = {};
        }

        let current: any = result[rootKey];

        for (let i = 0; i < path.length - 1; i++) {
            const segment = path[i];
            if (segment === undefined || segment === '') continue;

            const isArrayIndex = /^\d+$/.test(segment);

            if (isArrayIndex) {
                const index = parseInt(segment, 10);
                if (!Array.isArray(current)) {
                    current = [];
                }
                while (current.length <= index) {
                    current.push({});
                }
                if (current[index] === undefined || current[index] === null) {
                    current[index] = {};
                }
                current = current[index];
            } else {
                if (current[segment] === undefined || current[segment] === null) {
                    current[segment] = {};
                }
                current = current[segment];
            }
        }

        const lastSegment = path[path.length - 1];
        if (lastSegment === undefined || lastSegment === '') {
            if (!Array.isArray(current)) {
                const temp = typeof current === 'object' && current !== null ? { ...current } : {};
                current = [];
                if (typeof temp === 'object' && temp !== null) {
                    Object.keys(temp).forEach((k) => {
                        const idx = parseInt(k, 10);
                        if (!isNaN(idx)) {
                            current[idx] = temp[k as keyof typeof temp];
                        }
                    });
                }
            }
            current.push(value);
        } else {
            const isArrayIndex = /^\d+$/.test(lastSegment);
            if (isArrayIndex) {
                const index = parseInt(lastSegment, 10);
                if (!Array.isArray(current)) {
                    const temp = typeof current === 'object' && current !== null ? { ...current } : {};
                    current = [];
                    if (typeof temp === 'object' && temp !== null) {
                        Object.keys(temp).forEach((k) => {
                            const idx = parseInt(k, 10);
                            if (!isNaN(idx)) {
                                current[idx] = temp[k as keyof typeof temp];
                            }
                        });
                    }
                }
                while (current.length <= index) {
                    current.push('');
                }
                current[index] = value;
            } else {
                current[lastSegment] = value;
            }
        }
    }

    return result;
};

const getBlogPage = asyncHandler(async (req: Request, res: Response) => {
    let blogPage = await BlogPage.findOne();

    if (!blogPage) {
        // Create a default one if it doesn't exist
        blogPage = await BlogPage.create({
            hero: { enabled: true, headline: 'Our Blogs' },
            searchFilters: { enabled: true, filters: [] },
            newsletter: { enabled: true, title: 'Subscribe to our Newsletter' }
        });
    }

    return ApiResponse.success(
        res,
        200,
        blogPage,
        'Blog page content fetched successfully'
    );
});


const createBlogPage = asyncHandler(async (req: Request, res: Response) => {
    const bodyData = req.body && typeof req.body === 'object' ? req.body : {};
    const data = parseNestedFormData(bodyData);
    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] } | undefined;

    const newsletterImageFiles = (files?.['newsletter[imageFile]'] ?? [])
        .map((f) => (f as any)?.location)
        .filter(Boolean) as string[];

    if (newsletterImageFiles.length) {
        if (!data.newsletter) {
            data.newsletter = {};
        }
        data.newsletter.image = newsletterImageFiles[0];
    }

    let blogPage = await BlogPage.findOne();

    if (blogPage) {
        throw new ApiError(400, 'Blog page content already exists. Use PATCH to update.');
    }

    blogPage = await BlogPage.create(data);

    return ApiResponse.created(
        res,
        blogPage,
        'Blog page content created successfully'
    );
});

/**
 * Update the blog page CMS content
 */
const updateBlogPage = asyncHandler(async (req: Request, res: Response) => {
    const bodyData = req.body && typeof req.body === 'object' ? req.body : {};
    const updateData = parseNestedFormData(bodyData);
    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] } | undefined;

    const newsletterImageFiles = (files?.['newsletter[imageFile]'] ?? [])
        .map((f) => (f as any)?.location)
        .filter(Boolean) as string[];

    if (newsletterImageFiles.length) {
        if (!updateData.newsletter) {
            updateData.newsletter = {};
        }
        updateData.newsletter.image = newsletterImageFiles[0];
    }

    let blogPage = await BlogPage.findOne();

    if (!blogPage) {
        blogPage = await BlogPage.create(updateData);
    } else {
        blogPage = await BlogPage.findOneAndUpdate(
            {},
            { $set: updateData },
            { new: true, runValidators: true }
        );
    }

    return ApiResponse.success(
        res,
        200,
        blogPage,
        'Blog page content updated successfully'
    );
});

export const blogCMSController = {
    getBlogPage,
    createBlogPage,
    updateBlogPage
};

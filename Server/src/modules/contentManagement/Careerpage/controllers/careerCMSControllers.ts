import type { Request, Response } from 'express';
import { asyncHandler, ApiResponse, ApiError } from '../../../../utils/index.js';
import { CareersPage } from '../model/careerCMSmodel.js';

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

        const path = bracketMatches.map((b: string) => b.slice(1, -1));

        if (!result[rootKey]) {
            result[rootKey] = {};
        }

        let current: any = result[rootKey];

        for (let i = 0; i < path.length - 1; i++) {
            const segment = path[i]!;
            const isArrayIndex = /^\d+$/.test(segment);

            if (isArrayIndex) {
                const index = parseInt(segment, 10);
                if (!Array.isArray(current)) current = [];
                while (current.length <= index) current.push({});
                if (!current[index]) current[index] = {};
                current = current[index];
            } else {
                if (!current[segment]) current[segment] = {};
                current = current[segment];
            }
        }

        const lastSegment = path[path.length - 1]!;
        if (lastSegment === '') {
            if (!Array.isArray(current)) current = [];
            current.push(value);
        } else {
            const isArrayIndex = /^\d+$/.test(lastSegment);
            if (isArrayIndex) {
                const index = parseInt(lastSegment, 10);
                if (!Array.isArray(current)) current = [];
                while (current.length <= index) current.push(null);
                current[index] = value;
            } else {
                current[lastSegment] = value;
            }
        }
    }

    return result;
};

const getCareersPage = asyncHandler(async (req: Request, res: Response) => {
    let careersPage = await CareersPage.findOne();

    if (!careersPage) {
        careersPage = await CareersPage.create({
            heroSection: { enabled: true, primaryHeadline: 'Careers', subHeadline: 'Join our team' },
            secondSection: { enabled: true, images: [] },
            thirdSection: { 
                enabled: true, 
                primaryHeadline: 'Join Our Team', 
                subHeadline: 'Become part of a mission-driven team transforming how students across India discover colleges, courses, exams, and careers. Find a role where your ideas, creativity, and passion can make real impact.',
                jobCategories: ["All", "Content Writer", "Data Research"]
            },
            jobs: []
        });
    }

    return ApiResponse.success(
        res,
        200,
        careersPage,
        'Careers page content fetched successfully'
    );
});

const createCareersPage = asyncHandler(async (req: Request, res: Response) => {
    const bodyData = req.body && typeof req.body === 'object' ? req.body : {};
    const data = parseNestedFormData(bodyData);
    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] };

    // Extract uploaded images
    const uploadedImages = (files?.['secondSection[images]'] ?? [])
        .map((f) => f?.location)
        .filter(Boolean) as string[];

    if (uploadedImages.length > 0) {
        if (!data.secondSection) data.secondSection = { enabled: true, images: [] };
        if (!data.secondSection.images) data.secondSection.images = [];
        
        // Map new uploads to the structure
        const currentImages = Array.isArray(data.secondSection.images) ? data.secondSection.images : [];
        const newImages = [...currentImages];
        
        let uploadIdx = 0;
        // If we have placeholders or empty slots, replace them
        for (let i = 0; i < 10 && uploadIdx < uploadedImages.length; i++) {
            if (!newImages[i] || !newImages[i].url || (typeof newImages[i].url === 'string' && newImages[i].url === '')) {
                newImages[i] = { url: uploadedImages[uploadIdx++] };
            }
        }
        // Append remaining if any
        while (uploadIdx < uploadedImages.length) {
            newImages.push({ url: uploadedImages[uploadIdx++] });
        }
        data.secondSection.images = newImages;
    }

    let careersPage = await CareersPage.findOne();

    if (careersPage) {
        throw new ApiError(400, 'Careers page content already exists. Use PATCH to update.');
    }

    careersPage = await CareersPage.create(data);

    return ApiResponse.created(
        res,
        careersPage,
        'Careers page content created successfully'
    );
});

const updateCareersPage = asyncHandler(async (req: Request, res: Response) => {
    const bodyData = req.body && typeof req.body === 'object' ? req.body : {};
    const updateData = parseNestedFormData(bodyData);
    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] };

    // Extract uploaded images
    const uploadedImages = (files?.['secondSection[images]'] ?? [])
        .map((f) => f?.location)
        .filter(Boolean) as string[];

    if (uploadedImages.length > 0) {
        if (!updateData.secondSection) updateData.secondSection = { enabled: true, images: [] };
        
        const currentImages = Array.isArray(updateData.secondSection.images) ? updateData.secondSection.images : [];
        const newImages = [...currentImages];

        let uploadIdx = 0;
        // The frontend sends existing URLs and leaves gaps for new files
        // We need to fill those gaps with uploadedImages
        for (let i = 0; i < 10 && uploadIdx < uploadedImages.length; i++) {
            if (newImages[i] === undefined || newImages[i] === null || !newImages[i].url || newImages[i].url === '') {
                newImages[i] = { url: uploadedImages[uploadIdx++] };
            }
        }
        // Append remaining if any
        while (uploadIdx < uploadedImages.length) {
            newImages.push({ url: uploadedImages[uploadIdx++] });
        }
        
        updateData.secondSection.images = newImages.filter(img => img && img.url);
    }

    let careersPage = await CareersPage.findOne();

    if (!careersPage) {
        careersPage = await CareersPage.create(updateData);
    } else {
        careersPage = await CareersPage.findOneAndUpdate(
            {},
            { $set: updateData },
            { new: true, runValidators: true }
        );
    }

    return ApiResponse.success(
        res,
        200,
        careersPage,
        'Careers page content updated successfully'
    );
});

export const careersCMSController = {
    getCareersPage,
    createCareersPage,
    updateCareersPage
};

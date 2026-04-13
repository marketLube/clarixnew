import type { Request, Response } from 'express';
import { asyncHandler, ApiResponse, ApiError } from '../../../../utils/index.js';
import { FooterCMS } from '../model/footerCMSmodel.js';

const getFooter = asyncHandler(async (req: Request, res: Response) => {
    let footer = await FooterCMS.findOne();

    if (!footer) {
        footer = await FooterCMS.create({
            enabled: true,
            primaryHeadline: 'Start Your Journey',
            subHeadline: 'Contact us for more details',
            newsletter: { enabled: true },
            exploreColleges: [],
            courses: [],
            exams: [],
            admissions: [],
            scholarships: [],
            about: []
        });
    }

    return ApiResponse.success(
        res,
        200,
        footer,
        'Footer content fetched successfully'
    );
});

const createFooter = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;

    let footer = await FooterCMS.findOne();

    if (footer) {
        throw new ApiError(400, 'Footer content already exists. Use PATCH to update.');
    }

    footer = await FooterCMS.create(data);

    return ApiResponse.created(
        res,
        footer,
        'Footer content created successfully'
    );
});

const updateFooter = asyncHandler(async (req: Request, res: Response) => {
    const updateData = req.body;

    let footer = await FooterCMS.findOne();

    if (!footer) {
        footer = await FooterCMS.create(updateData);
    } else {
        footer = await FooterCMS.findOneAndUpdate(
            {},
            { $set: updateData },
            { new: true, runValidators: true }
        );
    }

    return ApiResponse.success(
        res,
        200,
        footer,
        'Footer content updated successfully'
    );
});

export const footerCMSController = {
    getFooter,
    createFooter,
    updateFooter
};

import type { Request, Response } from 'express';
import { asyncHandler, ApiResponse, ApiError } from '../../../../utils/index.js';
import { AboutPage } from '../model/aboutCMSmodel.js';

const getAboutPage = asyncHandler(async (req: Request, res: Response) => {
    let aboutPage = await AboutPage.findOne();

    if (!aboutPage) {
        aboutPage = await AboutPage.create({
            hero: { enabled: true, headline: 'About Us' },
            secondSection: { enabled: true },
            thirdSection: { enabled: true, cards: [] },
            fourthSection: { enabled: true },
            keyStatistics: { enabled: true, stats: [] }
        });
    }

    return ApiResponse.success(
        res,
        200,
        aboutPage,
        'About page content fetched successfully'
    );
});

const createAboutPage = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;

    let aboutPage = await AboutPage.findOne();

    if (aboutPage) {
        throw new ApiError(400, 'About page content already exists. Use PATCH to update.');
    }

    aboutPage = await AboutPage.create(data);

    return ApiResponse.created(
        res,
        aboutPage,
        'About page content created successfully'
    );
});

const updateAboutPage = asyncHandler(async (req: Request, res: Response) => {
    const updateData = req.body;

    let aboutPage = await AboutPage.findOne();

    if (!aboutPage) {
        aboutPage = await AboutPage.create(updateData);
    } else {
        aboutPage = await AboutPage.findOneAndUpdate(
            {},
            { $set: updateData },
            { new: true, runValidators: true }
        );
    }

    return ApiResponse.success(
        res,
        200,
        aboutPage,
        'About page content updated successfully'
    );
});

export const aboutCMSController = {
    getAboutPage,
    createAboutPage,
    updateAboutPage
};

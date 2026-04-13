import type { Request, Response } from 'express';
import { asyncHandler, ApiResponse } from '../../../../utils/index.js';
import { CoursesPage } from '../model/coursesCMSModel.js';

const getCoursesPage = asyncHandler(async (req: Request, res: Response) => {
    let page = await CoursesPage.findOne();

    if (!page) {
        page = await CoursesPage.create({
            heroSection: { enabled: true, primaryHeadline: '', subHeadline: '' },
        });
    }

    return ApiResponse.success(
        res,
        200,
        page,
        'Courses page content fetched successfully'
    );
});

const updateCoursesPage = asyncHandler(async (req: Request, res: Response) => {
    const updateData = req.body;

    let page = await CoursesPage.findOne();

    if (!page) {
        page = await CoursesPage.create(updateData);
    } else {
        page = await CoursesPage.findOneAndUpdate(
            {},
            { $set: updateData },
            { new: true, runValidators: true }
        );
    }

    return ApiResponse.success(
        res,
        200,
        page,
        'Courses page content updated successfully'
    );
});

export const coursesCMSController = {
    getCoursesPage,
    updateCoursesPage
};

import type { Request, Response } from 'express';
import { asyncHandler, ApiResponse } from '../../../../utils/index.js';
import { CollegesPage } from '../model/collegesCMSmodel.js';

const getCollegesPage = asyncHandler(async (req: Request, res: Response) => {
    let page = await CollegesPage.findOne();

    if (!page) {
        page = await CollegesPage.create({
            heroSection: { enabled: true, primaryHeadline: '', subHeadline: '' },
        });
    }

    return ApiResponse.success(
        res,
        200,
        page,
        'Colleges page content fetched successfully'
    );
});

const updateCollegesPage = asyncHandler(async (req: Request, res: Response) => {
    const updateData = req.body;

    let page = await CollegesPage.findOne();

    if (!page) {
        page = await CollegesPage.create(updateData);
    } else {
        page = await CollegesPage.findOneAndUpdate(
            {},
            { $set: updateData },
            { new: true, runValidators: true }
        );
    }

    return ApiResponse.success(
        res,
        200,
        page,
        'Colleges page content updated successfully'
    );
});

export const collegesCMSController = {
    getCollegesPage,
    updateCollegesPage
};

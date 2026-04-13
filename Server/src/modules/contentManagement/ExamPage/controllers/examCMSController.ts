import type { Request, Response } from 'express';
import { asyncHandler, ApiResponse } from '../../../../utils/index.js';
import { ExamPage } from '../model/examCMSmodel.js';

const getExamPage = asyncHandler(async (req: Request, res: Response) => {
    let page = await ExamPage.findOne();

    if (!page) {
        page = await ExamPage.create({
            heroSection: { enabled: true, primaryHeadline: '', subHeadline: '' },
        });
    }

    return ApiResponse.success(
        res,
        200,
        page,
        'Exam page content fetched successfully'
    );
});

const updateExamPage = asyncHandler(async (req: Request, res: Response) => {
    const updateData = req.body;

    let page = await ExamPage.findOne();

    if (!page) {
        page = await ExamPage.create(updateData);
    } else {
        page = await ExamPage.findOneAndUpdate(
            {},
            { $set: updateData },
            { new: true, runValidators: true }
        );
    }

    return ApiResponse.success(
        res,
        200,
        page,
        'Exam page content updated successfully'
    );
});

export const examCMSController = {
    getExamPage,
    updateExamPage
};

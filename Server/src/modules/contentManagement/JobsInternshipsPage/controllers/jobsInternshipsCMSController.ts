import type { Request, Response } from 'express';
import { asyncHandler, ApiResponse } from '../../../../utils/index.js';
import { JobsInternshipsPage } from '../model/jobsInternshipsCMSmodel.js';

const getJobsInternshipsPage = asyncHandler(async (req: Request, res: Response) => {
    let page = await JobsInternshipsPage.findOne();

    if (!page) {
        page = await JobsInternshipsPage.create({
            heroSection: { enabled: true, primaryHeadline: '', subHeadline: '' },
        });
    }

    return ApiResponse.success(
        res,
        200,
        page,
        'Jobs & Internships page content fetched successfully'
    );
});

const updateJobsInternshipsPage = asyncHandler(async (req: Request, res: Response) => {
    const updateData = req.body;

    let page = await JobsInternshipsPage.findOne();

    if (!page) {
        page = await JobsInternshipsPage.create(updateData);
    } else {
        page = await JobsInternshipsPage.findOneAndUpdate(
            {},
            { $set: updateData },
            { new: true, runValidators: true }
        );
    }

    return ApiResponse.success(
        res,
        200,
        page,
        'Jobs & Internships page content updated successfully'
    );
});

export const jobsInternshipsCMSController = {
    getJobsInternshipsPage,
    updateJobsInternshipsPage
};

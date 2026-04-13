
import type { Request, Response } from 'express';
import { asyncHandler, ApiResponse } from '../../../utils/index.js';
import { College } from '../../colleges/models/collegeModel.js';
import { Course } from '../../courses/models/courseModel.js';
import { Exam } from '../../exams/model/examModel.js';
import { Job } from '../../jobs/model/jobModel.js';

const globalSearch = asyncHandler(async (req: Request, res: Response) => {
    const { query } = req.query;

    if (!query || typeof query !== 'string') {
        return ApiResponse.success(res, 200, {
            colleges: [],
            courses: [],
            exams: [],
            jobs: []
        }, 'No query provided');
    }

    const searchRegex = new RegExp(query, 'i');

    const [colleges, courses, exams, jobs] = await Promise.all([
        College.find({
            $or: [
                { name: searchRegex },
                { city: searchRegex },
                { state: searchRegex }
            ]
        }).select('name city state logo type').limit(5).lean(),

        Course.find({
            name: searchRegex
        }).select('name duration type').limit(5).lean(),

        Exam.find({
            $or: [
                { fullName: searchRegex },
                { shortName: searchRegex }
            ]
        }).select('fullName shortName examDate logo').limit(5).lean(),

        Job.find({
            $or: [
                { jobTitle: searchRegex },
                { companyName: searchRegex }
            ]
        }).select('jobTitle companyName location salary').limit(5).lean()
    ]);

    return ApiResponse.success(res, 200, {
        colleges,
        courses,
        exams,
        jobs
    }, 'Search results fetched successfully');
});

export const searchController = {
    globalSearch
};

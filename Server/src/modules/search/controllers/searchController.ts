
import type { Request, Response } from 'express';
import { asyncHandler, ApiResponse } from '../../../utils/index.js';
import { College } from '../../colleges/models/collegeModel.js';
import { Course } from '../../courses/models/courseModel.js';
import { Exam } from '../../exams/model/examModel.js';
import { Job } from '../../jobs/model/jobModel.js';
import { BlogModel } from '../../blogs/model/blogModel.js';
import { Scholarship } from '../../scholorship/model/scholorshipModel.js';
import { Stream } from '../../streams/model/streamModel.js';

function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const globalSearch = asyncHandler(async (req: Request, res: Response) => {
    const { query } = req.query;

    const emptyPayload = {
        colleges: [],
        courses: [],
        exams: [],
        jobs: [],
        blogs: [],
        scholarships: [],
    };

    if (!query || typeof query !== 'string') {
        return ApiResponse.success(res, 200, emptyPayload, 'No query provided');
    }

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
        return ApiResponse.success(res, 200, emptyPayload, 'No query provided');
    }

    const searchRegex = new RegExp(escapeRegex(trimmedQuery), 'i');

    // Resolve streams up-front so Course search can also match by stream name.
    // e.g. searching "engineering" should return courses under the Engineering
    // stream, not just courses whose name literally contains "engineering".
    const matchingStreams = await Stream.find({ name: searchRegex })
        .select('_id')
        .limit(10)
        .lean();
    const matchingStreamIds = matchingStreams.map((s) => s._id);

    const [colleges, courses, exams, jobs, blogs, scholarships] = await Promise.all([
        College.find({
            $or: [
                { name: searchRegex },
                { city: searchRegex },
                { state: searchRegex },
            ],
        })
            .select('name city state logo type')
            .limit(5)
            .lean(),

        Course.find({
            $or: [
                { name: searchRegex },
                { shortDescription: searchRegex },
                { type: searchRegex },
                ...(matchingStreamIds.length
                    ? [{ stream: { $in: matchingStreamIds } }]
                    : []),
            ],
        })
            .select('name shortDescription duration type stream cardImage')
            .populate('stream', 'name')
            .limit(5)
            .lean(),

        Exam.find({
            $or: [
                { fullName: searchRegex },
                { shortName: searchRegex },
            ],
        })
            .select('fullName shortName examDate logo')
            .limit(5)
            .lean(),

        Job.find({
            $or: [
                { jobTitle: searchRegex },
                { companyName: searchRegex },
            ],
        })
            .select('jobTitle companyName location salary')
            .limit(5)
            .lean(),

        BlogModel.find({
            $or: [
                { title: searchRegex },
                { tags: searchRegex },
                { category: searchRegex },
            ],
        })
            .select('title slug thumbnail category')
            .limit(5)
            .lean(),

        Scholarship.find({
            $or: [
                { scholarshipName: searchRegex },
                { scholarshipType: searchRegex },
                { fundingType: searchRegex },
                { description: searchRegex },
            ],
        })
            .select('scholarshipName scholarshipType fundingType deadline status')
            .limit(5)
            .lean(),
    ]);

    return ApiResponse.success(res, 200, {
        colleges,
        courses,
        exams,
        jobs,
        blogs,
        scholarships,
    }, 'Search results fetched successfully');
});

export const searchController = {
    globalSearch,
};

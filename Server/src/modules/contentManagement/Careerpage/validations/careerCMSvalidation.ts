import { body } from 'express-validator';
import type { ValidationChain } from 'express-validator';

export const updateCareersCMSValidation: ValidationChain[] = [
    // Hero Section
    body('heroSection.enabled').optional().isBoolean(),
    body('heroSection.primaryHeadline').optional().trim().isString().isLength({ max: 100 }),
    body('heroSection.subHeadline').optional().trim().isString().isLength({ max: 350 }),

    // Second Section
    body('secondSection.enabled').optional().isBoolean(),
    body('secondSection.primaryHeadline').optional().trim().isString().isLength({ max: 100 }),
    body('secondSection.paragraph').optional().trim().isString().isLength({ max: 1000 }),
    body('secondSection.images').optional().isArray(),
    body('secondSection.images.*.url').optional().trim().isString(),
    body('secondSection.images.*.alt').optional().trim().isString(),

    // Jobs Section
    body('jobs').optional().isArray(),
    body('jobs.*.enabled').optional().isBoolean(),
    body('jobs.*.jobTitle').optional().trim().isString(),
    body('jobs.*.companyName').optional().trim().isString(),
    body('jobs.*.jobType').optional().isIn(['Full Time', 'Part Time', 'Internship', 'Contract', 'Freelance']),
    body('jobs.*.location').optional().trim().isString(),
    body('jobs.*.companyWebsite').optional().trim().isString(),
    body('jobs.*.aboutJob').optional().trim().isString().isLength({ max: 1000 }),
    body('jobs.*.aboutYou').optional().isArray(),
];

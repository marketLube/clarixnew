import { body } from 'express-validator';
import type { ValidationChain } from 'express-validator';

export const updateFooterCMSValidation: ValidationChain[] = [
    body('enabled').optional().isBoolean(),
    body('primaryHeadline').optional().trim().isString().isLength({ max: 100 }),
    body('subHeadline').optional().trim().isString().isLength({ max: 350 }),
    body('locationLink').optional().trim().isString(),
    body('contactNumber').optional().trim().isString(),
    body('email').optional().trim().isEmail(),

    // Newsletter
    body('newsletter.enabled').optional().isBoolean(),
    body('newsletter.primaryHeadline').optional().trim().isString().isLength({ max: 100 }),
    body('newsletter.subHeadline').optional().trim().isString().isLength({ max: 350 }),
    body('newsletter.primaryButtonText').optional().trim().isString(),
    body('newsletter.primaryButtonLink').optional().trim().isString(),

    // Navigation Links Validation Helper
    body('exploreColleges').optional().isArray(),
    body('exploreColleges.*.label').optional().trim().isString(),
    body('exploreColleges.*.url').optional().trim().isString(),

    body('courses').optional().isArray(),
    body('courses.*.label').optional().trim().isString(),
    body('courses.*.url').optional().trim().isString(),

    body('exams').optional().isArray(),
    body('exams.*.label').optional().trim().isString(),
    body('exams.*.url').optional().trim().isString(),

    body('admissions').optional().isArray(),
    body('admissions.*.label').optional().trim().isString(),
    body('admissions.*.url').optional().trim().isString(),

    body('scholarships').optional().isArray(),
    body('scholarships.*.label').optional().trim().isString(),
    body('scholarships.*.url').optional().trim().isString(),

    body('about').optional().isArray(),
    body('about.*.label').optional().trim().isString(),
    body('about.*.url').optional().trim().isString(),
];

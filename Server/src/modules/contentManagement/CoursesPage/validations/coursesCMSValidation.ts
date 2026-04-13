import { body } from 'express-validator';

export const updateCoursesCMSValidation = [
    // Hero Section
    body('heroSection.enabled').optional().isBoolean(),
    body('heroSection.primaryHeadline').optional().trim().isString().isLength({ max: 100 }),
    body('heroSection.subHeadline').optional().trim().isString().isLength({ max: 350 }),
];

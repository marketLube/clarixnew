import { body, param, query } from 'express-validator';
import type { ValidationChain } from 'express-validator';

export const createRecruiterValidation: ValidationChain[] = [
    body('companyName')
        .trim()
        .notEmpty()
        .withMessage('Company name is required')
        .isLength({ min: 2, max: 200 })
        .withMessage('Company name must be between 2 and 200 characters'),

    body('jobTitle')
        .trim()
        .notEmpty()
        .withMessage('Job title is required')
        .isLength({ min: 2, max: 200 })
        .withMessage('Job title must be between 2 and 200 characters'),

    body('hiringDuration')
        .trim()
        .notEmpty()
        .withMessage('Hiring duration is required'),

    body('industry')
        .optional()
        .trim(),

    body('logo')
        .optional()
        .trim(),
];

export const updateRecruiterValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('Recruiter ID is required')
        .isMongoId()
        .withMessage('Invalid recruiter ID format'),

    body('companyName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 200 })
        .withMessage('Company name must be between 2 and 200 characters'),

    body('jobTitle')
        .optional()
        .trim()
        .isLength({ min: 2, max: 200 })
        .withMessage('Job title must be between 2 and 200 characters'),

    body('hiringDuration')
        .optional()
        .trim(),

    body('industry')
        .optional()
        .trim(),

    body('logo')
        .optional()
        .trim(),
];

export const listRecruitersValidation: ValidationChain[] = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),

    query('search')
        .optional()
        .trim()
        .escape(),

    query('sortBy')
        .optional()
        .isIn(['companyName', 'jobTitle', 'createdAt', 'updatedAt'])
        .withMessage('Invalid sort field'),

    query('order')
        .optional()
        .isIn(['asc', 'desc'])
        .withMessage('Order must be asc or desc'),
];

export const getRecruiterByIdValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('Recruiter ID is required')
        .isMongoId()
        .withMessage('Invalid recruiter ID format'),
];

export const deleteRecruiterValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('Recruiter ID is required')
        .isMongoId()
        .withMessage('Invalid recruiter ID format'),
];

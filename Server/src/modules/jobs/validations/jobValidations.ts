import { body, param, query } from 'express-validator';
import type { ValidationChain } from 'express-validator';

export const listJobValidation: ValidationChain[] = [
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
        .isLength({ max: 200 })
        .withMessage('Search query must not exceed 200 characters')
        .escape(),

    query('jobType')
        .optional()
        .isIn(['Full Time', 'Part Time', 'Internship', 'Contract', 'Freelance'])
        .withMessage('Invalid job type'),

    query('status')
        .optional()
        .isIn(['active', 'inactive'])
        .withMessage('Invalid status value'),

    query('sortBy')
        .optional()
        .isIn(['jobTitle', 'companyName', 'createdAt', 'updatedAt'])
        .withMessage('Invalid sort field'),

    query('order')
        .optional()
        .isIn(['asc', 'desc'])
        .withMessage('Order must be either asc or desc'),
];

export const createJobValidation: ValidationChain[] = [
    body('jobTitle')
        .trim()
        .notEmpty()
        .withMessage('Job title is required')
        .isLength({ min: 2, max: 200 })
        .withMessage('Job title must be between 2 and 200 characters')
        .escape(),

    body('companyName')
        .trim()
        .notEmpty()
        .withMessage('Company name is required')
        .isLength({ min: 2, max: 200 })
        .withMessage('Company name must be between 2 and 200 characters')
        .escape(),

    body('jobType')
        .notEmpty()
        .withMessage('Job type is required')
        .isIn(['Full Time', 'Part Time', 'Internship', 'Contract', 'Freelance'])
        .withMessage('Invalid job type'),

    body('location')
        .trim()
        .notEmpty()
        .withMessage('Location is required'),

    body('salary.min')
        .notEmpty()
        .withMessage('Minimum salary is required')
        .isNumeric()
        .withMessage('Minimum salary must be a number'),

    body('salary.max')
        .notEmpty()
        .withMessage('Maximum salary is required')
        .isNumeric()
        .withMessage('Maximum salary must be a number'),

    body('salary.unit')
        .optional()
        .isIn(['LPA', 'Monthly', 'Hourly'])
        .withMessage('Invalid salary unit'),

    body('companyWebsite')
        .optional()
        .trim()
        .isURL()
        .withMessage('Invalid company website URL'),

    body('employeeSize')
        .optional()
        .trim(),

    body('industry')
        .optional()
        .trim(),

    body('shortDescription')
        .trim()
        .notEmpty()
        .withMessage('Short description is required'),

    body('aboutJob')
        .trim()
        .notEmpty()
        .withMessage('About job description is required'),

    body('aboutYou')
        .optional()
        .isArray()
        .withMessage('About you must be an array'),

    body('aboutRole')
        .optional()
        .isArray()
        .withMessage('About role must be an array'),

    body('faqs')
        .optional()
        .isArray()
        .withMessage('FAQs must be an array'),

    body('faqs.*.question')
        .if(body('faqs').exists())
        .notEmpty()
        .withMessage('FAQ question is required'),

    body('faqs.*.answer')
        .if(body('faqs').exists())
        .notEmpty()
        .withMessage('FAQ answer is required'),
];

export const updateJobValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('Job ID is required')
        .isMongoId()
        .withMessage('Invalid job ID format'),

    body('jobTitle')
        .optional()
        .trim()
        .isLength({ min: 2, max: 200 })
        .withMessage('Job title must be between 2 and 200 characters')
        .escape(),

    body('companyName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 200 })
        .withMessage('Company name must be between 2 and 200 characters')
        .escape(),

    body('jobType')
        .optional()
        .isIn(['Full Time', 'Part Time', 'Internship', 'Contract', 'Freelance'])
        .withMessage('Invalid job type'),

    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive must be a boolean'),
];

export const jobIdValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('Job ID is required')
        .isMongoId()
        .withMessage('Invalid job ID format'),
];

import { body, param, query } from 'express-validator';
import type { ValidationChain } from 'express-validator';

export const listScholarshipValidation: ValidationChain[] = [
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

    query('status')
        .optional()
        .isIn(['active', 'closed', 'upcoming'])
        .withMessage('Invalid status value'),

    query('type')
        .optional()
        .isIn([
            'Merit Based',
            'Need Based',
            'Government',
            'Private',
            'Sports',
            'Minority',
            'International',
        ])
        .withMessage('Invalid scholarship type'),

    query('fundingType')
        .optional()
        .isIn([
            'Full Funding',
            'Partial Funding',
            'Tuition Waiver',
            'Stipend',
            'One-Time Grant',
        ])
        .withMessage('Invalid funding type'),

    query('sortBy')
        .optional()
        .isIn(['scholarshipName', 'totalFundingAmount', 'deadline', 'createdAt', 'updatedAt'])
        .withMessage('Invalid sort field'),

    query('order')
        .optional()
        .isIn(['asc', 'desc'])
        .withMessage('Order must be either asc or desc'),
];

export const createScholarshipValidation: ValidationChain[] = [
    body('scholarshipName')
        .trim()
        .notEmpty()
        .withMessage('Scholarship name is required')
        .isLength({ min: 3, max: 200 })
        .withMessage('Scholarship name must be between 3 and 200 characters')
        .escape(),

    body('scholarshipType')
        .notEmpty()
        .withMessage('Scholarship type is required')
        .isIn([
            'Merit Based',
            'Need Based',
            'Government',
            'Private',
            'Sports',
            'Minority',
            'International',
        ])
        .withMessage('Invalid scholarship type'),

    body('fundingType')
        .notEmpty()
        .withMessage('Funding type is required')
        .isIn([
            'Full Funding',
            'Partial Funding',
            'Tuition Waiver',
            'Stipend',
            'One-Time Grant',
        ])
        .withMessage('Invalid funding type'),

    body('deadline')
        .notEmpty()
        .withMessage('Deadline is required')
        .isISO8601()
        .withMessage('Invalid deadline date format')
        .toDate(),

    body('totalFundingAmount')
        .notEmpty()
        .withMessage('Total funding amount is required')
        .isNumeric()
        .withMessage('Total funding amount must be a number')
        .toFloat(),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 10, max: 5000 })
        .withMessage('Description must be between 10 and 5000 characters')
        .escape(),

    body('officialWebsite')
        .trim()
        .notEmpty()
        .withMessage('Official website is required')
        .isURL()
        .withMessage('Invalid official website URL'),

    body('status')
        .optional()
        .isIn(['active', 'closed', 'upcoming'])
        .withMessage('Invalid status value'),
];

export const updateScholarshipValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('Scholarship ID is required')
        .isMongoId()
        .withMessage('Invalid scholarship ID format'),

    body('scholarshipName')
        .optional()
        .trim()
        .isLength({ min: 3, max: 200 })
        .withMessage('Scholarship name must be between 3 and 200 characters')
        .escape(),

    body('scholarshipType')
        .optional()
        .isIn([
            'Merit Based',
            'Need Based',
            'Government',
            'Private',
            'Sports',
            'Minority',
            'International',
        ])
        .withMessage('Invalid scholarship type'),

    body('fundingType')
        .optional()
        .isIn([
            'Full Funding',
            'Partial Funding',
            'Tuition Waiver',
            'Stipend',
            'One-Time Grant',
        ])
        .withMessage('Invalid funding type'),

    body('deadline')
        .optional()
        .isISO8601()
        .withMessage('Invalid deadline date format')
        .toDate(),

    body('totalFundingAmount')
        .optional()
        .isNumeric()
        .withMessage('Total funding amount must be a number')
        .toFloat(),

    body('description')
        .optional()
        .trim()
        .isLength({ min: 10, max: 5000 })
        .withMessage('Description must be between 10 and 5000 characters')
        .escape(),

    body('officialWebsite')
        .optional()
        .trim()
        .isURL()
        .withMessage('Invalid official website URL'),

    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive must be a boolean'),

    body('status')
        .optional()
        .isIn(['active', 'closed', 'upcoming'])
        .withMessage('Invalid status value'),
];

export const scholarshipIdValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('Scholarship ID is required')
        .isMongoId()
        .withMessage('Invalid scholarship ID format'),
];

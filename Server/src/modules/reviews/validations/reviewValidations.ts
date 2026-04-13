import { body, param, query } from 'express-validator';
import type { ValidationChain } from 'express-validator';

export const listReviewValidation: ValidationChain[] = [
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
        .isIn(['Pending', 'Approved', 'Rejected'])
        .withMessage('Invalid status value'),

    query('reviewType')
        .optional()
        .isIn(['College', 'Organization'])
        .withMessage('Invalid review type'),

    query('collegeId')
        .optional()
        .isMongoId()
        .withMessage('Invalid college ID format'),

    query('sortBy')
        .optional()
        .isIn(['userName', 'collegeName', 'reviewDate', 'createdAt', 'updatedAt', 'reviewType'])
        .withMessage('Invalid sort field'),

    query('order')
        .optional()
        .isIn(['asc', 'desc'])
        .withMessage('Order must be either asc or desc'),
];

export const createReviewValidation: ValidationChain[] = [
    body('userName')
        .trim()
        .notEmpty()
        .withMessage('User name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('User name must be between 2 and 100 characters'),

    body('userAvatar')
        .optional()
        .isURL()
        .withMessage('Avatar must be a valid URL'),

    body('reviewType')
        .notEmpty()
        .withMessage('Review type is required')
        .isIn(['College', 'Organization'])
        .withMessage('Invalid review type'),

    body('collegeId')
        .optional()
        .isMongoId()
        .withMessage('Invalid college ID format'),

    body('collegeName')
        .optional()
        .trim(),

    body('city')
        .optional()
        .trim(),

    body('course')
        .optional()
        .trim(),

    body('content')
        .trim()
        .notEmpty()
        .withMessage('Review content is required')
        .isLength({ min: 10, max: 2000 })
        .withMessage('Review content must be between 10 and 2000 characters'),

    body('reviewDate')
        .optional()
        .isISO8601()
        .withMessage('Invalid date format')
        .toDate(),
];

export const updateReviewValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('Review ID is required')
        .isMongoId()
        .withMessage('Invalid review ID format'),

    body('userName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 }),

    body('content')
        .optional()
        .trim()
        .isLength({ min: 10, max: 2000 }),

    body('status')
        .optional()
        .isIn(['Pending', 'Approved', 'Rejected'])
        .withMessage('Invalid status value'),

    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive must be a boolean'),
];

export const reviewIdValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('Review ID is required')
        .isMongoId()
        .withMessage('Invalid review ID format'),
];

import { body, param, query } from 'express-validator';
import type { ValidationChain } from 'express-validator';

export const createStreamValidation: ValidationChain[] = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Stream name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Stream name must be between 2 and 100 characters'),

    body('collegesCount')
        .notEmpty()
        .withMessage('Number of colleges is required')
        .isInt({ min: 0 })
        .withMessage('Number of colleges must be a non-negative integer'),

    body('enabled')
        .optional()
        .isBoolean()
        .withMessage('Enabled must be a boolean value'),
];

export const updateStreamValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('Stream ID is required')
        .isMongoId()
        .withMessage('Invalid stream ID format'),

    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Stream name must be between 2 and 100 characters'),

    body('collegesCount')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Number of colleges must be a non-negative integer'),

    body('enabled')
        .optional()
        .isBoolean()
        .withMessage('Enabled must be a boolean value'),
];

export const getStreamByIdValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('Stream ID is required')
        .isMongoId()
        .withMessage('Invalid stream ID format'),
];

export const listStreamsValidation: ValidationChain[] = [
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

    query('enabled')
        .optional()
        .isIn(['true', 'false'])
        .withMessage('Enabled must be true or false'),

    query('sortBy')
        .optional()
        .isIn(['name', 'createdAt', 'updatedAt'])
        .withMessage('Sort by must be one of: name, createdAt, updatedAt'),

    query('order')
        .optional()
        .isIn(['asc', 'desc'])
        .withMessage('Order must be asc or desc'),
];

export const deleteStreamValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('Stream ID is required')
        .isMongoId()
        .withMessage('Invalid stream ID format'),
];

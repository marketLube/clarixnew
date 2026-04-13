import { body, param, query } from 'express-validator';
import type { ValidationChain } from 'express-validator';

export const createUniversityValidation: ValidationChain[] = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('University name is required')
        .isLength({ min: 2, max: 200 })
        .withMessage('University name must be between 2 and 200 characters'),

    body('type')
        .trim()
        .notEmpty()
        .withMessage('University type is required')
        .isIn(['Public', 'Private', 'State', 'Central', 'Deemed'])
        .withMessage('Type must be one of: Public, Private, State, Central, Deemed'),

    body('state')
        .trim()
        .notEmpty()
        .withMessage('State is required'),

    body('city')
        .trim()
        .notEmpty()
        .withMessage('City is required'),

    body('establishedYear')
        .notEmpty()
        .withMessage('Established year is required')
        .isInt({ min: 1800, max: new Date().getFullYear() })
        .withMessage('Established year must be a valid year'),
];

export const updateUniversityValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('University ID is required')
        .isMongoId()
        .withMessage('Invalid university ID format'),

    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 200 })
        .withMessage('University name must be between 2 and 200 characters'),

    body('type')
        .optional()
        .trim()
        .isIn(['Public', 'Private', 'State', 'Central', 'Deemed'])
        .withMessage('Invalid university type'),

    body('state')
        .optional()
        .trim(),

    body('city')
        .optional()
        .trim(),

    body('establishedYear')
        .optional()
        .isInt({ min: 1800, max: new Date().getFullYear() })
        .withMessage('Established year must be a valid year'),
];

export const getUniversityByIdValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('University ID is required')
        .isMongoId()
        .withMessage('Invalid university ID format'),
];

export const listUniversitiesValidation: ValidationChain[] = [
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

    query('type')
        .optional()
        .isIn(['Public', 'Private', 'State', 'Central', 'Deemed', 'all'])
        .withMessage('Invalid type filter'),

    query('sortBy')
        .optional()
        .isIn(['name', 'establishedYear', 'createdAt', 'updatedAt'])
        .withMessage('Invalid sort field'),

    query('order')
        .optional()
        .isIn(['asc', 'desc'])
        .withMessage('Order must be asc or desc'),
];

export const deleteUniversityValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('University ID is required')
        .isMongoId()
        .withMessage('Invalid university ID format'),
];

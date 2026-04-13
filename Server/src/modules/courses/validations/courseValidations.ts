import { body, param, query } from 'express-validator';
import type { ValidationChain } from 'express-validator';

/**
 * Validation rules for creating a course
 */
export const createCourseValidation: ValidationChain[] = [
    // Basic Info
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Course name is required')
        .isLength({ min: 2, max: 200 })
        .withMessage('Course name must be between 2 and 200 characters'),

    body('stream')
        .notEmpty()
        .withMessage('Stream name is required')
        .trim(),

    body('type')
        .trim()
        .notEmpty()
        .withMessage('Course type is required')
        .isIn(['Full Time', 'Part Time', 'Online', 'Distance', 'Other'])
        .withMessage('Course type must be one of: Full Time, Part Time, Online, Distance, Other'),

    body('duration')
        .trim()
        .notEmpty()
        .withMessage('Duration is required'),

    body('fees')
        .trim()
        .notEmpty()
        .withMessage('Fees is required'),

    body('intakeCapacity')
        .trim()
        .notEmpty()
        .withMessage('Intake capacity is required'),

    body('eligibility')
        .notEmpty()
        .withMessage('Eligibility criteria is required'),

    // Images
    body('cardImage')
        .optional()
        .trim(),

    body('heroImage')
        .optional()
        .trim(),

    // Nested objects (sent as JSON strings from FormData)
    body('description').optional(),
    body('whyChoose').optional(),
    body('syllabus').optional(),
    body('careerOpportunities').optional(),
    body('about').optional(),

];

/**
 * Validation rules for updating a course
 */
export const updateCourseValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('Course ID is required')
        .isMongoId()
        .withMessage('Invalid course ID format'),

    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 200 })
        .withMessage('Course name must be between 2 and 200 characters'),

    body('stream')
        .optional()
        .trim(),

    body('type')
        .optional()
        .trim()
        .isIn(['Full Time', 'Part Time', 'Online', 'Distance', 'Other'])
        .withMessage('Invalid course type'),

    body('duration').optional().trim(),
    body('fees').optional().trim(),
    body('intakeCapacity').optional().trim(),

    body('eligibility')
        .optional(),

    body('cardImage')
        .optional()
        .trim(),

    body('heroImage')
        .optional()
        .trim(),

    // Nested objects (sent as JSON strings from FormData)
    body('description').optional(),
    body('whyChoose').optional(),
    body('syllabus').optional(),
    body('careerOpportunities').optional(),
    body('about').optional(),

];

/**
 * Validation rules for getting a course by ID
 */
export const getCourseByIdValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('Course ID is required')
        .isMongoId()
        .withMessage('Invalid course ID format'),
];

/**
 * Validation rules for listing courses
 */
export const listCoursesValidation: ValidationChain[] = [
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
];

/**
 * Validation rules for deleting a course
 */
export const deleteCourseValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('Course ID is required')
        .isMongoId()
        .withMessage('Invalid course ID format'),
];

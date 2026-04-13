import { body, param, query } from 'express-validator';
import type { ValidationChain } from 'express-validator';


export const listExamsValidation: ValidationChain[] = [
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
        .isIn(['active', 'inactive'])
        .withMessage('Invalid status value'),

    query('sortBy')
        .optional()
        .isIn(['fullName', 'shortName', 'registrationDate', 'examDate', 'createdAt', 'updatedAt'])
        .withMessage('Invalid sort field'),

    query('order')
        .optional()
        .isIn(['asc', 'desc'])
        .withMessage('Order must be either asc or desc'),
];

export const createExamValidation: ValidationChain[] = [
    body('shortName')
        .trim()
        .notEmpty()
        .withMessage('Short name is required')
        .isLength({ min: 2, max: 20 })
        .withMessage('Short name must be between 2 and 20 characters')
        .escape(),

    body('fullName')
        .trim()
        .notEmpty()
        .withMessage('Full name is required')
        .isLength({ min: 5, max: 200 })
        .withMessage('Full name must be between 5 and 200 characters')
        .escape(),

    body('registrationDate')
        .notEmpty()
        .withMessage('Registration date is required')
        .isISO8601()
        .withMessage('Invalid registration date format')
        .toDate(),

    body('examDate')
        .notEmpty()
        .withMessage('Exam date is required')
        .isISO8601()
        .withMessage('Invalid exam date format')
        .toDate(),

    body('resultPublishDate')
        .notEmpty()
        .withMessage('Result publish date is required')
        .isISO8601()
        .withMessage('Invalid result publish date format')
        .toDate(),

    body('qualificationRequired')
        .custom((value) => {
            // Parse if string (for multipart/form-data)
            let parsed = value;
            if (typeof value === 'string') {
                try {
                    parsed = JSON.parse(value);
                } catch {
                    return false;
                }
            }
            // Check if array with at least one element
            return Array.isArray(parsed) && parsed.length >= 1;
        })
        .withMessage('At least one qualification is required'),

    body('collegesAccepting')
        .notEmpty()
        .withMessage('Colleges accepting count is required')
        .isInt({ min: 0 })
        .withMessage('Colleges accepting must be a positive integer')
        .toInt(),

    body('officialWebsite')
        .trim()
        .notEmpty()
        .withMessage('Official website is required')
        .isURL()
        .withMessage('Invalid official website URL'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 10 })
        .withMessage('Description must be at least 10 characters')
        .escape(),

    body('logo')
        .optional()
        .custom((value) => {
            // Skip validation if it's a file upload (multer will handle it)
            // Only validate if it's a URL string (for updates without file)
            if (typeof value === 'string' && value.length > 0) {
                return value.startsWith('http://') || value.startsWith('https://');
            }
            return true;
        })
        .withMessage('Invalid logo URL format'),
];

/**
 * Validation rules for updating an exam
 */
export const updateExamValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('Exam ID is required')
        .isMongoId()
        .withMessage('Invalid exam ID format'),

    body('shortName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 20 })
        .withMessage('Short name must be between 2 and 20 characters')
        .escape(),

    body('fullName')
        .optional()
        .trim()
        .isLength({ min: 5, max: 200 })
        .withMessage('Full name must be between 5 and 200 characters')
        .escape(),

    body('registrationDate')
        .optional()
        .isISO8601()
        .withMessage('Invalid registration date format')
        .toDate(),

    body('examDate')
        .optional()
        .isISO8601()
        .withMessage('Invalid exam date format')
        .toDate(),

    body('resultPublishDate')
        .optional()
        .isISO8601()
        .withMessage('Invalid result publish date format')
        .toDate(),

    body('qualificationRequired')
        .optional()
        .custom((value) => {
            // Parse if string (for multipart/form-data)
            let parsed = value;
            if (typeof value === 'string') {
                try {
                    parsed = JSON.parse(value);
                } catch {
                    return false;
                }
            }
            // Check if array
            return Array.isArray(parsed);
        })
        .withMessage('Qualifications must be an array'),

    body('collegesAccepting')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Colleges accepting must be a positive integer')
        .toInt(),

    body('officialWebsite')
        .optional()
        .trim()
        .isURL()
        .withMessage('Invalid official website URL'),

    body('description')
        .optional()
        .trim()
        .escape(),

    body('logo')
        .optional()
        .trim()
        .isURL()
        .withMessage('Invalid logo URL'),

    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive must be a boolean'),
];

/**
 * Validation rules for operations by ID
 */
export const examIdValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('Exam ID is required')
        .isMongoId()
        .withMessage('Invalid exam ID format'),
];

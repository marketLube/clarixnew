import { body, param, query } from 'express-validator';
import type { ValidationChain } from 'express-validator';

/**
 * Validation rules for creating a college
 * Validates and sanitizes all input data based on the complete college schema
 */
export const createCollegeValidation: ValidationChain[] = [
    // Basic Information
    body('name')
        .trim()
        .notEmpty()
        .withMessage('College name is required')
        .isLength({ min: 3, max: 200 })
        .withMessage('College name must be between 3 and 200 characters')
        .matches(/^[a-zA-Z0-9\s\-&'.()]+$/)
        .withMessage('College name contains invalid characters')
        .escape(),

    body('state')
        .trim()
        .notEmpty()
        .withMessage('State is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('State must be between 2 and 100 characters')
        .escape(),

    body('city')
        .trim()
        .notEmpty()
        .withMessage('City is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('City must be between 2 and 100 characters')
        .escape(),

    body('type')
        .trim()
        .notEmpty()
        .withMessage('College type is required')
        .toLowerCase()
        .isIn(['public', 'private', 'government', 'deemed'])
        .withMessage('College type must be one of: public, private, government, deemed'),

    body('rating')
        .optional()
        .isFloat({ min: 0, max: 5 })
        .withMessage('Rating must be between 0 and 5')
        .toFloat(),

    body('establishedYear')
        .notEmpty()
        .withMessage('Established year is required')
        .isInt({ min: 1800, max: new Date().getFullYear() })
        .withMessage(`Established year must be between 1800 and ${new Date().getFullYear()}`)
        .toInt(),

    body('accreditation')
        .trim()
        .notEmpty()
        .withMessage('Accreditation is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Accreditation must be between 2 and 100 characters')
        .escape(),

    // Logo and Brochure are handled by multer middleware
    // The validation will occur in the controller after file upload
    body('logo')
        .optional()
        .custom((value) => {
            // Skip validation if it's a file upload (multer will handle it)
            // Only validate if it's a URL string (for updates)
            if (typeof value === 'string' && value.length > 0) {
                return value.startsWith('http://') || value.startsWith('https://');
            }
            return true;
        })
        .withMessage('Invalid logo URL format'),

    body('brochure')
        .optional()
        .custom((value) => {
            // Skip validation if it's a file upload (multer will handle it)
            // Only validate if it's a URL string (for updates)
            if (typeof value === 'string' && value.length > 0) {
                return value.startsWith('http://') || value.startsWith('https://');
            }
            return true;
        })
        .withMessage('Invalid brochure URL format'),

    // Description & Details
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 10, max: 5000 })
        .withMessage('Description must be between 10 and 5000 characters')
        .escape(),

    body('university')
        .notEmpty()
        .withMessage('University ID is required')
        .isMongoId()
        .withMessage('Invalid university ID format'),

    body('students')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Number of students must be a positive integer')
        .toInt(),

    body('campusSize')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Campus size must not exceed 100 characters')
        .escape(),

    // Placement Information
    body('averageSalary')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Average salary must be a positive number')
        .toFloat(),

    body('placementPercentage')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('Placement percentage must be between 0 and 100')
        .toFloat(),

    body('highestSalary')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Highest salary must be a positive number')
        .toFloat(),

    body('studentsWithInternships')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('Students with internships percentage must be between 0 and 100')
        .toFloat(),

    body('avgStipend')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Average stipend must be a positive number')
        .toFloat(),

    body('ppoConversionRate')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('PPO conversion rate percentage must be between 0 and 100')
        .toFloat(),

    body('alumniInFortune500')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('Alumni in Fortune 500 percentage must be between 0 and 100')
        .toFloat(),

    body('alumniEntrepreneurs')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('Alumni entrepreneurs percentage must be between 0 and 100')
        .toFloat(),

    body('alumniHigherStudiesAbroad')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('Alumni higher studies abroad percentage must be between 0 and 100')
        .toFloat(),

    // Recruiters - accept both array and JSON string (for multipart/form-data)
    body('recruiters')
        .optional()
        .custom((value) => {
            // Parse if string
            let parsed = value;
            if (typeof value === 'string') {
                try {
                    parsed = JSON.parse(value);
                } catch {
                    return false;
                }
            }

            // Check if array
            if (!Array.isArray(parsed)) return false;

            // Allow empty array
            if (parsed.length === 0) return true;

            // Validate each element is a string or number
            return parsed.every((item: any) => {
                return typeof item === 'string' || typeof item === 'number';
            });
        })
        .withMessage('Recruiters must be an array of strings or numbers'),

    // Courses - accept both array and JSON string
    body('courses')
        .optional()
        .custom((value) => {
            // Parse if string
            let parsed = value;
            if (typeof value === 'string') {
                try {
                    parsed = JSON.parse(value);
                } catch {
                    return false;
                }
            }

            // Check if array
            if (!Array.isArray(parsed)) return false;

            // Allow empty array
            if (parsed.length === 0) return true;

            // Validate each element is a valid MongoDB ObjectId (24 hex characters)
            return parsed.every((id: any) => {
                if (typeof id !== 'string') return false;
                return /^[a-f\d]{24}$/i.test(id);
            });
        })
        .withMessage('Courses must be an array of valid MongoDB ObjectIds'),

    // Admission Dates
    body('applicationOpeningDate')
        .optional()
        .isISO8601()
        .withMessage('Invalid application opening date format')
        .toDate(),

    body('applicationClosingDate')
        .optional()
        .isISO8601()
        .withMessage('Invalid application closing date format')
        .toDate(),

    body('entranceExam')
        .optional()
        .isMongoId()
        .withMessage('Invalid entrance exam ID format'),

    body('entranceExamDate')
        .optional()
        .isISO8601()
        .withMessage('Invalid entrance exam date format')
        .toDate(),

    body('meritListAnnouncementDate')
        .optional()
        .isISO8601()
        .withMessage('Invalid merit list announcement date format')
        .toDate(),

    body('counsellingStartsFrom')
        .optional()
        .isISO8601()
        .withMessage('Invalid counselling start date format')
        .toDate(),

    body('accademicSectionStartsFrom')
        .optional()
        .isISO8601()
        .withMessage('Invalid academic section start date format')
        .toDate(),

    body('admissionMode')
        .optional()
        .trim()
        .isLength({ max: 10000 })
        .withMessage('Admission mode must not exceed 100 characters')
        .escape(),

    // Fees Information
    body('hostelFee')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Hostel fee must not exceed 100 characters')
        .escape(),

    body('messFee')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Mess fee must not exceed 100 characters')
        .escape(),

    body('libraryFee')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Library fee must not exceed 100 characters')
        .escape(),

    body('laboratoryFee')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Laboratory fee must not exceed 100 characters')
        .escape(),

    body('sportsFee')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Sports fee must not exceed 100 characters')
        .escape(),

    // Scholarships - accept both array and JSON string
    body('scholarships')
        .optional()
        .custom((value) => {
            // Parse if string
            let parsed = value;
            if (typeof value === 'string') {
                try {
                    parsed = JSON.parse(value);
                } catch {
                    return false;
                }
            }

            // Check if array
            if (!Array.isArray(parsed)) return false;

            // Allow empty array
            if (parsed.length === 0) return true;

            // Validate each element is a valid MongoDB ObjectId (24 hex characters)
            return parsed.every((id: any) => {
                if (typeof id !== 'string') return false;
                return /^[a-f\d]{24}$/i.test(id);
            });
        })
        .withMessage('Scholarships must be an array of valid MongoDB ObjectIds'),

    // // Facilities & Campus Life - accept both array and JSON string
    // body('facilities')
    //     .optional()
    //     .custom((value) => {
    //         if (Array.isArray(value)) return true;
    //         if (typeof value === 'string') {
    //             try {
    //                 const parsed = JSON.parse(value);
    //                 return Array.isArray(parsed);
    //             } catch {
    //                 return false;
    //             }
    //         }
    //         return false;
    //     })
    //     .withMessage('Facilities must be an array or valid JSON array string'),

    // body('clubsandsocieties')
    //     .optional()
    //     .custom((value) => {
    //         if (Array.isArray(value)) return true;
    //         if (typeof value === 'string') {
    //             try {
    //                 const parsed = JSON.parse(value);
    //                 return Array.isArray(parsed);
    //             } catch {
    //                 return false;
    //             }
    //         }
    //         return false;
    //     })
    //     .withMessage('Clubs and societies must be an array or valid JSON array string'),

    // body('campusLifeDescription')
    //     .optional()
    //     .trim()
    //     .isLength({ max: 2000 })
    //     .withMessage('Campus life description must not exceed 2000 characters')
    //     .escape(),

    // // Images - handled by multer, will be populated in controller
    // // No validation needed here as multer handles file uploads

    // FAQs - Accept JSON strings for multipart/form-data
    body('admissionFaqs')
        .optional()
        .custom((value) => {
            if (Array.isArray(value)) return true;
            if (typeof value === 'string') {
                try {
                    const parsed = JSON.parse(value);
                    return Array.isArray(parsed);
                } catch {
                    return false;
                }
            }
            return false;
        })
        .withMessage('Admission FAQs must be an array or valid JSON array string'),

    body('courseFaqs')
        .optional()
        .custom((value) => {
            if (Array.isArray(value)) return true;
            if (typeof value === 'string') {
                try {
                    const parsed = JSON.parse(value);
                    return Array.isArray(parsed);
                } catch {
                    return false;
                }
            }
            return false;
        })
        .withMessage('Course FAQs must be an array or valid JSON array string'),

    body('feesPaymentFaqs')
        .optional()
        .custom((value) => {
            if (Array.isArray(value)) return true;
            if (typeof value === 'string') {
                try {
                    const parsed = JSON.parse(value);
                    return Array.isArray(parsed);
                } catch {
                    return false;
                }
            }
            return false;
        })
        .withMessage('Fees payment FAQs must be an array or valid JSON array string'),

    body('scholarshipFaqs')
        .optional()
        .custom((value) => {
            if (Array.isArray(value)) return true;
            if (typeof value === 'string') {
                try {
                    const parsed = JSON.parse(value);
                    return Array.isArray(parsed);
                } catch {
                    return false;
                }
            }
            return false;
        })
        .withMessage('Scholarship FAQs must be an array or valid JSON array string'),

    body('campusLife')
        .optional()
        .custom((value) => {
            if (Array.isArray(value)) return true;
            if (typeof value === 'string') {
                try {
                    const parsed = JSON.parse(value);
                    return Array.isArray(parsed);
                } catch {
                    return false;
                }
            }
            return false;
        })
        .withMessage('Campus Life must be an array or valid JSON array string'),

    body(['campusImages', 'hostelImages', 'labsImages', 'eventsImages'])
        .optional()
        .custom((value) => {
            if (Array.isArray(value)) return true;
            if (typeof value === 'string') {
                try {
                    const parsed = JSON.parse(value);
                    return Array.isArray(parsed);
                } catch {
                    return false;
                }
            }
            return false;
        })
        .withMessage('Gallery images must be an array or valid JSON array string'),
];


export const updateCollegeValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('College ID is required')
        .isMongoId()
        .withMessage('Invalid college ID format'),

    body('name')
        .optional()
        .trim()
        .isLength({ min: 3, max: 200 })
        .withMessage('College name must be between 3 and 200 characters')
        .matches(/^[a-zA-Z0-9\s\-&'.()]+$/)
        .withMessage('College name contains invalid characters')
        .escape(),

    body('location')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Location must be between 2 and 100 characters')
        .escape(),

    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),

    body('phone')
        .optional()
        .trim()
        .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/)
        .withMessage('Invalid phone number format'),

    body('website')
        .optional()
        .trim()
        .isURL({ protocols: ['http', 'https'], require_protocol: true })
        .withMessage('Invalid website URL'),

    body('establishedYear')
        .optional()
        .isInt({ min: 1800, max: new Date().getFullYear() })
        .withMessage(`Established year must be between 1800 and ${new Date().getFullYear()}`),

    body('type')
        .optional()
        .trim()
        .isIn(['Public', 'Private', 'Government', 'Deemed'])
        .withMessage('College type must be one of: Public, Private, Government, Deemed'),

    body('rating')
        .optional()
        .isFloat({ min: 0, max: 5 })
        .withMessage('Rating must be between 0 and 5')
        .toFloat(),

    body('campusLife')
        .optional()
        .custom((value) => {
            if (Array.isArray(value)) return true;
            if (typeof value === 'string') {
                try {
                    const parsed = JSON.parse(value);
                    return Array.isArray(parsed);
                } catch {
                    return false;
                }
            }
            return false;
        })
        .withMessage('Campus Life must be an array or valid JSON array string'),

    body(['campusImages', 'hostelImages', 'labsImages', 'eventsImages'])
        .optional()
        .custom((value) => {
            if (Array.isArray(value)) return true;
            if (typeof value === 'string') {
                try {
                    const parsed = JSON.parse(value);
                    return Array.isArray(parsed);
                } catch {
                    return false;
                }
            }
            return false;
        })
        .withMessage('Gallery images must be an array or valid JSON array string'),
];


export const getCollegeByIdValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('College ID is required')
        .isMongoId()
        .withMessage('Invalid college ID format'),
];


export const listCollegesValidation: ValidationChain[] = [
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

    query('type')
        .optional()
        .trim()
        .isIn(['Public', 'Private', 'Government', 'Deemed'])
        .withMessage('Invalid college type'),

    query('location')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Location must not exceed 100 characters')
        .escape(),

    query('sortBy')
        .optional()
        .isIn(['name', 'establishedYear', 'createdAt', 'updatedAt'])
        .withMessage('Invalid sort field'),

    query('order')
        .optional()
        .isIn(['asc', 'desc'])
        .withMessage('Order must be either asc or desc'),
];


export const deleteCollegeValidation: ValidationChain[] = [
    param('id')
        .notEmpty()
        .withMessage('College ID is required')
        .isMongoId()
        .withMessage('Invalid college ID format'),
];
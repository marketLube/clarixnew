import { body } from 'express-validator';
import type { ValidationChain } from 'express-validator';

// Signup: name + email + mobileNumber (and optional role)
export const registerUserValidation: ValidationChain[] = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be a valid email address')
        .isLength({ max: 150 })
        .withMessage('Email must not exceed 150 characters'),

    body('mobileNumber')
        .trim()
        .notEmpty()
        .withMessage('Mobile number is required')
        .isLength({ min: 8, max: 20 })
        .withMessage('Mobile number must be between 8 and 20 characters'),

    body('role')
        .optional()
        .isIn(['student', 'admin'])
        .withMessage('Role must be either student or admin'),
];

// Admin login: email + password
export const passwordLoginValidation: ValidationChain[] = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be a valid email address'),

    body('password')
        .notEmpty()
        .withMessage('Password is required'),
];

// Student login: email + OTP
export const requestOtpValidation: ValidationChain[] = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be a valid email address'),
];

export const verifyOtpValidation: ValidationChain[] = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be a valid email address'),

    body('otp')
        .trim()
        .notEmpty()
        .withMessage('OTP is required')
        .isLength({ min: 4, max: 6 })
        .withMessage('OTP must be between 4 and 6 digits'),
];

// Student signup: name + email + mobile + password -> request OTP
export const signupRequestOtpValidation: ValidationChain[] = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be a valid email address')
        .isLength({ max: 150 })
        .withMessage('Email must not exceed 150 characters'),

    body('mobileNumber')
        .trim()
        .notEmpty()
        .withMessage('Mobile number is required')
        .isLength({ min: 8, max: 20 })
        .withMessage('Mobile number must be between 8 and 20 characters'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

// Student signup: verify OTP
export const signupVerifyOtpValidation: ValidationChain[] = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be a valid email address'),

    body('otp')
        .trim()
        .notEmpty()
        .withMessage('OTP is required')
        .isLength({ min: 4, max: 6 })
        .withMessage('OTP must be between 4 and 6 digits'),
];

// Admin forgot-password: request OTP
export const adminForgotPasswordRequestValidation: ValidationChain[] = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be a valid email address'),
];

// Admin forgot-password: reset with OTP + new password
export const adminResetPasswordValidation: ValidationChain[] = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be a valid email address'),

    body('otp')
        .trim()
        .notEmpty()
        .withMessage('OTP is required')
        .isLength({ min: 4, max: 6 })
        .withMessage('OTP must be between 4 and 6 digits'),

    body('newPassword')
        .notEmpty()
        .withMessage('New password is required')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters long'),
];

// Create admin with email + password
export const createAdminValidation: ValidationChain[] = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be a valid email address')
        .isLength({ max: 150 })
        .withMessage('Email must not exceed 150 characters'),

    body('mobileNumber')
        .trim()
        .notEmpty()
        .withMessage('Mobile number is required')
        .isLength({ min: 8, max: 20 })
        .withMessage('Mobile number must be between 8 and 20 characters'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

import { Router } from 'express';
import { userController } from '../controllers/userControllers.js';
import { validate, validateFirst } from '../../../middlewares/validate.middleware.js';
import {
    registerUserValidation,
    passwordLoginValidation,
    requestOtpValidation,
    verifyOtpValidation,
    signupRequestOtpValidation,
    signupVerifyOtpValidation,
    adminForgotPasswordRequestValidation,
    adminResetPasswordValidation,
    createAdminValidation,
} from '../validations/userValidations.js';

const router = Router();

// SIGNUP
router.post('/register', registerUserValidation, validate, userController.registerUser);

// STUDENT SIGNUP WITH OTP
router.post(
    '/signup/request-otp',
    signupRequestOtpValidation,
    validateFirst,
    userController.signupRequestOtp,
);
router.post(
    '/signup/verify-otp',
    signupVerifyOtpValidation,
    validateFirst,
    userController.signupVerifyOtp,
);

// ADMIN LOGIN (email + password)
router.post('/login', passwordLoginValidation, validateFirst, userController.loginWithPassword);

// CREATE ADMIN (email + password, hashed in DB)
router.post('/admin/create', createAdminValidation, validate, userController.createAdmin);

// ADMIN FORGOT PASSWORD
router.post(
    '/admin/forgot-password/request',
    adminForgotPasswordRequestValidation,
    validateFirst,
    userController.adminForgotPasswordRequest,
);
router.post(
    '/admin/forgot-password/reset',
    adminResetPasswordValidation,
    validateFirst,
    userController.adminResetPassword,
);

// STUDENT LOGIN (email + OTP)
router.post('/request-otp', requestOtpValidation, validateFirst, userController.requestOtp);
router.post('/verify-otp', verifyOtpValidation, validateFirst, userController.verifyOtp);

// SAVED ITEMS
router.post('/saved/toggle', userController.toggleSavedItem);
router.get('/saved/:userId', userController.getSavedItems);

export default router;

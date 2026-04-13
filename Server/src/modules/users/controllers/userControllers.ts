import type { Request, Response } from 'express';
import crypto from 'crypto';
import { asyncHandler, ApiError, ApiResponse, sendOTP } from '../../../utils/index.js';
import { User } from '../model/userModel.js';
import { UserSignupOtp } from '../model/userSignupOtpModel.js';

const OTP_EXPIRY_MINUTES = 10;
const HASH_ITERATIONS = 10000;
const HASH_KEY_LENGTH = 64;
const HASH_DIGEST = 'sha512';

const hashPassword = (password: string): string => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
        .pbkdf2Sync(password, salt, HASH_ITERATIONS, HASH_KEY_LENGTH, HASH_DIGEST)
        .toString('hex');
    return `${salt}:${hash}`;
};

const verifyPassword = (password: string, stored: string): boolean => {
    const [salt, originalHash] = stored.split(':');
    if (!salt || !originalHash) return false;

    const hash = crypto
        .pbkdf2Sync(password, salt, HASH_ITERATIONS, HASH_KEY_LENGTH, HASH_DIGEST)
        .toString('hex');

    return crypto.timingSafeEqual(Buffer.from(originalHash, 'hex'), Buffer.from(hash, 'hex'));
};

// SIGNUP: name + email + mobileNumber (+ optional role)
const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, mobileNumber, role } = req.body;

    const existingUser = await User.findOne({
        $or: [{ email: email.toLowerCase() }, { mobileNumber }],
    });

    if (existingUser) {
        throw new ApiError(409, 'User with this email or mobile number already exists');
    }

    const user = await User.create({
        name,
        email: email.toLowerCase(),
        mobileNumber,
        role: role || 'student',
    });

    return ApiResponse.created(
        res,
        {
            id: user._id,
            name: user.name,
            email: user.email,
            mobileNumber: user.mobileNumber,
            role: user.role,
            isVerified: user.isVerified,
        },
        'User registered successfully',
    );
});

// ADMIN LOGIN: email + password
const loginWithPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || user.role !== 'admin') {
        throw new ApiError(401, 'Invalid email or password');
    }

    if (!user.password || !verifyPassword(password, user.password)) {
        throw new ApiError(401, 'Invalid email or password');
    }

    return ApiResponse.success(
        res,
        200,
        {
            id: user._id,
            name: user.name,
            email: user.email,
            mobileNumber: user.mobileNumber,
            role: user.role,
            isVerified: user.isVerified,
        },
        'Admin login successful',
    );
});

// ADMIN FORGOT PASSWORD: request OTP
const adminForgotPasswordRequest = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase(), role: 'admin' });

    if (!user) {
        throw new ApiError(404, 'Admin not found for this email');
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + OTP_EXPIRY_MINUTES);

    user.otp = otp;
    user.otpExpiresAt = expiresAt;
    await user.save();

    return ApiResponse.success(
        res,
        200,
        {
            email: user.email,
            otp,
            otpExpiresAt: user.otpExpiresAt,
        },
        'Admin OTP generated successfully',
    );
});

// ADMIN FORGOT PASSWORD: reset with OTP + new password
const adminResetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email: email.toLowerCase(), role: 'admin' });

    if (!user || !user.otp || !user.otpExpiresAt) {
        throw new ApiError(400, 'No OTP request found for this email');
    }

    const now = new Date();
    if (user.otp !== otp) {
        throw new ApiError(400, 'Invalid OTP');
    }

    if (user.otpExpiresAt < now) {
        throw new ApiError(400, 'OTP has expired');
    }

    user.password = hashPassword(newPassword);
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    return ApiResponse.success(
        res,
        200,
        {
            id: user._id,
            name: user.name,
            email: user.email,
            mobileNumber: user.mobileNumber,
            role: user.role,
            isVerified: user.isVerified,
        },
        'Password reset successfully',
    );
});

// CREATE ADMIN WITH EMAIL + PASSWORD (hashed in DB) - general endpoint
const createAdmin = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, mobileNumber, password } = req.body;

    const existingUser = await User.findOne({
        $or: [{ email: email.toLowerCase() }, { mobileNumber }],
    });

    if (existingUser) {
        throw new ApiError(409, 'User with this email or mobile number already exists');
    }

    const user = await User.create({
        name,
        email: email.toLowerCase(),
        mobileNumber,
        role: 'admin',
        password: hashPassword(password),
        isVerified: true,
    });

    return ApiResponse.created(
        res,
        {
            id: user._id,
            name: user.name,
            email: user.email,
            mobileNumber: user.mobileNumber,
            role: user.role,
            isVerified: user.isVerified,
        },
        'Admin created successfully',
    );
});


// STUDENT SIGNUP FLOW STEP 1: request OTP using name + email + mobile + password
const signupRequestOtp = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, mobileNumber, password } = req.body;

    const existingUser = await User.findOne({
        $or: [{ email: email.toLowerCase() }, { mobileNumber }],
    });

    if (existingUser) {
        throw new ApiError(409, 'User with this email or mobile number already exists');
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + OTP_EXPIRY_MINUTES);

    const passwordHash = hashPassword(password);

    // Store pending signup details and OTP. Overwrite any previous pending signup for this email.
    await UserSignupOtp.findOneAndUpdate(
        { email: email.toLowerCase() },
        {
            name,
            email: email.toLowerCase(),
            mobileNumber,
            passwordHash,
            otp,
            otpExpiresAt: expiresAt,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    // Send OTP via email
    await sendOTP(email.toLowerCase(), otp);

    return ApiResponse.success(
        res,
        200,
        {
            email: email.toLowerCase(),
            otpExpiresAt: expiresAt,
        },
        'Signup OTP generated successfully',
    );
});

// STUDENT SIGNUP FLOW STEP 2: verify OTP and create account
const signupVerifyOtp = asyncHandler(async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    const pending = await UserSignupOtp.findOne({ email: email.toLowerCase() });

    if (!pending || !pending.otp || !pending.otpExpiresAt) {
        throw new ApiError(400, 'No signup OTP request found for this email');
    }

    const now = new Date();
    if (pending.otp !== otp) {
        throw new ApiError(400, 'Invalid OTP');
    }

    if (pending.otpExpiresAt < now) {
        throw new ApiError(400, 'OTP has expired');
    }

    // Ensure user was not created in the meantime
    const existingUser = await User.findOne({ email: pending.email });
    if (existingUser) {
        await UserSignupOtp.deleteOne({ _id: pending._id });
        throw new ApiError(409, 'User with this email already exists');
    }

    const user = await User.create({
        name: pending.name,
        email: pending.email,
        mobileNumber: pending.mobileNumber,
        password: pending.passwordHash,
        role: 'student',
        isVerified: true,
    });

    await UserSignupOtp.deleteOne({ _id: pending._id });

    return ApiResponse.created(
        res,
        {
            id: user._id,
            name: user.name,
            email: user.email,
            mobileNumber: user.mobileNumber,
            role: user.role,
            isVerified: user.isVerified,
        },
        'User registered successfully',
    );
});

// STUDENT LOGIN FLOW STEP 1: request OTP using email
const requestOtp = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
        throw new ApiError(404, 'User not found for this email');
    }

    if (user.role === 'admin') {
        throw new ApiError(400, 'Admins must login using password');
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + OTP_EXPIRY_MINUTES);

    user.otp = otp;
    user.otpExpiresAt = expiresAt;
    await user.save();

    // Send the OTP via NodeMailer to Gmail
    await sendOTP(user.email, otp);

    return ApiResponse.success(
        res,
        200,
        {
            email: user.email,
            otpExpiresAt: user.otpExpiresAt,
        },
        'OTP generated successfully',
    );
});

// STUDENT LOGIN FLOW STEP 2: verify OTP using email + otp
const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !user.otp || !user.otpExpiresAt) {
        throw new ApiError(400, 'No OTP request found for this email');
    }

    if (user.role === 'admin') {
        throw new ApiError(400, 'Admins must login using password');
    }

    const now = new Date();
    if (user.otp !== otp) {
        throw new ApiError(400, 'Invalid OTP');
    }

    if (user.otpExpiresAt < now) {
        throw new ApiError(400, 'OTP has expired');
    }

    user.otp = null;
    user.otpExpiresAt = null;
    user.isVerified = true;
    await user.save();

    return ApiResponse.success(
        res,
        200,
        {
            id: user._id,
            name: user.name,
            email: user.email,
            mobileNumber: user.mobileNumber,
            role: user.role,
            isVerified: user.isVerified,
        },
        'OTP verified successfully',
    );
});

// SAVED ITEMS MAPPING
const savedItemsFields: Record<string, string> = {
    colleges: 'savedColleges',
    courses: 'savedCourses',
    exams: 'savedExams',
    scholarships: 'savedScholarships',
    jobs: 'savedJobs',
};

// TOGGLE SAVED ITEM
const toggleSavedItem = asyncHandler(async (req: Request, res: Response) => {
    const { userId, itemId, itemType } = req.body; // colleges, courses, exams, scholarships, jobs

    if (!userId || !itemId || !itemType) {
        throw new ApiError(400, 'User ID, Item ID, and Item Type are required');
    }

    const field = savedItemsFields[itemType];
    if (!field) {
        throw new ApiError(400, 'Invalid Item Type');
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const savedList = (user as any)[field] as string[];
    const index = savedList.indexOf(itemId);

    let action = 'added';
    if (index > -1) {
        savedList.splice(index, 1);
        action = 'removed';
    } else {
        savedList.push(itemId);
    }

    await user.save();

    return ApiResponse.success(
        res,
        200,
        {
            action,
            [field]: (user as any)[field],
        },
        `Item ${action} successfully`,
    );
});

// GET ALL SAVED ITEMS
const getSavedItems = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId) {
        throw new ApiError(400, 'User ID is required');
    }

    const user = await User.findById(userId)
        .populate('savedColleges')
        .populate('savedCourses')
        .populate('savedExams')
        .populate('savedScholarships')
        .populate('savedJobs');

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    return ApiResponse.success(
        res,
        200,
        {
            colleges: user.savedColleges,
            courses: user.savedCourses,
            exams: user.savedExams,
            scholarships: user.savedScholarships,
            jobs: user.savedJobs,
        },
        'Saved items fetched successfully',
    );
});

export const userController = {
    registerUser,
    loginWithPassword,
    adminForgotPasswordRequest,
    adminResetPassword,
    createAdmin,
    signupRequestOtp,
    signupVerifyOtp,
    requestOtp,
    verifyOtp,
    toggleSavedItem,
    getSavedItems,
};

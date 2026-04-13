import { Schema, model, Document } from 'mongoose';

export interface IUserSignupOtp extends Document {
    name: string;
    email: string;
    mobileNumber: string;
    passwordHash: string;
    otp: string;
    otpExpiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const userSignupOtpSchema = new Schema<IUserSignupOtp>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        },
        mobileNumber: {
            type: String,
            required: true,
            trim: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        otp: {
            type: String,
            required: true,
        },
        otpExpiresAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const UserSignupOtp = model<IUserSignupOtp>('UserSignupOtp', userSignupOtpSchema);

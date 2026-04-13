import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    mobileNumber: string;
    password?: string; // optional hashed password (not required for email + OTP login)
    otp?: string | null;
    otpExpiresAt?: Date | null;
    isVerified: boolean;
    role: 'student' | 'admin';
    savedColleges: string[];
    savedCourses: string[];
    savedExams: string[];
    savedScholarships: string[];
    savedJobs: string[];
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
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
            unique: true,
        },
        password: {
            type: String,
            minlength: 6,
        },
        otp: {
            type: String,
            default: null,
        },
        otpExpiresAt: {
            type: Date,
            default: null,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: ['student', 'admin'],
            default: 'student',
        },
        savedColleges: [{ type: Schema.Types.ObjectId, ref: 'College' }],
        savedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
        savedExams: [{ type: Schema.Types.ObjectId, ref: 'Exam' }],
        savedScholarships: [{ type: Schema.Types.ObjectId, ref: 'Scholarship' }],
        savedJobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
    },
    {
        timestamps: true,
    },
);

export const User = model<IUser>('User', userSchema);

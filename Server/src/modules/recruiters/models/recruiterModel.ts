import { Schema, model } from 'mongoose';

export interface Recruiter {
    companyName: string;
    jobTitle: string;
    hiringDuration: string;
    logo?: string;
    industry?: string;
}

const recruiterSchema = new Schema<Recruiter>(
    {
        companyName: { type: String, required: true, trim: true },
        jobTitle: { type: String, required: true, trim: true },
        hiringDuration: { type: String, required: true, trim: true },
        logo: { type: String, trim: true },
        industry: { type: String, trim: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Recruiter = model<Recruiter>('Recruiter', recruiterSchema);


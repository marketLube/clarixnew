import { Schema, model, Document } from 'mongoose';

interface FAQItem {
    question: string;
    answer: string;
}

interface Salary {
    min: number;
    max: number;
    unit: 'LPA' | 'Monthly' | 'Hourly';
}

interface IJob extends Document {
    jobTitle: string;
    companyName: string;
    jobType: 'Full Time' | 'Part Time' | 'Internship' | 'Contract' | 'Freelance';
    location: string;
    salary: Salary;
    companyWebsite?: string;
    employeeSize?: string;
    industry?: string;
    shortDescription?: string;
    aboutJob: string;
    aboutYou: string[];
    aboutRole: string[];
    faqs: FAQItem[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
    {
        jobTitle: {
            type: String,
            required: true,
            trim: true,
        },

        companyName: {
            type: String,
            required: true,
            trim: true,
        },

        jobType: {
            type: String,
            required: true,
            enum: [
                'Full Time',
                'Part Time',
                'Internship',
                'Contract',
                'Freelance',
            ],
        },

        location: {
            type: String,
            required: true,
        },

        salary: {
            min: { type: Number, required: true },
            max: { type: Number, required: true },
            unit: {
                type: String,
                enum: ['LPA', 'Monthly', 'Hourly'],
                default: 'LPA',
            },
        },

        companyWebsite: {
            type: String,
        },

        employeeSize: {
            type: String, // eg: 10-50, 50-200, 200+
        },

        industry: {
            type: String, // eg: Analytics, Big Data
        },
        shortDescription: {
            type: String,
            required: true,
        },

        aboutJob: {
            type: String,
            required: true,
        },

        aboutYou: [
            {
                type: String,
            },
        ],

        aboutRole: [
            {
                type: String,
            },
        ],

        faqs: [
            {
                question: { type: String, required: true },
                answer: { type: String, required: true },
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

jobSchema.index({ createdAt: -1 });
jobSchema.index({ jobTitle: 'text', companyName: 'text' });

export const Job = model<IJob>('Job', jobSchema);

import { Schema, model, Document } from 'mongoose';

interface IScholarship extends Document {
    scholarshipName: string;
    scholarshipType:
    | 'Merit Based'
    | 'Need Based'
    | 'Government'
    | 'Private'
    | 'Sports'
    | 'Minority'
    | 'International';
    fundingType:
    | 'Full Funding'
    | 'Partial Funding'
    | 'Tuition Waiver'
    | 'Stipend'
    | 'One-Time Grant';
    deadline: Date;
    totalFundingAmount: number;
    description: string;
    officialWebsite: string;
    isActive: boolean;
    status:
    | "active"
    | "closed"
    | "upcoming"
    createdAt: Date;
    updatedAt: Date;
}

const scholarshipSchema = new Schema<IScholarship>(
    {
        scholarshipName: {
            type: String,
            required: true,
            trim: true,
        },

        scholarshipType: {
            type: String,
            required: true,
            enum: [
                'Merit Based',
                'Need Based',
                'Government',
                'Private',
                'Sports',
                'Minority',
                'International',
            ],
        },

        fundingType: {
            type: String,
            required: true,
            enum: [
                'Full Funding',
                'Partial Funding',
                'Tuition Waiver',
                'Stipend',
                'One-Time Grant',
            ],
        },

        deadline: {
            type: Date,
            required: true,
        },

        totalFundingAmount: {
            type: Number,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        officialWebsite: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        status: {
            type: String,
            enum: ["active", "closed", "upcoming"],
            default: "active",
        },
    },
    { timestamps: true }
);

export const Scholarship = model<IScholarship>('Scholarship', scholarshipSchema);

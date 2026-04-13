import { Schema, model } from 'mongoose';

interface ImageItem {
    url: string;
    alt?: string;
}

interface HeroSection {
    enabled: boolean;
    primaryHeadline?: string;
    subHeadline?: string;
}

interface SecondSection {
    enabled: boolean;
    primaryHeadline?: string;
    paragraph?: string;
    images: ImageItem[];
}

interface ThirdSection {
    enabled: boolean;
    primaryHeadline?: string;
    subHeadline?: string;
    jobCategories: string[];
}

interface JobItem {
    enabled: boolean;
    jobTitle: string;
    companyName: string;
    jobType: 'Full Time' | 'Part Time' | 'Internship' | 'Contract' | 'Freelance';
    location: string;
    companyWebsite?: string;
    aboutJob?: string;
    aboutYou: string[];
}

interface ICareersPage {
    heroSection: HeroSection;
    secondSection: SecondSection;
    thirdSection: ThirdSection;
    jobs: JobItem[];
}

const careersPageSchema = new Schema<ICareersPage>(
    {
        heroSection: {
            enabled: { type: Boolean, default: true },
            primaryHeadline: { type: String, maxLength: 100 },
            subHeadline: { type: String, maxLength: 350 },
        },

        secondSection: {
            enabled: { type: Boolean, default: true },
            primaryHeadline: { type: String, maxLength: 100 },
            paragraph: { type: String, maxLength: 1000 },
            images: [
                {
                    url: { type: String, required: true },
                    alt: String,
                },
            ],
        },

        thirdSection: {
            enabled: { type: Boolean, default: true },
            primaryHeadline: { type: String, maxLength: 100 },
            subHeadline: { type: String, maxLength: 500 },
            jobCategories: [{ type: String }],
        },

        jobs: [
            {
                enabled: { type: Boolean, default: true },
                jobTitle: { type: String, required: true },
                companyName: { type: String, required: true },
                jobType: {
                    type: String,
                    enum: [
                        'Full Time',
                        'Part Time',
                        'Internship',
                        'Contract',
                        'Freelance',
                    ],
                    required: true,
                },
                location: { type: String, required: true },
                companyWebsite: String,
                aboutJob: { type: String, maxLength: 1000 },
                aboutYou: [String],
            },
        ],
    },
    { timestamps: true }
);

export const CareersPage = model<ICareersPage>('CareersPage', careersPageSchema);

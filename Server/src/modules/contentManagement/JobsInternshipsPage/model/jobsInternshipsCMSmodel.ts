import { Schema, model } from 'mongoose';

interface HeroSection {
    enabled: boolean;
    primaryHeadline?: string;
    subHeadline?: string;
}

interface IJobsInternshipsPage {
    heroSection: HeroSection;
}

const jobsInternshipsPageSchema = new Schema<IJobsInternshipsPage>(
    {
        heroSection: {
            enabled: { type: Boolean, default: true },
            primaryHeadline: { type: String, maxLength: 100 },
            subHeadline: { type: String, maxLength: 350 },
        },
    },
    { timestamps: true }
);

export const JobsInternshipsPage = model<IJobsInternshipsPage>('JobsInternshipsPage', jobsInternshipsPageSchema);

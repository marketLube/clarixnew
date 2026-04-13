import { Schema, model } from 'mongoose';

interface HeroSection {
    enabled: boolean;
    primaryHeadline?: string;
    subHeadline?: string;
}

interface ICollegesPage {
    heroSection: HeroSection;
}

const collegesPageSchema = new Schema<ICollegesPage>(
    {
        heroSection: {
            enabled: { type: Boolean, default: true },
            primaryHeadline: { type: String, maxLength: 100 },
            subHeadline: { type: String, maxLength: 350 },
        },
    },
    { timestamps: true }
);

export const CollegesPage = model<ICollegesPage>('CollegesPage', collegesPageSchema);

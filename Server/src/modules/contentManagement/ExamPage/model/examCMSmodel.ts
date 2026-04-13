import { Schema, model } from 'mongoose';

interface HeroSection {
    enabled: boolean;
    primaryHeadline?: string;
    subHeadline?: string;
}

interface IExamPage {
    heroSection: HeroSection;
}

const examPageSchema = new Schema<IExamPage>(
    {
        heroSection: {
            enabled: { type: Boolean, default: true },
            primaryHeadline: { type: String, maxLength: 100 },
            subHeadline: { type: String, maxLength: 350 },
        },
    },
    { timestamps: true }
);

export const ExamPage = model<IExamPage>('ExamPage', examPageSchema);

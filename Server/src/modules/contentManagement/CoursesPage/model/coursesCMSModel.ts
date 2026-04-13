import { Schema, model } from 'mongoose';

interface HeroSection {
    enabled: boolean;
    primaryHeadline?: string;
    subHeadline?: string;
}

interface ICoursesPage {
    heroSection: HeroSection;
}

const coursesPageSchema = new Schema<ICoursesPage>(
    {
        heroSection: {
            enabled: { type: Boolean, default: true },
            primaryHeadline: { type: String, maxLength: 100 },
            subHeadline: { type: String, maxLength: 350 },
        },
    },
    { timestamps: true }
);

export const CoursesPage = model<ICoursesPage>('CoursesPage', coursesPageSchema);

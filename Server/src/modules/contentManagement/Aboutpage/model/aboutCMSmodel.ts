import { Schema, model } from 'mongoose';

interface HeroSection {
    enabled: boolean;
    headline?: string;
    subHeadline?: string;
}

interface SecondSection {
    enabled: boolean;
    headline?: string;
    paragraph?: string;
    mission?: string;
    vision?: string;
    image?: string;
}

interface CardItem {
    title?: string;
    description?: string;
    icon?: string;
}

interface ThirdSection {
    enabled: boolean;
    headline?: string;
    paragraph?: string;
    cards: CardItem[];
}

interface FourthSection {
    enabled: boolean;
    headline?: string;
    paragraph?: string;
    image?: string;
}

interface StatItem {
    label?: string;
    value?: string;
}

interface KeyStatisticsSection {
    enabled: boolean;
    stats: StatItem[];
}

interface IAboutPage {
    hero: HeroSection;
    secondSection: SecondSection;
    thirdSection: ThirdSection;
    fourthSection: FourthSection;
    keyStatistics: KeyStatisticsSection;
    status: 'draft' | 'published';
}

const aboutPageSchema = new Schema<IAboutPage>(
    {
        hero: {
            enabled: { type: Boolean, default: true },
            headline: String,
            subHeadline: String,
        },

        secondSection: {
            enabled: { type: Boolean, default: true },
            headline: String,
            paragraph: String,
            mission: String,
            vision: String,
            image: String,
        },

        thirdSection: {
            enabled: { type: Boolean, default: true },
            headline: String,
            paragraph: String,
            cards: [
                {
                    title: String,
                    description: String,
                    icon: String,
                },
            ],
        },

        fourthSection: {
            enabled: { type: Boolean, default: true },
            headline: String,
            paragraph: String,
            image: String,
        },

        keyStatistics: {
            enabled: { type: Boolean, default: true },
            stats: [
                {
                    label: String,
                    value: String,
                },
            ],
        },
    },
    { timestamps: true }
);

export const AboutPage = model<IAboutPage>('AboutPage', aboutPageSchema);

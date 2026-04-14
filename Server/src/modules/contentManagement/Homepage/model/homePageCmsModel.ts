import { Schema, model } from 'mongoose';

interface HeroSection {
    enabled: boolean;
    headline?: string;
    subHeadline?: string;
    PrimaryCtaText?: string;
    PrimaryCtaLink?: string;
    images?: string[];
    popularSearches?: string[];
}

interface StreamItem {
    name?: string;
    icon?: string;
}

interface StreamsSection {
    enabled: boolean;
    title?: string;
    paragraph?: string;
    items: StreamItem[];
}

interface ContentBlock {
    title?: string;
    description?: string;
    image?: string;
    // Optional identifier to map a block to a specific frontend section
    sectionKey?: string;
}

interface ContentBlocksSection {
    enabled: boolean;
    blocks: ContentBlock[];
}

interface CareerHubSection {
    enabled: boolean;
    title?: string;
    paragraph?: string;
    images?: string[];
    logo?: string[];
}

interface FaqItem {
    question?: string;
    answer?: string;
}

interface FaqSection {
    enabled: boolean;
    title?: string;
    paragraph?: string;
    items: FaqItem[];
}

interface LocationItem {
    name?: string;
    slug?: string;
    image?: string;
    isActive?: boolean;
}

interface LocationSection {
    enabled: boolean;
    title?: string;
    items: LocationItem[];
}

interface IHomePage {
    hero: HeroSection;
    streams: StreamsSection;
    contentBlocks: ContentBlocksSection;
    careerHub: CareerHubSection;
    faq: FaqSection;
    location: LocationSection;
    abroadLocations: LocationSection;
}

const homePageSchema = new Schema<IHomePage>(
    {
        hero: {
            enabled: { type: Boolean, default: true },
            headline: String,
            subHeadline: String,
            PrimaryCtaText: String,
            PrimaryCtaLink: String,
            title: String,
            images: [String],
            popularSearches: [String]
        },

        streams: {
            enabled: { type: Boolean, default: true },
            title: String,
            paragraph: String,
        },

        contentBlocks: {
            enabled: { type: Boolean, default: true },
            blocks: [
                {
                    title: String,
                    description: String,
                    image: String,
                    sectionKey: String,
                },
            ],
        },

        careerHub: {
            enabled: { type: Boolean, default: true },
            title: String,
            paragraph: String,
            images: [String],
            logo: [String]
        },

        faq: {
            enabled: { type: Boolean, default: true },
            title: String,
            paragraph: String,
            items: [
                {
                    question: String,
                    answer: String,
                },
            ],
        },

        location: {
            enabled: { type: Boolean, default: true },
            title: String,
            items: [
                {
                    name: String,
                    slug: String,
                    image: String,
                    isActive: { type: Boolean, default: true },
                },
            ],
        },

        abroadLocations: {
            enabled: { type: Boolean, default: true },
            title: String,
            items: [
                {
                    name: String,
                    slug: String,
                    image: String,
                    isActive: { type: Boolean, default: true },
                },
            ],
        },
    },
    { timestamps: true }
);

export const HomePage = model<IHomePage>('HomePage', homePageSchema);

import { Schema, model } from 'mongoose';

interface HeroSection {
    enabled: boolean;
    headline?: string;
    subHeadline?: string;
}

interface FilterItem {
    label?: string;
    value?: string;
}

interface SearchFiltersSection {
    enabled: boolean;
    filters: FilterItem[];
}

interface NewsletterSection {
    enabled: boolean;
    title?: string;
    subHeadline?: string;
    image?: string;
}

interface IBlogPage {
    hero: HeroSection;
    searchFilters: SearchFiltersSection;
    newsletter: NewsletterSection;
}

const blogPageSchema = new Schema<IBlogPage>(
    {
        hero: {
            enabled: { type: Boolean, default: true },
            headline: String,
            subHeadline: String,
        },

        searchFilters: {
            enabled: { type: Boolean, default: true },
            filters: [
                {
                    label: String,
                    value: String,
                },
            ],
        },

        newsletter: {
            enabled: { type: Boolean, default: true },
            title: String,
            subHeadline: String,
            image: String,
        },
    },
    { timestamps: true }
);

export const BlogPage = model<IBlogPage>('BlogPage', blogPageSchema);

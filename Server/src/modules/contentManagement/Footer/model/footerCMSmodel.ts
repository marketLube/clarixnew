import { Schema, model } from 'mongoose';

interface FooterLink {
    label: string;
    url: string;
}

interface NewsletterSection {
    enabled: boolean;
    primaryHeadline?: string;
    subHeadline?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
}

interface IFooter {
    enabled: boolean;
    primaryHeadline?: string;
    subHeadline?: string;
    locationLink?: string;
    contactNumber?: string;
    email?: string;
    newsletter: NewsletterSection;
    exploreColleges: FooterLink[];
    courses: FooterLink[];
    exams: FooterLink[];
    admissions: FooterLink[];
    scholarships: FooterLink[];
    about: FooterLink[];
}

const footerSchema = new Schema<IFooter>(
    {
        enabled: { type: Boolean, default: true },

        // Footer Header Content
        primaryHeadline: { type: String, maxLength: 100 },
        subHeadline: { type: String, maxLength: 350 },

        // Contact Info
        locationLink: String,
        contactNumber: String,
        email: String,

        // Newsletter Section
        newsletter: {
            enabled: { type: Boolean, default: true },
            primaryHeadline: { type: String, maxLength: 100 },
            subHeadline: { type: String, maxLength: 350 },
            primaryButtonText: String,
            primaryButtonLink: String,
        },

        // Footer Navigation Sections
        exploreColleges: [
            {
                label: { type: String, required: true },
                url: { type: String, required: true },
            },
        ],
        courses: [
            {
                label: { type: String, required: true },
                url: { type: String, required: true },
            },
        ],
        exams: [
            {
                label: { type: String, required: true },
                url: { type: String, required: true },
            },
        ],
        admissions: [
            {
                label: { type: String, required: true },
                url: { type: String, required: true },
            },
        ],
        scholarships: [
            {
                label: { type: String, required: true },
                url: { type: String, required: true },
            },
        ],
        about: [
            {
                label: { type: String, required: true },
                url: { type: String, required: true },
            },
        ],
    },
    { timestamps: true }
);

export const FooterCMS = model<IFooter>('FooterCMS', footerSchema);

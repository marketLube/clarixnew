import { Schema, Types, model } from 'mongoose';

export interface Course {
    name: string;
    shortDescription: string;
    stream: Types.ObjectId;
    type: 'Full Time' | 'Part Time' | 'Online' | 'Distance' | 'Other';
    duration: string;
    fees: string;
    intakeCapacity: string;
    eligibility: string[];

    // Images
    cardImage: string;
    heroImage: string;

    // Sections
    description: {
        title: string;
        content: string;
        image: string;
    };
    whyChoose: {
        title: string;
        description: string;
        reasons: {
            title: string;
            description: string;
        }[];
    };
    syllabus: {
        title: string;
        semesters: {
            title: string;
            topics: string[];
        }[];
    };
    careerOpportunities: {
        title: string;
        items: {
            title: string;
            description: string;
        }[];
    };
    about: {
        title: string;
        description: string;
        points: {
            title: string;
            description: string;
        }[];
    };
    faqs: {
        title: string;
        description: string;
        items: {
            question: string;
            answer: string;
        }[];
    };
}

const courseSchema = new Schema<Course>(
    {
        name: { type: String, required: true, trim: true },
        shortDescription: { type: String, default: '', trim: true },
        stream: { type: Schema.Types.ObjectId, required: true, ref: 'Stream' },
        type: {
            type: String,
            required: true,
            enum: ['Full Time', 'Part Time', 'Online', 'Distance', 'Other'],
        },
        duration: { type: String, required: true, trim: true },
        fees: { type: String, required: true, trim: true },
        intakeCapacity: { type: String, required: true, trim: true },
        eligibility: { type: [String], required: true },
        cardImage: { type: String, required: false },
        heroImage: { type: String, required: false },

        // Description Section
        description: {
            title: { type: String, default: '' },
            content: { type: String, default: '' },
            image: { type: String, default: '' },
        },

        // Why Section
        whyChoose: {
            title: { type: String, default: '' },
            description: { type: String, default: '' },
            reasons: [{
                title: { type: String, required: true },
                description: { type: String, required: true },
            }],
        },

        // Syllabus Section
        syllabus: {
            title: { type: String, default: '' },
            semesters: [{
                title: { type: String, required: true },
                topics: { type: [String], required: true },
            }],
        },

        // Opportunities Section
        careerOpportunities: {
            title: { type: String, default: '' },
            items: [{
                title: { type: String, required: true },
                description: { type: String, required: true },
            }],
        },
        // About Section
        about: {
            title: { type: String, default: '' },
            description: { type: String, default: '' },
            points: [{
                title: { type: String, required: true },
                description: { type: String, required: true },
            }],
        },
        // FAQs Section
        faqs: {
            title: { type: String, default: '' },
            description: { type: String, default: '' },
            items: [{
                question: { type: String, required: true },
                answer: { type: String, required: true },
            }],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

courseSchema.index({ createdAt: -1 });
courseSchema.index({ name: 'text' });
courseSchema.index({ stream: 1 });

export const Course = model<Course>('Course', courseSchema);
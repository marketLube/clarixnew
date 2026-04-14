import { Schema, Types, model } from 'mongoose';

export interface FAQItem {
    question: string;
    answer: string;
}

export interface PlacementTrend {
    year: string;
    avgSalary: string;
    placementPercentage: string;
}

export interface CampusLifeItem {
    title: string;
    description: string;
    verified: boolean;
    tags: string[];
    image: string;
    source: string;
    isActive: boolean;
}

export interface College {
    name?: string;
    country?: string;
    state?: string;
    city?: string;
    type?: 'Public' | 'Private' | 'Government' | 'Deemed';
    establishedYear?: number;
    // accreditation?: ('AACSB' | 'EQUIS' | 'AMBA' | 'NIRF' | 'Other')[];
    accreditation?: string[];
    logo?: string;
    brochure?: string;
    description?: string;
    university?: Types.ObjectId;
    students?: number;
    campusSize?: string;
    averageSalary?: number;
    placementPercentage?: number;
    highestSalary?: number;
    placementTrends?: PlacementTrend[];
    recruiters?: Types.ObjectId[];
    courses?: Types.ObjectId[];
    applicationOpeningDate?: Date;
    applicationClosingDate?: Date;
    entranceExam?: Types.ObjectId;
    entranceExamDate?: Date;
    meritListAnnouncementDate?: Date;
    counsellingStartsFrom?: Date;
    accademicSectionStartsFrom?: Date;
    admissionMode?: {
        mode: 'Merit List' | 'Entrance Exam' | 'Management Quota' | 'Other';
        label: string;
        description: string;
    }[];
    annualFee?: string;
    avgAnnualFee?: string;
    hostelFee?: string;
    messFee?: string;
    libraryFee?: string;
    laboratoryFee?: string;
    sportsFee?: string
    // facilities?: string[];
    // clubsandsocieties?: string[];
    // campusLifeDescription?: string;
    scholarships: Types.ObjectId[];
    campusImages?: string[];
    hostelImages?: string[];
    labsImages?: string[];
    eventsImages?: string[];
    admissionFaqs?: FAQItem[];
    courseFaqs?: FAQItem[];
    feesPaymentFaqs?: FAQItem[];
    scholarshipFaqs?: FAQItem[];
    rating?: number;
    recruitersCount?: number;
    studentsWithInternships?: number;
    avgStipend?: number;
    ppoConversionRate?: number;
    alumniInFortune500?: number;
    alumniEntrepreneurs?: number;
    alumniHigherStudiesAbroad?: number;
    campusLife?: CampusLifeItem[];
    category?: string;
}


const campusLifeItemSchema = new Schema<CampusLifeItem>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        verified: { type: Boolean, default: false },
        tags: { type: [String], default: [] },
        image: { type: String },
        source: { type: String },
        isActive: { type: Boolean, default: true },
    },
    { _id: true },
);

const faqItemSchema = new Schema<FAQItem>(
    {
        question: { type: String, required: true, trim: true },
        answer: { type: String, required: true, trim: true },
    },
    { _id: false },
);

const placementTrendSchema = new Schema<PlacementTrend>(
    {
        year: { type: String, required: true, trim: true },
        avgSalary: { type: String, required: true, trim: true },
        placementPercentage: { type: String, required: true, trim: true },
    },
    { _id: false },
);

const admissionModeSchema = new Schema(
    {
        mode: { type: String, required: true },
        label: { type: String, required: true },
        description: { type: String, required: true },
    },
    { _id: false }
);

const collegeSchema = new Schema<College>(
    {
        //basic details
        name: { type: String, required: true, trim: true },
        country: { type: String, default: 'India', trim: true },
        state: { type: String, trim: true },
        city: { type: String, trim: true },
        type: { type: String, required: true, enum: ['Public', 'Private', 'Government', 'Deemed'] },
        rating: { type: Number, default: 0, min: 0, max: 5 },
        establishedYear: { type: Number, min: 0 },
        accreditation: {
            type: [String],
            default: [],
        },
        logo: { type: String, trim: true },
        brochure: { type: String, trim: true, default: '' },

        //Overview
        description: { type: String, trim: true },
        university: { type: Schema.Types.ObjectId, ref: 'University' },
        students: { type: Number, min: 0 },
        campusSize: { type: String, trim: true },

        //placement details
        averageSalary: { type: Number, default: 0, min: 0 },
        placementPercentage: { type: Number, default: 0, min: 0, max: 100 },
        highestSalary: { type: Number, default: 0, min: 0 },
        placementTrends: { type: [placementTrendSchema], default: [] },
        recruiters: { type: [Schema.Types.ObjectId], ref: 'Recruiter', default: [] },
        recruitersCount: { type: Number, default: 0, min: 0 },
        studentsWithInternships: { type: Number, default: 0, min: 0, max: 100 },
        avgStipend: { type: Number, default: 0, min: 0 },
        ppoConversionRate: { type: Number, default: 0, min: 0, max: 100 },
        alumniInFortune500: { type: Number, default: 0, min: 0, max: 100 },
        alumniEntrepreneurs: { type: Number, default: 0, min: 0, max: 100 },
        alumniHigherStudiesAbroad: { type: Number, default: 0, min: 0, max: 100 },


        //courses
        courses: { type: [Schema.Types.ObjectId], ref: 'Course' },

        //admission and exams
        applicationOpeningDate: { type: Date },
        applicationClosingDate: { type: Date },
        entranceExam: { type: Schema.Types.ObjectId, ref: 'EntranceExam' },
        entranceExamDate: { type: Date },
        meritListAnnouncementDate: { type: Date },
        counsellingStartsFrom: { type: Date },
        accademicSectionStartsFrom: { type: Date },
        admissionMode: { type: [admissionModeSchema], default: [] },

        //annual fee breakdown
        hostelFee: { type: String },
        messFee: { type: String },
        libraryFee: { type: String },
        laboratoryFee: { type: String },
        sportsFee: { type: String },
        annualFee: { type: String },
        avgAnnualFee: { type: String },

        //scholarship
        scholarships: { type: [Schema.Types.ObjectId], ref: 'Scholarship' },

        // //campus Life
        // facilities: { type: [String], enum: ['Library', 'Laboratory', 'Sports', 'Other'] },
        // clubsandsocieties: { type: [String] },
        // campusLifeDescription: { type: String },

        // gallery
        campusImages: { type: [String], default: [] },
        hostelImages: { type: [String], default: [] },
        labsImages: { type: [String], default: [] },
        eventsImages: { type: [String], default: [] },

        // FAQs
        admissionFaqs: { type: [faqItemSchema], default: [] },
        courseFaqs: { type: [faqItemSchema], default: [] },
        feesPaymentFaqs: { type: [faqItemSchema], default: [] },
        scholarshipFaqs: { type: [faqItemSchema], default: [] },
        campusLife: { type: [campusLifeItemSchema], default: [] },
        category: { type: String, trim: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const College = model<College>('College', collegeSchema);
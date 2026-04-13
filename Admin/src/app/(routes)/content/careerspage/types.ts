export interface CareersHeroSection {
    enabled: boolean;
    primaryHeadline: string;
    subHeadline: string;
}

export interface ImageItem {
    url: string | File;
    alt?: string;
    _id?: string;
}

export interface CareersSecondSection {
    enabled: boolean;
    primaryHeadline: string;
    paragraph: string;
    images: ImageItem[];
}

export interface CareersThirdSection {
    enabled: boolean;
    primaryHeadline: string;
    subHeadline: string;
    jobCategories: string[];
}

export interface JobItem {
    enabled: boolean;
    jobTitle: string;
    companyName: string;
    jobType: 'Full Time' | 'Part Time' | 'Internship' | 'Contract' | 'Freelance';
    location: string;
    companyWebsite?: string;
    aboutJob?: string;
    aboutYou: string[];
}

export interface CareersPageState {
    heroSection: CareersHeroSection;
    secondSection: CareersSecondSection;
    thirdSection: CareersThirdSection;
    jobs: JobItem[];
}

export const INITIAL_CAREERS_PAGE_STATE: CareersPageState = {
    heroSection: {
        enabled: true,
        primaryHeadline: "",
        subHeadline: "",
    },
    secondSection: {
        enabled: true,
        primaryHeadline: "Our People Make Clarix What It Is",
        paragraph: "",
        images: [],
    },
    thirdSection: {
        enabled: true,
        primaryHeadline: "Join Our Team",
        subHeadline: "Become part of a mission-driven team transforming how students across India discover colleges, courses, exams, and careers. Find a role where your ideas, creativity, and passion can make real impact.",
        jobCategories: ["All", "Content Writer", "Data Research"],
    },
    jobs: [],
};

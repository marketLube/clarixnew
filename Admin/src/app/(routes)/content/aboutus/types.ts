export interface AboutHeroSection {
    enabled: boolean;
    headline: string;
    subHeadline: string;
}

export interface AboutSecondSection {
    enabled: boolean;
    headline: string;
    paragraph: string;
    mission: string;
    vision: string;
}

export interface AboutCardItem {
    title: string;
    description: string;
    icon?: string;
}

export interface AboutThirdSection {
    enabled: boolean;
    headline: string;
    paragraph: string;
    cards: AboutCardItem[];
}

export interface AboutFourthSection {
    enabled: boolean;
    headline: string;
    paragraph: string;
}

export interface AboutStatItem {
    label: string;
    value: string;
}

export interface AboutKeyStatisticsSection {
    enabled: boolean;
    stats: AboutStatItem[];
}

export interface AboutPageState {
    hero: AboutHeroSection;
    secondSection: AboutSecondSection;
    thirdSection: AboutThirdSection;
    fourthSection: AboutFourthSection;
    keyStatistics: AboutKeyStatisticsSection;
}

export const INITIAL_ABOUT_PAGE_STATE: AboutPageState = {
    hero: {
        enabled: true,
        headline: "Empowering Students to Make Smarter Education Decisions",
        subHeadline:
            "Clarix Education is India’s most transparent, student-first platform to search, compare, and review colleges, courses, exams, scholarships, and career paths — all backed by verified data and real student experiences.",
    },
    secondSection: {
        enabled: true,
        headline: "Who We Are",
        paragraph: "",
        mission: "",
        vision: "",
    },
    thirdSection: {
        enabled: true,
        headline: "What Clarix Offers",
        paragraph: "",
        cards: [
            {
                title: "Search Colleges & Courses",
                description:
                    "Discover the perfect college and course with advanced filters and personalized recommendations.",
            },
            {
                title: "",
                description: "",
            },
        ],
    },
    fourthSection: {
        enabled: true,
        headline: "Our Story",
        paragraph: "",
    },
    keyStatistics: {
        enabled: true,
        stats: [
            { label: "Colleges", value: "10,000+" },
            { label: "Courses", value: "50,000+" },
            { label: "Student Reviews", value: "1M+" },
            { label: "Job Listings", value: "12,000+" },
        ],
    },
};

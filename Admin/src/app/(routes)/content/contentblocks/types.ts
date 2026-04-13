export interface FooterLink {
    label: string;
    url: string;
}

export interface NewsletterSection {
    enabled: boolean;
    primaryHeadline?: string;
    subHeadline?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
}

export interface FooterSection {
    enabled: boolean;
    primaryHeadline?: string;
    subHeadline?: string;
    locationLink?: string;
    contactNumber?: string;
    email?: string;
}

export interface FooterPageState {
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

export const INITIAL_FOOTER_PAGE_STATE: FooterPageState = {
    enabled: true,
    primaryHeadline: "",
    subHeadline: "",
    locationLink: "",
    contactNumber: "",
    email: "clarix@gmail.com",
    newsletter: {
        enabled: true,
        primaryHeadline: "Ready to Find Your Perfect College?",
        subHeadline: "Join thousands of students who found their dream college through Clarix Education",
        primaryButtonText: "Start Your Search",
        primaryButtonLink: "/colleges",
    },
    exploreColleges: [],
    courses: [],
    exams: [],
    admissions: [],
    scholarships: [],
    about: [],
};

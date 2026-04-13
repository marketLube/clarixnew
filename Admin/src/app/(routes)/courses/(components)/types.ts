export interface Reason {
    title: string;
    description: string;
}

export interface Semester {
    title: string;
    topics: string[];
}

export interface Opportunity {
    title: string;
    description: string;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface CourseState {
    // Basic Info
    stream: string;
    courseName: string;
    shortDescription: string;
    programType: string;
    duration: string;
    courseFees: string;
    intakeCapacity: string;
    eligibility: string;
    cardImage: File | null;
    heroImage: File | null;

    // Description
    descriptionTitle: string;
    description: string;
    descriptionImage: File | null;

    // Why
    whyTitle: string;
    whyDescription: string;
    whyReasons: Reason[];

    // Syllabus
    syllabusTitle: string;
    syllabusSemesters: Semester[];

    // Opportunities
    opportunitiesTitle: string;
    opportunitiesItems: Opportunity[];

    // About
    aboutTitle: string;
    aboutDescription: string;
    aboutPoints: Reason[];
    faqTitle: string;
    faqDescription: string;
    faqItems: FAQ[];
}

export const INITIAL_COURSE_STATE: CourseState = {
    stream: "",
    courseName: "",
    shortDescription: "",
    programType: "",
    duration: "",
    courseFees: "",
    intakeCapacity: "",
    eligibility: "",
    cardImage: null,
    heroImage: null,
    descriptionTitle: "",
    description: "",
    descriptionImage: null,
    whyTitle: "",
    whyDescription: "",
    whyReasons: [{ title: "", description: "" }],
    syllabusTitle: "",
    syllabusSemesters: [{ title: "", topics: [] }],
    opportunitiesTitle: "",
    opportunitiesItems: [{ title: "", description: "" }],
    aboutTitle: "",
    aboutDescription: "",
    aboutPoints: [{ title: "", description: "" }],
    faqTitle: "",
    faqDescription: "",
    faqItems: [{ question: "", answer: "" }],
};

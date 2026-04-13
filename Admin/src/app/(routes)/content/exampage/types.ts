export interface ExamPageHeroSection {
    enabled: boolean;
    primaryHeadline: string;
    subHeadline: string;
}

export interface ExamPageState {
    heroSection: ExamPageHeroSection;
}

export const INITIAL_EXAM_PAGE_STATE: ExamPageState = {
    heroSection: {
        enabled: true,
        primaryHeadline: "",
        subHeadline: "",
    },
};

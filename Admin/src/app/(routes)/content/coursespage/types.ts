export interface CoursesPageHeroSection {
    enabled: boolean;
    primaryHeadline: string;
    subHeadline: string;
}

export interface CoursesPageState {
    heroSection: CoursesPageHeroSection;
}

export const INITIAL_COURSES_PAGE_STATE: CoursesPageState = {
    heroSection: {
        enabled: true,
        primaryHeadline: "",
        subHeadline: "",
    },
};

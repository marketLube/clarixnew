export interface CollegesPageHeroSection {
    enabled: boolean;
    primaryHeadline: string;
    subHeadline: string;
}

export interface CollegesPageState {
    heroSection: CollegesPageHeroSection;
}

export const INITIAL_COLLEGES_PAGE_STATE: CollegesPageState = {
    heroSection: {
        enabled: true,
        primaryHeadline: "",
        subHeadline: "",
    },
};

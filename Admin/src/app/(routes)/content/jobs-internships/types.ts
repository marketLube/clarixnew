export interface JobsInternshipsHeroSection {
    enabled: boolean;
    primaryHeadline: string;
    subHeadline: string;
}

export interface JobsInternshipsPageState {
    heroSection: JobsInternshipsHeroSection;
}

export const INITIAL_JOBS_INTERNSHIPS_PAGE_STATE: JobsInternshipsPageState = {
    heroSection: {
        enabled: true,
        primaryHeadline: "",
        subHeadline: "",
    },
};

export interface BlogPageHeroState {
    enabled: boolean;
    headline: string;
    subHeadline: string;
}

export interface BlogPageFilterItem {
    label: string;
    value: string;
}

export interface BlogPageSearchFiltersState {
    enabled: boolean;
    filters: BlogPageFilterItem[];
}

export interface BlogPageNewsletterState {
    enabled: boolean;
    title: string;
    subHeadline: string;
    /**
     * Admin-side representation of the newsletter image.
     * - `string`: existing image URL from API
     * - `File`: newly selected upload
     */
    image: string | File | null;
}

export interface BlogPageState {
    hero: BlogPageHeroState;
    searchFilters: BlogPageSearchFiltersState;
    newsletter: BlogPageNewsletterState;
}

export const INITIAL_BLOGPAGE_STATE: BlogPageState = {
    hero: {
        enabled: true,
        headline: "Read Latest Education & Career Blogs",
        subHeadline: "Insights, tips and guidance from industry experts",
    },
    searchFilters: {
        enabled: true,
        filters: [
            { label: "College Rankings", value: "college-rankings" },
            { label: "Student Life", value: "student-life" },
        ],
    },
    newsletter: {
        enabled: true,
        title: "Subscribe to Our Newsletter",
        subHeadline: "Get the latest education news and career updates in your inbox",
        image: "",
    },
};

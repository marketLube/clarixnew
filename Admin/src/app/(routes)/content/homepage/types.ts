// Homepage content state types
export interface HomePageState {
    // Hero Section - Headlines
    hero: {
        headlines: {
            isEnabled: boolean;
            primaryHeadline: string;
            subHeadline: string;
        };
        cta: {
            isEnabled: boolean;
            primaryText: string;
            primaryLink: string;
        };
        backgroundMedia: {
            isEnabled: boolean;
            /**
             * Admin-side representation of hero background images.
             * - `string`: existing image URL from API
             * - `File`: newly selected upload(s)
             */
            backgroundImages: Array<File | string>;
        };
    };
    // Streams Section
    streams: {
        enabled: boolean;
        title?: string;
        paragraph?: string;
        items: Array<{
            name?: string;
            icon?: string;
        }>;
    };
    // Location Section
    location: {
        enabled: boolean;
        title?: string;
        items: Array<{
            id: string;
            name: string;
            slug: string;
            image?: string;
            isActive: boolean;
        }>;
    };
    // Content Blocks Section
    contentBlocks: {
        enabled: boolean;
        blocks: Array<{
            title?: string;
            description?: string;
            image?: string;
        }>;
    };
    // Career Hub Section
    careerHub: {
        enabled: boolean;
        title?: string;
        paragraph?: string;
        /**
         * Admin-side representation of career hub images & logos.
         * - `string`: existing image URL from API
         * - `File`: newly selected upload(s)
         */
        images?: Array<File | string>;
        logo?: Array<File | string>;
    };
    // FAQ Section
    faq: {
        enabled: boolean;
        title?: string;
        paragraph?: string;
        items: Array<{
            question?: string;
            answer?: string;
        }>;
    };
}

export const INITIAL_HOMEPAGE_STATE: HomePageState = {
    hero: {
        headlines: {
            isEnabled: true,
            primaryHeadline: "Your Dreams Deserve the Right Direction",
            subHeadline: "Where Verified Data Meets Real Student Voices",
        },
        cta: {
            isEnabled: true,
            primaryText: "Start Exploring",
            primaryLink: "/colleges",
        },
        backgroundMedia: {
            isEnabled: true,
            backgroundImages: [],
        },
    },
    location: {
        enabled: true,
        title: "",
        items: [],
    },
    streams: {
        enabled: true,
        title: "",
        paragraph: "",
        items: [],
    },
    contentBlocks: {
        enabled: true,
        blocks: [],
    },
    careerHub: {
        enabled: true,
        title: "",
        paragraph: "",
        images: [],
        logo: [],
    },
    faq: {
        enabled: true,
        title: "",
        paragraph: "",
        items: [],
    },
};

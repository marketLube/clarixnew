"use client";

import { useEffect, useState } from "react";
import { HeroSectionHeaders } from "./(components)/Hero/components/HeroSectionTabs";
import Hero from "./(components)/Hero/Hero";
import Streams from "./(components)/streams/Streams";
import ContentBlock from "./(components)/ContentBlock/ContentBlock";
import CareerHub from "./(components)/CareerHub/CareerHub";
import FAQ from "./(components)/FAQ/FAQ";
import Location from "./(components)/Location/Location";
import { HomePageHeader } from "./(components)/common/HomePageHeader";
import { HomePageState, INITIAL_HOMEPAGE_STATE } from "./types";
import { useUpdateCMSHomePage } from "@/src/servicesHooks/contentHooks/homepage/useCMSHomePage";
import { useCMSHomePage } from "@/src/servicesHooks/contentHooks/homepage/useHomepage";

export default function HomePage() {
    const [activeTab, setActiveTab] = useState("hero");
    const [data, setData] = useState<HomePageState>(INITIAL_HOMEPAGE_STATE);

    const { data: cmsResponse } = useCMSHomePage();
    const { updateCMSHomePage, isPending, isError, error } = useUpdateCMSHomePage();

    // When CMS data loads from the API, map it into our local HomePageState shape
    useEffect(() => {
        if (!cmsResponse?.data) return;

        const api = cmsResponse.data as any;

        const mapped: HomePageState = {
            hero: {
                headlines: {
                    isEnabled: api.hero?.enabled ?? true,
                    primaryHeadline: api.hero?.headline ?? "",
                    subHeadline: api.hero?.subHeadline ?? "",
                },
                cta: {
                    isEnabled: api.hero?.enabled ?? true,
                    primaryText: api.hero?.PrimaryCtaText ?? "",
                    primaryLink: api.hero?.PrimaryCtaLink ?? "",
                },
                backgroundMedia: {
                    isEnabled: true,
                    backgroundImages: Array.isArray(api.hero?.images) ? api.hero.images : [],
                },
            },
            streams: {
                enabled: api.streams?.enabled ?? true,
                title: api.streams?.title ?? "",
                paragraph: api.streams?.paragraph ?? "",
                items: (api.streams?.items ?? []).map((item: any) => ({
                    name: item?.name ?? "",
                    icon: item?.icon ?? "",
                })),
            },
            location: {
                enabled: api.location?.enabled ?? true,
                title: api.location?.title ?? "",
                items: (api.location?.items ?? []).map((item: any) => ({
                    id: item?._id || item?.id || "",
                    name: item?.name ?? "",
                    slug: item?.slug ?? "",
                    image: item?.image ?? "",
                    isActive: item?.isActive ?? true,
                })),
            },
            contentBlocks: {
                enabled: api.contentBlocks?.enabled ?? true,
                blocks: (api.contentBlocks?.blocks ?? []).map((block: any) => ({
                    title: block?.title ?? "",
                    description: block?.description ?? "",
                    image: block?.image ?? "",
                })),
            },
            careerHub: {
                enabled: api.careerHub?.enabled ?? true,
                title: api.careerHub?.title ?? "",
                paragraph: api.careerHub?.paragraph ?? "",
                images: api.careerHub?.images ?? [],
                logo: api.careerHub?.logo ?? [],
            },
            faq: {
                enabled: api.faq?.enabled ?? true,
                title: api.faq?.title ?? "",
                paragraph: api.faq?.paragraph ?? "",
                items: (api.faq?.items ?? []).map((item: any) => ({
                    question: item?.question ?? "",
                    answer: item?.answer ?? "",
                })),
            },
        };

        setData(mapped);
    }, [cmsResponse]);


    const updateHeroData = (updates: Partial<typeof data.hero>) => {
        setData((prev) => ({
            ...prev,
            hero: { ...prev.hero, ...updates }
        }));
    };

    const updateStreamsData = (updates: Partial<typeof data.streams>) => {
        setData((prev) => ({
            ...prev,
            streams: { ...prev.streams, ...updates }
        }));
    };

    const updateLocationData = (updates: Partial<typeof data.location>) => {
        setData((prev) => ({
            ...prev,
            location: { ...prev.location, ...updates }
        }));
    };

    const updateContentBlocksData = (updates: Partial<typeof data.contentBlocks>) => {
        setData((prev) => ({
            ...prev,
            contentBlocks: { ...prev.contentBlocks, ...updates }
        }));
    };

    const updateCareerHubData = (updates: Partial<typeof data.careerHub>) => {
        setData((prev) => ({
            ...prev,
            careerHub: { ...prev.careerHub, ...updates }
        }));
    };

    const updateFaqData = (updates: Partial<typeof data.faq>) => {
        setData((prev) => ({
            ...prev,
            faq: { ...prev.faq, ...updates }
        }));
    };

    const handlePublish = async () => {
        try {
            // Build FormData in the format expected by backend
            const formData = new FormData();

            // Hero section fields
            formData.append("hero[enabled]", String(data.hero.headlines.isEnabled));
            if (data.hero.headlines.primaryHeadline) {
                formData.append("hero[headline]", data.hero.headlines.primaryHeadline);
            }
            if (data.hero.headlines.subHeadline) {
                formData.append("hero[subHeadline]", data.hero.headlines.subHeadline);
            }
            if (data.hero.cta.primaryText) {
                formData.append("hero[PrimaryCtaText]", data.hero.cta.primaryText);
            }
            if (data.hero.cta.primaryLink) {
                formData.append("hero[PrimaryCtaLink]", data.hero.cta.primaryLink);
            }

            // Handle hero background images (existing URLs + newly selected File uploads)
            (data.hero.backgroundMedia.backgroundImages || []).forEach((item) => {
                if (item instanceof File) {
                    // Append each file using the field name expected by multer
                    formData.append("hero[backgroundMedia][backgroundFile]", item);
                } else if (typeof item === "string" && item.trim()) {
                    // Persist existing image URLs
                    formData.append("hero[images][]", item);
                }
            });

            // Streams section (append full state, including empty strings so backend can clear/update)
            formData.append("streams[enabled]", String(data.streams.enabled));
            formData.append("streams[title]", data.streams.title ?? "");
            formData.append("streams[paragraph]", data.streams.paragraph ?? "");
            (data.streams.items || []).forEach((item: any, index: number) => {
                formData.append(`streams[items][${index}][name]`, item?.name ?? "");
                formData.append(`streams[items][${index}][icon]`, item?.icon ?? "");
            });

            // Location section
            formData.append("location[enabled]", String(data.location.enabled));
            formData.append("location[title]", data.location.title ?? "");
            (data.location.items || []).forEach((item: any, index: number) => {
                formData.append(`location[items][${index}][id]`, item?.id ?? "");
                formData.append(`location[items][${index}][name]`, item?.name ?? "");
                formData.append(`location[items][${index}][slug]`, item?.slug ?? "");
                // If a new image file was selected in the drawer, append it so multer uploads it.
                if (item?.imageFile instanceof File) {
                    formData.append("location[images][]", item.imageFile);
                }
                // Always send the current image value (may be an existing URL or a temporary blob URL);
                // the backend will replace blob URLs with the uploaded file URL.
                formData.append(`location[items][${index}][image]`, item?.image ?? "");
                formData.append(`location[items][${index}][isActive]`, String(item?.isActive ?? true));
            });

            // Content blocks section
            formData.append("contentBlocks[enabled]", String(data.contentBlocks.enabled));
            (data.contentBlocks.blocks || []).forEach((block: any, index: number) => {
                formData.append(`contentBlocks[blocks][${index}][title]`, block?.title ?? "");
                formData.append(`contentBlocks[blocks][${index}][description]`, block?.description ?? "");
                formData.append(`contentBlocks[blocks][${index}][image]`, block?.image ?? "");
            });

            // Career hub section
            formData.append("careerHub[enabled]", String(data.careerHub.enabled));
            formData.append("careerHub[title]", data.careerHub.title ?? "");
            formData.append("careerHub[paragraph]", data.careerHub.paragraph ?? "");
            (data.careerHub.images || []).forEach((image) => {
                if (image instanceof File) {
                    // New upload - let multer handle it
                    formData.append("careerHub[images][]", image);
                } else if (typeof image === "string" && image.trim()) {
                    // Existing URL - keep as string
                    formData.append("careerHub[images][]", image);
                }
            });
            (data.careerHub.logo || []).forEach((logo) => {
                if (logo instanceof File) {
                    formData.append("careerHub[logo][]", logo);
                } else if (typeof logo === "string" && logo.trim()) {
                    formData.append("careerHub[logo][]", logo);
                }
            });

            // FAQ section (append full state, including empty strings so backend can clear/update)
            formData.append("faq[enabled]", String(data.faq.enabled));
            formData.append("faq[title]", data.faq.title ?? "");
            formData.append("faq[paragraph]", data.faq.paragraph ?? "");
            (data.faq.items || []).forEach((item: any, index: number) => {
                formData.append(`faq[items][${index}][question]`, item?.question ?? "");
                formData.append(`faq[items][${index}][answer]`, item?.answer ?? "");
            });

            updateCMSHomePage(formData);
        } catch {
            // Error handled silently
        }
    };

    return (
        <div>
            <HomePageHeader onPublish={handlePublish} />
            <div className="flex flex-col gap-6 max-w-[55rem] mx-auto pb-5">
                <HeroSectionHeaders
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                {activeTab === "hero" && <Hero data={data} updateHeroData={updateHeroData} />}
                {activeTab === "location" && <Location data={data} updateLocationData={updateLocationData} />}
                {activeTab === "streams" && <Streams data={data} updateStreamsData={updateStreamsData} />}
                {activeTab === "blocks" && <ContentBlock data={data} updateContentBlocksData={updateContentBlocksData} />}
                {activeTab === "career" && <CareerHub data={data} updateCareerHubData={updateCareerHubData} />}
                {activeTab === "faq" && <FAQ data={data} updateFaqData={updateFaqData} />}
            </div>
        </div>
    );
}
"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/src/components/common/PageHeader";
import Headline from "./(components)/Headline";
import SecondSection from "./(components)/SecondSection";
import ThirdSection from "./(components)/ThirdSection";
import FourthSection from "./(components)/FourthSection";
import KeyStatistics from "./(components)/KeyStatistics";
import {
    AboutPageState,
    INITIAL_ABOUT_PAGE_STATE,
} from "./types";
import { useCMSAboutPage } from "@/src/servicesHooks/contentHooks/aboutpage/useAboutPage";
import { useUpdateCMSAboutPage } from "@/src/servicesHooks/contentHooks/aboutpage/useCMSAboutPage";

export default function AboutUs() {
    const [data, setData] = useState<AboutPageState>(INITIAL_ABOUT_PAGE_STATE);

    const { data: cmsResponse } = useCMSAboutPage();
    const { updateCMSAboutPage } = useUpdateCMSAboutPage();

    useEffect(() => {
        if (!cmsResponse?.data) return;

        const api = cmsResponse.data as any;

        const mapped: AboutPageState = {
            hero: {
                enabled: api.hero?.enabled ?? true,
                headline: api.hero?.headline ?? INITIAL_ABOUT_PAGE_STATE.hero.headline,
                subHeadline: api.hero?.subHeadline ?? INITIAL_ABOUT_PAGE_STATE.hero.subHeadline,
            },
            secondSection: {
                enabled: api.secondSection?.enabled ?? true,
                headline: api.secondSection?.headline ?? INITIAL_ABOUT_PAGE_STATE.secondSection.headline,
                paragraph: api.secondSection?.paragraph ?? "",
                mission: api.secondSection?.mission ?? "",
                vision: api.secondSection?.vision ?? "",
            },
            thirdSection: {
                enabled: api.thirdSection?.enabled ?? true,
                headline: api.thirdSection?.headline ?? INITIAL_ABOUT_PAGE_STATE.thirdSection.headline,
                paragraph: api.thirdSection?.paragraph ?? "",
                cards: (api.thirdSection?.cards ?? INITIAL_ABOUT_PAGE_STATE.thirdSection.cards).map((card: any) => ({
                    title: card?.title ?? "",
                    description: card?.description ?? "",
                    icon: card?.icon ?? "",
                })),
            },
            fourthSection: {
                enabled: api.fourthSection?.enabled ?? true,
                headline: api.fourthSection?.headline ?? INITIAL_ABOUT_PAGE_STATE.fourthSection.headline,
                paragraph: api.fourthSection?.paragraph ?? "",
            },
            keyStatistics: {
                enabled: api.keyStatistics?.enabled ?? true,
                stats: (api.keyStatistics?.stats ?? INITIAL_ABOUT_PAGE_STATE.keyStatistics.stats).map((stat: any) => ({
                    label: stat?.label ?? "",
                    value: stat?.value ?? "",
                })),
            },
        };

        setData(mapped);
    }, [cmsResponse]);

    const updateHero = (updates: Partial<AboutPageState["hero"]>) => {
        setData((prev) => ({
            ...prev,
            hero: { ...prev.hero, ...updates },
        }));
    };

    const updateSecondSection = (updates: Partial<AboutPageState["secondSection"]>) => {
        setData((prev) => ({
            ...prev,
            secondSection: { ...prev.secondSection, ...updates },
        }));
    };

    const updateThirdSection = (updates: Partial<AboutPageState["thirdSection"]>) => {
        setData((prev) => ({
            ...prev,
            thirdSection: { ...prev.thirdSection, ...updates },
        }));
    };

    const updateFourthSection = (updates: Partial<AboutPageState["fourthSection"]>) => {
        setData((prev) => ({
            ...prev,
            fourthSection: { ...prev.fourthSection, ...updates },
        }));
    };

    const updateKeyStatistics = (updates: Partial<AboutPageState["keyStatistics"]>) => {
        setData((prev) => ({
            ...prev,
            keyStatistics: { ...prev.keyStatistics, ...updates },
        }));
    };

    const handlePublish = () => {
        const payload = {
            hero: {
                enabled: data.hero.enabled,
                headline: data.hero.headline,
                subHeadline: data.hero.subHeadline,
            },
            secondSection: {
                enabled: data.secondSection.enabled,
                headline: data.secondSection.headline,
                paragraph: data.secondSection.paragraph,
                mission: data.secondSection.mission,
                vision: data.secondSection.vision,
            },
            thirdSection: {
                enabled: data.thirdSection.enabled,
                headline: data.thirdSection.headline,
                paragraph: data.thirdSection.paragraph,
                cards: data.thirdSection.cards.map((card) => ({
                    title: card.title,
                    description: card.description,
                    icon: card.icon,
                })),
            },
            fourthSection: {
                enabled: data.fourthSection.enabled,
                headline: data.fourthSection.headline,
                paragraph: data.fourthSection.paragraph,
            },
            keyStatistics: {
                enabled: data.keyStatistics.enabled,
                stats: data.keyStatistics.stats.map((stat) => ({
                    label: stat.label,
                    value: stat.value,
                })),
            },
            status: "published" as const,
        };

        updateCMSAboutPage(payload);
    };

    return (
        <div>
            <PageHeader title="About Us" onPublish={handlePublish} />
            <div className="flex flex-col gap-6 max-w-[55rem] mx-auto py-5 mt-6">
                <Headline data={data.hero} onChange={updateHero} />
                <SecondSection data={data.secondSection} onChange={updateSecondSection} />
                <ThirdSection data={data.thirdSection} onChange={updateThirdSection} />
                <FourthSection data={data.fourthSection} onChange={updateFourthSection} />
                <KeyStatistics data={data.keyStatistics} onChange={updateKeyStatistics} />
            </div>
        </div>
    );
}

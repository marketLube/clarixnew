"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/src/components/common/PageHeader";
import HeroSection from "./(components)/HeroSection";
import {
    CollegesPageState,
    INITIAL_COLLEGES_PAGE_STATE,
} from "./types";
import { useCMSCollegesPage } from "../../../../servicesHooks/contentHooks/collegespage/useCollegesPage";
import { useUpdateCMSCollegesPage } from "../../../../servicesHooks/contentHooks/collegespage/useCMSCollegesPage";

export default function CollegesPage() {
    const [data, setData] = useState<CollegesPageState>(INITIAL_COLLEGES_PAGE_STATE);

    const { data: cmsResponse } = useCMSCollegesPage();
    const { updateCMSCollegesPage } = useUpdateCMSCollegesPage();

    useEffect(() => {
        if (!cmsResponse?.data) return;

        const api = cmsResponse.data as any;

        const mapped: CollegesPageState = {
            heroSection: {
                enabled: api.heroSection?.enabled ?? true,
                primaryHeadline: api.heroSection?.primaryHeadline ?? "",
                subHeadline: api.heroSection?.subHeadline ?? "",
            },
        };

        setData(mapped);
    }, [cmsResponse]);

    const updateHeroSection = (updates: Partial<CollegesPageState["heroSection"]>) => {
        setData((prev) => ({
            ...prev,
            heroSection: { ...prev.heroSection, ...updates },
        }));
    };

    const handlePublish = () => {
        const payload = {
            heroSection: {
                enabled: data.heroSection.enabled,
                primaryHeadline: data.heroSection.primaryHeadline,
                subHeadline: data.heroSection.subHeadline,
            },
        };

        updateCMSCollegesPage(payload, {
            onSuccess: (responseData: any) => {
                console.log("Colleges page updated successfully:", responseData);
            },
        });
    };

    return (
        <div>
            <PageHeader
                title="Colleges Page"
                onPublish={handlePublish}
                backUrl="/content"
            />
            <div className="flex flex-col gap-6 max-w-[55rem] mx-auto py-5 mt-6">
                <HeroSection
                    data={data.heroSection}
                    onChange={updateHeroSection}
                />
            </div>
        </div>
    );
}

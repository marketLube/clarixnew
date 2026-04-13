"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/src/components/common/PageHeader";
import HeroSection from "./(components)/HeroSection";
import {
    ExamPageState,
    INITIAL_EXAM_PAGE_STATE,
} from "./types";
import { useCMSExamPage } from "../../../../servicesHooks/contentHooks/exampage/useExamPage";
import { useUpdateCMSExamPage } from "../../../../servicesHooks/contentHooks/exampage/useCMSExamPage";

export default function ExamPage() {
    const [data, setData] = useState<ExamPageState>(INITIAL_EXAM_PAGE_STATE);

    const { data: cmsResponse } = useCMSExamPage();
    const { updateCMSExamPage } = useUpdateCMSExamPage();

    useEffect(() => {
        if (!cmsResponse?.data) return;

        const api = cmsResponse.data as any;

        const mapped: ExamPageState = {
            heroSection: {
                enabled: api.heroSection?.enabled ?? true,
                primaryHeadline: api.heroSection?.primaryHeadline ?? "",
                subHeadline: api.heroSection?.subHeadline ?? "",
            },
        };

        setData(mapped);
    }, [cmsResponse]);

    const updateHeroSection = (updates: Partial<ExamPageState["heroSection"]>) => {
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

        updateCMSExamPage(payload, {
            onSuccess: (responseData: any) => {
                console.log("Exam page updated successfully:", responseData);
            },
        });
    };

    return (
        <div>
            <PageHeader
                title="Exam Page"
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

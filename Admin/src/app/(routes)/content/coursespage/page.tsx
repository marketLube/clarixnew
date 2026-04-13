"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/src/components/common/PageHeader";
import HeroSection from "./(components)/HeroSection";
import {
    CoursesPageState,
    INITIAL_COURSES_PAGE_STATE,
} from "./types";
import { useCMSCoursesPage } from "../../../../servicesHooks/contentHooks/coursespage/useCoursesPage";
import { useUpdateCMSCoursesPage } from "../../../../servicesHooks/contentHooks/coursespage/useCMSCoursesPage";

export default function CoursesPage() {
    const [data, setData] = useState<CoursesPageState>(INITIAL_COURSES_PAGE_STATE);

    const { data: cmsResponse } = useCMSCoursesPage();
    const { updateCMSCoursesPage } = useUpdateCMSCoursesPage();

    useEffect(() => {
        if (!cmsResponse?.data) return;

        const api = cmsResponse.data as any;

        const mapped: CoursesPageState = {
            heroSection: {
                enabled: api.heroSection?.enabled ?? true,
                primaryHeadline: api.heroSection?.primaryHeadline ?? "",
                subHeadline: api.heroSection?.subHeadline ?? "",
            },
        };

        setData(mapped);
    }, [cmsResponse]);

    const updateHeroSection = (updates: Partial<CoursesPageState["heroSection"]>) => {
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

        updateCMSCoursesPage(payload, {
            onSuccess: (responseData: any) => {
                console.log("Courses page updated successfully:", responseData);
            },
        });
    };

    return (
        <div>
            <PageHeader
                title="Courses Page"
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

"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/src/components/common/PageHeader";
import HeroSection from "./(components)/HeroSection";
import {
    JobsInternshipsPageState,
    INITIAL_JOBS_INTERNSHIPS_PAGE_STATE,
} from "./types";
import { useCMSJobsInternshipsPage } from "@/src/servicesHooks/contentHooks/jobsInternshipsPage/useJobsInternshipsPage";
import { useUpdateCMSJobsInternshipsPage } from "@/src/servicesHooks/contentHooks/jobsInternshipsPage/useCMSJobsInternshipsPage";

export default function JobsInternshipsPage() {
    const [data, setData] = useState<JobsInternshipsPageState>(INITIAL_JOBS_INTERNSHIPS_PAGE_STATE);

    const { data: cmsResponse } = useCMSJobsInternshipsPage();
    const { updateCMSJobsInternshipsPage } = useUpdateCMSJobsInternshipsPage();

    useEffect(() => {
        if (!cmsResponse?.data) return;

        const api = cmsResponse.data as any;

        const mapped: JobsInternshipsPageState = {
            heroSection: {
                enabled: api.heroSection?.enabled ?? true,
                primaryHeadline: api.heroSection?.primaryHeadline ?? "",
                subHeadline: api.heroSection?.subHeadline ?? "",
            },
        };

        setData(mapped);
    }, [cmsResponse]);

    const updateHeroSection = (updates: Partial<JobsInternshipsPageState["heroSection"]>) => {
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

        updateCMSJobsInternshipsPage(payload, {
            onSuccess: (responseData: any) => {
                console.log("Jobs & Internships page updated successfully:", responseData);
            },
        });
    };

    return (
        <div>
            <PageHeader
                title="Jobs & Internships Page"
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

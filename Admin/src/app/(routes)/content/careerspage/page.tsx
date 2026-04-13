"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/src/components/common/PageHeader";
import HeroSection from "./(components)/HeroSection";
import SecondSection from "./(components)/SecondSection";
import ThirdSection from "./(components)/ThirdSection";
import {
    CareersPageState,
    INITIAL_CAREERS_PAGE_STATE,
    JobItem,
} from "./types";
import { useCMSCareersPage } from "@/src/servicesHooks/contentHooks/careerspage/useCareersPage";
import { useUpdateCMSCareersPage } from "@/src/servicesHooks/contentHooks/careerspage/useCMSCareersPage";

export default function CareersPage() {
    const [data, setData] = useState<CareersPageState>(INITIAL_CAREERS_PAGE_STATE);

    const { data: cmsResponse } = useCMSCareersPage();
    const { updateCMSCareersPage } = useUpdateCMSCareersPage();

    useEffect(() => {
        if (!cmsResponse?.data) return;

        const api = cmsResponse.data as any;

        const mapped: CareersPageState = {
            heroSection: {
                enabled: api.heroSection?.enabled ?? true,
                primaryHeadline: api.heroSection?.primaryHeadline ?? "",
                subHeadline: api.heroSection?.subHeadline ?? "",
            },
            secondSection: {
                enabled: api.secondSection?.enabled ?? true,
                primaryHeadline: api.secondSection?.primaryHeadline ?? INITIAL_CAREERS_PAGE_STATE.secondSection.primaryHeadline,
                paragraph: api.secondSection?.paragraph ?? "",
                images: api.secondSection?.images ?? [],
            },
            thirdSection: {
                enabled: api.thirdSection?.enabled ?? true,
                primaryHeadline: api.thirdSection?.primaryHeadline ?? INITIAL_CAREERS_PAGE_STATE.thirdSection.primaryHeadline,
                subHeadline: api.thirdSection?.subHeadline ?? INITIAL_CAREERS_PAGE_STATE.thirdSection.subHeadline,
                jobCategories: api.thirdSection?.jobCategories ?? INITIAL_CAREERS_PAGE_STATE.thirdSection.jobCategories,
            },
            jobs: api.jobs ?? [],
        };

        setData(mapped);
    }, [cmsResponse]);

    const updateHeroSection = (updates: Partial<CareersPageState["heroSection"]>) => {
        setData((prev) => ({
            ...prev,
            heroSection: { ...prev.heroSection, ...updates },
        }));
    };

    const updateSecondSection = (updates: Partial<CareersPageState["secondSection"]>) => {
        setData((prev) => ({
            ...prev,
            secondSection: { ...prev.secondSection, ...updates },
        }));
    };

    const updateThirdSection = (updates: Partial<CareersPageState["thirdSection"]>) => {
        setData((prev) => ({
            ...prev,
            thirdSection: { ...prev.thirdSection, ...updates },
        }));
    };


    const handlePublish = () => {
        const formData = new FormData();

        // Hero Section
        formData.append("heroSection[enabled]", String(data.heroSection.enabled));
        formData.append("heroSection[primaryHeadline]", data.heroSection.primaryHeadline);
        formData.append("heroSection[subHeadline]", data.heroSection.subHeadline);

        // Second Section
        formData.append("secondSection[enabled]", String(data.secondSection.enabled));
        formData.append("secondSection[primaryHeadline]", data.secondSection.primaryHeadline);
        formData.append("secondSection[paragraph]", data.secondSection.paragraph);

        // Third Section
        formData.append("thirdSection[enabled]", String(data.thirdSection.enabled));
        formData.append("thirdSection[primaryHeadline]", data.thirdSection.primaryHeadline);
        formData.append("thirdSection[subHeadline]", data.thirdSection.subHeadline);

        data.thirdSection.jobCategories.forEach((cat, index) => {
            formData.append(`thirdSection[jobCategories][${index}]`, cat);
        });

        // Handle second section images
        (data.secondSection.images || []).forEach((img, index) => {
            // If the URL is a File object, it's a new upload
            if (img.url instanceof File) {
                formData.append("secondSection[images]", img.url);
            } else if (typeof img.url === "string" && img.url.trim()) {
                // If it's a string, it's an existing image URL
                formData.append(`secondSection[images][${index}][url]`, img.url);
                if (img.alt) formData.append(`secondSection[images][${index}][alt]`, img.alt);
                if (img._id) formData.append(`secondSection[images][${index}][_id]`, img._id);
            }
        });

        // Jobs
        data.jobs.forEach((job, index) => {
            formData.append(`jobs[${index}][enabled]`, String(job.enabled));
            formData.append(`jobs[${index}][jobTitle]`, job.jobTitle);
            formData.append(`jobs[${index}][companyName]`, job.companyName);
            formData.append(`jobs[${index}][jobType]`, job.jobType);
            formData.append(`jobs[${index}][location]`, job.location);
            if (job.companyWebsite) formData.append(`jobs[${index}][companyWebsite]`, job.companyWebsite);
            if (job.aboutJob) formData.append(`jobs[${index}][aboutJob]`, job.aboutJob);

            (job.aboutYou || []).forEach((item, itemIndex) => {
                formData.append(`jobs[${index}][aboutYou][${itemIndex}]`, item);
            });
        });

        console.log("Publishing careers page content as FormData");

        updateCMSCareersPage(formData, {
            onSuccess: (responseData: any) => {
                console.log("Careers page updated successfully:", responseData);
            },
            onError: (error: any) => {
                console.error("Error updating careers page:", error);
            }
        });
    };

    return (
        <div>
            <PageHeader title="Careers Page" onPublish={handlePublish} />
            <div className="flex flex-col gap-6 max-w-[55rem] mx-auto py-5 mt-6">
                <HeroSection data={data.heroSection} onChange={updateHeroSection} />
                <SecondSection data={data.secondSection} onChange={updateSecondSection} />
                <ThirdSection data={data.thirdSection} onChange={updateThirdSection} />
            </div>
        </div>
    );
}

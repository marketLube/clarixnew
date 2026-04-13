"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/src/components/common/PageHeader";
import Footer from "./(components)/Footer";
import NewLetter from "./(components)/NewLetter";
import FooterLink from "./(components)/FooterLink";
import {
    FooterPageState,
    INITIAL_FOOTER_PAGE_STATE,
} from "./types";
import { useCMSFooter } from "@/src/servicesHooks/contentHooks/footer/useFooter";
import { useUpdateCMSFooter } from "@/src/servicesHooks/contentHooks/footer/useCMSFooter";

export default function ContentBlocksPage() {
    const [data, setData] = useState<FooterPageState>(INITIAL_FOOTER_PAGE_STATE);

    const { data: cmsResponse } = useCMSFooter();
    const { updateCMSFooter } = useUpdateCMSFooter();

    useEffect(() => {
        if (!cmsResponse?.data) return;

        const api = cmsResponse.data as any;

        const mapped: FooterPageState = {
            enabled: api.enabled ?? true,
            primaryHeadline: api.primaryHeadline ?? "",
            subHeadline: api.subHeadline ?? "",
            locationLink: api.locationLink ?? "",
            contactNumber: api.contactNumber ?? "",
            email: api.email ?? INITIAL_FOOTER_PAGE_STATE.email,
            newsletter: {
                enabled: api.newsletter?.enabled ?? true,
                primaryHeadline: api.newsletter?.primaryHeadline ?? INITIAL_FOOTER_PAGE_STATE.newsletter.primaryHeadline,
                subHeadline: api.newsletter?.subHeadline ?? INITIAL_FOOTER_PAGE_STATE.newsletter.subHeadline,
                primaryButtonText: api.newsletter?.primaryButtonText ?? INITIAL_FOOTER_PAGE_STATE.newsletter.primaryButtonText,
                primaryButtonLink: api.newsletter?.primaryButtonLink ?? INITIAL_FOOTER_PAGE_STATE.newsletter.primaryButtonLink,
            },
            exploreColleges: api.exploreColleges ?? [],
            courses: api.courses ?? [],
            exams: api.exams ?? [],
            admissions: api.admissions ?? [],
            scholarships: api.scholarships ?? [],
            about: api.about ?? [],
        };

        setData(mapped);
    }, [cmsResponse]);

    const updateFooter = (updates: Partial<FooterPageState>) => {
        setData((prev) => ({
            ...prev,
            ...updates,
        }));
    };

    const updateNewsletter = (updates: Partial<FooterPageState["newsletter"]>) => {
        setData((prev) => ({
            ...prev,
            newsletter: { ...prev.newsletter, ...updates },
        }));
    };

    const updateFooterLinks = (category: keyof Pick<FooterPageState, "exploreColleges" | "courses" | "exams" | "admissions" | "scholarships" | "about">, links: FooterPageState["exploreColleges"]) => {
        setData((prev) => ({
            ...prev,
            [category]: links,
        }));
    };

    const handlePublish = () => {
        // Trim all string values to prevent validation errors
        // Only include email if it's not empty after trimming
        const trimmedEmail = data.email?.trim();

        const sanitizeLinks = (links: typeof data.exploreColleges) =>
            (links || [])
                .map((link) => ({
                    label: link.label?.trim() || "",
                    url: link.url?.trim() || "",
                }))
                .filter((link) => link.label.length > 0 && link.url.length > 0);

        const payload: any = {
            enabled: data.enabled,
            primaryHeadline: data.primaryHeadline?.trim() || "",
            subHeadline: data.subHeadline?.trim() || "",
            locationLink: data.locationLink?.trim() || "",
            contactNumber: data.contactNumber?.trim() || "",
            newsletter: {
                enabled: data.newsletter.enabled,
                primaryHeadline: data.newsletter.primaryHeadline?.trim() || "",
                subHeadline: data.newsletter.subHeadline?.trim() || "",
                primaryButtonText: data.newsletter.primaryButtonText?.trim() || "",
                primaryButtonLink: data.newsletter.primaryButtonLink?.trim() || "",
            },
            exploreColleges: sanitizeLinks(data.exploreColleges),
            courses: sanitizeLinks(data.courses),
            exams: sanitizeLinks(data.exams),
            admissions: sanitizeLinks(data.admissions),
            scholarships: sanitizeLinks(data.scholarships),
            about: sanitizeLinks(data.about),
        };

        // Only include email if it's not empty
        if (trimmedEmail) {
            payload.email = trimmedEmail;
        }

        updateCMSFooter(payload, {
            onSuccess: (responseData: any) => {
                console.log("Footer content updated successfully:", responseData);
            },
            onError: (error: any) => {
                console.error("Error updating footer:", error);
            },
        });
    };

    return (
        <div>
            <PageHeader title="Content Blocks" onPublish={handlePublish} />
            <div className="flex flex-col gap-6 max-w-[55rem] mx-auto py-5 mt-6">
                <Footer
                    data={{
                        enabled: data.enabled,
                        primaryHeadline: data.primaryHeadline,
                        subHeadline: data.subHeadline,
                        locationLink: data.locationLink,
                        contactNumber: data.contactNumber,
                        email: data.email,
                    }}
                    onChange={(updates) => updateFooter(updates)}
                />
                <NewLetter
                    data={data.newsletter}
                    onChange={updateNewsletter}
                />
                <FooterLink
                    data={{
                        exploreColleges: data.exploreColleges,
                        courses: data.courses,
                        exams: data.exams,
                        admissions: data.admissions,
                        scholarships: data.scholarships,
                        about: data.about,
                    }}
                    onChange={updateFooterLinks}
                />
            </div>
        </div>
    );
}

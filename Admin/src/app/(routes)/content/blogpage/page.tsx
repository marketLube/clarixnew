"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/src/components/common/PageHeader";
import { BlogSectionTabs } from "./(components)/BlogSectionTabs";
import HeroSection from "./(components)/HeroSection/HeroSection";
import CreateBlog from "./(components)/CreateBlog/CreateBlog";
import BlogList from "./(components)/BlogList/BlogList";
import {
    BlogPageState,
    INITIAL_BLOGPAGE_STATE,
} from "./types";
import { useCMSBlogPage } from "@/src/servicesHooks/contentHooks/blogpage/useCMSBlogPage";
import { useUpdateCMSBlogPage } from "@/src/servicesHooks/contentHooks/blogpage/useUpdateCMSBlogPage";

export default function BlogPage() {
    const [activeTab, setActiveTab] = useState("hero");
    const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState(false);
    const [data, setData] = useState<BlogPageState>(INITIAL_BLOGPAGE_STATE);

    const { data: cmsResponse } = useCMSBlogPage();
    const { updateCMSBlogPage } = useUpdateCMSBlogPage();

    useEffect(() => {
        if (!cmsResponse?.data) return;

        const api = cmsResponse.data as any;

        const mapped: BlogPageState = {
            hero: {
                enabled: api.hero?.enabled ?? true,
                headline: api.hero?.headline ?? "",
                subHeadline: api.hero?.subHeadline ?? "",
            },
            searchFilters: {
                enabled: api.searchFilters?.enabled ?? true,
                filters: Array.isArray(api.searchFilters?.filters)
                    ? api.searchFilters.filters.map((item: any) => ({
                        label: item?.label ?? "",
                        value: item?.value ?? "",
                    }))
                    : [],
            },
            newsletter: {
                enabled: api.newsletter?.enabled ?? true,
                title: api.newsletter?.title ?? "",
                subHeadline: api.newsletter?.subHeadline ?? "",
                image: api.newsletter?.image ?? "",
            },
        };

        setData(mapped);
    }, [cmsResponse]);

    const updateHero = (updates: Partial<BlogPageState["hero"]>) => {
        setData((prev) => ({
            ...prev,
            hero: { ...prev.hero, ...updates },
        }));
    };

    const updateSearchFilters = (updates: Partial<BlogPageState["searchFilters"]>) => {
        setData((prev) => ({
            ...prev,
            searchFilters: { ...prev.searchFilters, ...updates },
        }));
    };

    const updateNewsletter = (updates: Partial<BlogPageState["newsletter"]>) => {
        setData((prev) => ({
            ...prev,
            newsletter: { ...prev.newsletter, ...updates },
        }));
    };

    const handlePublish = () => {
        const formData = new FormData();

        // Hero section
        formData.append("hero[enabled]", String(data.hero.enabled));
        formData.append("hero[headline]", data.hero.headline?.trim() || "");
        formData.append("hero[subHeadline]", data.hero.subHeadline?.trim() || "");

        // Search filters
        formData.append("searchFilters[enabled]", String(data.searchFilters.enabled));
        (data.searchFilters.filters || []).forEach((filter, index) => {
            formData.append(`searchFilters[filters][${index}][label]`, filter.label?.trim() || "");
            formData.append(`searchFilters[filters][${index}][value]`, filter.value?.trim() || "");
        });

        // Newsletter text fields
        formData.append("newsletter[enabled]", String(data.newsletter.enabled));
        formData.append("newsletter[title]", data.newsletter.title?.trim() || "");
        formData.append("newsletter[subHeadline]", data.newsletter.subHeadline?.trim() || "");

        // Newsletter image: support existing URL or newly selected File
        const img = data.newsletter.image;
        if (img instanceof File) {
            formData.append("newsletter[imageFile]", img);
        } else if (typeof img === "string" && img.trim()) {
            formData.append("newsletter[image]", img.trim());
        }

        updateCMSBlogPage(formData);
    };

    const createTabLabel = viewMode ? "View Blog" : editingBlogId ? "Edit Blog" : "Create a Blog";

    return (
        <div>
            <PageHeader title="Blog & Articles" onPublish={handlePublish} />

            <div className="flex flex-col gap-6 max-w-[55rem] mx-auto pb-5">
                <BlogSectionTabs
                    activeTab={activeTab}
                    setActiveTab={(tab) => {
                        setActiveTab(tab);
                        if (tab === "create" && !editingBlogId) {
                            // If switching to Create tab manually, reset edit/view mode
                            setEditingBlogId(null);
                            setViewMode(false);
                        }
                        if (tab === "hero" || tab === "list") {
                            setEditingBlogId(null);
                            setViewMode(false);
                        }
                    }}
                    createTabLabel={createTabLabel}
                />
                {activeTab === "list" && (
                    <BlogList
                        onEdit={(id) => {
                            setEditingBlogId(id);
                            setViewMode(false);
                            setActiveTab("create");
                        }}
                        onView={(id) => {
                            setEditingBlogId(id);
                            setViewMode(true);
                            setActiveTab("create");
                        }}
                    />
                )}
                {activeTab === "hero" && (
                    <HeroSection
                        hero={data.hero}
                        searchFilters={data.searchFilters}
                        newsletter={data.newsletter}
                        onHeroChange={updateHero}
                        onSearchFiltersChange={updateSearchFilters}
                        onNewsletterChange={updateNewsletter}
                    />
                )}
                {activeTab === "create" && (
                    <CreateBlog
                        blogId={editingBlogId}
                        viewMode={viewMode}
                        onSuccess={() => {
                            setEditingBlogId(null);
                            setViewMode(false);
                            setActiveTab("list");
                        }}
                    />
                )}
            </div>
        </div>
    );
}

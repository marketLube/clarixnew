"use client";

import { useMemo, useState } from "react";
import { Menu, Plus, Trash2 } from "lucide-react";
import { ContentSection } from "@/src/components/ui/ContentSection";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/lib/utils";
import { FooterLink as FooterLinkType } from "../types";

interface FooterLinkProps {
    data: {
        exploreColleges: FooterLinkType[];
        courses: FooterLinkType[];
        exams: FooterLinkType[];
        admissions: FooterLinkType[];
        scholarships: FooterLinkType[];
        about: FooterLinkType[];
    };
    onChange: (category: keyof FooterLinkProps["data"], links: FooterLinkType[]) => void;
}

interface FooterCategoryProps {
    title: string;
    links: FooterLinkType[];
    columns?: number;
    onAdd: () => void;
    onUpdate: (index: number, next: FooterLinkType) => void;
    onDelete: (index: number) => void;
}

const FooterCategory = ({
    title,
    links,
    onAdd,
    onUpdate,
    onDelete,
    columns = 1,
}: FooterCategoryProps) => (
    <div className="space-y-3">
        <h3 className="text-[14px] font-medium text-[#364440]">{title}</h3>
        <div className={cn("grid gap-4", columns === 2 ? "grid-cols-2" : "grid-cols-1")}>
            {links.map((link, index) => (
                <div
                    key={`${title}-${index}`}
                    className="flex items-center gap-2 rounded-lg border border-[#DEE7E4] bg-white px-2 py-2"
                >
                    <Input
                        value={link.label}
                        onChange={(e) => onUpdate(index, { ...link, label: e.target.value })}
                        placeholder="Label"
                        className="h-[38px] flex-1 bg-[#fdfdfd] border-[#DEE7E4] focus-visible:ring-[#10B981] text-[12px]"
                    />

                    <Input
                        value={link.url}
                        onChange={(e) => onUpdate(index, { ...link, url: e.target.value })}
                        placeholder="Link (e.g. /colleges)"
                        className="h-[38px] flex-1 bg-[#fdfdfd] border-[#DEE7E4] focus-visible:ring-[#10B981] text-[12px]"
                    />

                    <button
                        type="button"
                        onClick={() => onDelete(index)}
                        className="h-[38px] w-[38px] flex items-center justify-center rounded-md border border-[#DEE7E4] bg-white hover:bg-red-50 hover:border-red-200 transition-colors"
                        aria-label="Delete"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                </div>
            ))}

            <button
                onClick={onAdd}
                className="h-[42px] border border-dashed border-[#DEE7E4] rounded-lg bg-transparent hover:bg-gray-50 flex items-center justify-center gap-1 text-[12px] text-[#364440] transition-colors"
                style={{ padding: "8px" }}
            >
                <Plus className="w-4 h-4" />
                <span>Add</span>
            </button>
        </div>
    </div>
);

export default function FooterLink({ data, onChange }: FooterLinkProps) {
    const [isEnabled, setIsEnabled] = useState(true);

    const meta = useMemo(
        () =>
            ({
                exploreColleges: { title: "Explore Colleges", columns: 1 },
                courses: { title: "Courses", columns: 1 },
                exams: { title: "Exams", columns: 1 },
                admissions: { title: "Admissions", columns: 1 },
                scholarships: { title: "Scholarships", columns: 1 },
                about: { title: "About", columns: 1 },
            }) as const,
        []
    );

    const updateLink = (category: keyof FooterLinkProps["data"], index: number, next: FooterLinkType) => {
        const current = data[category] ?? [];
        const updated = current.map((item, i) => (i === index ? next : item));
        onChange(category, updated);
    };

    const addLink = (category: keyof FooterLinkProps["data"]) => {
        const current = data[category] ?? [];
        onChange(category, [...current, { label: "", url: "/" }]);
    };

    const deleteLink = (category: keyof FooterLinkProps["data"], index: number) => {
        const current = data[category] ?? [];
        const updated = current.filter((_, i) => i !== index);
        onChange(category, updated);
    };

    return (
        <ContentSection
            id="footer-links"
            title="Footer"
            description="Main text that appears prominently in the who we are section"
            icon={<Menu className="w-4 h-4 text-[#10B981]" />}
            isEnabled={isEnabled}
            onToggle={setIsEnabled}
        >
            <div className="space-y-8">
                <FooterCategory
                    title={meta.exploreColleges.title}
                    links={data.exploreColleges}
                    columns={meta.exploreColleges.columns}
                    onAdd={() => addLink("exploreColleges")}
                    onUpdate={(index, next) => updateLink("exploreColleges", index, next)}
                    onDelete={(index) => deleteLink("exploreColleges", index)}
                />

                <FooterCategory
                    title={meta.courses.title}
                    links={data.courses}
                    columns={meta.courses.columns}
                    onAdd={() => addLink("courses")}
                    onUpdate={(index, next) => updateLink("courses", index, next)}
                    onDelete={(index) => deleteLink("courses", index)}
                />

                <FooterCategory
                    title={meta.exams.title}
                    links={data.exams}
                    columns={meta.exams.columns}
                    onAdd={() => addLink("exams")}
                    onUpdate={(index, next) => updateLink("exams", index, next)}
                    onDelete={(index) => deleteLink("exams", index)}
                />

                <FooterCategory
                    title={meta.admissions.title}
                    links={data.admissions}
                    columns={meta.admissions.columns}
                    onAdd={() => addLink("admissions")}
                    onUpdate={(index, next) => updateLink("admissions", index, next)}
                    onDelete={(index) => deleteLink("admissions", index)}
                />

                <FooterCategory
                    title={meta.scholarships.title}
                    links={data.scholarships}
                    columns={meta.scholarships.columns}
                    onAdd={() => addLink("scholarships")}
                    onUpdate={(index, next) => updateLink("scholarships", index, next)}
                    onDelete={(index) => deleteLink("scholarships", index)}
                />

                <FooterCategory
                    title={meta.about.title}
                    links={data.about}
                    columns={meta.about.columns}
                    onAdd={() => addLink("about")}
                    onUpdate={(index, next) => updateLink("about", index, next)}
                    onDelete={(index) => deleteLink("about", index)}
                />
            </div>
        </ContentSection>
    );
}

"use client";

import { Type } from "lucide-react";
import { ContentSection, CounterField } from "@/src/components/ui/ContentSection";
import { JobsInternshipsHeroSection } from "../types";

interface HeroSectionProps {
    data: JobsInternshipsHeroSection;
    onChange: (updates: Partial<JobsInternshipsHeroSection>) => void;
}

export default function HeroSection({ data, onChange }: HeroSectionProps) {
    return (
        <ContentSection
            id="jobs-internships-hero-section"
            title="Hero Section"
            description="Manage the title and description for the Jobs & Internships page."
            icon={<Type className="w-4 h-4 text-[#10B981]" />}
            isEnabled={data.enabled}
            onToggle={(enabled) => onChange({ enabled })}
        >
            <div className="space-y-6">
                <CounterField
                    label="Primary Headline"
                    value={data.primaryHeadline}
                    onChange={(value) => onChange({ primaryHeadline: value })}
                    maxLength={100}
                    placeholder="Enter the main title"
                />

                <CounterField
                    label="Sub headline"
                    value={data.subHeadline}
                    onChange={(value) => onChange({ subHeadline: value })}
                    maxLength={350}
                    placeholder="Enter the description..."
                    isTextArea
                    className="min-h-[120px]"
                />
            </div>
        </ContentSection>
    );
}

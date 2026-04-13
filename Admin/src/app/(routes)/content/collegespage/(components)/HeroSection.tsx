"use client";

import { School } from "lucide-react";
import { ContentSection, CounterField } from "@/src/components/ui/ContentSection";
import { CollegesPageHeroSection } from "../types";

interface HeroSectionProps {
    data: CollegesPageHeroSection;
    onChange: (updates: Partial<CollegesPageHeroSection>) => void;
}

export default function HeroSection({ data, onChange }: HeroSectionProps) {
    return (
        <ContentSection
            id="colleges-page-hero-section"
            title="Hero Section"
            description="Manage the title and description for the Colleges Page."
            icon={<School className="w-4 h-4 text-[#10B981]" />}
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

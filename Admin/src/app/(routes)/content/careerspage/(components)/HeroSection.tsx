"use client";

import { Type } from "lucide-react";
import { ContentSection, CounterField } from "@/src/components/ui/ContentSection";
import { CareersHeroSection } from "../types";

interface HeroSectionProps {
    data: CareersHeroSection;
    onChange: (updates: Partial<CareersHeroSection>) => void;
}

export default function HeroSection({ data, onChange }: HeroSectionProps) {
    return (
        <ContentSection
            id="careers-hero-section"
            title="Hero Sections"
            description="Main text that appears prominently in the hero section"
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
                    placeholder="Enter the headline"
                />

                <CounterField
                    label="Sub headline"
                    value={data.subHeadline}
                    onChange={(value) => onChange({ subHeadline: value })}
                    maxLength={350}
                    placeholder="Enter rich text content..."
                    isTextArea
                    className="min-h-[120px]"
                />
            </div>
        </ContentSection>
    );
}

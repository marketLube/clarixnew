"use client";

import React from "react";
import { Type } from "lucide-react";
import { ContentSection, CounterField } from "@/src/components/ui/ContentSection";
import { AboutHeroSection } from "../types";

interface HeadlineProps {
    data: AboutHeroSection;
    onChange: (updates: Partial<AboutHeroSection>) => void;
}

export default function Headline({ data, onChange }: HeadlineProps) {
    return (
        <ContentSection
            id="about-hero-headlines"
            title="Hero Sections"
            description="Main text that appears prominently in the hero section"
            icon={<Type className="w-4 h-4 text-[#10B981]" />}
            isEnabled={data.enabled}
            onToggle={(enabled) => onChange({ enabled })}
        >
            <div className="space-y-6">
                <CounterField
                    label="Primary Headline"
                    value={data.headline}
                    onChange={(value) => onChange({ headline: value })}
                    maxLength={100}
                    placeholder="Enter primary headline"
                />

                <CounterField
                    label="Sub headline"
                    value={data.subHeadline}
                    onChange={(value) => onChange({ subHeadline: value })}
                    maxLength={350}
                    placeholder="Enter sub headline"
                    isTextArea
                    className="min-h-[120px]"
                />
            </div>
        </ContentSection>
    );
}

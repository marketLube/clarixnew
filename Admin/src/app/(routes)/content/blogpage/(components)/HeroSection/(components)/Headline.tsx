"use client";

import React from "react";
import { Type } from "lucide-react";
import { ContentSection, CounterField } from "@/src/components/ui/ContentSection";
import { BlogPageHeroState } from "../../../types";

interface HeadlineProps {
    enabled?: boolean;
    primaryHeadline?: string;
    subHeadline?: string;
    onChange?: (updates: Partial<BlogPageHeroState>) => void;
    disabled?: boolean;
}

export default function Headline({
    enabled = true,
    primaryHeadline = "",
    subHeadline = "",
    onChange,
    disabled = false,
}: HeadlineProps) {
    return (
        <ContentSection
            id="blog-headlines"
            title="Headlines"
            description="Main text that appears prominently in the hero section"
            icon={<Type className="w-4 h-4 text-[#10B981]" />}
            isEnabled={enabled}
            onToggle={(value) => onChange?.({ enabled: value })}
            readOnly={disabled}
        >
            <div className="space-y-6">
                <CounterField
                    label="Primary Headline"
                    value={primaryHeadline}
                    onChange={(value) => onChange?.({ headline: value })}
                    maxLength={100}
                    placeholder="Enter primary headline"
                    disabled={disabled}
                />

                <CounterField
                    label="Sub headline"
                    value={subHeadline}
                    onChange={(value) => onChange?.({ subHeadline: value })}
                    maxLength={250}
                    placeholder="Enter sub headline"
                    isTextArea
                    disabled={disabled}
                />
            </div>
        </ContentSection>
    );
}

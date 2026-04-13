"use client";

import React from "react";
import { Type } from "lucide-react";
import { ContentSection, CounterField } from "@/src/components/ui/ContentSection";

interface HeadlinesProps {
    data: {
        isEnabled: boolean;
        primaryHeadline: string;
        subHeadline: string;
    };
    updateData: (updates: Partial<HeadlinesProps['data']>) => void;
}

export default function Headlines({ data, updateData }: HeadlinesProps) {
    return (
        <ContentSection
            id="headlines"
            title="Hero Heading & Badge"
            description="Configure the main hero heading and the verification badge pill"
            icon={<Type className="w-4 h-4 text-[#10B981]" />}
            isEnabled={data.isEnabled}
            onToggle={(enabled) => updateData({ isEnabled: enabled })}
        >
            <CounterField
                label="Hero Heading"
                value={data.primaryHeadline}
                onChange={(value) => updateData({ primaryHeadline: value })}
                maxLength={80}
                placeholder="Discover Colleges That Match Your Goals"
            />

            <CounterField
                label="Badge Text"
                value={data.subHeadline}
                onChange={(value) => updateData({ subHeadline: value })}
                maxLength={60}
                placeholder="Verified by 100K+ Students"
            />
        </ContentSection>
    );
}
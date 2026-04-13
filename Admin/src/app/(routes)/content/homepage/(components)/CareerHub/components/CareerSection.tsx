"use client";

import React from "react";
import { Type } from "lucide-react";
import { ContentSection, CounterField } from "@/src/components/ui/ContentSection";
import { HomePageState } from "../../../types";

interface CareerSectionProps {
    data: HomePageState['careerHub'];
    updateData: (updates: Partial<HomePageState['careerHub']>) => void;
}

export default function CareerSection({ data, updateData }: CareerSectionProps) {

    return (
        <ContentSection
            id="career-hub"
            title="Career Hub"
            description="Main text that appears prominently in the forth Section"
            icon={<Type className="w-4 h-4 text-[#10B981]" />}
            isEnabled={data.enabled}
            onToggle={(enabled) => updateData({ enabled })}
        >
            <CounterField
                label="Primary Headline"
                value={data.title || ""}
                onChange={(value) => updateData({ title: value })}
                maxLength={50}
                placeholder="Enter primary headline"
            />

            <CounterField
                label="Paragraph"
                value={data.paragraph || ""}
                onChange={(value) => updateData({ paragraph: value })}
                maxLength={200}
                placeholder="Enter paragraph text"
                isTextArea
            />
        </ContentSection>
    );
}
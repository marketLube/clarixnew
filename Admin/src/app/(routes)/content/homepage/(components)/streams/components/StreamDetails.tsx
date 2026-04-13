"use client";

import React from "react";
import { Type } from "lucide-react";
import { ContentSection, CounterField } from "@/src/components/ui/ContentSection";
import { HomePageState } from "../../../types";

interface StreamDetailsProps {
    data: HomePageState['streams'];
    updateData: (updates: Partial<HomePageState['streams']>) => void;
}

export default function StreamDetails({ data, updateData }: StreamDetailsProps) {

    return (
        <ContentSection
            id="streams"
            title="Streams"
            description="Main text that appears prominently in the seventh Section"
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
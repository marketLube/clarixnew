"use client";

import React from "react";
import { Type } from "lucide-react";
import { ContentSection, CounterField } from "@/src/components/ui/ContentSection";
import { HomePageState } from "../../../types";

interface ExploreCollegeProps {
    data: HomePageState['contentBlocks'];
    updateData: (updates: Partial<HomePageState['contentBlocks']>) => void;
}

export default function ExploreCollege({ data, updateData }: ExploreCollegeProps) {

    return (
        <ContentSection
            id="explore-colleges"
            title="Explore Top Colleges"
            description="Main text that appears prominently in the second Section"
            icon={<Type className="w-4 h-4 text-[#10B981]" />}
            isEnabled={data.enabled}
            onToggle={(enabled) => updateData({ enabled })}
        >
            <CounterField
                label="Primary Headline"
                value={data.blocks?.[0]?.title || ""}
                onChange={(value) => {
                    const updatedBlocks = [...(data.blocks || [])];
                    if (updatedBlocks.length === 0) {
                        updatedBlocks.push({ title: value });
                    } else {
                        updatedBlocks[0] = { ...updatedBlocks[0], title: value };
                    }
                    updateData({ blocks: updatedBlocks });
                }}
                maxLength={50}
                placeholder="Enter primary headline"
            />

            <CounterField
                label="Paragraph"
                value={data.blocks?.[0]?.description || ""}
                onChange={(value) => {
                    const updatedBlocks = [...(data.blocks || [])];
                    if (updatedBlocks.length === 0) {
                        updatedBlocks.push({ description: value });
                    } else {
                        updatedBlocks[0] = { ...updatedBlocks[0], description: value };
                    }
                    updateData({ blocks: updatedBlocks });
                }}
                maxLength={200}
                placeholder="Enter paragraph text"
                isTextArea
            />
        </ContentSection>
    );
}
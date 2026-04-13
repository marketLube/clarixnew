"use client";

import React from "react";
import { Type } from "lucide-react";
import { ContentSection, CounterField } from "@/src/components/ui/ContentSection";
import { HomePageState } from "../../../types";

interface BlogsProps {
    data: HomePageState["contentBlocks"];
    updateData: (updates: Partial<HomePageState["contentBlocks"]>) => void;
}

export default function Blogs({ data, updateData }: BlogsProps) {
    const blockIndex = 3; // fourth block in contentBlocks
    const blocks = data.blocks || [];
    const currentBlock = blocks[blockIndex] || {};

    return (
        <ContentSection
            id="blogs"
            title="Blogs"
            description="Main text that appears prominently in the sixth Section"
            icon={<Type className="w-4 h-4 text-[#10B981]" />}
            isEnabled={data.enabled}
            onToggle={(enabled) => updateData({ enabled })}
        >
            <CounterField
                label="Primary Headline"
                value={currentBlock.title || ""}
                onChange={(value) => {
                    const updatedBlocks = [...blocks];
                    while (updatedBlocks.length <= blockIndex) {
                        updatedBlocks.push({});
                    }
                    updatedBlocks[blockIndex] = {
                        ...updatedBlocks[blockIndex],
                        title: value,
                    };
                    updateData({ blocks: updatedBlocks });
                }}
                maxLength={50}
                placeholder="Enter primary headline"
            />

            <CounterField
                label="Paragraph"
                value={currentBlock.description || ""}
                onChange={(value) => {
                    const updatedBlocks = [...blocks];
                    while (updatedBlocks.length <= blockIndex) {
                        updatedBlocks.push({});
                    }
                    updatedBlocks[blockIndex] = {
                        ...updatedBlocks[blockIndex],
                        description: value,
                    };
                    updateData({ blocks: updatedBlocks });
                }}
                maxLength={200}
                placeholder="Enter paragraph text"
                isTextArea
            />
        </ContentSection>
    );
}
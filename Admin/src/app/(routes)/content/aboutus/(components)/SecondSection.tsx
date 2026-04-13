"use client";

import React from "react";
import { Type, ImageIcon } from "lucide-react";
import { ContentSection, CounterField } from "@/src/components/ui/ContentSection";
import { UploadZone } from "@/src/components/ui/FileUpload";
import { AboutSecondSection } from "../types";

interface SecondSectionProps {
    data: AboutSecondSection;
    onChange: (updates: Partial<AboutSecondSection>) => void;
}

export default function SecondSection({ data, onChange }: SecondSectionProps) {
    return (
        <ContentSection
            id="about-second-section"
            title="Second Section"
            description="Main text that appears prominently in the who we are section"
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
                    label="Paragraph"
                    value={data.paragraph}
                    onChange={(value) => onChange({ paragraph: value })}
                    maxLength={1000}
                    placeholder="Enter rich text content..."
                    isTextArea
                    className="min-h-[150px]"
                />

                <CounterField
                    label="Our Mission"
                    value={data.mission}
                    onChange={(value) => onChange({ mission: value })}
                    maxLength={500}
                    placeholder="Enter rich text content..."
                    isTextArea
                    className="min-h-[100px]"
                />

                <CounterField
                    label="Our Vision"
                    value={data.vision}
                    onChange={(value) => onChange({ vision: value })}
                    maxLength={500}
                    placeholder="Enter rich text content..."
                    isTextArea
                    className="min-h-[100px]"
                />

                <div className="space-y-4">
                    <label className="text-sm font-medium text-[#364440]">Upload Image</label>
                    <UploadZone
                        id="about-second-section-image"
                        title="Drag and drop or click to upload"
                        description="PNG up to 5MB each"
                        icon={
                            <div className="w-10 h-10 rounded-lg bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center">
                                <ImageIcon className="w-5 h-5 text-[#10B981]" />
                            </div>
                        }
                        className="py-10"
                    />
                </div>
            </div>
        </ContentSection>
    );
}

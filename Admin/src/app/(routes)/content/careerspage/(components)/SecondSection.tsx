"use client";

import { Type, ImageIcon } from "lucide-react";
import { ContentSection, CounterField } from "@/src/components/ui/ContentSection";
import { UploadZone } from "@/src/components/ui/FileUpload";
import { CareersSecondSection } from "../types";

interface SecondSectionProps {
    data: CareersSecondSection;
    onChange: (updates: Partial<CareersSecondSection>) => void;
}

export default function SecondSection({ data, onChange }: SecondSectionProps) {

    return (
        <ContentSection
            id="careers-second-section"
            title="Second Section"
            description="Main text that appears prominently in the who we are section"
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
                    label="Paragraph"
                    value={data.paragraph}
                    onChange={(value) => onChange({ paragraph: value })}
                    maxLength={1000}
                    placeholder="Enter rich text content..."
                    isTextArea
                    className="min-h-[200px]"
                />

                <div className="space-y-4">
                    <label className="text-sm font-medium text-[#364440]">Upload Image</label>
                    <div className="grid grid-cols-3 gap-4">
                        {[0, 1, 2, 3].map((index) => (
                            <UploadZone
                                key={index}
                                id={`careers-upload-${index}`}
                                file={data.images[index]?.url || null}
                                onFileSelect={(file) => {
                                    const newImages = [...(data.images || [])];
                                    while (newImages.length <= index) newImages.push({ url: "" });
                                    newImages[index] = { ...newImages[index], url: file };
                                    onChange({ images: newImages });
                                }}
                                onClear={() => {
                                    const newImages = [...(data.images || [])];
                                    if (newImages[index]) {
                                        newImages[index] = { ...newImages[index], url: "" };
                                        onChange({ images: newImages });
                                    }
                                }}
                                title={
                                    <span className="text-[11px] text-[#364440] font-normal leading-tight block px-2">
                                        Drag and drop or click to upload
                                    </span>
                                }
                                description={
                                    <span className="text-[10px] text-[#868F8B] font-normal mt-1 block">
                                        JPG, PNG up to 5MB each
                                    </span>
                                }
                                icon={
                                    <div className="w-10 h-10 rounded-lg bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center">
                                        <ImageIcon className="w-5 h-5 text-[#10B981]" />
                                    </div>
                                }
                                className="aspect-square !p-0 py-6 !bg-white border-[#DEE7E4] border-dashed rounded-[12px]"
                            />
                        ))}
                    </div>
                </div>

            </div>
        </ContentSection>
    );
}

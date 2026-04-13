"use client";

import React from "react";
import { Type, ImageIcon } from "lucide-react";
import { ContentSection, CounterField } from "@/src/components/ui/ContentSection";
import { UploadZone } from "@/src/components/ui/FileUpload";
import { BlogPageNewsletterState } from "../../../types";

interface NewsletterProps {
    enabled: boolean;
    title: string;
    subHeadline: string;
    image: BlogPageNewsletterState["image"];
    onChange: (updates: Partial<BlogPageNewsletterState>) => void;
}

export default function Newsletter({
    enabled,
    title,
    subHeadline,
    image,
    onChange,
}: NewsletterProps) {
    return (
        <ContentSection
            id="newsletter-block"
            title="Newsletter Block"
            description="Newsletter heading and optional banner image"
            icon={<Type className="w-4 h-4 text-[#10B981]" />}
            isEnabled={enabled}
            onToggle={(value) => onChange({ enabled: value })}
        >
            <div className="space-y-6">
                <CounterField
                    label="Newsletter Title"
                    value={title}
                    onChange={(value) => onChange({ title: value })}
                    maxLength={100}
                    placeholder="Enter newsletter title"
                />

                <CounterField
                    label="Sub headline"
                    value={subHeadline}
                    onChange={(value) => onChange({ subHeadline: value })}
                    maxLength={200}
                    placeholder="Enter sub headline"
                />

                <div className="space-y-4">
                    <label className="text-sm font-medium text-[#364440]">Upload Image</label>
                    <UploadZone
                        id="newsletter-image"
                        accept="image/*"
                        title="Drag and drop or click to upload"
                        description="PNG up to 5MB"
                        file={image || null}
                        onFileSelect={(file) => onChange({ image: file })}
                        onClear={() => onChange({ image: null })}
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

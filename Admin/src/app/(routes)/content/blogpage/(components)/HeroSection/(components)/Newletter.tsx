"use client";

import React, { useState } from "react";
import { Type, ImageIcon } from "lucide-react";
import { ContentSection, CounterField } from "@/src/components/ui/ContentSection";
import { UploadProgress, UploadZone } from "@/src/components/ui/FileUpload";

export default function Newsletter() {
    const [isEnabled, setIsEnabled] = useState(true);
    const [title, setTitle] = useState("Stay Ahead in Your Education Journey !");
    const [subHeadline, setSubHeadline] = useState("Subscribe to the newsletter for the latest news");

    return (
        <ContentSection
            id="newsletter-block"
            title="Newsletter Block"
            description="2 fields"
            icon={<Type className="w-4 h-4 text-[#10B981]" />}
            isEnabled={isEnabled}
            onToggle={setIsEnabled}
        >
            <div className="space-y-6">
                <CounterField
                    label="Newsletter Title"
                    value={title}
                    onChange={setTitle}
                    maxLength={100}
                    placeholder="Enter newsletter title"
                />

                <CounterField
                    label="Sub headline"
                    value={subHeadline}
                    onChange={setSubHeadline}
                    maxLength={200}
                    placeholder="Enter sub headline"
                />

                <div className="space-y-4">
                    <label className="text-sm font-medium text-[#364440]">Upload Image</label>
                    <UploadZone
                        id="newsletter-image"
                        title="Drag and drop or click to upload"
                        description="PNG up to 5MB each"
                        icon={
                            <div className="w-10 h-10 rounded-lg bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center">
                                <ImageIcon className="w-5 h-5 text-[#10B981]" />
                            </div>
                        }
                        className="py-10"
                    />

                    <UploadProgress
                        fileName="Uploading"
                        progress={48}
                        onCancel={() => { }}
                        onPause={() => { }}
                    />
                </div>
            </div>
        </ContentSection>
    );
}

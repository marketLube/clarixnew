"use client";

import React from "react";
import { ImageIcon, Layout } from "lucide-react";
import { ContentSection } from "@/src/components/ui/ContentSection";
import { UploadZone } from "@/src/components/ui/FileUpload";

interface UploadSectionProps {
    thumbnail: File | string | null;
    onThumbnailChange: (file: File | null) => void;
    disabled?: boolean;
}

export default function UploadSection({ thumbnail, onThumbnailChange, disabled = false }: UploadSectionProps) {
    return (
        <ContentSection
            id="upload-section"
            title="Upload Image"
            description="Manage and upload images for your blog"
            icon={<Layout className="w-4 h-4 text-[#10B981]" />}
            readOnly={disabled}
        >
            <div className="space-y-4">
                <UploadZone
                    id="blog-main-image"
                    accept="image/*"
                    title="Drag and drop or click to upload"
                    description="PNG or JPG up to 5MB"
                    file={thumbnail || null}
                    onFileSelect={(file) => onThumbnailChange(file)}
                    onClear={() => onThumbnailChange(null)}
                    disabled={disabled}
                    icon={
                        <div className="w-10 h-10 rounded-lg bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-[#10B981]" />
                        </div>
                    }
                    className="py-10"
                />
            </div>
        </ContentSection>
    );
}

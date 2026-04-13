"use client";

import React, { useState } from "react";
import { Image as ImageIcon, Trash2, Layout } from "lucide-react";
import { ContentSection } from "@/src/components/ui/ContentSection";
import { UploadZone } from "@/src/components/ui/FileUpload";
import { HomePageState } from "../../../types";

interface BackgroundImageSectionProps {
    data: HomePageState['careerHub'];
    updateData: (updates: Partial<HomePageState['careerHub']>) => void;
}

export default function BackgroundImageSection({ data, updateData }: BackgroundImageSectionProps) {
    return (
        <ContentSection
            id="background-images"
            title="Background Images"
            description="Manage background images for the Career Hub section"
            icon={<Layout className="w-4 h-4 text-[#10B981]" />}
            isEnabled={data.enabled}
            onToggle={(enabled) => updateData({ enabled })}
        >
            <div className="space-y-6">
                <div className="space-y-3">
                    <p className="text-sm font-semibold text-[#364440]">Upload Image</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Upload Zones bound to careerHub.images */}
                        <UploadZone
                            id="background-upload-1"
                            file={data.images?.[0] ?? null}
                            accept="image/*"
                            onFileSelect={(file) => {
                                const images = [...(data.images || [])];
                                images[0] = file;
                                updateData({ images });
                            }}
                            onClear={() => {
                                const images = [...(data.images || [])];
                                images.splice(0, 1);
                                updateData({ images });
                            }}
                            title="Drag and drop or click to upload"
                            description="JPG, PNG up to 5MB each"
                            className="h-[160px] px-4 py-8"
                        />
                        <UploadZone
                            id="background-upload-2"
                            file={data.images?.[1] ?? null}
                            accept="image/*"
                            onFileSelect={(file) => {
                                const images = [...(data.images || [])];
                                images[1] = file;
                                updateData({ images });
                            }}
                            onClear={() => {
                                const images = [...(data.images || [])];
                                images.splice(1, 1);
                                updateData({ images });
                            }}
                            title="Drag and drop or click to upload"
                            description="JPG, PNG up to 5MB each"
                            className="h-[160px] px-4 py-8"
                        />
                        <UploadZone
                            id="background-upload-3"
                            file={data.images?.[2] ?? null}
                            accept="image/*"
                            onFileSelect={(file) => {
                                const images = [...(data.images || [])];
                                images[2] = file;
                                updateData({ images });
                            }}
                            onClear={() => {
                                const images = [...(data.images || [])];
                                images.splice(2, 1);
                                updateData({ images });
                            }}
                            title="Drag and drop or click to upload"
                            description="JPG, PNG up to 5MB each"
                            className="h-[160px] px-4 py-8"
                        />
                    </div>
                </div>
            </div>
        </ContentSection>
    );
}

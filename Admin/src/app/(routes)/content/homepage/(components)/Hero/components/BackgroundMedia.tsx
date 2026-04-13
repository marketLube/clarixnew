"use client";

import React, { useEffect, useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { UploadZone, UploadProgress } from "@/src/components/ui/FileUpload";
import { ContentSection } from "@/src/components/ui/ContentSection";

interface BackgroundMediaProps {
    data: {
        isEnabled: boolean;
        backgroundImages: Array<File | string>;
    };
    updateData: (updates: Partial<BackgroundMediaProps['data']>) => void;
}

function BackgroundImagePreview({
    item,
    alt,
}: {
    item: File | string;
    alt: string;
}) {
    const [src, setSrc] = useState<string | null>(null);

    useEffect(() => {
        if (!item) {
            setSrc(null);
            return;
        }

        if (typeof item === "string") {
            setSrc(item);
            return;
        }

        const objectUrl = URL.createObjectURL(item);
        setSrc(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [item]);

    return (
        <div className="w-12 h-12 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center shrink-0">
            {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                    onError={() => setSrc(null)}
                />
            ) : (
                <ImageIcon className="w-5 h-5 text-gray-400" />
            )}
        </div>
    );
}

export default function BackgroundMedia({ data, updateData }: BackgroundMediaProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFilesChange = (files: File[]) => {
        if (!files?.length) return;

        updateData({
            backgroundImages: [...(data.backgroundImages || []), ...files],
        });

        // Simulate upload progress (you can replace this with actual upload logic)
        setIsUploading(true);
        setUploadProgress(0);
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    return (
        <ContentSection
            id="background"
            title="Background Media"
            description="Choose a background image"
            icon={<ImageIcon className="w-4 h-4 text-[#10B981]" />}
            isEnabled={data.isEnabled}
            onToggle={(enabled) => updateData({ isEnabled: enabled })}
        >
            <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">Upload Images</p>

                <UploadZone
                    id="background-upload"
                    accept="image/*"
                    multiple
                    title="Drag and drop or click to upload"
                    description="You can select multiple images. Recommended: 1920×750px, max 5MB each"
                    onFilesSelect={handleFilesChange}
                />

                {isUploading && (
                    <UploadProgress
                        progress={uploadProgress}
                        onCancel={() => {
                            setIsUploading(false);
                        }}
                    />
                )}

                {!!(data.backgroundImages?.length) && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-700">
                                Selected: <span className="font-medium">{data.backgroundImages.length}</span>
                            </p>
                            <button
                                type="button"
                                onClick={() => updateData({ backgroundImages: [] })}
                                className="text-sm text-red-600 hover:text-red-700"
                            >
                                Clear all
                            </button>
                        </div>

                        <div className="space-y-1">
                            {data.backgroundImages.map((item, idx) => {
                                const label =
                                    item instanceof File
                                        ? item.name
                                        : (item.split("/").pop() || item);

                                return (
                                    <div
                                        key={`${typeof item}-${label}-${idx}`}
                                        className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <BackgroundImagePreview item={item} alt={label} />
                                            <p className="text-sm text-gray-700 truncate">{label}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateData({
                                                    backgroundImages: data.backgroundImages.filter((_, i) => i !== idx),
                                                })
                                            }
                                            className="text-sm text-red-600 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </ContentSection>
    );
}
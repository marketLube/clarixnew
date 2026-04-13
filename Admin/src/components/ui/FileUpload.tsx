"use client";

import React, { useState, useEffect } from "react";
import { X, CirclePause, RotateCcw, UploadCloud, Image as ImageIcon, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadProgressProps {
    progress: number;
    fileName?: string;
    status?: string;
    onPause?: () => void;
    onCancel?: () => void;
    isPaused?: boolean;
}

export function UploadProgress({
    progress,
    fileName,
    status = "Uploading",
    onPause,
    onCancel,
    isPaused = false,
}: UploadProgressProps) {
    return (
        <div
            className="w-full rounded-lg border px-4 py-3 flex flex-col justify-between"
            style={{
                borderColor: "#D3EBDC",
                borderWidth: "0.5px",
                background: "linear-gradient(90deg, #D3EBDC 0%, #D7FFE9 100%)",
            }}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold text-[#065F46]">
                        {status}
                    </p>
                    <p className="text-[11px] text-[#374151] mt-0.5">
                        {progress}% · Seconds remaining {fileName && `· ${fileName}`}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        className="text-[#6B7280] hover:text-[#374151] transition-colors"
                        onClick={onPause}
                    >
                        {isPaused ? (
                            <RotateCcw className="w-4 h-4" />
                        ) : (
                            <CirclePause className="w-4 h-4" />
                        )}
                    </button>
                    <button
                        className="text-[#EF4444] hover:text-[#DC2626] transition-colors"
                        onClick={onCancel}
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="w-full h-1.5 bg-[#D1FAE5] rounded-full overflow-hidden mt-3">
                <div
                    className="h-full bg-[#10B981] rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}

interface UploadZoneProps {
    id: string;
    onFileSelect?: (file: File) => void;
    onFilesSelect?: (files: File[]) => void;
    accept?: string;
    multiple?: boolean;
    title?: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
    file?: File | string | null;
    onClear?: () => void;
    disabled?: boolean;
}

export function UploadZone({
    id,
    onFileSelect,
    onFilesSelect,
    accept,
    multiple = false,
    title = "Drag and drop or click to upload",
    description = "Recommended: 1920×750px, max 5MB",
    icon,
    className,
    file,
    onClear,
    disabled = false,
}: UploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }

        if (typeof file === "string") {
            setPreviewUrl(file);
        } else if (file instanceof File) {
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [file]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const fileList = e.dataTransfer.files;
        if (!fileList || fileList.length === 0) return;

        const files = Array.from(fileList);
        if (multiple) {
            onFilesSelect?.(files);
            if (!onFilesSelect && files[0]) onFileSelect?.(files[0]);
        } else if (files[0]) {
            onFileSelect?.(files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (!fileList || fileList.length === 0) return;

        const files = Array.from(fileList);
        if (multiple) {
            onFilesSelect?.(files);
            if (!onFilesSelect && files[0]) onFileSelect?.(files[0]);
        } else if (files[0]) {
            onFileSelect?.(files[0]);
        }
    };

    if (previewUrl) {
        return (
            <div className={cn("relative rounded-2xl overflow-hidden border border-gray-200 group h-[180px] flex items-center justify-center bg-gray-50", className)}>
                <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-contain"
                />
                <div className={cn("absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2", disabled && "hidden")}>
                    <button
                        onClick={() => !disabled && document.getElementById(id)?.click()}
                        className="bg-white text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-50"
                        disabled={disabled}
                    >
                        Change
                    </button>
                    {onClear && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onClear();
                            }}
                            className="bg-white text-red-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-50"
                        >
                            Remove
                        </button>
                    )}
                </div>
                <input
                    type="file"
                    id={id}
                    accept={accept}
                    multiple={multiple}
                    className="hidden"
                    onChange={handleChange}
                />
            </div>
        );
    }

    return (
        <div
            onDragOver={!disabled ? handleDragOver : undefined}
            onDragLeave={!disabled ? handleDragLeave : undefined}
            onDrop={!disabled ? handleDrop : undefined}
            onClick={() => !disabled && document.getElementById(id)?.click()}
            className={cn(
                "border border-dashed rounded-2xl h-[180px] flex flex-col items-center justify-center gap-3 transition-all",
                disabled ? "cursor-not-allowed opacity-60 bg-gray-50 border-gray-200" : "cursor-pointer",
                !disabled && isDragging ? "border-[#10B981] bg-[#ECFDF5]" : !disabled && "border-[#DEE7E4] bg-[#F9FAFB] hover:bg-[#F3F4F6]",
                className
            )}
        >
            <input
                type="file"
                id={id}
                accept={accept}
                multiple={multiple}
                className="hidden"
                onChange={handleChange}
                disabled={disabled}
            />
            <div className="flex items-center justify-center">
                {icon || (
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#F3F4F6] flex items-center justify-center shadow-sm">
                        <ImageIcon className="w-6 h-6 text-[#10B981]" />
                    </div>
                )}
            </div>
            <div className="text-center">
                {typeof title === 'string' ? (
                    <p className="text-sm font-semibold text-[#374151]">{title}</p>
                ) : title}
                {typeof description === 'string' ? (
                    <p className="text-[11px] text-[#6B7280] mt-1">{description}</p>
                ) : description}
            </div>
        </div>
    );
}

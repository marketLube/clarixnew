"use client";

import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { UploadZone } from "@/src/components/ui/FileUpload";
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/src/components/ui/accordion";
import { CourseState } from "./types";

interface DescriptionProps {
    data: CourseState;
    updateData: (updates: Partial<CourseState>) => void;
    readOnly?: boolean;
}

export default function Description({ data, updateData, readOnly = false }: DescriptionProps) {
    const maxLength = 1000;

    return (
        <AccordionItem
            value="basic"
            className="bg-white rounded-[12px] px-4 py-2 !border-b-0"
        >
            <AccordionTrigger className="hover:no-underline data-[state=open]:border-b rounded-none py-2 text-[15px] font-medium text-black !border-gray-200">
                Description
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2 px-1">
                <div className="flex flex-col gap-3">
                    {/* Title Field */}
                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="title"
                            className="text-[12px] font-medium text-[#364440]"
                        >
                            Title
                        </Label>
                        <Input
                            id="title"
                            placeholder="Title"
                            className="h-[38px] border-[#d3e0dc] rounded-[8px] !border-gray-400 text-[13px]"
                            value={data.descriptionTitle}
                            onChange={(e) => updateData({ descriptionTitle: e.target.value })}
                            disabled={readOnly}
                        />
                    </div>

                    {/* Description Field */}
                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="description"
                            className="text-[12px] font-medium text-[#364440]"
                        >
                            About the course
                        </Label>
                        <div className="border !border-gray-400 rounded-[8px] p-1 ">
                            <Textarea
                                id="description"
                                placeholder="Write a description about the course..."
                                className="bg-transparent border-none text-[13px]"
                                value={data.description}
                                onChange={(e) => updateData({ description: e.target.value })}
                                maxLength={maxLength}
                                disabled={readOnly}
                            />
                            <div className="text-right px-2 pb-1 text-[12px] text-[#364440]">
                                {data.description.length}/{maxLength}
                            </div>
                        </div>
                    </div>

                    {/* Image Upload Field */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-[12px] font-medium text-[#364440]">
                            Description Image
                        </Label>
                        <UploadZone
                            id="description-image-upload"
                            onFileSelect={(file) => !readOnly && updateData({ descriptionImage: file })}
                            file={data.descriptionImage}
                            onClear={() => !readOnly && updateData({ descriptionImage: null })}
                            title="Upload Description Image"
                            description="Recommended: 800x400px, max 2MB"
                            className="bg-white border-dashed !border-gray-400"
                        />
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}

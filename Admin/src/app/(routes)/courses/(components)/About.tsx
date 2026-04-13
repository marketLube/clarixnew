"use client";

import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/src/components/ui/accordion";
import { CourseState, Reason } from "./types";

interface AboutProps {
    data: CourseState;
    updateData: (updates: Partial<CourseState>) => void;
    readOnly?: boolean;
}

export default function About({ data, updateData, readOnly = false }: AboutProps) {
    const maxLength = 1000;

    const handlePointChange = (
        index: number,
        field: keyof Reason,
        value: string
    ) => {
        const newPoints = [...data.aboutPoints];
        newPoints[index] = { ...newPoints[index], [field]: value };
        updateData({ aboutPoints: newPoints });
    };

    const addPoint = () => {
        updateData({ aboutPoints: [...data.aboutPoints, { title: "", description: "" }] });
    };

    const removePoint = (index: number) => {
        if (data.aboutPoints.length > 1) {
            const newPoints = data.aboutPoints.filter((_, i) => i !== index);
            updateData({ aboutPoints: newPoints });
        }
    };

    return (
        <AccordionItem
            value="about"
            className="bg-white rounded-[12px] px-4 py-2 !border-b-0"
        >
            <AccordionTrigger className="hover:no-underline data-[state=open]:border-b rounded-none py-2 text-[15px] font-medium text-black !border-gray-200">
                About
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2 px-1">
                <div className="flex flex-col gap-3">
                    {/* Title Field */}
                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="about-title"
                            className="text-[12px] font-medium text-[#364440]"
                        >
                            Title
                        </Label>
                        <Input
                            id="about-title"
                            placeholder="Title"
                            className="h-[38px] border-[#d3e0dc] rounded-[8px] !border-gray-400 text-[13px]"
                            value={data.aboutTitle}
                            onChange={(e) => updateData({ aboutTitle: e.target.value })}
                            disabled={readOnly}
                        />
                    </div>

                    {/* Description Field */}
                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="about-description"
                            className="text-[12px] font-medium text-[#364440]"
                        >
                            Description
                        </Label>
                        <div className="border !border-gray-400 rounded-[8px] p-1">
                            <Textarea
                                id="about-description"
                                placeholder="Write a description..."
                                className="bg-transparent border-none focus-visible:ring-0 text-[13px] text-[#364440] placeholder:text-[#868f8b] shadow-none min-h-[80px] resize-none"
                                value={data.aboutDescription}
                                onChange={(e) => updateData({ aboutDescription: e.target.value })}
                                maxLength={maxLength}
                                disabled={readOnly}
                            />
                            <div className="text-right px-2 pb-1 text-[12px] text-[#364440]">
                                {data.aboutDescription.length}/{maxLength}
                            </div>
                        </div>
                    </div>

                    {/* Content List */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-[12px] font-medium text-[#364440]">
                            Content
                        </Label>
                        <div className="flex flex-col gap-4">
                            {data.aboutPoints.map((point, index) => ( 
                                <div
                                    key={index}
                                    className="flex flex-col gap-3 p-4 border !border-gray-400 rounded-[8px] relative"
                                >
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-[12px] font-medium text-[#364440]">
                                            Heading
                                        </Label>
                                        <Input
                                            value={point.title}
                                            onChange={(e) =>
                                                handlePointChange(index, "title", e.target.value)
                                            }
                                            placeholder="Heading"
                                            className="h-[38px] border-[#d3e0dc] rounded-[8px] !border-gray-400 text-[13px]"
                                            disabled={readOnly}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-[12px] font-medium text-[#364440]">
                                            Description
                                        </Label>
                                        <Textarea
                                            value={point.description}
                                            onChange={(e) =>
                                                handlePointChange(index, "description", e.target.value)
                                            }
                                            placeholder="Description"
                                            className="min-h-[80px] border-[#d3e0dc] rounded-[8px] !border-gray-400 resize-none text-[13px]"
                                            disabled={readOnly}
                                        />
                                    </div>
                                    {!readOnly && data.aboutPoints.length > 1 && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removePoint(index)}
                                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 h-8 w-8"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Add Content Button */}
                        {!readOnly && (
                            <div className="mt-1">
                                <Button
                                    variant="outline"
                                    onClick={addPoint}
                                    className="w-full flex items-center justify-center gap-2 text-[#0dba85] border-dashed border-[#0dba85]/30 hover:bg-[#0dba85]/5 hover:text-[#0dba85] text-[13px]"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add content
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}
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

interface WhyProps {
    data: CourseState;
    updateData: (updates: Partial<CourseState>) => void;
    readOnly?: boolean;
}

export default function Why({ data, updateData, readOnly = false }: WhyProps) {
    const maxLength = 1000;

    const handleReasonChange = (
        index: number,
        field: keyof Reason,
        value: string
    ) => {
        const newReasons = [...data.whyReasons];
        newReasons[index] = { ...newReasons[index], [field]: value };
        updateData({ whyReasons: newReasons });
    };

    const addReason = () => {
        updateData({ whyReasons: [...data.whyReasons, { title: "", description: "" }] });
    };

    const removeReason = (index: number) => {
        if (data.whyReasons.length > 1) {
            const newReasons = data.whyReasons.filter((_, i) => i !== index);
            updateData({ whyReasons: newReasons });
        }
    };

    return (
        <AccordionItem
            value="why"
            className="bg-white rounded-[12px] px-4 py-2 !border-b-0"
        >
            <AccordionTrigger className="hover:no-underline data-[state=open]:border-b rounded-none py-2 text-[15px] font-medium text-black !border-gray-200">
                Why
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2 px-1">
                <div className="flex flex-col gap-3">
                    {/* Title Field */}
                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="why-title"
                            className="text-[12px] font-medium text-[#364440]"
                        >
                            Title
                        </Label>
                        <Input
                            id="why-title"
                            placeholder="Title"
                            className="h-[38px] border-[#d3e0dc] rounded-[8px] !border-gray-400 text-[13px]"
                            value={data.whyTitle}
                            onChange={(e) => updateData({ whyTitle: e.target.value })}
                        />
                    </div>

                    {/* Description Field */}
                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="why-description"
                            className="text-[12px] font-medium text-[#364440]"
                        >
                            Description
                        </Label>
                        <div className="border !border-gray-400 rounded-[8px] p-1">
                            <Textarea
                                id="why-description"
                                placeholder="Write a short description..."
                                className="bg-transparent border-none focus-visible:ring-0 text-[13px] text-[#364440] placeholder:text-[#868f8b] shadow-none min-h-[80px] resize-none"
                                value={data.whyDescription}
                                onChange={(e) => updateData({ whyDescription: e.target.value })}
                                maxLength={maxLength}
                            />
                            <div className="text-right px-2 pb-1 text-[12px] text-[#364440]">
                                {data.whyDescription.length}/{maxLength}
                            </div>
                        </div>
                    </div>

                    {/* Reasons List */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-[12px] font-medium text-[#364440]">
                            Why Choose This Course?
                        </Label>
                        <div className="flex flex-col gap-4">
                            {data.whyReasons.map((reason, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-3 p-4 border !border-gray-400 rounded-[8px] relative"
                                >
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-[12px] font-medium text-[#364440]">
                                            Heading
                                        </Label>
                                        <Input
                                            value={reason.title}
                                            onChange={(e) =>
                                                handleReasonChange(index, "title", e.target.value)
                                            }
                                            placeholder="Heading"
                                            className="h-[38px] border-[#d3e0dc] rounded-[8px] !border-gray-400 text-[13px]"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-[12px] font-medium text-[#364440]">
                                            Description
                                        </Label>
                                        <Textarea
                                            value={reason.description}
                                            onChange={(e) =>
                                                handleReasonChange(index, "description", e.target.value)
                                            }
                                            placeholder="Description"
                                            className="min-h-[80px] border-[#d3e0dc] rounded-[8px] !border-gray-400 resize-none text-[13px]"
                                        />
                                    </div>
                                    {data.whyReasons.length > 1 && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeReason(index)}
                                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 h-8 w-8"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Add Reason Button */}
                        <div className="mt-1">
                            <Button
                                variant="outline"
                                onClick={addReason}
                                className="w-full"
                            >
                                <Plus className="w-4 h-4" />
                                Add reason
                            </Button>
                        </div>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}

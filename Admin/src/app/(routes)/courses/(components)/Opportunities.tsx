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
import { CourseState, Opportunity } from "./types";

interface OpportunitiesProps {
    data: CourseState;
    updateData: (updates: Partial<CourseState>) => void;
    readOnly?: boolean;
}

export default function Opportunities({ data, updateData, readOnly = false }: OpportunitiesProps) {

    const handleOpportunityChange = (
        index: number,
        field: keyof Opportunity,
        value: string
    ) => {
        const newOpportunities = [...data.opportunitiesItems];
        newOpportunities[index] = { ...newOpportunities[index], [field]: value };
        updateData({ opportunitiesItems: newOpportunities });
    };

    const addOpportunity = () => {
        updateData({ opportunitiesItems: [...data.opportunitiesItems, { title: "", description: "" }] });
    };

    const removeOpportunity = (index: number) => {
        if (data.opportunitiesItems.length > 1) {
            const newOpportunities = data.opportunitiesItems.filter((_, i) => i !== index);
            updateData({ opportunitiesItems: newOpportunities });
        }
    };

    return (
        <AccordionItem
            value="opportunities"
            className="bg-white rounded-[12px] px-4 py-2 !border-b-0"
        >
            <AccordionTrigger className="hover:no-underline data-[state=open]:border-b rounded-none py-2 text-[15px] font-medium text-black !border-gray-200">
                Opportunity
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2 px-1">
                <div className="flex flex-col gap-3">
                    {/* Global Title Field */}
                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="opportunity-title"
                            className="text-[12px] font-medium text-[#364440]"
                        >
                            Title
                        </Label>
                        <Input
                            id="opportunity-title"
                            placeholder="Title"
                            className="h-[38px] border-[#d3e0dc] rounded-[8px] !border-gray-400 text-[13px]"
                            value={data.opportunitiesTitle}
                            onChange={(e) => updateData({ opportunitiesTitle: e.target.value })}
                        />
                    </div>

                    {/* Opportunities List */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-[12px] font-medium text-[#364440]">
                            Opportunities
                        </Label>
                        <div className="flex flex-col gap-4">
                            {data.opportunitiesItems.map((opportunity, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-3 p-4 border !border-gray-400 rounded-[8px] relative"
                                >
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-[12px] font-medium text-[#364440]">
                                            Heading
                                        </Label>
                                        <Input
                                            value={opportunity.title}
                                            onChange={(e) =>
                                                handleOpportunityChange(index, "title", e.target.value)
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
                                            value={opportunity.description}
                                            onChange={(e) =>
                                                handleOpportunityChange(
                                                    index,
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Description"
                                            className="min-h-[80px] border-[#d3e0dc] rounded-[8px] !border-gray-400 resize-none text-[13px]"
                                        />
                                    </div>
                                    {data.opportunitiesItems.length > 1 && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeOpportunity(index)}
                                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 h-8 w-8"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Add Opportunity Button */}
                        <div className="mt-1">
                            <Button
                                variant="outline"
                                onClick={addOpportunity}
                                className="w-full flex items-center justify-center gap-2 text-[#0dba85] border-dashed border-[#0dba85]/30 hover:bg-[#0dba85]/5 hover:text-[#0dba85] text-[13px]"
                            >
                                <Plus className="w-4 h-4" />
                                Add opportunity
                            </Button>
                        </div>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}

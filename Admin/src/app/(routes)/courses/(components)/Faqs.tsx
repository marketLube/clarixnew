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
import { CourseState, FAQ } from "./types";

interface FaqsProps {
    data: CourseState;
    updateData: (updates: Partial<CourseState>) => void;
    readOnly?: boolean;
}

export default function Faqs({ data, updateData, readOnly = false }: FaqsProps) {
    const handleFaqChange = (
        index: number,
        field: keyof FAQ,
        value: string
    ) => {
        const newFaqs = [...data.faqItems];
        newFaqs[index] = { ...newFaqs[index], [field]: value };
        updateData({ faqItems: newFaqs });
    };

    const addFaq = () => {
        updateData({ faqItems: [...data.faqItems, { question: "", answer: "" }] });
    };

    const removeFaq = (index: number) => {
        if (data.faqItems.length > 1) {
            const newFaqs = data.faqItems.filter((_, i) => i !== index);
            updateData({ faqItems: newFaqs });
        }
    };

    return (
        <AccordionItem
            value="faqs"
            className="bg-white rounded-[12px] px-4 py-2 !border-b-0"
        >
            <AccordionTrigger className="hover:no-underline data-[state=open]:border-b rounded-none py-2 text-[15px] font-medium text-black !border-gray-200">
                Frequently Asked Questions
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2 px-1">
                <div className="flex flex-col gap-3">
                    {/* Title Field */}
                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="faq-title"
                            className="text-[12px] font-medium text-[#364440]"
                        >
                            Title
                        </Label>
                        <Input
                            id="faq-title"
                            placeholder="e.g. Frequently Asked Questions"
                            className="h-[38px] border-[#d3e0dc] rounded-[8px] !border-gray-400 text-[13px]"
                            value={data.faqTitle}
                            onChange={(e) => updateData({ faqTitle: e.target.value })}
                            disabled={readOnly}
                        />
                    </div>

                    {/* Description Field */}
                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="faq-description"
                            className="text-[12px] font-medium text-[#364440]"
                        >
                            Description
                        </Label>
                        <Textarea
                            id="faq-description"
                            placeholder="Write a short description..."
                            className="min-h-[80px] border-[#d3e0dc] rounded-[8px] !border-gray-400 resize-none text-[13px]"
                            value={data.faqDescription}
                            onChange={(e) => updateData({ faqDescription: e.target.value })}
                            disabled={readOnly}
                        />
                    </div>

                    {/* FAQ Items */}
                    <div className="flex flex-col gap-2 mt-2">
                        <Label className="text-[12px] font-medium text-[#364440]">
                            QA Items
                        </Label>
                        <div className="flex flex-col gap-4">
                            {data.faqItems.map((faq, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-3 p-4 border !border-gray-400 rounded-[8px] relative"
                                >
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-[12px] font-medium text-[#364440]">
                                            Question
                                        </Label>
                                        <Input
                                            value={faq.question}
                                            onChange={(e) =>
                                                handleFaqChange(index, "question", e.target.value)
                                            }
                                            placeholder="Question"
                                            className="h-[38px] border-[#d3e0dc] rounded-[8px] !border-gray-400 text-[13px]"
                                            disabled={readOnly}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-[12px] font-medium text-[#364440]">
                                            Answer
                                        </Label>
                                        <Textarea
                                            value={faq.answer}
                                            onChange={(e) =>
                                                handleFaqChange(index, "answer", e.target.value)
                                            }
                                            placeholder="Answer"
                                            className="min-h-[80px] border-[#d3e0dc] rounded-[8px] !border-gray-400 resize-none text-[13px]"
                                            disabled={readOnly}
                                        />
                                    </div>
                                    {!readOnly && data.faqItems.length > 1 && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeFaq(index)}
                                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 h-8 w-8"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Add FAQ Button */}
                        {!readOnly && (
                            <div className="mt-1">
                                <Button
                                    variant="outline"
                                    onClick={addFaq}
                                    className="w-full flex items-center justify-center gap-2 text-[#0dba85] border-dashed border-[#0dba85]/30 hover:bg-[#0dba85]/5 hover:text-[#0dba85] text-[13px]"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add QA Item
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}

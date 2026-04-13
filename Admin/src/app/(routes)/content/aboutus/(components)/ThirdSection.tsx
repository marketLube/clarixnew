"use client";

import React from "react";
import { Type, Plus, Trash2 } from "lucide-react";
import { ContentSection, CounterField } from "@/src/components/ui/ContentSection";
import { cn } from "@/lib/utils";
import { AboutCardItem, AboutThirdSection } from "../types";

interface ThirdSectionProps {
    data: AboutThirdSection;
    onChange: (updates: Partial<AboutThirdSection>) => void;
}

export default function ThirdSection({ data, onChange }: ThirdSectionProps) {
    const addCard = () => {
        const nextCards: AboutCardItem[] = [
            ...data.cards,
            { title: "", description: "" },
        ];
        onChange({ cards: nextCards });
    };

    const updateCard = (index: number, field: keyof AboutCardItem, value: string) => {
        const nextCards = data.cards.map((card, i) =>
            i === index ? { ...card, [field]: value } : card
        );
        onChange({ cards: nextCards });
    };

    const deleteCard = (index: number) => {
        const nextCards = data.cards.filter((_, i) => i !== index);
        onChange({ cards: nextCards });
    };

    return (
        <ContentSection
            id="about-third-section"
            title="Third Section"
            description="Main text that appears prominently in the who we are section"
            icon={<Type className="w-4 h-4 text-[#10B981]" />}
            isEnabled={data.enabled}
            onToggle={(enabled) => onChange({ enabled })}
        >
            <div className="space-y-6">
                <CounterField
                    label="Primary Headline"
                    value={data.headline}
                    onChange={(value) => onChange({ headline: value })}
                    maxLength={100}
                    placeholder="Enter primary headline"
                />

                <CounterField
                    label="Paragraph"
                    value={data.paragraph}
                    onChange={(value) => onChange({ paragraph: value })}
                    maxLength={1000}
                    placeholder="Enter rich text content..."
                    isTextArea
                    className="min-h-[150px]"
                />

                <div className="grid grid-cols-2 gap-4">
                    {data.cards.map((card, index) => (
                        <div key={index} className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-[#364440]">
                                    Card {index + 1}
                                </label>
                                <button
                                    type="button"
                                    onClick={() => deleteCard(index)}
                                    className="inline-flex items-center justify-center rounded-full p-1.5 text-[#B91C1C] hover:bg-red-50 transition-colors"
                                    aria-label={`Delete card ${index + 1}`}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="bg-[#fdfdfd] border border-[#DEE7E4] rounded-[12px] p-4 space-y-3">
                                <input
                                    type="text"
                                    value={card.title}
                                    onChange={(e) => updateCard(index, "title", e.target.value)}
                                    placeholder="Enter title"
                                    className="w-full bg-transparent text-sm font-semibold text-[#364440] placeholder:text-[#868F8B] outline-none"
                                />
                                <textarea
                                    value={card.description}
                                    onChange={(e) => updateCard(index, "description", e.target.value)}
                                    placeholder="Enter a specification (press Enter for next point)"
                                    className="w-full bg-transparent text-xs text-[#868F8B] placeholder:text-[#868F8B] outline-none resize-none h-16"
                                />
                                <button className="w-[120px] py-1.5 border border-dashed border-[#A6C3B9] rounded-[8px] flex items-center justify-center gap-1.5 text-[11px] text-[#364440] hover:bg-gray-50 transition-colors">
                                    <Plus className="w-3.5 h-3.5" />
                                    Add Icon
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-1/2">
                    <button
                        onClick={addCard}
                        className="w-full py-2.5 border border-dashed border-[#A6C3B9] rounded-[10px] flex items-center justify-center gap-2 text-sm text-[#364440] hover:bg-gray-50 transition-colors mt-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Card
                    </button>
                </div>

                <div className="flex justify-end pt-2">
                    <span className="text-[11px] text-[#868F8B]">08/10 characters</span>
                </div>
            </div>
        </ContentSection>
    );
}

"use client";

import { Type, X, Plus } from "lucide-react";
import { ContentSection, CounterField } from "@/src/components/ui/ContentSection";

import { CareersThirdSection } from "../types";

interface ThirdSectionProps {
    data: CareersThirdSection;
    onChange: (updates: Partial<CareersThirdSection>) => void;
}

export default function ThirdSection({ data, onChange }: ThirdSectionProps) {
    const handleAddCategory = () => {
        onChange({ jobCategories: [...(data.jobCategories || []), ""] });
    };

    const handleRemoveCategory = (index: number) => {
        const newCategories = [...(data.jobCategories || [])];
        newCategories.splice(index, 1);
        onChange({ jobCategories: newCategories });
    };

    const handleUpdateCategory = (index: number, value: string) => {
        const newCategories = [...(data.jobCategories || [])];
        newCategories[index] = value;
        onChange({ jobCategories: newCategories });
    };

    return (
        <ContentSection
            id="careers-third-section"
            title="Join Our Team Section"
            description="Heading and description for the careers listings section"
            icon={<Type className="w-4 h-4 text-[#10B981]" />}
            isEnabled={data.enabled}
            onToggle={(enabled) => onChange({ enabled })}
        >
            <div className="space-y-6">
                <CounterField
                    label="Primary Headline"
                    value={data.primaryHeadline}
                    onChange={(value) => onChange({ primaryHeadline: value })}
                    maxLength={100}
                    placeholder="e.g. Join Our Team"
                />

                <CounterField
                    label="Sub headline"
                    value={data.subHeadline}
                    onChange={(value) => onChange({ subHeadline: value })}
                    maxLength={500}
                    placeholder="Enter description..."
                    isTextArea
                    className="min-h-[120px]"
                />

                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Job Titles</label>
                    <div className="flex flex-wrap gap-2">
                        {(data.jobCategories || []).map((cat, index) => (
                            <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full group">
                                <input
                                    type="text"
                                    value={cat}
                                    onChange={(e) => handleUpdateCategory(index, e.target.value)}
                                    className="bg-transparent text-sm focus:outline-none w-24"
                                    placeholder="Title..."
                                />
                                <button
                                    onClick={() => handleRemoveCategory(index)}
                                    className="text-gray-400 hover:text-red-500"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={handleAddCategory}
                            className="flex items-center gap-1 text-sm text-[#10B981] hover:underline"
                        >
                            <Plus className="w-4 h-4" /> Add Title
                        </button>
                    </div>
                </div>
            </div>
        </ContentSection>
    );
}

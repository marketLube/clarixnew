"use client";

import { Type, Link2 } from "lucide-react";
import { ContentSection, CounterField } from "@/src/components/ui/ContentSection";
import { Input } from "@/src/components/ui/input";
import { NewsletterSection } from "../types";

interface NewLetterProps {
    data: NewsletterSection;
    onChange: (updates: Partial<NewsletterSection>) => void;
}

export default function NewLetter({ data, onChange }: NewLetterProps) {

    return (
        <ContentSection
            id="newsletter-content"
            title="News Letter"
            description="Main text that appears prominently in the who we are section"
            icon={<Type className="w-4 h-4 text-[#10B981]" />}
            isEnabled={data.enabled}
            onToggle={(enabled) => onChange({ enabled })}
        >
            <div className="space-y-6">
                <CounterField
                    label="Primary Headline"
                    value={data.primaryHeadline || ""}
                    onChange={(value) => onChange({ primaryHeadline: value })}
                    maxLength={100}
                    placeholder="Enter the headline"
                />

                <CounterField
                    label="Sub headline"
                    value={data.subHeadline || ""}
                    onChange={(value) => onChange({ subHeadline: value })}
                    maxLength={350}
                    placeholder="Enter rich text content..."
                    isTextArea
                    className="min-h-[120px]"
                />

                <div className="pt-4 border-t border-[#DEE7E4]">
                    <div className="flex items-center gap-2 mb-1">
                        <Link2 className="w-5 h-5 text-[#10B981]" />
                        <h3 className="text-[16px] font-semibold text-[#364440]">Call-to-Action Buttons</h3>
                    </div>
                    <p className="text-[14px] text-[#868F8B] mb-6">Configure buttons that drive user actions</p>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-[#364440]">Primary Button</label>
                            <Input
                                placeholder="Button text"
                                value={data.primaryButtonText || ""}
                                onChange={(e) => onChange({ primaryButtonText: e.target.value })}
                                className="h-[48px] bg-[#fdfdfd] border-[#DEE7E4] focus-visible:ring-[#10B981]"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-[#364440]">Primary Button Link</label>
                            <Input
                                placeholder="Link (e.g. /colleges)"
                                value={data.primaryButtonLink || ""}
                                onChange={(e) => onChange({ primaryButtonLink: e.target.value })}
                                className="h-[48px] bg-[#fdfdfd] border-[#DEE7E4] focus-visible:ring-[#10B981]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ContentSection>
    );
}

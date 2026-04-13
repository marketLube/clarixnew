"use client";

import { MessageSquareText } from "lucide-react";
import { ContentSection, CounterField } from "@/src/components/ui/ContentSection";
import { HomePageState } from "../../../types";

interface FaqSectionProps {
    data: HomePageState['faq'];
    updateData: (updates: Partial<HomePageState['faq']>) => void;
}

export default function FaqSection({ data, updateData }: FaqSectionProps) {

    return (
        <ContentSection
            id="faq-section"
            title="FAQs"
            description="Main text that appears prominently in the seventh Section"
            icon={<MessageSquareText className="w-4 h-4 text-[#10B981]" />}
            isEnabled={data.enabled}
            onToggle={(enabled) => updateData({ enabled })}
        >
            <CounterField
                label="Primary Headline"
                value={data.title || ""}
                onChange={(value) => updateData({ title: value })}
                maxLength={40}
                placeholder="Enter primary headline"
            />

            <CounterField
                label="Paragraph"
                value={data.paragraph || ""}
                onChange={(value) => updateData({ paragraph: value })}
                maxLength={200}
                placeholder="Enter paragraph text"
                isTextArea
            />
        </ContentSection>
    );
}

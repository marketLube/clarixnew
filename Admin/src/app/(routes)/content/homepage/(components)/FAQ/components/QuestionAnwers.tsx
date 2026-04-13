"use client";

import React, { useEffect, useMemo, useState } from "react";
import { HelpCircle } from "lucide-react";
import { ContentSection, CounterField } from "@/src/components/ui/ContentSection";
import { HomePageState } from "../../../types";

type LocalFaq = {
    id: number;
    isEnabled: boolean;
    question: string;
    answer: string;
};

interface QuestionAnwersProps {
    items: HomePageState["faq"]["items"];
    updateItems: (items: HomePageState["faq"]["items"]) => void;
}

const DEFAULT_LOCAL: LocalFaq[] = [
    {
        id: 1,
        isEnabled: true,
        question: "How can I apply for admission to this college?",
        answer:
            "The B.Tech program is 4 years long, divided into 8 semesters.The B.Tech program is 4 years long, divided into 8 semesters.The B.Tech program is 4 years long, divided into 8 semesters.",
    },
];

export default function QuestionAnwers({ items, updateItems }: QuestionAnwersProps) {
    const initialFromParent = useMemo<LocalFaq[]>(() => {
        if (items && items.length > 0) {
            return items.map((it, idx) => ({
                id: idx + 1,
                isEnabled: true,
                question: it.question || "",
                answer: it.answer || "",
            }));
        }
        return DEFAULT_LOCAL;
    }, [items]);

    const [faqs, setFaqs] = useState<LocalFaq[]>(initialFromParent);

    // If parent loads items or the number of FAQs changes (e.g. when clicking "Add"),
    // sync once. Avoid running on every keystroke to keep typing smooth.
    useEffect(() => {
        setFaqs(initialFromParent);
        // Ensure parent has items so they get sent even if user doesn't touch fields
        const enabledItems = initialFromParent
            .filter((f) => f.isEnabled)
            .map((f) => ({ question: f.question, answer: f.answer }));
        updateItems(enabledItems);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items?.length]);

    const updateFaq = (id: number, field: string, value: any) => {
        const next = faqs.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq));
        setFaqs(next);

        // Persist to parent in backend-compatible shape
        const enabledItems = next
            .filter((f) => f.isEnabled)
            .map((f) => ({ question: f.question, answer: f.answer }));
        updateItems(enabledItems);
    };

    return (
        <div className="space-y-6">
            {faqs.map((faq, index) => (
                <ContentSection
                    key={faq.id}
                    id={`faq-${faq.id}`}
                    title={`Faq ${index + 1}`}
                    description="Frequently Asked Questions"
                    icon={<HelpCircle className="w-4 h-4 text-[#10B981]" />}
                    isEnabled={faq.isEnabled}
                    onToggle={(enabled) => updateFaq(faq.id, "isEnabled", enabled)}
                >
                    <div className="space-y-6">
                        <CounterField
                            label="Question"
                            value={faq.question}
                            onChange={(val) => updateFaq(faq.id, "question", val)}
                            maxLength={100}
                            placeholder="Enter the question"
                        />

                        <CounterField
                            label="Answer"
                            value={faq.answer}
                            onChange={(val) => updateFaq(faq.id, "answer", val)}
                            maxLength={300}
                            placeholder="Enter the answer"
                            isTextArea
                        />
                    </div>
                </ContentSection>
            ))}
        </div>
    );
}

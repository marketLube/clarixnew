"use client";

import React from "react";
import { Plus } from "lucide-react";
import FaqSection from "./components/FaqSection";
import QuestionAnwers from "./components/QuestionAnwers";
import { HomePageState } from "../../types";

interface FAQProps {
    data: HomePageState;
    updateFaqData: (updates: Partial<HomePageState['faq']>) => void;
}

export default function FAQ({ data, updateFaqData }: FAQProps) {
    const handleAddFaq = () => {
        const currentItems = data.faq.items || [];
        const newItems = [...currentItems, { question: "", answer: "" }];
        updateFaqData({ ...data.faq, items: newItems });
    };

    return (
        <div className="flex flex-col gap-6">
            <FaqSection
                data={data.faq}
                updateData={(updates) => updateFaqData({ ...data.faq, ...updates })}
            />
            <QuestionAnwers
                items={data.faq.items}
                updateItems={(items) => updateFaqData({ ...data.faq, items })}
            />

            <button
                type="button"
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#C7E6D5] bg-[#F4FBF7] py-3 text-sm font-medium text-[#6B7280] hover:bg-[#E9F5EE] transition-colors"
                onClick={handleAddFaq}
            >
                <Plus className="w-4 h-4" />
                <span>Add</span>
            </button>
        </div>
    );
}

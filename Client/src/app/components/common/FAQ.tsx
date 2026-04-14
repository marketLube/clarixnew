"use client";

import { useState } from "react";
import FAQCard from "@/components/common/Cards/FAQcard";
import SectionHeading from "@/components/common/Section/SectionHeading";
import SectionDescription from "@/components/common/Section/SectionDescription";
import { faqsDummyData } from "@/app/utilities/DummyData";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import { useCmsHomepage } from "@/hooks/cms/useCmsHomepage";
import Loader from "@/components/common/Loader";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  questions?: FAQItem[];
  variant?: "default" | "accordion";
};

export default function FAQ({
  questions = faqsDummyData,
  variant = "default",
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { faq, isLoading } = useCmsHomepage();

  const title = faq?.title ?? "";
  const description = faq?.paragraph ?? "";

  // Prefer questions from CMS FAQ section when available
  const cmsQuestions: FAQItem[] =
    (faq?.items ?? []).map((item) => ({
      question: item.question ?? "",
      answer: item.answer ?? "",
    })) ?? [];

  const effectiveQuestions = cmsQuestions.length > 0 ? cmsQuestions : questions;

  const toggleIndex = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  // Accordion variant - single column layout
  if (variant === "accordion") {
    return (
      <section className="w-full">
        <div className="flex flex-col gap-6">
          {/* Heading & description */}
          <div className="space-y-4">
            <SectionHeading title={title} />
            <SectionDescription className="max-w-full">
              {description}
            </SectionDescription>
          </div>

          {/* FAQ list */}
          <div className="space-y-3">
            {isLoading ? (
              <Loader containerClassName="py-10" />
            ) : (
              effectiveQuestions?.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <FAQCard
                    key={item.question}
                    item={item}
                    isOpen={isOpen}
                    onToggle={() => toggleIndex(index)}
                  />
                );
              })
            )}
          </div>
        </div>
      </section>
    );
  }

  // Default variant - two column layout
  return (
    <section className="w-full py-4 md:py-12 px-4 md:px-0">
      <ContentWrapper className="grid grid-cols-1 gap-4 md:gap-10 md:grid-cols-[minmax(0,420px)_minmax(0,1fr)] items-start !px-0">
        {/* Left column – heading & description */}
        <div className="space-y-2 md:space-y-4">
          <SectionHeading title={title} />
          <SectionDescription className="max-w-[426px]">
            {description}
          </SectionDescription>
        </div>

        {/* Right column – FAQ list */}
        <div className="space-y-2 md:space-y-3">
          {isLoading ? (
            <Loader containerClassName="py-10" />
          ) : (
            effectiveQuestions?.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <FAQCard
                  key={item.question}
                  item={item}
                  isOpen={isOpen}
                  onToggle={() => toggleIndex(index)}
                />
              );
            })
          )}
        </div>
      </ContentWrapper>
    </section>
  );
}

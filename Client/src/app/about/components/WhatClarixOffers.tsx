"use client";

import React, { useMemo } from "react";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import { useCmsAboutPage } from "@/hooks/cms/useCmsAboutpage";
import {
  Search,
  LineChart,
  MessageSquareText,
  Calendar,
  Briefcase,
  Sparkles,
} from "lucide-react";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function WhatClarixOffers() {
  const { thirdSection } = useCmsAboutPage();

  const features: Feature[] = useMemo(() => {
    const cards = thirdSection?.cards ?? [];

    const iconMap: Record<string, React.ReactNode> = {
      search: <Search size={32} strokeWidth={1.5} color="#513392" />,
      compare: <LineChart size={32} strokeWidth={1.5} color="#513392" />,
      reviews: <MessageSquareText size={32} strokeWidth={1.5} color="#513392" />,
      exams: <Calendar size={32} strokeWidth={1.5} color="#513392" />,
      jobs: <Briefcase size={32} strokeWidth={1.5} color="#513392" />,
      ai: <Sparkles size={32} strokeWidth={1.5} color="#513392" />,
    };

    return cards.map((card, index) => ({
      id: index + 1,
      title: card.title ?? "",
      description: card.description ?? "",
      icon: (card.icon && iconMap[card.icon]) ?? iconMap.search,
    }));
  }, [thirdSection]);

  if (!thirdSection || thirdSection.enabled === false) {
    return null;
  }

  return (
    <section className="w-full py-8 md:py-16 bg-[#f6f7ff]">
      <ContentWrapper className="flex flex-col gap-8 md:gap-16">
        {/* Header */}
        <div className="flex flex-col gap-2 md:gap-6 items-center text-center">
          <h2 className="font-poppins font-medium leading-[36px] md:leading-[48px] text-[#162447] text-[28px] md:text-[40px] tracking-[-0.96px]">
            {thirdSection.headline}
          </h2>
          <p className="font-poppins text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#767e92] max-w-[416px]">
            {thirdSection.paragraph}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-[22px]">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-[20px] p-5 md:p-[26px] h-auto md:h-[233px] flex flex-col gap-4 md:gap-5 shadow-[1px_6px_41px_0px_rgba(0,0,0,0.04)]"
            >
              {/* Icon */}
              <div className="border border-[#f2f2f2] rounded-[10px] p-[5px] w-fit">
                <div className="bg-[#faf9f6] border border-[#f2f2f2] rounded-[10px] w-[55px] h-[55px] flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 md:gap-5 flex-1">
                <h3 className="font-poppins font-medium leading-[28px] text-[#162447] text-[20px] md:text-[24px] tracking-[-0.48px]">
                  {feature.title}
                </h3>
                <p className="font-poppins text-[16px] leading-[20px] text-[#767e92]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ContentWrapper>
    </section>
  );
}

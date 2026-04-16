"use client";

import React from "react";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import { useCmsBlogPage } from "@/hooks/cms/useCmsBlogpage";

interface BlogHeroProps {
  onSearch?: (query: string) => void;
  activeCategory?: string;
}

export default function BlogHero({ onSearch, activeCategory }: BlogHeroProps) {
  const { hero, searchFilters } = useCmsBlogPage();

  const categories =
    searchFilters?.filters && searchFilters.filters.length > 0
      ? searchFilters.filters
          .map((item) => item.label || item.value)
          .filter((item): item is string => Boolean(item))
      : [];

  const handleCategoryClick = (category: string) => {
    if (!onSearch) return;
    if (activeCategory === category) {
      onSearch("");
    } else {
      onSearch(category);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#513392] via-[#6041ad] to-[#6846b6]">
      <ContentWrapper className="relative h-full py-6 sm:py-10 md:py-12 lg:py-16">
        {/* Content */}
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 max-w-[720px]">
          <h1 className="font-poppins font-medium leading-[28px] sm:leading-[32px] md:leading-[40px] lg:leading-[46px] xl:leading-[52px] text-white text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] xl:text-[48px] tracking-[-0.4px] md:tracking-[-0.6px] lg:tracking-[-0.8px]">
            {hero?.headline}
          </h1>
          {hero?.subHeadline && (
            <p className="font-poppins text-[13px] md:text-[15px] lg:text-[16px] leading-[19px] md:leading-[22px] text-[rgba(255,255,255,0.75)] max-w-[620px]">
              {hero.subHeadline}
            </p>
          )}

          {/* Category pills */}
          {categories.length > 0 && (
            <div className="flex gap-2 md:gap-3 flex-wrap mt-2 md:mt-3">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`rounded-full px-3 py-1.5 md:px-4 md:py-2 font-poppins text-[12px] md:text-[13px] lg:text-[14px] leading-[16px] md:leading-[18px] transition-colors ${
                      isActive
                        ? "bg-white text-[#513392] font-medium shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                        : "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </ContentWrapper>
    </section>
  );
}

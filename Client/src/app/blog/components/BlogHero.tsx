"use client";

import React from "react";
import { ChevronRightIcon, SearchIcon } from "@/components/common/Icons";
import { Button } from "@/components/common/Button";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import { useCmsBlogPage } from "@/hooks/cms/useCmsBlogpage";

interface BlogHeroProps {
  onSearch?: (query: string) => void;
}

export default function BlogHero({ onSearch }: BlogHeroProps) {
  const { hero, searchFilters } = useCmsBlogPage();
  const [searchQuery, setSearchQuery] = React.useState("");

  const categories =
    searchFilters?.filters && searchFilters.filters.length > 0
      ? searchFilters.filters
        .map((item) => item.label || item.value)
        .filter((item): item is string => Boolean(item))
      : [];

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#513392] via-[#6041ad] to-[#6846b6]">
      <ContentWrapper className="relative h-full py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-[2px]">
          <p className="font-poppins text-[16px] leading-[20px] text-[rgba(255,255,255,0.87)]">
            Home
          </p>
          <ChevronRightIcon
            width={12}
            height={12}
            fill="rgba(255,255,255,0.87)"
          />
          <p className="font-poppins font-light text-[16px] leading-[20px] text-[rgba(255,255,255,0.87)] tracking-[-0.32px]">
            Blog
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-[301px] items-start">
          {/* Left: Title and Description */}
          <div className="flex flex-col gap-[30px] max-w-[595px]">
            <h1 className="font-poppins font-medium leading-[32px] md:leading-[48px] text-white text-[22px] md:text-[40px] lg:text-[48px] tracking-[-0.96px]">
              {hero?.headline}
            </h1>
            <p className="font-poppins text-[14px] md:text-[16px] leading-[20px] text-[rgba(255,255,255,0.7)] max-w-[548px]">
              {hero?.subHeadline}
            </p>
          </div>

          {/* Right: Search and Categories */}
          <div className="flex flex-col gap-[38px]">
            {/* Search Bar */}
            <div className="bg-[#f6f7ff] border-[0.5px] border-[rgba(147,97,255,0.2)] rounded-[90px] h-[40px] md:h-[54px] flex items-center pl-[12px] md:pl-[18px] pr-[4px] py-[4px] gap-[6px] w-full md:w-[450px]">
              <div className="flex items-center gap-[6px] flex-1">
                <div className="w-5 h-5 md:w-6 md:h-6">
                  <SearchIcon />
                </div>
                <input
                  type="search"
                  placeholder="Search for Blogs"
                  aria-label="Search blog articles"
                  className="bg-transparent border-none outline-none font-poppins text-[12px] md:text-[16px] leading-[20px] text-[#2D2D2D] placeholder:text-[#767e92] w-full"
                  value={searchQuery}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchQuery(value);
                    if (value === "" && onSearch) {
                      onSearch("");
                    }
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSearch}
                className="bg-[#513392] rounded-[50px] px-[16px] md:px-[22px] py-[8px] md:py-[14px] text-white text-[12px] md:text-[14px]"
              >
                Search Now
              </Button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-3 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSearchQuery(category);
                    if (onSearch) onSearch(category);
                  }}
                  className="bg-[rgba(255,255,255,0.1)] border-[1.333px] border-[rgba(255,255,255,0.1)] rounded-[120px] px-2 py-1 md:px-3 md:py-2 text-white font-poppins text-[12px] md:text-[14px] leading-[16px] md:leading-[18px] hover:bg-[rgba(255,255,255,0.15)] transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}

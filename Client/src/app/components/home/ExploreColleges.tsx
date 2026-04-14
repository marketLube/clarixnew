"use client";
import React, { useState, useRef, useCallback } from "react";
import SectionHeading from "@/components/common/Section/SectionHeading";
import SectionDescription from "@/components/common/Section/SectionDescription";
import { Button } from "@/components/common/Button";
import CollegeCard from "@/components/common/Cards/collageCard";
import ArrowRightIcon from "@/components/common/Icons/ArrowRight";
import {
  BadgeIcon,
  FundingIcon,
  MedalIcon,
  ShieldIcon,
} from "@/components/common/Icons";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import { useRouter } from "next/navigation";
import { useCmsHomepage } from "@/hooks/cms/useCmsHomepage";
import { useExploreTopColleges, FilterType } from "@/hooks/college/useExploreTopColleges";

import Loader from "@/components/common/Loader";

import CompactCollegeCard from "@/components/common/Cards/CompactCollegeCard";

export default function ExploreColleges() {
  const {
    colleges,
    isLoading,
    activeFilter,
    toggleFilter
  } = useExploreTopColleges();

  const router = useRouter();
  const { contentBlocks } = useCmsHomepage();
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Translate vertical wheel events to horizontal scroll for trackpad support
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const el = mobileScrollRef.current;
    if (!el) return;

    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;

    const atStart = el.scrollLeft <= 0;
    const atEnd = el.scrollLeft >= maxScroll - 1;

    if ((e.deltaY > 0 && atEnd) || (e.deltaY < 0 && atStart)) return;

    e.preventDefault();
    el.scrollLeft += e.deltaY;
  }, []);

  const firstContentBlock = contentBlocks?.blocks?.[0];
  const title = firstContentBlock?.title ?? "";
  const description = firstContentBlock?.description ?? "";

  const renderFilterButton = (
    filter: FilterType,
    label: string,
    Icon: React.ElementType
  ) => {
    const isActive = activeFilter === filter;
    return (
      <button
        onClick={() => toggleFilter(filter)}
        className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors ${isActive
          ? "bg-[#513392] font-medium text-white shadow-sm"
          : "border border-[#E2E4E8] text-[#767E92] hover:bg-gray-50"
          }`}
      >
        <Icon
          width={16}
          height={16}
          fill={isActive ? "white" : "#767E92"}
          className={isActive ? "" : "text-[#767E92]"}
        />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <section className="w-full bg-white py-4 sm:py-16">
      <ContentWrapper className="px-4 sm:px-10">
        {/* Hero Section */}

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-50 mb-12 ">
          {/* Left: Heading */}
          <div className="flex-1 lg:w-[600px]">
            <SectionHeading title={title} className=" " />
          </div>
          {/* Right: Description and Button */}
          <div className="flex-1 lg:w-[358px] flex flex-col gap-[31px]">
            <SectionDescription>{description}</SectionDescription>

            <Button
              variant="primary"
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-[10px] rounded-[30px] font-poppins text-[13px] sm:text-[16px] leading-[16px] sm:leading-[20px] w-fit whitespace-nowrap"
              onClick={() => router.push("/colleges")}
            >
              View All Colleges
              <ArrowRightIcon width={16} height={16} className="sm:w-[24px] sm:h-[24px]" />
            </Button>
          </div>
        </div>
        <div className="">
          {/* Filters */}
          <div className="mb-8 flex items-center flex-nowrap gap-3 overflow-x-auto sm:flex-wrap sm:overflow-x-visible">
            {renderFilterButton("reviews", "By Reviews", MedalIcon)}
            {renderFilterButton("placements", "By Placements", BadgeIcon)}
            {renderFilterButton("fees", "By Fees", FundingIcon)}
            {renderFilterButton("featured", "Featured", ShieldIcon)}


          </div>

          {/* Cards */}
          {isLoading ? (
            <Loader containerClassName="py-20" />
          ) : colleges && colleges.length > 0 ? (
            <>
              {/* Desktop Grid View */}
              <div className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {colleges.map((college) => (
                  <CollegeCard
                    college={college}
                    key={college._id}
                  />
                ))}
              </div>

              {/* Mobile Scrolling View (1 Row if <= 2 cards, 2 Rows if > 2 cards) */}
              <div
                ref={mobileScrollRef}
                onWheel={handleWheel}
                className="md:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide pb-6"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <div className={`grid ${colleges.length <= 2 ? "grid-rows-1" : "grid-rows-2"} grid-flow-col gap-3 w-max`}>
                  {colleges.map((college) => (
                    <div key={college._id} className="w-[150px] h-full">
                      <CompactCollegeCard college={college} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 py-10 w-full">
              No colleges found.
            </div>
          )}
        </div>
      </ContentWrapper>
    </section>
  );
}

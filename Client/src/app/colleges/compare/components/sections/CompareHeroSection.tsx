"use client";

import React from "react";
import { ChevronLeftIcon } from "@/components/common/Icons";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import Link from "next/link";
import { College } from "../CompareView";

interface CompareHeroSectionProps {
  colleges: College[];
  onRemove?: (id: string) => void;
  onAdd?: () => void;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  onClearAll?: () => void;
}

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "courses", label: "Courses & Eligibility" },
  { id: "fees", label: "Fee Structure" },
  { id: "placements", label: "Placements" },
  { id: "campus", label: "Campus & Facilities" },
  { id: "reviews", label: "Student Reviews" },
  { id: "admissions", label: "Admissions" },
];

export default function CompareHeroSection({
  colleges,
  onRemove,
  onAdd,
  activeTab = "overview",
  onTabChange,
  onClearAll,
}: CompareHeroSectionProps) {
  // Generate title with college names joined by " vs "
  const title =
    colleges.length > 0
      ? colleges.map((college) => college.name).join(" vs ")
      : "Compare Colleges";

  // Generate description text — kept short so the hero doesn't dominate
  const getDescription = () => {
    if (colleges.length === 0) {
      return "Select colleges to compare and make informed decisions.";
    }

    if (colleges.length === 1) {
      return "Add another college to start comparing courses, fees, placements, facilities, and reviews side by side.";
    }

    return `Comparing ${colleges.length} colleges side by side — courses, fees, placements, facilities, and reviews in one easy table.`;
  };

  return (
    <div className="relative w-full">
      {/* Hero Section with Gradient Background */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(-78.6101deg, rgb(81, 51, 146) 3.742%, rgb(81, 51, 146) 54.563%, rgb(96, 61, 173) 73.073%, rgb(104, 68, 182) 76.629%, rgb(96, 61, 173) 80.506%, rgb(81, 51, 146) 96.467%)",
        }}
      >
        <ContentWrapper className="relative py-5 sm:py-8">
          {/* Back Link */}
          <div className="mb-3 sm:mb-4">
            <Link
              href="/colleges"
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
            >
              <ChevronLeftIcon width={16} height={16} fill="currentColor" />
              <span className="font-poppins text-[13px] sm:text-[14px] leading-[18px]">
                Back
              </span>
            </Link>
          </div>

          {/* Main Content */}
          <div className="flex flex-col gap-2 sm:gap-3 max-w-[1100px]">
            {/* Title — auto-builds "A vs B" so sizes stay compact even with long names */}
            <h1 className="font-poppins font-semibold leading-[24px] sm:leading-[30px] text-white text-[18px] sm:text-[24px] lg:text-[28px] tracking-[-0.4px]">
              {title}
            </h1>

            {/* Description */}
            <p className="font-poppins text-[12px] sm:text-[13px] leading-[18px] sm:leading-[20px] text-[rgba(255,255,255,0.85)] max-w-[820px]">
              {getDescription()}
            </p>
          </div>
        </ContentWrapper>
      </section>
    </div>
  );
}

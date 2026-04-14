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

  // Generate description text
  const getDescription = () => {
    if (colleges.length === 0) {
      return "Select colleges to compare and make informed decisions.";
    }

    if (colleges.length === 1) {
      return `Compare ${colleges[0].name} with other colleges to see detailed information about courses, placements, campus facilities, student reviews, and rankings.`;
    }

    const collegeNames = colleges.map((c) => c.name).join(", ");
    return `Compare ${collegeNames} side-by-side. Get detailed information about college reviews, courses, placements, campus information, hostel photographs, facilities, and rankings. Compare other courses and colleges with details like fees, eligibility, hostel fees, and course duration.`;
  };

  return (
    <div className="relative w-full">
      {/* Hero Section with Gradient Background */}
      <section
        className="relative min-h-[250px] sm:min-h-[400px] w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(-78.6101deg, rgb(81, 51, 146) 3.742%, rgb(81, 51, 146) 54.563%, rgb(96, 61, 173) 73.073%, rgb(104, 68, 182) 76.629%, rgb(96, 61, 173) 80.506%, rgb(81, 51, 146) 96.467%)",
        }}
      >
        <ContentWrapper className="relative h-full py-8 sm:py-12 lg:py-16">
          {/* Back Link */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <Link
              href="/colleges"
              className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
            >
              <ChevronLeftIcon width={20} height={20} fill="white" />
              <span className="font-poppins text-[16px] leading-[20px] text-white">
                Back
              </span>
            </Link>
          </div>

          {/* Main Content */}
          <div className="flex flex-col gap-6 max-w-[1200px]">
            {/* Title */}
            <h1 className="font-poppins font-medium leading-[34px] sm:leading-[56px] text-white text-[28px] sm:text-[44px] lg:text-[52px] tracking-[-0.96px]">
              {title}
            </h1>

            {/* Description */}
            <p className="font-poppins text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[rgba(255,255,255,0.9)] max-w-[900px]">
              {getDescription()}
            </p>
          </div>
        </ContentWrapper>
      </section>
    </div>
  );
}

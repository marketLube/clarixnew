"use client";

import React from "react";
import { ChevronRightIcon } from "@/components/common/Icons";
import { Button } from "@/components/common/Button";
import { ChevronRight } from "lucide-react";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import { useCmsCareerPage } from "@/hooks/cms/useCmsCareerpage";

export default function CareerHero() {
  const { heroSection } = useCmsCareerPage();

  const scrollToRoles = () => {
    const section = document.getElementById("open-roles");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[300px] md:min-h-[560px] w-full overflow-hidden bg-gradient-to-br from-[#513392] via-[#6041ad] to-[#6846b6]">
      <ContentWrapper className="relative h-full py-8 md:py-16">
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
          <p className="font-helvetica font-light text-[16px] leading-[20px] text-[rgba(255,255,255,0.87)] tracking-[-0.32px]">
            Career
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-8 md:gap-[40px] items-start max-w-[721px]">
          <div className="flex flex-col gap-4 md:gap-[30px]">
            <h1 className="font-helvetica font-medium leading-[32px] sm:leading-[48px] text-white text-[22px] sm:text-[48px] tracking-[-0.96px]">
              {heroSection?.primaryHeadline ||
                "Work With Us to Make Education Transparent for Everyone"}
            </h1>
            <p className="font-poppins text-[14px] sm:text-[16px] leading-[20px] text-[rgba(255,255,255,0.7)] max-w-[581px]">
              {heroSection?.subHeadline ||
                "Join a mission-driven team shaping India's most transparent, student-first education discovery platform — trusted by thousands of learners, parents, and institutions."}
            </p>
          </div>
          <Button
            variant="heroOutline"
            size="lg"
            className="px-10 sm:px-6 border-2"
            onClick={scrollToRoles}
          >
            <div className="flex items-center gap-2">
              <span className="font-poppins text-[16px] leading-[20px]">
                See Open Roles
              </span>


              <ChevronRight />
            </div>
          </Button>
        </div>
      </ContentWrapper>
    </section>
  );
}

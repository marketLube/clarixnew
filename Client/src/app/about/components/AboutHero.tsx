"use client";

import React from "react";
import { ChevronRightIcon } from "@/components/common/Icons";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import { useCmsAboutPage } from "@/hooks/cms/useCmsAboutpage";

export default function AboutHero() {
  const { hero } = useCmsAboutPage();

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#513392] via-[#6041ad] to-[#6846b6]">
      <ContentWrapper className="relative h-full py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-[2px]">
          <p className="font-poppins text-[16px] leading-[20px] text-[rgba(255,255,255,0.87)]">
            Home
          </p>
          <ChevronRightIcon width={12} height={12} fill="rgba(255,255,255,0.87)" />
          <p className="font-poppins font-light text-[16px] leading-[20px] text-[rgba(255,255,255,0.87)] tracking-[-0.32px]">
            About Us
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 md:gap-[30px] max-w-[757px]">
          <h1 className="font-poppins font-medium leading-[28px] sm:leading-[32px] md:leading-[40px] lg:leading-[46px] xl:leading-[52px] text-white text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] xl:text-[48px] tracking-[-0.4px] md:tracking-[-0.6px] lg:tracking-[-0.8px]">
            {hero?.headline ?? "About Clarix Education"}
          </h1>
          <p className="font-poppins text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[rgba(255,255,255,0.7)]">
            {hero?.subHeadline ?? "Empowering students to make confident education decisions with trusted data, expert guidance, and the right tools."}
          </p>
        </div>
      </ContentWrapper>
    </section>
  );
}

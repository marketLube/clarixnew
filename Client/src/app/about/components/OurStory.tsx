"use client";

import React from "react";
import Image from "next/image";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import { useCmsAboutPage } from "@/hooks/cms/useCmsAboutpage";

export default function OurStory() {
  const { fourthSection } = useCmsAboutPage();

  if (fourthSection?.enabled === false) {
    return null;
  }

  return (
    <section className="w-full py-8 md:py-16">
      <ContentWrapper className="flex flex-col lg:flex-row gap-8 md:gap-[314px] items-center">
        {/* Left: Content */}
        <div className="flex flex-col gap-6 md:gap-[30px] flex-1 max-w-[543px]">
          <h2 className="font-poppins font-medium leading-[36px] md:leading-[48px] text-[#162447] text-[28px] sm:text-[48px] tracking-[-0.96px]">
            {fourthSection?.headline ?? "Our Story"}
          </h2>
          <p className="font-poppins text-[16px] leading-[20px] text-[#767e92]">
            {fourthSection?.paragraph ?? "Clarix Education was born out of a simple observation: choosing the right college or course in India is unnecessarily complicated. With thousands of institutions, conflicting rankings, and scattered information, students and parents often feel overwhelmed. We set out to change that by building a platform that brings everything together in one place, accurate data, real reviews, expert guidance, and smart tools to help every student find their perfect fit."}
          </p>
        </div>

        {/* Right: Image */}
        <div className="relative h-[315px] w-full lg:w-[546px] rounded-[20px] overflow-hidden flex-shrink-0">
          <Image
            src="/images/ourstory.png"
            alt="The Clarix Education team and our journey"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 546px"
          />
        </div>
      </ContentWrapper>
    </section>
  );
}

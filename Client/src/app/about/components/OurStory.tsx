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
    <section className="w-full py-8 md:py-12">
      <ContentWrapper className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
        {/* Left: Content */}
        <div className="flex flex-col gap-4 md:gap-5 flex-1 max-w-[560px]">
          <h2 className="font-poppins font-medium leading-[36px] md:leading-[44px] text-[#162447] text-[28px] md:text-[36px] tracking-[-0.72px]">
            {fourthSection?.headline ?? "Our Story"}
          </h2>
          <div className="font-poppins text-[14px] md:text-[15px] leading-[24px] md:leading-[26px] text-[#767e92]">
            {(fourthSection?.paragraph ?? "Clarix Education was born from a simple observation: choosing the right college in India is unnecessarily complicated. With over 50,000 institutions, hundreds of entrance exams, and constantly changing admission criteria, students and parents often feel overwhelmed.\n\nWe started as a small team of education enthusiasts who had personally experienced this confusion. We saw friends choose wrong colleges because of misleading marketing, watched talented students miss scholarship deadlines, and met parents who spent lakhs on counseling that could have been free.\n\nSo we built Clarix — a platform that brings together verified college data, real student reviews, placement statistics, fee breakdowns, and expert guidance in one place.")
              .split("\n\n")
              .map((para, i) => (
                <p key={i} className={i > 0 ? "mt-3" : ""}>
                  {para}
                </p>
              ))}
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative h-[300px] w-full lg:w-[460px] rounded-[16px] overflow-hidden flex-shrink-0">
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

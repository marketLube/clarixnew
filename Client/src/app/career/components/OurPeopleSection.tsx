"use client";

import React from "react";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import Image from "next/image";
import { useCmsCareerPage } from "@/hooks/cms/useCmsCareerpage";

export default function OurPeopleSection() {
  const { secondSection } = useCmsCareerPage();

  const teamImages = secondSection?.images?.map(img => img.url).filter(Boolean) as string[] || [];

  if (secondSection?.enabled === false) return null;

  return (
    <section className="bg-white py-8 md:py-20">
      <ContentWrapper className="flex flex-col gap-6 md:gap-[60px]">
        <div className="flex flex-col gap-4 md:gap-[30px] max-w-[742px]">
          <h2 className="font-helvetica font-medium leading-[32px] md:leading-[48px] text-[#162447] text-[22px] md:text-[48px] tracking-[-0.96px] max-w-[375px]">
            {secondSection?.primaryHeadline}
          </h2>
          <div className="font-poppins leading-[20px] text-[#767e92] text-[14px] md:text-[16px] space-y-4">
            {secondSection?.paragraph?.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>

        {teamImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamImages.map((image, index) => (
              <div
                key={index}
                className="h-[250px] sm:h-[280px] lg:h-[300px] w-full relative rounded-[16px] overflow-hidden"
              >
                <Image
                  src={image}
                  alt={secondSection?.images?.[index]?.alt || `Team member ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </ContentWrapper>
    </section>
  );
}

"use client";

import React from "react";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import { useCmsAboutPage } from "@/hooks/cms/useCmsAboutpage";
import Loader from "@/components/common/Loader";

export default function Stats() {
  const { keyStatistics, isLoading } = useCmsAboutPage();
  const stats = keyStatistics?.stats;

  if (!keyStatistics?.enabled || !stats?.length) {
    return null;
  }

  return (
    <section className="w-full bg-white py-4 sm:py-16 px-4 sm:px-0">
      <ContentWrapper className="bg-[#f6f7ff] border border-[#e1e3ff] rounded-[14px] px-4 py-[14px] lg:px-[212px] lg:py-[30px]">
        {isLoading ? (
          <Loader containerClassName="py-0" />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center text-[#767e92] py-2"
              >
                <p className="font-poppins font-medium text-[20px] leading-[24px] tracking-[-0.28px] sm:text-[22px] sm:leading-[26px] md:text-[28px] md:leading-[34px] lg:text-[36px] lg:leading-[40px] xl:text-[40px] xl:leading-[44px] xl:tracking-[-0.6px]">
                  {stat.value}
                </p>
                <p className="font-poppins text-[11px] leading-[16px] md:text-[13px] lg:text-[16px] lg:leading-[20px] mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </ContentWrapper>
    </section>
  );
}

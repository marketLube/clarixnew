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
          <div className="flex flex-nowrap justify-between items-stretch">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`flex-1 flex justify-center lg:justify-center `}
              >
                <div className="flex flex-col gap-0 lg:gap-[6px] items-center text-center text-[#767e92]">
                  <p className="font-helvetica font-medium text-[14px] leading-[18px] tracking-[-0.28px] lg:text-[48px] lg:leading-[48px] lg:tracking-[-0.96px] lg:[leading-trim:both] lg:[text-edge:cap]">
                    {stat.value}
                  </p>
                  <p className="font-poppins text-[10px] leading-[14px] lg:text-[16px] lg:leading-[20px] lg:[leading-trim:both] lg:[text-edge:cap] whitespace-nowrap">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </ContentWrapper>
    </section>
  );
}

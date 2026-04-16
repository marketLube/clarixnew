"use client";

import React, { useMemo } from "react";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import { useCmsAboutPage } from "@/hooks/cms/useCmsAboutpage";

interface Stat {
  id: number;
  value: string;
  label: string;
}

export default function StatsSection() {
  const { keyStatistics } = useCmsAboutPage();

  const fallbackStats: Stat[] = [
    { id: 1, value: "40,000+", label: "Colleges Listed" },
    { id: 2, value: "500+", label: "Courses Covered" },
    { id: 3, value: "200+", label: "Entrance Exams Tracked" },
    { id: 4, value: "50,000+", label: "Student Reviews" },
  ];

  const stats: Stat[] = useMemo(() => {
    const items = keyStatistics?.stats ?? [];

    if (items.length === 0) return fallbackStats;

    return items.map((item, index) => ({
      id: index + 1,
      label: item.label ?? "",
      value: item.value ?? "",
    }));
  }, [keyStatistics]);

  if (keyStatistics && keyStatistics.enabled === false) {
    return null;
  }

  return (
    <section className="w-full py-6 md:py-12">
      <ContentWrapper>
        {/* <div className=""> */}
        <div className="bg-[#f6f7ff] rounded-[14px] px-4 md:px-16 lg:px-[212px] py-6 md:py-[30px] my-4 md:my-0">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8 items-center justify-center">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col items-center text-center py-2"
              >
                <p className="font-poppins font-medium text-[20px] leading-[24px] sm:text-[22px] sm:leading-[26px] md:text-[28px] md:leading-[34px] lg:text-[36px] lg:leading-[40px] xl:text-[40px] xl:leading-[44px] text-[#767e92] tracking-[-0.4px] md:tracking-[-0.6px]">
                  {stat.value}
                </p>
                <p className="font-poppins text-[11px] md:text-[13px] lg:text-[16px] leading-[16px] md:leading-[20px] text-[#767e92] mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* </div> */}
      </ContentWrapper>
    </section>
  );
}

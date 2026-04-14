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
        <div className="bg-[#f6f7ff] rounded-[14px] px-4 md:px-[212px] py-6 md:py-[30px] my-8 md:my-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 items-center justify-center">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col gap-1 sm:gap-[14px] items-center text-center"
              >
                <p className="font-poppins font-medium leading-[32px] sm:leading-[48px] text-[#767e92] text-[28px] sm:text-[48px] tracking-[-0.96px]">
                  {stat.value}
                </p>
                <p className="font-poppins text-[12px] sm:text-[16px] leading-[16px] sm:leading-[20px] text-[#767e92]">
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

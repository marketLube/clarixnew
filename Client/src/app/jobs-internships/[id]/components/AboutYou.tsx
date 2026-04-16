"use client";

import React from "react";
import { JobDetail } from "./JobDetailHero";

interface AboutYouProps {
  job: JobDetail;
}

export default function AboutYou({ job }: AboutYouProps) {
  const requirements = job.aboutYou ?? [];

  if (requirements.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:gap-10 items-start mb-8 md:mb-10 lg:mb-[60px]">
      <h2 className="font-poppins font-medium leading-[22px] md:leading-[26px] lg:leading-[28px] text-[#162447] text-[18px] md:text-[22px] lg:text-[24px] tracking-[-0.4px]">
        About you
      </h2>

      <div className="flex flex-col gap-5 md:gap-8 lg:gap-12 items-start">
        <div className="flex flex-col gap-3 md:gap-5 lg:gap-7 items-start">
          {requirements.map((req, index) => (
            <div key={index} className="flex gap-2 md:gap-[15px] items-start">
              <div className="w-[5px] h-[5px] md:w-[6px] md:h-[6px] rounded-full bg-[#767e92] mt-[6px] md:mt-[7px] flex-shrink-0"></div>
              <p className="font-poppins text-[13px] md:text-[15px] lg:text-[16px] leading-[18px] md:leading-[20px] text-[#767e92]">
                {req}
              </p>
            </div>
          ))}
        </div>

        <p className="font-poppins text-[13px] md:text-[15px] lg:text-[16px] leading-[18px] md:leading-[20px] text-[#767e92]">
          The salary range for this role is: {job.salaryRange}
        </p>
      </div>
    </div>
  );
}

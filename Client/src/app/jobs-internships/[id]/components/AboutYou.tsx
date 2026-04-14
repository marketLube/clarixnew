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
    <div className="flex flex-col gap-10 items-start mb-[60px]">
      <h2 className="font-poppins font-medium leading-[28px] text-[#162447] text-[24px] tracking-[-0.48px]">
        About you
      </h2>

      <div className="flex flex-col gap-12 items-start">
        <div className="flex flex-col gap-7 items-start">
          {requirements.map((req, index) => (
            <div key={index} className="flex gap-[15px] items-start">
              <div className="w-[6px] h-[6px] rounded-full bg-[#767e92] mt-[7px] flex-shrink-0"></div>
              <p className="font-poppins text-[16px] leading-[20px] text-[#767e92]">
                {req}
              </p>
            </div>
          ))}
        </div>

        <p className="font-poppins text-[16px] leading-[20px] text-[#767e92]">
          The salary range for this role is: {job.salaryRange}
        </p>
      </div>
    </div>
  );
}

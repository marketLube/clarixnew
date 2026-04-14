"use client";

import React from "react";
import { JobDetail } from "./JobDetailHero";

interface AboutRoleProps {
  job: JobDetail;
}

export default function AboutRole({ job }: AboutRoleProps) {
  const responsibilities = job.aboutRole ?? [];

  if (responsibilities.length === 0) return null;

  return (
    <div className="flex flex-col gap-10 items-start mb-[60px]">
      <h2 className="font-poppins font-medium leading-[28px] text-[#162447] text-[24px] tracking-[-0.48px]">
        About the role
      </h2>

      <div className="flex flex-col gap-7 items-start">
        {responsibilities.map((item, index) => (
          <div key={index} className="flex gap-[15px] items-start">
            <div className="w-[6px] h-[6px] rounded-full bg-[#767e92] mt-[7px] flex-shrink-0"></div>
            <p className="font-poppins text-[16px] leading-[20px] text-[#767e92]">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

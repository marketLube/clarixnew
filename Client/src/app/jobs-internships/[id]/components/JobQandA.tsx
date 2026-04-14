"use client";

import React from "react";
import { JobDetail } from "./JobDetailHero";

interface JobQandAProps {
  job: JobDetail;
}

export default function JobQandA({ job }: JobQandAProps) {
  const faqs = job.faqs ?? [];

  if (faqs.length === 0) return null;

  return (
    <div className="flex flex-col gap-[26px] items-start mb-[60px]">
      <h3 className="font-poppins font-medium leading-[28px] text-[#162447] text-[20px] tracking-[-0.4px]">
        Questions & answers for this job
      </h3>

      <div className="flex flex-col gap-[18px] items-start w-full">
        {faqs.map((qa, index) => (
          <div
            key={index}
            className="flex flex-col gap-[18px] items-start w-full"
          >
            <p className="font-poppins font-medium text-[16px] leading-[20px] text-[#162447]">
              {qa.question}
            </p>
            <p className="font-poppins text-[16px] leading-[20px] text-[#767e92]">
              {qa.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

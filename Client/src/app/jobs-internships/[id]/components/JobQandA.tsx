"use client";

import React from "react";
import { JobDetail } from "./JobDetailHero";

interface JobQandAProps {
  job: JobDetail;
}

const qaData = [
  {
    question: "What is the type of contract for this job?",
    answer: "The contract for this job is a Full-time contract",
  },
  {
    question: "What's the salary range for the Brand Designer position?",
    answer: "The suggested salary for this job is $132,800 - $175,900*",
  },
  {
    question: "Is telecommuting possible for this job?",
    answer: "No, telecommuting is not possible for this job",
  },
];

export default function JobQandA({ job }: JobQandAProps) {
  return (
    <div className="flex flex-col gap-[26px] items-start mb-[60px]">
      <h3 className="font-poppins font-medium leading-[28px] text-[#162447] text-[20px] tracking-[-0.4px]">
        Questions & answers for this job
      </h3>

      <div className="flex flex-col gap-[18px] items-start w-full">
        {qaData.map((qa, index) => (
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

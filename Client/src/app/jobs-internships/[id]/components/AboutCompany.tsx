"use client";

import React from "react";
import { JobDetail } from "./JobDetailHero";

interface AboutCompanyProps {
  job: JobDetail;
}

export default function AboutCompany({ job }: AboutCompanyProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:gap-10 items-start mb-8 md:mb-10 lg:mb-[60px]">
      <h2 className="font-poppins font-medium leading-[22px] md:leading-[26px] lg:leading-[28px] text-[#162447] text-[18px] md:text-[22px] lg:text-[24px] tracking-[-0.4px]">
        About {job.company}
      </h2>

      <div className="flex flex-col gap-6 md:gap-10 lg:gap-[60px] items-start">
        {job.aboutJob && (
          <div className="font-poppins text-[13px] md:text-[15px] lg:text-[16px] leading-[18px] md:leading-[20px] text-[#767e92] space-y-4">
            <p>{job.aboutJob}</p>
          </div>
        )}

        {job.companyWebsite && (
          <>
            <div className="w-full h-[1px] bg-[#e2e4e8]"></div>
            <div className="font-poppins text-[16px] leading-[20px] text-[#767e92]">
              <p>
                Learn more about {job.company} at{" "}
                <a
                  href={job.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#513392] hover:underline"
                >
                  {job.companyWebsite}
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

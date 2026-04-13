"use client";

import React from "react";
import Image from "next/image";

export interface JobDetail {
  id: string;
  title: string;
  company: string;
  logoUrl?: string;
  employmentType: string;
  salaryRange: string;
  location: string;
  postedTime: string;
  benefits?: string[];
}

interface JobDetailHeroProps {
  job: JobDetail;
}

export default function JobDetailHero({ job }: JobDetailHeroProps) {
  const benefits = job.benefits || ["Health insurance", "Paid time off", "Stock options"];

  return (
    <div className="flex flex-col gap-[60px] items-start mb-[60px]">
      {/* Company Logo and Name */}
      <div className="flex flex-col gap-[22px] items-start">
        <div className="flex gap-3 items-center">
          {/* Company Logo */}
          <div className="w-[60px] h-[60px] rounded-[52px] bg-[#bbb] flex-shrink-0 overflow-hidden shadow-[0px_0.75px_3px_0px_rgba(0,0,0,0.05)]">
            {job.logoUrl ? (
              <Image
                src={job.logoUrl}
                alt={job.company}
                width={60}
                height={60}
                className="w-full h-full object-cover rounded-[52px]"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#513392] to-[#6a46c0] flex items-center justify-center rounded-[52px]">
                <span className="text-white font-medium text-lg">
                  {job.company.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <h2 className="font-helvetica font-medium leading-[28px] text-[#162447] text-[24px] tracking-[-0.48px]">
            {job.company}
          </h2>
        </div>

        {/* Job Title and Info */}
        <div className="flex flex-col gap-4 items-start">
          <div className="flex flex-col gap-[18px] items-start">
            <h1 className="font-helvetica font-medium leading-[28px] text-[#162447] text-[24px] tracking-[-0.48px]">
              {job.title}
            </h1>
            <p className="font-poppins text-[14px] leading-[20px] text-[#767e92]">
              {job.employmentType} <span>{job.title}</span> {job.salaryRange}
            </p>
          </div>

          {/* Location and Time */}
          <div className="flex gap-2 items-start text-[#767e92]">
            <p className="font-poppins text-[14px] leading-[20px] tracking-[-0.28px]">
              {job.location}
            </p>
            <p className="font-poppins text-[12px] leading-[20px] tracking-[-0.24px]">
              {job.postedTime}
            </p>
          </div>

          {/* Benefits Tags */}
          <div className="flex gap-[5px] items-center flex-wrap">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="border border-[#767e92] border-opacity-50 flex items-center justify-center px-[10px] py-2 rounded-[40px]"
              >
                <p className="font-poppins text-[12px] leading-[20px] text-[#767e92]">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

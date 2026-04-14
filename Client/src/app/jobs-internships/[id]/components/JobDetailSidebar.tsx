"use client";

import React from "react";
import { Button } from "@/components/common/Button";
import { ArrowRightIcon } from "@/components/common/Icons";
import { JobDetail } from "./JobDetailHero";

interface JobDetailSidebarProps {
  job: JobDetail;
}

// Simple SVG icons
const WishlistIcon = ({ width = 16, height = 16, fill = "#767E92" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 2.5L9.5 6.5L13.5 7.5L10.5 10.5L11 14.5L8 12.5L5 14.5L5.5 10.5L2.5 7.5L6.5 6.5L8 2.5Z"
      fill={fill}
    />
  </svg>
);

const ShareIcon = ({ width = 16, height = 16, fill = "#767E92" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 10C11.44 10 10.93 10.25 10.55 10.64L6.5 8.5C6.56 8.33 6.6 8.17 6.6 8C6.6 7.83 6.56 7.67 6.5 7.5L10.55 5.36C10.93 5.75 11.44 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2C10.9 2 10 2.9 10 4C10 4.17 10.04 4.33 10.1 4.5L6.05 6.64C5.67 6.25 5.16 6 4.6 6C3.5 6 2.6 6.9 2.6 8C2.6 9.1 3.5 10 4.6 10C5.16 10 5.67 9.75 6.05 9.36L10.1 11.5C10.04 11.67 10 11.83 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
      fill={fill}
    />
  </svg>
);

export default function JobDetailSidebar({ job }: JobDetailSidebarProps) {
  const websiteDisplay = job.companyWebsite
    ? job.companyWebsite.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : null;

  return (
    <div className="flex flex-col gap-[30px] items-start">
      {/* Apply Button */}
      <div className="flex flex-col gap-2 items-end w-full">
        {job.companyWebsite ? (
          <a href={job.companyWebsite} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button
              variant="primary"
              className="bg-[#513392] rounded-[30px] px-[51px] py-[10px] w-full flex items-center justify-center gap-6 text-white hover:bg-[#3d2670] transition-colors"
            >
              <span className="font-poppins text-[16px] leading-[20px] text-white">
                Apply for this job
              </span>
              <ArrowRightIcon width={24} height={24} fill="#f6f7ff" />
            </Button>
          </a>
        ) : (
          <Button
            variant="primary"
            className="bg-[#513392] rounded-[30px] px-[51px] py-[10px] w-full flex items-center justify-center gap-6 text-white hover:bg-[#3d2670] transition-colors"
          >
            <span className="font-poppins text-[16px] leading-[20px] text-white">
              Apply for this job
            </span>
            <ArrowRightIcon width={24} height={24} fill="#f6f7ff" />
          </Button>
        )}

        {/* Info Box */}
        <div className="bg-[#f6f7ff] rounded-[12px] p-4 w-full min-h-[128px] flex items-center justify-center">
          <p className="font-poppins text-[14px] leading-[20px] text-[#767e92] text-center">
            {job.shortDescription || `Explore opportunities at ${job.company} and take the next step in your career.`}
          </p>
        </div>
      </div>

      {/* Company Info Card */}
      <div className="bg-[#f6f7ff] rounded-[12px] p-[18px] w-full min-h-[265px]">
        <div className="flex flex-col gap-4 items-start mb-4">
          <h3 className="font-poppins font-medium leading-[28px] text-[#162447] text-[20px] tracking-[-0.4px]">
            About {job.company}
          </h3>
          {job.shortDescription && (
            <p className="font-poppins text-[14px] leading-[20px] text-[#767e92]">
              {job.shortDescription}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-[18px] items-start mt-4">
          {websiteDisplay && (
            <div className="flex font-poppins gap-10 items-center text-[16px] leading-[20px] text-nowrap">
              <p className="text-[#767e92]">Website</p>
              <a
                href={job.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#513392] hover:underline"
              >
                {websiteDisplay}
              </a>
            </div>
          )}
          {job.industry && (
            <div className="flex font-poppins gap-10 items-center text-[16px] leading-[20px] text-nowrap">
              <p className="text-[#767e92]">Industry</p>
              <p className="text-[#162447]">{job.industry}</p>
            </div>
          )}
          {job.employeeSize && (
            <div className="flex font-poppins items-center justify-between text-[16px] leading-[20px] text-nowrap w-full">
              <p className="text-[#767e92]">Size</p>
              <p className="text-[#162447]">{job.employeeSize} employees</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-[9px] items-center">
        <button className="bg-white border border-[rgba(118,126,146,0.21)] rounded-[50px] px-[10px] py-[10px] flex items-center gap-1 hover:bg-gray-50 transition-colors">
          <WishlistIcon width={16} height={16} fill="#767E92" />
          <span className="font-poppins text-[16px] leading-[20px] text-[#767e92]">
            Wishlist
          </span>
        </button>
        <button className="bg-white border border-[#e2e4e8] rounded-[50px] px-[10px] py-[10px] flex items-center gap-1 hover:bg-gray-50 transition-colors">
          <ShareIcon width={16} height={16} fill="#767E92" />
          <span className="font-poppins text-[16px] leading-[20px] text-[#767e92]">
            Share
          </span>
        </button>
      </div>
    </div>
  );
}

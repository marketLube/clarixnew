"use client";

import React from "react";
import { Button } from "@/components/common/Button";
import {
  ArrowRightIcon,
  BuildingTwoIcon,
  VerifyIcon,
} from "@/components/common/Icons";
import { Heart } from "lucide-react";
export interface CourseCardDetailedProps {
  title?: string;
  stream?: string;
  type?: string;
  entranceExams?: string[];
  topSpecialisations?: string[];
  topColleges?: string[];
  collegeCount?: number;
  onViewDetails?: () => void;
  onViewColleges?: () => void;
  onBookmark?: () => void;
  isBookmarked?: boolean;
  isWishListed?: boolean;
}



// Separator component
const Separator = () => (
  <div className="flex h-[15px] items-center justify-center w-0">
    <div className="flex-none rotate-90">
      <div className="h-0 relative w-[15px]">
        <div className="absolute inset-[-0.5px_0_0_0]">
          <svg
            width="15"
            height="1"
            viewBox="0 0 15 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0"
              y1="0.5"
              x2="15"
              y2="0.5"
              stroke="#767e92"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

export default function CourseCardDetailed({
  title = "",
  stream = "",
  type = "",
  entranceExams = [],
  topSpecialisations = [],
  topColleges = [],
  collegeCount = 0,
  onViewDetails,
  onViewColleges,
  onBookmark,
  isBookmarked = false,
  isWishListed = false,
}: CourseCardDetailedProps) {
  return (
    <div className="bg-white border border-[#f2f2f2] h-auto md:h-[314px] overflow-hidden relative rounded-[10px] md:rounded-[20px] shadow-[0px_6px_32.4px_0px_rgba(0,0,0,0.05)] w-full flex flex-col p-[14px] md:p-[20px] gap-1 md:gap-0">
      {/* Header Section with Title and Bookmark */}
      <div className="flex items-start justify-between mb-[6px]">
        {/* Title and Meta Info */}
        <div className="flex flex-col items-start flex-1 pr-0 md:pr-4 gap-1 md:gap-[5px] ">
          <h3 className="font-helvetica font-medium text-[#513392] text-[15px] md:text-[20px] m-0 p-0 leading-tight">
            {title}
          </h3>
          <div className="flex font-poppins gap-2 md:gap-4 items-center flex-wrap leading-tight text-[#767e92] md:leading-[20px] text-[11px] md:text-[14px]">
            <span>Stream: {stream}</span>
            <span className="hidden md:inline">•</span>
            <span>Type: {type}</span>
          </div>
        </div>

        {/* Bookmark Button */}
        {!isWishListed && (
          <button
            onClick={onBookmark}
            className="bg-white border border-[#767e92] flex items-center justify-center p-[6px] rounded-full hover:bg-[#f6f7ff] transition-colors flex-shrink-0 mt-1.5"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Heart
              size={18}
              strokeWidth={1.5}
              fill={isBookmarked ? "#513392" : "none"}
              className={isBookmarked ? "stroke-[#513392]" : "stroke-[#767e92]"}
            />
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] md:h-[1px] bg-[#e2e4e8] mb-[6px] md:mb-[14px] mt-[6px] md:mt-[10px]"></div>

      {/* Entrance Exams Section */}
      <div className="flex flex-col gap-1 md:gap-[8px] items-start mb-2 md:mb-[14px]">
        <p className="font-poppins leading-tight md:leading-[20px] text-[#162447] text-[12px] md:text-[16px]">
          Entrance Exams:
        </p>
        <div className="flex gap-2 items-center flex-wrap">
          {entranceExams.map((exam, index) => (
            <div
              key={index}
              className="bg-[#f6f7ff] flex items-center justify-center px-1.5 md:px-3 py-0.5 md:py-1 rounded-[20px] md:rounded-[30px]"
            >
              <p className="font-poppins leading-tight md:leading-[20px] text-[#513392] text-[11px] md:text-[16px] whitespace-nowrap">
                {exam}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Specialisations and Colleges Section */}
      <div className="flex flex-col gap-[8px] items-start flex-1">
        {/* Top Specialisations */}
        <div className="flex gap-1 md:gap-[5px] items-start justify-start w-full">
          <div className="flex-shrink-0 mt-[2px] md:mt-0 w-[14px] h-[14px] md:w-[20px] md:h-[20px]">
            <VerifyIcon fill="#767E92" />
          </div>
          <div className="flex gap-1.5 md:gap-[10px] items-center flex-wrap">
            <p className="font-poppins leading-tight md:leading-[20px] text-[#767e92] text-[12px] md:text-[15px] whitespace-nowrap">
              Top Specialisations:
            </p>
            {topSpecialisations.map((spec, index) => (
              <React.Fragment key={index}>
                <p className="font-poppins leading-tight md:leading-[20px] text-[#513392] text-[11px] md:text-[15px] whitespace-nowrap">
                  {spec}
                </p>
                {index < topSpecialisations.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Top Colleges */}
        <div className="flex gap-1 md:gap-[5px] items-start justify-start w-full mt-1.5 md:mt-0">
          <div className="flex-shrink-0 mt-[2px] md:mt-0 w-[14px] h-[14px] md:w-[20px] md:h-[20px] overflow-hidden">
            <BuildingTwoIcon fill="#767E92" width={20} height={20} className="scale-[0.7] -translate-x-1 -translate-y-1 md:scale-100 md:translate-x-0 md:translate-y-0" />
          </div>
          <div className="flex gap-1.5 md:gap-[10px] items-center flex-wrap">
            <p className="font-poppins leading-tight md:leading-[20px] text-[#767e92] text-[12px] md:text-[15px] whitespace-nowrap">
              Top Colleges:
            </p>
            {topColleges.map((college, index) => (
              <React.Fragment key={index}>
                <p className="font-poppins leading-tight md:leading-[20px] text-[#513392] text-[11px] md:text-[15px] whitespace-nowrap">
                  {college}
                </p>
                {index < topColleges.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-[8px] md:gap-[22px] items-center mt-3 md:mt-auto">
        <Button
          variant="primary"
          size="md"
          onClick={onViewDetails}
          className="rounded-[20px] md:rounded-[30px] px-3 md:px-4 py-1.5 md:py-[5px] flex items-center gap-[4px] md:gap-6 md:text-[14px] text-[11px] md:leading-5 leading-tight shadow-none whitespace-nowrap"
        >
          View Details
          <ArrowRightIcon className="w-[12px] h-[12px] md:w-[24px] md:h-[24px]" fill="#f6f7ff" />
        </Button>
        <Button
          variant="outline"
          size="md"
          onClick={onViewColleges}
          className="rounded-[20px] md:rounded-[30px] px-3 md:px-4 py-1.5 md:py-[5px] flex items-center gap-[4px] md:gap-6 md:text-[14px] text-[11px] md:leading-5 leading-tight shadow-none whitespace-nowrap"
        >
          View Colleges
          <ArrowRightIcon className="w-[12px] h-[12px] md:w-[24px] md:h-[24px]" fill="#513392" />
        </Button>
        <div className="bg-[#f6f7ff] flex items-center px-2.5 md:px-[14px] py-[4px] md:py-1.5 rounded-[50px]">
          <div className="flex gap-1.5 md:gap-2 items-center">
            <p className="font-poppins leading-tight md:leading-5 text-[#767e92] text-[11px] md:text-[16px]">
              Colleges :
            </p>
            <p className="font-helvetica font-medium leading-tight md:leading-[28px] text-[#513392] text-[13px] md:text-[21px] tracking-[-0.48px]">
              {collegeCount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

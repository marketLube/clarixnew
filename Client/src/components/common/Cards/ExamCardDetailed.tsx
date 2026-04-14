"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/common/Button";
import {
  ArrowRightIcon,
  VerifyIcon,
  BuildingTwoIcon,
} from "@/components/common/Icons";
import { Badge } from "@/components/common/badge";
import { Heart } from "lucide-react";
import { stripMarkdown } from "@/lib/helperFunctions/stripMarkdown";



export interface ExamCardDetailedProps {
  id?: string | number;
  title?: string;
  subtitle?: string;
  status?: "open" | "closing-soon";
  eligibility?: string;
  collegeCount?: number;
  registrationDate?: string;
  examDate?: string;
  resultsDate?: string;
  description?: string;
  logo?: string;
  isBookmarked?: boolean;
  onViewDetails?: () => void;
  onApplicationProcess?: () => void;
  onExamPattern?: () => void;
  onPreparationTips?: () => void;
  onResults?: () => void;
  onApplyNow?: () => void;
  onBookmark?: () => void;
}

export default function ExamCardDetailed({
  title = "JEE Main",
  subtitle = "Joint Entrance Examination Main Registration Open",
  status = "open",
  eligibility = "12th Pass / Appearing Students",
  collegeCount = 200,
  registrationDate = "15 March 2025",
  examDate = "3 jun 2025",
  resultsDate = "31May 2025",
  description = "JEE Main is the national level undergraduate engineering entrance exam. This exam is acceptable for the admission in various B.Tech/B.E Programs.",
  logo,
  isBookmarked = false,
  onViewDetails,
  onApplicationProcess,
  onExamPattern,
  onPreparationTips,
  onResults,
  onApplyNow,
  onBookmark,
}: ExamCardDetailedProps) {
  const statusConfig = {
    open: {
      label: "Open",
      className: "bg-[#00d647] text-white border border-[#00d647]",
    },
    "closing-soon": {
      label: "Closing Soon",
      className: "bg-[#FFEBEE] text-[#C62828] border border-[#ffcec4]",
    },
  };

  const currentStatus = statusConfig[status];

  return (
    <article className="bg-white border-[0.5px] border-[#f2f2f2] min-h-0 sm:min-h-[336px] overflow-hidden relative rounded-[20px] shadow-[0px_6px_32.4px_0px_rgba(0,0,0,0.05)] w-full p-3 sm:p-6 flex flex-col">
      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-4 flex-1">
        {/* Left Section */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          {/* Exam Header */}
          <div className="flex items-start gap-2">
            <div className="shrink-0 w-[48px] h-[48px] sm:w-[60px] sm:h-[60px] rounded-[12px] bg-white border-[0.462px] border-[#f2f2f2] flex items-center justify-center p-[4.615px]">
              <div className="w-[36px] h-[36px] sm:w-[46px] sm:h-[46px] rounded-[8px] bg-[#faf9f6] border-[0.462px] border-[#f2f2f2] flex items-center justify-center overflow-hidden">
                <Image
                  src={logo || "/images/examlo.png"}
                  alt={`${title} logo`}
                  width={46}
                  height={46}
                  className="w-[36px] h-[36px] sm:w-[46px] sm:h-[46px] rounded-[8px] object-cover"
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-1 sm:gap-2 min-w-0">
              <h3 className="font-poppins font-medium leading-[22px] sm:leading-[28px] text-[#162447] text-[16px] sm:text-[20px] tracking-[-0.4px] break-words">
                {title}
              </h3>
              <p className="font-poppins text-[10px] sm:text-[12px] leading-[13px] sm:leading-[14px] text-[#767e92] tracking-[-0.24px] break-words">
                {subtitle}
              </p>
            </div>
            {/* Mobile Status Badge and Bookmark */}
            <div className="flex lg:hidden flex-col items-end gap-2 shrink-0">
              <button
                onClick={onBookmark}
                className="bg-white border-[0.5px] border-[#767e92] flex items-center justify-center p-[6px] rounded-[27.94px] hover:bg-[#f6f7ff] transition-colors shrink-0"
                aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                <Heart
                  strokeWidth={1.5}
                  size={16}
                  fill={isBookmarked ? "#513392" : "none"}
                  className={isBookmarked ? "stroke-[#513392]" : "stroke-[#767e92]"}
                />
              </button>
              <Badge className={`${currentStatus.className} text-[10px] px-2 py-0.5 whitespace-nowrap`}>
                {currentStatus.label}
              </Badge>
            </div>
          </div>

          {/* Eligibility and College Info */}
          <div className="flex flex-col gap-2 sm:gap-[10px]">
            <div className="flex items-start gap-1">
              <VerifyIcon
                width={16}
                height={16}
                fill="#767e92"
                className="shrink-0 mt-0.5"
              />
              <p className="font-poppins text-[12px] sm:text-[16px] leading-[18px] sm:leading-[20px] text-[#767e92] break-words">
                {eligibility}
              </p>
            </div>
            <div className="flex items-start gap-1">
              <BuildingTwoIcon
                width={10}
                height={10}
                fill="#767e92"
                className="shrink-0 mt-1"
              />
              <p className="font-poppins text-[12px] sm:text-[16px] leading-[18px] sm:leading-[20px] text-[#767e92] break-words">
                {collegeCount}+ colleges accepting this exam
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="font-poppins text-[12px] sm:text-[16px] leading-[18px] sm:leading-[20px] text-[#162447] break-words">
            {stripMarkdown(description || "")}
          </p>
        </div>

        {/* Right Side: Badge/Bookmark and Dates Section */}
        <div className="w-full lg:w-[112px] shrink-0 flex flex-col gap-4">
          {/* Status Badge and Bookmark */}
          <div className="hidden lg:flex items-center justify-end gap-3">
            <Badge className={currentStatus.className}>
              {currentStatus.label}
            </Badge>
            <button
              onClick={onBookmark}
              className="bg-white border-[0.5px] border-[#767e92] flex items-center justify-center p-[6px] rounded-[27.94px] hover:bg-[#f6f7ff] transition-colors shrink-0"
              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              <Heart
                strokeWidth={1.5}
                size={16}
                fill={isBookmarked ? "#513392" : "none"}
                className={isBookmarked ? "stroke-[#513392]" : "stroke-[#767e92]"}
              />
            </button>
          </div>

          {/* Dates Section */}
          <div className="bg-[#f6f7ff] p-2 sm:p-[10px] rounded-[10px]">
            <div className="flex flex-row lg:flex-col flex-wrap gap-2 lg:gap-[14px] justify-between lg:justify-start">
              <div className="flex flex-col gap-[2px] lg:gap-[6px]">
                <p className="font-poppins text-[10px] sm:text-[11px] leading-[14px] text-[#767e92] tracking-[-0.24px] whitespace-nowrap">
                  Registration
                </p>
                <p className="font-poppins font-medium text-[11px] sm:text-[12px] leading-[16px] text-[#162447] tracking-[-0.28px] whitespace-nowrap">
                  {registrationDate}
                </p>
              </div>
              <div className="flex flex-col gap-[4px] lg:gap-[6px]">
                <p className="font-poppins text-[10px] sm:text-[11px] leading-[14px] text-[#767e92] tracking-[-0.24px] whitespace-nowrap">
                  Exam Date
                </p>
                <p className="font-poppins font-medium text-[11px] sm:text-[12px] leading-[16px] text-[#162447] tracking-[-0.28px] whitespace-nowrap">
                  {examDate}
                </p>
              </div>
              <div className="flex flex-col gap-[4px] lg:gap-[6px]">
                <p className="font-poppins text-[10px] sm:text-[11px] leading-[14px] text-[#767e92] tracking-[-0.24px] whitespace-nowrap">
                  Results
                </p>
                <p className="font-poppins font-medium text-[11px] sm:text-[12px] leading-[16px] text-[#162447] tracking-[-0.28px] whitespace-nowrap">
                  {resultsDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-[#e2e4e8] w-full"></div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-[23px] justify-between">
        <div className="flex flex-wrap items-center gap-0 md:gap-2">
          <button
            onClick={onApplicationProcess}
            className="font-poppins text-[9px] sm:text-[11px] leading-[14px] sm:leading-[16px] text-[#513392] px-1.5 py-1 sm:px-2 sm:py-1.5 tracking-[-0.24px] hover:bg-[#f6f7ff] transition-colors whitespace-nowrap cursor-pointer"
          >
            APPLICATION PROCESS
          </button>
          <button
            onClick={onExamPattern}
            className="font-poppins text-[9px] sm:text-[11px] leading-[14px] sm:leading-[16px] text-[#513392] px-1.5 py-1 sm:px-2 sm:py-1.5 tracking-[-0.24px] hover:bg-[#f6f7ff] transition-colors whitespace-nowrap cursor-pointer"
          >
            EXAM PATTERN
          </button>
          <button
            onClick={onPreparationTips}
            className="font-poppins text-[9px] sm:text-[11px] leading-[14px] sm:leading-[16px] text-[#513392] px-1.5 py-1 sm:px-2 sm:py-1.5 tracking-[-0.24px] hover:bg-[#f6f7ff] transition-colors whitespace-nowrap cursor-pointer"
          >
            PREPARATION TIPS
          </button>
          <button
            onClick={onResults}
            className="font-poppins text-[9px] sm:text-[11px] leading-[14px] sm:leading-[16px] text-[#513392] px-1.5 py-1 sm:px-2 sm:py-1.5 tracking-[-0.24px] hover:bg-[#f6f7ff] transition-colors whitespace-nowrap cursor-pointer"
          >
            RESULTS
          </button>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={onApplyNow}
          className="bg-[#513392] rounded-[30px] px-3 sm:px-4 py-1 sm:py-[5px] flex items-center justify-center gap-2 text-[13px] sm:text-[16px] leading-[18px] sm:leading-[20px] whitespace-nowrap shrink-0"
        >
          <span className="font-poppins text-[#f6f7ff]">Apply Now</span>
          <ArrowRightIcon width={20} height={20} fill="#f6f7ff" />
        </Button>
      </div>
    </article>
  );
}

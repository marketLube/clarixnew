"use client";

import React, { useState } from "react";
import { Button } from "@/components/common/Button";
import {
  ArrowRightIcon,
  BookmarkIcon,
  CalenderIcon,
} from "@/components/common/Icons";
import { Badge } from "@/components/common/badge";
import ApplyNowModal from "@/components/common/ApplyNowModal";
import { Heart } from "lucide-react";

export interface ScholarshipCardDetailedProps {
  id?: string | number;
  title?: string;
  badges?: string[];
  status?: "urgent" | "normal";
  daysLeft?: number;
  amount?: string;
  eligibility?: string;
  deadline?: string;
  isBookmarked?: boolean;
  onApplyNow?: () => void;
  onCheckEligibility?: () => void;
  onBookmark?: () => void;
}

export default function ScholarshipCardDetailed({
  title = "National Scholarship Portal Merit Scholarship",
  badges = ["Merit", "Central Govt"],
  status = "urgent",
  daysLeft = 17,
  amount = "₹ Up to 50,000 / year",
  eligibility = "For UG students with 80%+ marks in 12th standard",
  deadline = "March 31, 2025",
  isBookmarked = false,
  onApplyNow,
  onCheckEligibility,
  onBookmark,
}: ScholarshipCardDetailedProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyNow = () => {
    setIsModalOpen(true);
    onApplyNow?.();
  };

  const statusConfig = {
    urgent: {
      className: "bg-[#ff2706] text-white",
    },
    normal: {
      className: "bg-[#f6f7ff] text-[#513392] border border-[#513392]",
    },
  };

  const currentStatus = statusConfig[status];

  return (
    <article className="bg-white border-[0.5px] border-[#f2f2f2] min-h-[330px] overflow-hidden relative rounded-[20px] shadow-[0px_6px_32.4px_0px_rgba(0,0,0,0.05)] w-full p-6 flex flex-col">


      {/* Main Content */}
      <div className="flex flex-col gap-5 flex-1">
        {/* Title and Badges */}
        <div className="flex flex-col gap-[18px]">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-poppins font-medium leading-[28px] text-[#162447] text-[18px] sm:text-[20px] tracking-[-0.4px] flex-1 break-words">
              {title}
            </h3>
            <div className="flex flex-col-reverse md:flex-row items-end md:items-center gap-3 shrink-0 ">
              <Badge className={currentStatus.className}>
                {daysLeft} days left
              </Badge>
              <button
                onClick={onBookmark}
                className="bg-white border-[0.5px] border-[#767e92] flex items-center justify-center p-[6px] rounded-[27.94px] hover:bg-[#f6f7ff] transition-colors shrink-0"
                aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                <Heart
                  size={18}
                  strokeWidth={1.5}
                  fill={isBookmarked ? "#513392" : "none"}
                  className={isBookmarked ? "stroke-[#513392]" : "stroke-[#767e92]"}
                />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            {badges.map((badge, index) => (
              <Badge
                key={index}
                className="bg-[#f6f7ff]! text-[#513392]! border-0 px-4 py-[10px] rounded-[30px]"
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-[10px]">
          <p className="font-poppins text-[16px] leading-[20px] text-[#767e92]">
            Amount
          </p>
          <p className="font-poppins font-medium text-[18px] sm:text-[20px] leading-[28px] text-[#162447] tracking-[-0.4px]">
            {amount}
          </p>
        </div>

        {/* Eligibility and Deadline */}
        <div className="flex flex-col gap-2">
          <p className="font-poppins text-[16px] leading-[20px] text-[#767e92] break-words">
            {eligibility}
          </p>
          <div className="flex items-center gap-1.5">
            <CalenderIcon width={20} height={20} fill="#767e92" />
            <p className="font-poppins text-[16px] leading-[20px] text-[#767e92]">
              {deadline}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-[18px] items-stretch sm:items-center mt-6">
        <Button
          variant="primary"
          size="md"
          onClick={handleApplyNow}
          className="bg-[#513392] rounded-[30px] px-4 py-[5px] flex items-center justify-center gap-2 text-[16px] leading-[20px] whitespace-nowrap flex-1 sm:flex-none sm:w-[192px]"
        >
          <span className="font-poppins text-[#f6f7ff]">Apply Now</span>
          <ArrowRightIcon width={24} height={24} fill="#f6f7ff" />
        </Button>
        <Button
          variant="outline"
          size="md"
          onClick={onCheckEligibility}
          className="border border-[#513392] rounded-[30px] px-4 py-[5px] flex items-center justify-center gap-2 text-[16px] leading-[20px] whitespace-nowrap flex-1 sm:flex-none sm:w-[192px]"
        >
          <span className="font-poppins text-[#513392]">Check Eligibility</span>
          <ArrowRightIcon width={24} height={24} fill="#513392" />
        </Button>
      </div>

      {/* Apply Now Modal */}
      <ApplyNowModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
      />
    </article>
  );
}

"use client";

import React from "react";
import { ChevronRightIcon, ClockIcon } from "@/components/common/Icons";

export interface BlogCardDetailedProps {
  id?: string;
  imageUrl: string;
  category: string;
  readTime: string;
  title: string;
  description: string;
  className?: string;
  onReadMore?: () => void;
  onBookmark?: () => void;
}

export default function BlogCardDetailed({
  id,
  imageUrl,
  category,
  readTime,
  title,
  description,
  className = "",
  onReadMore,
  onBookmark,
}: BlogCardDetailedProps) {
  return (
    <div className="bg-white rounded-[26px] p-4 shadow-[1px_6px_41px_0px_rgba(0,0,0,0.04)] w-full max-w-[592px]">
      {/* Image */}
      <div className="h-auto md:h-[410px] rounded-[16px] overflow-hidden mb-4 md:mb-[27.575px]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-[16px]"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 md:gap-[20.681px] pb-4 md:pb-[20.681px] pr-0 md:pr-[20.681px]">
        {/* Category and Read Time */}
        <div className="flex items-end justify-between">
          <div className="bg-[#f6f7ff] border-[0.862px] border-[rgba(255,255,255,0.05)] rounded-[40px] md:rounded-[16px] px-[8px] md:px-[10.341px] py-[4px] md:py-2">
            <p className="font-poppins text-[12px] leading-[20px] text-[#513392]">
              {category}
            </p>
          </div>
          <div className="flex items-center gap-[6.894px]">
            <ClockIcon
              className="w-[14px] h-[14px] md:w-[17.234px] md:h-[17.234px]"
              fill="#767e92"
            />
            <p className="font-poppins text-[12px] md:text-[16px] leading-[20px] text-[#767e92]">
              {readTime}
            </p>
          </div>
        </div>

        {/* Title and Description */}
        <div className="flex flex-col gap-2 md:gap-[18px]">
          <h2 className="font-helvetica font-medium leading-[28px] text-[#162447] text-[16px] md:text-[24px] tracking-[-0.48px] line-clamp-2">
            {title}
          </h2>
          <p className="font-poppins text-[12px] md:text-[16px] leading-[20px] text-[#767e92]">
            {description}
          </p>
        </div>

        {/* Read More and Bookmark */}
        <div className="flex items-center justify-between">
          <button
            onClick={onReadMore}
            className="font-poppins text-[14px] leading-[20px] text-[#513392] hover:underline cursor-pointer"
          >
            Read more →
          </button>
          <button
            onClick={onBookmark}
            className="border border-[#dac9ff] rounded-[40px] p-1 hover:bg-[#f6f7ff] transition-colors cursor-pointer"
            aria-label="Bookmark"
          >
            <ChevronRightIcon
              className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
              fill="#513392"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

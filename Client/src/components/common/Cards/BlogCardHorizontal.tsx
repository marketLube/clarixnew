"use client";

import React from "react";
import Image from "next/image";
import { ChevronRightIcon, ClockIcon } from "@/components/common/Icons";

export interface BlogCardHorizontalProps {
  id: string;
  imageUrl: string;
  category: string;
  readTime: string;
  title: string;
  onReadMore?: () => void;
  onBookmark?: () => void;
}

export default function BlogCardHorizontal({
  id,
  imageUrl,
  category,
  readTime,
  title,
  onReadMore,
  onBookmark,
}: BlogCardHorizontalProps) {
  return (
    <article className="bg-white rounded-[20px] shadow-[1px_6px_41px_0px_rgba(0,0,0,0.04)] h-auto md:h-[178px] flex items-center p-3 md:pl-4 md:pr-14 md:py-4 gap-3 md:gap-0">
      {/* Image */}
      <div className="relative w-[100px] h-[100px] md:w-[145px] md:h-[145px] rounded-[12px] overflow-hidden flex-shrink-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100px, 145px"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 md:gap-2  md:gap-[21.333px] pl-1 md:pl-[21.333px] py-1 md:py-[21.333px] flex-1 min-w-0">
        {/* Category and Read Time */}
        <div className="flex items-center justify-between gap-2">
          <div className="bg-[#f6f7ff] border-[1.333px] border-[rgba(255,255,255,0.05)] rounded-[50px] px-2.5 md:px-3 py-1.5 md:py-2 flex-shrink-0">
            <p className="font-poppins text-[10px] md:text-[12px] leading-[16px] md:leading-[20px] text-[#513392] font-medium">
              {category}
            </p>
          </div>
          <div className="flex items-center gap-1 md:gap-[10.667px] flex-shrink-0">
            <ClockIcon className="w-3.5 h-3.5 md:w-[21.333px] md:h-[21.333px]" fill="#767e92" />
            <p className="font-poppins text-[10px] md:text-[16px] leading-[16px] md:leading-[20px] text-[#767e92]">
              {readTime}
            </p>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-helvetica font-medium leading-[20px] md:leading-[28px] text-[#162447] text-[14px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.48px] line-clamp-2">
          {title}
        </h3>

        {/* Read More and Bookmark */}
        <div className="flex items-center justify-between">
          <button
            onClick={onReadMore}
            className="font-poppins text-[13px] md:text-[14px] leading-[20px] text-[#513392] hover:underline font-medium cursor-pointer"
          >
            Read more →
          </button>
          <button
            onClick={onBookmark}
            className="border border-[#dac9ff] rounded-full p-1.5 md:p-1 hover:bg-[#f6f7ff] transition-colors flex items-center justify-center size-[32px] md:size-[40px] cursor-pointer"
            aria-label="Bookmark"
          >
            <ChevronRightIcon
              className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
              fill="#513392"
            />
          </button>
        </div>
      </div>
    </article>
  );
}

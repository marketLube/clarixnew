"use client";
import React, { forwardRef } from "react";

export interface StreamCardProps {
  title: string;
  description: string;
  image: string;
  className?: string;
  onClick?: () => void;
}

const StreamCard = forwardRef<HTMLDivElement, StreamCardProps>(
  ({ title, description, image, className = "", onClick }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={`shrink-0 bg-white rounded-[12px] sm:rounded-[26px] p-2 sm:p-6 shadow-[0px_6px_32.4px_0px_rgba(0,0,0,0.05)] hover:shadow-[0px_6px_32.4px_0px_rgba(0,0,0,0.08)] transition-shadow flex flex-col gap-1.5 sm:gap-6 ${onClick ? "cursor-pointer" : ""} ${className}`}
      >
        {/* Image */}
        <div className="border-[#f2f2f2] border-[0.5px] border-solid flex items-center p-[5px] rounded-[10px] w-fit">
          <div className="bg-[#faf9f6] border-[#f2f2f2] border-[0.5px] border-solid flex items-center rounded-[8px] w-8 h-8 sm:w-[55px] sm:h-[55px] justify-center text-[#513392]">
            {image && (
              <img
                src={image}
                alt={title}
                className="w-5 h-5 sm:w-[40px] sm:h-[40px] object-cover rounded-[6px]"
              />
            )}
          </div>
        </div>

        {/* Title and Description */}
        <div className="flex flex-col gap-1 sm:gap-[14px] w-full">
          <h3 className="font-helvetica text-[13px] sm:text-[24px] font-medium leading-tight sm:leading-[28px] tracking-tight sm:tracking-[-0.48px] text-[#162447] whitespace-pre-wrap">
            {title}
          </h3>
          <p className="font-poppins text-[10px] sm:text-[16px] leading-tight sm:leading-[20px] text-[#767e92]">
            {description}
          </p>
        </div>
      </div>
    );
  }
);

StreamCard.displayName = "StreamCard";

export default StreamCard;

"use client";
import React, { forwardRef } from "react";
import Image from "next/image";

export interface StreamCardProps {
  title: string;
  description: string;
  image: string;
  className?: string;
  onClick?: () => void;
}

const StreamCard = forwardRef<HTMLElement, StreamCardProps>(
  ({ title, description, image, className = "", onClick }, ref) => {
    return (
      <article
        ref={ref}
        onClick={onClick}
        className={`shrink-0 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-[0px_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0px_4px_20px_rgba(0,0,0,0.08)] transition-all flex items-center gap-3 sm:gap-4 ${onClick ? "cursor-pointer" : ""} ${className}`}
      >
        {/* Image */}
        <div className="bg-[#f5f3ff] flex items-center justify-center rounded-xl w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
          {image ? (
            <Image
              src={image}
              alt={title}
              width={32}
              height={32}
              className="w-6 h-6 sm:w-8 sm:h-8 object-cover rounded-lg"
            />
          ) : (
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#ece8f5] rounded-lg" />
          )}
        </div>

        {/* Title and Description */}
        <div className="flex flex-col gap-0.5 min-w-0">
          <h3 className="font-helvetica text-[13px] sm:text-[16px] font-semibold leading-tight text-[#162447] truncate">
            {title}
          </h3>
          <p className="font-poppins text-[11px] sm:text-[13px] leading-tight text-[#767e92]">
            {description}
          </p>
        </div>
      </article>
    );
  }
);

StreamCard.displayName = "StreamCard";

export default StreamCard;

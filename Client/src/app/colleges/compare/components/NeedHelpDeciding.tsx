"use client";

import React from "react";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import PhoneIcon from "@/components/common/Icons/PhoneIcon";

// Decorative line pattern (inline SVG data URIs instead of broken Figma asset URLs)
const imgFrame2147225322 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='595' fill='none'%3E%3Cpath d='M50 0v595' stroke='rgba(255,255,255,0.15)' stroke-width='0.5'/%3E%3C/svg%3E";
const imgFrame2147225339 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='595' fill='none'%3E%3Cpath d='M50 0v595' stroke='rgba(255,255,255,0.25)' stroke-width='0.5'/%3E%3C/svg%3E";

export default function NeedHelpDeciding() {
  const handleGetCounselling = () => {
    // TODO: Implement get free counselling functionality
  };

  return (
    <ContentWrapper className="py-6 sm:py-10">
      <div
        className="relative rounded-[20px] sm:rounded-[28px] overflow-hidden w-full"
        style={{
          background:
            "radial-gradient(ellipse at 31.1% 48.3%, rgba(107,63,202,1) 0%, rgba(77,41,156,1) 100%)",
        }}
      >
        {/* Decorative vertical lines on the sides - desktop only */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-px pointer-events-none opacity-30">
          {Array.from({ length: 21 }).map((_, index) => (
            <div
              key={index}
              className="h-[420px] w-[68px] relative shrink-0"
            >
              <div className="absolute inset-[-0.06%_-0.86%_-0.06%_-0.34%]">
                <img
                  alt=""
                  className="block max-w-none w-full h-full"
                  src={index === 18 ? imgFrame2147225339 : imgFrame2147225322}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col gap-5 sm:gap-7 items-center justify-center px-4 sm:px-8 py-8 sm:py-12">
          {/* Content wrapper */}
          <div className="flex flex-col gap-4 sm:gap-6 items-center max-w-[820px] w-full">
            {/* "Still Confused?" badge */}
            <div className="border border-white/60 rounded-full px-3 py-1 sm:px-4 sm:py-1.5">
              <p className="font-poppins text-[12px] sm:text-[13px] leading-[18px] text-white whitespace-nowrap">
                Still Confused?
              </p>
            </div>

            {/* Text content */}
            <div className="flex flex-col gap-2 sm:gap-3 items-center w-full">
              <h2 className="font-poppins font-medium text-[26px] sm:text-[40px] lg:text-[48px] leading-[30px] sm:leading-[46px] lg:leading-[54px] text-white tracking-[-0.6px] sm:tracking-[-0.96px] text-center w-full">
                Need Help Deciding?
              </h2>
              <p className="text-[13px] sm:text-[15px] leading-[19px] sm:leading-[22px] text-[rgba(255,255,255,0.75)] text-center tracking-[-0.2px] w-full max-w-[560px]">
                Let our experts guide you to the right college based on your
                goals, marks, and budget.
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="flex items-start">
            <button
              onClick={handleGetCounselling}
              className="bg-white border border-[#c6abff] rounded-full pl-5 sm:pl-6 pr-1.5 py-1.5 flex items-center gap-3 sm:gap-4 hover:opacity-90 transition-opacity cursor-pointer shadow-lg"
            >
              <p className="font-poppins font-medium text-[13px] sm:text-[15px] leading-[18px] sm:leading-[20px] text-[#513392] whitespace-nowrap tracking-[-0.2px]">
                Get Free Counselling
              </p>
              <div className="bg-[#513392] rounded-full p-2 sm:p-2.5 flex items-center shrink-0">
                <PhoneIcon width={14} height={14} className="sm:w-4 sm:h-4" fill="white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

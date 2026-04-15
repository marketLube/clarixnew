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
    <ContentWrapper className="py-12 md:py-16">
      <div
        className="relative rounded-[30px] overflow-hidden w-full"
        style={{
          background:
            "radial-gradient(ellipse at 31.1% 48.3%, rgba(107,63,202,1) 0%, rgba(77,41,156,1) 100%)",
          minHeight: "350px",
        }}
      >
        {/* Decorative vertical lines on the sides - hidden on mobile */}
        <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-px pointer-events-none opacity-30">
          {Array.from({ length: 21 }).map((_, index) => (
            <div
              key={index}
              className="h-[594.496px] w-[99.717px] relative shrink-0"
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
        <div className="relative z-10 flex flex-col gap-8 sm:gap-10 items-center justify-center px-4 md:px-8 py-10 sm:py-16 min-h-[350px] sm:min-h-[505px]">
          {/* Content wrapper */}
          <div className="flex flex-col gap-10 items-center max-w-[980px] w-full">
            {/* "Still Confused?" badge */}
            <div className="border border-[rgba(255,255,255,0.7)] rounded-[40px] px-2 py-2 sm:px-[10px] sm:py-[10px]">
              <p className="font-poppins text-[14px] sm:text-[16px] leading-[20px] text-white whitespace-nowrap">
                Still Confused?
              </p>
            </div>

            {/* Text content */}
            <div className="flex flex-col gap-9 items-center w-full">
              <h2 className="font-poppins font-medium text-[32px] sm:text-[64px] md:text-[80px] lg:text-[104px] leading-[1.1] lg:leading-[104px] text-white tracking-[-0.96px] sm:tracking-[-1.28px] md:tracking-[-1.6px] lg:tracking-[-2.08px] text-center w-full">
                Need Help Deciding?
              </h2>
              <p className="text-[16px] sm:text-[24px] leading-[22px] sm:leading-[28px] text-[rgba(255,255,255,0.7)] text-center tracking-[-0.48px] w-full max-w-[800px]">
                Let our experts guide you to the right college based on your
                goals, marks, and budget.
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="flex items-start mt-4">
            <button
              onClick={handleGetCounselling}
              className="bg-white border border-[#c6abff] rounded-[40px] pl-6 sm:pl-[38px] pr-2 sm:pr-[8px] py-1.5 sm:py-[8px] flex items-center gap-4 sm:gap-8 hover:opacity-90 transition-opacity cursor-pointer shadow-lg"
            >
              <p className="font-poppins font-medium text-[16px] sm:text-[24px] leading-[20px] sm:leading-[28px] text-[#513392] whitespace-nowrap tracking-[-0.48px]">
                Get Free Counselling
              </p>
              <div className="bg-[#513392] rounded-[40px] p-2 sm:p-[14px] flex items-center shrink-0">
                <PhoneIcon width={18} height={18} className="sm:w-[23px] sm:h-[23px]" fill="white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

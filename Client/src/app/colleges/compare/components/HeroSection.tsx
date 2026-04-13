"use client";

import React from "react";
import { ChevronLeftIcon } from "@/components/common/Icons";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import Link from "next/link";

const stats = [
  {
    value: "500+ Colleges",
    label: "To Compare",
  },
  {
    value: "NAAC & NIRF",
    label: "To Compare",
  },
  {
    value: "10K+ Students",
    label: "Helped Monthly",
  },
  {
    value: "95% Accuracy",
    label: "In Placements",
  },
];

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[350px] sm:min-h-[560px] w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(-78.2152deg, rgb(81, 51, 146) 3.742%, rgb(81, 51, 146) 54.563%, rgb(96, 61, 173) 73.073%, rgb(104, 68, 182) 76.629%, rgb(96, 61, 173) 80.506%, rgb(81, 51, 146) 96.467%)",
      }}
    >
      <ContentWrapper className="relative h-full py-10 sm:py-16">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/colleges"
            className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
          >
            <ChevronLeftIcon width={20} height={20} fill="white" />
            <span className="font-poppins text-[16px] leading-[20px] text-white">
              Back
            </span>
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="flex flex-col gap-6 max-w-[600px]">
            <h1 className="font-helvetica font-medium leading-[34px] sm:leading-[48px] text-white text-[28px] sm:text-[48px] tracking-[-0.96px]">
              Compare Colleges Side-by-Side— Instantly
            </h1>
            <p className="font-poppins text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[rgba(255,255,255,0.9)]">
              Make smarter decisions with a clean, transparent comparison of
              fees, placements, rankings, facilities, and student reviews.
            </p>
            <p className="font-poppins text-[14px] leading-[20px] text-[rgba(255,255,255,0.8)]">
              Choose up to 4 colleges and see all important details in one
              beautiful, easy-to-read table.
            </p>
          </div>

          {/* Right Statistics */}
          <div className="grid grid-cols-2 gap-3 w-full lg:w-auto lg:min-w-[340px] lg:self-end">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center text-center rounded-[50px] border border-[#ffffff] bg-[#62479D] backdrop-blur-[0.5px] py-1"
              >
                <p className="font-helvetica font-medium text-white text-[14px] leading-[22px] mb-1">
                  {stat.value}
                </p>
                <p className="font-poppins text-[10px] leading-[18px] text-[rgba(255,255,255,0.8)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}

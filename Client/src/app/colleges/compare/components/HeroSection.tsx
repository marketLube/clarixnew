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
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(-78.2152deg, rgb(81, 51, 146) 3.742%, rgb(81, 51, 146) 54.563%, rgb(96, 61, 173) 73.073%, rgb(104, 68, 182) 76.629%, rgb(96, 61, 173) 80.506%, rgb(81, 51, 146) 96.467%)",
      }}
    >
      <ContentWrapper className="relative py-6 sm:py-10">
        {/* Back Link */}
        <div className="mb-4 sm:mb-6">
          <Link
            href="/colleges"
            className="inline-flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
          >
            <ChevronLeftIcon width={16} height={16} fill="currentColor" />
            <span className="font-poppins text-[13px] sm:text-[14px] leading-[18px]">
              Back
            </span>
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 lg:gap-10">
          {/* Left Content */}
          <div className="flex flex-col gap-2 sm:gap-3 max-w-[640px]">
            <h1 className="font-poppins font-medium leading-[26px] sm:leading-[36px] text-white text-[22px] sm:text-[32px] tracking-[-0.6px]">
              Compare Colleges Side-by-Side — Instantly
            </h1>
            <p className="font-poppins text-[13px] sm:text-[14px] leading-[19px] sm:leading-[21px] text-[rgba(255,255,255,0.85)]">
              Make smarter decisions with a clean comparison of fees,
              placements, rankings, facilities, and student reviews. Choose
              up to 4 colleges in one easy-to-read table.
            </p>
          </div>

          {/* Right Statistics */}
          <div className="grid grid-cols-2 gap-2 w-full lg:w-auto lg:min-w-[300px] lg:self-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center text-center rounded-full border border-white/40 bg-white/10 backdrop-blur-[2px] py-1.5"
              >
                <p className="font-poppins font-medium text-white text-[12px] sm:text-[13px] leading-[16px]">
                  {stat.value}
                </p>
                <p className="font-poppins text-[9px] sm:text-[10px] leading-[14px] text-[rgba(255,255,255,0.75)]">
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

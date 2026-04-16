"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@/components/common/Icons";

interface BlogDetailHeroProps {
  category: string;
  date: string;
  title: string;
}

export default function BlogDetailHero({
  category,
  date,
  title,
}: BlogDetailHeroProps) {
  const router = useRouter();

  return (
    <div className="relative min-h-[300px] md:min-h-[440px] w-full overflow-hidden pb-10 md:pb-16">
      {/* Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(-78.7003deg, rgb(81, 51, 146) 3.742%, rgb(81, 51, 146) 54.563%, rgb(96, 61, 173) 73.073%, rgb(104, 68, 182) 76.629%, rgb(96, 61, 173) 80.506%, rgb(81, 51, 146) 96.467%)",
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute left-[470px] top-[136px] w-[403.928px] h-[640.54px] hidden xl:flex items-center justify-center">
        <div className="rotate-[268.07deg]">
          <div className="w-[628px] h-[383px] relative">
            {/* Decorative vector - can be replaced with actual SVG if available */}
            <div className="absolute inset-[-40.21%_-24.52%] opacity-20">
              <div className="w-full h-full bg-white/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-[-200px] top-[-68px] w-[392.668px] h-[306.309px] hidden xl:flex items-center justify-center">
        <div className="rotate-[268.07deg]">
          <div className="w-[293.579px] h-[383px] relative">
            <div className="absolute inset-[-40.21%_-52.46%] opacity-20">
              <div className="w-full h-full bg-white/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="px-4 sm:px-8 md:px-16 lg:px-[140px] pt-[80px] sm:pt-[120px] md:pt-[140px] lg:pt-[100px] ">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="hidden md:flex items-center gap-[2px] mb-8 group"
          >
            <div className="scale-y-[-100%]">
              <ChevronLeftIcon
                width={12}
                height={12}
                fill="rgba(255,255,255,0.87)"
                className="group-hover:fill-white transition-colors"
              />
            </div>
            <p className="font-poppins text-[16px] leading-[20px] text-[rgba(255,255,255,0.87)] group-hover:text-white transition-colors cursor-pointer">
              Back
            </p>
          </button>

          {/* Category, Date, and Title */}
          <div className="flex flex-col gap-6 md:gap-[40px] max-w-[900px] w-full">
            <div className="flex items-center gap-[16px]">
              <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.14)] flex items-center justify-center px-[14px] py-[10px] rounded-[50px]">
                <p className="font-poppins text-[16px] leading-[20px] text-white">
                  {category}
                </p>
              </div>
              <p className="font-poppins text-[16px] leading-[20px] text-white">
                {date}
              </p>
            </div>
            <h1 className="font-poppins font-medium leading-[1.2] text-white text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] xl:text-[48px] tracking-[-0.4px] md:tracking-[-0.6px] lg:tracking-[-0.8px] break-words">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

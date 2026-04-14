"use client";

import React from "react";
import Image from "next/image";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import Loader from "@/components/common/Loader";

// Plus icon component
const PlusIcon = ({
  width = 20,
  height = 20,
  fill = "#513392",
}: {
  width?: number;
  height?: number;
  fill?: string;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 4V16M4 10H16"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Image assets from Figma
const imgUndrawCityGirlB84P1 =
  "http://localhost:3845/assets/35bae097d0627b636e59a2ba1ca42db3f70d14de.svg";

interface NoCollegesSelectedProps {
  onLoadSample?: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export default function NoCollegesSelected({
  onLoadSample,
  isLoading = false,
  error = null,
}: NoCollegesSelectedProps) {
  const handleLoadSample = () => {
    if (onLoadSample) {
      onLoadSample();
    } else {
      // TODO: Implement load sample comparison functionality
    }
  };

  return (
    <ContentWrapper className="py-10 sm:py-16">
      <div className="flex flex-col gap-[34px] items-center w-full">
        {/* Illustration */}
        <div className="relative h-[150px] sm:h-[220px] w-[300px] sm:w-[400px] shrink-0">
          <Image
            alt="No colleges selected for comparison"
            className="object-contain"
            src="https://res.cloudinary.com/ds07e7rod/image/upload/v1770699792/undraw_city-girl_b84p_1_oyfrhp.png"
            fill
            sizes="(max-width: 640px) 300px, 400px"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-[34px] items-center w-full">
          <div className="flex flex-col gap-[24px] items-center w-full">
            <h2 className="font-poppins leading-[34px] sm:leading-[48px] text-[#162447] text-[28px] sm:text-[48px] tracking-[-0.96px] text-center">
              No Colleges Selected
            </h2>
            <p className="leading-[20px] sm:leading-[22px] text-[#767e92] text-[16px] sm:text-[20px] text-center tracking-[-0.4px] max-w-[323px]">
              Select colleges to compare their fees, placements, rankings, and
              more.
            </p>
          </div>

          {/* Load Sample Comparison Button */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={handleLoadSample}
              disabled={isLoading}
              className="border border-[#513392] flex items-center gap-[4px] px-[14px] py-[10px] rounded-[40px] hover:bg-[#513392]/5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader
                  containerClassName="py-0 flex-row gap-2"
                  size={20}
                  label="Loading..."
                />
              ) : (
                <>
                  <PlusIcon width={20} height={20} fill="#513392" />
                  <span className="font-poppins leading-[20px] text-[#513392] text-[16px] whitespace-nowrap">
                    Load Sample Comparison
                  </span>
                </>
              )}
            </button>
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center max-w-[400px]">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

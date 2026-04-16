"use client";

import React from "react";
import { motion } from "framer-motion";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import Loader from "@/components/common/Loader";

const PlusIcon = ({
  width = 18,
  height = 18,
  fill = "currentColor",
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

const SearchIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M14 14L18 18"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Custom illustration: two college cards being compared with a "VS" pill
 * between them. Uses subtle framer-motion idle animations.
 */
function CompareIllustration() {
  return (
    <div className="relative h-[150px] sm:h-[200px] w-[260px] sm:w-[360px] flex items-center justify-center">
      {/* Soft background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(81,51,146,0.08),transparent_60%)]" />

      <div className="relative flex items-center gap-3 sm:gap-5">
        {/* Card A */}
        <motion.div
          initial={{ opacity: 0, x: -12, rotate: -4 }}
          animate={{ opacity: 1, x: 0, rotate: -3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-[88px] sm:w-[120px] h-[110px] sm:h-[150px] rounded-2xl bg-white border border-[#EAE5F5] shadow-[0_8px_24px_-12px_rgba(81,51,146,0.25)] p-2.5 sm:p-3 flex flex-col gap-2"
        >
          <div className="h-[40px] sm:h-[56px] rounded-lg bg-gradient-to-br from-[#EDE5FB] to-[#D4C2F3]" />
          <div className="flex flex-col gap-1">
            <div className="h-2 rounded-full bg-[#E5E5EE] w-[80%]" />
            <div className="h-2 rounded-full bg-[#E5E5EE] w-[55%]" />
          </div>
          <div className="mt-auto flex gap-1">
            <div className="h-1.5 rounded-full bg-[#513392]/30 flex-1" />
            <div className="h-1.5 rounded-full bg-[#513392]/30 flex-1" />
          </div>
        </motion.div>

        {/* VS pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.4, ease: "backOut" }}
          className="relative z-10"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-full bg-[#513392] text-white font-poppins font-semibold text-[12px] sm:text-[14px] tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 shadow-[0_8px_20px_-6px_rgba(81,51,146,0.5)]"
          >
            VS
          </motion.div>
        </motion.div>

        {/* Card B */}
        <motion.div
          initial={{ opacity: 0, x: 12, rotate: 4 }}
          animate={{ opacity: 1, x: 0, rotate: 3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-[88px] sm:w-[120px] h-[110px] sm:h-[150px] rounded-2xl bg-white border border-[#EAE5F5] shadow-[0_8px_24px_-12px_rgba(81,51,146,0.25)] p-2.5 sm:p-3 flex flex-col gap-2"
        >
          <div className="h-[40px] sm:h-[56px] rounded-lg bg-gradient-to-br from-[#FFE3D6] to-[#F7B894]" />
          <div className="flex flex-col gap-1">
            <div className="h-2 rounded-full bg-[#E5E5EE] w-[70%]" />
            <div className="h-2 rounded-full bg-[#E5E5EE] w-[60%]" />
          </div>
          <div className="mt-auto flex gap-1">
            <div className="h-1.5 rounded-full bg-[#F7B894]/60 flex-1" />
            <div className="h-1.5 rounded-full bg-[#F7B894]/60 flex-1" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

interface NoCollegesSelectedProps {
  onLoadSample?: () => void;
  onStartComparing?: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export default function NoCollegesSelected({
  onLoadSample,
  onStartComparing,
  isLoading = false,
  error = null,
}: NoCollegesSelectedProps) {
  return (
    <ContentWrapper className="py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-5 sm:gap-7 items-center w-full"
      >
        <CompareIllustration />

        <div className="flex flex-col gap-1.5 sm:gap-2 items-center w-full text-center">
          <h2 className="font-poppins font-medium text-[#162447] text-[20px] sm:text-[28px] leading-[26px] sm:leading-[34px] tracking-[-0.6px]">
            No Colleges Selected
          </h2>
          <p className="text-[#767e92] text-[13px] sm:text-[15px] leading-[18px] sm:leading-[22px] tracking-[-0.2px] max-w-[340px]">
            Pick colleges to compare fees, placements, rankings, and more —
            side by side in seconds.
          </p>
        </div>

        <div className="flex flex-col items-center gap-2.5 w-full">
          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onStartComparing}
              className="w-full sm:w-auto bg-[#513392] hover:bg-[#3f2672] text-white font-poppins font-medium text-[14px] leading-[20px] rounded-full px-5 py-2.5 flex items-center justify-center gap-2 shadow-[0_10px_24px_-10px_rgba(81,51,146,0.55)] transition-colors cursor-pointer"
            >
              <SearchIcon size={16} />
              Start Comparing
            </button>
            <button
              onClick={onLoadSample}
              disabled={isLoading}
              className="w-full sm:w-auto border border-[#513392]/30 hover:border-[#513392] text-[#513392] font-poppins font-medium text-[14px] leading-[20px] rounded-full px-5 py-2.5 flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader
                  containerClassName="py-0 flex-row gap-2"
                  size={16}
                  label="Loading..."
                />
              ) : (
                <>
                  <PlusIcon width={16} height={16} fill="#513392" />
                  Load Sample
                </>
              )}
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-[12px] mt-1 text-center max-w-[400px]">
              {error}
            </p>
          )}
        </div>
      </motion.div>
    </ContentWrapper>
  );
}

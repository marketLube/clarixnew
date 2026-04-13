"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button";
import {
  ArrowRightIcon,
} from "@/components/common/Icons";
import Image from "next/image";
import ApplyNowModal from "@/components/common/ApplyNowModal";
import { Heart, Share2, MapPin } from "lucide-react";

type Course = {
  id?: number;
  title?: string;
  stream?: string;
  type?: string;
  [key: string]: any;
};

interface HeroSectionProps {
  course?: Course;
}

export default function HeroSection({ course }: HeroSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const courseDescription =
    "A 4-year industry-aligned program designed to build strong technical foundations, practical skills, and job-ready expertise.";

  return (
    <div
      style={{
        backgroundImage: "url('/images/coursebanner.png')",
      }}
      className="w-full min-h-[22rem] pt-[100px] pb-6 sm:pt-0 sm:pb-0 sm:min-h-0 sm:h-[28rem] md:h-[35rem] bg-cover bg-center relative flex items-end md:items-center justify-center overflow-visible"
    >
      <div className="bg-white bg-clip-padding border-[8px] border-white/30 relative md:absolute mt-auto md:mt-0 md:bottom-[-120px] rounded-[20px] shadow-[1px_6px_40.6px_0px_rgba(0,0,0,0.04)] w-[90%] max-w-5xl p-4 md:p-5 min-h-auto md:min-h-[200px] z-10 transition-all">
        {/* Top Right Actions - Hidden on mobile, shown on desktop */}
        <div className="hidden md:flex absolute right-4 top-4 gap-[8px] items-center z-10">
          <button className="bg-white border-[0.5px] border-[rgba(118,126,146,0.21)] px-[10px] py-[8px] rounded-[50px] flex items-center justify-center gap-[3px] hover:bg-gray-50 transition-colors">
            <Heart strokeWidth={1} size={14} />
            <span className="text-[#767e92] text-[14px] leading-[18px] whitespace-nowrap">
              Wishlist
            </span>
          </button>
          <button className="bg-white border-[0.5px] border-[#e2e4e8] px-[10px] py-[8px] rounded-[50px] flex items-center justify-center gap-[3px] hover:bg-gray-50 transition-colors">
            <Share2 strokeWidth={1} size={14} />
            <span className="text-[#767e92] text-[14px] leading-[18px] whitespace-nowrap">
              Share
            </span>
          </button>
        </div>



        {/* Main Content Container */}
        <div className="flex flex-col md:flex-row md:items-start gap-3 relative md:pr-[160px]">
          {/* Mobile: Image + Title Row */}
          <div className="flex items-start gap-3 md:contents">
            {/* Course Image */}
            <div className="bg-white border border-[#f2f2f2] flex flex-col items-start p-[6px] md:p-[8px] rounded-[10px] md:rounded-[14px] shrink-0 w-[80px] md:w-[110px]">
              <div className="bg-[#faf9f6] border-[#f2f2f2] border-[0.929px] flex flex-col items-start overflow-hidden rounded-[6px] md:rounded-[8px] w-full aspect-square">
                <Image
                  src="/Dummy_College_Logo.png"
                  alt="Course Image"
                  width={94}
                  height={94}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Title Section - Mobile only shows title */}
            <div className="flex-1 md:hidden">
              <h1 className="text-[#162447] text-[20px] leading-[26px] font-semibold tracking-[-0.3px]">
                {course?.name}
              </h1>
              {/* Location - Mobile */}
              <div className="flex items-center gap-1 mt-2">
                <MapPin size={14} className="text-[#767e92]" />
                <span className="text-[#767e92] text-[12px] leading-[16px]">
                  Mumbai, Maharashtra
                </span>
              </div>
            </div>
          </div>

          {/* Main Content - Desktop */}
          <div className="flex-1 flex flex-col gap-[12px] md:gap-[18px]">
            {/* Title and Description - Desktop only */}
            <div className="hidden md:flex flex-col gap-[12px]">
              <h1 className="text-[#162447] text-[20px] leading-[24px] font-medium tracking-[-0.4px]">
                {course?.name}
              </h1>
              <p className="hidden md:block text-[#767e92] text-[14px] leading-[18px] max-w-[450px]">
                {course?.shortDescription || courseDescription}
              </p>
            </div>

            {/* Description - Mobile */}
            <p className="md:hidden text-[#767e92] text-[13px] leading-[18px]">
              {course?.shortDescription || courseDescription}
            </p>







            {/* Wishlist & Share - Mobile only */}
            <div className="flex md:hidden gap-[8px] items-center">
              <button className="bg-white border-[0.5px] border-[rgba(118,126,146,0.21)] px-[12px] py-[6px] rounded-[50px] flex items-center justify-center gap-[4px] hover:bg-gray-50 transition-colors">
                <Heart strokeWidth={1.5} size={14} className="text-[#767e92]" />
                <span className="text-[#767e92] text-[13px] leading-[16px] whitespace-nowrap">
                  Wishlist
                </span>
              </button>
              <button className="bg-white border-[0.5px] border-[#e2e4e8] px-[12px] py-[6px] rounded-[50px] flex items-center justify-center gap-[4px] hover:bg-gray-50 transition-colors">
                <Share2 strokeWidth={1.5} size={14} className="text-[#767e92]" />
                <span className="text-[#767e92] text-[13px] leading-[16px] whitespace-nowrap">
                  Share
                </span>
              </button>
            </div>



            {/* Bottom Action Buttons - Mobile */}
            <div className="flex md:hidden gap-[10px] items-center mt-1">
              <Button
                variant="primary"
                size="md"
                className="flex-1 px-4 py-[10px] rounded-[24px] flex items-center justify-center gap-2 text-sm font-medium!"
                onClick={() => setIsModalOpen(true)}
              >
                <span>Apply Now</span>
                <ArrowRightIcon width={18} height={18} />
              </Button>
              <Button
                variant="outline"
                size="md"
                className="flex-1 px-4 py-[10px] rounded-[24px] border-[#513392] border-[0.5px] flex items-center justify-center gap-2 text-sm font-medium!"
              >
                <span>Add to Compare</span>
              </Button>
            </div>

            {/* Bottom Action Buttons - Desktop */}
            <div className="hidden md:flex flex-wrap gap-[12px] items-center mt-1">
              <Button
                variant="primary"
                size="md"
                className="px-4 py-[8px] rounded-[24px] flex items-center gap-4 text-sm font-light!"
                onClick={() => setIsModalOpen(true)}
              >
                <span>Apply Now</span>
                <ArrowRightIcon width={20} height={20} />
              </Button>
              <Button
                variant="outline"
                size="md"
                className="px-4 py-[8px] rounded-[24px] border-[#513392] border-[0.5px] flex items-center gap-[12px] text-sm font-light!"
              >
                <span>View Colleges</span>
                <ArrowRightIcon width={18} height={18} fill="#162447" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Now Modal */}
      <ApplyNowModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={course}
      />
    </div>
  );
}

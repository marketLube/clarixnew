"use client";

import React from "react";
import Image from "next/image";
import {
  CloseIcon,
  PlusIcon,
  LocationIcon,
  BuildingOneIcon,
  GraduationCapIcon,
  DocIcon,
  SuitCaseIcon,
  StarIcon,
} from "@/components/common/Icons";
import { College } from "../CompareView";

interface ComparisonTableProps {
  colleges: College[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onRemoveCollege: (id: string) => void;
  onAddCollege: () => void;
  onClearAll?: () => void;
}

const tabs = [
  { id: "overview", label: "Overview", icon: BuildingOneIcon },
  { id: "courses", label: "Courses & Eligibility", icon: GraduationCapIcon },
  { id: "fees", label: "Fees Structure", icon: DocIcon },
  { id: "placements", label: "Placements", icon: SuitCaseIcon },
  { id: "campus", label: "Campus & Facilities", icon: BuildingOneIcon },
  { id: "reviews", label: "Student Reviews", icon: StarIcon },
  { id: "admissions", label: "Admissions", icon: DocIcon },
];

export default function ComparisonTable({
  colleges,
  activeTab,
  onTabChange,
  onRemoveCollege,
  onAddCollege,
  onClearAll,
}: ComparisonTableProps) {
  return (
    <div className="bg-white border-[4px] sm:border-[10px_10px_0px] border-[rgba(255,255,255,0.6)] border-solid overflow-hidden relative rounded-tl-[20px] sm:rounded-tl-[30px] rounded-tr-[20px] sm:rounded-tr-[30px] shadow-[1px_6px_19.2px_0px_rgba(0,0,0,0.04)] -mt-[10px] max-w-full">
      {/* Header with Tabs and Clear All */}
      <div className="bg-white h-[66px] sm:h-[86px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] relative">
        <div className="flex items-center justify-between h-full max-w-full mx-auto px-4 md:px-8 lg:px-[140px]">
          {/* Tabs - Left aligned */}
          <div className="flex items-center gap-[6px] overflow-x-auto flex-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-[6px] px-3 py-2 md:px-5 md:py-3 rounded-[50px] border transition-all shrink-0 ${isActive
                    ? "bg-[#513392] border-[#513392] text-white"
                    : "bg-white border-[#e2e4e8] text-[#162447] hover:border-[#513392]/30"
                    }`}
                >
                  <IconComponent
                    width={18}
                    height={18}
                    className="md:w-5 md:h-5"
                    fill={isActive ? "white" : "#162447"}
                  />
                  <span className="font-poppins text-[13px] md:text-[16px] leading-[20px] whitespace-nowrap">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Clear All Button - Right aligned */}
          {onClearAll && colleges.length > 0 && (
            <button
              onClick={onClearAll}
              className="flex items-center gap-[4px] px-4 py-2.5 md:px-5 md:py-3 rounded-[120px] backdrop-blur-[10.45px] hover:opacity-80 transition-opacity ml-4 shrink-0"
            >
              <span className="font-poppins text-[13px] md:text-[16px] leading-[20px] text-[#ff2706] whitespace-nowrap">
                Clear all
              </span>
              <CloseIcon
                width={12}
                height={12}
                className="md:w-[14px] md:h-[14px]"
                fill="#ff2706"
              />
            </button>
          )}
        </div>
      </div>

      {/* Comparison Table Content */}
      <div className="w-full">
        <div className="flex items-start overflow-x-auto w-full">
          {/* Comparison Criteria Column */}
          <div className="bg-white border-r border-[#e4e3e3] h-[140px] sm:h-[170px] w-[120px] sm:w-[160px] shrink-0 flex items-start justify-center sticky left-0 z-20 shadow-[2px_0_5px_rgba(0,0,0,0.05)] sm:shadow-none">
            <p className="font-poppins font-medium text-[10px] sm:text-[14px] leading-[14px] sm:leading-[20px] text-[#767e92] text-center uppercase tracking-[-0.3px] px-2 pt-6">
              Compare
            </p>
          </div>

          {/* College Columns - Always show 4 slots */}
          {Array.from({ length: 4 }).map((_, index) => {
            const college = colleges[index];
            return (
              <div
                key={college?.id || `empty-${index}`}
                className="bg-white border-r border-[#e4e3e3] h-[140px] sm:h-[170px] w-[180px] sm:w-[240px] shrink-0 relative flex flex-col items-center justify-center"
              >
                {college ? (
                  <>
                    <div className="flex flex-col items-center justify-center w-full px-3">
                      <div className="flex items-center gap-2 md:gap-2.5 justify-center w-full">
                        {/* College Logo */}
                        {college.logo && (
                          <div className="bg-white border-[0.4px] border-[#f2f2f2] rounded-[8px] p-0.5 shrink-0">
                            <div className="bg-[#faf9f6] border-[0.4px] border-[#f2f2f2] rounded-[6px] p-0.5 overflow-hidden">
                              <div className="relative w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9">
                                <Image
                                  src={college.logo}
                                  alt={`${college.name} logo`}
                                  fill
                                  className="object-cover rounded-[6px]"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* College Info */}
                        <div className="flex flex-col items-start gap-1.5 min-w-0 flex-1">
                          <h3 className="font-poppins font-medium text-[14px] md:text-[16px] lg:text-[18px] leading-[18px] md:leading-[22px] text-[#162447] tracking-[-0.48px] text-left line-clamp-1">
                            {college.name}
                          </h3>
                          <div className="flex items-center gap-1.5 justify-start">
                            <LocationIcon
                              width={10}
                              height={10}
                              className="md:w-[11px] md:h-[11px] lg:w-[12px] lg:h-[12px] shrink-0"
                              fill="#767e92"
                            />
                            <p className="font-poppins text-[11px] md:text-[13px] lg:text-[14px] leading-[16px] md:leading-[20px] text-[#767e92] text-left line-clamp-1">
                              {college.location}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex items-center justify-center gap-1 mt-2.5 md:mt-3 flex-wrap">
                        <div className="bg-[#f6f7ff] px-2 md:px-2.5 py-1 md:py-1.5 rounded-[20px] shrink-0">
                          <p className="font-poppins text-[10px] md:text-[11px] lg:text-[12px] leading-[16px] md:leading-[18px] text-[#513392] whitespace-nowrap">
                            {college.type === "Government"
                              ? "Govt"
                              : college.type === "Deemed"
                                ? "Deemed"
                                : college.type}
                          </p>
                        </div>
                        {college.nirfRank && (
                          <div className="bg-[#f6f7ff] px-2 md:px-2.5 py-1 md:py-1.5 rounded-[20px] shrink-0">
                            <p className="font-poppins text-[10px] md:text-[11px] lg:text-[12px] leading-[16px] md:leading-[18px] text-[#513392] whitespace-nowrap">
                              NIRF {college.nirfRank}
                            </p>
                          </div>
                        )}
                        {college.naacAccreditation && (
                          <div className="bg-[#f6f7ff] px-2 md:px-2.5 py-1 md:py-1.5 rounded-[20px] shrink-0">
                            <p className="font-poppins text-[10px] md:text-[11px] lg:text-[12px] leading-[16px] md:leading-[18px] text-[#513392] whitespace-nowrap">
                              NAAC {college.naacAccreditation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={() => onRemoveCollege(college.id)}
                      className="absolute right-[8px] top-[8px] p-1.5 rounded-[20px] hover:bg-gray-100 transition-colors flex items-center justify-center"
                      aria-label={`Remove ${college.name}`}
                    >
                      <CloseIcon
                        width={8}
                        height={8}
                        className="md:w-[9px] md:h-[9px]"
                        fill="#162447"
                      />
                    </button>
                  </>
                ) : colleges.length < 4 ? (
                  <button
                    onClick={onAddCollege}
                    className="flex items-center gap-1.5 px-3 md:px-4 py-2 md:py-2.5 border border-[#162447] rounded-[30px] hover:bg-[#513392] hover:border-[#513392] group transition-all"
                  >
                    <PlusIcon
                      width={16}
                      height={16}
                      className="md:w-5 md:h-5 group-hover:fill-white transition-colors"
                      fill="#162447"
                    />
                    <span className="font-poppins text-[12px] md:text-[13px] lg:text-[14px] leading-[18px] md:leading-[20px] text-[#162447] group-hover:text-white transition-colors whitespace-nowrap">
                      Add College
                    </span>
                  </button>
                ) : (
                  <div className="text-center">
                    <p className="font-poppins text-[12px] md:text-[13px] lg:text-[14px] leading-[18px] md:leading-[20px] text-[#767e92]">
                      Max 4 colleges
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

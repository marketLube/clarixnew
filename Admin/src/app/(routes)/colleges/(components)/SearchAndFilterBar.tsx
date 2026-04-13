"use client";

import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

interface SearchAndFilterBarProps {
  activeTab: "Colleges" | "Courses";
  onTabChange: (tab: "Colleges" | "Courses") => void;
}

export function SearchAndFilterBar({
  activeTab,
  onTabChange,
}: SearchAndFilterBarProps) {
  return (
    <div className="flex items-center justify-between w-full gap-[20px]">
      <div className="flex gap-3 items-center justify-between w-2/3">
        {/* Checkbox for select all */}
        <input
          type="checkbox"
          className="w-3.5 h-3.5 border-[0.5px] border-[#a6c3b9] border-solid rounded-[3px] cursor-pointer"
        />
        <div className="flex gap-6 items-center flex-1 justify-start w-full mr-4">
          {/* Search Bar */}
          <div className="bg-white border-[0.5px] border-[#aac4bc] border-solid rounded-[14px] pl-3 pr-4 py-2 flex items-center gap-1.5 min-w-[12rem] max-w-[37rem] flex-1">
            <Search className="w-4 h-4 text-[#7f9788] flex-shrink-0" />
            <Input
              type="text"
              placeholder="Search"
              className="border-0 bg-transparent p-0 text-sm leading-4 text-[#7f9788] placeholder:text-[#7f9788] focus-visible:ring-0 focus-visible:ring-offset-0 h-auto flex-1 min-w-0"
            />
          </div>

          {/* Toggle Buttons */}
          <div className="bg-[#fafefc] border-[0.5px] border-[#aac4bc] border-solid rounded-[10px] p-[2px] flex gap-[4px]">
            <button
              onClick={() => onTabChange("Colleges")}
              className={`px-4 py-2 rounded-[9px] text-sm font-medium leading-4 transition-all ${activeTab === "Colleges"
                ? "bg-[#0dba85] text-[#f0f9f4] shadow-[1px_1px_2px_0px_rgba(13,186,133,0.29)]"
                : "bg-transparent text-[#868f8b]"
                }`}
            >
              Colleges
            </button>
            <button
              onClick={() => onTabChange("Courses")}
              className={`px-4 py-2 rounded-[9px] text-sm font-medium leading-4 transition-all ${activeTab === "Courses"
                ? "bg-[#0dba85] text-[#f0f9f4] shadow-[1px_1px_2px_0px_rgba(13,186,133,0.29)]"
                : "bg-transparent text-[#868f8b]"
                }`}
            >
              Courses
            </button>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 items-center justify-end w-1/3">
        <Button
          variant="outline"
          className="bg-[#1c1d1d] border-[#868f8b] border-[0.5px] border-solid text-white hover:bg-[#1c1d1d]/90 h-auto px-3 py-2 rounded-[10px] w-[148px] justify-between"
        >
          <span className="text-sm font-medium leading-4">All Types</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          className="bg-[#1c1d1d] border-[#868f8b] border-[0.5px] border-solid text-white hover:bg-[#1c1d1d]/90 h-auto px-3 py-2 rounded-[10px] w-[148px] justify-between"
        >
          <span className="text-sm font-medium leading-4">All Status</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}


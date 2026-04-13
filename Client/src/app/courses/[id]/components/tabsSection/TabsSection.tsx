"use client";

import { useState, useEffect } from "react";
import {
  DescriptionIcon,
  HighlightsIcon,
  KeyTakeawaysIcon,
  SyllabusIcon,
  CareerPathsIcon,
  CollegesIcon,
  ReviewsIcon,
  FAQIcon,
} from "@/components/common/Icons";

type Tab = {
  id: string;
  label: string;
  icon: React.ComponentType<{ width?: number; height?: number; fill?: string }>;
};

const TABS: Tab[] = [
  { id: "description", label: "Description", icon: DescriptionIcon },
  { id: "highlights", label: "View Highlights", icon: HighlightsIcon },
  { id: "takeaways", label: "Key Takeaways", icon: KeyTakeawaysIcon },
  { id: "syllabus", label: "Course Syllabus", icon: SyllabusIcon },
  { id: "career", label: "Career Paths", icon: CareerPathsIcon },
  { id: "colleges", label: "Colleges", icon: CollegesIcon },
  { id: "faq", label: "FAQ", icon: FAQIcon },
];

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-150px 0px -70% 0px", // Adjust based on sticky header height
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    TABS.forEach((tab) => {
      const element = document.getElementById(tab.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleTabClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Height of sticky tabs + safety margin
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setActiveTab(id);
  };

  return (
    <div className="bg-white w-full py-4 sticky top-0 z-[40] shadow-sm mt-0 md:mt-[150px]">
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center md:justify-center gap-[12px] md:gap-[18px] min-w-max py-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            const iconFill = isActive ? "#FFFFFF" : "#767E92";
            const textColor = isActive ? "text-white" : "text-[#767e92]";

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-[4px] px-[12px] py-[8px] rounded-[50px] border-[0.5px] transition-all whitespace-nowrap ${isActive
                  ? "bg-[#513392] border-[#dac9ff]"
                  : "bg-white border-[#e2e4e8] hover:bg-gray-50"
                  }`}
              >
                <Icon width={18} height={18} fill={iconFill} />
                <span
                  className={`text-[13px] md:text-[14px] leading-[20px] ${textColor}`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

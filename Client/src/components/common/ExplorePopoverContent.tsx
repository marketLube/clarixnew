"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "./Icons";
import Image from "next/image";
import Link from "next/link";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ width?: number; height?: number; fill?: string }>;
  iconWidth: number;
  iconHeight: number;
}

interface ContentColumn {
  title: string;
  items: string[];
  values?: string[];
  width?: string;
}

interface ContentSection {
  columns: ContentColumn[];
}

interface ExplorePopoverContentProps {
  navItems: NavItem[];
  contentSections: ContentSection[];
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  getIsActive: (index: number) => boolean;
  activeContentIndex: number;
}

function getItemHref(
  activeContentIndex: number,
  columnIndex: number,
  value: string
): string {
  const encoded = encodeURIComponent(value);

  switch (activeContentIndex) {
    case 0: // Colleges
      if (columnIndex === 0) return `/colleges?stream=${encoded}`;
      if (columnIndex === 1) return `/colleges?city=${encoded}`;
      if (columnIndex === 2) return `/colleges?ranking=${encoded}`;
      if (columnIndex === 3) return `/colleges?ownership=${encoded}`;
      return "/colleges";
    case 1: // Courses
      if (columnIndex === 0) return `/courses?degree=${encoded}`;
      if (columnIndex === 1) return `/courses?stream=${encoded}`;
      if (columnIndex === 2) return `/courses?search=${encoded}`;
      return "/courses";
    case 2: // Exams
      if (columnIndex === 0) return `/exams?stream=${encoded}`;
      if (columnIndex === 1) return `/exams?search=${encoded}`;
      return "/exams";
    case 3: // Scholarships
      if (columnIndex === 0) return `/scholarships?type=${encoded}`;
      if (columnIndex === 1) return `/scholarships?search=${encoded}`;
      return "/scholarships";
    case 4: { // Jobs & Internships
      // Map specific items to jobType filter; everything else uses search
      const jobTypeMap: Record<string, string> = {
        Internships: "Internship",
        "Full Time": "Full Time",
        "Part Time": "Part Time",
        Contract: "Contract",
        Freelance: "Freelance",
      };
      const mappedJobType = jobTypeMap[value];
      if (mappedJobType) return `/jobs-internships?jobType=${encodeURIComponent(mappedJobType)}`;
      return `/jobs-internships?search=${encoded}`;
    }
    default:
      return "/";
  }
}

export default function ExplorePopoverContent({
  navItems,
  contentSections,
  hoveredIndex,
  setHoveredIndex,
  selectedIndex,
  setSelectedIndex,
  getIsActive,
  activeContentIndex,
}: ExplorePopoverContentProps) {
  const router = useRouter();

  // Eagerly prefetch main routes so navigation is instant
  useEffect(() => {
    const routes = ["/colleges", "/courses", "/exams", "/scholarships", "/jobs-internships", "/colleges/compare"];
    routes.forEach((route) => router.prefetch(route));
  }, [router]);

  return (
    <div
      className="flex w-[996px] h-[513px] bg-white rounded-[20px] shadow-[0px_0px_27.7px_1px_rgba(0,0,0,0.15)] overflow-hidden"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Left Sidebar */}
      <div className="w-[253px] h-full bg-[#513392] flex flex-col items-start px-[22px] pt-10 relative">
        {/* Navigation Items */}
        <div className="flex flex-col gap-0 w-[209px]">
          {navItems.map((item, index) => {
            const isActive = getIsActive(index);
            const IconComponent = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                onClick={(e) => {
                  // Prevent navigation on hover-select; only navigate on deliberate click
                  if (selectedIndex !== index) {
                    e.preventDefault();
                    setSelectedIndex(index);
                    setHoveredIndex(null);
                  }
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => {
                  // Don't reset hover here - let it persist when moving to right side
                }}
                className="h-[46px] w-full flex items-center justify-start gap-[6px] transition-all duration-200 cursor-pointer no-underline rounded-[6px]"
                style={{
                  backgroundColor: isActive ? "white" : "transparent",
                  paddingLeft: "14px",
                  paddingRight: isActive ? "16px" : undefined,
                  boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.08)" : undefined,
                }}
              >
                <IconComponent
                  width={item.iconWidth}
                  height={item.iconHeight}
                  fill={isActive ? "#162447" : "white"}
                />
                <span
                  className="text-[14px] font-medium leading-5 font-poppins transition-colors duration-200"
                  style={{
                    color: isActive ? "#162447" : "white",
                    flex: isActive ? 1 : undefined,
                  }}
                >
                  {item.label}
                </span>
                {isActive && (
                  <ChevronRightIcon width={18} height={18} fill="#162447" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Social Media Links */}
        <div className="absolute bottom-[38px] left-1/2 -translate-x-1/2 flex flex-col gap-3 items-center w-[188px]">
          <p className="text-white text-[14px] font-medium leading-5 font-poppins w-full">
            Follow More
          </p>
          <div className="flex gap-[22px] items-center w-full">
            <a
              href="https://www.facebook.com/profile.php?id=61582068009039"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-5 h-5 flex items-center justify-center"
            >
              <Image
                src="/icon/facebook.svg"
                alt="Facebook"
                width={20}
                height={20}
              />
            </a>
            <a
              href="https://www.instagram.com/clarixeducation"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-5 h-5 flex items-center justify-center"
            >
              <Image
                src="/icon/instagram.svg"
                alt="Instagram"
                width={20}
                height={20}
              />
            </a>
            <a
              href="https://www.linkedin.com/company/clarixeducation"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-5 h-5 flex items-center justify-center"
            >
              <Image
                src="/icon/linked.svg"
                alt="LinkedIn"
                width={20}
                height={20}
              />
            </a>
            <a
              href="https://www.youtube.com/@ClarixEducation"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-5 h-5 flex items-center justify-center"
            >
              <Image
                src="/icon/youtube.svg"
                alt="YouTube"
                width={20}
                height={20}
              />
            </a>
            <a
              href="https://twitter.com/clarixeducation"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-5 h-5 flex items-center justify-center"
            >
              <Image
                src="/icon/twitter.svg"
                alt="Twitter"
                width={20}
                height={20}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 h-full bg-[#fcfcfc] rounded-tr-[20px] rounded-br-[20px] px-[26px] pt-10">
        {contentSections[activeContentIndex] && (
          <div className="flex gap-5 items-start">
            {contentSections[activeContentIndex].columns.map(
              (column, columnIndex) => {
                const columnWidth = column.width || "w-[217px]";

                // Special handling for Colleges section (By Rankings and By Ownership in same column)
                if (
                  contentSections[activeContentIndex].columns.length === 4 &&
                  columnIndex === 2 &&
                  column.title === "By Rankings"
                ) {
                  const ownershipColumn = contentSections[activeContentIndex].columns[3];
                  return (
                    <div
                      key={columnIndex}
                      className="flex flex-col gap-10 w-[217px]"
                    >
                      <div className={`flex flex-col gap-2 ${columnWidth}`}>
                        <h3 className="text-[#162447] text-base font-medium leading-5 uppercase font-poppins">
                          {column.title}
                        </h3>
                        <div className="flex flex-col gap-1">
                          {column.items.map((item, itemIndex) => {
                            const value = column.values ? column.values[itemIndex] : item;
                            const href = getItemHref(activeContentIndex, columnIndex, value);
                            return (
                              <Link
                                key={itemIndex}
                                href={href}
                                prefetch={true}
                                className="group flex items-center justify-between px-2 py-[5px] rounded-[6px] transition-all duration-300 ease-in-out hover:translate-x-1 text-[#767e92] text-[15px] leading-5 hover:bg-[#f6f7ff] hover:text-[#513392] no-underline"
                              >
                                <span>{item}</span>
                                <ChevronRightIcon
                                  width={14}
                                  height={14}
                                  fill="#513392"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                                />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                      {ownershipColumn && (
                        <div
                          className={`flex flex-col gap-2 ${ownershipColumn.width || "w-[217px]"}`}
                        >
                          <h3 className="text-[#162447] text-base font-medium leading-5 uppercase font-poppins">
                            {ownershipColumn.title}
                          </h3>
                          <div className="flex flex-col gap-1">
                            {ownershipColumn.items.map((item, itemIndex) => {
                              const value = ownershipColumn.values ? ownershipColumn.values[itemIndex] : item;
                              const href = getItemHref(activeContentIndex, 3, value);
                              return (
                                <Link
                                  key={itemIndex}
                                  href={href}
                                  prefetch={true}
                                  className="group flex items-center justify-between px-2 py-[5px] rounded-[6px] transition-all duration-300 ease-in-out hover:translate-x-1 text-[#767e92] text-[15px] leading-5 hover:bg-[#f6f7ff] hover:text-[#513392] no-underline"
                                >
                                  <span>{item}</span>
                                  <ChevronRightIcon
                                    width={14}
                                    height={14}
                                    fill="#513392"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                                  />
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                // Skip the 4th column if it's the Colleges section (already rendered above)
                if (
                  contentSections[activeContentIndex].columns.length === 4 &&
                  columnIndex === 3 &&
                  contentSections[activeContentIndex].columns[2]?.title ===
                  "By Rankings"
                ) {
                  return null;
                }

                return (
                  <div
                    key={columnIndex}
                    className={`flex flex-col gap-2 ${columnWidth}`}
                  >
                    <h3 className="text-[#162447] text-base font-medium leading-5 uppercase font-poppins">
                      {column.title}
                    </h3>
                    <div className="flex flex-col gap-1">
                      {column.items.map((item, itemIndex) => {
                        const value = column.values ? column.values[itemIndex] : item;
                        const href = getItemHref(activeContentIndex, columnIndex, value);
                        return (
                          <Link
                            key={itemIndex}
                            href={href}
                            prefetch={true}
                            className="group flex items-center justify-between px-2 py-[5px] rounded-[6px] transition-all duration-300 ease-in-out hover:translate-x-1 text-[#767e92] text-[15px] leading-5 hover:bg-[#f6f7ff] hover:text-[#513392] no-underline"
                          >
                            <span>{item}</span>
                            <ChevronRightIcon
                              width={14}
                              height={14}
                              fill="#513392"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
}

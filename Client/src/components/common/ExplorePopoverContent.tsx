"use client";

import { ChevronRightIcon } from "./Icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

  const handleItemClick = (item: string, columnIndex: number) => {
    let url = "/";
    switch (activeContentIndex) {
      case 0: // Colleges
        if (columnIndex === 0) url = `/colleges?stream=${encodeURIComponent(item)}`;
        else if (columnIndex === 1) url = `/colleges?city=${encodeURIComponent(item)}`;
        else url = "/colleges";
        break;
      case 1: // Courses
        if (columnIndex === 1) url = `/courses?stream=${encodeURIComponent(item)}`;
        else url = "/courses";
        break;
      case 2: // Exams
        if (columnIndex === 0) url = `/exams?stream=${encodeURIComponent(item)}`;
        else url = "/exams";
        break;
      case 3: // Scholarships
        url = "/scholarships";
        break;
      case 4: // Jobs
        url = "/jobs-internships";
        break;
    }
    router.push(url);
  };

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
              <div
                key={item.href}
                onClick={() => {
                  setSelectedIndex(index);
                  setHoveredIndex(null); // Reset hover when clicking
                  router.push(item.href);
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => {
                  // Don't reset hover here - let it persist when moving to right side
                }}
                className={`h-[46px] w-full flex items-center justify-start gap-[6px] transition-colors cursor-pointer ${isActive
                    ? "bg-[#f6f7ff] rounded-[6px] pl-[14px] pr-[16px]"
                    : "pl-[14px] rounded-[6px]"
                  }`}
              >
                <IconComponent
                  width={item.iconWidth}
                  height={item.iconHeight}
                  fill={isActive ? "#162447" : "white"}
                />
                <span
                  className={`text-[14px] font-medium leading-5 font-helvetica ${isActive ? "text-[#162447] flex-1" : "text-white"
                    }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <ChevronRightIcon width={18} height={18} fill="#162447" />
                )}
              </div>
            );
          })}
        </div>

        {/* Social Media Links */}
        <div className="absolute bottom-[38px] left-1/2 -translate-x-1/2 flex flex-col gap-3 items-center w-[188px]">
          <p className="text-white text-[14px] font-medium leading-5 font-helvetica w-full">
            Follow More
          </p>
          <div className="flex gap-[22px] items-center w-full">
            <a
              href="#"
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
              href="#"
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
              href="#"
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
              href="#"
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
              href="#"
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
                  return (
                    <div
                      key={columnIndex}
                      className="flex flex-col gap-10 w-[217px]"
                    >
                      <div className={`flex flex-col gap-2 ${columnWidth}`}>
                        <h3 className="text-[#162447] text-base font-medium leading-5 uppercase font-helvetica">
                          {column.title}
                        </h3>
                        <div className="flex flex-col gap-1">
                          {column.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              onClick={() => handleItemClick(column.values ? column.values[itemIndex] : item, columnIndex)}
                              className="group flex items-center justify-between px-2 py-[5px] rounded-[6px] transition-all duration-300 ease-in-out cursor-pointer hover:translate-x-1 text-[#767e92] text-[15px] leading-5 hover:bg-[#f6f7ff] hover:text-[#513392]"
                            >
                              <span>{item}</span>
                              <ChevronRightIcon
                                width={14}
                                height={14}
                                fill="#513392"
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      {contentSections[activeContentIndex].columns[3] && (
                        <div
                          className={`flex flex-col gap-2 ${contentSections[activeContentIndex].columns[3]
                              .width || "w-[217px]"
                            }`}
                        >
                          <h3 className="text-[#162447] text-base font-medium leading-5 uppercase font-helvetica">
                            {
                              contentSections[activeContentIndex].columns[3]
                                .title
                            }
                          </h3>
                          <div className="flex flex-col gap-1">
                            {contentSections[
                              activeContentIndex
                            ].columns[3].items.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                onClick={() => handleItemClick(contentSections[activeContentIndex].columns[3].values ? contentSections[activeContentIndex].columns[3].values[itemIndex] : item, 3)}
                                className="group flex items-center justify-between px-2 py-[5px] rounded-[6px] transition-all duration-300 ease-in-out cursor-pointer hover:translate-x-1 text-[#767e92] text-[15px] leading-5 hover:bg-[#f6f7ff] hover:text-[#513392]"
                              >
                                <span>{item}</span>
                                <ChevronRightIcon
                                  width={14}
                                  height={14}
                                  fill="#513392"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                                />
                              </div>
                            ))}
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
                    <h3 className="text-[#162447] text-base font-medium leading-5 uppercase font-helvetica">
                      {column.title}
                    </h3>
                    <div className="flex flex-col gap-1">
                      {column.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          onClick={() => handleItemClick(column.values ? column.values[itemIndex] : item, columnIndex)}
                          className="group flex items-center justify-between px-2 py-[5px] rounded-[6px] transition-all duration-300 ease-in-out cursor-pointer hover:translate-x-1 text-[#767e92] text-[15px] leading-5 hover:bg-[#f6f7ff] hover:text-[#513392]"
                        >
                          <span>{item}</span>
                          <ChevronRightIcon
                            width={14}
                            height={14}
                            fill="#513392"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                      ))}
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

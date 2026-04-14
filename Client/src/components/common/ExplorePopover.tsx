"use client";

import Link from "next/link";
import { Popover } from "antd";
import { ReactNode, useState } from "react";
import {
  BuildingOneIcon,
  BookIcon,
  BusinessSuitCaseIcon,
  ChevronRightIcon,
  DocIcon,
  FundingIcon,
  OpenBookIcon,
} from "./Icons";
import Image from "next/image";
import ExplorePopoverContent from "./ExplorePopoverContent";
import {
  collegesContent,
  coursesContent,
  examsContent,
  scholarshipsContent,
  jobsInternshipsContent,
} from "@/app/utilities/DummyData";
import { useStreams } from "@/hooks/stream/useStreams";
import { useCmsHomepage } from "@/hooks/cms/useCmsHomepage";
import { useExams } from "@/hooks/exam/useExams";
import { useCourses } from "@/hooks/course/useCourses";
import { useScholarships } from "@/hooks/scholarship/useScholarships";

interface ExplorePopoverProps {
  children: ReactNode;
  className?: string;
}

// Social Media Icons

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ width?: number; height?: number; fill?: string }>;
  iconWidth: number;
  iconHeight: number;
}

const navItems: NavItem[] = [
  {
    href: "/colleges",
    label: "Colleges",
    icon: BuildingOneIcon,
    iconWidth: 16,
    iconHeight: 16,
  },
  {
    href: "/courses",
    label: "Courses",
    icon: OpenBookIcon,
    iconWidth: 16,
    iconHeight: 16,
  },
  {
    href: "/exams",
    label: "Exams",
    icon: DocIcon,
    iconWidth: 16,
    iconHeight: 16,
  },
  {
    href: "/scholarships",
    label: "Scholarships",
    icon: FundingIcon,
    iconWidth: 16,
    iconHeight: 16,
  },
  {
    href: "/jobs-internships",
    label: "Jobs & Internships",
    icon: BusinessSuitCaseIcon,
    iconWidth: 16,
    iconHeight: 16,
  },
];

interface ContentColumn {
  title: string;
  items: string[];
  values?: string[];
  width?: string;
}

interface ContentSection {
  columns: ContentColumn[];
}

// Reusable Column Component
const ContentColumn = ({ column }: { column: ContentColumn }) => {
  const columnWidth = column.width || "w-[217px]";

  return (
    <div className={`flex flex-col gap-[26px] ${columnWidth}`}>
      <h3 className="text-[#162447] text-base font-medium leading-5 uppercase font-poppins">
        {column.title}
      </h3>
      <div className="flex flex-col gap-2 text-[#767e92] text-base leading-5">
        {column.items.map((item, index) => (
          <span key={index} className="hover:text-[#513392] transition-colors">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

// Reusable Content Section Component
const ContentSection = ({ section }: { section: ContentSection }) => {
  // Special handling for Colleges section (By Rankings and By Ownership in same column)
  if (
    section.columns.length === 4 &&
    section.columns[2].title === "By Rankings"
  ) {
    return (
      <div className="flex gap-5 items-start">
        <ContentColumn column={section.columns[0]} />
        <ContentColumn column={section.columns[1]} />
        <div className="flex flex-col gap-10 w-[217px]">
          <ContentColumn column={section.columns[2]} />
          <ContentColumn column={section.columns[3]} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-5 items-start">
      {section.columns.map((column, index) => (
        <ContentColumn key={index} column={column} />
      ))}
    </div>
  );
};

export default function ExplorePopover({
  children,
  className,
}: ExplorePopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0); // Default to first item

  const { data: streamsData } = useStreams();
  const { location } = useCmsHomepage();
  const { data: examsData } = useExams(1, 12);
  const { courses: coursesData } = useCourses({ limit: 12 });
  const { scholarships: scholarshipsData } = useScholarships({ limit: 12 });

  const streams = streamsData?.data?.streams ?? [];
  const cities = location?.items?.filter(i => i.isActive).map(i => i.name as string) ?? [];
  const exams = examsData?.data?.exams ?? [];
  const courses = coursesData ?? [];
  const scholarships = scholarshipsData ?? [];

  // Active if hovered, or if it's the selected item and not hovering any other item
  const getIsActive = (index: number) => {
    return (
      hoveredIndex === index ||
      (hoveredIndex === null && index === selectedIndex)
    );
  };

  // Determine which content to show: hovered item if hovering, otherwise selected item
  const activeContentIndex =
    hoveredIndex !== null ? hoveredIndex : selectedIndex;

  const dynamicContentSections = [
    // Colleges (Index 0)
    {
      columns: [
        {
          title: "By Stream",
          items: streams.length > 0 ? streams.slice(0, 11).map(s => s.name) : collegesContent.columns[0].items,
          values: streams.length > 0 ? streams.slice(0, 11).map(s => s._id as string) : collegesContent.columns[0].items,
        },
        {
          title: "By Location",
          items: cities.length > 0 ? cities.slice(0, 12) : collegesContent.columns[1].items,
        },
        {
          title: "By Rankings",
          items: collegesContent.columns[2].items,
        },
        {
          title: "By Ownership",
          items: collegesContent.columns[3].items,
          width: "w-[124px]",
        },
      ],
    },
    // Courses (Index 1)
    {
      columns: [
        {
          title: "By Degree",
          items: coursesContent.columns[0].items,
        },
        {
          title: "By Stream",
          items: streams.length > 0 ? streams.slice(0, 6).map(s => s.name) : coursesContent.columns[1].items,
          values: streams.length > 0 ? streams.slice(0, 6).map(s => s._id as string) : coursesContent.columns[1].items,
        },
        {
          title: "Popular Courses",
          items: courses.length > 0 ? courses.slice(0, 12).map(c => c.name) : coursesContent.columns[2].items,
        },
      ],
    },
    // Exams (Index 2)
    {
      columns: [
        {
          title: "By Category",
          items: streams.length > 0 ? streams.slice(0, 5).map(s => s.name) : examsContent.columns[0].items,
          values: streams.length > 0 ? streams.slice(0, 5).map(s => s._id as string) : examsContent.columns[0].items,
        },
        {
          title: "Popular Exams",
          items: exams.length > 0 ? exams.slice(0, 10).map(e => e.shortName) : examsContent.columns[1].items,
        },
      ],
    },
    // Scholarships (Index 3)
    {
      columns: [
        {
          title: "By Type",
          items: scholarships.length > 0 ? Array.from(new Set(scholarships.map(s => s.scholarshipType))).slice(0, 10) : scholarshipsContent.columns[0].items,
        },
        {
          title: "Popular Scholarships",
          items: scholarships.length > 0 ? scholarships.slice(0, 10).map(s => s.scholarshipName) : scholarshipsContent.columns[1].items,
        },
      ],
    },
    // Jobs & Internships (Index 4)
    jobsInternshipsContent,
  ];

  const explorePopoverContent = (
    <ExplorePopoverContent
      navItems={navItems}
      contentSections={dynamicContentSections}
      hoveredIndex={hoveredIndex}
      setHoveredIndex={setHoveredIndex}
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
      getIsActive={getIsActive}
      activeContentIndex={activeContentIndex}
    />
  );

  return (
    <div className={className}>
      <Popover
        content={explorePopoverContent}
        trigger="hover"
        placement="bottomLeft"
        overlayClassName="explore-popover-wrapper"
        mouseEnterDelay={0.15}
        mouseLeaveDelay={0.15}
        overlayStyle={{ padding: 0, margin: 0 }}
        rootClassName="explore-popover-root"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div role="button" tabIndex={0} aria-expanded={isOpen} className="cursor-pointer">
          {children}
        </div>
      </Popover>
    </div>
  );
}

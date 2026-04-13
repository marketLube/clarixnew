"use client";

import React, { useState } from "react";
import {
  BuildingOneIcon,
  GraduationCapIcon,
  DocIcon,
  SuitCaseIcon,
  StarIcon,
  PhoneIcon,
  MailIcon,
  ChevronDownIcon,
} from "@/components/common/Icons";
import { College } from "../CompareView";

interface ComparisonSectionsProps {
  colleges: College[];
  activeTab: string;
}

interface SectionConfig {
  id: string;
  title: string;
  icon: React.ComponentType<{ width?: number; height?: number; fill?: string }>;
  rows: {
    label: string;
    getValue: (college: College) => React.ReactNode;
    height?: string;
  }[];
}

export default function ComparisonSections({
  colleges,
  activeTab,
}: ComparisonSectionsProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["overview"])
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const getSectionsConfig = (): SectionConfig[] => {
    return [
      {
        id: "overview",
        title: "Overview",
        icon: BuildingOneIcon,
        rows: [
          {
            label: "College Name",
            getValue: (college) => (
              <p className="font-helvetica font-medium text-[16px] sm:text-[20px] leading-[20px] sm:leading-[24px] text-[#162447] tracking-[-0.4px]">
                {college.name}
              </p>
            ),
          },
          {
            label: "Type",
            getValue: (college) => (
              <p className="font-poppins text-[14px] sm:text-[16px] leading-[18px] sm:leading-[20px] text-[#162447]">
                {college.type}
              </p>
            ),
          },
          {
            label: "Established Year",
            getValue: (college) => (
              <p className="font-poppins text-[14px] sm:text-[16px] leading-[18px] sm:leading-[20px] text-[#162447]">
                {college.establishedYear}
              </p>
            ),
          },
          {
            label: "NAAC Accreditation",
            getValue: (college) => (
              <p className="font-poppins text-[14px] sm:text-[16px] leading-[18px] sm:leading-[20px] text-[#162447]">
                {college.naacAccreditation}
              </p>
            ),
          },
          {
            label: "NIRF Rank",
            getValue: (college) => (
              <p className="font-poppins text-[14px] sm:text-[16px] leading-[18px] sm:leading-[20px] text-[#162447]">
                {college.nirfRank}
              </p>
            ),
          },
          {
            label: "College Category",
            getValue: (college) => (
              <p className="font-poppins text-[14px] sm:text-[16px] leading-[18px] sm:leading-[20px] text-[#162447]">
                {college.category}
              </p>
            ),
          },
        ],
      },
      {
        id: "courses",
        title: "Courses & Eligibility",
        icon: GraduationCapIcon,
        rows: [
          {
            label: "Popular Courses",
            getValue: (college) => (
              <ul className="list-disc list-inside font-poppins text-[16px] leading-[20px] text-[#162447]">
                {college.popularCourses.map((course, idx) => (
                  <li key={idx}>{course}</li>
                ))}
              </ul>
            ),
          },
          {
            label: "Entrance Exams",
            getValue: (college) => (
              <div className="flex gap-[7px] flex-wrap">
                {college.entranceExams.map((exam, idx) => (
                  <div
                    key={idx}
                    className="bg-[#f6f7ff] px-[10px] py-[10px] rounded-[20px]"
                  >
                    <p className="font-poppins text-[16px] leading-[20px] text-[#513392]">
                      {exam}
                    </p>
                  </div>
                ))}
              </div>
            ),
          },
          {
            label: "Eligibility",
            getValue: (college) => (
              <p className="font-poppins text-[16px] leading-[20px] text-[#162447]">
                {college.eligibility}
              </p>
            ),
          },
          {
            label: "Course Duration",
            getValue: (college) => (
              <p className="font-poppins text-[16px] leading-[20px] text-[#162447]">
                {college.courseDuration}
              </p>
            ),
          },
          {
            label: "Course Type",
            getValue: (college) => (
              <p className="font-poppins text-[16px] leading-[20px] text-[#162447]">
                {college.courseType}
              </p>
            ),
          },
          {
            label: "College Category",
            getValue: (college) => (
              <p className="font-poppins text-[16px] leading-[20px] text-[#162447]">
                {college.category}
              </p>
            ),
          },
        ],
      },
      {
        id: "fees",
        title: "Fees Structure",
        icon: DocIcon,
        rows: [
          {
            label: "Tuition Fee (Per Year)",
            getValue: (college) => (
              <p className="font-poppins font-medium text-[16px] leading-[20px] text-[#162447]">
                {college.tuitionFee}
              </p>
            ),
          },
          {
            label: "Hostel Fee",
            getValue: (college) => (
              <p className="font-poppins text-[16px] leading-[20px] text-[#162447]">
                {college.hostelFee}
              </p>
            ),
          },
          {
            label: "Registration Fee",
            getValue: (college) => (
              <p className="font-poppins text-[16px] leading-[20px] text-[#162447]">
                {college.registrationFee}
              </p>
            ),
          },
          {
            label: "Exam Fee",
            getValue: (college) => (
              <p className="font-poppins text-[16px] leading-[20px] text-[#162447]">
                {college.examFee}
              </p>
            ),
          },
          {
            label: "Estimated Total Cost",
            getValue: (college) => (
              <p className="font-poppins font-medium text-[16px] leading-[20px] text-[#162447]">
                {college.estimatedTotalCost}
              </p>
            ),
          },
          {
            label: "Scholarships Available",
            getValue: (college) => (
              <ul className="list-disc list-inside font-poppins text-[16px] leading-[20px] text-[#513392]">
                {college.scholarships.map((scholarship, idx) => (
                  <li key={idx}>{scholarship}</li>
                ))}
              </ul>
            ),
          },
        ],
      },
      {
        id: "placements",
        title: "Placements",
        icon: SuitCaseIcon,
        rows: [
          {
            label: "Average Package",
            getValue: (college) => (
              <p className="font-poppins font-medium text-[16px] leading-[20px] text-[#162447]">
                {college.avgPackage}
              </p>
            ),
          },
          {
            label: "Highest Package",
            getValue: (college) => (
              <p className="font-poppins font-medium text-[16px] leading-[20px] text-[#162447]">
                {college.highestPackage}
              </p>
            ),
          },
          {
            label: "Top Recruiters",
            getValue: (college) => (
              <p className="font-poppins text-[16px] leading-[20px] text-[#513392]">
                {college.topRecruiters.join("/")}
              </p>
            ),
          },
          {
            label: "Placement Rate",
            getValue: (college) => (
              <div className="w-full max-w-[280px]">
                <div className="bg-[#f5f5f5] h-[8px] rounded-[20px] overflow-hidden">
                  <div
                    className="bg-[#00d647] h-[8px] rounded-[20px]"
                    style={{ width: `${college.placementRate}%` }}
                  />
                </div>
              </div>
            ),
          },
          {
            label: "Internship Opportunities",
            getValue: (college) => (
              <p className="font-poppins font-medium text-[16px] leading-[20px] text-[#162447]">
                {college.internshipOpportunities}
              </p>
            ),
          },
          {
            label: "Alumni Network",
            getValue: (college) => (
              <p className="font-poppins font-medium text-[16px] leading-[20px] text-[#162447]">
                {college.alumniNetwork}
              </p>
            ),
          },
        ],
      },
      {
        id: "campus",
        title: "Campus & Facilities",
        icon: BuildingOneIcon,
        rows: [
          {
            label: "Campus Size",
            getValue: (college) => (
              <p className="font-poppins font-medium text-[16px] leading-[20px] text-[#162447]">
                {college.campusSize}
              </p>
            ),
          },
          {
            label: "Library & Labs",
            getValue: (college) => (
              <p className="font-poppins text-[16px] leading-[20px] text-[#162447]">
                {college.libraryLabs}
              </p>
            ),
          },
          {
            label: "Hostel Facilities",
            getValue: (college) => (
              <p className="font-poppins text-[16px] leading-[20px] text-[#162447]">
                {college.hostelFacilities}
              </p>
            ),
          },
          {
            label: "Sports & Recreation",
            getValue: (college) => (
              <p className="font-poppins text-[16px] leading-[20px] text-[#162447]">
                {college.sportsRecreation}
              </p>
            ),
          },
          {
            label: "Tech Infrastructure",
            getValue: (college) => (
              <p className="font-poppins text-[16px] leading-[20px] text-[#162447]">
                {college.techInfrastructure}
              </p>
            ),
          },
          {
            label: "Safety & Security",
            getValue: (college) => (
              <p className="font-poppins text-[16px] leading-[20px] text-[#162447]">
                {college.safetySecurity}
              </p>
            ),
          },
        ],
      },
      {
        id: "reviews",
        title: "Student Reviews",
        icon: StarIcon,
        rows: [
          {
            label: "Overall Rating",
            getValue: (college) => (
              <div className="flex items-center gap-[6px]">
                <div className="bg-[#fff4ae] px-[4.47px] py-[4.47px] rounded-[29.802px] flex items-center gap-[3px]">
                  <StarIcon width={12} height={12} fill="#162447" />
                  <p className="font-poppins text-[16px] leading-[20px] text-[#162447]">
                    {college.overallRating}
                  </p>
                </div>
                <p className="font-poppins text-[16px] leading-[20px] text-[#162447] opacity-60">
                  ({college.ratingCount} reviews)
                </p>
              </div>
            ),
          },
          {
            label: "Academics Rating",
            getValue: (college) => (
              <div className="flex items-center gap-[6px]">
                <div className="bg-[#fff4ae] px-[4.47px] py-[4.47px] rounded-[29.802px] flex items-center gap-[3px]">
                  <StarIcon width={12} height={12} fill="#162447" />
                  <p className="font-poppins text-[16px] leading-[20px] text-[#162447]">
                    {college.academicsRating}
                  </p>
                </div>
                <p className="font-poppins text-[16px] leading-[20px] text-[#162447] opacity-60">
                  ({college.ratingCount} reviews)
                </p>
              </div>
            ),
          },
          {
            label: "Placement Rating",
            getValue: (college) => (
              <div className="flex items-center gap-[6px]">
                <div className="bg-[#fff4ae] px-[4.47px] py-[4.47px] rounded-[29.802px] flex items-center gap-[3px]">
                  <StarIcon width={12} height={12} fill="#162447" />
                  <p className="font-poppins text-[16px] leading-[20px] text-[#162447]">
                    {college.placementRating}
                  </p>
                </div>
                <p className="font-poppins text-[16px] leading-[20px] text-[#162447] opacity-60">
                  ({college.ratingCount} reviews)
                </p>
              </div>
            ),
          },
          {
            label: "Faculty Rating",
            getValue: (college) => (
              <div className="flex items-center gap-[6px]">
                <div className="bg-[#fff4ae] px-[4.47px] py-[4.47px] rounded-[29.802px] flex items-center gap-[3px]">
                  <StarIcon width={12} height={12} fill="#162447" />
                  <p className="font-poppins text-[16px] leading-[20px] text-[#162447]">
                    {college.facultyRating}
                  </p>
                </div>
                <p className="font-poppins text-[16px] leading-[20px] text-[#162447] opacity-60">
                  ({college.ratingCount} reviews)
                </p>
              </div>
            ),
          },
          {
            label: "Infrastructure Rating",
            getValue: (college) => (
              <div className="flex items-center gap-[6px]">
                <div className="bg-[#fff4ae] px-[4.47px] py-[4.47px] rounded-[29.802px] flex items-center gap-[3px]">
                  <StarIcon width={12} height={12} fill="#162447" />
                  <p className="font-poppins text-[16px] leading-[20px] text-[#162447]">
                    {college.infrastructureRating}
                  </p>
                </div>
                <p className="font-poppins text-[16px] leading-[20px] text-[#162447] opacity-60">
                  ({college.ratingCount} reviews)
                </p>
              </div>
            ),
          },
          {
            label: "Campus Life Rating",
            getValue: (college) => (
              <div className="flex items-center gap-[6px]">
                <div className="bg-[#fff4ae] px-[4.47px] py-[4.47px] rounded-[29.802px] flex items-center gap-[3px]">
                  <StarIcon width={12} height={12} fill="#162447" />
                  <p className="font-poppins text-[16px] leading-[20px] text-[#162447]">
                    {college.campusLifeRating}
                  </p>
                </div>
                <p className="font-poppins text-[16px] leading-[20px] text-[#162447] opacity-60">
                  ({college.ratingCount} reviews)
                </p>
              </div>
            ),
          },
          {
            label: "Review Highlights",
            getValue: (college) => (
              <div className="flex flex-col gap-[4px]">
                {college.reviewHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-[3px]">
                    <div className="w-[12px] h-[12px] shrink-0">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"
                          fill="#07b24e"
                        />
                      </svg>
                    </div>
                    <p className="font-poppins text-[16px] leading-[26px] text-[#07b24e]">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            ),
          },
        ],
      },
      {
        id: "admissions",
        title: "Admissions",
        icon: DocIcon,
        rows: [
          {
            label: "Admission Process",
            getValue: (college) => (
              <p className="font-poppins text-[16px] leading-[20px] text-[#162447]">
                {college.admissionProcess}
              </p>
            ),
          },
          {
            label: "Important Dates",
            getValue: (college) => (
              <p className="font-poppins text-[16px] leading-[20px] text-[#162447]">
                {college.importantDates}
              </p>
            ),
          },
          {
            label: "Counselling Mode",
            getValue: (college) => (
              <p className="font-poppins text-[16px] leading-[20px] text-[#162447]">
                {college.counsellingMode}
              </p>
            ),
          },
          {
            label: "Documents Required",
            getValue: (college) => (
              <ul className="list-disc list-inside font-poppins text-[16px] leading-[20px] text-[#162447]">
                {college.documentsRequired.map((doc, idx) => (
                  <li key={idx}>{doc}</li>
                ))}
              </ul>
            ),
          },
          {
            label: "Application Fee",
            getValue: (college) => (
              <p className="font-poppins text-[16px] leading-[20px] text-[#162447]">
                {college.applicationFee}
              </p>
            ),
          },
          {
            label: "Contact Information",
            getValue: (college) => (
              <div className="flex flex-col gap-[8px]">
                <div className="flex items-center gap-[4px]">
                  <PhoneIcon width={18} height={18} fill="#513392" />
                  <p className="font-poppins text-[16px] leading-[20px] text-[#513392]">
                    {college.contactPhone}
                  </p>
                </div>
                <div className="flex items-center gap-[4px]">
                  <MailIcon width={18} height={18} fill="#513392" />
                  <p className="font-poppins text-[16px] leading-[20px] text-[#513392]">
                    {college.contactEmail}
                  </p>
                </div>
              </div>
            ),
          },
        ],
      },
    ];
  };

  const sections = getSectionsConfig();

  const renderSection = (section: SectionConfig) => {
    const IconComponent = section.icon;
    const totalCols = Math.max(colleges.length, 4);
    const isExpanded = expandedSections.has(section.id);

    return (
      <div
        key={section.id}
        className="flex flex-col items-start relative w-full mb-[20px] sm:mb-[40px] shadow-[1px_6px_41px_0px_rgba(0,0,0,0.04)] rounded-[15px] sm:rounded-[20px] overflow-hidden"
      >
        {/* Section Header - Accordion Toggle */}
        <button
          onClick={() => toggleSection(section.id)}
          className="bg-white flex items-center justify-between p-[20px] w-full rounded-tl-[20px] rounded-tr-[20px] hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <div className="flex gap-[6px] items-center">
            <IconComponent width={20} height={20} fill="#162447" />
            <p className="font-helvetica font-medium text-[18px] sm:text-[24px] leading-[22px] sm:leading-[28px] text-[#162447] tracking-[-0.48px]">
              {section.title}
            </p>
          </div>
          <div
            className={`w-[28px] h-[28px] flex items-center justify-center transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
              }`}
          >
            <ChevronDownIcon width={28} height={28} fill="#162447" />
          </div>
        </button>

        {/* Section Table - Accordion Content */}
        {isExpanded && (
          <div className="border border-[#e2e4e8] border-t-0 w-full rounded-bl-[20px] rounded-br-[20px] overflow-hidden">
            <div className="overflow-x-auto w-full">
              <div
                className="grid gap-px min-w-max w-full"
                style={{
                  gridTemplateColumns: `minmax(140px, 1fr) repeat(${totalCols}, minmax(200px, 1fr))`,
                }}
              >
                {/* Criteria Column - Row Labels */}
                {section.rows.map((row, rowIdx) => (
                  <div
                    key={`label-${rowIdx}`}
                    className={`bg-[#f6f7ff] border-b border-[#e6e7e8] flex items-center min-h-[48px] sm:min-h-[60px] py-[12px] sm:py-[20px] px-[12px] sm:px-[20px] sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)] sm:shadow-none ${rowIdx === section.rows.length - 1
                      ? "rounded-bl-[20px]"
                      : ""
                      }`}
                    style={{
                      gridColumn: "1",
                      gridRow: rowIdx + 1,
                    }}
                  >
                    <p className="font-poppins text-[14px] sm:text-[16px] leading-[18px] sm:leading-[20px] text-[#162447]">
                      {row.label}
                    </p>
                  </div>
                ))}

                {/* College Columns - Data Cells */}
                {Array.from({ length: totalCols }).map((_, colIdx) => {
                  const college = colleges[colIdx];
                  return section.rows.map((row, rowIdx) => (
                    <div
                      key={`col-${colIdx}-row-${rowIdx}`}
                      className={`bg-white border-b border-[#e6e7e8] flex items-center min-h-[48px] sm:min-h-[60px] py-[12px] sm:py-[20px] px-[12px] sm:px-[20px] ${colIdx === totalCols - 1 &&
                        rowIdx === section.rows.length - 1
                        ? "rounded-br-[20px]"
                        : ""
                        }`}
                      style={{
                        gridColumn: colIdx + 2,
                        gridRow: rowIdx + 1,
                      }}
                    >
                      {college ? row.getValue(college) : null}
                    </div>
                  ));
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Show all sections - they are displayed below the main comparison table
  return (
    <div className="flex flex-col items-start w-full max-w-full px-4 md:px-8 lg:px-[140px] py-10">
      {sections.map(renderSection)}
    </div>
  );
}

"use client";

import ScholarshipCardDetailed from "@/components/common/Cards/ScholarshipCardDetailed";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import Pagination from "@/components/Ui/Pagination";

interface Scholarship {
  id: string | number;
  title: string;
  badges: string[];
  status: "urgent" | "normal";
  daysLeft: number;
  amount: string;
  eligibility: string;
  deadline: string;
}

interface ScholarshipsListProps {
  scholarships: Scholarship[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onApplyNow?: (scholarshipId: string | number) => void;
  onCheckEligibility?: (scholarshipId: string | number) => void;
  onBookmark?: (scholarshipId: string | number) => void;
}

export default function ScholarshipsList({
  scholarships,
  currentPage,
  totalPages,
  onPageChange,
  onApplyNow,
  onCheckEligibility,
  onBookmark,
}: ScholarshipsListProps) {
  return (
    <ContentWrapper className="px-0">
      {/* Header Section */}
      <div className="flex flex-col gap-3 md:gap-5 lg:gap-[30px] items-start mb-5 md:mb-8 lg:mb-10">
        <h1 className="font-poppins font-medium leading-[28px] sm:leading-[32px] md:leading-[40px] lg:leading-[46px] xl:leading-[52px] text-[#162447] text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] xl:text-[48px] tracking-[-0.4px] md:tracking-[-0.6px] lg:tracking-[-0.8px] max-w-[627px]">
          Find Scholarships That Match Your Dream Education
        </h1>
        <div className="font-poppins leading-[18px] md:leading-[22px] lg:leading-6 text-[#767e92] text-[13px] md:text-[15px] lg:text-[16px] max-w-[625px]">
          <p className="mb-0">
            Explore verified government, private, merit-based, and need-based scholarships designed to support every student across India.
          </p>
        </div>
      </div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px] w-full">
        {scholarships.map((scholarship) => (
          <ScholarshipCardDetailed
            key={scholarship.id}
            id={scholarship.id}
            title={scholarship.title}
            badges={scholarship.badges}
            status={scholarship.status}
            daysLeft={scholarship.daysLeft}
            amount={scholarship.amount}
            eligibility={scholarship.eligibility}
            deadline={scholarship.deadline}
            onApplyNow={() => {
              onApplyNow?.(scholarship.id);
            }}
            onCheckEligibility={() => {
              onCheckEligibility?.(scholarship.id);            
            }}
            onBookmark={() => {
              onBookmark?.(scholarship.id);
            }}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center w-full">
        <Pagination
          totalPages={totalPages}      
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </ContentWrapper>
  );
}

"use client";

import React from "react";
import JobCard from "@/components/common/Cards/JobCard";
import { Button } from "@/components/common/Button";
import { ChevronDownIcon } from "@/components/common/Icons";
import { useCmsJobsInternshipsPage } from "@/hooks/cms/useCmsJobsInternshipsPage";
import Loader from "@/components/common/Loader";

export interface Job {
  id: string;
  title: string;
  company: string;
  logoUrl?: string;
  employmentType: string;
  salaryRange: string;
  location: string;
  postedTime: string;
  isBookmarked?: boolean;
}

interface JobsListProps {
  jobs: Job[];
  onJobClick?: (jobId: string) => void;
  onApply?: (jobId: string) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isLoadingMore?: boolean;
  onBookmark?: (jobId: string) => void;
}



export default function JobsList({
  jobs,
  onJobClick,
  onApply,
  onLoadMore,
  hasMore = true,
  isLoading = false,
  isError = false,
  isLoadingMore = false,
  onBookmark,
}: JobsListProps) {
  const { heroSection } = useCmsJobsInternshipsPage();

  const title = heroSection?.primaryHeadline;
  const description = heroSection?.subHeadline;

  return (
    <div className="flex flex-col gap-[60px]">
      {/* Header */}
      {heroSection?.enabled !== false && (
        <div className="flex flex-col gap-[16px]">
          <h1 className="font-poppins font-medium leading-[32px] md:leading-[48px] text-[#162447] text-[24px] md:text-[42px] tracking-[-0.96px] max-w-[629px]">
            {title}
          </h1>
          <p className="text-[12px] md:text-[16px] leading-[20px] text-[#767e92]">
            {description}
          </p>
        </div>
      )}
      {/* Jobs List */}
      <div className="flex flex-col gap-3 md:gap-5">
        {isLoading && jobs.length === 0 ? (
          <Loader fullPage label="Loading jobs..." />
        ) : isError ? (
          <div className="text-[#767e92] font-poppins text-[14px] leading-[20px]">
            Failed to load jobs. Please try again later.
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-[#767e92] font-poppins text-[14px] leading-[20px]">
            No jobs available right now.
          </div>
        ) : (
          jobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              company={job.company}
              logoUrl={job.logoUrl}
              employmentType={job.employmentType}
              salaryRange={job.salaryRange}
              location={job.location}
              postedTime={job.postedTime}
              isBookmarked={job.isBookmarked}
              onViewDetails={() => onJobClick?.(job.id)}
              onApply={() => onApply?.(job.id)}
              onBookmark={() => onBookmark?.(job.id)}
            />
          ))
        )}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center">
        <Button
          variant="primary"
          size="md"
          onClick={onLoadMore}
          disabled={!hasMore || isLoadingMore}
          className="bg-[#513392] rounded-[60px] px-5 py-[10px] flex items-center gap-[10px] text-white hover:bg-[#3d2670] transition-colors"
        >
          <span className="font-poppins text-[16px] leading-[20px] text-white">
            {!hasMore ? "No more jobs" : isLoadingMore ? "Loading..." : "Load More Jobs"}
          </span>
          <ChevronDownIcon width={18} height={18} fill="white" />
        </Button>
      </div>
    </div>
  );
}

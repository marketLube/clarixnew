"use client";

import React from "react";
import Link from "next/link";
import JobCard from "@/components/common/Cards/JobCard";
import { Button } from "@/components/common/Button";
import { ChevronDownIcon } from "@/components/common/Icons";
import { useJobs } from "@/hooks/job/useJobs";

interface RelatedJobsProps {
  currentJobId: string;
}

function formatSalary(salary?: { min: number; max: number; unit: string }) {
  if (!salary) return "";
  const min = salary.min ?? 0;
  const max = salary.max ?? 0;
  const unit = salary.unit ?? "";
  if (!min && !max) return unit ? `(${unit})` : "";
  return `₹${min} - ₹${max}${unit ? ` (${unit})` : ""}`;
}

function timeAgo(isoDate?: string) {
  if (!isoDate) return "Recently";
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  if (Number.isNaN(then)) return "Recently";
  const diffMs = Math.max(0, now - then);
  const diffMins = Math.floor(diffMs / (60 * 1000));
  if (diffMins < 60) return `${diffMins || 1} min ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hours ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} days ago`;
}

export default function RelatedJobs({ currentJobId }: RelatedJobsProps) {
  const { jobs, isLoading } = useJobs({ limit: 8 });

  // Filter out current job and get first 7 related jobs
  const filteredJobs = jobs
    .filter((job) => job._id !== currentJobId)
    .slice(0, 7);

  if (isLoading || filteredJobs.length === 0) return null;

  return (
    <div className="flex flex-col gap-[60px] items-start mt-[60px]">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-poppins font-medium leading-[28px] md:leading-[48px] text-[#162447] text-[22px] md:text-[48px] tracking-[-0.96px] max-w-[629px]">
          More Jobs You Might Like
        </h2>
        <Link
          href="/jobs-internships"
          className="text-[#513392] font-poppins text-sm hover:underline whitespace-nowrap"
        >
          View All Jobs
        </Link>
      </div>

      <div className="flex flex-col gap-5 w-full">
        {filteredJobs.map((job) => (
          <Link key={job._id} href={`/jobs-internships/${job._id}`} className="block">
            <JobCard
              id={job._id}
              title={job.jobTitle}
              company={job.companyName}
              employmentType={
                job.jobType === "Full Time" ? "Full-time" : job.jobType
              }
              salaryRange={formatSalary(job.salary)}
              location={job.location}
              postedTime={timeAgo(job.createdAt)}
            />
          </Link>
        ))}
      </div>

      {/* View More Button */}
      <div className="flex justify-center w-full">
        <Link href="/jobs-internships">
          <Button
            variant="primary"
            size="md"
            className="bg-[#513392] rounded-[60px] px-5 py-[10px] flex items-center gap-[10px] text-white hover:bg-[#3d2670] transition-colors"
          >
            <span className="font-poppins text-[16px] leading-[20px] text-white">
              View All Jobs
            </span>
            <ChevronDownIcon width={18} height={18} fill="white" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

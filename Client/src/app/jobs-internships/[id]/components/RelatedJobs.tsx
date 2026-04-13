"use client";

import React from "react";
import { useRouter } from "next/navigation";
import JobCard from "@/components/common/Cards/JobCard";
import { Button } from "@/components/common/Button";
import { ChevronDownIcon } from "@/components/common/Icons";

interface RelatedJobsProps {
  currentJobId: string;
}

// Sample related jobs - in a real app, this would come from an API
const relatedJobs = [
  {
    id: "1",
    title: "Brand Designer",
    company: "Hex",
    employmentType: "Full-time",
    salaryRange: "₹110,000 - ₹140,000",
    location: "Kochi, Kerala, India",
    postedTime: "9 hours ago",
  },
  {
    id: "2",
    title: "Brand Designer",
    company: "Hex",
    employmentType: "Full-time",
    salaryRange: "₹110,000 - ₹140,000",
    location: "Kochi, Kerala, India",
    postedTime: "9 hours ago",
  },
  {
    id: "3",
    title: "Brand Designer",
    company: "Hex",
    employmentType: "Full-time",
    salaryRange: "₹110,000 - ₹140,000",
    location: "Kochi, Kerala, India",
    postedTime: "9 hours ago",
  },
  {
    id: "4",
    title: "Brand Designer",
    company: "Hex",
    employmentType: "Full-time",
    salaryRange: "₹110,000 - ₹140,000",
    location: "Kochi, Kerala, India",
    postedTime: "9 hours ago",
  },
  {
    id: "5",
    title: "Brand Designer",
    company: "Hex",
    employmentType: "Full-time",
    salaryRange: "₹110,000 - ₹140,000",
    location: "Kochi, Kerala, India",
    postedTime: "9 hours ago",
  },
  {
    id: "6",
    title: "Brand Designer",
    company: "Hex",
    employmentType: "Full-time",
    salaryRange: "₹110,000 - ₹140,000",
    location: "Kochi, Kerala, India",
    postedTime: "9 hours ago",
  },
  {
    id: "7",
    title: "Brand Designer",
    company: "Hex",
    employmentType: "Full-time",
    salaryRange: "₹110,000 - ₹140,000",
    location: "Kochi, Kerala, India",
    postedTime: "9 hours ago",
  },
  {
    id: "8",
    title: "Brand Designer",
    company: "Hex",
    employmentType: "Full-time",
    salaryRange: "₹110,000 - ₹140,000",
    location: "Kochi, Kerala, India",
    postedTime: "9 hours ago",
  },
];

export default function RelatedJobs({ currentJobId }: RelatedJobsProps) {
  const router = useRouter();

  // Filter out current job and get first 7 related jobs
  const filteredJobs = relatedJobs
    .filter((job) => job.id !== currentJobId)
    .slice(0, 7);

  return (
    <div className="flex flex-col gap-[60px] items-start mt-[60px]">
      <h2 className="font-helvetica font-medium leading-[48px] text-[#162447] text-[48px] tracking-[-0.96px] max-w-[629px]">
        More Brand Designer Jobs You Might Like
      </h2>

      <div className="flex flex-col gap-5 w-full">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            company={job.company}
            employmentType={job.employmentType}
            salaryRange={job.salaryRange}
            location={job.location}
            postedTime={job.postedTime}
            onViewDetails={() => router.push(`/jobs-internships/${job.id}`)}
            onApply={() => console.log("Apply for job:", job.id)}
          />
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center w-full">
        <Button
          variant="primary"
          size="md"
          className="bg-[#513392] rounded-[60px] px-5 py-[10px] flex items-center gap-[10px] text-white hover:bg-[#3d2670] transition-colors"
        >
          <span className="font-poppins text-[16px] leading-[20px] text-white">
            Load More Jobs
          </span>
          <ChevronDownIcon width={18} height={18} fill="white" />
        </Button>
      </div>
    </div>
  );
}

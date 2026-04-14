"use client";

import { Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import JobDetailHero from "./components/JobDetailHero";
import AboutCompany from "./components/AboutCompany";
import AboutRole from "./components/AboutRole";
import AboutYou from "./components/AboutYou";
import JobQandA from "./components/JobQandA";
import JobDetailSidebar from "./components/JobDetailSidebar";
import RelatedJobs from "./components/RelatedJobs";
import { useJobById } from "@/hooks/job/useJobById";
import Loader from "@/components/common/Loader";
import Breadcrumb from "@/components/common/Breadcrumb";

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

function formatSalary(salary?: { min: number; max: number; unit: string }) {
  if (!salary) return "";
  const min = salary.min ?? 0;
  const max = salary.max ?? 0;
  const unit = salary.unit ?? "";
  if (!min && !max) return unit ? `(${unit})` : "";
  return `₹${min} - ₹${max}${unit ? ` (${unit})` : ""}`;
}

function JobDetailPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const jobId =
    typeof params?.id === "string"
      ? params.id
      : Array.isArray(params?.id)
        ? params.id[0]
        : undefined;
  const fromCareer = searchParams?.get("fromCareer") === "true";

  const { job: apiJob, isLoading, isError } = useJobById(jobId);

  const job = apiJob
    ? {
      id: apiJob._id,
      title: apiJob.jobTitle,
      company: apiJob.companyName,
      employmentType:
        apiJob.jobType === "Full Time" ? "Full-time" : apiJob.jobType,
      salaryRange: formatSalary(apiJob.salary),
      location: apiJob.location,
      postedTime: timeAgo(apiJob.createdAt),
    }
    : null;

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <ContentWrapper className="py-10">
        {isLoading ? (
          <Loader fullPage label="Loading job..." />
        ) : isError || !job ? (
          <div className="text-[#767e92] font-poppins text-[14px] leading-[20px]">
            Failed to load job details.
          </div>
        ) : (
          <>
            <Breadcrumb
              items={[
                { label: "Jobs & Internships", href: "/jobs-internships" },
                { label: job.title },
              ]}
            />
            <div className="flex gap-8 items-start justify-between mt-6">
              {/* Main Content */}
              <div className="flex-1 max-w-[1116px]">
                <JobDetailHero job={job} />
                <AboutCompany job={job} />
                <AboutRole job={job} />
                <AboutYou job={job} />
                <JobQandA job={job} />
              </div>

              {/* Sidebar */}
              <div className="w-[288px] flex-shrink-0 sticky top-[80px] self-start">
                <JobDetailSidebar job={job} />
              </div>
            </div>

            {/* Related Jobs - Hide when accessed from career page */}
            {!fromCareer && jobId && <RelatedJobs currentJobId={jobId} />}
          </>
        )}
      </ContentWrapper>
    </div>
  );
}

export default function JobDetailPage() {
  return (
    <Suspense fallback={<Loader fullPage label="Loading..." />}>
      <JobDetailPageContent />
    </Suspense>
  );
}

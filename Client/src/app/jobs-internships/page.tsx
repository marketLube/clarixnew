"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import JobsList from "./components/JobsList";
import BlogsSection from "./components/BlogsSection";
import FAQ from "@/app/components/common/FAQ";
import { jobsInternshipsFaqsData } from "@/app/utilities/DummyData";
import { useJobs } from "@/hooks/job/useJobs";
import { useBlogs } from "@/hooks/blog/useBlogs";
import { useSavedItems } from "@/hooks/useSavedItems";

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

export default function JobsInternshipsPage() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const limit = 8;
  const { jobs, pagination, isLoading, isError, isFetching } = useJobs({
    page,
    limit,
    status: "active",
    sortBy: "createdAt",
    order: "desc",
  });

  const { savedItems, toggleSavedItem } = useSavedItems();

  const mappedPageJobs = useMemo(
    () =>
      jobs.map((job) => ({
        id: job._id,
        title: job.jobTitle,
        company: job.companyName,
        employmentType: job.jobType === "Full Time" ? "Full-time" : job.jobType,
        salaryRange: formatSalary(job.salary),
        location: job.location,
        postedTime: timeAgo(job.createdAt),
        isBookmarked: savedItems?.jobs?.some((j: any) => j._id === job._id) || false,
      })),
    [jobs, savedItems.jobs]
  );

  const [allJobs, setAllJobs] = useState<typeof mappedPageJobs>([]);

  useEffect(() => {
    setAllJobs((prev) => {
      if (page === 1) return mappedPageJobs;
      const seen = new Set(prev.map((j) => j.id));
      const appended = mappedPageJobs.filter((j) => !seen.has(j.id));
      return [...prev, ...appended];
    });
  }, [mappedPageJobs, page]);

  const hasMore = pagination ? page < pagination.totalPages : false;

  const { data: blogData } = useBlogs();
  const blogs = blogData?.blogs?.slice(0, 4) || [];

  return (
    <section className="py-10 min-h-screen">
      <ContentWrapper className="flex flex-col gap-16">
        {/* Jobs List Section */}
        <JobsList
          jobs={allJobs}
          onJobClick={(jobId) => {
            router.push(`/jobs-internships/${jobId}`);
          }}
          onApply={(jobId) => {
            console.log("Apply for job:", jobId);
          }}
          onBookmark={(jobId) => {
            toggleSavedItem({ itemId: jobId, itemType: "jobs" });
          }}
          onLoadMore={() => {
            if (!hasMore || isFetching) return;
            setPage((p) => p + 1);
          }}
          hasMore={hasMore}
          isLoading={isLoading}
          isError={isError}
          isLoadingMore={isFetching && page > 1}
        />

        {/* Blogs Section */}
        <BlogsSection
          blogs={blogs}
          onBlogClick={(blogId) => {
            console.log("View blog:", blogId);
          }}
        />

        {/* FAQ Section */}
        <FAQ questions={jobsInternshipsFaqsData} />
      </ContentWrapper>
    </section>
  );
}

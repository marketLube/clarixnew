"use client";

import { Suspense, useEffect, useMemo, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import JobsList from "./components/JobsList";
import BlogsSection from "./components/BlogsSection";
import FAQ from "@/app/components/common/FAQ";
import { jobsInternshipsFaqsData } from "@/app/utilities/DummyData";
import { useJobs, type UseJobsOptions } from "@/hooks/job/useJobs";
import { useBlogs } from "@/hooks/blog/useBlogs";
import { useSavedItems } from "@/hooks/useSavedItems";
import Breadcrumb from "@/components/common/Breadcrumb";
import Loader from "@/components/common/Loader";

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
  return `\u20B9${min} - \u20B9${max}${unit ? ` (${unit})` : ""}`;
}

function JobsInternshipsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || undefined;
  const jobType = (searchParams.get("jobType") as UseJobsOptions["jobType"]) || undefined;

  const [page, setPage] = useState(initialPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [search, jobType]);

  const limit = 8;
  const { jobs, pagination, isLoading, isError, isFetching } = useJobs({
    page,
    limit,
    status: "active",
    sortBy: "createdAt",
    order: "desc",
    search,
    jobType,
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
        isBookmarked:
          savedItems?.jobs?.some((j: any) => j._id === job._id) || false,
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
  const totalPages = pagination?.totalPages ?? 1;

  // Sync page state to URL
  const handleLoadMore = useCallback(() => {
    if (!hasMore || isFetching) return;
    const nextPage = page + 1;
    setPage(nextPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.push(`/jobs-internships?${params.toString()}`, { scroll: false });
  }, [hasMore, isFetching, page, router, searchParams]);

  const { data: blogData } = useBlogs();
  const blogs = blogData?.blogs?.slice(0, 4) || [];

  const hasActiveFilters = Boolean(search || jobType);

  // Build rel prev/next links for SEO
  const paginationLinks = useMemo(() => {
    const links: React.ReactNode[] = [];
    if (page > 1) {
      const prevPage = page - 1;
      const href =
        prevPage === 1
          ? "/jobs-internships"
          : `/jobs-internships?page=${prevPage}`;
      links.push(<link key="prev" rel="prev" href={href} />);
    }
    if (page < totalPages) {
      links.push(
        <link
          key="next"
          rel="next"
          href={`/jobs-internships?page=${page + 1}`}
        />
      );
    }
    return links;
  }, [page, totalPages]);

  return (
    <section className="py-4 md:py-8 lg:py-10">
      {/* SEO noindex handled via layout metadata */}

      <ContentWrapper className="flex flex-col gap-4 md:gap-8 lg:gap-12 xl:gap-16">
        <Breadcrumb items={[{ label: "Jobs & Internships" }]} />

        {/* Jobs List Section */}
        <JobsList
          jobs={allJobs}
          onJobClick={(jobId) => {
            router.push(`/jobs-internships/${jobId}`);
          }}
          onApply={(jobId) => {
            router.push(`/jobs-internships/${jobId}`);
          }}
          onBookmark={(jobId) => {
            toggleSavedItem({ itemId: jobId, itemType: "jobs" });
          }}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          isLoading={isLoading}
          isError={isError}
          isLoadingMore={isFetching && page > 1}
        />

        {/* Blogs Section */}
        <BlogsSection
          blogs={blogs}
          onBlogClick={(blogId) => {
            const blog = blogs.find((b: any) => b._id === blogId);
            if (blog) {
              router.push(`/blog/${blog.slug}`);
            }
          }}
        />

        {/* FAQ Section */}
        <FAQ questions={jobsInternshipsFaqsData} />
      </ContentWrapper>
    </section>
  );
}

export default function JobsInternshipsPage() {
  return (
    <Suspense
      fallback={<Loader fullPage label="Loading jobs & internships..." />}
    >
      <JobsInternshipsPageContent />
    </Suspense>
  );
}

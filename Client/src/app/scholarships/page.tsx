"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ScholarshipsList from "./components/ScholarshipsList";
import HowScholarshipsWork from "./components/HowScholarshipsWork";
// import StudentReviews from "@/app/components/common/StudentReviews";
import FAQ from "@/app/components/common/FAQ";
import { scholarshipsFaqsData } from "@/app/utilities/DummyData";
import { useScholarships } from "@/hooks/scholarship/useScholarships";
import Loader from "@/components/common/Loader";
import { useSavedItems } from "@/hooks/useSavedItems";
import StudentStories from "@/app/components/home/StudentStories";
import Breadcrumb from "@/components/common/Breadcrumb";
import ContentWrapper from "@/components/Ui/ContentWrapper";

function ScholarshipsPageContent() {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  const search = searchParams.get("search") || undefined;
  const type = searchParams.get("type") || undefined;
  const hasActiveFilters = Boolean(search || type);

  const { scholarships: rawScholarships, pagination, isLoading, isError, error } = useScholarships({
    page: currentPage,
    limit: cardsPerPage,
    search,
    type,
  });

  const { savedItems, toggleSavedItem } = useSavedItems();

  const scholarships = rawScholarships.map((item) => {
    const deadlineDate = new Date(item.deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      id: item._id,
      title: item.scholarshipName,
      badges: [item.scholarshipType, item.fundingType],
      status: daysLeft > 0 && daysLeft <= 30 ? ("urgent" as const) : ("normal" as const),
      daysLeft: daysLeft > 0 ? daysLeft : 0,
      amount: `₹ Up to ${item.totalFundingAmount.toLocaleString()} / year`,
      eligibility: item.description,
      deadline: deadlineDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      isBookmarked: savedItems.scholarships?.some((s: any) => s._id === item._id),
    };
  });

  const totalPages = pagination?.totalPages || 1;

  // Build rel prev/next links for SEO
  const paginationLinks = useMemo(() => {
    const links: React.ReactNode[] = [];
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      const href = prevPage === 1 ? "/scholarships" : `/scholarships?page=${prevPage}`;
      links.push(<link key="prev" rel="prev" href={href} />);
    }
    if (currentPage < totalPages) {
      links.push(
        <link key="next" rel="next" href={`/scholarships?page=${currentPage + 1}`} />
      );
    }
    return links;
  }, [currentPage, totalPages]);

  return (
    <section className="py-4 md:py-8 lg:py-10">
      {/* SEO noindex handled via layout metadata */}
      <ContentWrapper>
        <Breadcrumb items={[{ label: "Scholarships" }]} />
      </ContentWrapper>
      <div className="flex flex-col gap-4 md:gap-6 lg:gap-10">
        {isLoading ? (
          <Loader fullPage label="Loading scholarships..." />
        ) : isError ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <p className="text-red-500 font-poppins">
              {error?.message || "An error occurred while fetching scholarships"}
            </p>
            <button
              onClick={() => setCurrentPage(1)}
              className="px-4 py-2 bg-[#513392] text-white rounded-full hover:bg-[#3f2672] transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <ScholarshipsList
            scholarships={scholarships}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onApplyNow={() => {
              // Apply now action handled by the ScholarshipCardDetailed modal
            }}
            onCheckEligibility={() => {
              // Check eligibility - could navigate to eligibility checker
            }}
            onBookmark={(scholarshipId) => {
              toggleSavedItem({ itemId: scholarshipId as string, itemType: "scholarships" });
            }}
          />
        )}
        <HowScholarshipsWork />
        {/* <StudentReviews /> */}
        <StudentStories />
        <FAQ questions={scholarshipsFaqsData} />
      </div>
    </section>
  );
}

export default function ScholarshipsPage() {
  return (
    <Suspense fallback={<Loader fullPage label="Loading..." />}>
      <ScholarshipsPageContent />
    </Suspense>
  );
}

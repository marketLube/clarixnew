"use client";

import { useState } from "react";
import ScholarshipsList from "./components/ScholarshipsList";
import HowScholarshipsWork from "./components/HowScholarshipsWork";
// import StudentReviews from "@/app/components/common/StudentReviews";
import FAQ from "@/app/components/common/FAQ";
import { scholarshipsFaqsData } from "@/app/utilities/DummyData";
import { Loader2 } from "lucide-react";
import { useScholarships } from "@/hooks/scholarship/useScholarships";
import { useSavedItems } from "@/hooks/useSavedItems";
import StudentStories from "@/app/components/home/StudentStories";

export default function ScholarshipsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  const { scholarships: rawScholarships, pagination, isLoading, isError, error } = useScholarships({
    page: currentPage,
    limit: cardsPerPage,
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

  return (
    <section className="py-10 min-h-screen">
      <div className="flex flex-col gap-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            <p className="text-[#767e92] font-poppins">Loading scholarships...</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <p className="text-red-500 font-poppins">
              {error?.message || "An error occurred while fetching scholarships"}
            </p>
            <button
              onClick={() => setCurrentPage(1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
            onApplyNow={(scholarshipId) => {
              console.log("Apply now for scholarship:", scholarshipId);
            }}
            onCheckEligibility={(scholarshipId) => {
              console.log("Check eligibility for scholarship:", scholarshipId);
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

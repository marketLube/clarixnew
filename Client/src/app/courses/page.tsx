"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import CoursesList from "./components/CoursesList";
import FAQ from "@/app/components/common/FAQ";
import { coursesFaqsData } from "@/app/utilities/DummyData";
import { useSearchParams } from "next/navigation";
import { useCourses } from "@/hooks/course/useCourses";
import { useSavedItems } from "@/hooks/useSavedItems";
import Loader from "@/components/common/Loader";

export default function CoursesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  const stream = searchParams.get("stream") || undefined;

  const { courses, pagination, isLoading } = useCourses({
    page: currentPage,
    limit: cardsPerPage,
    stream: stream,
  });

  const { savedItems, toggleSavedItem } = useSavedItems();

  const formattedCourses = courses.map((course) => ({
    id: course._id,
    title: course.name,
    stream: course.stream || "General",
    type: `${course.courseLevel || ""} ${course.examinationType ? `(${course.examinationType})` : ""}`.trim() || "Degree",
    entranceExams: [], // API doesn't seem to return this yet, keeping empty or default
    topSpecialisations: [], // Placeholder
    topColleges: [], // Placeholder
    collegeCount: 0, // Placeholder
    isBookmarked: savedItems.courses?.some((c: any) => c._id === course._id),
  }));

  const totalPages = pagination?.totalPages || 1;

  return (
    <section className="py-6 md:py-10 min-h-screen">
      <ContentWrapper className="flex flex-col">
        {isLoading ? (
          <Loader fullPage label="Loading courses..." />
        ) : (
          <CoursesList
            courses={formattedCourses}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onViewDetails={(courseId) => {
              router.push(`/courses/${courseId}`);
            }}
            onViewColleges={(courseId) => {
              // Handle view colleges
              console.log("View colleges for course:", courseId);
            }}
            onBookmark={(courseId) => {
              toggleSavedItem({ itemId: courseId, itemType: "courses" });
            }}
          />
        )}
        <FAQ questions={coursesFaqsData} />
      </ContentWrapper>
    </section>
  );
}

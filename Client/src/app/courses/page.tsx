"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import CoursesList from "./components/CoursesList";
import FAQ from "@/app/components/common/FAQ";
import { coursesFaqsData } from "@/app/utilities/DummyData";
import { useSearchParams } from "next/navigation";
import { useCourses } from "@/hooks/course/useCourses";
import { useSavedItems } from "@/hooks/useSavedItems";
import Loader from "@/components/common/Loader";
import Breadcrumb from "@/components/common/Breadcrumb";

function CoursesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  const stream = searchParams.get("stream") || undefined;
  const search = searchParams.get("search") || undefined;

  const hasActiveFilters = Boolean(stream || search);

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

  // Build rel prev/next links for SEO
  const paginationLinks = useMemo(() => {
    const links: React.ReactNode[] = [];
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      const href = prevPage === 1 ? "/courses" : `/courses?page=${prevPage}`;
      links.push(<link key="prev" rel="prev" href={href} />);
    }
    if (currentPage < totalPages) {
      links.push(
        <link key="next" rel="next" href={`/courses?page=${currentPage + 1}`} />
      );
    }
    return links;
  }, [currentPage, totalPages]);

  return (
    <section className="py-6 md:py-10 min-h-screen">
      {(hasActiveFilters || currentPage > 1 || paginationLinks.length > 0) && (
        <head>
          {(hasActiveFilters || currentPage > 1) && (
            <meta name="robots" content="noindex,follow" />
          )}
          {paginationLinks}
        </head>
      )}
      <ContentWrapper className="flex flex-col">
        <Breadcrumb items={[{ label: "Courses" }]} />

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
              router.push(`/courses/${courseId}`);
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

export default function CoursesPage() {
  return (
    <Suspense fallback={<Loader fullPage label="Loading..." />}>
      <CoursesPageContent />
    </Suspense>
  );
}

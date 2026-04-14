"use client";

import { Suspense, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import CourseCardDetailed from "@/components/common/Cards/CourseCardDetailed";
import FAQ from "@/app/components/common/FAQ";
import { coursesFaqsData } from "@/app/utilities/DummyData";
import { useInfiniteCourses } from "@/hooks/course/useInfiniteCourses";
import { useSavedItems } from "@/hooks/useSavedItems";
import { useCmsCoursesPage } from "@/hooks/cms/useCmsCoursesPage";
import Loader from "@/components/common/Loader";
import Breadcrumb from "@/components/common/Breadcrumb";

function CoursesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sentinelRef = useRef<HTMLDivElement>(null);

  const stream = searchParams.get("stream") || undefined;
  const search = searchParams.get("search") || undefined;
  const degree = searchParams.get("degree") || undefined;

  const hasActiveFilters = Boolean(stream || search || degree);

  const {
    courses,
    totalCount,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteCourses({
    limit: 12,
    stream,
    search,
    courseLevel: degree,
  });

  const { savedItems, toggleSavedItem } = useSavedItems();
  const { heroSection } = useCmsCoursesPage();

  // Infinite scroll via IntersectionObserver
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "200px",
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleObserver]);

  const formattedCourses = courses.map((course) => ({
    id: course._id,
    title: course.name,
    stream:
      typeof course.stream === "object"
        ? (course.stream as any)?.name
        : course.stream || "General",
    type:
      `${course.courseLevel || ""} ${course.examinationType ? `(${course.examinationType})` : ""}`.trim() ||
      "Degree",
    entranceExams: [],
    topSpecialisations: [],
    topColleges: [],
    collegeCount: (course as any).collegeCount || 0,
    isBookmarked: savedItems.courses?.some(
      (c: any) => c._id === course._id
    ),
  }));

  return (
    <section className="py-6 md:py-10 min-h-screen">
      <ContentWrapper className="flex flex-col">
        <Breadcrumb items={[{ label: "Courses" }]} />

        {/* Header Section */}
        {heroSection?.enabled !== false && (
          <div className="flex flex-col gap-3 md:gap-6 items-start mb-4 md:mb-8">
            <h1 className="font-poppins font-medium leading-[32px] md:leading-[48px] text-[#162447] text-[22px] md:text-[48px] tracking-[-0.48px] md:tracking-[-0.96px] max-w-[501px]">
              {heroSection?.primaryHeadline}
            </h1>
            <p className="font-poppins leading-5 text-[#767e92] text-[12px] md:text-[16px] max-w-[763px]">
              {heroSection?.subHeadline}
            </p>
          </div>
        )}

        {/* Initial loading */}
        {isLoading ? (
          <Loader fullPage label="Loading courses..." />
        ) : formattedCourses.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-20 px-4 mt-8 rounded-2xl border border-[#edf0f9] bg-[#fafbff]">
            <div className="bg-[#f0ecfc] w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-[#513392]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="font-poppins font-bold text-xl text-[#162447] mb-2">
              No Courses Available
            </h3>
            <p className="font-poppins text-[#767e92] text-sm text-center max-w-md">
              We&apos;re adding new courses regularly. Please check back soon or
              try a different filter.
            </p>
          </div>
        ) : (
          <>
            {/* Courses Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-3.5 w-full">
              {formattedCourses.map((course) => (
                <CourseCardDetailed
                  key={course.id}
                  title={course.title}
                  stream={course.stream}
                  type={course.type}
                  entranceExams={course.entranceExams}
                  topSpecialisations={course.topSpecialisations}
                  topColleges={course.topColleges}
                  collegeCount={course.collegeCount}
                  onViewDetails={() => router.push(`/courses/${course.id}`)}
                  onViewColleges={() => router.push(`/courses/${course.id}`)}
                  onBookmark={() =>
                    toggleSavedItem({
                      itemId: course.id,
                      itemType: "courses",
                    })
                  }
                />
              ))}
            </div>

            {/* Infinite scroll sentinel */}
            <div ref={sentinelRef} className="h-1" />

            {/* Loading more indicator */}
            {isFetchingNextPage && (
              <Loader
                containerClassName="py-8"
                label="Loading more courses..."
              />
            )}

            {/* End of list */}
            {!hasNextPage && formattedCourses.length > 0 && (
              <p className="text-center text-[#767e92] text-sm font-poppins py-8">
                You have seen all {totalCount} courses.
              </p>
            )}
          </>
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

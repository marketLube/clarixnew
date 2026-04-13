"use client";

import { useRef } from "react";
import CourseCardDetailed from "@/components/common/Cards/CourseCardDetailed";
import Pagination from "@/components/Ui/Pagination";
import { useCmsCoursesPage } from "@/hooks/cms/useCmsCoursesPage";

interface Course {
  id: string; // Changed from number to string to match API _id
  title: string;
  stream: string;
  type: string;
  entranceExams: string[];
  topSpecialisations: string[];
  topColleges: string[];
  collegeCount: number;
}

interface CoursesListProps {
  courses: Course[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onViewDetails?: (courseId: string) => void;
  onViewColleges?: (courseId: string) => void;
  onBookmark?: (courseId: string) => void;
}

export default function CoursesList({
  courses,
  currentPage,
  totalPages,
  onPageChange,
  onViewDetails,
  onViewColleges,
  onBookmark,
}: CoursesListProps) {
  const coursesGridRef = useRef<HTMLDivElement>(null);
  const { heroSection } = useCmsCoursesPage();

  const handlePageChange = (page: number) => {
    onPageChange(page);
    // Scroll to the courses grid section
    coursesGridRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col gap-[12px] md:gap-[30px] items-start">
        {heroSection?.enabled !== false && (
          <>
            <h1 className="font-helvetica font-medium leading-[32px] md:leading-[48px] text-[#162447] text-[22px] md:text-[48px] tracking-[-0.48px] md:tracking-[-0.96px] max-w-[501px]">
              {heroSection?.primaryHeadline}
            </h1>
            <div className="font-poppins leading-5 text-[#767e92] text-[12px] md:text-[16px] max-w-[763px]">
              <p className="mb-0">
                {heroSection?.subHeadline}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Courses Grid */}
      {courses.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center py-20 px-4 mt-8 rounded-2xl border border-[#edf0f9] bg-[#fafbff]">
          <div className="bg-[#f0ecfc] w-20 h-20 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-[#513392]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <h3 className="font-helvetica font-bold text-xl text-[#162447] mb-2">No Courses Available</h3>
          <p className="font-helvetica text-[#767e92] text-sm text-center max-w-md">We&apos;re adding new courses regularly. Please check back soon or try a different filter.</p>
        </div>
      ) : (
      <div
        ref={coursesGridRef}
        className="grid grid-cols-1 lg:grid-cols-2 gap-[8px] md:gap-[14px] w-full mt-4 md:mt-8"
      >
        {courses.map((course) => (
          <CourseCardDetailed
            key={course.id}
            title={course.title}
            stream={course.stream}
            type={course.type}
            entranceExams={course.entranceExams}
            topSpecialisations={course.topSpecialisations}
            topColleges={course.topColleges}
            collegeCount={course.collegeCount}
            onViewDetails={() => {
              onViewDetails?.(course.id);
            }}
            onViewColleges={() => {
              onViewColleges?.(course.id);
            }}
            onBookmark={() => {
              onBookmark?.(course.id);
            }}
          />
        ))}
      </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center w-full">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

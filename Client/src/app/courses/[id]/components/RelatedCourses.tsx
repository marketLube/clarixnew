"use client";

import React from "react";
import Link from "next/link";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import CourseCard from "@/components/common/Cards/CourseCard";
import SectionHeading from "@/components/common/Section/SectionHeading";
import { useCourses } from "@/hooks/course/useCourses";

interface RelatedCoursesProps {
  currentCourseId: string;
  stream?: string;
  courseLevel?: string;
}

export default function RelatedCourses({
  currentCourseId,
  stream,
  courseLevel,
}: RelatedCoursesProps) {
  const { courses, isLoading } = useCourses({
    stream: stream || undefined,
    courseLevel: courseLevel || undefined,
    limit: 5,
  });

  // Filter out the current course
  const relatedCourses = courses.filter(
    (c: any) => c._id !== currentCourseId
  ).slice(0, 4);

  if (isLoading || relatedCourses.length === 0) return null;

  return (
    <section className="w-full bg-[#FDFDFD] py-8 md:py-16">
      <ContentWrapper className="px-4 sm:px-10">
        <div className="flex flex-col gap-6 md:gap-10">
          <div className="flex items-center justify-between">
            <SectionHeading
              title="Related Courses You Might Like"
              className="max-w-[500px]"
            />
            <Link
              href="/courses"
              className="text-[#513392] font-poppins text-sm hover:underline whitespace-nowrap"
            >
              View All Courses
            </Link>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {relatedCourses.map((course: any) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}

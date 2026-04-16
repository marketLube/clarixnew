"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/common/Button";
import CourseCard from "@/components/common/Cards/CourseCard";
import SectionDescription from "@/components/common/Section/SectionDescription";
import SectionHeading from "@/components/common/Section/SectionHeading";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import GridWrapper from "@/components/Ui/GridWrapper";

export default function CourseSection({ college }: any) {



  const streams = useMemo(() => {
    if (!college?.courses) return [];

    const strms = new Set<string>();

    college.courses.forEach((course: any) => {
      let streamTitle = "";
      if (typeof course?.stream === "string") {
        streamTitle = course.stream;
      } else if (course?.stream?.name) {
        streamTitle = course.stream.name;
      } else if (course?.stream?.title) {
        streamTitle = course.stream.title;
      }

      if (streamTitle) strms.add(streamTitle);
    });

    return Array.from(strms).sort();
  }, [college?.courses]);


  const [selectedStream, setSelectedStream] = useState<string>("");


  useEffect(() => {
    if (streams.length > 0 && !selectedStream) {
      setSelectedStream(streams[0]);
    }
  }, [streams, selectedStream]);

  // Build college-specific course data by merging offerings with course refs
  const enrichedCourses = useMemo(() => {
    if (!college?.courses) return [];
    const offeringsMap = new Map<string, any>();
    (college?.courseOfferings || []).forEach((o: any) => {
      const id = o?.courseId?.toString?.() || o?.courseId;
      if (id) offeringsMap.set(id, o);
    });
    return college.courses.map((course: any) => {
      const id = course?._id?.toString?.() || course?._id;
      const offering = offeringsMap.get(id);
      if (offering) {
        // Override generic course fees/intake with college-specific data
        return {
          ...course,
          fees: offering.fees || course.fees,
          intakeCapacity: offering.intake || course.intakeCapacity,
          collegeCutoff: offering.cutoff,
          collegeModules: offering.modules,
        };
      }
      return course;
    });
  }, [college?.courses, college?.courseOfferings]);

  const filteredCourses = useMemo(() => {
    return enrichedCourses.filter((course: any) => {
      let courseStream = "";
      if (typeof course?.stream === "string") {
        courseStream = course.stream;
      } else if (course?.stream?.name) {
        courseStream = course.stream.name;
      } else if (course?.stream?.title) {
        courseStream = course.stream.title;
      }
      const streamMatch = selectedStream ? courseStream === selectedStream : true;
      return streamMatch;
    });
  }, [enrichedCourses, selectedStream]);

  if (!college?.courses || college.courses.length === 0) return null;

  return (
    <div className="bg-[var(--background)] py-2 md:py-[2rem]">
      <ContentWrapper>
        <div className="flex flex-col gap-2 md:gap-4">
          <SectionHeading title="Courses Offered" />
          <SectionDescription className="max-w-[24rem] md:max-w-none">
            Discover programs built to shape your future — compare outcomes,
            fees, and opportunities.
          </SectionDescription>

          <div className="flex flex-col gap-4 md:gap-[4rem] md:flex-row md:items-start md:justify-start">


            {streams.length > 0 && (
              <div className="flex flex-col gap-2 md:gap-4 ">
                <h3 className="text-[18px] md:text-[24px] leading-[22px] md:leading-[28px] tracking-[-0.48px] font-medium text-[var(--text-headline)] font-poppins">
                  Streams
                </h3>
                <div className="flex flex-wrap gap-[14px] items-center">
                  {streams.map((stream) => (
                    <Button
                      key={stream}
                      variant={selectedStream === stream ? "primary" : "outline"}
                      size="md"
                      className="rounded-[50px] text-[12px] md:text-[16px]"
                      onClick={() => setSelectedStream(stream)}
                    >
                      {stream}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </ContentWrapper>

      <div className="mt-8 md:mt-12">
        <ContentWrapper>
          {filteredCourses.length > 0 ? (
            <>
              {/* Mobile Scroll */}
              <div className="-mx-4 md:hidden">
                <div className="flex gap-3 overflow-x-auto px-4 pb-2">
                  {filteredCourses.map((course: any) => (
                    <div key={course?._id} className="min-w-[260px] max-w-[280px]">
                      <CourseCard course={course} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:block">
                <GridWrapper colsDesktop={4} className="gap-[14px]">
                  {filteredCourses.map((course: any) => (
                    <CourseCard key={course?._id} course={course} />
                  ))}
                </GridWrapper>
              </div>
            </>
          ) : (
            <div className="py-10 text-center text-[var(--text-sub)]">
              No courses found for the selected filters.
            </div>
          )}
        </ContentWrapper>
      </div>
    </div>
  );
}

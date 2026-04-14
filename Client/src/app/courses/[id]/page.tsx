"use client";

import { useParams } from "next/navigation";
import HeroSection from "./components/heroSection/HeroSection";
import TabsSection from "./components/tabsSection/TabsSection";
import DescriptionSection from "./components/descriptionSection/DescriptionSection";
import WhyChooseSection from "./components/whyChooseSection/WhyChooseSection";
import WhatWillYouLearn from "./components/whatWillYouLearn/WhatWillYouLearn";
import CurriculumSection from "./components/curriculumSection/CurriculumSection";
import CareerPathsSection from "./components/careerPathsSection/CareerPathsSection";
import CollegesOfferingSection from "./components/collegesOfferingSection/CollegesOfferingSection";
import RelatedCourses from "./components/RelatedCourses";
import FAQ from "@/app/components/common/FAQ";
import { useCourseById } from "@/hooks/course/useCourseById";
import Loader from "@/components/common/Loader";
import Breadcrumb from "@/components/common/Breadcrumb";
import ContentWrapper from "@/components/Ui/ContentWrapper";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params?.id;

  const { course, isLoading, isError, error } = useCourseById(courseId as string);

  if (isLoading) {
    return <Loader fullPage label="Loading course details..." />;
  }

  return (
    <div className="bg-[#FDFDFD] w-full min-h-screen">
      <ContentWrapper className="pt-6">
        <Breadcrumb
          items={[
            { label: "Courses", href: "/courses" },
            { label: course?.name || "Course" },
          ]}
        />
      </ContentWrapper>
      <HeroSection course={course} />
      <TabsSection />

      <div id="description">
        <DescriptionSection course={course} />
      </div>

      <div id="highlights">
        <WhyChooseSection course={course} />
      </div>

      <div id="takeaways">
        <WhatWillYouLearn course={course} />
      </div>

      <div id="syllabus">
        <CurriculumSection course={course} />
      </div>

      <div id="career">
        <CareerPathsSection course={course} />
      </div>

      <div id="colleges">
        <CollegesOfferingSection course={course} />
      </div>

      {/* <div id="reviews">
        <StudentReviews />
      </div> */}

      <div id="faq">
        <FAQ questions={course?.faqs?.items} />
      </div>

      {/* Related Courses */}
      <RelatedCourses
        currentCourseId={courseId as string}
        stream={course?.stream}
        courseLevel={course?.courseLevel}
      />
    </div>
  );
}

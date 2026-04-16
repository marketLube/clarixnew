"use client"

import HeroSection from "./components/heroSection/HeroSection";
import NavigationTabs from "./components/NavigationTabs";
import OverviewSection from "./components/overViewSection/OverviewSection";
import CourseSection from "./components/courseSection/CourseSection";
import AdmissionSection from "./components/admissionSection/AdmissionSection";
import FeeSection from "./components/feeSection/FeeSection";
import PlacementSection from "./components/placementSection/PlacementSection";
import RecruiterSection from "./components/recruitersSection/RecruiterSection";
import CampusLifeSection from "./components/campuslifeSection/CampusLifeSection";
import GallerySection from "./components/Gallery/GallerySection";
import FAQ from "@/app/components/common/FAQ";
import Review from "@/app/components/common/Review/Review";
import { useParams } from "next/navigation";
import { useCollegeById } from "@/hooks/college/useCollegeById";
import StudentStories from "@/app/components/home/StudentStories";
import RelatedColleges from "./components/RelatedColleges";
import Loader from "@/components/common/Loader";
import Breadcrumb from "@/components/common/Breadcrumb";
import ContentWrapper from "@/components/Ui/ContentWrapper";

export default function CollegeDetailsPage() {
  const { id } = useParams();


  const { college, isLoading, isError, error } = useCollegeById(id as string);
  const consolidatedFaqs = [
    ...(college?.admissionFaqs || []),
    ...(college?.courseFaqs || []),
    ...(college?.feesPaymentFaqs || []),
    ...(college?.scholarshipFaqs || [])
  ];

  if (isLoading) {
    return <Loader fullPage label="Loading college details..." />;
  }

  return (
    <div className="bg-[#FDFDFD] w-full">
      <ContentWrapper className="!mt-0 py-3 md:py-5">
        <Breadcrumb
          items={[
            { label: "Colleges", href: "/colleges" },
            { label: college?.name || "College" },
          ]}
        />
      </ContentWrapper>
      <HeroSection college={college} />
      <NavigationTabs college={college} />

      <div id="overview">
        <OverviewSection college={college} />
      </div>

      <div id="courses">
        <CourseSection college={college} />
      </div>

      <div id="admission">
        <AdmissionSection college={college} />
      </div>

      <div id="fees">
        <FeeSection college={college} />
      </div>

      <div id="placements">
        <PlacementSection college={college} />
        <RecruiterSection college={college} />
      </div>

      <div id="campus-life">
        <CampusLifeSection college={college} />
      </div>

      <div id="gallery">
        <GallerySection college={college} />
      </div>

      <div id="reviews">
        {/* <Review /> */}
        <StudentStories />
      </div>

      <div id="faq">
        <FAQ questions={consolidatedFaqs.length > 0 ? consolidatedFaqs : undefined} />
      </div>

      {/* Related Colleges */}
      <RelatedColleges
        currentCollegeId={id as string}
        city={college?.city}
        state={college?.state}
      />
    </div>
  );
}

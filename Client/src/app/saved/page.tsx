"use client";

import { useState } from "react";
import SectionDescription from "@/components/common/Section/SectionDescription";
import SectionHeading from "@/components/common/Section/SectionHeading";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import GridWrapper from "@/components/Ui/GridWrapper";
import CollegeCard from "@/components/common/Cards/collageCard";
import CourseCardDetailed from "@/components/common/Cards/CourseCardDetailed";
import ScholarshipCardDetailed from "@/components/common/Cards/ScholarshipCardDetailed";
import ExamCardDetailed from "@/components/common/Cards/ExamCardDetailed";
import JobCard from "@/components/common/Cards/JobCard";
import {
  GraduationCapIcon,
  OpenBookIcon,
  DocIcon,
  TrophyIcon,
  SuitCaseIcon,
} from "@/components/common/Icons";
import { useRouter } from "next/navigation";
import EmptyCollege from "./components/EmptyCollege";
import EmptyCourses from "./components/EmptyCourses";
import EmptyExams from "./components/EmptyExams";
import EmptyJobs from "./components/Emptyjobs";
import EmptyScholarShip from "./components/EmptyScholarShip";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useSavedItems } from "@/hooks/useSavedItems";
import Loader from "@/components/common/Loader";

type TabType = "colleges" | "courses" | "exams" | "scholarships" | "jobs";

interface Tab {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ width?: number; height?: number; fill?: string; className?: string }>;
}

const tabs: Tab[] = [
  { id: "colleges", label: "Colleges", icon: GraduationCapIcon },
  { id: "courses", label: "Courses", icon: OpenBookIcon },
  { id: "exams", label: "Exams", icon: DocIcon },
  { id: "scholarships", label: "Scholarships", icon: TrophyIcon },
  { id: "jobs", label: "Jobs", icon: SuitCaseIcon },
];

export default function SavedPage() {
  const [activeTab, setActiveTab] = useState<TabType>("colleges");
  const router = useRouter();

  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const { savedItems, isLoading, toggleSavedItem } = useSavedItems();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return <Loader fullPage label="Redirecting to login..." />;
  }

  if (isLoading) {
    return <Loader fullPage label="Fetching your saved items..." />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "colleges":
        return savedItems.colleges?.length > 0 ? (
          <GridWrapper colsMobile={1} colsFold={2} colsTablet={2} colsDesktop={4}>
            {savedItems.colleges.map((college: any, index: number) => (
              <CollegeCard
                key={college._id || index}
                college={college}
                isFavorite={true}
                onToggleFavorite={() => toggleSavedItem({ itemId: college._id, itemType: 'colleges' })}
              />
            ))}
          </GridWrapper>
        ) : (
          <EmptyCollege />
        );

      case "courses":
        return savedItems.courses?.length > 0 ? (
          <GridWrapper colsMobile={1} colsTablet={1} colsDesktop={2}>
            {savedItems.courses.map((course: any, index: number) => (
              <CourseCardDetailed
                key={course._id || index}
                title={course.courseName || course.name}
                stream={course.stream}
                type={course.courseType}
                entranceExams={course.entranceExams}
                onViewDetails={() => router.push(`/courses/${course._id}`)}
                onViewColleges={() => router.push(`/courses/${course._id}`)}
                isBookmarked={true}
                onBookmark={() => toggleSavedItem({ itemId: course._id, itemType: 'courses' })}
              />
            ))}
          </GridWrapper>
        ) : (
          <EmptyCourses />
        );

      case "exams":
        return savedItems.exams?.length > 0 ? (
          <GridWrapper colsMobile={1} colsTablet={1} colsDesktop={2}>
            {savedItems.exams.map((exam: any, index: number) => (
              <ExamCardDetailed
                key={exam._id || index}
                onViewDetails={() => router.push(`/exams/${exam._id}`)}
                onApplyNow={() => router.push(`/exams/${exam._id}`)}
                isBookmarked={true}
                onBookmark={() => toggleSavedItem({ itemId: exam._id, itemType: 'exams' })}
              />
            ))}
          </GridWrapper>
        ) : (
          <EmptyExams />
        );

      case "scholarships":
        return savedItems.scholarships?.length > 0 ? (
          <GridWrapper colsMobile={1} colsTablet={1} colsDesktop={2}>
            {savedItems.scholarships.map((scholarship: any, index: number) => (
              <ScholarshipCardDetailed
                key={scholarship._id || index}
                onApplyNow={() => { }}
                onCheckEligibility={() => { }}
                isBookmarked={true}
                onBookmark={() => toggleSavedItem({ itemId: scholarship._id, itemType: 'scholarships' })}
              />
            ))}
          </GridWrapper>
        ) : (
          <EmptyScholarShip />
        );

      case "jobs":
        return savedItems.jobs?.length > 0 ? (
          <GridWrapper colsMobile={1} colsTablet={1} colsDesktop={1}>
            {savedItems.jobs.map((job: any, index: number) => (
              <JobCard
                key={job._id || index}
                title={job.title}
                company={job.company}
                employmentType={job.employmentType}
                salaryRange={job.salaryRange}
                location={job.location}
                postedTime={job.postedTime}
                onViewDetails={() => router.push(`/jobs-internships/${job._id}`)}
                onApply={() => { }}
                onBookmark={() => toggleSavedItem({ itemId: job._id, itemType: 'jobs' })}
                isBookmarked={true}
              />
            ))}
          </GridWrapper>
        ) : (
          <EmptyJobs />
        );

      default:
        return null;
    }
  };

  return (
    <ContentWrapper>
      <section className="space-y-3 w-full flex flex-col justify-center items-center mb-6 sm:mb-8 px-4 sm:px-0">
        <SectionHeading title="Saved Items" as="h1" />
        <SectionDescription className="max-w-[35rem] text-center text-sm sm:text-base">
          Everything you've bookmarked — colleges, courses, scholarships, exams, and jobs — all in one place.
        </SectionDescription>
      </section>

      {/* Tabs */}
      <div className="flex items-center justify-start w-full gap-[6px] flex-wrap sm:flex-nowrap overflow-x-auto pb-2 sm:pb-0 my-6 sm:my-8 px-4 sm:px-0 scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          const iconFill = isActive ? "#FFFFFF" : "#767E92";
          const textColor = isActive ? "text-white" : "text-[#767e92]";

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-[4px] px-[10px] sm:px-[12px] py-[6px] sm:py-[8px] rounded-[50px] border-[0.5px] transition-all shrink-0 ${isActive
                ? "bg-[#513392] border-[#dac9ff]"
                : "bg-white border-[#e2e4e8] hover:border-[#513392]/30"
                }`}
            >
              <Icon width={18} height={18} className="sm:w-5 sm:h-5" fill={iconFill} />
              <span
                className={`text-xs sm:text-sm leading-[18px] sm:leading-[20px] whitespace-nowrap ${textColor}`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="w-full px-4 sm:px-0">{renderContent()}</div>
    </ContentWrapper>
  );
}

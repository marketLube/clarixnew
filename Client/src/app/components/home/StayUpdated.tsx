"use client";
import SectionHeading from "@/components/common/Section/SectionHeading";
import SectionDescription from "@/components/common/Section/SectionDescription";
import { Button } from "@/components/common/Button";
import ExamCard from "@/components/common/Cards/examCard";
import { ArrowRightIcon } from "@/components/common/Icons";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import { useRouter } from "next/navigation";
import { useExams } from "@/hooks/exam/useExams";
import Loader from "@/components/common/Loader";
import { useCmsHomepage } from "@/hooks/cms/useCmsHomepage";

import CompactExamCard from "@/components/common/Cards/CompactExamCard";

export default function StayUpdated() {
  const router = useRouter();

  // Fetch exams using the hook. Fetching first 4 for display.
  const { data: examsData, isLoading } = useExams(1, 8); // Increased to 8 to support 2 rows on mobile

  // CMS content for this section
  const { contentBlocks } = useCmsHomepage();

  // Prefer a block explicitly tagged for this section, otherwise fall back to index 1
  const stayBlock =
    contentBlocks?.blocks?.find(
      (block) => block.sectionKey === "stay-updated"
    ) ?? contentBlocks?.blocks?.[1];

  const title = stayBlock?.title ?? "";
  const description = stayBlock?.description ?? "";

  const exams = examsData?.data?.exams || [];

  return (
    <section className="w-full bg-[#F6F7FF] py-4 sm:py-16">
      <ContentWrapper className="px-4 md:px-10">
        {/* Hero Section */}
        <div className="mb-10 flex flex-col gap-0 md:gap-10 lg:mb-12 lg:flex-row lg:items-start lg:justify-between">
          {/* Left: Heading */}
          <div className="flex-1 lg:w-[600px]">
            <SectionHeading
              title={title}
              className="text-[22px] leading-[40px] md:text-[40px] md:leading-[44px] lg:text-[48px] lg:leading-[48px]"
            />
          </div>

          {/* Right: Description and Button */}
          <div className="flex-1 lg:w-[358px] flex flex-col gap-[31px]">
            <SectionDescription>{description}</SectionDescription>

            <Button
              variant="primary"
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-[10px] rounded-[30px] font-poppins text-[13px] sm:text-[16px] leading-[16px] sm:leading-[20px] w-fit whitespace-nowrap"
              onClick={() => router.push("/exams")}
            >
              View All Updates
              <ArrowRightIcon width={16} height={16} className="sm:w-[24px] sm:h-[24px]" fill="#FAF9F6" />
            </Button>
          </div>
        </div>

        {/* Cards Section */}
        <div className="space-y-6">
          {/* Cards */}
          <div className="mt-2">
            {isLoading ? (
              <Loader />
            ) : exams.length > 0 ? (
              <>
                {/* Desktop Grid View */}
                <div className="hidden md:grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-[#F6F7FF]">
                  {exams.map((exam) => (
                    <ExamCard
                      id={exam._id}
                      key={exam._id}
                      tagLabel="Entrance Exam"
                      statusLabel={exam.isActive ? "Open" : "Closing Soon"}
                      title={exam.shortName}
                      subtitle={exam.fullName}
                      registrationLabel="Registration"
                      registrationDate={new Date(exam.registrationDate).toLocaleDateString()}
                      examDateLabel="Exam Date"
                      examDate={new Date(exam.examDate).toLocaleDateString()}
                      eligibility={Array.isArray(exam.qualificationRequired) ? exam.qualificationRequired[0] : exam.qualificationRequired}
                      collegesInfo={`${exam.collegesAccepting}+ colleges accepting this exam`}
                      logo={exam.logo}
                    />
                  ))}
                </div>

                {/* Mobile Scrolling View (1 Row if <= 2 cards, 2 Rows if > 2 cards) */}
                <div className="md:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide pb-6">
                  <div className={`grid ${exams.length <= 2 ? "grid-rows-1" : "grid-rows-2"} grid-flow-col gap-3 w-max`}>
                    {exams.map((exam) => (
                      <div key={exam._id} className="w-[240px] h-full">
                        <CompactExamCard
                          id={exam._id}
                          tagLabel="Entrance Exam"
                          statusLabel={exam.isActive ? "Open" : "Closing Soon"}
                          title={exam.shortName}
                          subtitle={exam.fullName}
                          registrationDate={new Date(exam.registrationDate).toLocaleDateString()}
                          examDate={new Date(exam.examDate).toLocaleDateString()}
                          logo={exam.logo}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 py-10 w-full">
                No active exams found at the moment.
              </div>
            )}
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}

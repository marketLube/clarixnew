"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { X, Filter, ChevronDown, Check } from "lucide-react";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import ExamsList from "./components/ExamsList";
import { useCmsExamPage } from "@/hooks/cms/useCmsExamPage";
import FAQ from "@/app/components/common/FAQ";
import { examsFaqsData } from "@/app/utilities/DummyData";
import { useExams } from "@/hooks/exam/useExams";
import { useStreams } from "@/hooks/stream/useStreams";
import { useSavedItems } from "@/hooks/useSavedItems";
import Loader from "@/components/common/Loader";

export default function ExamsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;
  const stream = searchParams.get("stream") || undefined;

  const { data: examsData, isLoading: isExamsLoading } = useExams(currentPage, cardsPerPage, stream);
  const { data: streamsData, isLoading: isStreamsLoading } = useStreams();

  const exams = examsData?.data?.exams || [];
  const totalPages = examsData?.data?.pagination?.totalPages || 0;
  
  const cmsStreams = streamsData?.data?.streams || [];

  const [isStreamDropdownOpen, setIsStreamDropdownOpen] = useState(false);
  const streamDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (streamDropdownRef.current && !streamDropdownRef.current.contains(event.target as Node)) {
        setIsStreamDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { savedItems, toggleSavedItem } = useSavedItems();

  const handleFilterUpdate = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      if (params.get(key) === value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.push(`/exams?${params.toString()}`);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("stream");
    params.set("page", "1");
    router.push(`/exams?${params.toString()}`);
  };

  const mappedExams = exams.map((exam) => ({
    id: exam._id,
    title: exam.shortName,
    subtitle: exam.fullName,
    status: (exam.isActive ? "open" : "closing-soon") as "open" | "closing-soon",
    eligibility: Array.isArray(exam.qualificationRequired) ? exam.qualificationRequired.join(", ") : exam.qualificationRequired,
    collegeCount: exam.collegesAccepting,
    registrationDate: new Date(exam.registrationDate).toLocaleDateString(),
    examDate: new Date(exam.examDate).toLocaleDateString(),
    resultsDate: new Date(exam.resultPublishDate).toLocaleDateString(),
    description: exam.description,
    isBookmarked: savedItems.exams?.some((e: any) => e._id === exam._id),
  }));

  const { heroSection } = useCmsExamPage();
  const title = heroSection?.primaryHeadline;
  const description = heroSection?.subHeadline;

  return (
    <section className="py-6 md:py-10 min-h-screen">
      <ContentWrapper className="flex flex-col gap-6 md:gap-10">
        
        {/* Header Section */}
        {heroSection?.enabled !== false && (
          <div className="flex flex-col gap-4 md:gap-[30px] items-start">
            <h1 className="font-helvetica font-medium leading-[30px] md:leading-[40px] lg:leading-[48px] text-[#162447] text-[20px] md:text-[32px] lg:text-[48px] tracking-[-0.96px] max-w-[638px]">
              {title}
            </h1>
            <div className="font-poppins leading-5 text-[#767e92] text-[13px] md:text-[16px] lg:text-[16px] max-w-[567px]">
              <p className="mb-0">
                {description}
              </p>
            </div>
          </div>
        )}

        {/* Filter Section */}
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-[#162447] font-helvetica font-medium">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </div>

            {/* Stream Dropdown */}
            <div className="relative" ref={streamDropdownRef}>
              <button
                type="button"
                onClick={() => setIsStreamDropdownOpen(!isStreamDropdownOpen)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#e0e4f0] bg-white text-[#162447] text-sm font-helvetica hover:border-[#513392] transition-colors shadow-sm"
              >
                <span>{stream ? `Stream: ${cmsStreams.find((s) => s._id === stream)?.name || stream}` : "Stream"}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isStreamDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isStreamDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 max-h-[300px] overflow-y-auto bg-white border border-[#e0e4f0] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] z-20 py-2 custom-scrollbar">
                  <div className="px-4 py-2 text-xs font-semibold text-[#767e92] uppercase tracking-wider">
                    Select a Stream
                  </div>
                  {isStreamsLoading ? (
                    <div className="px-4 py-3 text-sm text-[#767e92]">Loading streams...</div>
                  ) : cmsStreams.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-[#767e92]">No streams found</div>
                  ) : (
                    cmsStreams.map((s) => (
                      <button
                        key={s._id}
                        onClick={() => {
                          handleFilterUpdate("stream", s._id);
                          setIsStreamDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm font-helvetica flex items-center justify-between hover:bg-[#f7f8ff] transition-colors"
                      >
                        <span className={stream === s._id ? "text-[#513392] font-medium" : "text-[#162447]"}>
                          {s.name}
                        </span>
                        {stream === s._id && <Check className="w-4 h-4 text-[#513392]" />}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Active Filters */}
          {stream && (
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-sm font-helvetica text-[#767e92] mr-2">Active:</span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f5eefe] text-[#513392] text-sm font-helvetica font-medium border border-[#e5d5ff] transition-all">
                Stream: {cmsStreams.find((s) => s._id === stream)?.name || stream}
                <button
                  onClick={() => handleFilterUpdate("stream", null)}
                  className="hover:bg-[#d9c4fb] rounded-full p-0.5 transition-colors flex items-center justify-center"
                  aria-label="Remove stream filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
              <button
                onClick={handleClearFilters}
                className="text-sm font-helvetica text-[#ff4b4b] hover:text-[#e73b3b] hover:underline ml-2 transition-colors"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {isExamsLoading ? (
          <Loader fullPage label="Loading exams..." />
        ) : (
          <ExamsList
            exams={mappedExams}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            onViewDetails={(examId) => {
              console.log("View details for exam:", examId);
            }}
            onApplicationProcess={(examId) => {
              console.log("Application process for exam:", examId);
            }}
            onExamPattern={(examId) => {
              console.log("Exam pattern for exam:", examId);
            }}
            onPreparationTips={(examId) => {
              console.log("Preparation tips for exam:", examId);
            }}
            onResults={(examId) => {
              console.log("Results for exam:", examId);
            }}
            onApplyNow={(examId) => {
              console.log("Apply now for exam:", examId);
            }}
            onBookmark={(examId) => {
              toggleSavedItem({ itemId: examId as string, itemType: "exams" });
            }}
          />
        )}
        <FAQ questions={examsFaqsData} />
      </ContentWrapper>
    </section>
  );
}

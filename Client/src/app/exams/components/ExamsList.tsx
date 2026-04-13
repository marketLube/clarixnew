"use client";

import ExamCardDetailed from "@/components/common/Cards/ExamCardDetailed";
import Pagination from "@/components/Ui/Pagination";

interface Exam {
  id: string | number;
  title: string;
  subtitle: string;
  status: "open" | "closing-soon";
  eligibility: string;
  collegeCount: number;
  registrationDate: string;
  examDate: string;
  resultsDate: string;
  description: string;
  isBookmarked?: boolean;
}

interface ExamsListProps {
  exams: Exam[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onViewDetails?: (examId: string | number) => void;
  onApplicationProcess?: (examId: string | number) => void;
  onExamPattern?: (examId: string | number) => void;
  onPreparationTips?: (examId: string | number) => void;
  onResults?: (examId: string | number) => void;
  onApplyNow?: (examId: string | number) => void;
  onBookmark?: (examId: string | number) => void;
}



export default function ExamsList({
  exams,
  currentPage,
  totalPages,
  onPageChange,
  onViewDetails,
  onApplicationProcess,
  onExamPattern,
  onPreparationTips,
  onResults,
  onApplyNow,
  onBookmark,
}: ExamsListProps) {
  return (
    <>
      {/* Exams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[14px] w-full">
        {exams.map((exam) => (
          <ExamCardDetailed
            key={exam.id}
            id={exam.id}
            title={exam.title}
            subtitle={exam.subtitle}
            status={exam.status}
            eligibility={exam.eligibility}
            collegeCount={exam.collegeCount}
            registrationDate={exam.registrationDate}
            examDate={exam.examDate}
            resultsDate={exam.resultsDate}
            description={exam.description}
            isBookmarked={exam.isBookmarked}
            onViewDetails={() => {
              onViewDetails?.(exam.id);
            }}
            onApplicationProcess={() => {
              onApplicationProcess?.(exam.id);
            }}
            onExamPattern={() => {
              onExamPattern?.(exam.id);
            }}
            onPreparationTips={() => {
              onPreparationTips?.(exam.id);
            }}
            onResults={() => {
              onViewDetails?.(exam.id);
            }}
            onApplyNow={() => {
              onApplyNow?.(exam.id);
            }}
            onBookmark={() => {
              onBookmark?.(exam.id);
            }}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center w-full">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}

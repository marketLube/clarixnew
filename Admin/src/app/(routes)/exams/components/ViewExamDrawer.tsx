"use client"

import {
  Sheet,
  SheetContent,
  SheetClose,
} from "@/src/components/ui/sheet";
import { X } from "lucide-react";
import Loader from "@/src/components/common/Loader";
import ErrorPage from "@/src/components/common/ErrorPage";
import { useExamById } from "@/src/servicesHooks/examHooks/useExamById";
import { Exam } from "@/src/servicesHooks/examHooks/types/examHooksType";

interface ViewExamDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  examId: string | null;
}

export function ViewExamDrawer({
  open,
  onOpenChange,
  examId,
}: ViewExamDrawerProps) {
  const { data, isLoading, error, refetch } = useExamById(examId || "");
  const exam: Exam | undefined = data?.data;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        hideClose
        side="right"
        className="p-0 flex flex-col h-full bg-white border-none sm:max-w-[700px]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex flex-col gap-1">
            <span className="text-xl font-semibold text-gray-800">
              View Exam Details
            </span>
          </div>
          <SheetClose className="hover:bg-gray-100 p-2 rounded-full transition-colors outline-none cursor-pointer">
            <X className="w-5 h-5 text-gray-500" />
          </SheetClose>
        </div>

        {isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <Loader className="py-20" />
          </div>
        )}

        {error && (
          <div className="flex-1 flex items-center justify-center p-6">
            <ErrorPage
              message={
                (error as any).message ||
                "Failed to fetch exam details. Please try again."
              }
              onRetry={() => refetch()}
              className="my-8"
            />
          </div>
        )}

        {!isLoading && !error && exam && (
          <div className="flex-1 overflow-y-auto px-8 py-4 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
            {/* Basic Info */}
            <section className="bg-gray-50 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Basic Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Exam Short Name
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                    {exam.shortName}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Exam Full Name
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                    {exam.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Registration Date
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                    {new Date(exam.registrationDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Exam Date
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                    {new Date(exam.examDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Result Publish Date
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                    {new Date(exam.resultPublishDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Colleges Accepting
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                    {exam.collegesAccepting}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Stream
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                    {typeof (exam as any).stream === 'object' && (exam as any).stream !== null
                      ? ((exam as any).stream.name || "N/A")
                      : ((exam as any).stream || "N/A")}
                  </p>
                </div>
              </div>
            </section>

            {/* Other Info */}
            <section className="bg-gray-50 rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">
                Additional Details
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Qualification Required
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                    {exam.qualificationRequired.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Official Website
                  </p>
                  <a
                    href={exam.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 inline-block rounded-lg border border-gray-200 bg-white text-emerald-700 hover:text-emerald-800 hover:border-emerald-300 text-sm break-all"
                  >
                    {exam.officialWebsite}
                  </a>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Description
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">
                    {exam.description}
                  </p>
                </div>
              </div>
            </section>

            {/* Logo */}
            {exam.logo && (
              <section className="bg-gray-50 rounded-xl p-5 space-y-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Exam Logo
                </h3>
                <div className="w-full h-32 border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={exam.logo}
                    alt={exam.shortName}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </section>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}



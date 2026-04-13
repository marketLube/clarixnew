"use client";

import {
  Sheet,
  SheetContent,
  SheetClose,
} from "@/src/components/ui/sheet";
import { X } from "lucide-react";
import Loader from "@/src/components/common/Loader";
import ErrorPage from "@/src/components/common/ErrorPage";
import { useJobById } from "@/src/servicesHooks/jobHooks/useJobById";
import { Job } from "@/src/servicesHooks/jobHooks/types/jobHooksType";

interface ViewJobDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string | null;
}

export default function ViewJobDrawer({
  open,
  onOpenChange,
  jobId,
}: ViewJobDrawerProps) {
  const { data, isLoading, error, refetch } = useJobById(jobId || "");
  const job: Job | undefined = data?.data;

  const salaryText = job
    ? `${job.salary.min}-${job.salary.max} ${job.salary.unit}`
    : "";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        hideClose
        side="right"
        className="p-0 flex flex-col h-full bg-white border-none sm:max-w-[800px]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex flex-col gap-1">
            <span className="text-xl font-semibold text-gray-800">
              View Job / Internship
            </span>
            <p className="text-sm text-gray-500">
              View complete details of this job posting
            </p>
          </div>
          <SheetClose className="hover:bg-gray-100 p-2 rounded-full transition-colors outline-none cursor-pointer">
            <X className="w-5 h-5 text-gray-500" />
          </SheetClose>
        </div>

        {isLoading && <Loader size="md" className="flex-1 py-20" />}

        {error && (
          <div className="flex-1 flex items-center justify-center p-6">
            <ErrorPage
              message={
                (error as any).message ||
                "Failed to fetch job details. Please try again."
              }
              onRetry={() => refetch()}
              className="my-8"
            />
          </div>
        )}

        {!isLoading && !error && job && (
          <div className="flex-1 overflow-y-auto px-8 py-4 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
            {/* Basic Info */}
            <section className="bg-gray-50 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Basic Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="col-span-2">
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Job Title
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                    {job.jobTitle}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Company / Recruiter
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                    {job.companyName}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Job Type
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                    {job.jobType}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Location
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                    {job.location}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Salary Range
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                    {salaryText}
                  </p>
                </div>
                {job.industry && (
                  <div>
                    <p className="text-[12px] font-medium text-[#364440] mb-1">
                      Industry
                    </p>
                    <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                      {job.industry}
                    </p>
                  </div>
                )}
                {job.employeeSize && (
                  <div>
                    <p className="text-[12px] font-medium text-[#364440] mb-1">
                      Employee Size
                    </p>
                    <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                      {job.employeeSize}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Company & summary */}
            <section className="bg-gray-50 rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">
                Company & Summary
              </h3>
              <div className="space-y-3 text-sm">
                {job.companyWebsite && (
                  <div>
                    <p className="text-[12px] font-medium text-[#364440] mb-1">
                      Company Website
                    </p>
                    <a
                      href={job.companyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 inline-block rounded-lg border border-gray-200 bg-white text-emerald-700 hover:text-emerald-800 hover:border-emerald-300 text-sm break-all"
                    >
                      {job.companyWebsite}
                    </a>
                  </div>
                )}
                {job.shortDescription && (
                  <div>
                    <p className="text-[12px] font-medium text-[#364440] mb-1">
                      Short Description
                    </p>
                    <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">
                      {job.shortDescription}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* About sections */}
            <section className="bg-gray-50 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">
                About this role
              </h3>
              <div className="space-y-3">
                {job.aboutJob && (
                  <div>
                    <p className="text-[12px] font-medium text-[#364440] mb-1">
                      About Job
                    </p>
                    <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">
                      {job.aboutJob}
                    </p>
                  </div>
                )}
                {!!job.aboutYou?.length && (
                  <div>
                    <p className="text-[12px] font-medium text-[#364440] mb-1">
                      About You
                    </p>
                    <ul className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm space-y-1 list-disc list-outside">
                      {job.aboutYou.map((item, idx) => (
                        <li key={idx} className="ml-3">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {!!job.aboutRole?.length && (
                  <div>
                    <p className="text-[12px] font-medium text-[#364440] mb-1">
                      About the Role
                    </p>
                    <ul className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm space-y-1 list-disc list-outside">
                      {job.aboutRole.map((item, idx) => (
                        <li key={idx} className="ml-3">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {/* FAQs */}
            {!!job.faqs?.length && (
              <section className="bg-gray-50 rounded-xl p-5 space-y-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  FAQs for this job
                </h3>
                <div className="space-y-4">
                  {job.faqs.map((faq, index) => (
                    <div
                      key={`${faq.question}-${index}`}
                      className="border border-gray-200 rounded-lg bg-white p-3 space-y-1"
                    >
                      <p className="text-[13px] font-semibold text-[#364440]">
                        Q{index + 1}. {faq.question}
                      </p>
                      <p className="text-[13px] text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}



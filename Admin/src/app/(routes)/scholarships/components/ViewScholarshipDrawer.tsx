"use client"

import {
  Sheet,
  SheetContent,
  SheetClose,
} from "@/src/components/ui/sheet";
import { X } from "lucide-react";
import Loader from "@/src/components/common/Loader";
import ErrorPage from "@/src/components/common/ErrorPage";
import { useScholarshipById } from "@/src/servicesHooks/scholarshipHooks/useScholarshipById";
import { Scholarship } from "@/src/servicesHooks/scholarshipHooks/types/scholarshipHooksType";

interface ViewScholarshipDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scholarshipId: string | null;
}

export function ViewScholarshipDrawer({
  open,
  onOpenChange,
  scholarshipId,
}: ViewScholarshipDrawerProps) {
  const { data, isLoading, error, refetch } = useScholarshipById(
    scholarshipId || ""
  );
  const scholarship: Scholarship | undefined = data?.data;

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
              View Scholarship
            </span>
            <p className="text-sm text-gray-500">
              View scholarship details and eligibility information
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
                "Failed to fetch scholarship details. Please try again."
              }
              onRetry={() => refetch()}
              className="my-8"
            />
          </div>
        )}

        {!isLoading && !error && scholarship && (
          <div className="flex-1 overflow-y-auto px-8 py-4 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
            {/* Basic Info */}
            <section className="bg-gray-50 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Basic Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="col-span-2">
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Scholarship Name
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                    {scholarship.scholarshipName}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Scholarship Type
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                    {scholarship.scholarshipType}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Funding Type
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                    {scholarship.fundingType}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Total Funding Amount
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                    ₹{scholarship.totalFundingAmount.toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Deadline
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                    {new Date(scholarship.deadline).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </section>

            {/* Additional details */}
            <section className="bg-gray-50 rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">
                Additional Details
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Official Website
                  </p>
                  <a
                    href={scholarship.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 inline-block rounded-lg border border-gray-200 bg-white text-emerald-700 hover:text-emerald-800 hover:border-emerald-300 text-sm break-all"
                  >
                    {scholarship.officialWebsite}
                  </a>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Description
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">
                    {scholarship.description}
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}



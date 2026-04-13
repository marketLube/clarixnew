"use client"

import {
  Sheet,
  SheetContent,
  SheetClose,
} from "@/src/components/ui/sheet";
import { X } from "lucide-react";
import Loader from "@/src/components/common/Loader";
import ErrorPage from "@/src/components/common/ErrorPage";
import { useRecruiterById } from "@/src/servicesHooks/recruiterHooks/useRecruiterById";

interface ViewRecruiterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  recruiterId: string | null;
}

export default function ViewRecruiterDrawer({
  isOpen,
  onClose,
  recruiterId,
}: ViewRecruiterDrawerProps) {
  const { data, isLoading, error, refetch } = useRecruiterById(
    recruiterId || ""
  );
  const recruiter = data?.data;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        hideClose={true}
        side="right"
        className="sm:max-w-[700px] p-0 border-none bg-[#F5F5F5] overflow-hidden flex flex-col font-sans"
      >
        {/* Header */}
        <div className="flex items-center justify-between py-4 px-6 bg-white border-b border-gray-100">
          <span className="text-[20px] font-bold text-gray-900 tracking-tight">
            View Recruiter Details
          </span>
          <SheetClose className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-all">
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
                "Failed to fetch recruiter details. Please try again."
              }
              onRetry={() => refetch()}
              className="my-8"
            />
          </div>
        )}

        {!isLoading && !error && recruiter && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
            {/* Company & Job Info */}
            <section className="bg-white rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Company Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="col-span-2">
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Company Name
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-800">
                    {recruiter.companyName}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Job Title
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-800">
                    {recruiter.jobTitle}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Industry
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-800">
                    {recruiter.industry || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Hiring Duration
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-800">
                    {recruiter.hiringDuration || "—"}
                  </p>
                </div>
              </div>
            </section>

            {/* Logo */}
            {recruiter.logo && (
              <section className="bg-white rounded-xl p-5 space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Company Logo
                </h3>
                <div className="w-full h-40 border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center p-4">
                  <img
                    src={recruiter.logo}
                    alt={recruiter.companyName}
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



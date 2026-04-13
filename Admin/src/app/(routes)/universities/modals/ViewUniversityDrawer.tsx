"use client"

import {
  Sheet,
  SheetContent,
  SheetClose,
} from "@/src/components/ui/sheet";
import { X } from "lucide-react";
import { useUniversityById } from "@/src/servicesHooks/universityHooks/useUniversityById";
import Loader from "@/src/components/common/Loader";
import ErrorPage from "@/src/components/common/ErrorPage";
import { University } from "@/src/servicesHooks/universityHooks/useUniversities";

interface ViewUniversityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  universityId: string | null;
}

export default function ViewUniversityDrawer({
  isOpen,
  onClose,
  universityId,
}: ViewUniversityDrawerProps) {
  const { data, isLoading, error, refetch } = useUniversityById(
    universityId || ""
  );
  const university: University | undefined = data?.data;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        hideClose={true}
        side="right"
        className="sm:max-w-[600px] p-0 border-none bg-[#F5F5F5] overflow-hidden flex flex-col font-sans"
      >
        {/* Header */}
        <div className="flex items-center justify-between py-4 px-6 bg-white border-b border-gray-100">
          <span className="text-[20px] font-bold text-gray-900 tracking-tight">
            View University Details
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
                "Failed to fetch university details. Please try again."
              }
              onRetry={() => refetch()}
              className="my-8"
            />
          </div>
        )}

        {!isLoading && !error && university && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
            <section className="bg-white rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Basic Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="col-span-2">
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    University Name
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-800">
                    {university.name}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Type
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-800">
                    {university.type}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Established Year
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-800">
                    {university.establishedYear}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    State
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-800">
                    {university.state}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    City
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-800">
                    {university.city}
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



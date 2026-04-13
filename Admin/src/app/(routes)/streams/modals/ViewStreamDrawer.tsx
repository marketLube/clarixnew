"use client"

import {
  Sheet,
  SheetContent,
  SheetClose,
} from "@/src/components/ui/sheet";
import { X } from "lucide-react";
import Loader from "@/src/components/common/Loader";
import ErrorPage from "@/src/components/common/ErrorPage";
import { useStreamById } from "@/src/servicesHooks/streamHooks/useStreamById";

interface ViewStreamDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  streamId: string | null;
}

export default function ViewStreamDrawer({
  isOpen,
  onClose,
  streamId,
}: ViewStreamDrawerProps) {
  const { data, isLoading, error, refetch } = useStreamById(streamId || "");
  const stream = data?.data;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        hideClose={true}
        side="right"
        className="sm:max-w-[700px] p-0 border-none bg-white overflow-hidden flex flex-col font-sans"
      >
        {/* Header */}
        <div className="flex items-center justify-between py-3 px-5 bg-white border-b border-gray-100">
          <span className="text-[18px] font-bold text-gray-900 tracking-tight">
            View Stream Details
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
                "Failed to fetch stream details. Please try again."
              }
              onRetry={() => refetch()}
              className="my-8"
            />
          </div>
        )}

        {!isLoading && !error && stream && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
            {/* Basic Info */}
            <section className="bg-gray-50 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Basic Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="col-span-2">
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Stream Name
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                    {stream.name}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Number of Colleges
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                    {stream.collegesCount ?? "—"}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#364440] mb-1">
                    Status
                  </p>
                  <p className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
                    {stream.enabled ? "Enabled" : "Disabled"}
                  </p>
                </div>
              </div>
            </section>

            {/* Image */}
            {stream.image && (
              <section className="bg-gray-50 rounded-xl p-5 space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Stream Image
                </h3>
                <div className="w-full h-40 border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={stream.image}
                    alt={stream.name}
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

"use client"

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetClose,
} from "@/src/components/ui/sheet";
import { Button } from "@/src/components/ui/button";
import { X, ImageIcon } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { SearchableSelect } from "@/src/components/ui/SearchableSelect";
import Loader from "@/src/components/common/Loader";
import ErrorPage from "@/src/components/common/ErrorPage";
import { INDUSTRY_OPTIONS } from "../data/data";
import { useRecruiterById } from "@/src/servicesHooks/recruiterHooks/useRecruiterById";
import { useUpdateRecruiter } from "@/src/servicesHooks/recruiterHooks/useUpdateRecruiter";

interface EditRecruiterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  recruiterId: string | null;
}

interface RecruiterFormState {
  companyName: string;
  jobTitle: string;
  hiringDuration: string;
  industry: string;
  logo: File | string | null;
  existingLogoUrl?: string | null;
}

const INITIAL_STATE: RecruiterFormState = {
  companyName: "",
  jobTitle: "",
  hiringDuration: "",
  industry: "",
  logo: null,
  existingLogoUrl: null,
};

export default function EditRecruiterDrawer({
  isOpen,
  onClose,
  recruiterId,
}: EditRecruiterDrawerProps) {
  const { data, isLoading, error, refetch } = useRecruiterById(
    recruiterId || ""
  );
  const { updateRecruiter, isPending, isError, error: updateError } =
    useUpdateRecruiter();

  const recruiter = data?.data;

  const [formData, setFormData] = useState<RecruiterFormState>(INITIAL_STATE);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (recruiter) {
      setFormData({
        companyName: recruiter.companyName || "",
        jobTitle: recruiter.jobTitle || "",
        hiringDuration: recruiter.hiringDuration || "",
        industry: recruiter.industry || "",
        logo: null,
        existingLogoUrl: recruiter.logo || null,
      });
      setImagePreview(recruiter.logo || null);
    }
  }, [recruiter]);

  const updateField = (field: keyof RecruiterFormState, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("File size must be less than 3 MB");
        return;
      }
      updateField("logo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!recruiterId) return;

    const formDataToSend = new FormData();
    formDataToSend.append("companyName", formData.companyName);
    formDataToSend.append("jobTitle", formData.jobTitle);
    formDataToSend.append("hiringDuration", formData.hiringDuration);
    if (formData.industry) {
      formDataToSend.append("industry", formData.industry);
    }

    // Only append logo if a new File was selected
    if (formData.logo && typeof formData.logo !== "string") {
      formDataToSend.append("logo", formData.logo);
    }

    updateRecruiter(
      { id: recruiterId, formData: formDataToSend },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (err: any) => {
          console.error("Failed to update recruiter:", err);
        },
      }
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        hideClose={true}
        side="right"
        className="sm:max-w-[700px] p-0 border-none bg-[#F5F5F5] overflow-hidden flex flex-col font-sans"
      >
        {/* Header */}
        <div className="flex items-center justify-between py-4 px-6 bg-white border-b border-gray-100">
          <span className="text-[18px] font-semibold text-gray-900">
            Edit Recruiter
          </span>
          <SheetClose className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all">
            <X className="w-5 h-5 text-gray-400" />
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

        {!isLoading && !error && (
          <>
            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
              <div className="flex flex-col gap-5">
                <div className="bg-white rounded-xl p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-[13px] font-medium text-gray-700">
                        Company Name
                      </Label>
                      <Input
                        value={formData.companyName}
                        onChange={(e) =>
                          updateField("companyName", e.target.value)
                        }
                        placeholder="Company name"
                        className="mt-2 h-[40px] border-gray-300 rounded-lg text-[14px]"
                      />
                    </div>

                    <div>
                      <Label className="text-[13px] font-medium text-gray-700">
                        Job Title
                      </Label>
                      <Input
                        value={formData.jobTitle}
                        onChange={(e) =>
                          updateField("jobTitle", e.target.value)
                        }
                        placeholder="Job Title"
                        className="mt-2 h-[40px] border-gray-300 rounded-lg text-[14px]"
                      />
                    </div>

                    <div>
                      <Label className="text-[13px] font-medium text-gray-700">
                        Hiring Duration
                      </Label>
                      <Input
                        value={formData.hiringDuration}
                        onChange={(e) =>
                          updateField("hiringDuration", e.target.value)
                        }
                        placeholder="Hiring Last (DD)"
                        className="mt-2 h-[40px] border-gray-300 rounded-lg text-[14px]"
                      />
                    </div>

                    <div>
                      <Label className="text-[13px] font-medium text-gray-700">
                        Industry
                      </Label>
                      <SearchableSelect
                        value={formData.industry}
                        onValueChange={(val) =>
                          updateField("industry", val as string)
                        }
                        options={INDUSTRY_OPTIONS}
                        placeholder="Select Industry"
                        searchPlaceholder="Search industries..."
                        className="mt-2"
                      />
                    </div>

                    <div className="col-span-2">
                      <Label className="text-[13px] font-medium text-gray-700 mb-1 block">
                        Company Logo
                      </Label>
                      <p className="text-[12px] text-gray-500 mb-2">
                        {imagePreview
                          ? "Current logo shown below. Click or drop a new image to replace it."
                          : "Upload a logo for this company. Click or drop an image."}
                      </p>
                      <div className="relative w-full h-40 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center gap-3 group hover:border-emerald-500 hover:bg-emerald-50/50 transition-all cursor-pointer overflow-hidden">
                        <input
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        {imagePreview ? (
                          <>
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-full object-contain absolute inset-0 p-4"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-black/40 text-[12px] text-white text-center py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              Click to change logo
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                              <ImageIcon className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-center">
                              <p className="text-[14px] font-semibold text-gray-700">
                                Drag & drop your Company Logo here
                              </p>
                              <p className="text-[12px] text-gray-400 mt-1">
                                Max size: 3 MB
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-white border-t border-gray-100 flex justify-end gap-3">
              <Button
                onClick={handleSubmit}
                disabled={
                  isPending ||
                  !formData.companyName ||
                  !formData.jobTitle ||
                  !formData.hiringDuration
                }
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2 rounded-lg font-medium"
              >
                {isPending ? "Updating..." : "Update"}
              </Button>
            </div>

          </>
        )}
      </SheetContent>
    </Sheet>
  );
}



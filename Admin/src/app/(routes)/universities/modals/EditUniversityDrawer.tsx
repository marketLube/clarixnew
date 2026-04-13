"use client"

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetClose,
} from "@/src/components/ui/sheet";
import { Button } from "@/src/components/ui/button";
import { X } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Select } from "@/src/components/ui/Selector";
import Loader from "@/src/components/common/Loader";
import ErrorPage from "@/src/components/common/ErrorPage";
import { useUniversityById } from "@/src/servicesHooks/universityHooks/useUniversityById";
import { useUpdateUniversity } from "@/src/servicesHooks/universityHooks/useUpdateUniversity";
import { UniversityFormData } from "@/src/servicesHooks/universityHooks/types/universityHooksType";

interface EditUniversityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  universityId: string | null;
}

const UNIVERSITY_TYPE_OPTIONS = [
  { label: "Public", value: "Public" },
  { label: "Private", value: "Private" },
  { label: "State", value: "State" },
  { label: "Central", value: "Central" },
  { label: "Deemed", value: "Deemed" },
];

export default function EditUniversityDrawer({
  isOpen,
  onClose,
  universityId,
}: EditUniversityDrawerProps) {
  const { data, isLoading, error, refetch } = useUniversityById(
    universityId || ""
  );
  const { updateUniversity, isPending, isError, error: updateError } =
    useUpdateUniversity();

  const university = data?.data;

  const [formData, setFormData] = useState<UniversityFormData>({
    name: "",
    type: "Public",
    state: "",
    city: "",
    establishedYear: new Date().getFullYear(),
  });

  useEffect(() => {
    if (university) {
      setFormData({
        name: university.name,
        type: university.type,
        state: university.state,
        city: university.city,
        establishedYear: university.establishedYear,
      });
    }
  }, [university]);

  const updateField = (field: keyof UniversityFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!universityId) return;

    const payload: Partial<UniversityFormData> = {
      name: formData.name,
      type: formData.type,
      state: formData.state,
      city: formData.city,
      establishedYear: formData.establishedYear,
    };

    updateUniversity(
      { id: universityId, data: payload },
      {
        onSuccess: () => {
          onClose();
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
          <span className="text-[20px] font-bold text-gray-900 tracking-tight">
            Edit University
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

        {!isLoading && !error && (
          <>
            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
              <div className="flex flex-col gap-5">
                {/* Basic Information */}
                <div className="bg-white rounded-xl p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label className="text-[12px] font-medium text-[#364440]">
                        University Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder="e.g., Delhi University"
                        className="mt-2 h-[38px] border-gray-400 rounded-[8px] text-[13px]"
                      />
                    </div>

                    <div>
                      <Label className="text-[12px] font-medium text-[#364440]">
                        Type <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.type}
                        onValueChange={(val) =>
                          updateField("type", val as UniversityFormData["type"])
                        }
                        options={UNIVERSITY_TYPE_OPTIONS}
                        placeholder="Select Type"
                        className="mt-2 !border-gray-400 rounded-[8px] h-[38px] text-[13px]"
                      />
                    </div>

                    <div>
                      <Label className="text-[12px] font-medium text-[#364440]">
                        Established Year <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="number"
                        value={formData.establishedYear}
                        onChange={(e) =>
                          updateField(
                            "establishedYear",
                            Number(e.target.value)
                          )
                        }
                        placeholder="e.g., 1922"
                        className="mt-2 h-[38px] border-gray-400 rounded-[8px] text-[13px]"
                      />
                    </div>

                    <div>
                      <Label className="text-[12px] font-medium text-[#364440]">
                        State <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={formData.state}
                        onChange={(e) => updateField("state", e.target.value)}
                        placeholder="e.g., Delhi"
                        className="mt-2 h-[38px] border-gray-400 rounded-[8px] text-[13px]"
                      />
                    </div>

                    <div>
                      <Label className="text-[12px] font-medium text-[#364440]">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={formData.city}
                        onChange={(e) => updateField("city", e.target.value)}
                        placeholder="e.g., New Delhi"
                        className="mt-2 h-[38px] border-gray-400 rounded-[8px] text-[13px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-white border-t border-gray-100 flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={onClose}
                disabled={isPending}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isPending}
                className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[120px]"
              >
                {isPending ? "Updating..." : "Update University"}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

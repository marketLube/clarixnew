"use client"

import { useState, useEffect } from "react";
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
import { useAddRecruiter } from "@/src/servicesHooks/recruiterHooks/useAddRecruiter";
import { INDUSTRY_OPTIONS } from "../data/data";

interface AddRecruiterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

interface RecruiterFormData {
    companyName: string;
    jobTitle: string;
    hiringDuration: string;
    industry: string;
    logo: File | null;
}

const INITIAL_FORM_STATE: RecruiterFormData = {
    companyName: '',
    jobTitle: '',
    hiringDuration: '',
    industry: '',
    logo: null,
};


export default function AddRecruiterDrawer({ isOpen, onClose }: AddRecruiterDrawerProps) {
    const { addRecruiter, isPending, isError, error } = useAddRecruiter();
    const [formData, setFormData] = useState<RecruiterFormData>(INITIAL_FORM_STATE);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const updateField = (field: keyof RecruiterFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const resetForm = () => {
        setFormData(INITIAL_FORM_STATE);
        setImagePreview(null);
    };

    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
    }, [isOpen]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file size (max 3 MB)
            if (file.size > 3 * 1024 * 1024) {
                alert("File size must be less than 3 MB");
                return;
            }
            updateField('logo', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        const data = new FormData();
        data.append('companyName', formData.companyName);
        data.append('jobTitle', formData.jobTitle);
        data.append('hiringDuration', formData.hiringDuration);

        if (formData.industry) {
            data.append('industry', formData.industry);
        }

        if (formData.logo) {
            data.append('logo', formData.logo);
        }

        addRecruiter(data, {
            onSuccess: () => {
                resetForm();
                onClose();
            },
        });
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
                    <span className="text-[18px] font-semibold text-gray-900">Top Recruiters</span>
                    <SheetClose className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all">
                        <X className="w-5 h-5 text-gray-400" />
                    </SheetClose>
                </div>

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
                    <div className="flex flex-col gap-5">
                        {/* Form Fields */}
                        <div className="bg-white rounded-xl p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-[13px] font-medium text-gray-700">
                                        Company Name
                                    </Label>
                                    <Input
                                        value={formData.companyName}
                                        onChange={(e) => updateField('companyName', e.target.value)}
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
                                        onChange={(e) => updateField('jobTitle', e.target.value)}
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
                                        onChange={(e) => updateField('hiringDuration', e.target.value)}
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
                                        onValueChange={(val) => updateField('industry', val)}
                                        options={INDUSTRY_OPTIONS}
                                        placeholder="Select Industry"
                                        searchPlaceholder="Search industries..."
                                        className="mt-2"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <Label className="text-[13px] font-medium text-gray-700 mb-3 block">
                                        Company Logo
                                    </Label>
                                    <div className="relative w-full h-40 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center gap-3 group hover:border-emerald-500 hover:bg-emerald-50/50 transition-all cursor-pointer overflow-hidden">
                                        <input
                                            type="file"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-full object-contain absolute inset-0 p-4"
                                            />
                                        ) : (
                                            <>
                                                <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                                                    <ImageIcon className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-[14px] font-semibold text-gray-700">
                                                        Drag & drop your Company Logo here
                                                    </p>
                                                    <p className="text-[12px] text-gray-400 mt-1">Max size: 3 MB</p>
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
                        disabled={isPending || !formData.companyName || !formData.jobTitle || !formData.hiringDuration}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2 rounded-lg font-medium"
                    >
                        {isPending ? "Saving..." : "Save"}
                    </Button>
                </div>

            </SheetContent>
        </Sheet>
    );
}


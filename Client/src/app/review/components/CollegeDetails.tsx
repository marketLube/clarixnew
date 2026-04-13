"use client";

import Input from "@/components/common/input";
import FormField from "@/components/common/FormField";
import { Search, Info, Upload, User } from "lucide-react";
import React from "react";

interface CollegeDetailsProps {
    formData: any;
    setFormData: (data: any) => void;
}

export default function CollegeDetails({ formData, setFormData }: CollegeDetailsProps) {

    const handleChange = (field: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="flex flex-col gap-4 md:gap-[24px] w-full">
            {/* Row 1: Student Name and Graduation Year */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-[16px] w-full">
                {/* Student Name */}
                <div className="flex flex-col gap-2 md:gap-[8px] w-full md:w-1/2">
                    <label className="font-helvetica font-medium text-sm md:text-[16px] leading-[24px] tracking-[-0.2px] text-[#162447]">
                        Student Name
                    </label>
                    <Input
                        type="text"
                        placeholder="Your name"
                        value={formData.userName || ''}
                        onChange={(e) => handleChange('userName', e.target.value)}
                        className="h-10 md:h-[44px] bg-[#fdfdfd] border border-[#ededed] rounded-[10px] px-3 md:px-[14px] text-[14px] text-[#162447] placeholder:text-[rgba(10,10,10,0.5)] font-inter"
                    />
                </div>

                {/* Graduation Year */}
                <div className="flex flex-col gap-2 md:gap-[8px] w-full md:w-1/2">
                    <label className="font-helvetica font-medium text-sm md:text-[16px] leading-[24px] tracking-[-0.2px] text-[#162447]">
                        Graduation Year
                    </label>
                    <Input
                        type="text" // or number? Figma has text "2024"
                        placeholder="2024"
                        value={formData.graduationYear || ''}
                        onChange={(e) => handleChange('graduationYear', e.target.value)}
                        className="h-10 md:h-[44px] bg-[#fdfdfd] border border-[#ededed] rounded-[10px] px-3 md:px-[14px] text-[14px] text-[#162447] placeholder:text-[rgba(10,10,10,0.5)] font-inter"
                    />
                </div>
            </div>

            {/* Row 2: College Name and Course */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-[16px] w-full">
                {/* College Name */}
                <div className="flex flex-col gap-2 md:gap-[8px] w-full md:w-1/2">
                    <label className="font-helvetica font-medium text-sm md:text-[16px] leading-[24px] tracking-[-0.2px] text-[#162447]">
                        College Name
                    </label>
                    <Input
                        type="text"
                        placeholder="College name"
                        value={formData.collegeName || ''}
                        onChange={(e) => handleChange('collegeName', e.target.value)}
                        className="h-10 md:h-[44px] bg-[#fdfdfd] border border-[#ededed] rounded-[10px] px-3 md:px-[14px] text-[14px] text-[#162447] placeholder:text-[rgba(10,10,10,0.5)] font-inter"
                    />
                </div>

                {/* Course */}
                <div className="flex flex-col gap-2 md:gap-[8px] w-full md:w-1/2">
                    <label className="font-helvetica font-medium text-sm md:text-[16px] leading-[24px] tracking-[-0.2px] text-[#162447]">
                        Course
                    </label>
                    <Input
                        type="text"
                        placeholder="Course Name"
                        value={formData.course || ''}
                        onChange={(e) => handleChange('course', e.target.value)}
                        className="h-10 md:h-[44px] bg-[#fdfdfd] border border-[#ededed] rounded-[10px] px-3 md:px-[14px] text-[14px] text-[#162447] placeholder:text-[rgba(10,10,10,0.5)] font-inter"
                    />
                </div>
            </div>
        </div>
    );
}

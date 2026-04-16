"use client";

import Input from "@/components/common/input";
import React, { useCallback } from "react";
import api from "@/lib/api";
import SearchableSelect, { SearchableSelectOption } from "./SearchableSelect";

interface CollegeDetailsProps {
    formData: any;
    setFormData: (data: any) => void;
}

export default function CollegeDetails({ formData, setFormData }: CollegeDetailsProps) {

    const handleChange = (field: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    const fetchColleges = useCallback(async (search: string): Promise<SearchableSelectOption[]> => {
        const { data } = await api.get("/college", {
            params: { search: search || undefined, page: 1, limit: 10 },
        });
        type CollegeHit = {
            _id?: string;
            id?: string;
            name?: string;
            collegeName?: string;
            city?: string;
            state?: string;
        };
        const colleges: CollegeHit[] = data?.data?.colleges ?? [];
        const options: SearchableSelectOption[] = [];
        for (const c of colleges) {
            const label = c.name ?? c.collegeName ?? "";
            if (!label) continue;
            const location = [c.city, c.state].filter(Boolean).join(", ");
            options.push({
                id: c._id ?? c.id ?? label,
                label,
                subtitle: location || undefined,
            });
        }
        return options;
    }, []);

    const fetchCourses = useCallback(async (search: string): Promise<SearchableSelectOption[]> => {
        const { data } = await api.get("/course", {
            params: { search: search || undefined, page: 1, limit: 10 },
        });
        type CourseHit = {
            _id?: string;
            id?: string;
            name?: string;
            courseName?: string;
            courseFullname?: string;
            courseLevel?: string;
            stream?: string | { name?: string };
        };
        const courses: CourseHit[] = data?.data?.courses ?? [];
        const options: SearchableSelectOption[] = [];
        for (const c of courses) {
            const label = c.name ?? c.courseName ?? c.courseFullname ?? "";
            if (!label) continue;
            const streamName =
                typeof c.stream === "object" ? c.stream?.name : c.stream;
            options.push({
                id: c._id ?? c.id ?? label,
                label,
                subtitle: c.courseLevel || streamName || undefined,
            });
        }
        return options;
    }, []);

    return (
        <div className="flex flex-col gap-4 md:gap-[24px] w-full">
            {/* Row 1: Student Name and Graduation Year */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-[16px] w-full">
                {/* Student Name */}
                <div className="flex flex-col gap-2 md:gap-[8px] w-full md:w-1/2">
                    <label className="font-poppins font-medium text-sm md:text-[16px] leading-[24px] tracking-[-0.2px] text-[#162447]">
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
                    <label className="font-poppins font-medium text-sm md:text-[16px] leading-[24px] tracking-[-0.2px] text-[#162447]">
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
                    <label
                        htmlFor="review-college-name"
                        className="font-poppins font-medium text-sm md:text-[16px] leading-[24px] tracking-[-0.2px] text-[#162447]"
                    >
                        College Name
                    </label>
                    <SearchableSelect
                        id="review-college-name"
                        value={formData.collegeName || ''}
                        onChange={(val) => handleChange('collegeName', val)}
                        placeholder="Search your college"
                        fetchOptions={fetchColleges}
                    />
                </div>

                {/* Course */}
                <div className="flex flex-col gap-2 md:gap-[8px] w-full md:w-1/2">
                    <label
                        htmlFor="review-course-name"
                        className="font-poppins font-medium text-sm md:text-[16px] leading-[24px] tracking-[-0.2px] text-[#162447]"
                    >
                        Course
                    </label>
                    <SearchableSelect
                        id="review-course-name"
                        value={formData.course || ''}
                        onChange={(val) => handleChange('course', val)}
                        placeholder="Search your course"
                        fetchOptions={fetchCourses}
                    />
                </div>
            </div>
        </div>
    );
}

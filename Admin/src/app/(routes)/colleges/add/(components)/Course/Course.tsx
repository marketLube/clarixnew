"use client"
import { Pencil, Plus, Trash2, Check, Search } from "lucide-react";
import { useState } from "react";
import AddCourseDrawer from "../../../../courses/modals/AddCourseDrawer";
import { CourseData } from "../../../(types)/type";
import { useCourses } from "@/src/servicesHooks/courseHooks/useCourse";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Filter } from "@/src/components/ui/Filter";
import { useStreams } from "@/src/servicesHooks/streamHooks/useStream";

interface CourseProps {
    formData: any;
    onUpdate: (field: string, value: any) => void;
    readOnly?: boolean;
}



export default function Course({ formData, onUpdate, readOnly = false }: CourseProps) {

    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");

    // Pass type to hook only if not 'all'
    const { data, isLoading, error, refetch } = useCourses({
        search: searchTerm,
        type: filterType === 'all' ? undefined : filterType
    });

  
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const courses = data?.data?.courses || [];
    
    // Extract selected course IDs from formData (could be array of IDs or array of objects)
    const selectedCourseIds = (formData.courses || []).map((item: any) => 
        typeof item === 'string' ? item : item?._id
    );
    
    // In view mode, filter to show only selected courses
    const displayCourses = readOnly 
        ? courses.filter((course: any) => selectedCourseIds.includes(course?._id))
        : courses;
    
    const selectedCoursesCount = selectedCourseIds.length;
    
    return (
        <div className="space-y-6 w-full pb-6 h-full flex flex-col">
            {/* Header: Search, Filter and Add Button */}
            {!readOnly && (
                <div className="flex items-center gap-3 sticky top-0 bg-white z-10 py-1">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search courses..."
                            className="pl-9 bg-gray-50 border-gray-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <Button
                        onClick={() => setIsDrawerOpen(true)}
                        variant="default"
                        className="shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        Add Course
                    </Button>
                </div>
            )}
            
            {/* View Mode: Show selected courses count */}
            {readOnly && selectedCoursesCount > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">{selectedCoursesCount} Course{selectedCoursesCount !== 1 ? 's' : ''} Selected</span>
                </div>
            )}

            {/* Course List */}
            <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {isLoading ? (
                    <div className="text-center py-10 text-gray-400">Loading courses...</div>
                ) : readOnly && displayCourses?.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">No courses selected for this college</div>
                ) : !readOnly && courses?.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">No courses found</div>
                ) : (
                 displayCourses && displayCourses?.length > 0 && displayCourses?.map((course: any, index: number) => {
                        const isSelected = selectedCourseIds.includes(course?._id);
                        return (
                            <div key={course?._id} className={`flex items-center justify-between px-5 py-3 bg-white border rounded-xl shadow-sm transition-all group ${!readOnly ? 'cursor-pointer' : ''} ${isSelected ? 'border-emerald-500 bg-emerald-50/10' : 'border-black/5 hover:border-black/10'}`}
                                onClick={readOnly ? undefined : () => {
                                    const newSelected = isSelected
                                        ? selectedCourseIds.filter((id: string) => id !== course?._id)
                                        : [...selectedCourseIds, course?._id];
                                    onUpdate("courses", newSelected);
                                }}
                            >
                                <div className="flex items-center gap-4">
                                    {!readOnly && (
                                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${isSelected ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 bg-white'}`}>
                                            {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-0.5">
                                        <span className={`text-[14px] font-medium leading-none ${isSelected || readOnly ? 'text-emerald-900' : 'text-gray-600'}`}>
                                            {course?.courseName || course?.name}
                                        </span>
                                        {course?.stream && (
                                            <span className="text-[11px] text-gray-400 font-normal">
                                                {course.stream.title || "Stream"}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    }))}
            </div>

            {!readOnly && (
                <AddCourseDrawer
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                />
            )}
        </div>
    );
}

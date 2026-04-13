"use client";

import { useState } from "react";
import { SectionContainer } from "@/src/components/ui/SectionContainer";
import SectionSearchAndFilterHeader from "@/src/components/common/SectionSearchAndFilterHeader";
import { Filter } from "@/src/components/ui/Filter";
import { CourseListItem } from "./CourseListItem";
import ViewCourseDrawer from "../modals/ViewCourseDrawer";
import EditCourseDrawer from "../modals/EditCourseDrawer";
import { useCourses } from "@/src/servicesHooks/courseHooks/useCourse";
import { useDeleteCourse } from "@/src/servicesHooks/courseHooks/useDeleteCourse";
import Loader from "@/src/components/common/Loader";
import NoData from "@/src/components/common/NoData";
import ErrorPage from "@/src/components/common/ErrorPage";

// Dummy filter options
const filterOptions = [
    { label: "All Types", value: "all" },
    { label: "Undergraduate", value: "undergraduate" },
    { label: "Postgraduate", value: "postgraduate" },
    { label: "Diploma", value: "diploma" },
    { label: "Certificate", value: "certificate" },
];

export function CoursesList() {
    const { data, isLoading, error, refetch } = useCourses();
    const { deleteCourse, isPending: isDeleting } = useDeleteCourse();
    const courses = data?.data?.courses || [];

    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [currentFilter, setCurrentFilter] = useState("all");
    const [viewCourseId, setViewCourseId] = useState<string | null>(null);
    const [editCourseId, setEditCourseId] = useState<string | null>(null);

    const toggleSelection = (id: string) => {
        setSelectedCourses((prev) =>
            prev.includes(id)
                ? prev.filter((courseId) => courseId !== id)
                : [...prev, id]
        );
    };

    const handleTypeSelection = (value: string) => {
        setCurrentFilter(value);
    };

    const handleView = (id: string) => {
        setViewCourseId(id);
    };

    const handleEdit = (id: string) => {
        console.log("handle edit ", id);
        setEditCourseId(id);
    };

    const handleCloseView = () => {
        setViewCourseId(null);
    };

    const handleCloseEdit = () => {
        setEditCourseId(null);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            deleteCourse(id, {
                onSuccess: () => {
                    refetch();
                },
            });
        }
    };

    // Filter courses based on selected type
    const filteredCourses =
        currentFilter === "all"
            ? courses
            : courses.filter(
                (course: any) => course.type.toLowerCase() === currentFilter
            );

    return (
        <SectionContainer>
            <div className="flex flex-col gap-4">
                <SectionSearchAndFilterHeader>
                    <Filter
                        defaultValue="All Types"
                        options={filterOptions}
                        onValueChange={handleTypeSelection}
                    />
                </SectionSearchAndFilterHeader>

                {isLoading && <Loader className="py-20" />}

                {error && (
                    <ErrorPage
                        message={error.message || "Failed to fetch courses. Please try again."}
                        onRetry={() => refetch()}
                        className="my-8"
                    />
                )}

                {!isLoading && !error && courses?.length === 0 && (
                    <NoData
                        title="No Courses Found"
                        description="We couldn't find any courses matching your criteria. Try different filters or add a new course."
                        className="my-8"
                    />
                )}

                {!isLoading && !error && filteredCourses.length > 0 && (
                    <div className="flex flex-col gap-2">
                        {filteredCourses.map((course: any, index: number) => (
                            <CourseListItem
                                key={course._id}
                                course={course}
                                isSelected={selectedCourses.includes(course._id)}
                                onToggleSelection={toggleSelection}
                                showDivider={index < filteredCourses.length - 1}
                                onView={handleView}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* View and Edit Drawers */}
            <ViewCourseDrawer
                isOpen={viewCourseId !== null}
                onClose={handleCloseView}
                courseId={viewCourseId}
            />
            <EditCourseDrawer
                isOpen={editCourseId !== null}
                onClose={handleCloseEdit}
                courseId={editCourseId}
            />
        </SectionContainer>
    );
}

"use client";

import { AdminHeader } from "@/src/components/common/AdminHeader";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { SectionMatrix } from "@/src/components/ui/SectionMatrix";
import { CoursesList } from "./(components)/CoursesList";
import { PlusIcon } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import AddCourseDrawer from "./modals/AddCourseDrawer";
import { useState } from "react";

const dummyMatrix = [
    { label: "Total Courses", value: "1,234" },
    { label: "Active Programs", value: "987" },
    { label: "Enrolled Students", value: "45.2K" },
    { label: "Avg. Duration", value: "3.5 Yrs" },
];

export default function CoursesPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <div className="flex flex-col gap-4">
            <AdminHeader />
            <div className="flex items-center justify-between">
                <SectionHeading
                    title="Courses & Programs"
                    description="Manage academic courses, programs, and curriculum across institutions"
                />
                <Button onClick={() => setIsDrawerOpen(true)}>
                    <PlusIcon className="w-4 h-4" />
                    Add Course
                </Button>
            </div>
            <SectionMatrix items={dummyMatrix} />

            <CoursesList />

            <AddCourseDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </div>
    );
}

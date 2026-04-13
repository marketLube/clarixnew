"use client";

import { useState } from "react";
import { AdminHeader } from "@/src/components/common/AdminHeader";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { SectionMatrix } from "@/src/components/ui/SectionMatrix";
import { RecruitersList } from "./(components)/RecruitersList";
import { PlusIcon } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import AddRecruiterDrawer from "./modals/AddRecruiterDrawer";

// Dummy matrix data
const dummyMatrix = [
    { label: "Total Recruiters", value: "2,345" },
    { label: "Active Companies", value: "1,876" },
    { label: "Job Openings", value: "5,432" },
    { label: "Avg. Hiring Duration", value: "45 Days" },
];

export default function RecruitersPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <div className="flex flex-col gap-4">
            <AdminHeader />
            <div className="flex items-center justify-between">
                <SectionHeading
                    title="Recruiters & Companies"
                    description="Manage recruiting companies, job opportunities, and placement partnerships"
                />
                <Button onClick={() => setIsDrawerOpen(true)}>
                    <PlusIcon className="w-4 h-4" />
                    Add Recruiter
                </Button>
            </div>
            <SectionMatrix items={dummyMatrix} />

            <RecruitersList />

            <AddRecruiterDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </div>
    );
}

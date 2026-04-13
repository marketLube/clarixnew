"use client";

import { useState } from "react";
import { AdminHeader } from "@/src/components/common/AdminHeader";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { SectionMatrix } from "@/src/components/ui/SectionMatrix";
import { UniversitiesList } from "./(components)/UniversitiesList";
import { PlusIcon } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import AddUniversityDrawer from "./modals/AddUniversityDrawer";
import { useUniversities } from "@/src/servicesHooks/universityHooks/useUniversities";

// Dummy matrix data
const dummyMatrix = [
    { label: "Total Universities", value: "456" },
    { label: "Affiliated Colleges", value: "2,345" },
    { label: "Total Students", value: "125K" },
    { label: "Avg. Rating", value: "4.3" },
];

export default function UniversitiesPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { data, isLoading, refetch } = useUniversities();

    return (
        <div className="flex flex-col gap-4">
            <AdminHeader />
            <div className="flex items-center justify-between">
                <SectionHeading
                    title="Universities & Boards"
                    description="Manage universities, examination boards, and their affiliated institutions"
                />
                <Button onClick={() => setIsDrawerOpen(true)}>
                    <PlusIcon className="w-4 h-4" />
                    Add University
                </Button>
            </div>
            <SectionMatrix items={dummyMatrix} />

            <UniversitiesList 
                universities={data?.data?.universities || []}
                isLoading={isLoading}
                onRefresh={refetch}
            />

            <AddUniversityDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </div>
    );
}

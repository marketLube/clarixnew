"use client";

import { useState } from "react";
import { AdminHeader } from "@/src/components/common/AdminHeader";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { SectionMatrix } from "@/src/components/ui/SectionMatrix";
import { StreamsList } from "./(components)/StreamsList";
import { PlusIcon } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import AddStreamDrawer from "./modals/AddStreamDrawer";
import { useStreams } from "@/src/servicesHooks/streamHooks/useStream";

// Dummy matrix data
const dummyMatrix = [
    { label: "Total Streams", value: "12" },
    { label: "Active Streams", value: "10" },
    { label: "Total Courses", value: "1,234" },
    { label: "Avg. Engagement", value: "85%" },
];

export default function StreamsPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { data, isLoading, refetch } = useStreams();

    return (
        <div className="flex flex-col gap-4">
            <AdminHeader />
            <div className="flex items-center justify-between">
                <SectionHeading
                    title="Streams & Disciplines"
                    description="Manage academic streams, disciplines, and their promotional content"
                />
                <Button onClick={() => setIsDrawerOpen(true)}>
                    <PlusIcon className="w-4 h-4" />
                    Add Stream
                </Button>
            </div>
            <SectionMatrix items={dummyMatrix} />

            <StreamsList 
                streams={data?.data?.streams || []}
                isLoading={isLoading}
                onRefresh={refetch}
            />

            <AddStreamDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </div>
    );
}

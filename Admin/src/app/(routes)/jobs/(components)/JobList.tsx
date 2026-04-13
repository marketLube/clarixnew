"use client";

import { useState } from "react";
import SectionSearchAndFilterHeader from "@/src/components/common/SectionSearchAndFilterHeader";
import { SectionContainer } from "@/src/components/ui/SectionContainer";
import JobListItem from "./JobListItem";
import { Filter } from "@/src/components/ui/Filter";
import { useJobs } from "@/src/servicesHooks/jobHooks/useJobs";
import Loader from "@/src/components/common/Loader";

const jobTypeOptions = [
    { label: "All Types", value: "all" },
    { label: "Full Time", value: "Full Time" },
    { label: "Part Time", value: "Part Time" },
    { label: "Internship", value: "Internship" },
    { label: "Contract", value: "Contract" },
    { label: "Freelance", value: "Freelance" },
];

const statusOptions = [
    { label: "All Status", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
];

interface JobListProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
}

export default function JobList({ searchQuery, onSearchChange }: JobListProps) {
    const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
    const [jobTypeFilter, setJobTypeFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const { data, isLoading } = useJobs({
        search: searchQuery,
        jobType: jobTypeFilter !== "all" ? jobTypeFilter as any : undefined,
        status: statusFilter !== "all" ? statusFilter as 'active' | 'inactive' : undefined,
    });

    const jobs = data?.data?.jobs || [];

    const toggleSelection = (id: string) => {
        setSelectedJobs((prev) =>
            prev.includes(id)
                ? prev.filter((jobId) => jobId !== id)
                : [...prev, id]
        );
    };

    return (
        <SectionContainer>
            <SectionSearchAndFilterHeader
                searchValue={searchQuery}
                onSearchChange={(e) => onSearchChange(e.target.value)}
            >
                <Filter
                    defaultValue="All Types"
                    options={jobTypeOptions}
                    onValueChange={setJobTypeFilter}
                />
                <Filter
                    defaultValue="All Status"
                    options={statusOptions}
                    onValueChange={setStatusFilter}
                />
            </SectionSearchAndFilterHeader>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                    <Loader size="md" />
                    <span className="text-gray-600">Loading jobs...</span>
                </div>
            ) : jobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        No jobs found
                    </h3>
                    <p className="text-sm text-gray-500">
                        Get started by posting your first job opportunity
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {jobs.map((job, index) => (
                        <JobListItem
                            key={job._id}
                            selectedJobs={selectedJobs.includes(job._id)}
                            setSelectedJobs={() => toggleSelection(job._id)}
                            data={job}
                            showDivider={index < jobs.length - 1}
                        />
                    ))}
                </div>
            )}
        </SectionContainer>
    );
}
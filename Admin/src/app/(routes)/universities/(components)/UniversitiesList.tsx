"use client";

import { useState } from "react";
import { SectionContainer } from "@/src/components/ui/SectionContainer";
import SectionSearchAndFilterHeader from "@/src/components/common/SectionSearchAndFilterHeader";
import { Filter } from "@/src/components/ui/Filter";
import { UniversityListItem } from "./UniversityListItem";
import ViewUniversityDrawer from "../modals/ViewUniversityDrawer";
import EditUniversityDrawer from "../modals/EditUniversityDrawer";
import Loader from "@/src/components/common/Loader";
import { University } from "@/src/servicesHooks/universityHooks/types/universityHooksType";
import { useDeleteUniversity } from "@/src/servicesHooks/universityHooks/useDeleteUniversity";

interface UniversitiesListProps {
    universities: University[];
    isLoading: boolean;
    onRefresh: () => void;
}

const filterOptions = [
    { label: "All Types", value: "all" },
    { label: "Central", value: "Central" },
    { label: "State", value: "State" },
    { label: "Private", value: "Private" },
    { label: "Public", value: "Public" },
    { label: "Deemed", value: "Deemed" },
];

export function UniversitiesList({ universities, isLoading, onRefresh }: UniversitiesListProps) {
    const { deleteUniversity, isPending: isDeleting } = useDeleteUniversity();
    const [selectedUniversities, setSelectedUniversities] = useState<string[]>([]);
    const [currentFilter, setCurrentFilter] = useState("all");
    const [viewUniversityId, setViewUniversityId] = useState<string | null>(null);
    const [editUniversityId, setEditUniversityId] = useState<string | null>(null);

    const toggleSelection = (id: string) => {
        setSelectedUniversities((prev) =>
            prev.includes(id)
                ? prev.filter((universityId) => universityId !== id)
                : [...prev, id]
        );
    };

    const handleTypeSelection = (value: string) => {
        setCurrentFilter(value);
    };

    const handleView = (id: string) => {
        setViewUniversityId(id);
    };

    const handleEdit = (id: string) => {
        setEditUniversityId(id);
    };

    const handleCloseView = () => {
        setViewUniversityId(null);
    };

    const handleCloseEdit = () => {
        setEditUniversityId(null);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this university?")) {
            deleteUniversity(id, {
                onSuccess: () => {
                    onRefresh();
                },
            });
        }
    };

    // Filter universities based on selected type
    const filteredUniversities =
        currentFilter === "all"
            ? universities
            : universities.filter(
                (university) => university.type === currentFilter
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

                {/* Loading State */}
                {isLoading ? (
                    <Loader size="md" className="py-12" />
                ) : filteredUniversities.length === 0 ? (
                    /* Empty State */
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
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            No universities found
                        </h3>
                        <p className="text-sm text-gray-500">
                            {currentFilter === "all"
                                ? "Get started by adding your first university"
                                : `No ${currentFilter} universities available`}
                        </p>
                    </div>
                ) : (
                    /* Universities List */
                    <>
                        <div className="flex flex-col gap-2">
                            {filteredUniversities.map((university, index) => (
                                <UniversityListItem
                                    key={university._id}
                                    university={university}
                                    isSelected={selectedUniversities.includes(university._id)}
                                    onToggleSelection={toggleSelection}
                                    showDivider={index < filteredUniversities.length - 1}
                                    onView={handleView}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>

                        {/* View / Edit Drawers */}
                        <ViewUniversityDrawer
                            isOpen={viewUniversityId !== null}
                            onClose={handleCloseView}
                            universityId={viewUniversityId}
                        />
                        <EditUniversityDrawer
                            isOpen={editUniversityId !== null}
                            onClose={handleCloseEdit}
                            universityId={editUniversityId}
                        />
                    </>
                )}
            </div>
        </SectionContainer>
    );
}

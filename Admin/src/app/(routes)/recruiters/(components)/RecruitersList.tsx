"use client";

import { useState } from "react";
import { SectionContainer } from "@/src/components/ui/SectionContainer";
import SectionSearchAndFilterHeader from "@/src/components/common/SectionSearchAndFilterHeader";
import { SearchableSelect } from "@/src/components/ui/SearchableSelect";
import { RecruiterListItem } from "./RecruiterListItem";
import { useRecruiters } from "@/src/servicesHooks/recruiterHooks/useRecruiters";
import { INDUSTRY_OPTIONS } from "../data/data";
import ViewRecruiterDrawer from "../modals/ViewRecruiterDrawer";
import EditRecruiterDrawer from "../modals/EditRecruiterDrawer";
import { useDeleteRecruiter } from "@/src/servicesHooks/recruiterHooks/useDeleteRecruiter";
import { toast } from "sonner";

// Add "All Industries" option at the beginning
const filterOptions = [
    { label: "All Industries", value: "all" },
    ...INDUSTRY_OPTIONS,
];


export function RecruitersList() {
    const { data, isLoading, isFetching, error, refetch } = useRecruiters();
    const { deleteRecruiter, isPending: isDeleting } = useDeleteRecruiter();
    const recruiters = data?.data?.recruiters;
    const [selectedRecruiters, setSelectedRecruiters] = useState<string[]>([]);
    const [currentFilter, setCurrentFilter] = useState("all");
    const [viewRecruiterId, setViewRecruiterId] = useState<string | null>(null);
    const [editRecruiterId, setEditRecruiterId] = useState<string | null>(null);

    const toggleSelection = (id: string) => {
        setSelectedRecruiters((prev) =>
            prev.includes(id)
                ? prev.filter((recruiterId) => recruiterId !== id)
                : [...prev, id]
        );
    };

    const handleIndustrySelection = (value: string) => {
        setCurrentFilter(value);
    };

    const handleView = (id: string) => {
        setViewRecruiterId(id);
    };

    const handleEdit = (id: string) => {
        setEditRecruiterId(id);
    };

    const handleCloseView = () => {
        setViewRecruiterId(null);
    };

    const handleCloseEdit = () => {
        setEditRecruiterId(null);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this recruiter?")) {
            deleteRecruiter(id, {
                onSuccess: () => {
                    refetch();
                },
            });
        }
    };

    // Filter recruiters based on selected industry
    const filteredRecruiters =
        currentFilter === "all"
            ? recruiters
            : recruiters?.filter(
                (recruiter) => recruiter.industry === currentFilter
            ) || [];

    return (
        <SectionContainer>
            <div className="flex flex-col gap-4">
                <SectionSearchAndFilterHeader>
                    <div className="w-[280px]">
                        <SearchableSelect
                            value={currentFilter}
                            onValueChange={handleIndustrySelection}
                            options={filterOptions}
                            placeholder="Filter by Industry"
                            searchPlaceholder="Search industries..."
                        />
                    </div>
                </SectionSearchAndFilterHeader>

                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <p className="text-gray-500">Loading recruiters...</p>
                    </div>
                ) : filteredRecruiters && filteredRecruiters.length > 0 ? (
                    <>
                        <div className="flex flex-col gap-2">
                            {filteredRecruiters.map((recruiter, index) => (
                                <RecruiterListItem
                                    key={recruiter._id}
                                    recruiter={recruiter}
                                    isSelected={selectedRecruiters.includes(recruiter._id)}
                                    onToggleSelection={toggleSelection}
                                    showDivider={index < filteredRecruiters.length - 1}
                                    onView={handleView}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>

                        {/* View & Edit Drawers */}
                        <ViewRecruiterDrawer
                            isOpen={viewRecruiterId !== null}
                            onClose={handleCloseView}
                            recruiterId={viewRecruiterId}
                        />
                        <EditRecruiterDrawer
                            isOpen={editRecruiterId !== null}
                            onClose={handleCloseEdit}
                            recruiterId={editRecruiterId}
                        />
                    </>
                ) : (
                    <div className="flex items-center justify-center py-12">
                        <p className="text-gray-500">
                            {currentFilter === "all"
                                ? "No recruiters found"
                                : `No recruiters found in ${filterOptions.find(opt => opt.value === currentFilter)?.label}`
                            }
                        </p>
                    </div>
                )}
            </div>
        </SectionContainer>
    );
}

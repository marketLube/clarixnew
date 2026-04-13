"use client";

import { useState } from "react";
import { CollegeListItem } from "./CollegeListItem";
import { SectionContainer } from "@/src/components/ui/SectionContainer";
import SectionSearchAndFilterHeader from "@/src/components/common/SectionSearchAndFilterHeader";
import { filterOptions } from "../../exams/data/data";
import { Filter } from "@/src/components/ui/Filter";
import { useColleges } from "@/src/servicesHooks/collegeHooks/useCollege";
import Loader from "@/src/components/common/Loader";
import { setCurrentType } from "@/src/store/slices/collegeSlice";
import { useAppDispatch } from "@/src/store/hooks";
import NoData from "@/src/components/common/NoData";
import ErrorPage from "@/src/components/common/ErrorPage";
import { useDeleteCollege } from "@/src/servicesHooks/collegeHooks/useDeleteCollege";

export function CollegesList() {
  const dispatch = useAppDispatch();
  const { data, isLoading, error, refetch } = useColleges();
  const { deleteCollege, isPending: isDeleting } = useDeleteCollege();
  const colleges = data?.data?.colleges;
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedColleges((prev) =>
      prev.includes(id)
        ? prev.filter((collegeId) => collegeId !== id)
        : [...prev, id]
    );
  };

  const handleTypeSelection = (value: string) => {
    dispatch(setCurrentType(value));
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this college?")) {
      deleteCollege(id, {
        onSuccess: () => {
          refetch();
        },
      });
    }
  };

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
            message={error.message || "Failed to fetch colleges. Please try again."}
            onRetry={() => refetch()}
            className="my-8"
          />
        )}

        {!isLoading && !error && colleges?.length === 0 && (
          <NoData
            title="No Colleges Found"
            description="We couldn't find any colleges matching your criteria. Try different filters or add a new college."
            className="my-8"
          />
        )}

        <div className="flex flex-col gap-2">
          {colleges?.map((college, index) => (
            <CollegeListItem
              key={college?._id}
              college={college}
              isSelected={selectedColleges.includes(college?._id)}
              onToggleSelection={toggleSelection}
              showDivider={index < colleges?.length - 1}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

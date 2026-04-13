"use client";

import React from "react";
import { Search, Plus, Trash2 } from "lucide-react";
import { ContentSection } from "@/src/components/ui/ContentSection";
import { BlogPageSearchFiltersState } from "../../../types";

interface SearchBarProps {
    enabled: boolean;
    filters: BlogPageSearchFiltersState["filters"];
    onChange: (updates: Partial<BlogPageSearchFiltersState>) => void;
}

export default function SearchBar({
    enabled,
    filters,
    onChange,
}: SearchBarProps) {
    const handleAddFilter = () => {
        const nextFilters = [...(filters || []), { label: "", value: "" }];
        onChange({ filters: nextFilters });
    };

    const handleFilterChange = (
        index: number,
        field: "label" | "value",
        value: string
    ) => {
        const nextFilters = [...(filters || [])];
        nextFilters[index] = {
            ...nextFilters[index],
            [field]: value,
        };
        onChange({ filters: nextFilters });
    };

    const handleDeleteFilter = (index: number) => {
        const nextFilters = [...(filters || [])];
        nextFilters.splice(index, 1);
        onChange({ filters: nextFilters });
    };

    return (
        <ContentSection
            id="search-bar-filters"
            title="Search Bar Filters"
            description="Apply filters for precise searches"
            icon={<Search className="w-4 h-4 text-[#10B981]" />}
            isEnabled={enabled}
            onToggle={(value) => onChange({ enabled: value })}
        >
            <div className="flex flex-wrap gap-2">
                {(filters || []).map((filter, index) => (
                    <div
                        key={index}
                        className="px-3 py-2 bg-[rgba(127,151,136,0.02)] border-[0.5px] border-[rgba(170,196,188,0.5)] border-solid rounded-[8px] text-[12px] font-normal text-[#364440] min-w-[240px] text-left flex flex-col gap-2 shadow-sm"
                    >
                        <input
                            type="text"
                            value={filter.label ?? ""}
                            onChange={(e) =>
                                handleFilterChange(index, "label", e.target.value)
                            }
                            placeholder="Filter label (visible text)"
                            className="w-full bg-transparent border border-[rgba(170,196,188,0.8)] rounded-[6px] px-2 py-1 text-[12px] outline-none focus:ring-1 focus:ring-[#10B981]"
                        />
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={filter.value ?? ""}
                                onChange={(e) =>
                                    handleFilterChange(index, "value", e.target.value)
                                }
                                placeholder="Filter value (used internally)"
                                className="w-full bg-transparent border border-[rgba(170,196,188,0.5)] rounded-[6px] px-2 py-1 text-[12px] outline-none focus:ring-1 focus:ring-[#10B981]"
                            />
                            <button
                                type="button"
                                onClick={() => handleDeleteFilter(index)}
                                className="flex items-center justify-center p-1.5 rounded-[6px] border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                                aria-label="Delete filter"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleAddFilter}
                    className="flex flex-col items-center justify-center gap-1 px-4 py-2 bg-[rgba(127,151,136,0.02)] border-[0.5px] border-dashed border-[rgba(170,196,188,0.5)] rounded-[8px] text-[11px] font-medium text-[#364440] min-w-[120px] shadow-sm hover:bg-gray-50 transition-colors"
                >
                    <Plus className="w-3 h-3" />
                    Add
                </button>
            </div>

        </ContentSection>
    );
}

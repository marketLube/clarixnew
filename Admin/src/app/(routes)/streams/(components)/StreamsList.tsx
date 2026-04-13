"use client";

import { useState } from "react";
import { SectionContainer } from "@/src/components/ui/SectionContainer";
import SectionSearchAndFilterHeader from "@/src/components/common/SectionSearchAndFilterHeader";
import { Filter } from "@/src/components/ui/Filter";
import { StreamListItem } from "./StreamListItem";
import Loader from "@/src/components/common/Loader";
import ViewStreamDrawer from "../modals/ViewStreamDrawer";
import EditStreamDrawer from "../modals/EditStreamDrawer";
import { useDeleteStream } from "@/src/servicesHooks/streamHooks/useDeleteStream";

interface Stream {
    _id: string;
    name: string;
    image: string;
    enabled: boolean;
    collegesCount: number;
    createdAt: string;
    updatedAt: string;
}

interface StreamsListProps {
    streams: Stream[];
    isLoading: boolean;
    onRefresh: () => void;
}

const filterOptions = [
    { label: "All Status", value: "all" },
    { label: "Enabled", value: "enabled" },
    { label: "Disabled", value: "disabled" },
];

export function StreamsList({ streams, isLoading, onRefresh }: StreamsListProps) {
    const { deleteStream, isPending: isDeleting } = useDeleteStream();
    const [selectedStreams, setSelectedStreams] = useState<string[]>([]);
    const [currentFilter, setCurrentFilter] = useState("all");
    const [viewStreamId, setViewStreamId] = useState<string | null>(null);
    const [editStreamId, setEditStreamId] = useState<string | null>(null);

    const toggleSelection = (id: string) => {
        setSelectedStreams((prev) =>
            prev.includes(id)
                ? prev.filter((streamId) => streamId !== id)
                : [...prev, id]
        );
    };

    const handleFilterSelection = (value: string) => {
        setCurrentFilter(value);
    };

    const handleView = (id: string) => {
        setViewStreamId(id);
    };

    const handleEdit = (id: string) => {
        setEditStreamId(id);
    };

    const handleCloseView = () => {
        setViewStreamId(null);
    };

    const handleCloseEdit = () => {
        setEditStreamId(null);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this stream?")) {
            deleteStream(id, {
                onSuccess: () => {
                    onRefresh();
                },
            });
        }
    };

    // Filter streams based on selected filter
    const filteredStreams =
        currentFilter === "all"
            ? streams
            : currentFilter === 'enabled'
                ? streams.filter(s => s.enabled)
                : streams.filter(s => !s.enabled);

    return (
        <SectionContainer>
            <div className="flex flex-col gap-4">
                <SectionSearchAndFilterHeader>
                    <Filter
                        defaultValue="All Status"
                        options={filterOptions}
                        onValueChange={handleFilterSelection}
                    />
                </SectionSearchAndFilterHeader>

                {/* Loading State */}
                {isLoading ? (
                    <Loader size="md" className="py-12" />
                ) : filteredStreams.length === 0 ? (
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
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            No streams found
                        </h3>
                        <p className="text-sm text-gray-500">
                            {currentFilter === "all"
                                ? "Get started by adding your first stream"
                                : `No ${currentFilter} streams available`}
                        </p>
                    </div>
                ) : (
                    /* Streams List */
                    <>
                        <div className="flex flex-col gap-2">
                            {filteredStreams.map((stream, index) => (
                                <StreamListItem
                                    key={stream._id}
                                    stream={stream}
                                    isSelected={selectedStreams.includes(stream._id)}
                                    onToggleSelection={toggleSelection}
                                    showDivider={index < filteredStreams.length - 1}
                                    onView={handleView}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>

                        {/* View / Edit Drawers */}
                        <ViewStreamDrawer
                            isOpen={viewStreamId !== null}
                            onClose={handleCloseView}
                            streamId={viewStreamId}
                        />
                        <EditStreamDrawer
                            isOpen={editStreamId !== null}
                            onClose={handleCloseEdit}
                            streamId={editStreamId}
                        />
                    </>
                )}
            </div>
        </SectionContainer>
    );
}


import SectionSearchAndFilterHeader from "@/src/components/common/SectionSearchAndFilterHeader";
import { Filter } from "@/src/components/ui/Filter";
import { SectionContainer } from "@/src/components/ui/SectionContainer";
import ReviewCard from "./ReviewCard";
import { useReviews } from "@/src/servicesHooks/reviewHooks/useReview";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Review } from "@/src/servicesHooks/reviewHooks/types/reviewHooksType";

const statusOptions = [
    { label: "All Status", value: "all" },
    { label: "Pending", value: "Pending" },
    { label: "Approved", value: "Approved" },
    { label: "Rejected", value: "Rejected" },
];

export default function ReviewList() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<string | undefined>(undefined);
    // Debounce search could be added, but for now direct state is fine if not causing too many renders/requests.
    // React Query handles deduping to some extent.

    const { data, isLoading } = useReviews({
        search,
        status,
    });

    const reviews = data?.data?.reviews || [];

    return (
        <SectionContainer>
            <SectionSearchAndFilterHeader
                searchValue={search}
                onSearchChange={(e) => setSearch(e.target.value)}
                searchPlaceholder="Search reviews..."
                showSelectAll={false}
            >
                <Filter
                    options={statusOptions}
                    defaultValue="All Status"
                    onValueChange={(value) => setStatus(value === 'all' ? undefined : value)}
                />
            </SectionSearchAndFilterHeader>

            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reviews.map((review: Review) => (
                        <ReviewCard key={review._id} review={review} />
                    ))}
                    {!isLoading && reviews.length === 0 && (
                        <div className="col-span-full text-center text-gray-500 py-10">
                            No reviews found.
                        </div>
                    )}
                </div>
            )}
        </SectionContainer>
    )
}
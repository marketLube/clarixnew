import { cn } from "@/lib/utils";

interface StatusBadgeProps {
    status: string;
    className?: string;
}

const statusStyles: Record<string, string> = {
    // Green
    Active: "bg-[rgba(11,255,84,0.2)] text-[#0B9F3F]",
    active: "bg-[rgba(11,255,84,0.2)] text-[#0B9F3F]",
    Resolved: "bg-[rgba(11,255,84,0.2)] text-[#0B9F3F]",
    Live: "bg-[rgba(11,255,84,0.2)] text-[#0B9F3F]",
    Approved: "bg-[rgba(11,255,84,0.2)] text-[#0B9F3F]",
    approved: "bg-[rgba(11,255,84,0.2)] text-[#0B9F3F]",

    // Red
    Closed: "bg-[#FFCECE] text-[#AB0808]",
    closed: "bg-[#FFCECE] text-[#AB0808]",
    Rejected: "bg-[#FFCECE] text-[#AB0808]",
    rejected: "bg-[#FFCECE] text-[#AB0808]",

    // Blue
    Upcoming: "bg-[#CEE7FF] text-[#1D4ED8]",
    upcoming: "bg-[#CEE7FF] text-[#1D4ED8]",
    "Under Review": "bg-[#CEE7FF] text-[#1D4ED8]",

    // Yellow/Orange
    Pending: "bg-[#FFEECE] text-[#AB5F08]",
    pending: "bg-[#FFEECE] text-[#AB5F08]",
    Draft: "bg-[#FFF4E5] text-[#B95000]",
    draft: "bg-[#FFF4E5] text-[#B95000]",

    // Gray
    // Draft: "bg-gray-100 text-gray-600", // Moved to Orange
    // draft: "bg-gray-100 text-gray-600",

    // Green
    Published: "bg-[rgba(11,255,84,0.2)] text-[#0B9F3F]",

    // Blue
    Scheduled: "bg-[#CEE7FF] text-[#1D4ED8]",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
    // Default to gray if status not found
    const style = statusStyles[status] || "bg-gray-100 text-gray-600";

    return (
        <span
            className={cn(
                "px-3 py-1 rounded-[40px] text-xs font-normal leading-5 tracking-[-0.28px] whitespace-nowrap inline-block text-center min-w-[85px]",
                style,
                className
            )}
        >
            {status}
        </span>
    );
}

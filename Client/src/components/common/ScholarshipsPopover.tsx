"use client";

import Link from "next/link";
import { Popover } from "antd";
import { ReactNode } from "react";
import { useScholarships } from "@/hooks/scholarship/useScholarships";
import { ChevronDownIcon } from "./Icons";

interface ScholarshipsPopoverProps {
    children: ReactNode;
}

export default function ScholarshipsPopover({ children }: ScholarshipsPopoverProps) {
    const { scholarships, isLoading } = useScholarships({ limit: 5 });

    const scholarshipsPopoverContent = (
        <div className="flex flex-col gap-1 p-0 w-[min(92vw,360px)] bg-white">
            <div className="px-4 py-3 border-b border-gray-50">
                <h3 className="text-[#162447] text-base font-bold uppercase tracking-wider mb-1">
                    Popular Scholarships
                </h3>
                <p className="text-[#767e92] text-xs">
                    Explore financial aid opportunities for your education
                </p>
            </div>

            {isLoading ? (
                <div className="p-4 text-center text-gray-500">Loading scholarships...</div>
            ) : (
                <div className="flex flex-col">
                    {scholarships.length > 0 ? (
                        scholarships.map((scholarship) => (
                            <Link
                                key={scholarship._id}
                                href={`/scholarships`}
                                className="flex flex-col p-3 hover:bg-[#f6f7ff] transition-colors duration-150 ease-in-out no-underline cursor-pointer w-full box-border items-start group"
                            >
                                <p className="text-[#162447] text-sm font-medium leading-5 group-hover:text-[#513392] transition-colors m-0 line-clamp-1">
                                    {scholarship.scholarshipName}
                                </p>
                                <p className="text-[#767e92] text-[11px] leading-4 m-0">
                                    {scholarship.scholarshipType} • {scholarship.fundingType}
                                </p>
                            </Link>
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-500">No scholarships found</div>
                    )}
                </div>
            )}

            <Link
                href="/scholarships"
                className="mt-2 p-3 text-center text-[#513392] font-semibold text-sm hover:bg-[#f6f7ff] border-t border-gray-50"
            >
                View All Scholarships
            </Link>
        </div>
    );

    return (
        <Popover
            content={scholarshipsPopoverContent}
            trigger="hover"
            placement="bottomLeft"
            overlayClassName="scholarships-popover-wrapper"
            mouseEnterDelay={0.15}
            mouseLeaveDelay={0.15}
            overlayStyle={{ padding: 0 }}
            rootClassName="scholarships-popover-root"
        >
            {children}
        </Popover>
    );
}

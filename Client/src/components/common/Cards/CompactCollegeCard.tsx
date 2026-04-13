"use client";

import React from "react";
import { LocationIcon, StarIcon } from "@/components/common/Icons";
import { useRouter } from "next/navigation";

export default function CompactCollegeCard({ college }: { college: any }) {
    const router = useRouter();

    const viewDetails = (id: string) => {
        router.push(`/colleges/${id}`);
    };

    return (
        <div
            onClick={() => viewDetails(college?._id)}
            className="bg-white rounded-[12px] shadow-[0px_2px_12px_rgba(0,0,0,0.04)] flex flex-col font-poppins cursor-pointer border border-gray-100 active:scale-[0.98] transition-all duration-200 w-full h-[225px] overflow-hidden"
        >
            {/* Top: Image Area */}
            <div className="relative h-[100px] w-full shrink-0">
                <img
                    src={college?.bannerImageUrl || "/college-details-bg.png"}
                    alt={college?.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Rating Badge on Image */}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-1.5 py-0.5 flex items-center gap-0.5 shadow-sm">
                    <StarIcon width={8} height={8} />
                    <span className="text-[10px] font-bold text-[#162447]">
                        {college?.rating?.toFixed(1)}
                    </span>
                </div>

                {/* Logo Overlay */}
                <div className="absolute bottom-2 left-2 w-6 h-6 rounded-md overflow-hidden bg-white p-0.5 shadow-md">
                    <img
                        src={college?.logo}
                        alt="logo"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>

            {/* Bottom: Content Area */}
            <div className="p-2.5 flex flex-col gap-1.5 flex-1 justify-between">
                <div>
                    <h3 className="font-semibold text-[11px] text-[#162447] line-clamp-2 leading-[1.3] mb-0.5">
                        {college?.name}
                    </h3>
                    <p className="flex items-center gap-0.5 text-[9px] text-[#767E92]">
                        <LocationIcon width={8} height={8} />
                        <span className="truncate">{college?.city}</span>
                    </p>
                </div>

                <div className="flex flex-col gap-1 border-t border-gray-50 pt-1.5">
                    <div className="flex justify-between items-center">
                        <span className="text-[8px] text-[#767E92] font-medium uppercase">Fees</span>
                        <span className="text-[10px] font-bold text-[#513392]">{college?.annualFeesRange}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[8px] text-[#767E92] font-medium uppercase">Avg Pack</span>
                        <span className="text-[10px] font-bold text-[#162447]">{college?.averageSalary}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

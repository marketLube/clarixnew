"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LocationIcon, StarIcon } from "@/components/common/Icons";
import { useRouter } from "next/navigation";
import { formatSalaryLPA, formatFeeRange } from "@/lib/helperFunctions/formatCurrency";

const FALLBACK_BANNER = "/college-details-bg.png";

export default function CompactCollegeCard({ college }: { college: any }) {
    const router = useRouter();
    const bannerSrc = college?.campusImages?.[0] || college?.logo || FALLBACK_BANNER;

    const viewDetails = (id: string) => {
        router.push(`/colleges/${id}`);
    };

    return (
        <Link href={`/colleges/${college?._id}`} className="block w-full">
        <article
            className="bg-white rounded-[12px] shadow-[0px_2px_12px_rgba(0,0,0,0.04)] flex flex-col font-poppins cursor-pointer border border-gray-100 active:scale-[0.98] transition-all duration-200 w-full h-[225px] overflow-hidden"
        >
            {/* Top: Image Area */}
            <div className="relative h-[100px] w-full shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={bannerSrc}
                    alt={college?.name || "College banner"}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
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
                    <Image
                        src={college?.logo || "/minority.png"}
                        alt={`${college?.name || "College"} logo`}
                        width={24}
                        height={24}
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Bottom: Content Area */}
            <div className="p-2.5 flex flex-col gap-1 flex-1 justify-between">
                <div>
                    <h3 className="font-semibold text-[12px] text-[#162447] line-clamp-2 leading-[1.3] mb-0.5">
                        {college?.name}
                    </h3>
                    <p className="flex items-center gap-0.5 text-[10px] text-[#767E92]">
                        <LocationIcon width={9} height={9} />
                        <span className="truncate">{college?.city}</span>
                    </p>
                </div>

                <div className="flex flex-col gap-0.5 border-t border-gray-100 pt-1.5">
                    <div className="flex justify-between items-center">
                        <span className="text-[9px] text-[#767E92] font-medium uppercase">Fees</span>
                        <span className="text-[11px] font-bold text-[#513392]">{formatFeeRange(college?.annualFeesRange)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[9px] text-[#767E92] font-medium uppercase">Avg Pack</span>
                        <span className="text-[11px] font-bold text-[#162447]">{formatSalaryLPA(college?.averageSalary)}</span>
                    </div>
                </div>
            </div>
        </article>
        </Link>
    );
}

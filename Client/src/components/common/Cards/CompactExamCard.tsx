"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "../badge";

export default function CompactExamCard({
    id,
    tagLabel,
    statusLabel,
    title,
    subtitle,
    registrationDate,
    examDate,
    logo,
}: {
    id?: string;
    tagLabel?: string;
    statusLabel?: string;
    title?: string;
    subtitle?: string;
    registrationDate?: string;
    examDate?: string;
    logo?: string;
}) {
    const router = useRouter();

    return (
        <Link href={id ? `/exams/${id}` : "#"} className="block w-full">
        <article
            className="bg-white rounded-[12px] shadow-[0px_2px_12px_rgba(0,0,0,0.04)] p-3 flex flex-col gap-2 font-poppins cursor-pointer border border-gray-100 active:scale-[0.98] transition-all duration-200 w-full h-[145px] overflow-hidden"
        >
            {/* Top: Image on Left, Basic Info on Right */}
            <div className="flex gap-3">
                {/* Logo/Image on Left */}
                <div className="relative w-[60px] h-[60px] rounded-[10px] bg-[#f6f7ff] flex-shrink-0 flex items-center justify-center p-2 border border-gray-50 shadow-sm">
                    <Image
                        src={logo || "/minority.png"}
                        alt={`${title || "Exam"} logo`}
                        width={44}
                        height={44}
                        className="object-contain"
                    />
                </div>

                {/* Title and Subtitle on Right */}
                <div className="flex flex-col justify-center flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-1">
                        <h3 className="font-semibold text-[13px] text-[#162447] line-clamp-1 leading-tight flex-1">
                            {title}
                        </h3>
                        {statusLabel && (
                            <div className="scale-[0.65] origin-top-right whitespace-nowrap -mt-1 -mr-1">
                                <Badge variant={statusLabel === 'Open' ? 'success' : statusLabel === 'Closing Soon' ? 'danger' : 'primary'}>
                                    {statusLabel}
                                </Badge>
                            </div>
                        )}
                    </div>
                    <p className="text-[10px] text-[#767E92] line-clamp-2 leading-[1.2] mt-0.5">
                        {subtitle}
                    </p>
                </div>
            </div>

            {/* Pricing & Course Info at Bottom */}
            <div className="flex flex-col gap-1.5 mt-auto pt-2 border-t border-gray-50">
                <div className="flex justify-between items-center">
                    <span className="text-[9px] text-[#767E92] font-medium uppercase tracking-wider">Registration</span>
                    <span className="text-[11px] font-bold text-[#162447]">{registrationDate}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[9px] text-[#767E92] font-medium uppercase tracking-wider">Exam Date</span>
                    <span className="text-[11px] font-bold text-[#513392]">{examDate}</span>
                </div>
            </div>
        </article>
        </Link>
    );
}

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../badge";
import { Button } from "../Button";
import {
  ArrowRightIcon,
  VerifyIcon,
  BuildingTwoIcon,
} from "@/components/common/Icons";

import { useRouter } from "next/navigation";

export interface ExamCardProps {
  id?: string;
  tagLabel?: string;
  statusLabel?: string;
  title?: string;
  subtitle?: string;
  registrationLabel?: string;
  registrationDate?: string;
  examDateLabel?: string;
  examDate?: string;
  eligibility?: string;
  collegesInfo?: string;
  logo?: string;
}

export default function ExamCard({
  id,
  tagLabel,
  statusLabel,
  title,
  subtitle,
  registrationLabel,
  registrationDate,
  examDateLabel,
  examDate,
  eligibility,
  collegesInfo,
  logo,
}: ExamCardProps) {
  const router = useRouter();

  return (
    <Link href={id ? `/exams/${id}` : "#"} className="block w-full sm:max-w-[340px] mx-auto">
    <article
      className="w-full rounded-[24px] bg-white px-5 py-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      {/* Top badges */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <Badge variant="accent">{tagLabel}</Badge>
        <Badge variant={statusLabel === 'Open' ? 'success' : statusLabel === 'Closing Soon' ? 'danger' : 'primary'}>{statusLabel}</Badge>
      </div>

      {/* Main content row */}
      <div className="flex items-start gap-3">
        <div className="relative flex h-[56px] w-[56px] items-center justify-center rounded-[16px] bg-[#e5e7f2] overflow-hidden">
          <Image
            src={logo || "/minority.png"}
            alt={`${title || "Exam"} logo`}
            width={56}
            height={56}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-[2px]">
          <p className="font-poppins text-[16px] leading-[20px] font-medium tracking-[-0.32px] text-[#162447]">
            {title}
          </p>
          <p className="whitespace-pre-line text-[11px] leading-[14px] text-[#767e92]">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-[#f0f0f5]" />

      {/* Dates row */}
      <div className="mb-4 grid grid-cols-2 gap-3 bg-[#f6f7ff] rounded-[10px]">
        <div className="rounded-[10px] bg-[#f6f7ff] px-3 py-2">
          <p className="mb-1 text-[10px] leading-[12px] text-[#767e92]">
            {registrationLabel}
          </p>
          <p className="text-[13px] leading-[16px] font-medium text-[#162447]">
            {registrationDate}
          </p>
        </div>
        <div className="rounded-[10px] bg-[#f6f7ff] px-3 py-2">
          <p className="mb-1 text-[10px] leading-[12px] text-[#767e92]">
            {examDateLabel}
          </p>
          <p className="text-[13px] leading-[16px] font-medium text-[#162447]">
            {examDate}
          </p>
        </div>
      </div>

      {/* Details text */}
      <div className="mb-5 space-y-1.5 text-[11px] leading-[16px] text-[#767e92]">
        <div className="flex items-start gap-1.5">
          <VerifyIcon width={18} height={18} fill="#767e92" />
          <p>{eligibility}</p>
        </div>
        <div className="flex items-start gap-1.5">
          <BuildingTwoIcon width={18} height={18} fill="#767e92" />
          <p>{collegesInfo}</p>
        </div>
      </div>

      {/* CTA */}
      <Button
        type="button"
        variant="primary"
        size="md"
        className="flex w-fit items-center justify-center gap-2 rounded-full text-[13px] leading-[18px]"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          id && router.push(`/exams/${id}`);
        }}
      >
        <span>View Details</span>
        <ArrowRightIcon width={18} height={18} fill="currentColor" />
      </Button>
    </article>
    </Link>
  );
}

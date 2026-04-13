"use client";
import { Button } from "../Button";
import { ClockIcon, WifiIcon } from "@/components/common/Icons";
import { useRouter } from "next/navigation";

const defaultLogo = "/Deloitte.png";

export interface CareerCardProps {
  title?: string;
  company?: string;
  logoUrl?: string;
  employmentType?: string;
  workMode?: string;
  ctaLabel?: string;
  jobId?: string;
}

export default function CareerCard({
  title = "Marketing Analyst",
  company = "Deloitte",
  logoUrl = defaultLogo,
  employmentType = "Full-time",
  workMode = "On-site",
  ctaLabel = "Apply",
  jobId,
}: CareerCardProps) {
  const router = useRouter();
  return (
    <div className="w-full max-w-[420px] rounded-[20px] bg-white shadow-[1px_6px_41px_rgba(0,0,0,0.04)] overflow-hidden font-poppins">
      <div className="flex items-center justify-between px-3 py-3 md:px-[14px] md:py-[14px]">
        {/* Left: logo + text */}
        <div className="flex items-center gap-[10px] flex-1 min-w-0">
          <div className="relative size-[48px] md:size-[56px] shrink-0 rounded-[12px] md:rounded-[16px] bg-black shadow-[0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden flex items-center justify-center">
            <img
              src={logoUrl}
              alt={company}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-[4px] md:gap-[8px] flex-1 min-w-0">
            <div className="flex flex-col gap-0.5 md:gap-[4px]">
              <p className="font-helvetica text-[16px] md:text-[18px] leading-tight md:leading-[24px] tracking-[-0.36px] text-[#162447] truncate">
                {title}
              </p>
              <p className="font-helvetica text-[13px] md:text-[14px] leading-tight md:leading-[20px] tracking-[-0.28px] text-[#767e92] truncate">
                {company}
              </p>
            </div>

            <div className="flex items-center gap-2 md:gap-[8px] text-[#767e92] flex-wrap">
              <div className="flex items-center gap-[4px] text-[11px] md:text-[12px] leading-[20px] whitespace-nowrap">
                <span className="inline-flex size-[12px]">
                  <ClockIcon width={12} height={12} fill="#767e92" />
                </span>
                <span>{employmentType}</span>
              </div>

              <div className="flex items-center gap-[4px] text-[11px] md:text-[12px] leading-[20px] whitespace-nowrap">
                <span className="inline-flex size-[12px]">
                  <WifiIcon width={12} height={12} fill="#767e92" />
                </span>
                <span>{workMode}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: CTA */}
        <Button
          type="button"
          variant="primary"
          size="md"
          className="ml-2 shrink-0 rounded-[30px] bg-[#513392] px-4 py-2 md:px-6 md:py-[10px] text-[12px] md:text-[14px] leading-[20px] shadow-none hover:bg-[#3f2672] "
          onClick={() => router.push(`/jobs-internships/${jobId || '1'}`)}
        >
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}

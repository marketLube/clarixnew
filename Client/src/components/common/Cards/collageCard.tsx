"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../Button";
import {
  LocationIcon,
  LoveIcon,
  StarIcon,
  HostelIcon,
  WifiIcon,
  LabIcon,
  BallIcon,
  BookIcon,
} from "@/components/common/Icons";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { formatSalaryLPA, formatFeeRange } from "@/lib/helperFunctions/formatCurrency";

const Facility = ["Hostel", "Wifi", "Sports", "Labs", "Library"]


export default function CollegeCard({
  college,
  onToggleCompare,
  isSelectedForCompare,
  isFavorite,
  onToggleFavorite,
}: {
  college: any;
  onToggleCompare?: (college: any) => void;
  isSelectedForCompare?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}) {
  const router = useRouter();

  const viewDetails = (id: string) => {
    router.push(`/colleges/${id}`);
  };
  return (
    <article className="bg-white rounded-[20px] shadow-[1px_6px_41px_rgba(0,0,0,0.04)] p-4 w-full md:max-w-[340px] font-poppins">
      <Link href={`/colleges/${college?._id}`} className="block">
      {/* Banner */}
      <div className="relative h-[160px] w-full rounded-[10px] overflow-hidden mb-4">
        <Image
          src={college?.bannerImageUrl || "/college-details-bg.png"}
          alt={college?.name || "College banner"}
          fill
          sizes="(max-width: 768px) 100vw, 340px"
          className="object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.75)] via-[rgba(0,0,0,0.25)] to-transparent" />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite?.(college?._id);
          }}
          className={`absolute top-3 right-3 p-[6px] rounded-full transition-all flex items-center justify-center cursor-pointer ${isFavorite
            ? "bg-[#513392] text-white"
            : "bg-white/80 hover:bg-white text-[#767e92]"
            }`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={18}
            fill={isFavorite ? "#FFFFFF" : "none"}
            className={isFavorite ? "" : "stroke-[#767e92]"}
          />
        </button>

        {/* College logo + name + location */}
        <div className="absolute left-[10px] bottom-[10px] flex items-center gap-[6px]">
          <div className="w-[24px] h-[24px] rounded-md overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.15)] bg-white flex items-center justify-center relative">
            {college?.logo ? (
              <Image
                src={college.logo}
                alt={`${college?.name || "College"} logo`}
                width={24}
                height={24}
                className="object-cover"
              />
            ) : (
              <span className="text-[10px] font-bold text-[#513392]">
                {college?.name?.charAt(0) || "C"}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <p className="font-helvetica text-[16px] leading-[20px] font-medium tracking-[-0.32px] text-white">
              {college?.name}
            </p>
            <p className="flex items-center gap-1 font-helvetica text-[12px] leading-[15px] tracking-[-0.24px] text-[rgba(255,255,255,0.7)]">
              <LocationIcon width={12} height={12} />
              <span>{college?.city}{college?.city && college?.state ? ", " : ""}{college?.state}</span>
            </p>
          </div>
        </div>

      </div>

      {/* Fees + rating */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col gap-2">
          <p className="font-helvetica text-[12px] leading-[15px] tracking-[-0.24px] text-[#767e92]">
            Annual Fees
          </p>
          <p className="font-helvetica text-[20px] leading-[28px] tracking-[-0.4px] text-[#162447]">
            {formatFeeRange(college?.annualFeesRange)}
          </p>
        </div>

        <div className="flex items-center gap-2">

          <div className="bg-[#fff4ae] rounded-full px-[8px] py-[4px] flex items-center gap-[4px]">
            <span className="inline-flex size-[16px] items-center justify-center">
              <StarIcon width={16} height={16} />
            </span>
            <p className="font-helvetica text-[12px] leading-[14px] font-medium tracking-[-0.24px] text-[#162447]">
              {college?.rating?.toFixed(1)}
            </p>
          </div>
  
        </div>
      </div>

      {/* Key courses */}
      <div className="mb-4">
        <p className="font-helvetica text-[12px] leading-[15px] tracking-[-0.24px] text-[#767e92] mb-2">
          Key Courses
        </p>
        <div className="flex flex-nowrap gap-[6px] overflow-hidden">
          {college?.courses?.slice(0, 2)?.map((course: any) => (
            <span
              key={course._id || course.name}
              className="flex-shrink-0 inline-flex items-center justify-start rounded-full bg-[#f6f7ff] px-[10px] py-[6px] font-helvetica text-[12px] leading-[15px] tracking-[-0.24px] text-[#162447] max-w-[150px] truncate text-left"
              title={course?.name || course}
            >
              <span className="truncate">{course?.name || course}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Placements card */}
      <div className="bg-[#f6f7ff] rounded-[10px] px-[12px] py-[10px] mb-4">
        <p className="font-helvetica text-[14px] leading-[15px] tracking-[-0.28px] text-[#513392] mb-3">
          Placements
        </p>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-[4px]">
            <p className="font-helvetica text-[12px] leading-[15px] tracking-[-0.24px] text-[#767e92]">
              Avg Package
            </p>
            <p className="font-helvetica text-[16px] leading-[20px] tracking-[-0.32px] text-[#162447]">
              {formatSalaryLPA(college?.averageSalary)}
            </p>
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="font-helvetica text-[12px] leading-[15px] tracking-[-0.24px] text-[#767e92]">
              Highest Package
            </p>
            <p className="font-helvetica text-[16px] leading-[20px] tracking-[-0.32px] text-[#162447]">
              {formatSalaryLPA(college?.highestSalary)}
            </p>
          </div>
        </div>
      </div>

      {/* Facilities */}
      <div className="mb-5">
        <p className="font-helvetica text-[12px] leading-[15px] tracking-[-0.24px] text-[#767e92] mb-2">
          Facilities
        </p>
        <div className="flex flex-wrap items-center gap-[12px] text-center">
          {Facility?.map((facility) => (
            <div
              key={facility}
              className="flex flex-col items-center gap-[4px]"
            >
              <div className="bg-[#f6f7ff] rounded-full p-[6px] flex items-center justify-center">
                <span className="text-[#513392]">
                  {/* Simple icon placeholder per facility type */}
                  {facility === "Hostel" && (
                    <HostelIcon width={16} height={16} fill="#513392" />
                  )}
                  {facility === "Wifi" && (
                    <WifiIcon width={16} height={16} fill="#513392" />
                  )}
                  {facility === "Sports" && (
                    <BallIcon width={16} height={16} fill="#513392" />
                  )}
                  {facility === "Labs" && (
                    <LabIcon width={16} height={16} fill="#513392" />
                  )}
                  {facility === "Library" && (
                    <BookIcon width={16} height={16} fill="#513392" />
                  )}
                </span>
              </div>
              <p className="font-helvetica text-[12px] leading-[15px] tracking-[-0.24px] text-[#767e92]">
                {facility}
              </p>
            </div>
          ))}
        </div>
      </div>

      </Link>
      {/* Actions */}
      <div className="flex items-center justify-between gap-2">
        <Button
          variant="primary"
          size="sm"
          className="flex-1 rounded-[30px] px-4 py-[8px] text-xs shadow-[0px_10px_30px_rgba(81,51,146,0.35)] whitespace-nowrap h-[32px]"
          onClick={() => viewDetails(college?._id)}
        >
          View Details
        </Button>

        <Button
          variant="secondary"
          size="sm"
          className={`flex-1 rounded-[30px] border px-4 py-[8px] text-xs whitespace-nowrap h-[32px] border-[#513392] transition-colors ${isSelectedForCompare
            ? "bg-[#513392] text-white"
            : "bg-transparent text-[#513392]"
            }`}
          onClick={() => {
            if (typeof window !== "undefined") {
              localStorage.setItem("pending_compare_college", JSON.stringify(college));
            }
            onToggleCompare?.(college);
            router.push("/colleges/compare");
          }}
        >
          {isSelectedForCompare ? "Added" : "Add to Compare"}
        </Button>
      </div>
    </article>
  );
}

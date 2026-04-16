import React, { useState } from "react";
import Image from "next/image";
import { Rate } from "antd";

const defaultAvatar = "/dummyImg/student.jpg";

export interface StoryCardProps {
  avatarUrl?: string;
  name?: string;
  course?: string;
  batch?: string;
  story?: string;
  rating?: number;
  reviewTitle?: string;
  subRatings?: {
    placements?: number;
    infrastructure?: number;
    faculty?: number;
    campus?: number;
    valueForMoney?: number;
  };
  timeAgo?: string;
  className?: string;
}

export default function StoryCard({
  avatarUrl = defaultAvatar,
  name = "Student",
  course = "",
  batch = "",
  story = "",
  rating = 4,
  reviewTitle,
  subRatings,
  timeAgo = "",
  className = "",
}: StoryCardProps) {
  const [expanded, setExpanded] = useState(false);

  // Truncate logic
  const MAX_LENGTH = 160;
  const isLong = story.length > MAX_LENGTH;
  const displayedStory =
    !expanded && isLong ? story.slice(0, MAX_LENGTH) + "..." : story;

  // Derive title from story if not provided
  const displayTitle = reviewTitle || (story.length > 0
    ? story.split(/[.!?]/)[0]?.trim().slice(0, 60) || "Student Review"
    : "Student Review");

  const hasSubRatings = subRatings && Object.values(subRatings).some((v) => v !== undefined);

  return (
    <article
      className={`relative flex h-full w-full flex-col justify-between rounded-[20px] md:rounded-[24px] bg-white p-4 md:p-6 shadow-[0px_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0px_4px_20px_rgba(0,0,0,0.1)] ${className}`}
    >
      {/* Top Row: User Info + Rating */}
      <div className="mb-3 md:mb-4 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 md:gap-3 min-w-0">
          <div className="relative h-[36px] w-[36px] md:h-[48px] md:w-[48px] shrink-0 overflow-hidden rounded-full bg-gray-200 ring-2 ring-[#F0EAFF]">
            <Image
              src={avatarUrl}
              alt={name}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <h4 className="font-poppins text-[13px] md:text-[16px] font-semibold text-[#162447] leading-tight truncate">
              {name}
            </h4>
            <p className="font-poppins text-[10px] md:text-[12px] text-[#767E92] truncate leading-relaxed">
              {course}{batch ? ` • ${batch}` : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0 whitespace-nowrap">
          <Rate
            disabled
            defaultValue={rating}
            allowHalf
            className="text-[10px] md:text-[14px] text-[#FFB800] !leading-none whitespace-nowrap [&_.ant-rate-star]:!mr-0.5"
            style={{ fontSize: "14px" }}
          />
          <span className="font-poppins text-[13px] md:text-[14px] font-semibold text-[#162447] ml-1">
            {rating}
          </span>
        </div>
      </div>

      {/* Review Content */}
      <div className="mb-3 md:mb-4 flex-grow">
        <h3 className="mb-1.5 md:mb-2 font-poppins text-[14px] md:text-[15px] font-bold text-[#162447] leading-snug line-clamp-2">
          {displayTitle}
        </h3>
        <p className="font-poppins text-[12px] md:text-[14px] leading-[18px] md:leading-[22px] text-[#5D6677]">
          {displayedStory}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-1.5 font-poppins text-[12px] md:text-[13px] font-medium text-primary hover:underline"
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        )}
      </div>

      {/* Sub-ratings — only show if provided */}
      {hasSubRatings && (
        <div className="mb-2 md:mb-4 flex flex-wrap gap-x-2 gap-y-1 rounded-xl bg-[#F6F7FF] p-2 md:p-3">
          {Object.entries(subRatings!).map(([key, value]) => (
            (value !== undefined) && (
              <div key={key} className="flex items-center gap-0.5 whitespace-nowrap">
                <span className="font-poppins text-[9px] md:text-[10px] capitalize text-[#767E92]">
                  {key}:
                </span>
                <div className="flex ml-0.5">
                  {[...Array(5)].map((_, idx) => (
                    <span
                      key={idx}
                      className={`text-[10px] md:text-[11px] ${idx < value ? "text-[#FFB800]" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* Footer: Time Ago + College */}
      {timeAgo && (
        <div className="flex items-center justify-between pt-2 border-t border-[#F0F1F5]">
          <p className="font-poppins text-[10px] md:text-[12px] text-[#9AA2B1]">{timeAgo}</p>
        </div>
      )}
    </article>
  );
}

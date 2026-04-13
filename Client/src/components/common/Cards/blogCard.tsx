import React from "react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
const defaultImage = "/dummyimg/blogcard.png";

export interface BlogCardProps {
  /** Main thumbnail image shown at the top of the card */
  imageUrl?: string;
  /** Published date shown above the title */
  date?: string;
  /** Blog title / headline */
  title?: string;
  /** Optional extra class names for layout control from the parent */
  className?: string;
  /** Blog slug for navigation */
  slug?: string;
}

export default function BlogCard({
  imageUrl = defaultImage,
  date = "July 25, 2025",
  title = "List of Colleges for 60-70 Percentile in JEE Main 2026",
  className = "",
  slug = "",
}: BlogCardProps) {
  const router = useRouter();
  return (
    <article
      className={`bg-white group flex flex-col items-stretch pb-[34px] pt-[16px] px-[16px] rounded-[20px] shadow-[1px_6px_41px_rgba(0,0,0,0.04)] font-poppins w-full md:max-w-[320px] ${className}`}
    >
      {/* Thumbnail */}
      <div className="relative h-[258px] w-full rounded-[10px] overflow-hidden mb-4">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover rounded-[10px]"
        />
      </div>

      {/* Meta + CTA */}
      <div className="flex items-center justify-between mb-[18px]">
        <p className="text-[16px] leading-[20px] text-[rgba(19,8,37,0.6)]">
          {date}
        </p>
        <button
          type="button"
          aria-label="Bookmark blog post"
          className="flex items-center justify-center rounded-full border border-[#dac9ff] p-1 size-[32px] cursor-pointer transition-colors group-hover:bg-[#513392]"
          onClick={() => router.push(`/blog/${slug}`)}
        >
          <ChevronRight
            strokeWidth={2}
            className="text-current group-hover:text-white"
          />
        </button>
      </div>

      {/* Title */}
      <h3 className="font-helvetica text-[18px] md:text-[20px] leading-[28px] tracking-[-0.4px] text-[#162447]">
        {title}
      </h3>
    </article>
  );
}

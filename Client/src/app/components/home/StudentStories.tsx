"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { PenLine, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Star } from "lucide-react";
import { useReviews } from "@/hooks/review/useReviews";
import Link from "next/link";
import Loader from "@/components/common/Loader";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import SectionHeading from "@/components/common/Section/SectionHeading";

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  return "Just now";
}

function ReviewCard({
  avatarUrl,
  name,
  college,
  course,
  content,
  rating,
  createdAt,
}: {
  avatarUrl?: string;
  name: string;
  college?: string;
  course?: string;
  content: string;
  rating?: number;
  createdAt: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const MAX_LENGTH = 180;
  const isLong = content.length > MAX_LENGTH;
  const displayedContent = !expanded && isLong ? content.slice(0, MAX_LENGTH) + "..." : content;
  const displayRating = rating ?? 4;

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-[20px] bg-white p-5 md:p-6 shadow-[0px_2px_16px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0px_6px_24px_rgba(0,0,0,0.1)]">
      {/* Header: Avatar + Info + Rating */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 md:h-12 md:w-12 shrink-0 overflow-hidden rounded-full bg-[#F0EAFF]">
            {avatarUrl ? (
              <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-[#513392] font-helvetica font-bold text-sm md:text-base">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h4 className="font-helvetica text-[14px] md:text-[16px] font-semibold text-[#162447] leading-tight truncate">
              {name}
            </h4>
            <p className="font-helvetica text-[11px] md:text-[13px] text-[#767E92] truncate leading-relaxed">
              {college}{course ? ` • ${course}` : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0 rounded-full bg-[#FFF8E1] px-2.5 py-1">
          <Star className="h-3.5 w-3.5 fill-[#FFB800] text-[#FFB800]" />
          <span className="font-helvetica text-[13px] font-semibold text-[#162447]">
            {displayRating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4 flex-grow">
        <p className="font-helvetica text-[13px] md:text-[14px] leading-[20px] md:leading-[22px] text-[#5D6677]">
          {displayedContent}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-1.5 font-helvetica text-[12px] md:text-[13px] font-medium text-[#513392] hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#F0F1F5]">
        <p className="font-helvetica text-[11px] md:text-[12px] text-[#9AA2B1]">
          {timeAgo(createdAt)}
        </p>
      </div>
    </div>
  );
}

export default function StudentStories() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const { data, isLoading, isError } = useReviews(1, 12);
  const reviews = data?.data?.reviews ?? [];

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [reviews.length, updateScrollState]);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    if (reviews.length === 0) return;
    const el = scrollRef.current;
    if (!el) return;

    const timer = setInterval(() => {
      const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 24 : 400;
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [reviews.length]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 24 : 400;
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const atStart = el.scrollLeft <= 0;
    const atEnd = el.scrollLeft >= maxScroll - 1;
    if ((e.deltaY > 0 && atEnd) || (e.deltaY < 0 && atStart)) return;
    e.preventDefault();
    el.scrollLeft += e.deltaY;
  }, []);

  return (
    <section className="relative w-full overflow-hidden py-10 sm:py-20 bg-[#F6F7FF]">
      <ContentWrapper>
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
            <SectionHeading title="What Students Say" />
            <Link href="/review" className="shrink-0">
              <button className="flex items-center gap-2 rounded-full bg-[#513392] px-5 py-2.5 md:px-6 md:py-3 font-helvetica text-[14px] md:text-[15px] font-medium text-white transition-all hover:bg-[#412876] hover:shadow-lg shadow-[0px_4px_12px_rgba(81,51,146,0.3)]">
                Write a Review
                <PenLine className="h-4 w-4" />
              </button>
            </Link>
          </div>
          <p className="font-helvetica text-[14px] md:text-[16px] text-[#5D6677] max-w-2xl">
            Honest reviews from real students across India — helping you make confident college choices.
          </p>
        </div>

        {/* Content */}
        {isLoading ? (
          <Loader containerClassName="h-[300px]" label="Loading reviews..." />
        ) : isError || reviews.length === 0 ? (
          <div className="flex h-[250px] items-center justify-center">
            <p className="font-helvetica text-[#767e92]">No reviews available right now.</p>
          </div>
        ) : (
          <>
            {/* Desktop Carousel */}
            <div className="relative hidden md:block">
              {canScrollLeft && (
                <button
                  onClick={() => scroll("left")}
                  className="absolute -left-2 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-[#dac9ff] bg-white shadow-md transition-all hover:border-[#513392]"
                >
                  <ChevronLeft className="h-5 w-5 text-[#162447]" />
                </button>
              )}
              {canScrollRight && (
                <button
                  onClick={() => scroll("right")}
                  className="absolute -right-2 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-[#513392] shadow-md transition-all hover:bg-[#412876]"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>
              )}

              <div
                ref={scrollRef}
                onWheel={handleWheel}
                className="flex gap-6 overflow-x-auto scroll-smooth px-4 pb-6 pt-2 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
              >
                {reviews.map((review) => (
                  <div key={review._id} className="w-[360px] flex-shrink-0">
                    <ReviewCard
                      avatarUrl={review.userAvatar}
                      name={review.userName}
                      college={review.collegeName}
                      course={review.course}
                      content={review.content}
                      rating={review.rating}
                      createdAt={review.createdAt}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile List */}
            <div className="flex flex-col gap-4 md:hidden">
              {(showAllMobile ? reviews : reviews.slice(0, 3)).map((review) => (
                <div key={review._id} className="w-full">
                  <ReviewCard
                    avatarUrl={review.userAvatar}
                    name={review.userName}
                    college={review.collegeName}
                    course={review.course}
                    content={review.content}
                    rating={review.rating}
                    createdAt={review.createdAt}
                  />
                </div>
              ))}
            </div>

            {reviews.length > 3 && (
              <div className="mt-6 flex justify-center md:hidden">
                <button
                  onClick={() => setShowAllMobile(!showAllMobile)}
                  className="flex items-center gap-2 rounded-full border border-[#D0D5DD] bg-white px-4 py-2 font-helvetica text-[14px] font-medium text-[#162447] transition-all hover:bg-gray-50"
                >
                  {showAllMobile ? "Show Less" : "Show More Reviews"}
                  {showAllMobile ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
            )}
          </>
        )}
      </ContentWrapper>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}

"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { PenLine, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import StoryCard from "@/components/common/Cards/storieCard";
import { useReviews } from "@/hooks/review/useReviews";
import Link from "next/link";
import Loader from "@/components/common/Loader";
import ContentWrapper from "@/components/Ui/ContentWrapper";

// Helper for time ago
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

// Derive a meaningful review title from content
function deriveTitle(content: string, collegeName?: string): string {
  if (!content) return "Student Review";
  // Take first sentence, max 65 chars
  const first = content.split(/[.!?]/)[0]?.trim() || "";
  if (first.length > 10 && first.length <= 65) return first;
  if (first.length > 65) return first.slice(0, 62) + "…";
  // Fallback: use college name context
  if (collegeName) return `My experience at ${collegeName}`;
  return "Student Review";
}

// Generate a rating from content sentiment (simple heuristic)
function deriveRating(content: string, index: number): number {
  const positive = ["excellent", "amazing", "great", "best", "love", "outstanding", "exceptional", "phenomenal", "unmatched", "strong", "world-class"];
  const negative = ["poor", "bad", "worst", "terrible", "lacking", "disappointing"];
  const lower = content.toLowerCase();
  let score = 3.5;
  positive.forEach((w) => { if (lower.includes(w)) score += 0.2; });
  negative.forEach((w) => { if (lower.includes(w)) score -= 0.3; });
  // Clamp between 3.0 and 5.0 for realistic range
  return Math.round(Math.min(5, Math.max(3, score + (index % 3) * 0.3)) * 2) / 2;
}

export default function StudentStories() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const { data, isLoading, isError } = useReviews(1, 12);
  const reviews = data?.data?.reviews ?? [];

  // Calculate scroll state
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    // Calculate active dot index
    const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 24 : 400;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(idx);
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
        // Reset to beginning smoothly
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

  const totalDots = Math.max(1, reviews.length - 2); // Approximate number of scroll positions

  return (
    <section className="relative w-full overflow-hidden py-10 sm:py-20 bg-[#F6F7FF]">
      <ContentWrapper>
        <div className="w-full text-center">
          {/* Top Label */}
          <span className="mb-4 inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm mx-auto font-helvetica">
            Student Stories
          </span>

          {/* Heading */}
          <h2 className="mx-auto mb-4 w-full max-w-7xl font-helvetica text-[22px] font-bold leading-tight text-[#162447] md:text-[48px]">
            Real Students. Real Experiences.
          </h2>

          {/* Subheading */}
          <p className="mx-auto mb-8 w-full max-w-5xl font-helvetica text-[14px] text-[#5D6677] md:text-[18px]">
            Verified reviews from real students across India — helping you make
            confident college choices.
          </p>

          {/* Write a Review Button */}
          <div className="mb-10 md:mb-14 flex justify-center">
            <Link href="/review">
              <button className="group flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 md:px-8 md:py-3 font-helvetica text-[14px] md:text-[16px] font-medium text-white transition-all hover:bg-primary-hover hover:shadow-lg">
                Write a Review
                <PenLine className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* Carousel Section */}
        {isLoading ? (
          <Loader containerClassName="h-[300px]" label="Loading reviews..." />
        ) : isError || reviews.length === 0 ? (
          <div className="flex h-[250px] items-center justify-center">
            <p className="font-helvetica text-[#767e92]">No reviews available right now.</p>
          </div>
        ) : (
          <>
            {/* Desktop horizontal scroll carousel */}
            <div className="relative hidden md:block">
              {/* Navigation arrows */}
              {canScrollLeft && (
                <button
                  onClick={() => scroll("left")}
                  className="absolute -left-2 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-[#E0E0FF] bg-white shadow-md transition-all hover:border-primary hover:shadow-lg"
                >
                  <ChevronLeft className="h-5 w-5 text-[#162447]" />
                </button>
              )}
              {canScrollRight && (
                <button
                  onClick={() => scroll("right")}
                  className="absolute -right-2 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-md transition-all hover:bg-primary-hover hover:shadow-lg"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>
              )}

              {/* Fade edges */}
              <div
                className="pointer-events-none absolute left-0 top-0 z-20 h-full w-[80px]"
                style={{
                  background: "linear-gradient(90deg, #F6F7FF 0%, rgba(246,247,255,0) 100%)",
                }}
              />
              <div
                className="pointer-events-none absolute right-0 top-0 z-20 h-full w-[80px]"
                style={{
                  background: "linear-gradient(270deg, #F6F7FF 0%, rgba(246,247,255,0) 100%)",
                }}
              />

              {/* Scrollable container */}
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scroll-smooth px-6 pb-8 pt-2 scrollbar-hide"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {reviews.map((review, index) => (
                  <div
                    key={review._id}
                    className="w-[360px] flex-shrink-0"
                  >
                    <StoryCard
                      avatarUrl={review.userAvatar}
                      name={review.userName}
                      course={review.collegeName || review.course || ""}
                      batch={review.city ? review.city : ""}
                      story={review.content}
                      rating={deriveRating(review.content, index)}
                      reviewTitle={deriveTitle(review.content, review.collegeName)}
                      timeAgo={timeAgo(review.createdAt)}
                      className="h-full"
                    />
                  </div>
                ))}
              </div>

              {/* Dot indicators */}
              <div className="mt-4 flex justify-center gap-1.5">
                {Array.from({ length: Math.min(totalDots, 12) }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-[4px] rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? "w-[32px] bg-primary"
                        : "w-[32px] bg-[#E0E0FF]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Mobile List */}
            <div className="flex flex-col gap-4 px-1 md:hidden">
              {(showAllMobile ? reviews : reviews.slice(0, 3)).map(
                (review, index) => (
                  <div key={review._id} className="w-full">
                    <StoryCard
                      avatarUrl={review.userAvatar}
                      name={review.userName}
                      course={review.collegeName || review.course || ""}
                      batch={review.city ? review.city : ""}
                      story={review.content}
                      rating={deriveRating(review.content, index)}
                      reviewTitle={deriveTitle(review.content, review.collegeName)}
                      timeAgo={timeAgo(review.createdAt)}
                      className="w-full"
                    />
                  </div>
                )
              )}
            </div>

            {/* Mobile Toggle Button */}
            {reviews.length > 3 && (
              <div className="mt-6 flex justify-center md:hidden">
                <button
                  onClick={() => setShowAllMobile(!showAllMobile)}
                  className="flex items-center gap-2 rounded-full border border-[#D0D5DD] bg-white px-4 py-2 font-helvetica text-[14px] font-medium text-[#162447] transition-all hover:bg-gray-50 hover:shadow-sm"
                >
                  {showAllMobile ? "Read Less Reviews" : "Read More Reviews"}
                  {showAllMobile ? (
                    <ChevronUp className="h-4 w-4 text-[#162447]" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-[#162447]" />
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </ContentWrapper>

      {/* Hide scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

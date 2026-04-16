"use client";

import React, { useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookmarkIcon } from "@/components/common/Icons";

interface SimilarArticle {
  id: string;
  imageUrl: string;
  date: string;
  title: string;
  slug: string;
}

interface SimilarArticlesProps {
  articles: SimilarArticle[];
  currentArticleId: string;
}

export default function SimilarArticles({
  articles,
  currentArticleId,
}: SimilarArticlesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter out current article
  const filteredArticles = articles.filter(
    (article) => article.id !== currentArticleId
  );

  // Translate vertical wheel events to horizontal scroll for trackpad support
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
    <div className="flex flex-col gap-4 md:gap-8 lg:gap-[48px]">
      <h2 className="font-poppins font-medium leading-[28px] sm:leading-[32px] md:leading-[40px] lg:leading-[46px] xl:leading-[52px] text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] xl:text-[48px] tracking-[-0.4px] md:tracking-[-0.6px] lg:tracking-[-0.8px] text-black">
        Similar Articles
      </h2>

      <div
        ref={scrollRef}
        onWheel={handleWheel}
        className="flex gap-[22px] overflow-x-auto pb-4 scrollbar-hide"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {filteredArticles.slice(0, 4).map((article) => (
          <Link
            key={article.id}
            href={`/blog/${article.slug}`}
            className="bg-white rounded-[20px] shadow-[1px_6px_41px_0px_rgba(0,0,0,0.04)] flex-shrink-0 w-[280px] sm:w-[302px] cursor-pointer hover:shadow-[1px_6px_41px_0px_rgba(0,0,0,0.08)] transition-shadow block"
          >
            <div className="flex flex-col gap-[16px] p-[16px] pb-[34px]">
              {/* Image */}
              <div className="relative w-full h-[258px] rounded-[10px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.imageUrl || "/dummyimg/blogcard.png"}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-[18px]">
                <div className="flex items-center justify-between">
                  <p className="font-poppins text-[16px] leading-[20px] text-[rgba(19,8,37,0.6)]">
                    {article.date}
                  </p>
                  {/* <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Bookmark:", article.id);
                    }}
                    className="border-[0.5px] border-[#dac9ff] rounded-[40px] p-[4px] hover:bg-[#f6f7ff] transition-colors"
                  >
                    <BookmarkIcon width={24} height={24} fill="#513392" stroke="#513392" />
                  </button> */}
                </div>
                <h3 className="font-poppins font-medium leading-[28px] text-[#162447] text-[20px] tracking-[-0.4px]">
                  {article.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

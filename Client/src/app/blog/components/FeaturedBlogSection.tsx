"use client";

import React from "react";
import Image from "next/image";
import BlogCardDetailed from "@/components/common/Cards/BlogCardDetailed";
import BlogCardHorizontal from "@/components/common/Cards/BlogCardHorizontal";
import { Button } from "@/components/common/Button";
import { useCmsBlogPage } from "@/hooks/cms/useCmsBlogpage";

interface FeaturedBlogSectionProps {
  featuredBlog: {
    id: string;
    imageUrl: string;
    category: string;
    readTime: string;
    title: string;
    description: string;
  };
  horizontalBlogs: Array<{
    id: string;
    imageUrl: string;
    category: string;
    readTime: string;
    title: string;
  }>;
  onBlogClick?: (blogId: string) => void;
  onBookmark?: (blogId: string) => void;
}

export default function FeaturedBlogSection({
  featuredBlog,
  horizontalBlogs,
  onBlogClick,
  onBookmark,
}: FeaturedBlogSectionProps) {
  const { newsletter } = useCmsBlogPage();
  const isNewsletterEnabled = newsletter?.enabled === true;

  return (
    <section className="flex flex-col lg:flex-row gap-5 items-start w-full">
      {/* Featured Blog Card */}
      <BlogCardDetailed
        id={featuredBlog.id}
        imageUrl={featuredBlog.imageUrl}
        category={featuredBlog.category}
        readTime={featuredBlog.readTime}
        title={featuredBlog.title}
        description={featuredBlog.description}
        onReadMore={() => onBlogClick?.(featuredBlog.id)}
        onBookmark={() => onBookmark?.(featuredBlog.id)}
      />

      {/* Right Column: Newsletter + Horizontal Cards */}
      <div className="flex flex-col gap-5 flex-1 w-full">
        {/* Newsletter Card */}
        {isNewsletterEnabled && newsletter && (
          <div className="border-[6px] md:border-[10px] border-[#d5c2ff] rounded-[20px] min-h-[200px] md:min-h-[250px] relative overflow-hidden shadow-[0px_0px_24px_0px_rgba(178,144,252,0.6)] bg-gradient-to-br from-[#8554ef] via-[#6b44c0] to-[#513392] flex flex-col justify-center px-5 py-6 md:px-[34px] md:py-0">
            <Image
              src={newsletter.image as string}
              alt={newsletter.title as string}
              fill
              className="absolute inset-0 object-cover pointer-events-none"
            />
            <div className="flex flex-col gap-[22px] max-w-[430px] w-full relative z-10">
              <div className="flex flex-col gap-[8px] md:gap-[10px] text-white">
                <h3 className="font-helvetica font-medium leading-[24px] md:leading-[28px] text-[18px] md:text-[22px] tracking-[-0.48px] line-clamp-2">
                  {newsletter.title}
                </h3>
                <p className="font-poppins text-[12px] md:text-[14px] leading-[18px] md:leading-[20px] opacity-80">
                  {newsletter.subHeadline}
                </p>
              </div>
              <div className="bg-[#f6f7ff] border-[0.5px] border-[rgba(147,97,255,0.2)] rounded-[90px] flex items-center pl-4 md:pl-5 pr-1 py-1 justify-between w-full">
                <p className="font-poppins text-[14px] md:text-[16px] leading-[20px] text-[#767e92] truncate mr-2">
                  Your email address
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-[#513392] rounded-[50px] px-[16px] md:px-[20px] py-[8px] md:py-[12px] text-[14px] md:text-[16px] text-white whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Horizontal Blog Cards */}
        <div className="flex flex-col gap-5">
          {horizontalBlogs.map((blog) => (
            <BlogCardHorizontal
              key={blog.id}
              id={blog.id}
              imageUrl={blog.imageUrl}
              category={blog.category}
              readTime={blog.readTime}
              title={blog.title}
              onReadMore={() => onBlogClick?.(blog.id)}
              onBookmark={() => onBookmark?.(blog.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

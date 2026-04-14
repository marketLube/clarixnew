"use client";

import React from "react";
import BlogCard from "@/components/common/Cards/blogCard";

interface LatestArticlesSectionProps {
  blogs: Array<{
    id: string;
    imageUrl: string;
    date: string;
    title: string;
  }>;
  onBlogClick?: (blogId: string) => void;
}

export default function LatestArticlesSection({
  blogs,
  onBlogClick,
}: LatestArticlesSectionProps) {
  return (
    <section className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-0 md:gap-6 max-w-[320px]">
        <h2 className="font-poppins font-medium leading-[48px] text-[#162447] text-[22px] md:text-[48px] tracking-[-0.96px]">
          Latest Articles
        </h2>
        <p className="font-poppins leading-[20px] text-[#767e92] text-[14px] md:text-[16px]">
          Insights, guides, and updates to help you make smarter education
          decisions.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[22px]">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            onClick={() => onBlogClick?.(blog.id)}
            className="cursor-pointer"
          >
            <BlogCard
              imageUrl={blog.imageUrl}
              date={blog.date}
              title={blog.title}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

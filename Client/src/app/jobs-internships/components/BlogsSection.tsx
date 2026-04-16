"use client";

import React from "react";
import BlogCard from "@/components/common/Cards/blogCard";

interface Blog {
  _id: string;
  thumbnail?: string;
  date?: string;
  title: string;
  slug: string;
}

interface BlogsSectionProps {
  blogs: Blog[];
  onBlogClick?: (blogId: string) => void;
}

export default function BlogsSection({
  blogs,
  onBlogClick,
}: BlogsSectionProps) {
  return (
    <section className="flex flex-col gap-4 md:gap-6 lg:gap-10 items-center w-full">
      {/* Header */}
      <div className="flex flex-col gap-3 md:gap-4 lg:gap-6 items-center text-center max-w-[567px]">
        <div className="bg-[#f6f7ff] px-3 py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-[10px] rounded-full">
          <p className="text-[12px] md:text-[14px] lg:text-[16px] leading-[16px] md:leading-[20px] text-[#513392]">
            Blogs
          </p>
        </div>
        <h2 className="font-poppins font-medium leading-[28px] sm:leading-[32px] md:leading-[40px] lg:leading-[46px] xl:leading-[52px] text-[#162447] text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] xl:text-[48px] tracking-[-0.4px] md:tracking-[-0.6px] lg:tracking-[-0.8px]">
          Explore Education Trends, Careers & College Life
        </h2>
        <p className=" text-[14px] md:text-[16px] leading-[20px] text-[#767e92] max-w-[472px]">
          Explore internships, part-time roles, and graduate jobs curated from
          verified colleges and recruiters.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[22px] w-full">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            onClick={() => onBlogClick?.(blog._id)}
            className="cursor-pointer"
          >
            <BlogCard
              imageUrl={blog.thumbnail || "/dummyimg/blogcard.png"}
              date={blog.date}
              title={blog.title}
              slug={blog.slug}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

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
    <section className="flex flex-col gap-10 items-center w-full">
      {/* Header */}
      <div className="flex flex-col gap-6 items-center text-center max-w-[567px]">
        <div className="bg-[#f6f7ff] px-5 py-[10px] rounded-[40px]">
          <p className="text-[16px] leading-[20px] text-[#513392]">
            Blogs
          </p>
        </div>
        <h2 className="font-helvetica font-medium leading-[32px] md:leading-[48px] text-[#162447] text-[24px] md:text-[40px] lg:text-[48px] tracking-[-0.96px]">
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

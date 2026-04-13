"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import BlogHero from "./components/BlogHero";
import FeaturedBlogSection from "./components/FeaturedBlogSection";
import LatestArticlesSection from "./components/LatestArticlesSection";
import Pagination from "@/components/Ui/Pagination";
import { useBlogs } from "@/hooks/blog/useBlogs";

export default function BlogPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const cardsPerPage = 8;

  const { data } = useBlogs(search);
  const blogs = data?.blogs || [];

  // Featured blog: First blog
  const featuredBlogData = blogs[0];
  const featuredBlog = featuredBlogData ? {
    id: featuredBlogData._id,
    imageUrl: featuredBlogData.thumbnail || "",
    category: featuredBlogData.category || "",
    readTime: featuredBlogData.readTime || "",
    title: featuredBlogData.title,
    description: featuredBlogData.excerpt || "",
  } : null;

  // Horizontal blogs: Next 2 blogs
  const horizontalBlogsData = blogs.slice(1, 3);
  const horizontalBlogs = horizontalBlogsData.map((blog) => ({
    id: blog._id,
    imageUrl: blog.thumbnail || "",
    category: blog.category || "",
    readTime: blog.readTime || "",
    title: blog.title,
  }));

  // All blog articles: Remaining blogs
  const allBlogsData = blogs.slice(3);
  const allBlogs = allBlogsData.map((blog) => ({
    id: blog._id,
    imageUrl: blog.thumbnail || "",
    date: blog.date ? new Date(blog.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    title: blog.title,
    slug: blog.slug,
  }));

  // Calculate pagination
  const totalPages = Math.ceil(allBlogs.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentBlogs = allBlogs.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-[#fdfdfd]">
      {/* Hero Section */}
      <BlogHero onSearch={setSearch} />

      {/* Main Content */}
      <ContentWrapper className="flex flex-col gap-8 md:gap-16 py-4 md:py-16">
        {/* Featured Blog Section */}
        {featuredBlog && (
          <FeaturedBlogSection
            featuredBlog={featuredBlog}
            horizontalBlogs={horizontalBlogs}
            onBlogClick={(blogId) => {

              const blog = blogs.find(b => b._id === blogId);
              if (blog) {
                router.push(`/blog/${blog.slug}`);
              }
            }}
            onBookmark={(blogId) => {
              const blog = blogs.find(b => b._id === blogId);
              if (blog) {
                router.push(`/blog/${blog.slug}`);
              }
            }}
          />
        )}

        {/* Latest Articles Section */}
        <LatestArticlesSection
          blogs={currentBlogs}
          onBlogClick={(blogId) => {
            const blog = blogs.find(b => b._id === blogId);
            if (blog) {
              router.push(`/blog/${blog.slug}`);
            }
          }}
        />

        {/* Pagination */}
        {allBlogs.length > 0 && (
          <div className="flex justify-center">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page) => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            />
          </div>
        )}
      </ContentWrapper>
    </div>
  );
}

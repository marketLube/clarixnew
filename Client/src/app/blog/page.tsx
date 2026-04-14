"use client";

import { Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import BlogHero from "./components/BlogHero";
import FeaturedBlogSection from "./components/FeaturedBlogSection";
import LatestArticlesSection from "./components/LatestArticlesSection";
import Pagination from "@/components/Ui/Pagination";
import { useBlogs } from "@/hooks/blog/useBlogs";
import Breadcrumb from "@/components/common/Breadcrumb";
import Loader from "@/components/common/Loader";

function BlogPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("q") || "";
  const isFirstPage = currentPage === 1 && !search;

  // Fetch from API with server-side pagination
  // First page: fetch extra for featured section (3 featured + 12 grid = 15)
  // Other pages: fetch 12 for grid only
  const { data, isLoading } = useBlogs({
    page: isFirstPage ? 1 : currentPage,
    limit: isFirstPage ? 15 : 12,
    search: search || undefined,
  });

  const blogs = data?.blogs || [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages || 1;

  // On first page, show featured section + grid
  // On other pages, show grid only
  const featuredBlogData = isFirstPage ? blogs[0] : null;
  const featuredBlog = featuredBlogData
    ? {
        id: featuredBlogData._id,
        imageUrl: featuredBlogData.thumbnail || "",
        category: featuredBlogData.category || "",
        readTime: featuredBlogData.readTime || "",
        title: featuredBlogData.title,
        description: featuredBlogData.excerpt || "",
      }
    : null;

  const horizontalBlogsData = isFirstPage ? blogs.slice(1, 3) : [];
  const horizontalBlogs = horizontalBlogsData.map((blog) => ({
    id: blog._id,
    imageUrl: blog.thumbnail || "",
    category: blog.category || "",
    readTime: blog.readTime || "",
    title: blog.title,
  }));

  // Grid blogs: skip featured ones on first page
  const gridBlogs = (isFirstPage ? blogs.slice(3) : blogs).map((blog) => ({
    id: blog._id,
    imageUrl: blog.thumbnail || "",
    date: new Date(blog.date || blog.createdAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    title: blog.title,
    slug: blog.slug,
  }));

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (page <= 1) {
        params.delete("page");
      } else {
        params.set("page", String(page));
      }
      const qs = params.toString();
      router.push(`/blog${qs ? `?${qs}` : ""}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [router, searchParams]
  );

  const handleSearch = useCallback(
    (q: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (q) {
        params.set("q", q);
      } else {
        params.delete("q");
      }
      params.delete("page");
      router.push(`/blog?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="min-h-screen bg-[#fdfdfd]">
      <ContentWrapper className="pt-6">
        <Breadcrumb items={[{ label: "Blog" }]} />
      </ContentWrapper>

      {/* Hero Section */}
      <BlogHero onSearch={handleSearch} />

      {/* Main Content */}
      <ContentWrapper className="flex flex-col gap-8 md:gap-12 py-4 md:py-10">
        {isLoading ? (
          <Loader fullPage label="Loading blogs..." />
        ) : (
          <>
            {/* Featured Blog Section (first page only) */}
            {featuredBlog && (
              <FeaturedBlogSection
                featuredBlog={featuredBlog}
                horizontalBlogs={horizontalBlogs}
                onBlogClick={(blogId) => {
                  const blog = blogs.find((b) => b._id === blogId);
                  if (blog) router.push(`/blog/${blog.slug}`);
                }}
                onBookmark={(blogId) => {
                  const blog = blogs.find((b) => b._id === blogId);
                  if (blog) router.push(`/blog/${blog.slug}`);
                }}
              />
            )}

            {/* Latest Articles Grid */}
            {gridBlogs.length > 0 ? (
              <LatestArticlesSection
                blogs={gridBlogs}
                onBlogClick={(blogId) => {
                  const blog = blogs.find((b) => b._id === blogId);
                  if (blog) router.push(`/blog/${blog.slug}`);
                }}
              />
            ) : (
              <div className="text-center py-12">
                <p className="font-poppins text-[#767e92] text-sm">No blogs found.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}

            {/* Total count */}
            {pagination && (
              <p className="text-center text-sm text-[#767e92] font-poppins">
                Showing {gridBlogs.length} of {pagination.total} articles
              </p>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<Loader fullPage label="Loading blog..." />}>
      <BlogPageContent />
    </Suspense>
  );
}

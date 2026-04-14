"use client";

import { Suspense, useCallback, useMemo } from "react";
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
  const hasActiveFilters = Boolean(search);
  const cardsPerPage = 8;

  const { data } = useBlogs(search);
  const blogs = data?.blogs || [];

  // Featured blog: First blog
  const featuredBlogData = blogs[0];
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
    date: blog.date
      ? new Date(blog.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : new Date(blog.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
    title: blog.title,
    slug: blog.slug,
  }));

  // Calculate pagination
  const totalPages = Math.ceil(allBlogs.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentBlogs = allBlogs.slice(startIndex, endIndex);

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

  // Build rel prev/next links for SEO
  const paginationLinks = useMemo(() => {
    const links: React.ReactNode[] = [];
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      const href = prevPage === 1 ? "/blog" : `/blog?page=${prevPage}`;
      links.push(<link key="prev" rel="prev" href={href} />);
    }
    if (currentPage < totalPages) {
      links.push(
        <link key="next" rel="next" href={`/blog?page=${currentPage + 1}`} />
      );
    }
    return links;
  }, [currentPage, totalPages]);

  return (
    <div className="min-h-screen bg-[#fdfdfd]">
      {/* SEO noindex handled via layout metadata */}

      <ContentWrapper className="pt-6">
        <Breadcrumb items={[{ label: "Blog" }]} />
      </ContentWrapper>

      {/* Hero Section */}
      <BlogHero onSearch={handleSearch} />

      {/* Main Content */}
      <ContentWrapper className="flex flex-col gap-8 md:gap-16 py-4 md:py-16">
        {/* Featured Blog Section */}
        {featuredBlog && (
          <FeaturedBlogSection
            featuredBlog={featuredBlog}
            horizontalBlogs={horizontalBlogs}
            onBlogClick={(blogId) => {
              const blog = blogs.find((b) => b._id === blogId);
              if (blog) {
                router.push(`/blog/${blog.slug}`);
              }
            }}
            onBookmark={(blogId) => {
              const blog = blogs.find((b) => b._id === blogId);
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
            const blog = blogs.find((b) => b._id === blogId);
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
              onPageChange={handlePageChange}
            />
          </div>
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

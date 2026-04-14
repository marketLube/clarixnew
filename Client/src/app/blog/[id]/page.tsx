"use client";

import { useParams } from "next/navigation";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import BlogDetailHero from "./components/BlogDetailHero";
import BlogContent from "./components/BlogContent";
import BlogTable from "./components/BlogTable";
import SimilarArticles from "./components/SimilarArticles";
import FAQ from "@/app/components/common/FAQ";
import Contact from "@/app/components/common/Contact/Contact";
import { useBlog } from "@/hooks/blog/useBlog";
import { useBlogs } from "@/hooks/blog/useBlogs";
import Loader from "@/components/common/Loader";
import Breadcrumb from "@/components/common/Breadcrumb";

export default function BlogDetailPage() {
  const params = useParams();

  const blogId = params?.id as string;
  const { data: blog, isLoading, isError } = useBlog(blogId);
  const { data: blogsData } = useBlogs();

  // Filter similar articles (excluding current one)
  const allBlogs = blogsData?.blogs
    .filter(b => b._id !== blog?._id)
    .map(b => ({
      id: b._id,
      imageUrl: b.thumbnail || "/dummyimg/blogcard.png",
      date: b.date ? new Date(b.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : new Date(b.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      title: b.title,
      slug: b.slug // Pass slug for navigation
    })) || [];

  if (isLoading) {
    return <Loader fullPage label="Loading blog..." />;
  }

  if (isError || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Blog not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#fdfdfd] min-h-screen">
      {/* Breadcrumb */}
      <ContentWrapper className="!mt-0 pt-3 pb-3">
        <Breadcrumb
          items={[
            { label: "Blog", href: "/blog" },
            { label: blog.title },
          ]}
        />
      </ContentWrapper>

      {/* Hero Section */}
      <BlogDetailHero
        category={blog.category || "General"}
        date={blog.date ? new Date(blog.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        title={blog.title}
      />

      {/* Main Content */}
      <ContentWrapper className="py-8 md:py-16">
        <div className="flex flex-col gap-8 md:gap-[40px] items-center">
          {/* Main Content Text */}
          <BlogContent content={blog.content} imageUrl={blog.thumbnail} />
          {/* Similar Articles */}
          <div className="w-full">
            <SimilarArticles articles={allBlogs} currentArticleId={blog._id} />
          </div>
        </div>
      </ContentWrapper>

      {/* Contact Section */}
      <div className="bg-gradient-to-b from-[#f6f7ff] to-[rgba(248,249,254,0)] py-8 md:py-16">
        <Contact />
      </div>
    </div>
  );
}

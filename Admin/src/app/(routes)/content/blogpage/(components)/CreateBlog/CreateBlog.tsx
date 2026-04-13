"use client";

import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import Headline from "../HeroSection/(components)/Headline";
import UploadSection from "./components/UploadSection";
import Customize from "./components/Customize";
import BlogMeta from "./components/BlogMeta";
import { useCreateBlog } from "@/src/servicesHooks/contentHooks/blogpage/useCreateBlog";
import { useBlog } from "@/src/servicesHooks/contentHooks/blogpage/useBlog";
import { useUpdateBlog } from "@/src/servicesHooks/contentHooks/blogpage/useUpdateBlog";

type BlogStatus = "Draft" | "Published";

interface BlogFormState {
  title: string;
  excerpt: string;
  content: string;
  thumbnail: File | string | null;
  status: BlogStatus;
  date: string;
  readTime: string;
  category: string;
}

interface CreateBlogProps {
  blogId?: string | null;
  onSuccess?: () => void;
  viewMode?: boolean;
}

export default function CreateBlog({ blogId, onSuccess, viewMode = false }: CreateBlogProps) {
  const [blog, setBlog] = useState<BlogFormState>({
    title: "",
    excerpt: "",
    content: "",
    thumbnail: null,
    status: "Published",
    date: "",
    readTime: "",
    category: "",
  });

  const { createBlog, isPending: isCreating } = useCreateBlog();
  const { updateBlog, isPending: isUpdating } = useUpdateBlog();

  const { data: blogData } = useBlog(blogId || null);

  useEffect(() => {
    if (blogData?.data) {
      const b = blogData.data;
      setBlog({
        title: b.title || "",
        excerpt: b.excerpt || "",
        content: b.content || "",
        thumbnail: b.thumbnail || null,
        status: (b.status as BlogStatus) || "Draft",
        date: b.date ? new Date(b.date).toISOString().split('T')[0] : "",
        readTime: b.readTime || "",
        category: b.category || "",
      });
    }
  }, [blogData]);

  const handleHeadlineChange = (updates: { headline?: string; subHeadline?: string }) => {
    setBlog((prev) => ({
      ...prev,
      title: updates.headline ?? prev.title,
      excerpt: updates.subHeadline ?? prev.excerpt,
    }));
  };

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("title", blog.title.trim());
    if (blog.excerpt.trim()) {
      formData.append("excerpt", blog.excerpt.trim());
    }
    formData.append("content", blog.content.trim());
    formData.append("status", blog.status);

    if (blog.thumbnail instanceof File) {
      formData.append("thumbnail", blog.thumbnail);
    } else if (typeof blog.thumbnail === "string" && blog.thumbnail.trim()) {
      formData.append("thumbnail", blog.thumbnail.trim());
    }

    if (blog.date) formData.append("date", blog.date);
    if (blog.readTime) formData.append("readTime", blog.readTime);
    if (blog.category) formData.append("category", blog.category);

    const options = {
      onSuccess: () => {
        setBlog({
          title: "",
          excerpt: "",
          content: "",
          thumbnail: null,
          status: "Published",
          date: "",
          readTime: "",
          category: "",
        });
        if (onSuccess) onSuccess();
      },
    };

    if (blogId) {
      updateBlog({ id: blogId, formData }, options);
    } else {
      createBlog(formData, options);
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <div className="flex flex-col gap-6">
      <Headline
        enabled
        primaryHeadline={blog.title}
        subHeadline={blog.excerpt}
        onChange={!viewMode ? handleHeadlineChange : undefined}
        disabled={viewMode}
      />

      <UploadSection
        thumbnail={blog.thumbnail}
        onThumbnailChange={!viewMode ? (file) => setBlog((prev) => ({ ...prev, thumbnail: file })) : () => { }}
        disabled={viewMode}
      />

      <BlogMeta
        date={blog.date}
        readTime={blog.readTime}
        category={blog.category}
        onChange={(field, value) => setBlog((prev) => ({ ...prev, [field]: value }))}
        disabled={viewMode}
      />

      <Customize
        content={blog.content}
        onChange={!viewMode ? (value) => setBlog((prev) => ({ ...prev, content: value })) : () => { }}
        readOnly={viewMode}
      />

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3 text-sm text-[#364440]">
          <span>Status:</span>
          <select
            value={blog.status}
            onChange={(e) =>
              setBlog((prev) => ({
                ...prev,
                status: e.target.value as BlogStatus,
              }))
            }
            disabled={viewMode}
            className={`h-9 rounded-md border border-[#D5E1DB] bg-white px-3 text-sm text-[#364440] focus:border-[#0DBA85] focus:outline-none ${viewMode ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        {!viewMode && (
          <Button
            type="button"
            className="bg-[#0dba85] hover:bg-[#0aa67b] text-white h-9 px-6 rounded-md text-sm font-normal"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? (blogId ? "Updating..." : "Publishing...") : (blogId ? "Update Blog" : "Create Blog")}
          </Button>
        )}
      </div>
    </div>
  );
}

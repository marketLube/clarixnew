"use client";

import BlogCard from "@/components/common/Cards/blogCard";
import { Button } from "@/components/common/Button";
import { ArrowRightIcon } from "@/components/common/Icons";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import { useRouter } from "next/navigation";
import { useCmsHomepage } from "@/hooks/cms/useCmsHomepage";
import { useBlogs } from "@/hooks/blog/useBlogs";
import Loader from "@/components/common/Loader";

export default function Blog() {
  const router = useRouter();
  const { contentBlocks } = useCmsHomepage();
  const { data, isLoading } = useBlogs();

  // Prefer a block tagged for this section; otherwise fall back to fourth block (index 3)
  const blogBlock =
    contentBlocks?.blocks?.find((block) => block.sectionKey === "blog") ??
    contentBlocks?.blocks?.[3];

  const title = blogBlock?.title ?? "";
  const description = blogBlock?.description ?? "";

  const blogs = data?.blogs || [];

  return (
    <section className="w-full bg-white py-10 md:py-20 lg:py-24">
      <ContentWrapper className="flex flex-col items-center px-4 md:px-10">
        {/* Heading block */}
        <header className="flex max-w-[567px] flex-col items-center gap-3 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-(--color-background) px-5 py-2">
            <p className="font-poppins text-base leading-5 text-primary">
              Blogs
            </p>
          </div>
          <h2 className="font-poppins text-[22px] leading-[28px] tracking-[-0.02em] text-(--text-headline) md:text-[40px] md:leading-[46px] lg:text-[48px] lg:leading-[48px]">
            {title}
          </h2>
          <p className="font-poppins text-base leading-5 text-text-sub md:max-w-[472px]">
            {description}
          </p>
        </header>

        {/* Blog cards */}
        {isLoading ? (
          <Loader containerClassName="h-[300px]" label="Loading blogs..." />
        ) : (
          <div className="mt-10 grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {blogs.slice(0, 4).map((blog) => (
              <div key={blog._id} className="flex justify-center">
                <BlogCard
                  date={blog.date ? new Date(blog.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  title={blog.title}
                  imageUrl={blog.thumbnail}
                  slug={blog.slug}
                />
              </div>
            ))}
          </div>
        )}

        {/* Read more button */}
        <div className="mt-10 flex w-full justify-center">
          <Button
            variant="primaryRound"
            size="md"
            className="gap-2 px-4 py-2 md:gap-3 md:px-6 md:py-2.5 font-poppins text-[14px] md:text-base cursor-pointer"
            onClick={() => router.push("/blog")}
          >
            <span>Read More Blog</span>
            <ArrowRightIcon className="w-5 h-5 md:w-6 md:h-6" width={24} height={24} fill="#FAF9F6" />
          </Button>
        </div>
      </ContentWrapper>
    </section>
  );
}

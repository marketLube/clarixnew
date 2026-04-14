import type { Metadata } from "next";
import { stripMarkdown } from "@/lib/helperFunctions/stripMarkdown";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clarix.in";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

async function fetchBlog(id: string) {
  try {
    const res = await fetch(`${API_URL}/blog/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const blog = await fetchBlog(id);

  if (!blog) {
    return { title: "Blog Post Not Found" };
  }

  const title = blog.title || "Blog Post";
  const description = stripMarkdown(blog.excerpt || blog.content?.replace(/<[^>]*>/g, "") || "");
  const image = blog.thumbnail;

  return {
    title,
    description: description.slice(0, 160),
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: `${SITE_URL}/blog/${id}`,
      type: "article",
      ...(blog.createdAt ? { publishedTime: blog.createdAt } : {}),
      ...(blog.updatedAt ? { modifiedTime: blog.updatedAt } : {}),
      ...(image ? { images: [{ url: image, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description.slice(0, 160),
      ...(image ? { images: [image] } : {}),
    },
    alternates: {
      canonical: `/blog/${id}`,
    },
  };
}

export default async function BlogLayout({ params, children }: Props) {
  const { id } = await params;
  const blog = await fetchBlog(id);

  const jsonLd = blog
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: blog.title,
        url: `${SITE_URL}/blog/${id}`,
        ...(blog.excerpt ? { description: stripMarkdown(blog.excerpt) } : {}),
        ...(blog.thumbnail ? { image: blog.thumbnail } : {}),
        ...(blog.createdAt ? { datePublished: blog.createdAt } : {}),
        ...(blog.updatedAt ? { dateModified: blog.updatedAt } : {}),
        ...(blog.readTime ? { timeRequired: blog.readTime } : {}),
        ...(blog.category
          ? { articleSection: blog.category }
          : {}),
        ...(blog.tags && blog.tags.length > 0
          ? { keywords: blog.tags.join(", ") }
          : {}),
        author: {
          "@type": "Organization",
          name: "Clarix Education",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "Clarix Education",
          url: SITE_URL,
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}

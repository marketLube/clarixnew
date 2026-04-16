import React from "react";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.clarixeducation.com";

export interface BreadcrumbTrailItem {
  name: string;
  /** Absolute or root-relative URL. Root-relative values are prefixed with SITE_URL. */
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbTrailItem[];
}

/**
 * Emits a schema.org BreadcrumbList as JSON-LD so Google can show the
 * breadcrumb trail in search results instead of the raw URL.
 *
 * Usage (in any Server Component such as a detail page layout.tsx):
 *   <BreadcrumbJsonLd items={[
 *     { name: "Home", url: "/" },
 *     { name: "Colleges", url: "/colleges" },
 *     { name: college.name, url: `/colleges/${college._id}` },
 *   ]} />
 */
export default function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  if (!items?.length) return null;

  const payload = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}

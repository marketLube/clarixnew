import React from "react";

export interface FaqEntry {
  question: string;
  answer: string;
}

interface FaqJsonLdProps {
  items: FaqEntry[];
}

/**
 * Emits a schema.org FAQPage as JSON-LD so Google can show the
 * FAQ-rich snippet in search results. Pass an array of
 * { question, answer } pairs.
 *
 * Usage (Server Component — e.g. a detail page layout.tsx where the
 * FAQ data is already fetched):
 *   <FaqJsonLd items={college.faqs ?? []} />
 */
export default function FaqJsonLd({ items }: FaqJsonLdProps) {
  if (!items?.length) return null;

  const payload = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}

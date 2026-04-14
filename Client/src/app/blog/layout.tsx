import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education Blog - Latest News, Tips & Guides",
  description:
    "Read the latest education news, expert tips, study guides, and admission updates on the Clarix Education blog for students and parents.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Education Blog - Latest News, Tips & Guides | Clarix",
    description:
      "Read the latest education news, expert tips, study guides, and admission updates on the Clarix Education blog for students and parents.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Education Blog - Latest News, Tips & Guides | Clarix",
    description:
      "Read the latest education news, expert tips, study guides, and admission updates on the Clarix Education blog for students and parents.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

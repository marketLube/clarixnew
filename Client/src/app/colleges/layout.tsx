import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Colleges in India - Compare & Choose",
  description:
    "Browse and compare top colleges across India. View rankings, fees, placements, reviews, and admission details to find your best-fit college.",
  alternates: {
    canonical: "/colleges",
  },
  openGraph: {
    title: "Top Colleges in India - Compare & Choose | Clarix Education",
    description:
      "Browse and compare top colleges across India. View rankings, fees, placements, reviews, and admission details to find your best-fit college.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Colleges in India - Compare & Choose | Clarix Education",
    description:
      "Browse and compare top colleges across India. View rankings, fees, placements, reviews, and admission details to find your best-fit college.",
  },
};

export default function CollegesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

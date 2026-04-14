import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scholarships in India - Find & Apply",
  description:
    "Search and apply for scholarships across India. Find merit-based, need-based, and government scholarships with eligibility details and deadlines.",
  alternates: {
    canonical: "/scholarships",
  },
  openGraph: {
    title: "Scholarships in India - Find & Apply | Clarix Education",
    description:
      "Search and apply for scholarships across India. Find merit-based, need-based, and government scholarships with eligibility details and deadlines.",
  },
};

export default function ScholarshipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

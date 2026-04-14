import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "College Reviews - Student Experiences",
  description:
    "Read authentic college reviews from current students and alumni. Get honest insights on academics, campus life, placements, and more.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "College Reviews - Student Experiences | Clarix Education",
    description:
      "Read authentic college reviews from current students and alumni. Get honest insights on academics, campus life, placements, and more.",
  },
};

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

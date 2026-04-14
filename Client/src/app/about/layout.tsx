import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Clarix Education - Our Mission & Vision",
  description:
    "Learn about Clarix Education's mission to empower students with guidance on colleges, courses, careers, and scholarships across India.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Clarix Education - Our Mission & Vision",
    description:
      "Learn about Clarix Education's mission to empower students with guidance on colleges, courses, careers, and scholarships across India.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

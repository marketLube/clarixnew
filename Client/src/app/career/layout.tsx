import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Guidance & Counseling",
  description:
    "Get expert career guidance and counseling to choose the right profession. Explore career paths, salary insights, and growth opportunities with Clarix.",
  alternates: {
    canonical: "/career",
  },
  openGraph: {
    title: "Career Guidance & Counseling | Clarix Education",
    description:
      "Get expert career guidance and counseling to choose the right profession. Explore career paths, salary insights, and growth opportunities with Clarix.",
  },
};

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

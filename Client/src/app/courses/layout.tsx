import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses & Programs - Find Your Ideal Course",
  description:
    "Explore a wide range of undergraduate and postgraduate courses. Compare programs, eligibility criteria, fees, and career prospects on Clarix Education.",
  alternates: {
    canonical: "/courses",
  },
  openGraph: {
    title: "Courses & Programs - Find Your Ideal Course | Clarix Education",
    description:
      "Explore a wide range of undergraduate and postgraduate courses. Compare programs, eligibility criteria, fees, and career prospects on Clarix Education.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Courses & Programs - Find Your Ideal Course | Clarix Education",
    description:
      "Explore a wide range of undergraduate and postgraduate courses. Compare programs, eligibility criteria, fees, and career prospects on Clarix Education.",
  },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

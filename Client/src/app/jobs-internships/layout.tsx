import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs & Internships for Students",
  description:
    "Discover jobs and internship opportunities tailored for students and fresh graduates. Build your career with real-world experience through Clarix.",
  alternates: {
    canonical: "/jobs-internships",
  },
  openGraph: {
    title: "Jobs & Internships for Students | Clarix Education",
    description:
      "Discover jobs and internship opportunities tailored for students and fresh graduates. Build your career with real-world experience through Clarix.",
  },
};

export default function JobsInternshipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

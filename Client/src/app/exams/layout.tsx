import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrance Exams - Dates, Syllabus & Preparation",
  description:
    "Find detailed information on entrance exams including dates, syllabus, preparation tips, eligibility, and results for JEE, NEET, CAT, and more.",
  alternates: {
    canonical: "/exams",
  },
  openGraph: {
    title:
      "Entrance Exams - Dates, Syllabus & Preparation | Clarix Education",
    description:
      "Find detailed information on entrance exams including dates, syllabus, preparation tips, eligibility, and results for JEE, NEET, CAT, and more.",
  },
};

export default function ExamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

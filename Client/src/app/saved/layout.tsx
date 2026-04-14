import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved Items",
  description:
    "View your saved colleges, courses, exams, and scholarships in one place. Manage your shortlisted items on Clarix Education.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Saved Items | Clarix Education",
    description:
      "View your saved colleges, courses, exams, and scholarships in one place. Manage your shortlisted items on Clarix Education.",
  },
};

export default function SavedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

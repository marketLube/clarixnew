import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Colleges Side by Side",
  description:
    "Compare colleges side by side on fees, placements, rankings, courses, and campus facilities to make an informed admission decision.",
  openGraph: {
    title: "Compare Colleges Side by Side | Clarix Education",
    description:
      "Compare colleges side by side on fees, placements, rankings, courses, and campus facilities to make an informed admission decision.",
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

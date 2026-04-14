import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Community",
  description:
    "Join the Clarix student community to connect with peers, ask questions, share experiences, and get advice on colleges, exams, and careers.",
  openGraph: {
    title: "Student Community | Clarix Education",
    description:
      "Join the Clarix student community to connect with peers, ask questions, share experiences, and get advice on colleges, exams, and careers.",
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Log in to your Clarix Education account to access saved colleges, personalized recommendations, and community features.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Login | Clarix Education",
    description:
      "Log in to your Clarix Education account to access saved colleges, personalized recommendations, and community features.",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

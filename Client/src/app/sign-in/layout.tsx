import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to Clarix Education to access your dashboard, saved items, community discussions, and personalized recommendations.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Sign In | Clarix Education",
    description:
      "Sign in to Clarix Education to access your dashboard, saved items, community discussions, and personalized recommendations.",
  },
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

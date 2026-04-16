import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.clarixeducation.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/login", "/sign-in", "/login/otp", "/saved", "/review"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

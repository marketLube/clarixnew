import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Clarix Education",
    short_name: "Clarix",
    description:
      "Discover colleges, courses, exams, scholarships, and career opportunities. Clarix Education helps students make informed decisions about their academic future.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#513392",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

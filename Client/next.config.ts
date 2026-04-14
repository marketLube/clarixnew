import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https:",
      "img-src 'self' data: blob: https://images.unsplash.com https://upload.wikimedia.org https://*.wikimedia.org https://*.wikipedia.org https://campusways.com https://*.campusways.com https://xalesassets.sgp1.digitaloceanspaces.com https://res.cloudinary.com https://ui-avatars.com https://*.googleusercontent.com",
      "font-src 'self' https: data:",
      "connect-src 'self' https://api.clarixeducation.com https://*.clarixeducation.com http://localhost:8000 ws://localhost:3000 wss://localhost:3000",
      "frame-src 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

const cacheHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
];

const noindexRoutes = ["/login", "/sign-in", "/saved", "/review", "/login/otp"];

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  reactCompiler: true,
  trailingSlash: false,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xalesassets.sgp1.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "marketlube-website-assets.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "*.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "*.wikipedia.org",
      },
      {
        protocol: "https",
        hostname: "api.duckduckgo.com",
      },
      {
        protocol: "https",
        hostname: "duckduckgo.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "campusways.com",
      },
      {
        protocol: "https",
        hostname: "*.campusways.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3845",
      },
    ],
  },

  async headers() {
    return [
      // Security headers for all routes
      {
        source: "/:path*",
        headers: securityHeaders,
      },

      // SEO: allow indexing on all public routes by default
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "index, follow" }],
      },

      // SEO: noindex for private/auth routes
      ...noindexRoutes.map((route) => ({
        source: route,
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      })),

      // Cache: static image assets
      {
        source: "/images/:path*",
        headers: cacheHeaders,
      },

      // Cache: fonts
      {
        source: "/fonts/:path*",
        headers: cacheHeaders,
      },

      // Cache: Next.js static build output
      {
        source: "/_next/static/:path*",
        headers: cacheHeaders,
      },

      // Cache: favicon
      {
        source: "/favicon.ico",
        headers: cacheHeaders,
      },
    ];
  },

  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/college", destination: "/colleges", permanent: true },
      { source: "/course", destination: "/courses", permanent: true },
      { source: "/exam", destination: "/exams", permanent: true },
      { source: "/job", destination: "/jobs-internships", permanent: true },
      { source: "/jobs", destination: "/jobs-internships", permanent: true },
      {
        source: "/scholarship",
        destination: "/scholarships",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

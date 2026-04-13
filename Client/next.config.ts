import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  reactCompiler: true,
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
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export" as const,
        basePath: basePath || undefined,
        trailingSlash: true,
        images: {
          unoptimized: true,
          formats: ["image/avif", "image/webp"] as const,
        },
      }
    : {
        images: {
          formats: ["image/avif", "image/webp"],
        },
      }),
};

export default nextConfig;


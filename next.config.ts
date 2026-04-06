import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "1";
/** 클라이언트 전용 섹션(접힌 Collapsible 등)에서도 동일하게 쓰이도록 next.config로 주입 */
const publicBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH || (isGitHubPages ? "/portfolio" : "");

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: publicBasePath,
  },
  ...(isGitHubPages
    ? {
        output: "export" as const,
        basePath: publicBasePath || undefined,
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


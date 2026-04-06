import type { Metadata } from "next";

import { BackToTopButton } from "@/components/back-to-top-button";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { profile } from "@/lib/site-data";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  ),
  title: `${profile.name} | ${profile.role}`,
  description:
    "프론트엔드 개발과 퍼블리싱을 함께 다루는 조정민의 포트폴리오입니다.",
  keywords: [
    "조정민",
    "포트폴리오",
    "프론트엔드 개발자",
    "웹 퍼블리셔",
    "반응형 웹",
    "웹 접근성",
  ],
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description:
      "Semantic UI, accessibility, and polished frontend craft by Jeongmin Jo.",
    images: ["/images/me.jpg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <SiteHeader />
            <SiteBreadcrumb />
            <main>{children}</main>
            <SiteFooter />
            <BackToTopButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

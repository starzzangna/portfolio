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
    "여행 커머스 실서비스에서 반복되는 화면 제작을 시스템으로 바꿔온 프론트엔드 개발자 조정민의 포트폴리오입니다. CMS 섹션 조립, 공통 컴포넌트, AI 페이지 빌더와 배포 관리자 구축 사례를 담았습니다.",
  keywords: [
    "조정민",
    "포트폴리오",
    "프론트엔드 개발자",
    "React",
    "Next.js",
    "TypeScript",
    "디자인 시스템",
    "업무 자동화",
    "웹 퍼블리셔",
    "반응형 웹",
    "웹 접근성",
  ],
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description:
      "반복되는 화면 제작을 시스템으로 바꾸는 프론트엔드 개발자 조정민의 포트폴리오. 공통 컴포넌트·CMS 조립 구조·운영 자동화 사례를 소개합니다.",
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

"use client";

import { forwardRef, useMemo } from "react";
import { usePathname } from "next/navigation";

import {
  getPublicBasePath,
  inferDocumentBaseFromPathname,
} from "@/lib/app-path";

function isExternalHref(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

function resolveDocumentHref(href: string, pathname: string): string {
  if (isExternalHref(href)) {
    return href;
  }
  const fromEnv = getPublicBasePath();
  const base =
    fromEnv ||
    (href.startsWith("/") ? inferDocumentBaseFromPathname(pathname, href) : "");
  if (!base || !href.startsWith("/")) {
    return href;
  }
  return `${base}${href}`;
}

/**
 * 클라이언트 라우팅 대신 전체 로드를 사용하는 내부 링크.
 * GitHub Pages의 basePath를 붙이고, 스크롤이 맨 위로 자연스럽게 맞습니다.
 */
export const DocumentLink = forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & { href: string }
>(function DocumentLink({ href, ...rest }, ref) {
  const pathname = usePathname();
  const resolved = useMemo(
    () => resolveDocumentHref(href, pathname),
    [href, pathname],
  );
  return <a ref={ref} href={resolved} {...rest} />;
});

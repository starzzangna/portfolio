"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";

const segmentLabels: Record<string, string> = {
  projects: "프로젝트",
  fe: "FE",
  publish: "퍼블리싱",
};

function formatSegment(segment: string) {
  return segmentLabels[segment] ?? decodeURIComponent(segment).replace(/-/g, " ");
}

export function SiteBreadcrumb() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);
  const items = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const isLast = index === segments.length - 1;

    return {
      href,
      label: formatSegment(segment),
      isLast,
    };
  });

  return (
    <div className="section-shell pt-5 sm:pt-6">
      <nav
        aria-label="Breadcrumb"
        className="rounded-[10px] border border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow-[0_12px_24px_rgba(15,23,42,0.04)]"
      >
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          <li className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
            >
              <Home className="size-4" />
              <span>홈</span>
            </Link>
          </li>
          {items.map((item) => (
            <li key={item.href} className="flex items-center gap-2">
              <ChevronRight className="size-4 text-[var(--border)]" />
              {item.isLast ? (
                <span className="font-medium text-[var(--foreground)]">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

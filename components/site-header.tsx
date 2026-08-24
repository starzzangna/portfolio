'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, type MouseEvent } from 'react';

import { DocumentLink } from '@/components/document-link';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { isAppHomePathname } from '@/lib/app-path';
import { profile } from '@/lib/site-data';

const homeLinks = [
  { target: 'projects', label: '프로젝트' },
  { target: 'careers', label: '경력' },
  { target: 'skills', label: '기술' },
];

const PENDING_SECTION_KEY = 'portfolio-pending-section';

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = isAppHomePathname(pathname);

  useEffect(() => {
    if (!onHome) {
      return;
    }

    const pendingTarget = window.sessionStorage.getItem(PENDING_SECTION_KEY);
    const hashTarget = decodeURIComponent(window.location.hash.slice(1));
    const target = pendingTarget || hashTarget;

    window.sessionStorage.removeItem(PENDING_SECTION_KEY);

    if (window.location.hash) {
      window.history.replaceState(
        window.history.state,
        '',
        `${window.location.pathname}${window.location.search}`,
      );
    }

    if (target) {
      window.requestAnimationFrame(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [onHome]);

  const handleSectionClick = (
    event: MouseEvent<HTMLAnchorElement>,
    target: string,
  ) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    if (onHome) {
      event.preventDefault();
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    window.sessionStorage.setItem(PENDING_SECTION_KEY, target);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[color:color-mix(in_oklab,var(--background)_82%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <DocumentLink href="/" className="flex min-w-0">
            <p className="min-w-0 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted-foreground)] line-clamp-2 md:line-clamp-none">
              {profile.englishName}
            </p>
          </DocumentLink>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {homeLinks.map((link) => (
            <Button key={link.target} asChild variant="ghost" size="sm">
              <Link
                href="/"
                onClick={(event) => handleSectionClick(event, link.target)}
              >
                {link.label}
              </Link>
            </Button>
          ))}
          {!onHome ? (
            <Button asChild variant="ghost" size="sm">
              <DocumentLink href="/projects">프로젝트 목록</DocumentLink>
            </Button>
          ) : null}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" aria-label="메뉴 열기">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="sr-only">모바일 메뉴</SheetTitle>
              <div className="mt-12 flex flex-col gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                    빠른 이동
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                    보고 싶은 섹션과 프로젝트 페이지로 바로 이동할 수 있습니다.
                  </p>
                </div>
                {homeLinks.map((link) => (
                  <SheetClose asChild key={link.target}>
                    <Link
                      href="/"
                      onClick={(event) =>
                        handleSectionClick(event, link.target)
                      }
                      className="rounded-[10px] border border-[var(--border)] bg-[var(--card)] px-4 py-3.5 text-base font-medium"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <DocumentLink
                    href="/projects"
                    className="rounded-[10px] border border-[var(--border)] bg-[var(--card)] px-4 py-3.5 text-base font-medium"
                  >
                    전체 프로젝트
                  </DocumentLink>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

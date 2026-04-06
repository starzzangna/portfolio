'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { profile } from '@/lib/site-data';

const homeLinks = [
  { href: '/#skills', label: '기술' },
  { href: '/#careers', label: '경력' },
  { href: '/#projects', label: '프로젝트' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === '/';

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[color:color-mix(in_oklab,var(--background)_82%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <Link href="/" className="flex min-w-0">
            <p className="min-w-0 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted-foreground)] line-clamp-2 md:line-clamp-none">
              {profile.role}
            </p>
          </Link>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {homeLinks.map((link) => (
            <Button key={link.href} asChild variant="ghost" size="sm">
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
          {!onHome ? (
            <Button asChild variant="ghost" size="sm">
              <Link href="/projects">프로젝트 목록</Link>
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
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-[10px] border border-[var(--border)] bg-[var(--card)] px-4 py-3.5 text-base font-medium"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                  <a
                    href="/projects"
                    className="rounded-[10px] border border-[var(--border)] bg-[var(--card)] px-4 py-3.5 text-base font-medium"
                  >
                    전체 프로젝트
                  </a>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

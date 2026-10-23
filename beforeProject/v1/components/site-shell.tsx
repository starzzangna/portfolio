'use client';

import { usePathname } from 'next/navigation';

import { BackToTopButton } from '@/components/back-to-top-button';
import { SiteBreadcrumb } from '@/components/site-breadcrumb';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { isInternalToolPath } from '@/lib/app-path';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (isInternalToolPath(pathname)) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <>
      <SiteHeader />
      <SiteBreadcrumb />
      <main>{children}</main>
      <SiteFooter />
      <BackToTopButton />
    </>
  );
}

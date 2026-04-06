import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Code2, PanelsTopLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: '프로젝트',
  description:
    'FE와 퍼블리싱 프로젝트를 구분해서 확인할 수 있는 프로젝트 진입 페이지입니다.',
};

const projectEntries = [
  {
    href: '/projects/fe',
    eyebrow: '프론트엔드',
    title: 'FE 프로젝트',
    description:
      '실무 중심의 프론트엔드 개발 내역과 서비스 개선 프로젝트를 확인할 수 있습니다.',
    icon: Code2,
  },
  {
    href: '/projects/publish',
    eyebrow: '퍼블리싱',
    title: '퍼블리싱 프로젝트',
    description:
      '구축형 웹사이트, 운영 퍼블리싱, 반응형 및 접근성 대응 프로젝트를 분리해서 볼 수 있습니다.',
    icon: PanelsTopLeft,
  },
];

export default function ProjectsPage() {
  return (
    <section className="section-shell py-12 sm:py-16">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)] sm:text-sm sm:tracking-[0.28em]">
          프로젝트
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight leading-[125%] sm:mt-4 sm:text-4xl">
          보고 싶은 프로젝트 유형을 선택해 주세요
        </h1>
        <p className="mt-3 max-w-2xl text-[14px] leading-6 text-[var(--muted-foreground)] sm:mt-4 sm:text-lg sm:leading-7">
          프론트엔드 개발 내역과 퍼블리싱 구축 이력을 분리해 더 빠르게 탐색할 수
          있도록 구성했습니다.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projectEntries.map((entry) => {
          const Icon = entry.icon;

          return (
            <Card key={entry.href} className="h-full">
              <CardContent className="flex h-full flex-col gap-5 p-5 sm:gap-6 sm:p-7">
                <div className="flex size-11 items-center justify-center rounded-[10px] bg-[color:color-mix(in_oklab,var(--accent)_14%,white)] text-[var(--accent)] sm:size-14">
                  <Icon className="size-5 sm:size-7" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] sm:text-sm sm:tracking-[0.24em]">
                    {entry.eyebrow}
                  </p>
                  <h2 className="mt-3 text-xl font-semibold sm:mt-4 sm:text-2xl">{entry.title}</h2>
                  <p className="mt-3 text-[13px] leading-6 text-[var(--muted-foreground)] sm:mt-4 sm:text-base sm:leading-7">
                    {entry.description}
                  </p>
                </div>
                <div className="mt-auto flex justify-end">
                  <Button
                    asChild
                    size="sm"
                    className="border-[var(--cta-border)] bg-[var(--cta-bg)] !text-white hover:border-[var(--cta-hover-border)] hover:bg-[var(--cta-hover-bg)] hover:!text-white sm:px-5 sm:py-3 sm:text-sm"
                  >
                    <Link href={entry.href}>
                      들어가기
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

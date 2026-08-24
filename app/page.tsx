import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { CareerList } from '@/components/career-list';
import { DocumentLink } from '@/components/document-link';
import { ProjectTabs } from '@/components/project-tabs';
import { SectionHeading } from '@/components/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { withBasePath } from '@/lib/app-path';
import {
  careers,
  getFeaturedProjects,
  profile,
  skillGroups,
  strengthIcons,
  strengths,
} from '@/lib/site-data';
import type { FeProjectItem, PublishProjectItem } from '@/lib/types';

export default async function HomePage() {
  const [feProjects, publishProjects] = await Promise.all([
    getFeaturedProjects('fe', 6) as Promise<FeProjectItem[]>,
    getFeaturedProjects('publish', 8) as Promise<PublishProjectItem[]>,
  ]);

  return (
    <div className="pb-24">
      <section
        id="profile"
        className="section-shell scroll-mt-18 py-5 sm:scroll-mt-20 sm:py-10"
      >
        <div>
          <article className="order-2 glass-panel overflow-hidden rounded-[10px] lg:rounded-[2.5rem] border border-[var(--border)] p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] sm:p-10 lg:order-1">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--accent)]">
              Frontend Developer
            </p>
            <h1 className="mt-4 text-2xl font-semibold leading-tight tracking-tight sm:mt-5 lg:text-3xl">
              반복되는 화면 제작을, 운영 가능한 시스템으로 바꿉니다.
            </h1>
            <p className="mt-5 text-sm leading-7 text-[var(--muted-foreground)] sm:mt-6 sm:text-lg sm:leading-8">
              {profile.intro}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-end">
              <Button
                asChild
                className="border-[var(--cta-border)] bg-[var(--cta-bg)] !text-white shadow-[0_16px_32px_var(--cta-shadow)] hover:border-[var(--cta-hover-border)] hover:bg-[var(--cta-hover-bg)] hover:!text-white"
              >
                <DocumentLink href="/projects">
                  프로젝트 보기
                  <ArrowRight className="size-4" />
                </DocumentLink>
              </Button>
            </div>
          </article>
        </div>
      </section>

      <section
        id="strengths"
        className="section-shell scroll-mt-18 py-5 sm:scroll-mt-20 sm:py-10"
      >
        <SectionHeading
          eyebrow="일하는 방식"
          title="구조화하고, 자동화하고, 협업하며 완성합니다."
          description="요구사항을 코드와 운영 흐름으로 구체화하고, 초기 구현부터 이후의 변경과 운영까지 고려해 제품을 완성합니다."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {strengths.map((strength) => {
            const Icon = strengthIcons[strength.icon];

            return (
              <Card key={strength.title} className="glass-panel h-full">
                <CardContent className="flex h-full flex-col p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--accent)_16%,white)] text-[var(--accent)]">
                      <Icon className="size-[18px]" />
                    </div>
                    <h3 className="text-lg font-semibold">{strength.title}</h3>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-[var(--muted-foreground)]">
                    {strength.description}
                  </p>
                  <DocumentLink
                    href={strength.evidence.href}
                    className="mt-auto inline-flex items-center justify-end gap-1.5 self-end pt-5 text-right text-xs font-semibold text-[var(--accent)] hover:underline"
                  >
                    <span>
                      {strength.evidence.label}
                    </span>
                    <ArrowUpRight className="size-3.5 shrink-0" />
                  </DocumentLink>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section
        id="projects"
        className="section-shell scroll-mt-18 py-5 sm:scroll-mt-20 sm:py-10"
      >
        <SectionHeading
          eyebrow="프로젝트"
          title="주요 프론트엔드 작업과 구축형 퍼블리싱 이력"
          description="자동화, 운영 개선, 공통 컴포넌트 정리처럼 최근 FE 프로젝트와 다수의 구축 경험을 한 흐름으로 살펴볼 수 있습니다."
        />
        <div className="mt-10">
          <ProjectTabs
            feProjects={feProjects}
            publishProjects={publishProjects}
          />
        </div>
      </section>

      <section
        id="careers"
        className="section-shell scroll-mt-18 py-5 sm:scroll-mt-20 sm:py-10"
      >
        <SectionHeading
          eyebrow="경력"
          title="구축 프로젝트부터 실서비스 운영까지 폭넓게 경험했습니다."
          description="다양한 산업군의 웹사이트 구축 경험 위에, 최근에는 운영 서비스의 프론트엔드 개선과 자동화 중심 업무를 확장해 왔습니다."
        />
        <div className="mt-10">
          <CareerList items={careers} />
        </div>
      </section>

      <section
        id="skills"
        className="section-shell scroll-mt-18 py-5 sm:scroll-mt-20 sm:py-10"
      >
        <SectionHeading
          eyebrow="기술 스택"
          title="운영 환경에 맞는 기술 조합으로 빠르게 구현합니다."
          description="React, Next.js, TypeScript를 중심으로 퍼블리싱부터 백엔드 API 연동, AI 도구 활용까지 유지보수 가능한 화면을 구축합니다."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group) => (
            <Card key={group.category} className="glass-panel">
              <CardContent className="space-y-5 p-7">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                    {group.category}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

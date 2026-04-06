import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { CareerList } from '@/components/career-list';
import { ProjectTabs } from '@/components/project-tabs';
import { SectionHeading } from '@/components/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
    getFeaturedProjects('fe', 4) as Promise<FeProjectItem[]>,
    getFeaturedProjects('publish', 4) as Promise<PublishProjectItem[]>,
  ]);

  return (
    <div className="pb-24">
      <section id="profile" className="section-shell scroll-mt-18 py-10 sm:scroll-mt-20 sm:py-20">
        <div className="grid items-stretch gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div className="order-1 flex justify-center lg:hidden">
            <div className="relative size-28 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
              <Image
                src={profile.image}
                alt={`${profile.name} 프로필 이미지`}
                fill
                className="object-cover object-top"
                priority
                sizes="112px"
              />
            </div>
          </div>
          <article className="order-2 glass-panel overflow-hidden rounded-[10px] lg:rounded-[2.5rem] border border-[var(--border)] p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] sm:p-10 lg:order-1">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--accent)]">
              Frontend Developer / Publisher
            </p>
            <h1 className="mt-4 text-2xl font-semibold leading-tight tracking-tight sm:mt-5 lg:text-3xl">
              사용자 경험과 운영 효율을 함께 설계하는 프론트엔드 개발자
            </h1>
            <p className="mt-5 text-sm leading-7 text-[var(--muted-foreground)] sm:mt-6 sm:text-lg sm:leading-8">
              {profile.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Badge className="bg-[color:color-mix(in_oklab,var(--surface)_86%,white)] text-[var(--foreground)]">
                {profile.name}
              </Badge>
              <Badge>{profile.location}</Badge>
              <Badge className="break-all">{profile.email}</Badge>
            </div>
            <div className="mt-10 flex flex-wrap gap-3 justify-end">
              <Button
                asChild
                className="border-[var(--cta-border)] bg-[var(--cta-bg)] !text-white shadow-[0_16px_32px_var(--cta-shadow)] hover:border-[var(--cta-hover-border)] hover:bg-[var(--cta-hover-bg)] hover:!text-white"
              >
                <Link href="/projects">
                  프로젝트 보기
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </article>
          <article className="order-1 relative hidden overflow-hidden rounded-[10px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_30px_80px_rgba(15,23,42,0.08)] lg:order-2 lg:block lg:h-full lg:rounded-[2.5rem]">
            <div className="relative aspect-video overflow-hidden rounded-[10px] lg:h-full lg:rounded-[2.5rem] lg:aspect-auto sm:aspect-[4/5]">
              <Image
                src={profile.image}
                alt={`${profile.name} 프로필 이미지`}
                fill
                className="object-contain lg:object-cover object-top"
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </article>
        </div>
      </section>

      <section id="strengths" className="section-shell scroll-mt-18 py-10 sm:scroll-mt-20 sm:py-20">
        <SectionHeading
          eyebrow="핵심 강점"
          title="퍼블리싱 경험을 바탕으로 실무형 프론트엔드를 만듭니다."
          description="화면 구현에 그치지 않고 공통화, 자동화, 협업 구조까지 함께 설계해 서비스 완성도를 끌어올립니다."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {strengths.map((strength) => {
            const Icon = strengthIcons[strength.icon];

            return (
                <Card key={strength.title} className="glass-panel">
                  <CardContent className="space-y-5 p-7">
                  <div className="flex items-center gap-3 sm:block">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--accent)_16%,white)] text-[var(--accent)] sm:size-14 sm:rounded-2xl">
                      <Icon className="size-[18px] sm:size-7" />
                    </div>
                    <h3 className="text-lg font-semibold sm:mt-5 sm:text-xl">
                      {strength.title}
                    </h3>
                  </div>
                  <div>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                      {strength.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="skills" className="section-shell scroll-mt-18 py-10 sm:scroll-mt-20 sm:py-20">
        <SectionHeading
          eyebrow="기술 스택"
          title="운영 환경에 맞는 기술 조합으로 빠르게 구현합니다."
          description="React, Next.js, TypeScript를 중심으로 퍼블리싱 역량과 자동화 경험을 결합해 유지보수 가능한 화면을 구축합니다."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
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

      <section id="careers" className="section-shell scroll-mt-18 py-10 sm:scroll-mt-20 sm:py-20">
        <SectionHeading
          eyebrow="경력"
          title="구축 프로젝트부터 실서비스 운영까지 폭넓게 경험했습니다."
          description="다양한 산업군의 웹사이트 구축 경험 위에, 최근에는 운영 서비스의 프론트엔드 개선과 자동화 중심 업무를 확장해 왔습니다."
        />
        <div className="mt-10">
          <CareerList items={careers} />
        </div>
      </section>

      <section id="projects" className="section-shell scroll-mt-18 py-10 sm:scroll-mt-20 sm:py-20">
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
    </div>
  );
}

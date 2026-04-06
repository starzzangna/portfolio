import type { Metadata } from 'next';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Lightbulb,
} from 'lucide-react';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getProjectDetail, getProjectsByType } from '@/lib/site-data';
import type { ProjectType } from '@/lib/types';

function highlightOutcomeText(text: string) {
  const parts = text.split(
    /(\d+(?:\.\d+)?%|\d+(?:\.\d+)?초|\d+(?:\.\d+)?줄|\d+(?:\.\d+)?개|\d+(?:\.\d+)?시간|\d+(?:\.\d+)?건|\d+(?:\.\d+)?회)/g,
  );

  return parts.map((part, index) => {
    const isHighlight =
      /^(?:\d+(?:\.\d+)?%|\d+(?:\.\d+)?초|\d+(?:\.\d+)?줄|\d+(?:\.\d+)?개|\d+(?:\.\d+)?시간|\d+(?:\.\d+)?건|\d+(?:\.\d+)?회)$/.test(
        part,
      );

    return isHighlight ? (
      <span
        key={`${part}-${index}`}
        className="font-semibold text-[var(--accent)]"
      >
        {part}
      </span>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    );
  });
}

function isProjectType(value: string): value is ProjectType {
  return value === 'fe' || value === 'publish';
}

export async function generateStaticParams() {
  const types: ProjectType[] = ['fe', 'publish'];
  const params: { type: string; slug: string }[] = [];

  for (const type of types) {
    const projects = await getProjectsByType(type);
    for (const project of projects) {
      params.push({ type, slug: project.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}): Promise<Metadata> {
  const { type, slug } = await params;

  if (!isProjectType(type)) {
    return {};
  }

  const project = await getProjectDetail(type, slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | ${project.company}`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}) {
  const { type, slug } = await params;

  if (!isProjectType(type)) {
    notFound();
  }

  const project = await getProjectDetail(type, slug);

  if (!project) {
    notFound();
  }

  const troubleItems =
    project.type === 'fe'
      ? project.troubleshooting.filter(
          (item) => item.problem.trim() && item.solution.trim(),
        )
      : [
          {
            problem:
              '구축형 프로젝트 특성상 다양한 화면 규칙과 브라우저 대응이 동시에 필요했습니다.',
            solution:
              '공통 마크업 패턴과 스타일 기준을 유지하면서 프로젝트별 변형 포인트를 분리해 대응했습니다.',
          },
        ];

  return (
    <section className="section-shell py-12 sm:py-16">
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Badge className="bg-[color:color-mix(in_oklab,var(--surface)_88%,white)] text-[var(--foreground)]">
          {project.company}
        </Badge>
        <Badge>{project.period}</Badge>
        {project.type === 'fe' ? <Badge>{project.teamSize}</Badge> : null}
        {project.type === 'publish' ? (
          <Badge>기여도 {project.contribution}</Badge>
        ) : null}
      </div>

      <article className="space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)] sm:text-sm sm:tracking-[0.28em]">
            [{project.company}]
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight leading-[125%] sm:mt-4 sm:text-4xl sm:leading-[120%]">
            {project.title}
          </h1>
          <p className="mt-3 text-[13px] leading-6 text-[var(--muted-foreground)] sm:mt-4 sm:text-base sm:leading-7">
            {project.summary}
          </p>
        </div>

        <div className="rounded-[10px] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-[var(--muted-foreground)] sm:text-sm">
                개발 기간
              </p>
              <p className="mt-2 text-sm sm:text-base">{project.period}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--muted-foreground)] sm:text-sm">
                투입 인원
              </p>
              <p className="mt-2 text-sm sm:text-base">
                {project.type === 'fe'
                  ? project.teamSize
                  : project.contribution}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[10px] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
          <h2 className="text-xl font-semibold sm:text-2xl">프로젝트 내용</h2>
          <div className="mt-5 space-y-4 border-t border-[var(--border)] pt-5">
            {project.type === 'fe' ? (
              project.body.map((item) => (
                <p
                  key={item}
                  className="text-[13px] leading-6 text-[var(--muted-foreground)] sm:text-sm sm:leading-7"
                >
                  {item}
                </p>
              ))
            ) : (
              <>
                <p className="text-[13px] leading-6 text-[var(--muted-foreground)] sm:text-sm sm:leading-7">
                  {project.summary}
                </p>
                <p className="text-[13px] leading-6 text-[var(--muted-foreground)] sm:text-sm sm:leading-7">
                  사용 기술: {project.skills.join(', ')}
                </p>
              </>
            )}
          </div>
        </div>

        {troubleItems.length ? (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm sm:p-7">
            <h2 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:gap-3 sm:text-3xl">
              <AlertTriangle className="size-6 text-[var(--accent)] sm:size-8" />
              트러블 슈팅
            </h2>

            <div className="mt-6 space-y-6 border-t border-[var(--border)] pt-6 sm:mt-8 sm:space-y-8 sm:pt-8">
              {troubleItems.map((item, index) => (
                <article
                  key={`${item.problem}-${index}`}
                  className="relative grid items-start gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-6"
                >
                  <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 shadow-inner sm:p-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[color:color-mix(in_oklab,var(--accent)_10%,transparent)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--accent-strong)] sm:px-3.5 sm:py-1.5 sm:text-xs">
                      <AlertTriangle className="size-3.5 sm:size-4" />
                      문제
                    </div>
                    <p className="mt-3 text-[14px] font-medium leading-7 text-[var(--foreground)] sm:mt-4 sm:text-[15px] sm:leading-8">
                      {item.problem}
                    </p>
                  </div>

                  <div className="hidden h-full items-center justify-center pt-10 md:flex">
                    <ArrowRight className="size-8 text-[var(--border)]" />
                  </div>

                  <div className="flex justify-center md:hidden">
                    <div className="h-8 w-0.5 bg-[var(--border)]" />
                  </div>

                  <div className="rounded-lg border border-[var(--accent)] bg-[color:color-mix(in_oklab,var(--accent)_5%,var(--card))] p-4 shadow-[0_4px_12px_rgba(184,87,44,0.08)] dark:shadow-[0_4px_12px_rgba(245,158,11,0.15)] sm:p-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white sm:px-3.5 sm:py-1.5 sm:text-xs">
                      <Lightbulb className="size-3.5 sm:size-4" />
                      해결
                    </div>
                    <p className="mt-3 text-[14px] font-medium leading-7 text-[var(--foreground)] sm:mt-4 sm:text-[15px] sm:leading-8">
                      {item.solution}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm sm:p-7">
          <h2 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:gap-3 sm:text-3xl">
            <CheckCircle2 className="size-6 text-emerald-500 sm:size-8" />
            성과
          </h2>

          <ul className="mt-6 grid gap-3 border-t border-[var(--border)] pt-6 sm:mt-8 sm:gap-4 sm:pt-8 sm:grid-cols-2 lg:grid-cols-3">
            {(project.type === 'fe'
              ? project.outcomes
              : [
                  '다양한 구축형 프로젝트 경험 축적',
                  '반응형/접근성 대응 역량 강화',
                ]
            ).map((item) => (
              <li
                key={item}
                className="group flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-md sm:gap-4 sm:p-5"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--accent)] transition-colors group-hover:text-[var(--accent-strong)] sm:size-6" />
                <span className="text-[14px] font-medium leading-6 text-[var(--foreground)] sm:text-[15px] sm:leading-7">
                  {highlightOutcomeText(item)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[10px] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
          <h2 className="text-xl font-semibold sm:text-2xl">사용 기술</h2>
          <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--border)] pt-5">
            {project.skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-3">
          <Button
            asChild
            variant="outline"
            className="bg-[var(--soft-button-bg)] text-[var(--foreground)] hover:bg-[var(--soft-button-hover-bg)]"
          >
            <Link href={`/projects/${project.type}`}>목록으로</Link>
          </Button>
          {project.type === 'publish' && project.externalUrl ? (
            <Button
              asChild
              className="border-[var(--cta-border)] bg-[var(--cta-bg)] !text-white hover:border-[var(--cta-hover-border)] hover:bg-[var(--cta-hover-bg)] hover:!text-white"
            >
              <Link href={project.externalUrl} target="_blank">
                원본 사이트 보기
                <ExternalLink className="size-4" />
              </Link>
            </Button>
          ) : null}
        </div>
      </article>
    </section>
  );
}

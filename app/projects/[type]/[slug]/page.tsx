import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';
import { notFound } from 'next/navigation';

import { DocumentLink } from '@/components/document-link';
import { ProjectDetailGallery } from '@/components/project-detail-gallery';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getProjectDetail, getProjectsByType } from '@/lib/site-data';
import type { ProjectType } from '@/lib/types';

function highlightOutcomeText(text: string) {
  const parts = text.split(/(\d+(?:\.\d+)?%|\d+(?:\.\d+)?초|\d+(?:\.\d+)?줄|\d+(?:\.\d+)?개|\d+(?:\.\d+)?시간|\d+(?:\.\d+)?건|\d+(?:\.\d+)?회)/g);
  return parts.map((part, index) => {
    const isHighlight = /^(?:\d+(?:\.\d+)?%|\d+(?:\.\d+)?초|\d+(?:\.\d+)?줄|\d+(?:\.\d+)?개|\d+(?:\.\d+)?시간|\d+(?:\.\d+)?건|\d+(?:\.\d+)?회)$/.test(part);
    return isHighlight ? (
      <span key={index} className="font-semibold text-[var(--accent)]">{part}</span>
    ) : <span key={index}>{part}</span>;
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
                담당 역할 · 협업
              </p>
              <p className="mt-2 text-sm sm:text-base">
                {project.type === 'fe'
                  ? project.teamSize
                  : project.contribution}
              </p>
            </div>
          </div>
        </div>

        {project.type === 'fe' && project.detailGallery?.length ? (
          <ProjectDetailGallery
            images={project.detailGallery}
            heading={project.detailGalleryHeading}
            dialogTitle={`${project.title} — 화면 갤러리`}
          />
        ) : null}

        {(project.type === 'fe'
          ? [
              { title: '문제: 추진 배경과 해결 과제', lines: project.caseStudy.problem },
              { title: '기술적 선택: 채택한 방식과 이유', lines: project.caseStudy.choice },
              { title: '구현: 문제 해결 방식', lines: project.caseStudy.implementation },
              { title: '결과와 성과', lines: project.caseStudy.results },
            ]
          : [{ title: '프로젝트 내용', lines: [project.summary] }]
        ).map((section, index) => (
          <section key={section.title} aria-labelledby={`case-section-${index}`} className="rounded-[10px] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-7">
            <h2 id={`case-section-${index}`} className="text-base font-semibold sm:text-lg">{section.title}</h2>
            <div className="mt-5 space-y-4 border-t border-[var(--border)] pt-5">
              {project.type === 'fe' && index === 3 ? (
                <h3 className="text-sm font-semibold">구현 결과</h3>
              ) : null}
              {section.lines.map((line, lineIndex) => (
                project.type === 'fe' && index === 1 ? (
                  <dl key={line} className="space-y-3 rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 text-[13px] leading-7 sm:p-5 sm:text-sm">
                    <div>
                      <dt className="font-semibold text-[var(--foreground)]">선택한 방식</dt>
                      <dd className="mt-1 text-[var(--muted-foreground)]">{line}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-[var(--foreground)]">선택 이유</dt>
                      <dd className="mt-1 text-[var(--muted-foreground)]">{project.caseStudy.choiceReasons[lineIndex]}</dd>
                    </div>
                  </dl>
                ) : (
                  <p key={line} className="text-[13px] leading-7 text-[var(--muted-foreground)] sm:text-sm">
                    {highlightOutcomeText(line)}
                  </p>
                )
              ))}
              {project.type === 'fe' && index === 2 && project.troubleshooting.length > 0 ? (
                <div className="space-y-5 border-t border-[var(--border)] pt-6">
                  <h3 className="text-base font-semibold">기술적 문제와 해결</h3>
                  {project.troubleshooting.map((item, caseIndex) => (
                    <article key={item.problem} className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5">
                      <p className="mb-4 text-xs font-semibold text-[var(--accent)]">사례 {caseIndex + 1}</p>
                      <dl className="space-y-4 text-[13px] leading-7 sm:text-sm">
                        <div>
                          <dt className="font-semibold text-[var(--foreground)]">문제 상황</dt>
                          <dd className="mt-1 text-[var(--muted-foreground)]">{item.problem}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-[var(--foreground)]">해결 방식</dt>
                          <dd className="mt-1 text-[var(--muted-foreground)]">{highlightOutcomeText(item.solution)}</dd>
                        </div>
                      </dl>
                    </article>
                  ))}
                </div>
              ) : null}
              {project.type === 'fe' && index === 3 ? (
                [
                  { title: '성과 · 개선 효과', lines: project.caseStudy.effects },
                  { title: '배운 점', lines: project.caseStudy.learning },
                ].filter(group => group.lines.length > 0).map(group => (
                  <div key={group.title} className="space-y-3 border-t border-[var(--border)] pt-5">
                    <h3 className="text-sm font-semibold">{group.title}</h3>
                    {group.lines.map(line => (
                      <p key={line} className="text-[13px] leading-7 text-[var(--muted-foreground)] sm:text-sm">{highlightOutcomeText(line)}</p>
                    ))}
                  </div>
                ))
              ) : null}
            </div>
          </section>
        ))}

        <div className="rounded-[10px] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
          <h2 className="text-xl font-semibold sm:text-2xl">사용 기술</h2>
          <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--border)] pt-5">
            {project.skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </div>

        {project.type === 'fe' && project.note ? (
          <p className="text-[13px] leading-6 text-[var(--muted-foreground)] sm:text-sm sm:leading-7">
            * {project.note}
          </p>
        ) : null}

        <div className="flex flex-wrap justify-end gap-3">
          <Button
            asChild
            variant="outline"
            className="bg-[var(--soft-button-bg)] text-[var(--foreground)] hover:bg-[var(--soft-button-hover-bg)]"
          >
            <DocumentLink href={`/projects/${project.type}`}>목록으로</DocumentLink>
          </Button>
          {project.type === 'publish' && project.externalUrl ? (
            <Button
              asChild
              className="border-[var(--cta-border)] bg-[var(--cta-bg)] !text-white hover:border-[var(--cta-hover-border)] hover:bg-[var(--cta-hover-bg)] hover:!text-white"
            >
              <DocumentLink href={project.externalUrl} target="_blank" rel="noopener noreferrer">
                원본 사이트 보기
                <ExternalLink className="size-4" />
              </DocumentLink>
            </Button>
          ) : null}
        </div>
      </article>
    </section>
  );
}

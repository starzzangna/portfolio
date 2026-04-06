import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DocumentLink } from '@/components/document-link';

import { PublishProjectTabs } from '@/components/publish-project-tabs';
import { ProjectCard } from '@/components/project-card';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { getProjectsByType } from '@/lib/site-data';
import type { ProjectType, PublishProjectItem } from '@/lib/types';

const copy = {
  fe: {
    title: 'FE 프로젝트',
    description:
      '서비스 개선과 사용자 경험 고도화에 집중한 프론트엔드 프로젝트 모음입니다.',
  },
  publish: {
    title: '퍼블리싱 프로젝트',
    description:
      '구축형 웹사이트 경험을 All, Basic, Responsive, Accessibility, Mobile 탭으로 나누어 확인할 수 있습니다.',
  },
};

function isProjectType(value: string): value is ProjectType {
  return value === 'fe' || value === 'publish';
}

export function generateStaticParams() {
  return [{ type: 'fe' }, { type: 'publish' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;

  if (!isProjectType(type)) {
    return {};
  }

  return {
    title: copy[type].title,
    description: copy[type].description,
  };
}

export default async function ProjectTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;

  if (!isProjectType(type)) {
    notFound();
  }

  const projects = await getProjectsByType(type);

  return (
    <section className="section-shell py-12 sm:py-16">
      <SectionHeading
        eyebrow={type === 'fe' ? '프론트엔드' : '퍼블리싱'}
        title={copy[type].title}
        description={copy[type].description}
      />
      <div className="mt-8 flex flex-wrap gap-3 justify-end">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="bg-[var(--soft-button-bg)] text-[var(--foreground)] hover:bg-[var(--soft-button-hover-bg)]"
        >
          <DocumentLink href="/projects">프로젝트 목록으로</DocumentLink>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="bg-[var(--soft-button-bg)] text-[var(--foreground)] hover:bg-[var(--soft-button-hover-bg)]"
        >
          <DocumentLink href="/">메인으로</DocumentLink>
        </Button>
      </div>

      {type === 'publish' ? (
        <div className="mt-10">
          {projects.length ? (
            <PublishProjectTabs projects={projects as PublishProjectItem[]} />
          ) : (
            <div className="rounded-[10px] border border-dashed border-[var(--border)] p-8 text-sm text-[var(--muted-foreground)]">
              현재 퍼블리싱 데이터가 준비되지 않았습니다. Google Sheet 응답을
              확인한 뒤 다시 시도해 주세요.
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { withBasePath } from '@/lib/app-path';
import type { ProjectItem } from '@/lib/types';

export function ProjectCard({
  project,
  publishImageMode = 'fixed',
  publishPriority = false,
}: {
  project: ProjectItem;
  publishImageMode?: 'fixed' | 'natural';
  publishPriority?: boolean;
}) {
  const imageKey = `${project.image}-${publishImageMode}`;
  const [loadedImageKey, setLoadedImageKey] = useState<string | null>(null);
  const [shouldLoadImage, setShouldLoadImage] = useState(
    project.type !== 'publish' || publishPriority,
  );
  const naturalImageWrapperRef = useRef<HTMLDivElement | null>(null);
  const detailHref = `/projects/${project.type}/${project.slug}`;
  const hasImage = project.type === 'publish';
  const useNaturalPublishImage =
    project.type === 'publish' && publishImageMode === 'natural';
  const isPublishNaturalCard = useNaturalPublishImage;
  const imageLoaded = loadedImageKey === imageKey;

  useEffect(() => {
    if (project.type !== 'publish' || publishPriority || shouldLoadImage) {
      return;
    }

    const node = naturalImageWrapperRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadImage(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '240px 0px' },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [project.type, publishPriority, shouldLoadImage]);

  return (
    <Card
      className={`glass-panel group overflow-hidden border-none outline-none ${
        isPublishNaturalCard ? '' : 'flex h-full flex-col'
      }`}
    >
      {hasImage ? (
        useNaturalPublishImage ? (
          <div
            ref={naturalImageWrapperRef}
            className="relative min-h-35 overflow-hidden bg-[var(--surface)]"
          >
            {!imageLoaded && (
              <>
                <div className="absolute inset-0 animate-pulse bg-[color:color-mix(in_oklab,var(--surface)_80%,white)]" />
                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                  <span className="rounded-full bg-[color:color-mix(in_oklab,var(--card)_88%,white)] px-3 py-1 text-xs font-medium text-[var(--muted-foreground)] shadow-sm">
                    이미지 불러오는 중
                  </span>
                </div>
              </>
            )}
            {shouldLoadImage ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={imageKey}
                  src={withBasePath(project.image)}
                  alt={project.title}
                  loading={publishPriority ? 'eager' : 'lazy'}
                  fetchPriority={publishPriority ? 'high' : 'auto'}
                  onLoad={() => setLoadedImageKey(imageKey)}
                  onError={() => setLoadedImageKey(imageKey)}
                  className={`block h-auto w-full transition-[opacity,transform] duration-500 group-hover:scale-[1.02] ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  ref={(node) => {
                    if (node?.complete) {
                      setLoadedImageKey(imageKey);
                    }
                  }}
                />
              </>
            ) : null}
          </div>
        ) : (
          <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface)]">
            {!imageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-[color:color-mix(in_oklab,var(--surface)_80%,white)]" />
            )}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--background)]/20 to-transparent" />
            <Image
              key={imageKey}
              src={withBasePath(project.image)}
              alt={project.title}
              fill
              quality={100}
              onLoad={() => setLoadedImageKey(imageKey)}
              onError={() => setLoadedImageKey(imageKey)}
              className={`object-cover object-top transition-[opacity,transform] duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )
      ) : (
        <div className="h-1.5 w-full bg-[var(--accent)] opacity-70" />
      )}

      <CardContent
        className={`p-6 ${isPublishNaturalCard ? '' : 'flex flex-1 flex-col'}`}
      >
        {/* 상단 메타 정보: 배지와 기간 분리 강조 */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-2">
            {project.type === 'publish' ? (
              <span className="min-h-6 pt-1 text-xs font-semibold tracking-[0.18em] text-[var(--accent)]">
                기여도 {project.contribution}
              </span>
            ) : (
              <Badge className="w-fit border-none bg-[var(--surface)] font-medium text-[var(--foreground)] shadow-sm">
                {project.company}
              </Badge>
            )}
          </div>
          <span className="min-w-[98px] shrink-0 pt-1 text-right text-[11px] font-medium uppercase tracking-wider text-[var(--muted-foreground)] opacity-80">
            {project.period}
          </span>
        </div>

        {/* 제목 및 설명 */}
        <div className="mb-5 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
              {project.title}
            </h3>
            {project.type === 'publish' && project.externalUrl && (
              <Link
                href={project.externalUrl}
                target="_blank"
                className="mt-1 inline-flex p-1 rounded-full hover:bg-[var(--accent)]/10 text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-all"
              >
                <ExternalLink className="size-4" />
              </Link>
            )}
          </div>
          <p className="line-clamp-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
            {project.summary}
          </p>
        </div>

        {/* 기술 스택: 구분선 추가 및 정렬 */}
        <div
          className={`border-t border-[var(--border)] pt-5 ${
            isPublishNaturalCard ? '' : 'mt-auto'
          }`}
        >
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.skills.slice(0, 4).map((skill) => (
              <Badge
                key={skill}
                className="text-[10px] py-0 px-2 bg-transparent border-[var(--border)] text-[var(--muted-foreground)]"
              >
                {skill}
              </Badge>
            ))}
          </div>

          {/* 하단 액션 */}
          {project.type === 'fe' ? (
            <div className="flex items-center justify-end">
              <Button
                asChild
                size="sm"
                className="rounded-full border-[var(--cta-border)] bg-[var(--cta-bg)] px-5 font-medium !text-white shadow-lg shadow-[var(--cta-shadow)] transition-all hover:translate-y-[-1px] hover:bg-[var(--cta-hover-bg)]"
              >
                <Link href={detailHref} className="flex items-center gap-1.5">
                  View Detail
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

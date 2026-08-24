'use client';

import {
  ArrowUpRight,
  Briefcase,
  ChevronDown,
  Trophy,
  Zap,
} from 'lucide-react';

import { DocumentLink } from '@/components/document-link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { CareerDetailGroup, CareerItem } from '@/lib/types';

type TroublePair = {
  problem?: string;
  solution?: string;
};

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
      <span key={`${part}-${index}`} className="font-semibold text-[var(--accent)]">
        {part}
      </span>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    );
  });
}

function isPeriodLine(value: string) {
  return /^\d{4}\.\d{2}\s-\s(?:\d{4}\.\d{2}|Present)$/i.test(value);
}

function stripPrefix(value: string, prefix: string) {
  return value.replace(new RegExp(`^${prefix}\\d*\\s*:?\\s*`), '').trim();
}

function parseProjectGroup(group: CareerDetailGroup) {
  const details = [...group.items];
  const period =
    details.length && isPeriodLine(details[0]) ? details.shift() : null;
  const summary: string[] = [];
  const outcomes: string[] = [];
  const troubles: TroublePair[] = [];
  let currentTrouble: TroublePair | null = null;

  details.forEach((entry) => {
    if (entry.startsWith('이슈')) {
      if (currentTrouble) {
        troubles.push(currentTrouble);
      }

      currentTrouble = { problem: stripPrefix(entry, '이슈') };
      return;
    }

    if (entry.startsWith('해결')) {
      if (!currentTrouble) {
        currentTrouble = {};
      }

      currentTrouble.solution = stripPrefix(entry, '해결');
      return;
    }

    if (entry.startsWith('성과')) {
      if (currentTrouble) {
        troubles.push(currentTrouble);
        currentTrouble = null;
      }

      outcomes.push(stripPrefix(entry, '성과'));
      return;
    }

    if (currentTrouble?.problem && !currentTrouble.solution) {
      currentTrouble.problem = `${currentTrouble.problem} ${entry}`.trim();
      return;
    }

    summary.push(entry);
  });

  if (currentTrouble) {
    troubles.push(currentTrouble);
  }

  return { period, summary, outcomes, troubles };
}

function isServiceGroup(group: CareerDetailGroup) {
  return group.title === '구축 서비스';
}

function slugifyTitle(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const feProjectLinkMap: Record<string, string> = {
  [slugifyTitle(
    '프로모션 템플릿·배포 관리자 — 멀티브랜드 정적 UI·QA 운영',
  )]: '/projects/fe/promotion-deployment-platform',
  [slugifyTitle(
    '멀티브랜드 프로모션 프론트 통합 — v0 · SEO 시트 · slug 라우팅',
  )]: '/projects/fe/marketing-v0-seo-routing',
  [slugifyTitle('AI Builder — 내부 프로모션 페이지 빌더 설계·구현')]:
    '/projects/fe/ai-builder',
  [slugifyTitle('TideBuilder — Figma to Email HTML 제작 자동화')]:
    '/projects/fe/figma-email-builder',
  [slugifyTitle('패키지 맞춤여행 견적 문의 게시판')]:
    '/projects/fe/package-estimate-board',
  [slugifyTitle('투어비스 USJ AI 챗봇 UI')]:
    '/projects/fe/usj-ai-chatbot-ui',
  [slugifyTitle('마케팅 Vercel 앱 프록시 연동 및 AI 기반 SEO 강화')]:
    '/projects/fe/marketing-proxy-seo',
  [slugifyTitle(
    '투어비스 고객센터 (Zendesk Guide) — API 연동 및 챗봇/셀프서비스 고도화',
  )]: '/projects/fe/zendesk-request-integration',
  [slugifyTitle('다음 쇼핑 제휴 랜딩 — CMS 템플릿 섹션 시스템')]:
    '/projects/fe/daum-page-build',
  [slugifyTitle('투어비스 항공 공통 셸 연동 — GNB · 푸터 · 하단 탭바')]:
    '/projects/fe/air-common-shell-integration',
  [slugifyTitle('airspot 백오피스 리뉴얼 UI/UX 안정화')]:
    '/projects/fe/airspot-backoffice-ui-backup',
  [slugifyTitle(
    '투어비스 마이페이지 리뉴얼 — 내여행 · 쿠폰함 · 이용권',
  )]: '/projects/fe/tourvis-mypage-renewal',
  [slugifyTitle('투어비스 공통 메인 · GNB 리뉴얼')]:
    '/projects/fe/tourvis-common-rerenewal',
  [slugifyTitle('투어비스 호텔 메인 UI 리뉴얼')]:
    '/projects/fe/tourvis-hotel-main-ui',
  [slugifyTitle('투어비스 Publish — Gulp 빌드 환경 도입 및 표준화')]:
    '/projects/fe/publishing-team-gulp-automation',
  [slugifyTitle('공통 UI 디자인 시스템 구축')]:
    '/projects/fe/common-ui-design-system',
};

function resolveProjectHref(title: string) {
  const normalizedTitle = slugifyTitle(title);

  if (feProjectLinkMap[normalizedTitle]) {
    return feProjectLinkMap[normalizedTitle];
  }

  return null;
}

export function CareerList({ items }: { items: CareerItem[] }) {
  return (
    <div className="grid gap-6">
      {items.map((item) => (
        <Collapsible key={`${item.company}-${item.period}`} className="group">
          <Card className="border-[var(--border)] bg-[var(--card)] transition-all hover:shadow-md">
            <CardContent className="p-0">
              <div className="flex flex-col gap-5 p-6 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <Badge className="bg-[color:color-mix(in_oklab,var(--surface)_88%,white)] text-[var(--foreground)]">
                    {item.role}
                  </Badge>
                  <h3 className="mt-4 text-2xl font-bold">{item.company}</h3>
                  <p
                    className={`mt-1 text-sm font-medium ${
                      item.period.includes("재직중")
                        ? "text-[var(--accent)]"
                        : "text-[var(--muted-foreground)]"
                    }`}
                  >
                    {item.period}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-[var(--muted-foreground)]">
                    {item.summary}
                  </p>
                  {item.skills?.length ? (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.skills.map((skill) => (
                        <Badge
                          key={skill}
                          className="border-[var(--border)] bg-transparent px-2 py-0 text-[10px] text-[var(--muted-foreground)]"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </div>
                <CollapsibleTrigger className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2 text-sm font-bold transition-all hover:bg-[var(--surface)] md:mx-0">
                  상세 업무 내역
                  <ChevronDown className="size-4 transition-transform group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent>
                <div className="space-y-8 border-t border-[var(--border)] bg-[color:color-mix(in_oklab,var(--background)_40%,transparent)] p-6">
                  {item.responsibilities.length ? (
                    <div className="flex items-center gap-2">
                      <Briefcase className="size-5 text-[var(--accent)]" />
                      <span className="text-sm font-bold uppercase tracking-widest text-[var(--foreground)]">
                        주요 업무
                      </span>
                    </div>
                  ) : null}
                  {item.responsibilities.map((group) => {
                    if (isServiceGroup(group)) {
                      return (
                        <Collapsible
                          key={group.title}
                          className="group/service space-y-4"
                        >
                          <CollapsibleTrigger className="flex w-full items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] px-5 py-4 text-left transition-colors hover:bg-[var(--surface)]">
                            <div className="flex min-w-0 items-center gap-2">
                              <Briefcase className="size-5 shrink-0 text-[var(--accent)]" />
                              <span className="text-sm font-bold uppercase tracking-widest text-[var(--foreground)]">
                                {group.title}
                              </span>
                              <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-[11px] font-semibold text-[var(--muted-foreground)]">
                                {group.items.length}건
                              </span>
                            </div>
                            <ChevronDown className="size-4 shrink-0 text-[var(--muted-foreground)] transition-transform group-data-[state=open]/service:rotate-180" />
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
                              <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                                {group.items.map((entry) => (
                                  <li
                                    key={entry}
                                    className="flex items-start gap-3 leading-7"
                                  >
                                    <span className="mt-2 size-1.5 rounded-full bg-[var(--accent)]" />
                                    <span>{entry}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    }

                    const parsed = parseProjectGroup(group);

                    return (
                      <section key={group.title} className="space-y-4">
                        <div className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
                          {(() => {
                            const projectHref = resolveProjectHref(group.title);

                            return (
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-2">
                              <h4 className="text-lg font-bold leading-7 text-[var(--foreground)]">
                                {group.title}
                              </h4>
                              {projectHref ? (
                                <DocumentLink
                                  href={projectHref}
                                  aria-label={`${group.title} 관련 프로젝트로 이동`}
                                  className="inline-flex size-6 shrink-0 items-center justify-center self-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                >
                                  <ArrowUpRight className="size-3.5" />
                                </DocumentLink>
                              ) : null}
                            </div>
                            {parsed.period ? (
                              <span className="text-sm font-semibold text-[var(--accent)]">
                                {parsed.period}
                              </span>
                            ) : null}
                          </div>
                            );
                          })()}
                          {parsed.summary.length ? (
                            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                              {parsed.summary.map((entry) => (
                                <li key={entry} className="flex gap-3 leading-7">
                                  <span className="mt-2 size-1.5 rounded-full bg-[var(--accent)]" />
                                  <span>{entry}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}

                          {parsed.outcomes.length ? (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Trophy className="size-4 text-[var(--accent)]" />
                                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
                                  성과
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-3">
                                {parsed.outcomes.map((entry) => (
                                  <div
                                    key={entry}
                                    className="flex items-center gap-2 rounded-lg border border-[color:color-mix(in_oklab,var(--accent)_20%,var(--border))] bg-[color:color-mix(in_oklab,var(--accent)_8%,var(--card))] px-4 py-2"
                                  >
                                    <Zap className="size-4 text-[var(--accent)]" />
                                    <span className="text-sm font-medium text-[var(--foreground)]">
                                      {highlightOutcomeText(entry)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </section>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </CardContent>
          </Card>
        </Collapsible>
      ))}
    </div>
  );
}

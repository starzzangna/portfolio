import {
  isServiceGroup,
  parseProjectGroup,
  slugifyTitle,
} from '@/lib/career-parse';
import type { CareerItem } from '@/lib/types';

export type ResumeSnapshot = {
  title: string;
  period: string | null;
  bullets: string[];
  outcome: string | null;
};

export type ResumeSourceItem = ResumeSnapshot & {
  id: string;
  company: string;
  companyPeriod: string;
};

export const UNGROUPED_COMPANY = '직접 추가';

export type ResumeDraftItem = ResumeSnapshot & {
  id: string;
  sourceId: string | null;
  company: string;
  included: boolean;
};

export type ResumeChangeStatus =
  | 'unchanged'
  | 'edited'
  | 'added'
  | 'excluded'
  | 'source-updated';

export const RESUME_CHANGE_LABEL: Record<ResumeChangeStatus, string> = {
  unchanged: '원본',
  edited: '수정됨',
  added: '추가됨',
  excluded: '제외됨',
  'source-updated': '원본 갱신',
};

export function formatResumeTitle(title: string) {
  return title.replace(/\s[—–]\s/g, ' - ');
}

export function snapshotOf(item: ResumeSnapshot): ResumeSnapshot {
  return {
    title: item.title,
    period: item.period,
    bullets: [...item.bullets],
    outcome: item.outcome,
  };
}

export function snapshotsEqual(a: ResumeSnapshot, b: ResumeSnapshot) {
  return (
    a.title === b.title &&
    a.period === b.period &&
    a.outcome === b.outcome &&
    a.bullets.length === b.bullets.length &&
    a.bullets.every((line, index) => line === b.bullets[index])
  );
}

export function buildResumeSourceItems(careers: CareerItem[]): ResumeSourceItem[] {
  return careers.flatMap((career) =>
    career.responsibilities.flatMap((group, index) => {
      if (isServiceGroup(group)) {
        return [];
      }

      const parsed = parseProjectGroup(group);

      return [
        {
          id: `${slugifyTitle(career.company)}:${slugifyTitle(group.title)}:${index}`,
          company: career.company,
          companyPeriod: career.period,
          title: formatResumeTitle(group.title),
          period: parsed.period,
          bullets: parsed.summary,
          outcome: parsed.outcomes[0] ?? null,
        },
      ];
    }),
  );
}

export function formatResumeBlock(item: ResumeSnapshot) {
  const heading = item.period ? `${item.title} (${item.period})` : item.title;
  const lines = [
    heading,
    ...item.bullets.filter((bullet) => bullet.trim()).map((bullet) => `- ${bullet}`),
  ];

  if (item.outcome) {
    lines.push('', `* 성과 : ${item.outcome}`);
  }

  return lines.join('\n');
}

export function formatResumeDocument(items: ResumeDraftItem[]) {
  return items
    .filter((item) => item.included)
    .map(formatResumeBlock)
    .join('\n\n\n');
}

export function resolveDraftCompany(
  draft: Pick<ResumeDraftItem, 'company'> | { company?: string },
  source?: Pick<ResumeSourceItem, 'company'>,
) {
  return draft.company || source?.company || UNGROUPED_COMPANY;
}

export function createDraftFromSource(source: ResumeSourceItem): ResumeDraftItem {
  return {
    id: source.id,
    sourceId: source.id,
    company: source.company,
    included: true,
    ...snapshotOf(source),
  };
}

export function createBlankDraft(company = UNGROUPED_COMPANY): ResumeDraftItem {
  const assignedCompany = company || UNGROUPED_COMPANY;

  return {
    id: `added-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    sourceId: null,
    company: assignedCompany,
    included: true,
    title:
      assignedCompany !== UNGROUPED_COMPANY
        ? `${assignedCompany} 신규 항목`
        : '신규 경력 항목',
    period: null,
    bullets: [''],
    outcome: null,
  };
}

export function getChangeStatus(
  draft: ResumeDraftItem,
  source: ResumeSourceItem | undefined,
  sourceUpdated = false,
): ResumeChangeStatus {
  if (!draft.included) {
    return 'excluded';
  }

  if (!draft.sourceId || !source) {
    return 'added';
  }

  if (sourceUpdated) {
    return 'source-updated';
  }

  if (!snapshotsEqual(draft, source)) {
    return 'edited';
  }

  return 'unchanged';
}

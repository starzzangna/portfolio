import type { ProjectItem } from '@/lib/types';

function periodValue(period: string, boundary: 'start' | 'end') {
  if (boundary === 'end' && /현재|진행|present/i.test(period)) return Infinity;
  const dates = [...period.matchAll(/(\d{4})(?:\.(\d{1,2}))?/g)];
  if (!dates.length) return 0;
  const date = boundary === 'start' ? dates[0] : dates[dates.length - 1];
  return Number(date[1]) * 100 + Number(date[2] ?? (boundary === 'start' ? 1 : 12));
}

/** 시작일, 종료일 순으로 최신 프로젝트를 먼저 배치한다. 날짜가 없으면 마지막에 둔다. */
export function sortProjectsByDate<T extends Pick<ProjectItem, 'title' | 'period'>>(projects: T[]): T[] {
  return [...projects].sort((a, b) => {
    for (const boundary of ['start', 'end'] as const) {
      const first = periodValue(a.period, boundary);
      const second = periodValue(b.period, boundary);
      if (first !== second) return first > second ? -1 : 1;
    }
    return a.title.localeCompare(b.title, 'ko');
  });
}

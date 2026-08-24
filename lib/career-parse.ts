import type { CareerDetailGroup } from '@/lib/types';

export type TroublePair = {
  problem?: string;
  solution?: string;
};

export function isPeriodLine(value: string) {
  return /^\d{4}\.\d{2}\s-\s(?:\d{4}\.\d{2}|Present)$/i.test(value);
}

export function stripPrefix(value: string, prefix: string) {
  return value.replace(new RegExp(`^${prefix}\\d*\\s*:?\\s*`), '').trim();
}

export function parseProjectGroup(group: CareerDetailGroup) {
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

export function isServiceGroup(group: CareerDetailGroup) {
  return group.title === '구축 서비스';
}

export function slugifyTitle(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

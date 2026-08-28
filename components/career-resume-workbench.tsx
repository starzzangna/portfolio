'use client';

import {
  ArrowDown,
  ArrowUp,
  Check,
  Copy,
  Eye,
  EyeOff,
  Plus,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { ThemeToggle } from '@/components/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  createBlankDraft,
  createDraftFromSource,
  formatResumeBlock,
  formatResumeDocument,
  getChangeStatus,
  resolveDraftCompany,
  RESUME_CHANGE_LABEL,
  snapshotOf,
  snapshotsEqual,
  UNGROUPED_COMPANY,
  type ResumeChangeStatus,
  type ResumeDraftItem,
  type ResumeSnapshot,
  type ResumeSourceItem,
} from '@/lib/career-resume';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'portfolio:career-resume-draft:v1';

type StoredDraft = ResumeDraftItem & { base: ResumeSnapshot };

type StoredState = {
  version: 1;
  items: StoredDraft[];
};

type FilterTab = 'all' | 'changed' | 'included';
type IncludeStatus = 'included' | 'partial' | 'excluded';

const ALL_COMPANIES = 'all';

function includeStatusLabel(status: IncludeStatus) {
  if (status === 'included') {
    return '포함';
  }

  if (status === 'partial') {
    return '일부 포함';
  }

  return '제외됨';
}

const STATUS_CLASS: Record<ResumeChangeStatus, string> = {
  unchanged:
    'border-[var(--border)] bg-[var(--surface)] text-[var(--muted-foreground)]',
  edited:
    'border-[color:color-mix(in_oklab,var(--accent)_35%,var(--border))] bg-[color:color-mix(in_oklab,var(--accent)_12%,var(--card))] text-[var(--accent)]',
  added:
    'border-[color:color-mix(in_oklab,var(--accent)_35%,var(--border))] bg-[color:color-mix(in_oklab,var(--accent)_12%,var(--card))] text-[var(--accent)]',
  excluded:
    'border-[var(--border)] bg-transparent text-[var(--muted-foreground)] line-through',
  'source-updated':
    'border-[color:color-mix(in_oklab,var(--accent)_45%,var(--border))] bg-[color:color-mix(in_oklab,var(--accent)_18%,var(--card))] text-[var(--accent)]',
};

const fieldClassName =
  'w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]';

function sourceMapOf(sourceItems: ResumeSourceItem[]) {
  return new Map(sourceItems.map((item) => [item.id, item]));
}

function mergeStoredDrafts(
  sourceItems: ResumeSourceItem[],
  stored: StoredDraft[] | null,
): StoredDraft[] {
  if (!stored?.length) {
    return sourceItems.map((source) => ({
      ...createDraftFromSource(source),
      base: snapshotOf(source),
    }));
  }

  const sources = sourceMapOf(sourceItems);
  const usedSourceIds = new Set<string>();
  const merged: StoredDraft[] = [];

  stored.forEach((draft) => {
    if (!draft.sourceId) {
      merged.push({
        ...draft,
        company: resolveDraftCompany(draft),
      });
      return;
    }

    const source = sources.get(draft.sourceId);
    if (!source) {
      return;
    }

    usedSourceIds.add(source.id);
    const hadLocalEdits = !snapshotsEqual(draft, draft.base);

    if (!hadLocalEdits) {
      merged.push({
        ...createDraftFromSource(source),
        included: draft.included,
        base: snapshotOf(source),
      });
      return;
    }

    merged.push({
      ...draft,
      id: source.id,
      sourceId: source.id,
      company: resolveDraftCompany(draft, source),
    });
  });

  sourceItems.forEach((source) => {
    if (!usedSourceIds.has(source.id)) {
      merged.push({
        ...createDraftFromSource(source),
        base: snapshotOf(source),
      });
    }
  });

  return merged;
}

function readStoredDrafts(): StoredDraft[] | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as StoredState;
    if (parsed.version !== 1 || !Array.isArray(parsed.items)) {
      return null;
    }

    return parsed.items;
  } catch {
    return null;
  }
}

async function copyText(value: string) {
  await navigator.clipboard.writeText(value);
}

function StatusBadge({ status }: { status: ResumeChangeStatus }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
        STATUS_CLASS[status],
      )}
    >
      {RESUME_CHANGE_LABEL[status]}
    </span>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="block space-y-1.5">
      <span className="text-xs font-semibold text-[var(--muted-foreground)]">
        {label}
      </span>
      {children}
    </label>
  );
}

export function CareerResumeWorkbench({
  sourceItems,
}: {
  sourceItems: ResumeSourceItem[];
}) {
  const [hydrated, setHydrated] = useState(false);
  const [drafts, setDrafts] = useState<StoredDraft[]>(() =>
    mergeStoredDrafts(sourceItems, null),
  );
  const [filter, setFilter] = useState<FilterTab>('all');
  const [selectedCompany, setSelectedCompany] = useState(ALL_COMPANIES);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    setDrafts(mergeStoredDrafts(sourceItems, readStoredDrafts()));
    setHydrated(true);
  }, [sourceItems]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const payload: StoredState = { version: 1, items: drafts };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [drafts, hydrated]);

  const sources = useMemo(() => sourceMapOf(sourceItems), [sourceItems]);

  const rows = useMemo(
    () =>
      drafts.map((draft) => {
        const source = draft.sourceId ? sources.get(draft.sourceId) : undefined;
        const sourceUpdated = Boolean(
          source &&
            !snapshotsEqual(draft, draft.base) &&
            !snapshotsEqual(source, draft.base),
        );
        const status = getChangeStatus(draft, source, sourceUpdated);

        return { draft, source, sourceUpdated, status };
      }),
    [drafts, sources],
  );

  const counts = useMemo(() => {
    return rows.reduce(
      (acc, row) => {
        acc.total += 1;
        if (row.draft.included) {
          acc.included += 1;
        }
        if (row.status !== 'unchanged') {
          acc.changed += 1;
        }
        if (row.status === 'edited' || row.status === 'source-updated') {
          acc.edited += 1;
        }
        if (row.status === 'added') {
          acc.added += 1;
        }
        if (row.status === 'excluded') {
          acc.excluded += 1;
        }
        return acc;
      },
      { total: 0, included: 0, changed: 0, edited: 0, added: 0, excluded: 0 },
    );
  }, [rows]);

  const visibleRows = rows.filter((row) => {
    if (filter === 'changed') {
      return row.status !== 'unchanged';
    }
    if (filter === 'included') {
      return row.draft.included;
    }
    return true;
  });

  const companyGroups = useMemo(() => {
    const groups = new Map<
      string,
      {
        company: string;
        period: string | null;
        rows: typeof rows;
        includedCount: number;
      }
    >();

    rows.forEach((row) => {
      const company = resolveDraftCompany(row.draft, row.source);
      const current = groups.get(company) ?? {
        company,
        period: row.source?.companyPeriod ?? null,
        rows: [],
        includedCount: 0,
      };

      current.rows.push(row);
      if (row.draft.included) {
        current.includedCount += 1;
      }
      if (!current.period && row.source?.companyPeriod) {
        current.period = row.source.companyPeriod;
      }
      groups.set(company, current);
    });

    return [...groups.values()].map((group) => {
      const visible = group.rows.filter((row) => visibleRows.includes(row));
      const includeStatus: IncludeStatus =
        group.includedCount === 0
          ? 'excluded'
          : group.includedCount === group.rows.length
            ? 'included'
            : 'partial';

      return {
        ...group,
        visibleRows: visible,
        includeStatus,
      };
    });
  }, [rows, visibleRows]);

  const visibleCompanyGroups = companyGroups.filter((group) => {
    if (selectedCompany !== ALL_COMPANIES && group.company !== selectedCompany) {
      return false;
    }

    return group.visibleRows.length > 0;
  });

  const selectedGroup =
    selectedCompany === ALL_COMPANIES
      ? null
      : (companyGroups.find((group) => group.company === selectedCompany) ??
        null);

  const documentText = formatResumeDocument(drafts);

  const markCopied = (key: string) => {
    setCopiedKey(key);
    window.setTimeout(() => {
      setCopiedKey((current) => (current === key ? null : current));
    }, 1600);
  };

  const updateDraft = (id: string, patch: Partial<ResumeDraftItem>) => {
    setDrafts((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  };

  const resetDraft = (id: string) => {
    setDrafts((current) =>
      current.map((item) => {
        if (item.id !== id || !item.sourceId) {
          return item;
        }

        const source = sources.get(item.sourceId);
        if (!source) {
          return item;
        }

        return {
          ...createDraftFromSource(source),
          included: item.included,
          base: snapshotOf(source),
        };
      }),
    );
  };

  const moveDraft = (id: string, direction: -1 | 1) => {
    setDrafts((current) => {
      const index = current.findIndex((item) => item.id === id);
      if (index < 0) {
        return current;
      }

      const source = current[index].sourceId
        ? sources.get(current[index].sourceId)
        : undefined;
      const company = resolveDraftCompany(current[index], source);
      const siblingIndexes = current.flatMap((item, itemIndex) => {
        const itemSource = item.sourceId
          ? sources.get(item.sourceId)
          : undefined;
        return resolveDraftCompany(item, itemSource) === company
          ? [itemIndex]
          : [];
      });
      const siblingPosition = siblingIndexes.indexOf(index);
      const swapWith = siblingIndexes[siblingPosition + direction];

      if (swapWith == null) {
        return current;
      }

      const next = [...current];
      [next[index], next[swapWith]] = [next[swapWith], next[index]];
      return next;
    });
  };

  const removeDraft = (id: string) => {
    setDrafts((current) => current.filter((item) => item.id !== id));
  };

  const setCompanyIncluded = (company: string, included: boolean) => {
    setDrafts((current) =>
      current.map((item) => {
        const source = item.sourceId ? sources.get(item.sourceId) : undefined;
        if (resolveDraftCompany(item, source) !== company) {
          return item;
        }

        return { ...item, included };
      }),
    );
  };

  const addDraftToCompany = (company: string) => {
    setDrafts((current) => {
      const draft = createBlankDraft(company);
      const stored = { ...draft, base: snapshotOf(draft) };
      const insertAt = current.findIndex((item) => {
        const source = item.sourceId ? sources.get(item.sourceId) : undefined;
        return resolveDraftCompany(item, source) === company;
      });

      if (insertAt < 0) {
        return [stored, ...current];
      }

      return [
        ...current.slice(0, insertAt),
        stored,
        ...current.slice(insertAt),
      ];
    });
  };

  const resetAll = () => {
    setDrafts(mergeStoredDrafts(sourceItems, null));
  };

  return (
    <div className="min-h-screen pb-16">
      <header className="border-b border-[var(--border)] bg-[color:color-mix(in_oklab,var(--background)_88%,transparent)] backdrop-blur-xl">
        <div className="section-shell flex flex-col gap-4 py-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              Local draft
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">
              이력서 경력 초안
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted-foreground)]">
              포트폴리오에는 연결되지 않습니다. 현재 경력 데이터를 이력서 양식으로
              보고, 포함·수정·복사한 뒤 로컬에만 보관합니다.
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="sticky top-0 z-20 border-b border-[var(--border)] bg-[color:color-mix(in_oklab,var(--background)_88%,transparent)] backdrop-blur-xl">
        <div className="section-shell space-y-3 py-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
              회사
            </p>
            <p className="text-xs text-[var(--muted-foreground)]">
              {companyGroups.length}개 그룹
            </p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setSelectedCompany(ALL_COMPANIES)}
              className={cn(
                'min-w-[8.5rem] shrink-0 rounded-[10px] border px-3 py-3 text-left transition-colors',
                selectedCompany === ALL_COMPANIES
                  ? 'border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]'
                  : 'border-[var(--border)] bg-[var(--card)] hover:bg-[var(--surface)]',
              )}
            >
              <span className="block text-sm font-semibold">전체</span>
              <span
                className={cn(
                  'mt-1 block text-xs',
                  selectedCompany === ALL_COMPANIES
                    ? 'text-[color:color-mix(in_oklab,var(--background)_72%,transparent)]'
                    : 'text-[var(--muted-foreground)]',
                )}
              >
                {counts.included}/{counts.total}개 포함
              </span>
            </button>
            {companyGroups.map((group) => {
              const selected = selectedCompany === group.company;
              const statusClass =
                group.includeStatus === 'included'
                  ? STATUS_CLASS.unchanged
                  : group.includeStatus === 'partial'
                    ? STATUS_CLASS.edited
                    : STATUS_CLASS.excluded;

              return (
                <button
                  key={group.company}
                  type="button"
                  onClick={() => setSelectedCompany(group.company)}
                  className={cn(
                    'min-w-[12.5rem] shrink-0 rounded-[10px] border px-3 py-3 text-left transition-colors',
                    selected
                      ? 'border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]'
                      : 'border-[var(--border)] bg-[var(--card)] hover:bg-[var(--surface)]',
                  )}
                >
                  <span className="block truncate text-sm font-semibold">
                    {group.company}
                  </span>
                  <span
                    className={cn(
                      'mt-1 flex items-center gap-2 text-xs',
                      selected
                        ? 'text-[color:color-mix(in_oklab,var(--background)_72%,transparent)]'
                        : 'text-[var(--muted-foreground)]',
                    )}
                  >
                    <span
                      className={cn(
                        'inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold',
                        selected
                          ? 'border-[color:color-mix(in_oklab,var(--background)_28%,transparent)]'
                          : statusClass,
                      )}
                    >
                      {includeStatusLabel(group.includeStatus)}
                    </span>
                    {group.includedCount}/{group.rows.length}
                  </span>
                </button>
              );
            })}
          </div>
          {selectedGroup ? (
            <div className="flex flex-col gap-3 rounded-[10px] border border-[var(--border)] bg-[var(--card)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold">{selectedGroup.company}</p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {selectedGroup.period ? `${selectedGroup.period} · ` : ''}
                  {selectedGroup.includedCount}/{selectedGroup.rows.length}개
                  포함
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setCompanyIncluded(selectedGroup.company, true)
                  }
                  disabled={selectedGroup.includeStatus === 'included'}
                >
                  <Eye className="size-3.5" />
                  회사 포함
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setCompanyIncluded(selectedGroup.company, false)
                  }
                  disabled={selectedGroup.includeStatus === 'excluded'}
                >
                  <EyeOff className="size-3.5" />
                  회사 제외
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => addDraftToCompany(selectedGroup.company)}
                >
                  <Plus className="size-3.5" />
                  이 회사 항목 추가
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={async () => {
                    await copyText(
                      formatResumeDocument(
                        selectedGroup.rows.map((row) => row.draft),
                      ),
                    );
                    markCopied(`company:${selectedGroup.company}`);
                  }}
                  disabled={selectedGroup.includedCount === 0}
                >
                  {copiedKey === `company:${selectedGroup.company}` ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  {copiedKey === `company:${selectedGroup.company}`
                    ? '복사됨'
                    : '회사 복사'}
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="section-shell mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[
          ['전체', counts.total],
          ['포함', counts.included],
          ['변경', counts.changed],
          ['수정', counts.edited],
          ['제외', counts.excluded],
        ].map(([label, value]) => (
          <Card key={label}>
            <CardContent className="flex items-center justify-between px-4 py-3">
              <span className="text-xs font-semibold text-[var(--muted-foreground)]">
                {label}
              </span>
              <strong className="text-lg">{value}</strong>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="section-shell mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {(
            [
              ['all', `전체 ${counts.total}`],
              ['changed', `변경 ${counts.changed}`],
              ['included', `포함 ${counts.included}`],
            ] as const
          ).map(([value, label]) => (
            <Button
              key={value}
              type="button"
              size="sm"
              variant={filter === value ? 'default' : 'outline'}
              onClick={() => setFilter(value)}
            >
              {label}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              addDraftToCompany(
                selectedCompany === ALL_COMPANIES
                  ? UNGROUPED_COMPANY
                  : selectedCompany,
              )
            }
          >
            <Plus className="size-3.5" />
            항목 추가
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={resetAll}>
            <RotateCcw className="size-3.5" />
            전부 원본으로
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={async () => {
              await copyText(documentText);
              markCopied('all');
            }}
          >
            {copiedKey === 'all' ? (
              <Check className="size-3.5" />
            ) : (
              <Copy className="size-3.5" />
            )}
            {copiedKey === 'all' ? '복사됨' : '포함 항목 전체 복사'}
          </Button>
        </div>
      </div>

      <div className="section-shell mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,28rem)]">
        <div className="space-y-8">
          {visibleCompanyGroups.length ? (
            visibleCompanyGroups.map((group) => {
              return (
                <section key={group.company} className="space-y-4">
                  {selectedCompany === ALL_COMPANIES ? (
                    <h2 className="text-sm font-semibold text-[var(--muted-foreground)]">
                      {group.company}
                    </h2>
                  ) : null}

                  {group.visibleRows.map(
                    ({ draft, source, sourceUpdated, status }) => {
                      const sourceText = source
                        ? formatResumeBlock(source)
                        : '';
                      const draftText = formatResumeBlock(draft);
                      const companyIndex = group.rows.findIndex(
                        (row) => row.draft.id === draft.id,
                      );

                      return (
                        <article
                          key={draft.id}
                          className="rounded-[10px] border border-[var(--border)] bg-[var(--card)] shadow-[0_16px_40px_rgba(36,48,68,0.05)]"
                        >
                          <div className="flex flex-col gap-3 border-b border-[var(--border)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0 space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <StatusBadge status={status} />
                                {selectedCompany === ALL_COMPANIES ? (
                                  <Badge className="bg-[var(--surface)] text-[var(--muted-foreground)]">
                                    {group.company}
                                  </Badge>
                                ) : null}
                              </div>
                              <h3 className="truncate text-base font-semibold">
                                {draft.title}
                              </h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  updateDraft(draft.id, {
                                    included: !draft.included,
                                  })
                                }
                              >
                                {draft.included ? (
                                  <EyeOff className="size-3.5" />
                                ) : (
                                  <Eye className="size-3.5" />
                                )}
                                {draft.included ? '제외' : '포함'}
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                disabled={!draft.sourceId}
                                onClick={() => resetDraft(draft.id)}
                              >
                                <RotateCcw className="size-3.5" />
                                원본으로
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => moveDraft(draft.id, -1)}
                                disabled={companyIndex <= 0}
                                aria-label="위로 이동"
                              >
                                <ArrowUp className="size-3.5" />
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => moveDraft(draft.id, 1)}
                                disabled={
                                  companyIndex === group.rows.length - 1
                                }
                                aria-label="아래로 이동"
                              >
                                <ArrowDown className="size-3.5" />
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                onClick={async () => {
                                  await copyText(draftText);
                                  markCopied(draft.id);
                                }}
                              >
                                {copiedKey === draft.id ? (
                                  <Check className="size-3.5" />
                                ) : (
                                  <Copy className="size-3.5" />
                                )}
                                {copiedKey === draft.id ? '복사됨' : '복사'}
                              </Button>
                              {!draft.sourceId ? (
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removeDraft(draft.id)}
                                >
                                  <Trash2 className="size-3.5" />
                                  삭제
                                </Button>
                              ) : null}
                            </div>
                          </div>

                          {sourceUpdated ? (
                            <p className="border-b border-[var(--border)] bg-[color:color-mix(in_oklab,var(--accent)_8%,var(--card))] px-4 py-2 text-sm text-[var(--accent)]">
                              포트폴리오 원본이 바뀌었습니다. 초안을 유지 중이니
                              차이를 확인하세요.
                            </p>
                          ) : null}

                          <div className="grid gap-0 lg:grid-cols-2">
                            <section className="space-y-3 p-4">
                              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                                현 상태
                              </h4>
                              {source ? (
                                <pre className="overflow-x-auto whitespace-pre-wrap rounded-xl bg-[var(--surface)] p-4 text-[13px] leading-6 text-[var(--muted-foreground)]">
                                  {sourceText}
                                </pre>
                              ) : (
                                <p className="rounded-xl bg-[var(--surface)] p-4 text-sm text-[var(--muted-foreground)]">
                                  원본 없음 · 이 화면에서 추가한 항목입니다.
                                </p>
                              )}
                            </section>

                            <section className="space-y-3 border-t border-[var(--border)] p-4 lg:border-l lg:border-t-0">
                              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                                변경 상태
                              </h4>
                              <div className="grid gap-3">
                                <Field
                                  id={`${draft.id}-title`}
                                  label="제목"
                                >
                                  <input
                                    id={`${draft.id}-title`}
                                    className={fieldClassName}
                                    value={draft.title}
                                    onChange={(event) =>
                                      updateDraft(draft.id, {
                                        title: event.target.value,
                                      })
                                    }
                                  />
                                </Field>
                                <Field
                                  id={`${draft.id}-period`}
                                  label="기간"
                                >
                                  <input
                                    id={`${draft.id}-period`}
                                    className={fieldClassName}
                                    placeholder="2026.07 - 2026.08"
                                    value={draft.period ?? ''}
                                    onChange={(event) =>
                                      updateDraft(draft.id, {
                                        period:
                                          event.target.value.trim() || null,
                                      })
                                    }
                                  />
                                </Field>
                                <Field
                                  id={`${draft.id}-bullets`}
                                  label="본문 (줄마다 한 항목)"
                                >
                                  <textarea
                                    id={`${draft.id}-bullets`}
                                    rows={Math.max(4, draft.bullets.length + 1)}
                                    className={cn(
                                      fieldClassName,
                                      'resize-y leading-6',
                                    )}
                                    value={draft.bullets.join('\n')}
                                    onChange={(event) =>
                                      updateDraft(draft.id, {
                                        bullets: event.target.value.split('\n'),
                                      })
                                    }
                                  />
                                </Field>
                                <Field
                                  id={`${draft.id}-outcome`}
                                  label="성과"
                                >
                                  <textarea
                                    id={`${draft.id}-outcome`}
                                    rows={3}
                                    className={cn(
                                      fieldClassName,
                                      'resize-y leading-6',
                                    )}
                                    value={draft.outcome ?? ''}
                                    onChange={(event) =>
                                      updateDraft(draft.id, {
                                        outcome:
                                          event.target.value.trim() || null,
                                      })
                                    }
                                  />
                                </Field>
                              </div>
                              <pre className="overflow-x-auto whitespace-pre-wrap rounded-xl border border-dashed border-[var(--border)] p-4 text-[13px] leading-6">
                                {draft.included
                                  ? draftText
                                  : '이력서 출력에서 제외된 항목입니다.'}
                              </pre>
                            </section>
                          </div>
                        </article>
                      );
                    },
                  )}
                </section>
              );
            })
          ) : (
            <Card>
              <CardContent className="p-6 text-sm text-[var(--muted-foreground)]">
                이 필터에 해당하는 항목이 없습니다.
              </CardContent>
            </Card>
          )}
        </div>

        <aside className="xl:sticky xl:top-6 xl:self-start">
          <Card>
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                    이력서 미리보기
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                    포함된 {counts.included}개 항목
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={async () => {
                    await copyText(documentText);
                    markCopied('preview');
                  }}
                >
                  {copiedKey === 'preview' ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  {copiedKey === 'preview' ? '복사됨' : '복사'}
                </Button>
              </div>
              <pre className="max-h-[70vh] overflow-auto whitespace-pre-wrap rounded-xl bg-[var(--surface)] p-4 text-[13px] leading-6">
                {documentText || '포함된 항목이 없습니다.'}
              </pre>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef } from "react";

import { ProjectCard } from "@/components/project-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sortPublishProjects } from "@/lib/site-data";
import type { PublishProjectItem } from "@/lib/types";

type PublishTab = "all" | "basic" | "responsive" | "accessibility" | "mobile";

const tabOrder: Array<{ value: PublishTab; label: string }> = [
  { value: "all", label: "All" },
  { value: "basic", label: "Basic" },
  { value: "responsive", label: "Responsive" },
  { value: "accessibility", label: "Accessibility" },
  { value: "mobile", label: "Mobile" },
];

function normalizeText(project: PublishProjectItem) {
  return `${project.title} ${project.summary} ${project.skills.join(" ")}`
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function isResponsive(project: PublishProjectItem) {
  const text = normalizeText(project);
  return text.includes("반응형") || text.includes("responsive");
}

function isAccessibility(project: PublishProjectItem) {
  const text = normalizeText(project);
  return text.includes("접근성") || text.includes("accessibility") || text.includes("인증");
}

function isMobile(project: PublishProjectItem) {
  const text = normalizeText(project);
  return text.includes("모바일") || text.includes("mobile");
}

function matchesTab(project: PublishProjectItem, tab: PublishTab) {
  if (tab === "all") {
    return true;
  }

  if (tab === "responsive") {
    return isResponsive(project);
  }

  if (tab === "accessibility") {
    return isAccessibility(project);
  }

  if (tab === "mobile") {
    return isMobile(project);
  }

  return !isResponsive(project) && !isAccessibility(project) && !isMobile(project);
}

function resizeGridItem({
  grid,
  item,
  content,
}: {
  grid: HTMLDivElement;
  item: HTMLDivElement;
  content: HTMLDivElement;
}) {
  const gridStyles = window.getComputedStyle(grid);
  const rowHeight = Number.parseInt(gridStyles.getPropertyValue("grid-auto-rows"), 10);
  const rowGap = Number.parseInt(gridStyles.getPropertyValue("gap"), 10);
  const contentHeight = content.getBoundingClientRect().height;
  const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));

  item.style.gridRowEnd = `span ${Math.max(1, rowSpan)}`;
}

function PublishMasonryItem({
  project,
  index,
  gridRef,
}: {
  project: PublishProjectItem;
  index: number;
  gridRef: React.RefObject<HTMLDivElement | null>;
}) {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const updateRowSpan = useCallback(() => {
    const grid = gridRef.current;
    const item = itemRef.current;
    const content = contentRef.current;

    if (!grid || !item || !content) {
      return;
    }

    resizeGridItem({ grid, item, content });
  }, [gridRef]);

  useEffect(() => {
    const content = contentRef.current;

    if (!content) {
      return;
    }

    updateRowSpan();

    const resizeObserver = new ResizeObserver(() => {
      updateRowSpan();
    });

    resizeObserver.observe(content);
    window.addEventListener("resize", updateRowSpan);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateRowSpan);
    };
  }, [project.image, project.summary, project.title, updateRowSpan]);

  return (
    <div ref={itemRef} className="publish-masonry__item">
      <div ref={contentRef} className="publish-masonry__content">
        <ProjectCard
          project={project}
          publishImageMode="natural"
          publishPriority={index < 4}
        />
      </div>
    </div>
  );
}

function PublishMasonry({ projects }: { projects: PublishProjectItem[] }) {
  const gridRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={gridRef} className="publish-masonry">
      {projects.map((project, index) => (
        <PublishMasonryItem
          key={project.slug}
          project={project}
          index={index}
          gridRef={gridRef}
        />
      ))}
    </div>
  );
}

export function PublishProjectTabs({
  projects,
}: {
  projects: PublishProjectItem[];
}) {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="mx-auto flex h-auto w-full flex-wrap justify-center gap-2 !border-none !bg-transparent p-0 shadow-none">
        {tabOrder.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="border border-[var(--border)] bg-[var(--surface)] data-[state=active]:border-[var(--foreground)]"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabOrder.map((tab) => {
        const filteredProjects = sortPublishProjects(
          projects.filter((project) => matchesTab(project, tab.value)),
        );

        return (
          <TabsContent key={tab.value} value={tab.value}>
            {filteredProjects.length ? (
              <PublishMasonry projects={filteredProjects} />
            ) : (
              <div className="rounded-[10px] border border-dashed border-[var(--border)] p-8 text-sm text-[var(--muted-foreground)]">
                해당 분류에 표시할 퍼블리싱 프로젝트가 아직 없습니다.
              </div>
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

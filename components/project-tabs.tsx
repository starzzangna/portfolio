"use client";

import Link from "next/link";
import { useState } from "react";

import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { FeProjectItem, PublishProjectItem } from "@/lib/types";

export function ProjectTabs({
  feProjects,
  publishProjects,
}: {
  feProjects: FeProjectItem[];
  publishProjects: PublishProjectItem[];
}) {
  const [activeTab, setActiveTab] = useState<"fe" | "publish">("fe");
  const moreHref = activeTab === "fe" ? "/projects/fe" : "/projects/publish";

  return (
    <Tabs
      defaultValue="fe"
      className="w-full"
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as "fe" | "publish")}
    >
      <div className="flex items-center justify-between gap-3 md:flex-row md:items-center md:justify-between">
        <TabsList className="w-fit self-start">
          <TabsTrigger value="fe">FE</TabsTrigger>
          <TabsTrigger value="publish">퍼블리싱</TabsTrigger>
        </TabsList>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="h-9 px-3 text-xs bg-[var(--soft-button-bg)] text-[var(--foreground)] hover:bg-[var(--soft-button-hover-bg)] md:h-10 md:px-5 md:text-sm"
        >
          <Link href={moreHref}>더 보기</Link>
        </Button>
      </div>
      <TabsContent value="fe">
        <div className="grid gap-6 md:grid-cols-2">
          {feProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="publish">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {publishProjects.length ? (
            publishProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))
          ) : (
            <div className="rounded-[10px] border border-dashed border-[var(--border)] p-8 text-sm text-[var(--muted-foreground)]">
              Publish 데이터 연결이 잠시 지연되고 있습니다. 잠시 후 다시 시도해 주세요.
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}

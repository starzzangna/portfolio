import { DocumentLink } from "@/components/document-link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section-shell flex min-h-[60vh] flex-col items-start justify-center py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
        페이지 없음
      </p>
      <h1 className="mt-4 text-4xl font-semibold">요청한 페이지를 찾을 수 없습니다.</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-[var(--muted-foreground)]">
        프로젝트 경로나 데이터가 변경되었을 수 있습니다. 메인 페이지나 프로젝트 목록으로 다시 이동해 주세요.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <DocumentLink href="/">메인으로 이동</DocumentLink>
        </Button>
        <Button asChild variant="outline">
          <DocumentLink href="/projects/fe">프로젝트 보기</DocumentLink>
        </Button>
      </div>
    </section>
  );
}

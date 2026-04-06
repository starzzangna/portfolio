/** GitHub Pages 등 서브 경로 배포 시 빌드에만 주입 (`NEXT_PUBLIC_BASE_PATH=/portfolio`). */
export function getPublicBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? "";
}

/** `usePathname()` 값에서 basePath를 제거해 앱 내부 경로(`/`, `/projects/...`)로 맞춥니다. */
export function stripPublicBasePath(pathname: string): string {
  const base = getPublicBasePath();
  if (!base) {
    return pathname;
  }
  if (pathname === base || pathname === `${base}/`) {
    return "/";
  }
  if (pathname.startsWith(`${base}/`)) {
    return pathname.slice(base.length);
  }
  return pathname;
}

export function isAppHomePathname(pathname: string): boolean {
  const p = stripPublicBasePath(pathname);
  return p === "/" || p === "";
}

/** `public/` 정적 경로에 서브 경로 배포용 prefix를 붙입니다. */
export function withBasePath(assetPath: string): string {
  const base = getPublicBasePath();
  if (!base || !assetPath.startsWith("/")) {
    return assetPath;
  }
  return `${base}${assetPath}`;
}

/**
 * `NEXT_PUBLIC_BASE_PATH`가 비어 있을 때 `usePathname()`으로 서브 경로만 추론합니다.
 * (접힌 Collapsible처럼 클라이언트에서만 그려지는 링크에서 env 누락이 나는 경우 대비)
 */
export function inferDocumentBaseFromPathname(
  pathname: string,
  targetHref: string,
): string {
  if (!targetHref.startsWith("/")) {
    return "";
  }
  const seg = pathname.split("/").filter(Boolean);
  if (!seg.length || seg[0] === "projects") {
    return "";
  }
  if (seg.length >= 2 && seg[1] === "projects") {
    return `/${seg[0]}`;
  }
  if (seg.length === 1 && seg[0] !== "projects" && targetHref.startsWith("/projects")) {
    return `/${seg[0]}`;
  }
  return "";
}

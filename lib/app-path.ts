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

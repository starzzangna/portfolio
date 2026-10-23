# portfolio

React·Next.js·TypeScript 기반 개인 포트폴리오입니다. 검토한 v2 내용을 기존 portfolio 저장소에 반영했습니다. 이전 정적 HTML·jQuery 소스는 `beforeProject/`에 유지합니다.

## 실행과 검증

```bash
npm ci
npm run dev -- --port 3210
npm run typecheck
npm run lint
npm run test:content
npm run build
npm run start -- --port 3210
```

- FE 상세 16건과 홈 대표 6건을 제공합니다. 전체 프로젝트 목록은 종료일·시작일 순으로 최신순 정렬합니다.
- 경력 주요 업무는 시작일·종료일 순으로 최신순 정렬합니다.
- 경력과 `/lab/resume`, `docs/resume-v2.md`는 해결 과제·담당 업무·품질 개선·성과 구성을 공유합니다. 문서 갱신은 `npm run resume:export`로 실행합니다.
- Engineering Lab 메뉴·홈 버튼은 제거했습니다. `/lab/resume` 내부 이력서 편집 도구는 유지합니다.
- 이력서 편집 도구는 일반 로컬 실행에서 제공하며 기존 설정대로 GitHub Pages 정적 배포에서는 숨깁니다.
- v1의 브라우저 저장 초안을 덮어쓰지 않도록 v2 저장 키를 사용합니다.

## GitHub Pages

기존 저장소 주소 `https://starzzangna.github.io/portfolio/`와 `/portfolio` 기본 경로를 유지합니다. 환경 변수를 새로 추가하지 않았습니다.

```powershell
$env:GITHUB_PAGES='1'
$env:NEXT_PUBLIC_BASE_PATH='/portfolio'
$env:NEXT_PUBLIC_SITE_URL='https://starzzangna.github.io/portfolio'
npm run build
```

정적 산출물은 `out/`에 생성합니다. `.github/workflows/deploy-github-pages.yml`은 기존과 같이 main/master push 시 배포하므로, 검토 중인 로컬 브랜치를 원격에 반영하기 전 배포 범위를 확인합니다. 이번 전환 작업에서는 원격 push·배포를 수행하지 않았습니다.

## 원본 백업과 복원

원본의 미커밋 변경까지 포함한 백업과 복원 절차는 [복원 안내](docs/rollback.md)에 기록했습니다. 현재 v2는 `codex/portfolio-v2` 브랜치에서 관리합니다.

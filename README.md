# portfolio

개인 포트폴리오 사이트입니다. 기존 정적 HTML·jQuery 기반 소스는 `beforeProject/`에 보관되어 있으며, 현재 저장소 루트는 **Next.js(App Router)** 로 이전·갱신된 버전입니다.

## 스택

- **Next.js** 16 · **React** 19 · **TypeScript**
- **Tailwind CSS** 4 · **Radix UI** · **next-themes** (다크 모드)
- **Lucide React** (아이콘)

## 실행 방법

```bash
npm install
npm run dev
```

- `npm run dev` — 개발 서버
- `npm run build` — 프로덕션 빌드
- `npm run start` — 프로덕션 서버
- `npm run lint` — ESLint

## GitHub Pages (`username.github.io/저장소이름/`)

저장소 기본 페이지만 쓰면 GitHub가 **README.md**를 보여 줍니다. Next 앱을 띄우려면 **정적 HTML로 빌드한 결과물**을 Pages에 올려야 합니다.

이 저장소는 `GITHUB_PAGES=1`일 때만 `output: 'export'`와 `basePath: '/portfolio'`(저장소명과 같을 때)로 `out/`을 만듭니다. 워크플로는 [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml)에 있습니다.

1. GitHub 저장소 **Settings → Pages**에서 **Build and deployment**의 Source를 **GitHub Actions**로 설정합니다.
2. `main`(또는 `master`)에 푸시하면 Actions가 빌드 후 `out/`을 배포합니다.
3. 저장소 이름이 `portfolio`가 아니면 워크플로의 `NEXT_PUBLIC_BASE_PATH` 값을 `/<저장소이름>`으로 바꿉니다.

로컬에서 GitHub용 산출물만 확인하려면 (PowerShell 예시):

```powershell
$env:GITHUB_PAGES='1'
$env:NEXT_PUBLIC_BASE_PATH='/portfolio'
$env:NEXT_PUBLIC_SITE_URL='https://starzzangna.github.io/portfolio'
npm run build
```

생성된 `out/`을 정적 서버로 열어 확인할 수 있습니다.

### 상세 페이지가 404일 때 (주소 확인)

GitHub **프로젝트 페이지**는 반드시 **`https://<사용자>.github.io/<저장소이름>/`** 아래에만 올라갑니다. 저장소 이름이 `portfolio`이면 앞에 **`/portfolio`** 가 들어가야 합니다.

| 구분 | 예시 |
|------|------|
| 잘못된 주소 (루트 사이트로 인식) | `https://starzzangna.github.io/projects/fe/tourvis-common-rerenewal` |
| 올바른 주소 | `https://starzzangna.github.io/portfolio/projects/fe/tourvis-common-rerenewal/` |

첫 번째 형태는 `github.io` **최상위**에 `projects/...` 폴더가 없어서 404가 납니다. 브라우저 주소창에 공유·북마크할 때는 항상 **`/portfolio`까지 포함**했는지 확인하세요. (빌드에 `trailingSlash`를 켜 두었으므로 **끝의 `/`** 가 있으면 더 안전합니다.)

`https://starzzangna.github.io/` 만 쓰고 싶다면 별도 저장소 `starzzangna.github.io`에 루트로 배포하고, 이 프로젝트에서는 `basePath`를 비우는 식으로 설정을 바꿔야 합니다.

## 디렉터리 안내

| 경로 | 설명 |
|------|------|
| `app/` | 페이지·레이아웃(App Router) |
| `components/` | UI·섹션 컴포넌트 |
| `lib/` | 데이터(`site-data`), 타입, 유틸 |

## 변경 이력

- **2026-04-07** — `beforeProject` 레거시를 기준으로 Next.js·TypeScript·Tailwind 기반 현재 소스로 갱신
- **2025-07-20** — 갱신
- **2020-05-19** — index 수정

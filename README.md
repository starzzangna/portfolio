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

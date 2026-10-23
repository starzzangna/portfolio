# 원본 복원 안내

백업일: 2026-10-23 (Asia/Seoul).

## 보존 지점

- 기존 master: `800c89f696442941eb16c4070991fcdb06d1e1f5`
- 미커밋 변경 포함 원본: `5ba289c114ed8fe9a1605cec7d0e8c646f3ddebd`
- 백업 브랜치: `codex/backup-portfolio-before-v2-20261023`
- v2 작업 브랜치: `codex/portfolio-v2`
- 저장소 내 원본 소스: `beforeProject/v1/` (기존 HTML 포트폴리오는 `beforeProject/v0/`)
- 별도 소스 ZIP: `D:/project/portfolio-backups/portfolio-before-v2-20261023.zip`
- 전체 Git 이력 bundle: `D:/project/portfolio-backups/portfolio-before-v2-20261023.bundle`

백업에는 원본 추적 파일의 당시 미커밋 변경을 포함했습니다. 의존성·빌드 캐시와 out 같은 재생성 가능한 산출물은 Git 백업 대상이 아닙니다. bundle 검증을 통과했습니다. ZIP과 bundle은 저장소 외부의 로컬 백업이며 원격 보관된 것은 아닙니다.

## 원본으로 전환

현재 작업이 있으면 먼저 커밋 또는 stash로 보존한 후 실행합니다. 아래 명령은 브랜치를 바꾸므로 먼저 실행 중인 서버를 종료합니다.

```bash
git switch codex/backup-portfolio-before-v2-20261023
npm ci
npm run build
npm run start -- --port 3210
```

v2로 돌아가려면 `git switch codex/portfolio-v2` 후 같은 설치·빌드 명령을 실행합니다. GitHub Pages 확인 시 README의 환경 변수를 적용합니다. 브랜치 전환만으로 기존 out 파일은 갱신되지 않으므로 반드시 해당 버전을 다시 빌드합니다.

## 저장소 자체가 없어졌을 때

기존 폴더를 덮어쓰지 않는 새 경로에 복구합니다.

```bash
git clone -b codex/backup-portfolio-before-v2-20261023 D:/project/portfolio-backups/portfolio-before-v2-20261023.bundle D:/project/portfolio-restored
```

GitHub Pages 운영 버전을 원본으로 되돌릴 때는 원본 백업 커밋을 기반으로 배포 브랜치의 변경을 검토하고 새 커밋으로 반영합니다. 로컬 브랜치 전환만으로 운영 배포는 바뀌지 않습니다. 강제 push 없이 원격의 후속 변경도 보존하세요.

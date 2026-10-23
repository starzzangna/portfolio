# v2 저장소 전환 검증

검증일: 2026-10-23 (Asia/Seoul).

- 원본 master와 미커밋 변경을 분리 보존했다. 원본 백업 브랜치 커밋은 `5ba289c114ed8fe9a1605cec7d0e8c646f3ddebd`다.
- Git bundle 전체 이력 검증을 통과하고 저장소 외부에 원본 소스 ZIP도 보관했다. 복원 방법은 `rollback.md`에 기록했다.
- `app`·`components`·`lib`·`public`·`scripts`·`beforeProject`의 v2 원본과 대상 파일 SHA-256 일치를 확인했다.
- 패키지 이름은 portfolio, GitHub Pages basePath 및 워크플로 URL은 기존 `/portfolio`로 맞췄다. 의존성 버전은 변경하지 않았다.
- 잠금 파일 기반 설치, 내용 검사(16개 상세·23개 경력 항목), 타입 검사, ESLint, Git diff 공백 검사를 통과했다.
- `/portfolio` 환경의 정적 빌드를 통과했다. 브라우저에서 대표 6개·경력의 서브 경로 링크·상세 이동·증분 폴링 문구·가로 넘침 없음을 확인했다.
- 기존 설정대로 GitHub Pages에서 `/lab/resume`은 표시하지 않는다. 로컬 이력서 도구는 일반 빌드에서 제공한다.
- 일반 프로덕션 빌드도 통과했다. 실제 portfolio 저장소를 3210 포트에서 실행해 이력서 도구·대표 6개·Lab 메뉴 제거를 브라우저로 확인했다.
- 원격 push·PR·배포는 수행하지 않았다. 생성된 의존성·빌드 결과와 내부 근거 분석 자료는 전환 커밋에 포함하지 않는다.

import { Accessibility, Boxes, Sparkles, type LucideIcon } from 'lucide-react';

import type {
  CareerItem,
  FeProjectItem,
  Profile,
  ProjectItem,
  ProjectType,
  PublishProjectItem,
  SkillGroup,
  Strength,
} from '@/lib/types';

const PUBLISH_SHEET_URL =
  'https://opensheet.elk.sh/1_W3Sq6tNaoEUo1b-rsP6vrx7mWbPzvFjXDmRUL3KyiA/sheet1';

export const profile: Profile = {
  name: '조정민',
  englishName: 'Jeongmin Jo',
  role: 'Frontend Developer / Web Publisher',
  intro:
    '디자인과 퍼블리싱 경험을 기반으로 React 중심의 반응형 UI를 구현하고, 운영 효율을 높이는 자동화와 공통화까지 연결하는 프론트엔드 개발자입니다.',
  email: 'starzzangna@naver.com',
  github: 'https://github.com/starzzangna',
  location: 'Goyang, South Korea',
  image: '/images/me.jpg',
};

export const strengths: Strength[] = [
  {
    title: '실무형 UI 설계',
    description:
      '디자인 의도를 살리면서도 운영과 확장에 강한 반응형 UI를 설계하고 구현합니다.',
    icon: 'layout',
  },
  {
    title: '업무 흐름 최적화',
    description:
      '빌더, 공통 컴포넌트, 퍼블리싱 자동화처럼 반복 업무를 줄이는 구조를 직접 만듭니다.',
    icon: 'sparkles',
  },
  {
    title: '협업 연결 역량',
    description:
      '기획, 디자인, 마케팅, 개발 사이에서 요구사항을 정리하고 구현 가능한 형태로 빠르게 연결합니다.',
    icon: 'accessibility',
  },
];

export const strengthIcons: Record<Strength['icon'], LucideIcon> = {
  accessibility: Accessibility,
  layout: Boxes,
  sparkles: Sparkles,
};

export const skillGroups: SkillGroup[] = [
  {
    category: '프론트엔드',
    items: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Zustand',
      'Tailwind CSS',
    ],
  },
  {
    category: '퍼블리싱 & UI',
    items: ['HTML5', 'CSS3', 'SCSS', 'Responsive Web', 'Web Accessibility'],
  },
  {
    category: '협업 및 도구',
    items: [
      'Gulp',
      'Node.js',
      'Git',
      'GitHub',
      'Figma',
      'Vercel',
      'Docker',
      'AWS',
    ],
  },
];

export const careers: CareerItem[] = [
  {
    role: 'Frontend Developer / Web Publisher',
    company: '(주)타이드스퀘어',
    period: '2021.08 - 재직중',
    summary:
      '투어비스 실서비스 운영 환경에서 반응형 UI 구축, 마케팅 페이지 개발, 공통 컴포넌트 정리, 업무 자동화까지 함께 맡고 있습니다.',
    responsibilities: [
      {
        title: '마케팅용 Figma to Email HTML 개발',
        items: [
          '2026.01 - 2026.02',
          '기존 기획 - 디자인 - 퍼블(개발) - 기획 단계에서 퍼블(개발)단계 단축하기 위한 builder 개발',
          '피그마 url로 생성 진행 시 a, button 태그 네이밍, url 작성 가능',
          '영역의 이미지와 같이 보여줌으로써, 해당 요소가 어디 위치에 있는지 확인 가능',
          '생성된 이미지를 supabase에 올린 후 해당 url 을 받아와 소스에 삽입 후, html 미리보기, 다운로드등 제공',
          '이슈 : em으로 보내는 이미지의 크기가 커, 레이어 요소들이 많아 피그마 플러그인 호출 제한으로 인한 작업 불가환경 생성',
          '해결 : 피그마 플러그인 개발로 별도 피그마 api 를 호출하지 않고, 플러그인으로 만들어진 json 데이터를 업로드',
          '이슈2 : vercel 기반으로 작업을 하다보니 json 데이터가 3.5mb 이상인 경우 error 호출',
          '해결 : supabase를 사용하여, 대용량 json업로드 섹션 추가 해 받은 url로 브라우저에서 직접 put. 업로드가 끝나면 url로 불러와 기존 로직 진행',
          '성과 : 작업 프로세스 25% 감소, em 제작 시간 15% 단축',
        ],
      },
      {
        title: '패키지 견적문의 게시판 작업',
        items: [
          '2025.12 - 2026.01',
          '패키지 상품 견적 안내를 위한 투어비스 내 별도 게시판 작업',
          '회원 체크 및 비회원인 경우 비밀번호 설정',
        ],
      },
      {
        title: '마케팅용 vercel 앱 프록시 연동 및 ai 를 이용한 seo 강화',
        items: [
          '2025.08 - 2025.08',
          '미들웨어를 이용하여 vercel 로 배포되는 페이지 맵을 만들어 매핑하고, 배포되는 페이지를 맵 기반으로 rewrite 처리하여 연동',
          '성과 : 팀내 마케팅 업무 10% 감소, 마케팅 유입 7% 상승',
        ],
      },
      {
        title: '고객센터 젠데스크 주요 요청 api 연동',
        items: [
          '2025.05 - 2025.08',
          '기존 운영 유저 데이터를 체크 해서 요청 프로세스로 이동하는 로직 개발',
          '젠데스크 화면에서 주요 데이터 사용 가능',
          '이슈 : html + javascript 기본 기반으로 하는 많은 소스의 관리 이슈',
          '해결 : 표준 함수형 인터페이스로 구분하고, 공통 컴포넌트 형태로 만들어 코드의 압축 및 재사용성 증가',
          '성과 : 로딩 속도 1.2초 감소, 소스 코드 7000줄 감소, 회원 데이터 연동',
        ],
      },
      {
        title: 'daum 전용 페이지 구축',
        items: [
          '2025.03 - 2025.04',
          '다음 전용 메인 페이지를 다음 가이드에 맞게 구축',
          '다크모드 구현',
          '이슈 : 기존 운영에서 사용하던 카드 컴포넌트들이 module.css를 기반으로 하나하나 다 나열되어 있어, 너무 많은 관리요소 발생',
          '해결 : radix 기반 테일윈드를 이용한 공통 컴포넌트로 구현하여 type을 props로 받아 분기처리',
          '성과 : 관련 컴포넌트 개수 60% 감소',
        ],
      },
      {
        title: 'airspot 백오피스 리뉴얼 UI/UX 개발 백업',
        items: [
          '2024.03 - 2024.05',
          '1차 작업자가 마테리얼 플러그인을 그대로 사용해, ui/ux상의 레이아웃이 무너져 백오피스에 맞게 컴포넌트 수정',
          '이슈 : 플러그인 가이드에 맞지 않아 레이아웃이 전부 틀어지고, 반응형임에도 불구하고, pc 화면에서도 모바일 레이아웃이 존재',
          '해결 : device를 토대로 구분하여, 관련된 별도의 module.css들을 사용하여, 타 컴포넌트에 영향을 주지 않게 함',
          '성과 : module.css 로 인한 소스가 3% 증가하였으나, 최소한의 css로 깨진 레이아웃 ui/ux 에 맞게 수정',
        ],
      },
      {
        title: '투어비스 마이페이지 리뉴얼 퍼블리싱 및 FE 개발',
        items: [
          '2023.08 - 2023.10',
          '내여행, 쿠폰함 리뉴얼 수정',
          '투어비스 이용권 페이지 개발',
        ],
      },
      {
        title: '퍼블리싱 팀 gulp 자동화',
        items: [
          'node.js 기반 gulp 도입으로 모듈형 작업 진행. 전반적인 퍼블리싱 작업환경 개선',
          '성과 : 개발처럼 모듈화로 인한 중복 요소 감소, 반복작업 단순화로 업무속도 30% 감소, 중복 소스 에러 100% 감소',
        ],
      },
      {
        title: '투어비스 공통 재리뉴얼 퍼블리싱 및 FE 개발',
        items: [
          '2023.06 - 2023.09',
          'pc 사용자들의 고객센터 문의. 사용자 연령층에 따른 ui/ux 변화로 인한 pc 친화적 페이지 작업',
          '오마카세, 배너등 광고 요소를 위한 배치',
        ],
      },
      {
        title: '투어비스 항공 리뉴얼 퍼블리싱',
        items: [
          '2022.11 - 2023.04',
          '노 디자인 베이스. 기존의 사이트만 가지고 화면 구현',
          'pc, mo 각각 다른 형태를 반응형으로 구현',
          '이슈 : 디자인의 부재로 인한 작업할 수 있는 환경이 되지 않음. 변경될 소수는 개발자가 알기 쉽게 만들어져야 함',
          '해결 : 기존 운영되고 있는 항공 페이지 손수 분석 및 항공 관리 담당자와 무수한 소통, gulp 를 이용한 모듈형 개발 형태의 퍼블을 사용함으로써 프론트와의 갭 차이를 줄임',
          '성과 : 프론트 개발자의 추가 요청 사항 목록 20개 미만으로 작업시간 단축',
        ],
      },
      {
        title: '투어비스 공통 리뉴얼 퍼블리싱',
        items: [
          '2021.04 - 2021.12',
          '모바일 퍼스트 확장형 레이아웃 구성',
          '750 기준으로 반응형 레이아웃을 기반으로 한 ui/ux 고려',
          '성과 : 페이지 단일화로 인한 공통 소스 코드 40% 감소',
        ],
      },
    ],
  },
  {
    role: 'Web Publisher',
    company: '(주)엘에스이노베이션',
    period: '2017.04 - 2021.07',
    summary:
      '서비스형 웹과 관리자 페이지를 중심으로 반응형 퍼블리싱을 담당했고, Gulp와 SCSS 기반의 모듈형 작업 방식에 익숙해진 시기입니다.',
    responsibilities: [
      {
        title: '구축 서비스',
        items: [
          '마통 리뉴얼 관리자 페이지 구축',
          '마통 리뉴얼 페이지 구축',
          '마통 사장님 페이지 구축',
          '매출모아 소개 페이지 구축',
          '매출모아 영업사원 페이지 구축',
          '매출모아 관리자 페이지 구축',
          '매출모아 페이지 구축',
        ],
      },
      {
        title: '주요 업무',
        items: [
          'HTML5, Gulp, SCSS, jQuery 기반 반응형 및 관리자 퍼블리싱 수행',
          '서비스/관리자 화면을 모듈형 구조로 정리하며 유지보수성과 작업 효율 개선',
        ],
      },
    ],
  },
  {
    role: 'Web Publisher',
    company: 'AON Real Estate',
    period: '2016.05 - 2016.12',
    summary:
      '브랜드 사이트와 마이크로 사이트를 다수 구축하며 반응형 퍼블리싱 완성도와 일정 대응력을 빠르게 끌어올렸습니다.',
    responsibilities: [
      {
        title: '구축 서비스',
        items: [
          'baruni 반응형 웹사이트 구축',
          'smart order 모바일 사이트 구축',
          'calidas 반응형 웹사이트 리뉴얼',
          'domo lab 반응형 웹사이트 구축',
          '한국갈등조정가협의회 반응형 웹사이트 구축',
          'landmark72 반응형 웹사이트 구축',
          'sirona 마이크로 사이트 구축',
          'style aon 반응형 웹사이트 구축',
          'whatinfo 반응형 웹사이트 구축',
        ],
      },
      {
        title: '주요 업무',
        items: [
          '브랜드 성격에 맞는 반응형 퍼블리싱과 모바일 사이트 구축',
          'HTML5, Gulp, SCSS, jQuery 기반으로 전 프로젝트 기여도 100% 수준의 퍼블리싱 수행',
        ],
      },
    ],
  },
  {
    role: 'Web Publisher',
    company: 'FGI',
    period: '2015.10 - 2016.04',
    summary:
      '프로모션, 기관, 브랜드 사이트를 빠르게 구축하며 웹 표준과 반응형 실무 감각을 다진 시기입니다.',
    responsibilities: [
      {
        title: '구축 서비스',
        items: [
          '화인컴SE 반응형 웹사이트 구축',
          'ANF 웹사이트 구축',
          '강변 테크노마트 반응형 웹사이트 구축',
          '유토이미지 웹사이트 구축',
          'KT 대전인재개발원 반응형 웹사이트 구축',
          '이투엘 네트워크 반응형 웹사이트 구축',
          '경찰대학 웹사이트 구축',
        ],
      },
      {
        title: '주요 업무',
        items: [
          'html5, css, jQuery 기반 반응형 및 웹 표준 퍼블리싱 수행',
          '프로모션/기관/브랜드 사이트의 크로스브라우징과 화면 품질 대응',
        ],
      },
    ],
  },
  {
    role: 'Web Designer / Publisher',
    company: 'BNP21',
    period: '2013.12 - 2015.10',
    summary:
      '디자인과 퍼블리싱을 함께 수행하며 웹 접근성, 웹 표준, 반응형 구축 경험을 폭넓게 쌓은 초기 커리어입니다.',
    responsibilities: [
      {
        title: '구축 서비스',
        items: [
          '서울사진축제 공모 페이지 작업',
          'TEXPERT 웹사이트 구축',
          'KISDI 방송 뉴미디어 통계 정보 시스템 영문 마이크로 웹사이트 구축',
          'KISDI 방송 뉴미디어 통계 정보 시스템 모바일 구축',
          '성광 국&영문 반응형 웹사이트 구축',
          '2015 안전문화대상 반응형 웹사이트 구축',
          '베이넥스 국&영문 반응형 웹사이트 구축',
          '현대자동차 그룹 글로벌 경영연구소 웹접근성 인증마크 획득',
          '우진화학 반응형 웹사이트 구축',
          '한국엡손 마이크로 웹사이트 구축',
          '갈더마 코리아 반응형 웹사이트 구축',
          '칼라메이트 반응형 웹진 사이트&모바일 구축',
          '2014 서울사진축제 웹사이트 구축',
          'Bnpsystem 웹사이트 구축',
          '이웃 웹사이트 구축',
          'AT 농수산 식품공사 생생정보 웹사이트 구축',
          'KISDI방송뉴미디어 통계정보시스템 웹사이트 구축 & 웹접근성 인증마크 획득',
          '엘크라넬 웹사이트 구축',
          '마스터 자동차 경찰차량 위탁 관리 시스템 웹사이트·모바일 구축',
          '마스터 자동차 법인차량 관리 시스템 웹사이트 구축',
          '웹지니 페이지 구축',
          '마스터스 통상 웹사이트 리뉴얼',
          '천하자동차 VOLVO 웹사이트 구축',
        ],
      },
      {
        title: '주요 업무',
        items: [
          '웹 표준, 웹 접근성, 반응형 퍼블리싱과 관리자 페이지 구축 전반 수행',
          '디자인 시안 보정부터 마크업 구현, 접근성 인증 대응까지 폭넓게 경험',
        ],
      },
    ],
  },
];

export const feProjects: FeProjectItem[] = [
  {
    type: 'fe',
    slug: 'figma-email-builder',
    company: 'Tidesquare',
    title: 'Figma to Email HTML Builder 개발',
    summary:
      '피그마 디자인 데이터를 기반으로 이메일 HTML을 생성하는 내부 빌더를 구축해 마케팅 제작 프로세스를 단축한 프로젝트입니다.',
    period: '2026.01 - 2026.02',
    teamSize: 'Frontend 1명',
    skills: ['Next.js', 'React', 'TypeScript', 'Supabase'],
    image: '/images/portpolio/neighbor.jpg',
    body: [
      'Figma URL 입력만으로 a 태그, button 태그, 링크 주소를 매핑하고 이미지 프리뷰까지 함께 확인할 수 있는 빌더를 구현했습니다.',
      '생성 결과물을 Supabase에 업로드한 뒤 미리보기와 다운로드까지 한 흐름에서 처리할 수 있도록 구성했습니다.',
      '기획-디자인-퍼블리싱 사이의 반복 커뮤니케이션을 줄이고, 마케팅 이메일 제작 속도를 높이는 데 집중했습니다.',
    ],
    troubleshooting: [
      {
        problem:
          '이메일용 이미지 크기가 크고 레이어 수가 많아 Figma API 호출만으로는 안정적으로 데이터를 가져오기 어려웠습니다.',
        solution:
          'Figma 플러그인을 별도로 개발해 API 직접 호출 대신 JSON 데이터를 생성하고 업로드하는 방식으로 전환했습니다.',
      },
      {
        problem:
          'Vercel 환경에서 3.5MB 이상의 JSON 업로드 시 에러가 발생해 대용량 데이터 처리에 제약이 있었습니다.',
        solution:
          'Supabase 업로드 섹션을 분리해 브라우저에서 직접 PUT 업로드하도록 구성하고, 업로드된 URL을 받아 기존 생성 로직에 연결했습니다.',
      },
    ],
    outcomes: [
      '이메일 제작 프로세스 25% 감소',
      '마케팅용 이메일 제작 시간 15% 단축',
    ],
  },
  {
    type: 'fe',
    slug: 'marketing-proxy-seo',
    company: 'Tidesquare',
    title: 'Vercel 앱 프록시 연동 및 SEO 강화',
    summary:
      '마케팅용 페이지를 Vercel 기반으로 분리 배포하고, rewrite와 AI 활용 SEO 개선으로 유입 효율을 높인 프로젝트입니다.',
    period: '2025.08 - 2025.08',
    teamSize: 'Frontend 1명',
    skills: ['Next.js', 'Middleware', 'Vercel', 'SEO'],
    image: '/images/portpolio/smart.jpg',
    body: [
      '미들웨어 기반 페이지 맵을 구성해 Vercel로 배포된 페이지를 서비스 내 경로와 자연스럽게 연결했습니다.',
      '맵 데이터 기준으로 rewrite를 적용해 운영 서비스와 마케팅 페이지가 분리된 구조에서도 일관된 진입 경험을 유지했습니다.',
      'AI를 활용한 SEO 보강으로 노출 효율을 높이고 마케팅 작업 부담을 줄였습니다.',
    ],
    troubleshooting: [
      {
        problem:
          '운영 서비스와 별도 배포된 마케팅 페이지를 함께 관리해야 해 URL 구조와 배포 동선이 복잡해졌습니다.',
        solution:
          '페이지 맵과 rewrite 규칙을 명확히 분리해 운영 경로는 유지하면서도 배포 구조를 독립적으로 관리할 수 있게 했습니다.',
      },
    ],
    outcomes: ['팀 내 마케팅 업무 10% 감소', '마케팅 유입 7% 상승'],
  },
  {
    type: 'fe',
    slug: 'zendesk-request-integration',
    company: 'Tidesquare',
    title: '고객센터 Zendesk 주요 요청 API 연동',
    summary:
      '운영 회원 데이터를 기반으로 고객센터 요청 프로세스를 연결하고, HTML + JavaScript 중심 레거시 화면을 정리한 프로젝트입니다.',
    period: '2025.05 - 2025.08',
    teamSize: 'Frontend 1명, 기획 1명, Backend 1명 협업',
    skills: [
      'JavaScript',
      'API Integration',
      'Refactoring',
      'Componentization',
    ],
    image: '/images/portpolio/kisdi.jpg',
    body: [
      '기존 운영 유저 데이터를 확인한 뒤 요청 프로세스로 이동하는 흐름을 개발하고, Zendesk 화면에서 주요 회원 정보를 함께 활용할 수 있게 했습니다.',
      '레거시 HTML + JavaScript 소스를 함수형 인터페이스와 공통 컴포넌트 단위로 재정리해 관리 포인트를 줄였습니다.',
      '반복되는 코드와 화면별 편차를 줄여 운영 이슈 대응 속도를 높였습니다.',
    ],
    troubleshooting: [
      {
        problem:
          'HTML과 JavaScript가 뒤섞인 대규모 운영 코드가 누적되어 작은 수정도 영향 범위를 파악하기 어려웠습니다.',
        solution:
          '표준 함수형 인터페이스로 역할을 구분하고 공통 컴포넌트 구조를 도입해 재사용성과 가독성을 높였습니다.',
      },
    ],
    outcomes: [
      '로딩 속도 1.2초 감소',
      '소스 코드 7000줄 감소',
      '회원 데이터 연동 기반 확보',
    ],
  },
  {
    type: 'fe',
    slug: 'daum-page-build',
    company: 'Tidesquare',
    title: 'Daum 전용 페이지 구축',
    summary:
      '다음 가이드에 맞춘 전용 메인 페이지를 구축하면서 다크 모드와 공통 카드 컴포넌트 체계를 함께 정리한 프로젝트입니다.',
    period: '2025.03 - 2025.04',
    teamSize: 'Frontend 1명, 기획 1명 협업',
    skills: ['React', 'Tailwind CSS', 'Radix UI', 'Dark Mode'],
    image: '/images/portpolio/kt.jpg',
    body: [
      '다음 전용 메인 페이지를 가이드 기준에 맞춰 새로 구축하고 다크 모드를 함께 적용했습니다.',
      'module.css 기반으로 분산되어 있던 카드 컴포넌트들을 Radix와 Tailwind 중심의 공통 컴포넌트로 재구성했습니다.',
      'props 분기 구조를 적용해 카드 유형을 한 컴포넌트에서 제어할 수 있도록 정리했습니다.',
    ],
    troubleshooting: [
      {
        problem:
          '기존 카드 UI가 module.css에 강하게 묶여 있어 화면별로 중복 정의가 많고 관리 비용이 높았습니다.',
        solution:
          '공통 카드 컴포넌트를 새로 만들고 타입을 props로 받아 분기하도록 정리해 구조를 단순화했습니다.',
      },
    ],
    outcomes: [
      '관련 컴포넌트 개수 60% 감소',
      '다크 모드 대응과 유지보수성 동시 확보',
    ],
  },
  {
    type: 'fe',
    slug: 'package-estimate-board',
    company: 'Tidesquare',
    title: '패키지 견적문의 게시판 작업',
    summary:
      '투어비스 내 패키지 상품 견적 문의를 위한 별도 게시판을 구축하고, 회원/비회원 흐름을 함께 정리한 프로젝트입니다.',
    period: '2025.12 - 2026.01',
    teamSize: 'Frontend 1명, 기획 1명 협업',
    skills: ['Next.js', 'React', 'TypeScript', 'Form UX'],
    image: '/images/portpolio/neighbor.jpg',
    body: [
      '패키지 상품 견적 안내를 위한 별도 게시판 화면과 입력 흐름을 구현했습니다.',
      '회원 여부를 확인하고, 비회원일 경우 비밀번호를 설정할 수 있도록 분기 처리했습니다.',
      '운영 서비스 안에서 문의 흐름이 자연스럽게 이어지도록 UI와 상태 흐름을 정리했습니다.',
    ],
    troubleshooting: [
      {
        problem:
          '회원과 비회원의 접근 방식이 달라 입력 항목과 인증 흐름을 한 화면에서 자연스럽게 구성해야 했습니다.',
        solution:
          '회원 체크 기준으로 입력 흐름을 분리하고, 비회원 전용 비밀번호 설정 단계를 명확하게 노출해 사용성을 유지했습니다.',
      },
    ],
    outcomes: [
      '패키지 견적 문의 전용 플로우 구축',
      '회원/비회원 입력 분기 명확화',
    ],
  },
  {
    type: 'fe',
    slug: 'airspot-backoffice-ui-backup',
    company: 'Tidesquare',
    title: 'airspot 백오피스 리뉴얼 UI/UX 개발 백업',
    summary:
      '기존 플러그인 중심 구조로 깨져 있던 백오피스 레이아웃을 서비스 환경에 맞게 안정화한 UI 개선 프로젝트입니다.',
    period: '2024.03 - 2024.05',
    teamSize: 'Frontend 1명',
    skills: ['React', 'module.css', 'Responsive UI', 'Admin'],
    image: '/images/portpolio/smart.jpg',
    body: [
      '기존 작업자가 적용한 마테리얼 플러그인 구조를 검토하고 백오피스 사용 흐름에 맞게 컴포넌트를 수정했습니다.',
      '반응형 구조였지만 PC에서도 모바일 레이아웃이 노출되던 문제를 레이아웃 기준으로 재정비했습니다.',
      '영향 범위를 최소화하기 위해 디바이스 기준 분기와 별도 module.css를 활용해 화면을 안정화했습니다.',
    ],
    troubleshooting: [
      {
        problem:
          '플러그인 가이드와 실제 백오피스 구조가 맞지 않아 레이아웃이 전체적으로 무너지고 있었습니다.',
        solution:
          '디바이스 기준으로 화면을 다시 분리하고, 관련 module.css를 별도 관리해 다른 컴포넌트에 영향 없이 수정했습니다.',
      },
    ],
    outcomes: [
      '깨진 백오피스 레이아웃 안정화',
      '최소한의 CSS 증가로 UI/UX 복구',
    ],
  },
  {
    type: 'fe',
    slug: 'tourvis-mypage-renewal',
    company: 'Tidesquare',
    title: '투어비스 마이페이지 리뉴얼 퍼블리싱 및 FE 개발',
    summary:
      '마이페이지 주요 영역을 리뉴얼하면서 내여행, 쿠폰함, 이용권 페이지의 사용 흐름을 개선한 프로젝트입니다.',
    period: '2023.08 - 2023.10',
    teamSize: 'Frontend 1명, 기획 1명, 디자인 1명 협업',
    skills: ['React', 'Next.js', 'Responsive UI', 'Publishing'],
    image: '/images/portpolio/kisdi.jpg',
    body: [
      '내여행, 쿠폰함 영역을 리뉴얼하면서 사용자가 주요 정보를 더 쉽게 확인할 수 있도록 화면을 정리했습니다.',
      '투어비스 이용권 페이지를 새로 개발해 서비스 맥락 안에서 자연스럽게 연결되도록 구성했습니다.',
      '기존 퍼블리싱 구조와 FE 개발을 함께 다루며 운영 환경에 맞는 화면 품질을 높였습니다.',
    ],
    troubleshooting: [
      {
        problem:
          '마이페이지는 정보 구조가 복잡해 작은 UI 변경도 여러 사용자 흐름에 영향을 줄 수 있었습니다.',
        solution:
          '핵심 사용 시나리오를 기준으로 화면을 정리하고, 리뉴얼 범위를 주요 영역 중심으로 나누어 안정적으로 적용했습니다.',
      },
    ],
    outcomes: ['내여행/쿠폰함 주요 화면 리뉴얼', '이용권 페이지 신규 개발'],
  },
  {
    type: 'fe',
    slug: 'publishing-team-gulp-automation',
    company: 'Tidesquare',
    title: '퍼블리싱 팀 Gulp 자동화',
    summary:
      '퍼블리싱 작업 환경을 모듈형으로 재구성해 반복 작업과 중복 소스를 줄인 내부 자동화 프로젝트입니다.',
    period: '2023.08 - 2023.10',
    teamSize: 'Frontend 1명',
    skills: ['Node.js', 'Gulp', 'SCSS', 'Workflow Automation'],
    image: '/images/portpolio/neighbor.jpg',
    body: [
      'Node.js 기반 Gulp를 도입해 퍼블리싱 산출물을 모듈형으로 관리할 수 있는 작업 환경을 만들었습니다.',
      '반복되는 퍼블리싱 작업을 자동화하고 공통 구조를 정리해 팀 전체 작업 효율을 높였습니다.',
      '개발 방식처럼 구조화된 작업 흐름을 도입해 중복 요소와 수작업을 줄였습니다.',
    ],
    troubleshooting: [
      {
        problem:
          '기존 퍼블리싱 작업은 반복 입력과 중복 소스가 많아 속도와 품질 모두에서 비효율이 누적되고 있었습니다.',
        solution:
          '모듈형 Gulp 파이프라인을 도입해 공통 규칙을 정리하고, 반복 작업을 자동화하는 구조로 전환했습니다.',
      },
    ],
    outcomes: [
      '업무 속도 30% 감소',
      '중복 소스 에러 100% 감소',
      '모듈형 작업 환경 기반 마련',
    ],
  },
  {
    type: 'fe',
    slug: 'tourvis-common-rerenewal',
    company: 'Tidesquare',
    title: '투어비스 공통 재리뉴얼 퍼블리싱 및 FE 개발',
    summary:
      '사용자 연령층과 고객센터 문의 패턴을 반영해 PC 친화적인 공통 화면을 재정비한 서비스 개선 프로젝트입니다.',
    period: '2023.06 - 2023.09',
    teamSize: 'Frontend 1명, 기획 1명, 디자인 1명 협업',
    skills: ['React', 'Responsive UI', 'UI/UX', 'Publishing'],
    image: '/images/portpolio/smart.jpg',
    body: [
      'PC 사용자의 고객센터 문의 흐름을 고려해 더 읽기 쉽고 사용하기 쉬운 공통 화면을 구성했습니다.',
      '사용자 연령층에 맞춘 UI/UX 변화를 반영해 PC 친화적인 레이아웃과 정보 배치를 정리했습니다.',
      '오마카세, 배너 등 광고 요소가 자연스럽게 들어갈 수 있도록 화면 구성을 함께 조정했습니다.',
    ],
    troubleshooting: [
      {
        problem:
          '공통 화면은 다양한 서비스 영역과 연결되어 있어 작은 개편도 사용자 경험 전반에 영향을 줄 수 있었습니다.',
        solution:
          '고객센터 문의 패턴과 주요 사용층을 기준으로 우선순위를 정리하고, PC 중심의 가독성과 배치 개선에 집중했습니다.',
      },
    ],
    outcomes: [
      'PC 친화적 공통 화면 정비',
      '광고 요소와 서비스 정보 배치 최적화',
    ],
  },
];

interface PublishSheetRow {
  Type: string;
  Image: string;
  Title: string;
  Text: string;
  Skill: string;
  Percent: string;
  Link: string;
  Date: string;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizePublishType(value: string): ProjectType {
  return value.toLowerCase().includes('fe') ? 'fe' : 'publish';
}

function normalizePublishPeriod(period: string) {
  const normalized = period.replace(/[~–—]/g, '-');
  const matches = [...normalized.matchAll(/(\d{4})(?:\.(\d{1,2}))?/g)].map(
    (match) => {
      const year = match[1];
      const month = String(Number(match[2] ?? '1')).padStart(2, '0');

      return `${year}.${month}`;
    },
  );

  if (!matches.length) {
    return period.trim();
  }

  if (matches.length === 1 || matches[0] === matches[matches.length - 1]) {
    return matches[0];
  }

  return `${matches[0]} - ${matches[matches.length - 1]}`;
}

export function mapPublishSheetRow(row: PublishSheetRow): PublishProjectItem {
  const normalizedPeriod = normalizePublishPeriod(row.Date);

  return {
    type: 'publish',
    slug: slugify(`${row.Title}-${row.Date}`),
    company: '퍼블리싱',
    title: row.Title,
    summary: row.Text,
    period: normalizedPeriod,
    skills: row.Skill.split(/[,/]/)
      .map((item) => item.trim())
      .filter(Boolean),
    image: `/images/portpolio/${row.Image}.jpg`,
    contribution: row.Percent ? `${row.Percent}%` : 'N/A',
    externalUrl: row.Link || undefined,
    dateLabel: normalizedPeriod,
  };
}

function parsePublishPeriodValue(period: string, position: 'start' | 'end') {
  const normalized = period.replace(/[~–—]/g, '-');
  const matches = [...normalized.matchAll(/(\d{4})(?:\.(\d{1,2}))?/g)].map(
    (match) => {
      const year = Number(match[1]);
      const month = match[2] ? Number(match[2]) : position === 'start' ? 1 : 12;

      return year * 100 + month;
    },
  );

  if (!matches.length) {
    return 0;
  }

  return position === 'start' ? matches[0] : matches[matches.length - 1];
}

export function sortPublishProjects(projects: PublishProjectItem[]) {
  return [...projects].sort((a, b) => {
    const endDiff =
      parsePublishPeriodValue(b.period, 'end') -
      parsePublishPeriodValue(a.period, 'end');

    if (endDiff !== 0) {
      return endDiff;
    }

    const startDiff =
      parsePublishPeriodValue(b.period, 'start') -
      parsePublishPeriodValue(a.period, 'start');

    if (startDiff !== 0) {
      return startDiff;
    }

    return b.title.localeCompare(a.title, 'ko');
  });
}

export async function getPublishProjects(): Promise<PublishProjectItem[]> {
  try {
    const response = await fetch(PUBLISH_SHEET_URL, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return [];
    }

    const rows = (await response.json()) as PublishSheetRow[];

    return sortPublishProjects(
      rows
        .filter((row) => normalizePublishType(row.Type) === 'publish')
        .map(mapPublishSheetRow),
    );
  } catch {
    return [];
  }
}

export async function getPortfolioProjects(): Promise<ProjectItem[]> {
  const publishProjects = await getPublishProjects();

  return [...feProjects, ...publishProjects];
}

export async function getFeaturedProjects(
  type: ProjectType,
  limit = 4,
): Promise<ProjectItem[]> {
  if (type === 'fe') {
    return feProjects.slice(0, limit);
  }

  const publishProjects = await getPublishProjects();
  return publishProjects.slice(0, limit);
}

export async function getProjectsByType(
  type: ProjectType,
): Promise<ProjectItem[]> {
  if (type === 'fe') {
    return feProjects;
  }

  return getPublishProjects();
}

export async function getProjectDetail(
  type: ProjectType,
  slug: string,
): Promise<ProjectItem | null> {
  const projects = await getProjectsByType(type);
  return projects.find((project) => project.slug === slug) ?? null;
}

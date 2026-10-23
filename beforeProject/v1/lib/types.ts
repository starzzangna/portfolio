export type ProjectType = 'fe' | 'publish';

export interface Profile {
  name: string;
  englishName: string;
  role: string;
  intro: string;
  email: string;
  github: string;
  location: string;
  image: string;
}

export interface Strength {
  title: string;
  description: string;
  icon: 'layout' | 'sparkles' | 'users';
  /** 강점을 실제로 적용한 대표 프로젝트 */
  evidence: {
    label: string;
    href: string;
  };
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface CareerDetailGroup {
  title: string;
  items: string[];
}

export interface CareerItem {
  role: string;
  company: string;
  period: string;
  summary: string;
  skills?: string[];
  responsibilities: CareerDetailGroup[];
}

export interface TroubleshootingItem {
  problem: string;
  solution: string;
}

export interface ProjectGalleryImage {
  src: string;
  alt?: string;
}

interface BaseProjectItem {
  type: ProjectType;
  slug: string;
  company: string;
  title: string;
  summary: string;
  period: string;
  skills: string[];
  image: string;
}

export interface FeProjectItem extends BaseProjectItem {
  type: 'fe';
  teamSize: string;
  body: string[];
  troubleshooting: TroubleshootingItem[];
  outcomes: string[];
  /** 상세 페이지 썸네일·라이트박스 갤러리 (선택) */
  detailGallery?: ProjectGalleryImage[];
  detailGalleryHeading?: string;
  /** 현재 미사용 등 하단 안내 */
  note?: string;
}

export interface PublishProjectItem extends BaseProjectItem {
  type: 'publish';
  contribution: string;
  externalUrl?: string;
  dateLabel: string;
}

export type ProjectItem = FeProjectItem | PublishProjectItem;

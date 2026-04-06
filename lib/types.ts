export type ProjectType = "fe" | "publish";

export interface Profile {
  name: string;
  englishName: string;
  role: string;
  intro: string;
  email: string;
  location: string;
  image: string;
}

export interface Strength {
  title: string;
  description: string;
  icon: "layout" | "sparkles" | "accessibility";
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
  responsibilities: CareerDetailGroup[];
}

export interface TroubleshootingItem {
  problem: string;
  solution: string;
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
  type: "fe";
  teamSize: string;
  body: string[];
  troubleshooting: TroubleshootingItem[];
  outcomes: string[];
}

export interface PublishProjectItem extends BaseProjectItem {
  type: "publish";
  contribution: string;
  externalUrl?: string;
  dateLabel: string;
}

export type ProjectItem = FeProjectItem | PublishProjectItem;


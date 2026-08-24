import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CareerResumeWorkbench } from '@/components/career-resume-workbench';
import { buildResumeSourceItems } from '@/lib/career-resume';
import { careers } from '@/lib/site-data';

export const metadata: Metadata = {
  title: '이력서 경력 초안',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function CareerResumeLabPage() {
  if (process.env.GITHUB_PAGES === '1') {
    notFound();
  }

  return <CareerResumeWorkbench sourceItems={buildResumeSourceItems(careers)} />;
}

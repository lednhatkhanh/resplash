import dynamic from 'next/dynamic';

export const DynamicSearchPageContent = dynamic<Record<string, unknown>>(
  () => import('./SearchPageContent').then((mod) => mod.SearchPageContent),
  { ssr: false },
);

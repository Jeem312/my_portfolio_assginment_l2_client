// app/dashboard/projects/page.tsx
"use client";

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ProjectsListDynamic = dynamic(
  () => import('@/components/features/public/Home/Projects/projectList'),
  {
    ssr: false,
    loading: () => (
      <div className="m-6">
        <div className="text-white text-center py-8">Loading projects...</div>
      </div>
    )
  }
);

export default function DashboardProjectsPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="m-6">
        <Suspense fallback={<div className="text-white text-center py-8">Loading dashboard projects...</div>}>
          <ProjectsListDynamic />
        </Suspense>
      </div>
    </div>
  );
}
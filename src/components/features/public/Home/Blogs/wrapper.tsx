// app/dashboard/blogs/page.tsx
"use client";

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const BlogsList = dynamic(() => import('@/components/features/public/Home/Blogs/BlogList'), {
  ssr: false,
  loading: () => <div>Loading blogs...</div>
});

export default function BlogsClient() {
  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Suspense fallback={<div>Loading blogs...</div>}>
          <BlogsList />
        </Suspense>
      </div>
    </main>
  );
}
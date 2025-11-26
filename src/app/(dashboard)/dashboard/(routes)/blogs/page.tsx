import BlogsList from "@/components/features/public/Home/Blogs/BlogList";

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <BlogsList />
      </div>
    </main>
  )
}

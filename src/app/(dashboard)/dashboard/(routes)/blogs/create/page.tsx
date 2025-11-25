import { BlogForm } from "@/components/Dashboard/blog-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Blog | Dashboard",
  description: "Create a new blog post",
}

export default function CreateBlogPage() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Create Blog Post</h1>
          <p className="text-gray-400">Write and publish a new blog post</p>
        </div>
        <BlogForm/>
      </div>
    </div>
  )
}

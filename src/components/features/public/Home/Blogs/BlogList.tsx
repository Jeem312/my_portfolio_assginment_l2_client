"use client"

import { useEffect, useState } from "react"
import type { Blog } from "@/types/blogs"
import { useRouter } from "next/navigation"
import { CalendarIcon } from "lucide-react"
import { getBlogs } from "@/actions/blogs"
import EditBlogModal from "./Modal"
export default function BlogsList() {
  const [blogs, setBlog] = useState<Blog[]>([])
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
  const [open, setOpen] = useState(false)

  const router = useRouter()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    const data = await getBlogs()
    setBlog(data)
  }

  const formatDate = (date: string | undefined) => {
    if (!date) return "Recently"
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="w-full text-white">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold tracking-wide">
          <span className="text-white/80">Latest</span> <span className="text-cyan-400">Blogs</span>
        </h1>

        <button
          onClick={() => router.push("/dashboard/blogs/create")}
          className="px-5 py-2 rounded-lg text-black font-semibold bg-cyan-400 hover:bg-cyan-300 transition-all shadow-md"
        >
          + Create Blog
        </button>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="
              bg-[#0d1117]
              rounded-2xl overflow-hidden
              border border-white/5
              shadow-xl
              hover:shadow-cyan-500/20
              hover:border-cyan-600/40
              transition-all duration-300
              flex flex-col
            "
          >
            {/* Thumbnail */}
            {blog.image && (
              <div className="relative h-48 overflow-hidden">
                <img src={blog.image || "/placeholder.svg"} className="w-full h-full object-cover" alt={blog.title} />

                <button
                  onClick={() => {
                    setSelectedBlog(blog)
                    setOpen(true)
                  }}
                  className="
                    absolute top-3 right-3
                    px-3 py-1 rounded-md
                    bg-cyan-600
                    text-white text-sm
                    shadow
                    hover:bg-cyan-500
                    transition
                  "
                >
                  Edit
                </button>
              </div>
            )}

          
          </div>
        ))}
      </div>

      {/* Empty State */}
      {blogs.length === 0 && (
        <div className="text-center py-20">
          <p className="text-white/50 text-lg mb-4">No blogs yet</p>
          <button
            onClick={() => router.push("/dashboard/create-blog")}
            className="px-6 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition"
          >
            Create Your First Blog
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {open && selectedBlog && (
        <EditBlogModal blog={selectedBlog} onClose={() => setOpen(false)} refresh={fetchBlogs} />
      )}
    </div>
  )
}

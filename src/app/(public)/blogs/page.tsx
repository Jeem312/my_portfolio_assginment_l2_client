import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight, ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import { getBlogs } from "@/actions/blogs"

export const metadata: Metadata = {
  title: "Blog | Portfolio",
  description: "Read my latest articles and insights on web development, programming, and technology.",
  openGraph: {
    title: "Blog | Portfolio",
    description: "Read my latest articles and insights on web development, programming, and technology.",
  },
}

export default async function BlogsPage() {
  const blogs = await getBlogs()

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#03081d" }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-cyan-400/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Home</span>
          </Link>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            Blog <span className="text-cyan-400">Articles</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl animate-fade-in-delay">
            Insights, tutorials, and thoughts on web development, programming, and technology.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No blog posts available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <Link
                key={blog._id}
                href={`/blogs/${blog._id}`}
                className="group"
                style={{
                  animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <article className="h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/20">
                  {/* Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-cyan-400/20 to-cyan-400/5">
                    {blog.image ? (
                      <Image
                       src={
    blog.image?.startsWith("http")
      ? blog.image
      : "https://i.ibb.co/6bq8TzF/default-thumb.jpg"
  }
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl font-bold text-cyan-400/20">{blog.title.charAt(0).toUpperCase()}</div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#03081d] via-transparent to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4 text-cyan-400" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        <span>
                          {new Date(blog.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>

                    {/* Excerpt */}
                    <div
                      className="text-gray-300 line-clamp-3 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: blog.content.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
                      }}
                    />

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-cyan-400 font-medium group-hover:gap-4 transition-all">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

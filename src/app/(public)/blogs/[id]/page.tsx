
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowLeft, ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getBlogs, getSingleBlog } from "@/actions/blogs"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const blog = await getSingleBlog(params.id)

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${blog.title} | Blog`,
    description: blog.content.replace(/<[^>]*>/g, "").substring(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.content.replace(/<[^>]*>/g, "").substring(0, 160),
      images: blog.image ? [blog.image] : [],
    },
  }
}

export default async function BlogDetailsPage({ params }: { params: { id: string } }) {
  const blog = await getSingleBlog(params.id)

  if (!blog) {
    notFound()
  }

  // Fetch other blogs for the slider (excluding current blog)
  const allBlogs = await getBlogs()
  const relatedBlogs = allBlogs.filter((b) => b._id !== blog._id).slice(0, 6)

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#03081d" }}>
      {/* Hero Section with Background Image */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        {blog.image ? (
          <>
            <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-[#03081d]/60 via-[#03081d]/80 to-[#03081d]"></div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-[#03081d] to-[#03081d]"></div>
        )}

        {/* Back Button */}
        <div className="absolute top-8 left-8 z-10">
          <Link
            href="/blogs"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Blogs</span>
          </Link>
        </div>

        {/* Blog Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-cyan-400" />
                <span className="font-medium">{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 sm:p-12">
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-bold
              prose-ul:text-gray-300 prose-ol:text-gray-300
              prose-li:text-gray-300
              prose-blockquote:border-l-cyan-400 prose-blockquote:text-gray-300
              prose-code:text-cyan-400 prose-code:bg-white/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-white/10 prose-pre:border prose-pre:border-white/10"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </div>

      {/* Related Blogs Slider */}
      {relatedBlogs.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              More <span className="text-cyan-400">Articles</span>
            </h2>
            <p className="text-gray-300 text-lg">Continue reading with these related posts</p>
          </div>

          {/* Horizontal Scrollable Container */}
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {relatedBlogs.map((relatedBlog, index) => (
                <Link
                  key={relatedBlog._id}
                  href={`/blogs/${relatedBlog._id}`}
                  className="group flex-shrink-0 w-80 snap-start"
                  style={{
                    animation: `slideInRight 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <article className="h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/20">
                    {/* Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-cyan-400/20 to-cyan-400/5">
                      {relatedBlog.image ? (
                        <Image
                          src={relatedBlog.image || "/placeholder.svg"}
                          alt={relatedBlog.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-6xl font-bold text-cyan-400/20">
                            {relatedBlog.title.charAt(0).toUpperCase()}
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#03081d] via-transparent to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      {/* Meta */}
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 text-cyan-400" />
                          <span>{relatedBlog.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-cyan-400" />
                          <span>
                            {new Date(relatedBlog.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {relatedBlog.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-300 line-clamp-2 text-sm">
                        {relatedBlog.content.replace(/<[^>]*>/g, "").substring(0, 100)}...
                      </p>

                      {/* Read More */}
                      <div className="flex items-center gap-2 text-cyan-400 font-medium text-sm group-hover:gap-3 transition-all">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-cyan-400 text-sm animate-bounce">
              <span>Scroll for more</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}


import { getProjects } from "@/actions/projects"
import { ExternalLink, Github, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export async function Projects() {
  const projects = await getProjects()

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#03081d" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-4">
            My <span className="text-cyan-400">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">Explore my latest work and creative solutions</p>
        </div>

        {/* Projects Grid - Redesigned cards with unique layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link
              href={`/projects/${project._id}`}
              key={project._id}
              className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:border-cyan-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-400/20 cursor-pointer"
              style={{
                animation: `slide-up 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Project Image with Overlay */}
              {project.thumbnail && (
                <div className="relative h-56 w-full overflow-hidden bg-gray-900">
                 <Image
  src={
    project.thumbnail?.startsWith("http")
      ? project.thumbnail
      : "https://i.ibb.co/6bq8TzF/default-thumb.jpg" 
  }
  alt={project.title}
  fill
  className="object-cover group-hover:scale-110 transition-transform duration-700"
/>
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03081d] via-[#03081d]/60 to-transparent"></div>

                  {/* Floating Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-400/20 backdrop-blur-md border border-cyan-400/30 rounded-full">
                    <span className="text-xs font-semibold text-cyan-400">Featured</span>
                  </div>
                </div>
              )}

              {/* Project Content */}
              <div className="p-6 space-y-4">
                {/* Title with Icon */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 flex-1">
                    {project.title}
                  </h3>
                  <ExternalLink className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{project.description}</p>

                {/* Features Tags */}
                {project.features && project.features.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1.5 bg-cyan-400/10 text-cyan-300 rounded-lg border border-cyan-400/20 font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                    {project.features.length > 3 && (
                      <span className="text-xs px-3 py-1.5 bg-white/5 text-gray-400 rounded-lg border border-white/10">
                        +{project.features.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Bottom Section - Links & Date */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    {project.liveLink && (
                      <div className="flex items-center gap-1.5 text-cyan-400 text-sm">
                        <ExternalLink className="w-4 h-4" />
                        <span className="font-medium">Live</span>
                      </div>
                    )}
                    {(project.githubClient || project.githubServer) && (
                      <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                        <Github className="w-4 h-4" />
                        <span className="font-medium">Code</span>
                      </div>
                    )}
                  </div>

                 
                </div>
              </div>

              {/* Animated Border Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-cyan-400/5 rounded-2xl"></div>
              </div>

              {/* Corner Accent */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No projects found. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  )
}

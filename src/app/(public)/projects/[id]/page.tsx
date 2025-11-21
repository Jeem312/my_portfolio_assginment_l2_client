
import { ExternalLink, Github, Calendar, ArrowLeft, Code2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getSingleProject } from "@/actions/projects"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    console.log(params.id);
  const project = await getSingleProject(params.id)

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    }
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : [],
    },
  }
}

export default async function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const project = await getSingleProject(params.id)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#03081d" }}>
      {/* Hero Section with Background Image */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        {project.image && (
          <>
          
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#03081d]/60 via-[#03081d]/80 to-[#03081d]"></div>
          </>
        )}

        {/* Back Button */}
        <div className="absolute top-8 left-8 z-10">
          <Link
            href="/#projects"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Projects</span>
          </Link>
        </div>

        {/* Project Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 animate-fade-in">
              {project.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-300">
              {project.createdAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <span>
                    {new Date(project.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Code2 className="w-8 h-8 text-cyan-400" />
                About This Project
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">{project.description}</p>
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="bg-gradient-to-br from-cyan-400/10 to-cyan-400/5 backdrop-blur-md border border-cyan-400/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-cyan-400/30 rounded-lg text-cyan-300 font-medium hover:bg-cyan-400/20 transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Links & Info */}
          <div className="space-y-6">
            {/* Live Demo */}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40 hover:scale-105"
              >
                <div className="flex items-center justify-center gap-3">
                  <ExternalLink className="w-5 h-5" />
                  <span>View Live Demo</span>
                </div>
              </a>
            )}

            {/* GitHub Links */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">Source Code</h3>

              {project.githubClient && (
                <a
                  href={project.githubClient}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 text-white py-3 px-4 rounded-lg transition-all"
                >
                  <Github className="w-5 h-5 text-cyan-400" />
                  <span className="font-medium">Client Repository</span>
                </a>
              )}

              {project.githubServer && (
                <a
                  href={project.githubServer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 text-white py-3 px-4 rounded-lg transition-all"
                >
                  <Github className="w-5 h-5 text-cyan-400" />
                  <span className="font-medium">Server Repository</span>
                </a>
              )}

              {!project.githubClient && !project.githubServer && (
                <p className="text-gray-400 text-sm">Source code not available</p>
              )}
            </div>

            {/* Project Info */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-3">
              <h3 className="text-xl font-bold text-white mb-4">Project Info</h3>

              {project.startDate && (
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-gray-400">Created</span>
                  <span className="text-white font-medium">
                    {new Date(project.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                  </span>
                </div>
              )}

              {project.endDate && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">Last Updated</span>
                  <span className="text-white font-medium">
                    {new Date(project.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

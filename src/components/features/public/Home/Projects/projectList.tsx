"use client"

import { useEffect, useState } from "react"
import type { Project } from "@/types/project"
import { useRouter } from "next/navigation"
import { ExternalLink } from "lucide-react"
import { getProjects } from "@/actions/projects"
import EditProjectModal from "./ProjectModal"
export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [open, setOpen] = useState(false)

  const router = useRouter()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const data = await getProjects()
    setProjects(data)
  }

  return (
    <div className="w-full text-white">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold tracking-wide">
          <span className="text-white/80">All</span> <span className="text-cyan-400">Projects</span>
        </h1>

        <button
          onClick={() => router.push("/dashboard/projects/create")}
          className="px-5 py-2 rounded-lg text-white font-semibold bg-cyan-400 hover:bg-cyan-300 transition-all shadow-md"
        >
          + Create Project
        </button>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project._id}
            className="
              bg-[#0d1117] 
              rounded-2xl overflow-hidden 
              border border-white/5
              shadow-xl
              hover:shadow-cyan-500/20 
              hover:border-cyan-600/40
              transition-all duration-300
            "
          >
            {/* Thumbnail */}
            <div className="relative">
              <img
                src={project.thumbnail || project.image}
                className="w-full h-48 object-cover rounded-t-2xl"
                alt={project.title}
              />

              <button
                onClick={() => {
                  setSelectedProject(project)
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

            {/* Info */}
            <div className="p-5">
              <h2 className="text-xl font-semibold text-white mb-2">{project.title}</h2>

              <p className="text-white/50 text-sm mb-3">{project.category || "Uncategorized"}</p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies?.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/5 text-cyan-300 text-xs rounded-full border border-cyan-400/20"
                  >
                    {tech}
                  </span>
                ))}

                {project.technologies && project.technologies.length > 3 && (
                  <span className="px-3 py-1 text-xs bg-white/5 text-white/40 rounded-full">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>

              {/* Links */}
              <div className="flex items-center gap-5 mt-2">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition"
                  >
                    Live <ExternalLink size={16} />
                  </a>
                )}

                {project.githubClient && (
                  <a
                    href={project.githubClient}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-white/60 hover:text-white transition"
                  >
                    Code
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {open && selectedProject && (
        <EditProjectModal project={selectedProject} onClose={() => setOpen(false)} refresh={fetchProjects} />
      )}
    </div>
  )
}

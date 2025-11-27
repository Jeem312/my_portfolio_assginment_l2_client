// src/app/(public)/projects/[id]/page.tsx
import type { Metadata } from "next"
import { getSingleProject } from "@/actions/projects"
import ProjectDetailsClient from "@/components/features/public/Home/Projects/ProjectDetails"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const project = await getSingleProject(id)

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

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getSingleProject(id)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#03081d" }}>
        <h1 className="text-3xl text-white">Project Not Found</h1>
      </div>
    )
  }

  return <ProjectDetailsClient project={project} />
}

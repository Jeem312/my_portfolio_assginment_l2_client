// app/projects/[id]/page.tsx
import { getSingleProject } from "@/actions/projects"
import ProjectDetailsClient from "@/components/features/public/Home/Projects/ProjectDetails"

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  // Await the params first
  const { id } = await params
  const project = await getSingleProject(id)
  
  if (!project) {
    return <div>Project not found</div>
  }

  return <ProjectDetailsClient project={project} />
}
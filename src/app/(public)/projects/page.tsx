import { getSingleProject } from "@/actions/projects"
import ProjectDetailsClient from "@/components/features/public/Home/Projects/ProjectDetails"

// Example usage in your page
export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getSingleProject(params.id)
  
  if (!project) {
    return <div>Project not found</div>
  }

  return <ProjectDetailsClient project={project} />
}
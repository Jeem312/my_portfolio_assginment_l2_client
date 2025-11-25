import { ProjectForm } from "@/components/Dashboard/project-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Project | Dashboard",
  description: "Add a new project to your portfolio",
}

export default function CreateProjectPage() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Create Project</h1>
          <p className="text-gray-400">Add a new project to your portfolio</p>
        </div>
        <ProjectForm />
      </div>
    </div>
  )
}

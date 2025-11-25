import { Project } from "@/types/project"
import axios from "axios"

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://portfolioassignment-alpha.vercel.app/api/v1"






export interface ApiResponse<T> {
  StatusCode: number
  success: boolean
  message: string
  data: T
  meta?: {
    total: number
  }
}

// 🔹 Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})


// ✅ Get a single project by ID
export const getSingleProject = async (id: string): Promise<Project | null> => {
  try {
    const { data } = await api.get<ApiResponse<Project>>(`/projects/${id}`)
    return data.data || null
  } catch (error: any) {
    console.error("[axios] Error fetching single project:", error?.response?.data || error)
    return null
  }
}

export const getProjects = async (): Promise<Project[]> => {
  try {
    const { data } = await api.get<ApiResponse<Project[]>>("/projects")
    return data.data || []
  } catch (error: any) {
    console.error("[axios] Error fetching projects:", error?.response?.data || error)
    return []
  }
}

// ✅ Create (POST) a new project
export const createProject = async (projectData: Project): Promise<Project | null> => {
  try {
    const { data } = await api.post<ApiResponse<Project>>("/projects", projectData)
    return data.data || null
  } catch (error: any) {
    console.error("[axios] Error creating project:", error?.response?.data || error)
    return null
  }
}

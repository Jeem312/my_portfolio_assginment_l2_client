import { Blog } from "@/types/blogs"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://portfolioassignment-alpha.vercel.app/api/v1"



export interface ApiResponse<T> {
  StatusCode: number
  success: boolean
  message: string
  data: T
  meta?: {
    total: number
  }
}


export async function getBlogs(): Promise<Blog[]> {
  try {
    const response = await fetch(`${BASE_URL}/blogs`, {
      next: { revalidate: 60 }, 
    })

    if (!response.ok) {
      throw new Error("Failed to fetch blogs")
    }

    const result: ApiResponse<Blog[]> = await response.json()
    return result.data || []
  } catch (error) {
    console.error("[v0] Error fetching blogs:", error)
    return []
  }
}
export async function getSingleBlog(id: string): Promise<Blog | null> {
  try {
    const response = await fetch(`${BASE_URL}/blogs/${id}`, {
      next: { revalidate: 60 }, 
    })  

    if (!response.ok) {
      throw new Error("Failed to fetch blog")
    }

    const result: ApiResponse<Blog> = await response.json()
    return result.data || null
  } catch (error) {
    console.error("[v0] Error fetching blog:", error)
    return null
  }
}
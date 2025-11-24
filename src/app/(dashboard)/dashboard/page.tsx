import type { Metadata } from "next"
import { DashboardStats } from "@/components/Dashboard/dashboard-stats"
export const metadata: Metadata = {
  title: "Dashboard | Shanjida Jahan Jeem",
  description: "Admin dashboard for managing blogs and projects",
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Manage your portfolio content</p>
        </div>
        <DashboardStats />
      </div>
    </div>
  )
}

import type React from "react"
import { DashboardSidebar } from "@/components/Dashboard/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#03081d" }}>
      <DashboardSidebar />
      <main className="flex-1 lg:ml-64">{children}</main>
    </div>
  )
}

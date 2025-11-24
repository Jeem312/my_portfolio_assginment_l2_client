"use client"
import { FileText, FolderKanban, Eye, TrendingUp } from "lucide-react"

export function DashboardStats() {
  const stats = [
    { label: "Total Blogs", value: "12", icon: FileText, color: "cyan" },
    { label: "Total Projects", value: "8", icon: FolderKanban, color: "blue" },
    { label: "Total Views", value: "1.2K", icon: Eye, color: "purple" },
    { label: "Growth", value: "+23%", icon: TrendingUp, color: "green" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-full bg-${stat.color}-500/20 flex items-center justify-center`}>
                <Icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
              <span className="text-2xl font-bold text-white">{stat.value}</span>
            </div>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        )
      })}
    </div>
  )
}

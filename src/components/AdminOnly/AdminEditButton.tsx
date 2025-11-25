// src/components/AdminOnly/AdminEditButton.tsx
"use client"

import Link from "next/link"
import { Edit } from "lucide-react"
import { isAdminFromAccess } from "@/lib/admin"

export function AdminEditButton({ id, href }: { id: string; href: string }) {
  // সরাসরি call করুন (useEffect ছাড়া)
  const { isAdmin } = isAdminFromAccess()
  
  console.log("AdminEditButton - Direct isAdmin:", isAdmin)

  if (!isAdmin) {
    console.log("User is not admin, hiding edit button")
    return null
  }

  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 bg-cyan-400/20 hover:bg-cyan-400/30 border border-cyan-400/50 hover:border-cyan-400 rounded-lg text-cyan-400 transition-all"
    >
      <Edit className="w-4 h-4" />
      <span className="font-medium">Edit</span>
    </Link>
  )
}
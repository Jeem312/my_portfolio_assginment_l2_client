"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Navbar() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "backdrop-blur-md bg-transparent border-b border-blue-100" 
        : "bg-[#020511] border-b border-blue-900"
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-2xl font-bold text-white">Shanjida</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-blue-200 hover:text-white font-medium transition-colors">
            About
          </Link>
          <Link href="#projects" className="text-blue-200 hover:text-white font-medium transition-colors">
            Projects
          </Link>
          <Link href="#blog" className="text-blue-200 hover:text-white font-medium transition-colors">
            Blog
          </Link>
          <Link href="#contact" className="text-blue-200 hover:text-white font-medium transition-colors">
            Contact
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => router.push("/login")}
            className="text-blue-200 hover:text-white hover:bg-blue-900/30"
          >
            Sign In
          </Button>
          <Button
            onClick={() => router.push("/register")}
            className="bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/30"
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  )
}
"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { Menu } from "lucide-react"

export default function Navbar() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { data: session } = useSession()

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
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" ><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-white font-bold text-xl">S</span>
          </div></Link>
        <Link href="/" >  <span className="text-2xl font-bold text-white">Shanjida</span></Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-blue-200 hover:text-white font-medium transition-colors">About</Link>
          <Link href="/projects" className="text-blue-200 hover:text-white font-medium transition-colors">Projects</Link>
          <Link href="/blogs" className="text-blue-200 hover:text-white font-medium transition-colors">Blog</Link>
          <Link href="#contact" className="text-blue-200 hover:text-white font-medium transition-colors">Contact</Link>
        </div>

        {/* Desktop Login/Logout */}
        <div className="hidden md:flex items-center gap-3">
          {!session ? (
            <>
              <Button
                variant="ghost"
                onClick={() => router.push("/login")}
                className="text-blue-200 hover:text-white hover:bg-blue-900/30"
              >
                Sign In
              </Button>
             
            </>
          ) : (
            <Button
              variant="ghost"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-blue-200 hover:text-white hover:bg-blue-900/30"
            >
              Log Out
            </Button>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-blue-200 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-[#020511] border border-blue-900 rounded-lg shadow-lg py-2 flex flex-col gap-2 z-50">
              <Link href="#about" className="px-4 py-2 text-blue-200 hover:text-white">About</Link>
              <Link href="#projects" className="px-4 py-2 text-blue-200 hover:text-white">Projects</Link>
              <Link href="#blog" className="px-4 py-2 text-blue-200 hover:text-white">Blog</Link>
              <Link href="#contact" className="px-4 py-2 text-blue-200 hover:text-white">Contact</Link>
              <hr className="border-blue-700 mx-2" />
              {!session ? (
                <>
                  <button onClick={() => router.push("/login")} className="px-4 py-2 text-blue-200 hover:text-white text-left">
                    Sign In
                  </button>
                  <button onClick={() => router.push("/register")} className="px-4 py-2 text-blue-200 hover:text-white text-left">
                    Get Started
                  </button>
                </>
              ) : (
                <button onClick={() => signOut({ callbackUrl: "/" })} className="px-4 py-2 text-blue-200 hover:text-white text-left">
                  Log Out
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { Menu, User } from "lucide-react"
import { logout } from "@/actions/auth"
import { isAdminFromAccess } from "@/lib/admin"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileDropdown, setProfileDropdown] = useState(false)
  const { data: session, status } = useSession()

  const { isAdmin } = isAdminFromAccess()
  console.log("Navbar isAdmin:", isAdmin)

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll lock for mobile menu
  useEffect(() => {
    document.body.style.overflow = menuOpen || profileDropdown ? "hidden" : "unset"
    return () => { document.body.style.overflow = "unset" }
  }, [menuOpen, profileDropdown])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".profile-dropdown") && !target.closest(".profile-button")) {
        setProfileDropdown(false)
      }
      if (!target.closest(".mobile-menu") && !target.closest(".menu-button")) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

const handleLogout = async () => {
  try {
    // 1️⃣ Clear NextAuth session
    await signOut({ redirect: false });

    // 2️⃣ Clear custom accessToken cookie
    document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // 3️⃣ Redirect to home
    window.location.href = "/";
  } catch (error) {
    console.error("Logout failed:", error);
    alert("Logout failed. Please try again.");
  }

  // Close profile dropdown if open
  setProfileDropdown(false);
};

  const handleDashboard = () => {
    router.push("/dashboard")
    setProfileDropdown(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md bg-black/80 border-b border-blue-100/20"
          : "bg-[#020511] border-b border-blue-900/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" onClick={() => { setMenuOpen(false); setProfileDropdown(false) }}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-bold text-xl">S</span>
            </div>
          </Link>
          <Link href="/" onClick={() => { setMenuOpen(false); setProfileDropdown(false) }}>
            <span className="text-2xl font-bold text-white">Shanjida</span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-blue-200 hover:text-white font-medium transition-colors" onClick={() => setProfileDropdown(false)}>About</Link>
          <Link href="/projects" className="text-blue-200 hover:text-white font-medium transition-colors" onClick={() => setProfileDropdown(false)}>Projects</Link>
          <Link href="/blogs" className="text-blue-200 hover:text-white font-medium transition-colors" onClick={() => setProfileDropdown(false)}>Blog</Link>
          <Link href="#contact" className="text-blue-200 hover:text-white font-medium transition-colors" onClick={() => setProfileDropdown(false)}>Contact</Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAdmin ? (
            <div className="relative profile-dropdown">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="profile-button flex items-center gap-2 p-2 rounded-lg hover:bg-blue-900/30 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-blue-200 font-medium">Admin</span>
              </button>

              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-[#020511] border border-blue-900 rounded-lg shadow-lg py-2 flex flex-col z-50">
                  <button
                    onClick={handleDashboard}
                    className="px-4 py-2 text-blue-200 hover:text-white hover:bg-blue-900/30 text-left flex items-center gap-2 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-blue-200 hover:text-white hover:bg-blue-900/30 text-left flex items-center gap-2 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              variant="ghost"
              onClick={() => router.push("/login")}
              className="text-blue-200 hover:text-white hover:bg-blue-900/30"
            >
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden relative mobile-menu">
          <button onClick={() => setMenuOpen(!menuOpen)} className="menu-button text-blue-200 hover:text-white p-2">
            <Menu className="w-6 h-6" />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 mt-2 w-64 bg-[#020511] border border-blue-900 rounded-lg shadow-lg py-3 flex flex-col gap-1 z-50">

                {/* Mobile Links */}
                <Link href="#about" className="px-4 py-3 text-blue-200 hover:text-white hover:bg-blue-900/30 transition-colors" onClick={() => setMenuOpen(false)}>About</Link>
                <Link href="/projects" className="px-4 py-3 text-blue-200 hover:text-white hover:bg-blue-900/30 transition-colors" onClick={() => setMenuOpen(false)}>Projects</Link>
                <Link href="/blogs" className="px-4 py-3 text-blue-200 hover:text-white hover:bg-blue-900/30 transition-colors" onClick={() => setMenuOpen(false)}>Blog</Link>
                <Link href="#contact" className="px-4 py-3 text-blue-200 hover:text-white hover:bg-blue-900/30 transition-colors" onClick={() => setMenuOpen(false)}>Contact</Link>

                <hr className="border-blue-700 mx-4 my-2" />

                {isAdmin ? (
                  <>
                    <button onClick={handleDashboard} className="px-4 py-3 text-blue-200 hover:text-white hover:bg-blue-900/30 text-left transition-colors">Dashboard</button>
                    <button onClick={handleLogout} className="px-4 py-3 text-blue-200 hover:text-white hover:bg-blue-900/30 text-left transition-colors">Log Out</button>
                  </>
                ) : (
                  <button onClick={() => { router.push("/login"); setMenuOpen(false) }} className="px-4 py-3 text-blue-200 hover:text-white hover:bg-blue-900/30 text-left transition-colors">Sign In</button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

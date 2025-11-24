"use client"

import Link from "next/link"
import { Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#03081d] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 leading-none animate-fade-in">
            404
          </h1>
        </div>

        {/* Error message box */}
        <div className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 mb-8 animate-slide-in-bottom">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Search className="w-6 h-6 text-cyan-400" />
            <h2 className="text-3xl font-bold text-white">Page Not Found</h2>
          </div>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Oops! The page you're looking for seems to have wandered off into the digital void. Don't worry, even the
            best explorers get lost sometimes.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          </div>
        </div>

        {/* Helpful links */}
        <div className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10 animate-slide-in-bottom animation-delay-200">
          <p className="text-sm text-gray-400 mb-4">You might be interested in:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/projects"
              className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/blogs"
              className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
            >
              Blogs
            </Link>
            <Link
              href="/#contact"
              className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Fun fact */}
        <p className="mt-8 text-gray-500 text-sm italic">
          Fun fact: HTTP 404 errors have been around since 1992. You're part of internet history!
        </p>
      </div>
    </div>
  )
}

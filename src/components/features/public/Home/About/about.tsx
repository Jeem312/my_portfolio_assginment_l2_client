"use client"
import { Code2, Sparkles, Rocket, Heart } from "lucide-react"

export function About() {
  return (
    <section id="about" className="relative py-24 overflow-hidden" style={{ backgroundColor: "#03081d" }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-cyan-400">Me</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Passionate developer crafting innovative solutions with modern technologies
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Main About */}
          <div className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 animate-slide-in-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Who I Am</h3>
            </div>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Hi! Im <span className="text-cyan-400 font-semibold">Shanjida Jahan Jeem</span>, a passionate Full
                Stack Developer specializing in building exceptional digital experiences. I love turning complex
                problems into simple, beautiful, and intuitive solutions.
              </p>
              <p>
                With expertise in modern web technologies like React, Next.js, and Node.js, I create scalable
                applications that make a difference. My journey in web development has been driven by curiosity and a
                constant desire to learn and grow.
              </p>
              <p>
                When Im not coding, youll find me exploring new technologies, contributing to open-source projects, or
                sharing knowledge with the developer community.
              </p>
            </div>
          </div>

          {/* Right Column - Cards */}
          <div className="space-y-6">
            {/* What I Do */}
            <div className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 animate-slide-in-right animation-delay-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white">What I Do</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Full-stack web application development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>RESTful API design and implementation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Database architecture and optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>Responsive UI/UX development</span>
                </li>
              </ul>
            </div>

            {/* My Approach */}
            <div className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 animate-slide-in-right animation-delay-400">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white">My Approach</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                I believe in writing clean, maintainable code and following best practices. Every project is an
                opportunity to create something meaningful that solves real problems and delivers value.
              </p>
            </div>

            {/* Passion */}
            <div className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 animate-slide-in-right animation-delay-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white">My Passion</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Building products that people love to use. Im passionate about creating seamless user experiences and
                writing code thats both elegant and efficient.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

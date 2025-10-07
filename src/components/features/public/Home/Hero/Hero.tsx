"use client"
import { Github, Linkedin, Mail } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ocean background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://i.ibb.co/XrFYnzRY/hero-bg.jpg')",
        }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Gradient accents */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-600/10"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12 animate-slide-in-left">
          <div className="inline-flex items-center gap-3 backdrop-blur-xl bg-white/10 px-6 py-3 rounded-full border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-200 font-medium">Available for new projects</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - slides in from left */}
          <div className="space-y-8 animate-slide-in-left animation-delay-200">
            {/* Name and title box */}
            <div className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="text-xs uppercase tracking-widest text-cyan-400 font-semibold">
                    Full Stack Developer
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                  Shanjida Jahan
                  <span className="block text-cyan-400 mt-2">Jeem</span>
                </h1>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Crafting beautiful digital experiences at the intersection of design and code
                </p>
              </div>
            </div>
          </div>

          {/* Right side - slides in from right */}
          <div className="space-y-8 animate-slide-in-right animation-delay-400">
            <div className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Technical Skills</h2>

              <div className="space-y-6">
                {/* Frontend */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-3">Frontend</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "TypeScript"].map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Backend */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-3">Backend</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", "Express.js"].map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Database */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-3">Database</h3>
                  <div className="flex flex-wrap gap-2">
                    {["PostgreSQL", "MongoDB", "SQL", "Prisma", "Mongoose"].map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact box */}
            <div className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Connect with me</span>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-cyan-500/20 border border-white/20 hover:border-cyan-500/50 flex items-center justify-center transition-all duration-300"
                  >
                    <Github className="w-5 h-5 text-gray-300" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-cyan-500/20 border border-white/20 hover:border-cyan-500/50 flex items-center justify-center transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5 text-gray-300" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-cyan-500/20 border border-white/20 hover:border-cyan-500/50 flex items-center justify-center transition-all duration-300"
                  >
                    <Mail className="w-5 h-5 text-gray-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center animate-slide-in-bottom animation-delay-600">
          <div className="backdrop-blur-xl bg-white/5 px-6 py-3 rounded-full border border-white/10 flex items-center gap-3">
            <span className="text-sm text-gray-300 uppercase tracking-wider">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-cyan-400/50 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

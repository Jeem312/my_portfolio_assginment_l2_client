"use client"
import { GraduationCap, Calendar, Award } from "lucide-react"

export function Education() {
  const education = [
    {
      degree: "Honors in Economics",
      institution: "University",
      period: "Currently Pursuing",
      description:
        "Gaining deep understanding of economic theories and quantitative methods while developing analytical and critical thinking skills.",
      highlights: ["Economic Theory", "Quantitative Methods", "Data Analysis", "Research Methods"],
    },
    {
      degree: "Junior Web Development Course",
      institution: "Programming Hero (Online)",
      period: "Completed",
      description: "Comprehensive program covering modern web development technologies and best practices.",
      highlights: ["HTML5 & CSS3", "JavaScript & React.js", "MongoDB & Firebase", "Full-Stack Development"],
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Nawab Habibulla Model School and College",
      period: "Completed",
      description:
        "Enhanced analytical abilities and prepared for higher education with excellent academic results in science background.",
      highlights: ["Mathematics", "Physics", "Chemistry", "English"],
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "Sataish School and College",
      period: "Completed",
      description: "Completed SSC with strong academic performance, building a solid foundation for higher education.",
      highlights: ["Science", "Mathematics", "English", "General Studies"],
    },
  ]

  return (
    <section id="education" className="relative py-24 overflow-hidden" style={{ backgroundColor: "#03081d" }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-20 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-cyan-400">Education</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Academic journey and qualifications that shaped my career
          </p>
        </div>

        {/* Education Timeline */}
        <div className="max-w-4xl mx-auto space-y-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 animate-slide-in-left"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  {edu.degree.includes("Honors") ? (
                    <Award className="w-7 h-7 text-cyan-400" />
                  ) : (
                    <GraduationCap className="w-7 h-7 text-cyan-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                  <p className="text-cyan-400 font-semibold text-lg mb-3">{edu.institution}</p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      <span>{edu.period}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed mb-6">{edu.description}</p>

              {/* Highlights */}
              <div>
                <h4 className="text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-3">Key Subjects</h4>
                <div className="flex flex-wrap gap-2">
                  {edu.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-cyan-500/10 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

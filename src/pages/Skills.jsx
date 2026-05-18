import { useState, useEffect, useRef } from 'react'
import { skills } from '../data/portfolio'

function SkillBar({ level, label }) {
  const [width, setWidth] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), 200)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [level])

  return (
    <div ref={ref}>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-slate-400">{label}</span>
        <span className="text-blue-400">{level}%</span>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const tools = [
    { name: 'VS Code', icon: '⚙️' },
    { name: 'Git & GitHub', icon: '🔀' },
    { name: 'Figma', icon: '🎨' },
    { name: 'Elementor', icon: '🔧' },
    { name: 'Wp Bakery', icon: '🧁' },
    { name: 'Shopify Admin', icon: '🛒' },
    { name: 'Chrome DevTools', icon: '🔍' },
    { name: 'npm / Yarn', icon: '📦' },
  ]

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
            Skills & Expertise
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">What I Work With</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            A comprehensive overview of the technologies and tools I use to build web experiences.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {skills.map((skill) => (
            <div key={skill.id} className="glass rounded-2xl p-7 card-hover">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl flex-shrink-0">
                  {skill.icon}
                </div>
                <div>
                  <div className="text-xs text-blue-400 font-medium mb-1">{skill.category}</div>
                  <h3 className="text-white font-semibold text-xl">{skill.tech}</h3>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-5">{skill.description}</p>

              <SkillBar level={skill.level} label="Proficiency" />

              <div className="flex flex-wrap gap-1.5 mt-4">
                {skill.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="section-divider mb-16" />

        {/* Tools */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Tools & Environment</h2>
            <p className="text-slate-400">My everyday development toolkit</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <div key={tool.name} className="glass rounded-xl p-4 flex items-center gap-3 card-hover">
                <span className="text-2xl">{tool.icon}</span>
                <span className="text-slate-300 text-sm font-medium">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

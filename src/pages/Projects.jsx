import { useState } from 'react'
import { projects } from '../data/portfolio'

const CATEGORIES = ['All', 'Web Development', 'App', 'E-Commerce']

export default function Projects() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
            Portfolio
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">My Projects</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            A selection of projects I&apos;ve built — from landing pages to full e-commerce platforms.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'glass text-slate-400 hover:text-white hover:border-blue-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div key={project.id} className="glass rounded-2xl overflow-hidden card-hover group flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 to-transparent" />
                <span className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-sm">
                  {project.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-white font-semibold text-xl mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.link}
                    className="flex-1 text-center py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    className="flex-1 text-center py-2 border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

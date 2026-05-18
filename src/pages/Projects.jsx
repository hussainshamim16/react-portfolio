import { useState } from 'react'
import { projects } from '../data/portfolio'
import ProjectsSection from '../components/ProjectsSection'

const CATEGORIES = ['All', 'Web Development', 'App', 'E-Commerce']

export default function Projects() {
  // const [active, setActive] = useState('All')

  // const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

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

        <ProjectsSection />
      </div>
    </main>
  )
}

import { Link } from 'react-router-dom'
import { personal, experience, certificates } from '../data/portfolio'

export default function About() {
  return (
    <main className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
            About Me
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">The Developer Behind the Code</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Passionate about crafting web experiences that are both beautiful and functional.
          </p>
        </div>

        {/* Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <div className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden glow-blue border border-blue-500/20">
              <img
                src={personal.profileImage}
                alt={personal.name}
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 glass rounded-2xl p-5 shadow-xl max-w-48">
              <div className="text-slate-400 text-xs mb-1">Based in</div>
              <div className="text-white font-semibold">{personal.location}</div>
              <div className="text-slate-400 text-xs mt-2 mb-1">Email</div>
              <div className="text-blue-400 text-xs break-all">{personal.email}</div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white mb-4">{personal.name}</h2>
            <div className="text-blue-400 font-medium mb-4">{personal.title} {personal.subtitle}</div>
            <p className="text-slate-400 leading-relaxed mb-6">{personal.bio}</p>
            <p className="text-slate-400 leading-relaxed mb-8">
              I believe that great code and great design go hand in hand. Every project I take on gets my full dedication — from initial wireframes to final deployment. I am passionate about clean code, performance, and delivering results that make a real difference for my clients.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
              >
                Hire Me
              </Link>
              <a
                href={personal.cvLink}
                className="px-6 py-3 border border-slate-600 hover:border-blue-500 text-slate-300 hover:text-white font-semibold rounded-xl transition-all duration-200"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>

        <div className="section-divider mb-20" />

        {/* Experience Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Work Experience</h2>
            <p className="text-slate-400">Companies I have worked with</p>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent" />
            <div className="space-y-8">
              {experience.map((exp, i) => (
                <div key={exp.id} className="relative pl-16 fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className={`absolute left-4 top-1.5 w-4 h-4 rounded-full border-2 ${exp.current ? 'bg-blue-500 border-blue-400 pulse-glow' : 'bg-slate-800 border-slate-600'}`} />
                  <div className="glass rounded-2xl p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-white font-semibold text-lg">{exp.role}</h3>
                        <div className="text-blue-400 font-medium">{exp.company}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400">
                          {exp.period}
                        </span>
                        {exp.current && (
                          <span className="text-xs px-3 py-1 rounded-full bg-green-500/15 text-green-400 border border-green-500/20">
                            Current
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="section-divider mb-20" />

        {/* Certificates */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Certifications</h2>
            <p className="text-slate-400">Professional credentials I&apos;ve earned</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div key={cert.id} className="glass rounded-2xl p-6 card-hover text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center mx-auto mb-4 text-2xl">
                  🏅
                </div>
                <h3 className="text-white font-semibold mb-1">{cert.name}</h3>
                <p className="text-slate-400 text-sm mb-2">{cert.issuer}</p>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400">{cert.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

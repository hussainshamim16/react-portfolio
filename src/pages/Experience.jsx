import { experience, certificates } from '../data/portfolio'
import Slider from '../components/Slider'

export default function Experience() {
  return (
    <main className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
            Career
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Work Experience</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            My professional journey — the companies, roles, and experiences that shaped my skills.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mb-20">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/60 via-blue-500/20 to-transparent" />

          <div className="space-y-10">
            {experience.map((exp, i) => (
              <div key={exp.id} className="relative pl-20 fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
                {/* Timeline dot */}
                <div className={`absolute left-6 top-6 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  exp.current
                    ? 'bg-blue-500 border-blue-400'
                    : 'bg-slate-900 border-slate-600'
                }`}>
                  {exp.current && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>

                <div className="glass rounded-2xl p-7">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-white font-bold text-xl mb-1">{exp.role}</h3>
                      <div className="text-blue-400 font-semibold">{exp.company}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-sm px-3 py-1.5 rounded-full bg-slate-800 text-slate-400">
                        {exp.period}
                      </span>
                      {exp.current && (
                        <span className="text-xs px-3 py-1.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/20">
                          Current Position
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-divider mb-20" />

        {/* Education & Certs */}
        <div>
          {/* <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Certifications</h2>
            <p className="text-slate-400">Official credentials and training programs</p>
          </div>

          <div className="space-y-4"> */}
            {/* {certificates.map((cert) => (
              <div key={cert.id} className="glass rounded-2xl p-6 flex items-center gap-5 card-hover">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl flex-shrink-0">
                  🏅
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{cert.name}</h3>
                  <p className="text-slate-400 text-sm mt-0.5">{cert.issuer}</p>
                </div>
                <span className="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-400 flex-shrink-0">
                  {cert.year}
                </span>
              </div>
            ))} */}
            <Slider />
          {/* </div> */}
        </div>
      </div>
    </main>
  )
}

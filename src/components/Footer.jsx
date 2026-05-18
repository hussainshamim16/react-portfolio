import { Link } from 'react-router-dom'
import { personal, navLinks } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#080810]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link to="/" className="font-heading font-bold text-xl text-white mb-3 inline-block">
              <span className="gradient-text">&lt;</span>
              {personal.shortName}
              <span className="gradient-text">/&gt;</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {personal.tagline}
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href={personal.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-colors text-sm font-bold text-slate-400 hover:text-white"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href={personal.social.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-600 flex items-center justify-center transition-colors text-xs font-bold text-slate-400 hover:text-white"
                aria-label="GitHub"
              >
                GH
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href={`mailto:${personal.email}`} className="hover:text-blue-400 transition-colors">
                  {personal.email}
                </a>
              </li>
              <li>
                <a href={`tel:${personal.phone}`} className="hover:text-blue-400 transition-colors">
                  {personal.phone}
                </a>
              </li>
              <li className="text-slate-500">{personal.location}</li>
            </ul>
          </div>
        </div>

        <div className="section-divider my-8" />

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {personal.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

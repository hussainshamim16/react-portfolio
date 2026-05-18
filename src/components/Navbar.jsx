import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks, personal } from '../data/portfolio'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-blue-500/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 pt-5 py-4 flex items-center justify-between">
        <Link to="/" className="font-heading font-bold text-xl text-white hover:text-blue-400 transition-colors">
          <span className="gradient-text">&lt;</span>
          {personal.shortName}
          <span className="gradient-text">/&gt;</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-blue-400 ${
                  location.pathname === link.href
                    ? 'text-blue-400'
                    : 'text-slate-400'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="hidden md:block px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
        >
          Hire Me
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden glass transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="px-6 pb-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`block text-sm font-medium transition-colors duration-200 hover:text-blue-400 ${
                  location.pathname === link.href ? 'text-blue-400' : 'text-slate-300'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/contact"
              className="inline-block px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
            >
              Hire Me
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

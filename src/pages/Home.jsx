import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { personal, skills, projects, testimonials } from '../data/portfolio'
// firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/scroll.js";
import SliderSwiper from '../components/Slider.jsx'
import ProjectsSection from '../components/ProjectsSection.jsx';
import BlogsList from '../components/BlogSection.jsx';
const TYPED_STRINGS = ['Javascript Developer', 'Shopify Expert', 'React Developer', 'WordPress Expert']

function TypedText() {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = TYPED_STRINGS[idx]
    let timeout

    if (!deleting && text.length < target.length) {
      timeout = setTimeout(() => setText(target.slice(0, text.length + 1)), 80)
    } else if (!deleting && text.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 40)
    } else if (deleting && text.length === 0) {
      setDeleting(false)
      setIdx((i) => (i + 1) % TYPED_STRINGS.length)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, idx])

  return (
    <span className="gradient-text typing-cursor">{text}</span>
  )
}

export default function Home() {


  //date fetch from firebase
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // setData(items);
      // console.log(items)
    };
    fetchData();
  }, []);



  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center grid-bg overflow-hidden">
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 pulse-glow inline-block" />
                Available for freelance projects
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Hi, I&apos;m{' '}
                <span className="gradient-text">{personal.shortName}</span>
              </h1>

              <h2 className="text-2xl lg:text-3xl font-semibold text-slate-300 mb-6 h-10">
                <TypedText />
              </h2>

              <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
                {personal.bio}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
                >
                  View My Work
                </Link>
                <Link
                  target='_blank'
                  to='https://muhammadhussainshamim16.netlify.app/assets/pdf/resume-me.pdf'
                  className="px-6 py-3 border border-slate-600 hover:border-blue-500 text-slate-300 hover:text-white font-semibold rounded-xl transition-all duration-200"
                >
                  Resume
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-10">
                {[
                  { value: '3+', label: 'Years Exp.' },
                  { value: '50+', label: 'Projects Done' },
                  { value: '4', label: 'Companies' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold gradient-text">{s.value}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Avatar */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative float-animation">
                <div className="w-72 h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden glow-blue border border-blue-500/20">
                  <img
                    src={personal.profileImage}
                    alt={personal.name}
                    // style={{ filter: 'grayscale(1)' }}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Badge */}
                <div className="absolute bottom-20 -left-25 glass rounded-xl px-4 py-3 shadow-xl md:block hidden">
                  <div className="text-xs text-slate-400">Current Role</div>
                  <div className="text-sm font-semibold text-white mt-0.5">Frontend Developer</div>
                </div>
                <div className="absolute top-20 -right-15 glass rounded-xl px-3 py-3 shadow-xl md:block hidden">
                  <div className="text-xs text-slate-400">Specialization</div>
                  <div className="text-sm font-semibold text-white mt-0.5">React & WordPress</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills preview */}
      <section className="py-20 bg-[#080810] min-h-screen ">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Core Expertise</h2>
            <p className="text-slate-400">Technologies I work with daily</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div key={skill.id} className="glass rounded-2xl p-6 card-hover">
                <div className="text-3xl mb-3">{skill.icon}</div>
                <div className="text-xs text-blue-400 font-medium mb-1">{skill.category}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{skill.tech}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{skill.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {skill.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/skills" className="inline-block px-6 py-3 border border-slate-700 hover:border-blue-500 text-slate-400 hover:text-white rounded-xl transition-all duration-200 text-sm font-medium">
              View All Skills →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <ProjectsSection />

      {/* certificates */}
      <SliderSwiper />

      {/* blog section */}
      <BlogsList />

      {/* Testimonials */}
      <section className="py-20 bg-[#080810]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Client Testimonials</h2>
            <p className="text-slate-400">What people say about working with me</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="glass rounded-2xl p-6 card-hover">
                <div className="text-blue-400 text-4xl font-serif leading-none mb-4">&ldquo;</div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{t.name}</div>
                    <div className="text-slate-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="glass rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full" />
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Build Something Great?</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Whether you need a brand new website, a React app, or a WordPress/Shopify store let&apos;s talk about your project.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

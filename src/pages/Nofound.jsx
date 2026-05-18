import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="relative min-h-[100vh] flex items-center grid-bg overflow-hidden justify-center">
      {/* Glow Orbs (Matching with your Hero Theme) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto px-6 text-center z-10">
        {/* Animated Badge */}
        {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-red-500 pulse-glow inline-block" />
          Error Code: 404
        </div> */}

        {/* Huge Hero 404 Text */}
        <h1 className="text-8xl lg:text-9xl font-black text-white tracking-wider mb-2 drop-shadow-[0_0_35px_rgba(37,99,235,0.2)]">
          4<span className="gradient-text">0</span>4
        </h1>

        {/* Subtitle */}
        <h2 className="text-2xl lg:text-3xl font-bold text-slate-200 mb-4">
          Lost in the Cyber Space?
        </h2>

        {/* Description */}
        <p className="text-slate-400 text-base lg:text-lg leading-relaxed mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable in this terminal.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 text-sm"
          >
            Back to Home Base
          </Link>
          <Link
            to="/projects"
            className="px-6 py-3 border border-slate-600 hover:border-blue-500 text-slate-300 hover:text-white font-semibold rounded-xl transition-all duration-200 text-sm"
          >
            Explore Projects
          </Link>
        </div>

        {/* Tech Decor Elements */}
        <div className="flex justify-center gap-8 mt-16 opacity-40">
          <div>
            <div className="text-xs font-mono text-slate-500">SYSTEM_STATUS</div>
            <div className="text-xs font-mono text-red-400 mt-0.5">PAGE_NOT_FOUND</div>
          </div>
          <div className="border-l border-slate-800 h-8" />
          <div>
            <div className="text-xs font-mono text-slate-500">LOCATION</div>
            <div className="text-xs font-mono text-cyan-400 mt-0.5">UNKNOWN_ROUTE</div>
          </div>
        </div>

      </div>
    </section>
  );
}
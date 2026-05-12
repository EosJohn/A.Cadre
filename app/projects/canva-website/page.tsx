import Link from "next/link";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export default function CanvaWebsitePage() {
  return (
    <div className="bg-transparent min-h-screen font-sans selection:bg-teal-400 selection:text-brand-canvas text-brand-body flex flex-col relative z-50">
      
      {/* TOP NAV */}
      <nav className="w-full max-w-6xl mx-auto px-6 md:px-12 py-8 relative z-10">
        <Link href="/#projects" className="inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors font-mono text-sm group">
          <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Portfolio
        </Link>
      </nav>

      {/* HEADER */}
      <header className="w-full max-w-4xl mx-auto px-6 pt-8 pb-16 relative z-10">
        <div className="flex flex-col gap-4">
          <h1 className={`${outfit.className} text-4xl md:text-6xl font-bold text-brand-heading tracking-tight`}>
            Canva Website Design
          </h1>
          <p className="text-teal-400 font-mono text-sm tracking-widest uppercase">Rapid Web Deployment & Layout</p>
        </div>
        
        <p className="text-xl text-brand-body/80 leading-relaxed max-w-3xl mt-8 mb-10">
          A fully responsive, visually engaging website built entirely on Canva. This project demonstrates adaptability by utilizing alternative web builders to achieve a clean aesthetic and quick turnaround for client needs.
        </p>

        <div className="flex flex-wrap gap-3">
          {["Canva", "Web Design", "Visual Hierarchy", "Rapid Prototyping"].map((tech) => (
            <span key={tech} className="bg-teal-400/10 border border-teal-400/30 text-teal-300 px-4 py-1.5 text-sm font-mono rounded-full font-semibold">
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* CASE STUDY DETAILS */}
      <section className="w-full max-w-5xl mx-auto px-6 mb-32 space-y-16 relative z-10">
        
        <div className="grid md:grid-cols-3 gap-12 border-t border-slate-700/50 pt-12">
          <div className="md:col-span-2 space-y-6">
            <h2 className={`${outfit.className} text-2xl font-bold text-brand-heading`}>The Approach</h2>
            <p className="text-lg leading-relaxed">
              While heavy logic systems require traditional coding, some projects strictly demand rapid visual deployment. Using Canva's web building tools, I designed a functional, single-page site that focuses purely on aesthetic value and immediate content delivery.
            </p>
            <p className="text-lg leading-relaxed">
              The layout prioritizes visual hierarchy, ensuring that typography and imagery guide the user smoothly through the information without feeling cluttered.
            </p>
          </div>
          <div className="bg-brand-surface p-6 rounded-xl border border-slate-700/50">
            <h3 className="font-bold text-teal-400 mb-4 font-mono text-xs uppercase tracking-tighter">Project Overview</h3>
            <ul className="space-y-4 text-sm text-brand-body/90">
              <li><span className="block text-brand-body/50 font-mono text-xs mb-1">Role</span> Web Designer</li>
              <li><span className="block text-brand-body/50 font-mono text-xs mb-1">Deliverables</span> Live Canva Website</li>
              <li><span className="block text-brand-body/50 font-mono text-xs mb-1">Platform</span> Canva</li>
            </ul>
          </div>
        </div>

        {/* MOCKUP IMAGE */}
        <div className="w-full bg-brand-surface rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
          {/* SIGURADUHIN MONG MAY CanvaFull.png KA SA PUBLIC FOLDER */}
          <img 
            src="/CanvaFull.png" 
            alt="Canva Website Full Design" 
            className="w-full h-auto object-cover"
          />
        </div>
        
      </section>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-700/50 py-12 text-center mt-auto bg-transparent relative z-20">
        <p className="text-brand-body/50 text-sm font-mono">
          Designed by John Adrian Mijares.
        </p>
      </footer>
    </div>
  );
}
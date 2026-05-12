import Link from "next/link";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export default function AgroLandingPage() {
  return (
    <div className="bg-brand-canvas min-h-screen font-sans selection:bg-teal-400 selection:text-brand-canvas text-brand-body flex flex-col relative z-50">
      
      {/* TOP NAV / BACK BUTTON */}
      <nav className="w-full max-w-6xl mx-auto px-6 md:px-12 py-8 relative z-10">
        <Link 
          href="/#projects" 
          className="inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors font-mono text-sm group"
        >
          <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Portfolio
        </Link>
      </nav>

      {/* CASE STUDY HEADER */}
      <header className="w-full max-w-4xl mx-auto px-6 pt-8 pb-16 relative z-10">
        <div className="flex flex-col gap-4">
          <h1 className={`${outfit.className} text-4xl md:text-6xl font-bold text-brand-heading tracking-tight`}>
            Agro Landing Page
          </h1>
          <p className="text-teal-400 font-mono text-sm tracking-widest uppercase">Digitalizing Agricultural Initiatives</p>
        </div>
        
        <p className="text-xl text-brand-body/80 leading-relaxed max-w-3xl mt-8 mb-10">
          A modern, user-centric UI/UX landing page designed to digitalize and promote local agricultural programs, serving as a centralized hub for modern farming techniques and resources.
        </p>

        <div className="flex flex-wrap gap-3">
          {["Figma", "UI/UX Design", "Wireframing", "Prototyping"].map((tech) => (
            <span key={tech} className="bg-teal-400/10 border border-teal-400/30 text-teal-300 px-4 py-1.5 text-sm font-mono rounded-full font-semibold">
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* PROJECT DETAILS & EXPLANATION (Naka-ibabaw na tulad ng IGM at HeyPhil) */}
      <section className="w-full max-w-5xl mx-auto px-6 mb-32 space-y-16 relative z-10">
        
        {/* Intro text */}
        <div className="grid md:grid-cols-3 gap-12 border-t border-slate-700/50 pt-12">
          <div className="md:col-span-2 space-y-6">
            <h2 className={`${outfit.className} text-2xl font-bold text-brand-heading`}>The Objective & Process</h2>
            <p className="text-lg leading-relaxed">
              The goal of this project was to bridge the gap between local agricultural programs and the digital space. By creating an accessible and visually engaging landing page, the initiative aims to provide farmers, stakeholders, and the community with vital information.
            </p>
            <p className="text-lg leading-relaxed">
              Focusing on a clean, nature-inspired aesthetic, the UI was wireframed and prototyped entirely in Figma. The layout prioritizes clear typography, intuitive navigation, and high-quality imagery to ensure that users of all technical backgrounds can easily consume agricultural updates.
            </p>
          </div>
          <div className="bg-brand-surface p-6 rounded-xl border border-slate-700/50">
            <h3 className="font-bold text-teal-400 mb-4 font-mono text-xs uppercase tracking-tighter">Project Overview</h3>
            <ul className="space-y-4 text-sm text-brand-body/90">
              <li>
                <span className="block text-brand-body/50 font-mono text-xs mb-1">Role</span>
                UI/UX Designer
              </li>
              <li>
                <span className="block text-brand-body/50 font-mono text-xs mb-1">Deliverables</span>
                High-Fidelity Mockups, Interactive Prototype
              </li>
              <li>
                <span className="block text-brand-body/50 font-mono text-xs mb-1">Tools Used</span>
                Figma
              </li>
            </ul>
          </div>
        </div>

        {/* MAIN MOCKUP IMAGE (Nasa ilalim na at Full-Bleed) */}
        <div className="w-full bg-brand-surface rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
          <img 
            src="/AgroFullUI.png" 
            alt="Agro Landing Page Full UI" 
            className="w-full h-auto object-cover"
          />
        </div>
        
      </section>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-700/50 py-12 text-center mt-auto bg-brand-canvas relative z-20">
        <p className="text-brand-body/50 text-sm font-mono">
          Built by John Adrian Mijares.
        </p>
      </footer>
    </div>
  );
}
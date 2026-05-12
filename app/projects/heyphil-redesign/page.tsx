import Link from "next/link";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export default function HeyPhilRedesignPage() {
  return (
    <div className="bg-brand-canvas min-h-screen font-sans selection:bg-teal-400 selection:text-brand-canvas text-brand-body flex flex-col relative z-50">
      
      {/* TOP NAV */}
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

      {/* HEADER */}
      <header className="w-full max-w-4xl mx-auto px-6 pt-8 pb-16 relative z-10">
        <div className="flex flex-col gap-4">
          <h1 className={`${outfit.className} text-4xl md:text-6xl font-bold text-brand-heading tracking-tight`}>
            HeyPhil App Redesign
          </h1>
          <p className="text-teal-400 font-mono text-sm tracking-widest uppercase">PhilCare HMO App Conceptual UX Overhaul</p>
        </div>
        
        <p className="text-xl text-brand-body/80 leading-relaxed max-w-3xl mt-8 mb-10">
          A comprehensive UI/UX redesign of PhilCare's official HMO mobile application. The primary goal was to resolve existing user friction points in acquiring Letter of Authorizations (LOAs) and booking online doctor consultations.
        </p>

        <div className="flex flex-wrap gap-3">
          {["Figma", "UI/UX Design", "Wireframing", "User Research", "Mobile App Design"].map((tech) => (
            <span key={tech} className="bg-teal-400/10 border border-teal-400/30 text-teal-300 px-4 py-1.5 text-sm font-mono rounded-full font-semibold">
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* UX CASE STUDY SECTION */}
      <section className="w-full max-w-5xl mx-auto px-6 mb-32 space-y-16 relative z-10">
        
        {/* Intro text */}
        <div className="grid md:grid-cols-3 gap-12 border-t border-slate-700/50 pt-12">
          <div className="md:col-span-2 space-y-6">
            <h2 className={`${outfit.className} text-2xl font-bold text-brand-heading`}>The Problem & The Solution</h2>
            <p className="text-lg leading-relaxed">
              Healthcare applications need to be incredibly intuitive because users often access them during times of distress or illness. The original app suffered from cluttered navigation and a confusing process for generating LOAs. 
            </p>
            <p className="text-lg leading-relaxed">
              For this redesign, I conducted a heuristic evaluation of the app and rebuilt the user flow from the ground up. I utilized a modern, calming color palette and prioritized accessibility to ensure that members can get the healthcare assistance they need with minimal taps.
            </p>
          </div>
          <div className="bg-brand-surface p-6 rounded-xl border border-slate-700/50">
            <h3 className="font-bold text-teal-400 mb-4 font-mono text-xs uppercase tracking-tighter">Project Details</h3>
            <ul className="space-y-4 text-sm text-brand-body/90">
              <li>
                <span className="block text-brand-body/50 font-mono text-xs mb-1">Role</span>
                UI/UX Designer
              </li>
              <li>
                <span className="block text-brand-body/50 font-mono text-xs mb-1">Deliverables</span>
                High-Fidelity UI Mockups, User Flow Diagrams
              </li>
              <li>
                <span className="block text-brand-body/50 font-mono text-xs mb-1">Focus Areas</span>
                LOA Automation, Telehealth (DigiMed) Interface
              </li>
            </ul>
          </div>
        </div>

{/* SINGLE MOCKUP COMPILATION SHOWCASE */}
        <div className="w-full bg-brand-surface rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
          <img 
            src="/heyphil-redesign/HeyPhil.png" 
            alt="HeyPhil App Redesign Compilation" 
            className="w-full h-auto object-cover"
          />
        </div>
        
      </section>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-700/50 py-12 text-center mt-auto bg-brand-canvas relative z-20">
        <p className="text-brand-body/50 text-sm font-mono">
          UI/UX Redesign Concept by John Adrian Mijares.
        </p>
      </footer>
    </div>
  );
}
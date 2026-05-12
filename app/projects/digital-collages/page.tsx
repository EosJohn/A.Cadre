import Link from "next/link";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export default function DigitalCollagePage() {
  const posters = [
    "/collages/Poster01.png",
    "/collages/Poster02.png",
    "/collages/Poster03.png",
  ];

  return (
    <div className="bg-brand-canvas min-h-screen font-sans selection:bg-teal-400 selection:text-brand-canvas text-brand-body flex flex-col relative z-50">
      
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
            Monochromatic Floral Wall Art
          </h1>
          <p className="text-teal-400 font-mono text-sm tracking-widest uppercase">Commissioned Framed Poster Design</p>
        </div>
        
        <p className="text-xl text-brand-body/80 leading-relaxed max-w-3xl mt-8 mb-10">
          A minimalist poster series featuring the vibrant flower vendors of Vietnam and Thailand. This commissioned project was specifically designed to be printed and framed as elegant interior wall art for a client's space.
        </p>

        <div className="flex flex-wrap gap-3">
          {["Poster Design", "Minimalism", "Print Formatting", "Client Commission", "Graphic Design"].map((tech) => (
            <span key={tech} className="bg-teal-400/10 border border-teal-400/30 text-teal-300 px-4 py-1.5 text-sm font-mono rounded-full font-semibold">
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* CASE STUDY DETAILS */}
      <section className="w-full max-w-6xl mx-auto px-6 mb-32 space-y-16 relative z-10">
        
        <div className="grid md:grid-cols-3 gap-12 border-t border-slate-700/50 pt-12 max-w-5xl mx-auto">
          <div className="md:col-span-2 space-y-6">
            <h2 className={`${outfit.className} text-2xl font-bold text-brand-heading`}>The Commission & Concept</h2>
            <p className="text-lg leading-relaxed">
              The client requested a clean, minimalist aesthetic to decorate their interior walls. Drawing inspiration from the iconic flower vendors roaming the streets of Southeast Asia, I utilized a monochromatic blue color palette to bring a calming, unified look to the series.
            </p>
            <p className="text-lg leading-relaxed">
              Unlike purely digital assets, these pieces were designed with physical print in mind. The layout, contrast, and negative space were carefully calculated to ensure they translated perfectly into framed physical wall art.
            </p>
          </div>
          <div className="bg-brand-surface p-6 rounded-xl border border-slate-700/50 h-fit">
            <h3 className="font-bold text-teal-400 mb-4 font-mono text-xs uppercase tracking-tighter">Project Details</h3>
            <ul className="space-y-4 text-sm text-brand-body/90">
              <li>• Client Commission</li>
              <li>• Minimalist / Monochromatic</li>
              <li>• Print-Ready Formatting</li>
              <li>• Interior Wall Art</li>
            </ul>
          </div>
        </div>

        {/* 3-COLUMN GALLERY GRID (With full height images) */}
        <div className="space-y-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {posters.map((src, index) => (
              <div key={index} className="w-full bg-slate-900/50 rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                <img 
                  src={src} 
                  alt={`Monochromatic Floral Poster ${index + 1}`} 
                  className="w-full h-auto" 
                />
              </div>
            ))}
          </div>
          
          {/* ISANG CAPTION PARA SA LAHAT */}
          <div className="text-center max-w-3xl mx-auto pt-4">
            <p className="text-brand-body/70 italic text-sm md:text-base">
              A minimalist triptych capturing the essence of Southeast Asian flower vendors. Designed with a unified monochromatic palette to serve as an elegant, cohesive set of framed wall prints.
            </p>
          </div>
        </div>
        
      </section>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-700/50 py-12 text-center mt-auto bg-brand-canvas relative z-20">
        <p className="text-brand-body/50 text-sm font-mono">
          Poster Design & Art Direction by John Adrian Mijares.
        </p>
      </footer>
    </div>
  );
}
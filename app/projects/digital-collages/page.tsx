"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Outfit } from "next/font/google";
import { useRouter } from "next/navigation"; // ✅ BAGO: Inimport ang useRouter

const outfit = Outfit({ subsets: ["latin"] });

export default function DigitalCollagePage() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);
  const router = useRouter(); // ✅ BAGO: Tinawag ang router

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
  }, []);

  // ✅ BAGO: Ang function na nagpa-pause ng smooth scroll
  const handleInstantBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); 
    document.documentElement.classList.remove("scroll-smooth");
    router.push("/#projects");
    setTimeout(() => {
      document.documentElement.classList.add("scroll-smooth");
    }, 500);
  };

  const posters = [
    "/collages/Poster01.png",
    "/collages/Poster02.png",
    "/collages/Poster03.png",
  ];

  if (!mounted) return null;

  return (
    // ✅ TRANSPARENT WRAPPER para lumusot ang particles, plus DYNAMIC text colors
    <div className={`min-h-screen font-sans selection:bg-teal-400 selection:text-white flex flex-col relative transition-colors duration-500 ${theme === 'light' ? 'text-slate-800' : 'text-slate-300'}`}>
      
      {/* TOP NAV */}
      <nav className="w-full max-w-6xl mx-auto px-6 md:px-12 py-8 relative z-10">
        {/* ✅ BINALIK NATIN SA /#projects AT NILAGYAN NG onClick PARA INSTANT SNAP! */}
        <Link 
          href="/#projects" 
          onClick={handleInstantBack}
          className={`inline-flex items-center hover:text-teal-400 transition-colors font-mono text-sm group ${theme === 'light' ? 'text-slate-600' : 'text-teal-400'}`}
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
          <h1 className={`${outfit.className} text-4xl md:text-6xl font-bold tracking-tight transition-colors duration-500 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
            Monochromatic Floral Wall Art
          </h1>
          <p className="text-teal-400 font-mono text-sm tracking-widest uppercase">Commissioned Framed Poster Design</p>
        </div>
        
        <p className={`text-xl leading-relaxed max-w-3xl mt-8 mb-10 transition-colors duration-500 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
          A minimalist poster series featuring the vibrant flower vendors of Vietnam and Thailand. This commissioned project was specifically designed to be printed and framed as elegant interior wall art for a client's space.
        </p>

        <div className="flex flex-wrap gap-3">
          {["Poster Design", "Minimalism", "Print Formatting", "Client Commission", "Graphic Design"].map((tech) => (
            <span key={tech} className="bg-teal-400/10 border border-teal-400/30 text-teal-600 dark:text-teal-300 px-4 py-1.5 text-sm font-mono rounded-full font-semibold">
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* CASE STUDY DETAILS */}
      <section className="w-full max-w-6xl mx-auto px-6 mb-32 space-y-16 relative z-10">
        
        <div className={`grid md:grid-cols-3 gap-12 border-t pt-12 max-w-5xl mx-auto transition-colors duration-500 ${theme === 'light' ? 'border-slate-300' : 'border-slate-700/50'}`}>
          <div className="md:col-span-2 space-y-6">
            <h2 className={`${outfit.className} text-2xl font-bold transition-colors duration-500 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              The Commission & Concept
            </h2>
            <p className="text-lg leading-relaxed">
              The client requested a clean, minimalist aesthetic to decorate their interior walls. Drawing inspiration from the iconic flower vendors roaming the streets of Southeast Asia, I utilized a monochromatic blue color palette to bring a calming, unified look to the series.
            </p>
            <p className="text-lg leading-relaxed">
              Unlike purely digital assets, these pieces were designed with physical print in mind. The layout, contrast, and negative space were carefully calculated to ensure they translated perfectly into framed physical wall art.
            </p>
          </div>
          
          {/* ✅ CARD BOX: Dynamic background para umayos sa Day Mode */}
          <div className={`p-6 rounded-xl border backdrop-blur-sm h-fit transition-colors duration-500 ${theme === 'light' ? 'bg-white/70 border-slate-300 shadow-sm' : 'bg-brand-surface border-slate-700/50'}`}>
            <h3 className="font-bold text-teal-400 mb-4 font-mono text-xs uppercase tracking-tighter">Project Details</h3>
            <ul className={`space-y-4 text-sm transition-colors duration-500 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
              <li>• Client Commission</li>
              <li>• Minimalist / Monochromatic</li>
              <li>• Print-Ready Formatting</li>
              <li>• Interior Wall Art</li>
            </ul>
          </div>
        </div>

        {/* 3-COLUMN GALLERY GRID */}
        <div className="space-y-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {posters.map((src, index) => (
              <div key={index} className={`w-full rounded-2xl border overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.02] ${theme === 'light' ? 'bg-white border-slate-300' : 'bg-slate-900/50 border-slate-700/50'}`}>
                <img 
                  src={src} 
                  alt={`Monochromatic Floral Poster ${index + 1}`} 
                  className="w-full h-auto" 
                />
              </div>
            ))}
          </div>
          
          {/* CAPTION */}
          <div className="text-center max-w-3xl mx-auto pt-4">
            <p className={`italic text-sm md:text-base transition-colors duration-500 ${theme === 'light' ? 'text-slate-500' : 'text-brand-body/70'}`}>
              A minimalist triptych capturing the essence of Southeast Asian flower vendors. Designed with a unified monochromatic palette to serve as an elegant, cohesive set of framed wall prints.
            </p>
          </div>
        </div>
        
      </section>

      {/* FOOTER */}
      <footer className={`w-full border-t py-12 text-center mt-auto relative z-20 transition-colors duration-500 ${theme === 'light' ? 'border-slate-300 bg-transparent' : 'border-slate-700/50 bg-brand-canvas'}`}>
        <p className={`text-sm font-mono transition-colors duration-500 ${theme === 'light' ? 'text-slate-500' : 'text-brand-body/50'}`}>
          Poster Design & Art Direction by John Adrian Mijares.
        </p>
      </footer>
    </div>
  );
}
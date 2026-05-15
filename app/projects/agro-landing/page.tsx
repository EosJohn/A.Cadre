"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Outfit } from "next/font/google";
import { useRouter } from "next/navigation";

const outfit = Outfit({ subsets: ["latin"] });

export default function AgroLandingPage() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
  }, []);

  const handleInstantBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Pigilan ang default na link behavior
    
    // 1. Alisin ang smooth scroll class sa buong website pansamantala
    document.documentElement.classList.remove("scroll-smooth");
    
    // 2. Instant na tumalon sa projects section
    router.push("/#projects");

    // 3. Ibalik yung smooth scroll pagkatapos ng kalahating segundo
    setTimeout(() => {
      document.documentElement.classList.add("scroll-smooth");
    }, 500);
  };

  if (!mounted) return null;

  return (
    // ✅ TRANSPARENT WRAPPER para lumusot ang particles, plus DYNAMIC text colors
    <div className={`min-h-screen font-sans selection:bg-teal-400 selection:text-white flex flex-col relative transition-colors duration-500 ${theme === 'light' ? 'text-slate-800' : 'text-slate-300'}`}>
      
    {/* TOP NAV / BACK BUTTON */}
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

      {/* CASE STUDY HEADER */}
      <header className="w-full max-w-4xl mx-auto px-6 pt-8 pb-16 relative z-10">
        <div className="flex flex-col gap-4">
          <h1 className={`${outfit.className} text-4xl md:text-6xl font-bold tracking-tight transition-colors duration-500 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
            Agro Landing Page
          </h1>
          <p className="text-teal-400 font-mono text-sm tracking-widest uppercase">Digitalizing Agricultural Initiatives</p>
        </div>
        
        <p className={`text-xl leading-relaxed max-w-3xl mt-8 mb-10 transition-colors duration-500 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
          A modern, user-centric UI/UX landing page designed to digitalize and promote local agricultural programs, serving as a centralized hub for modern farming techniques and resources.
        </p>

        <div className="flex flex-wrap gap-3">
          {["Figma", "UI/UX Design", "Wireframing", "Prototyping"].map((tech) => (
            <span key={tech} className="bg-teal-400/10 border border-teal-400/30 text-teal-600 dark:text-teal-300 px-4 py-1.5 text-sm font-mono rounded-full font-semibold">
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* PROJECT DETAILS & EXPLANATION */}
      <section className="w-full max-w-5xl mx-auto px-6 mb-32 space-y-16 relative z-10">
        
        {/* Intro text */}
        <div className={`grid md:grid-cols-3 gap-12 border-t pt-12 transition-colors duration-500 ${theme === 'light' ? 'border-slate-300' : 'border-slate-700/50'}`}>
          <div className="md:col-span-2 space-y-6">
            <h2 className={`${outfit.className} text-2xl font-bold transition-colors duration-500 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              The Objective & Process
            </h2>
            <p className="text-lg leading-relaxed">
              The goal of this project was to bridge the gap between local agricultural programs and the digital space. By creating an accessible and visually engaging landing page, the initiative aims to provide farmers, stakeholders, and the community with vital information.
            </p>
            <p className="text-lg leading-relaxed">
              Focusing on a clean, nature-inspired aesthetic, the UI was wireframed and prototyped entirely in Figma. The layout prioritizes clear typography, intuitive navigation, and high-quality imagery to ensure that users of all technical backgrounds can easily consume agricultural updates.
            </p>
          </div>
          
          {/* ✅ CARD BOX: Dynamic background para hindi masakit sa mata kapag Day Mode */}
          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-colors duration-500 ${theme === 'light' ? 'bg-white/70 border-slate-300 shadow-sm' : 'bg-brand-surface border-slate-700/50'}`}>
            <h3 className="font-bold text-teal-400 mb-4 font-mono text-xs uppercase tracking-tighter">Project Overview</h3>
            <ul className={`space-y-4 text-sm transition-colors duration-500 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
              <li>
                <span className={`block font-mono text-xs mb-1 transition-colors duration-500 ${theme === 'light' ? 'text-slate-500' : 'text-brand-body/50'}`}>Role</span>
                UI/UX Designer
              </li>
              <li>
                <span className={`block font-mono text-xs mb-1 transition-colors duration-500 ${theme === 'light' ? 'text-slate-500' : 'text-brand-body/50'}`}>Deliverables</span>
                High-Fidelity Mockups, Interactive Prototype
              </li>
              <li>
                <span className={`block font-mono text-xs mb-1 transition-colors duration-500 ${theme === 'light' ? 'text-slate-500' : 'text-brand-body/50'}`}>Tools Used</span>
                Figma
              </li>
            </ul>
          </div>
        </div>

        {/* MAIN MOCKUP IMAGE */}
        <div className={`w-full rounded-2xl border overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.01] ${theme === 'light' ? 'bg-white border-slate-300' : 'bg-brand-surface border-slate-700/50'}`}>
          <img 
            src="/AgroFullUI.png" 
            alt="Agro Landing Page Full UI" 
            className="w-full h-auto object-cover"
          />
        </div>
        
      </section>

      {/* FOOTER */}
      <footer className={`w-full border-t py-12 text-center mt-auto relative z-20 transition-colors duration-500 ${theme === 'light' ? 'border-slate-300 bg-transparent' : 'border-slate-700/50 bg-brand-canvas'}`}>
        <p className={`text-sm font-mono transition-colors duration-500 ${theme === 'light' ? 'text-slate-500' : 'text-brand-body/50'}`}>
          Built by John Adrian Mijares.
        </p>
      </footer>
    </div>
  );
}
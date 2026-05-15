"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Outfit } from "next/font/google";
import { useRouter } from "next/navigation"; // ✅ BAGO: Inimport ang useRouter

const outfit = Outfit({ subsets: ["latin"] });

export default function HeyPhilRedesignPage() {
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

      {/* HEADER */}
      <header className="w-full max-w-4xl mx-auto px-6 pt-8 pb-16 relative z-10">
        <div className="flex flex-col gap-4">
          <h1 className={`${outfit.className} text-4xl md:text-6xl font-bold tracking-tight transition-colors duration-500 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
            HeyPhil App Redesign
          </h1>
          <p className="text-teal-400 font-mono text-sm tracking-widest uppercase">PhilCare HMO App Conceptual UX Overhaul</p>
        </div>
        
        <p className={`text-xl leading-relaxed max-w-3xl mt-8 mb-10 transition-colors duration-500 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
          A comprehensive UI/UX redesign of PhilCare's official HMO mobile application. The primary goal was to resolve existing user friction points in acquiring Letter of Authorizations (LOAs) and booking online doctor consultations.
        </p>

        <div className="flex flex-wrap gap-3">
          {["Figma", "UI/UX Design", "Wireframing", "User Research", "Mobile App Design"].map((tech) => (
            <span key={tech} className="bg-teal-400/10 border border-teal-400/30 text-teal-600 dark:text-teal-300 px-4 py-1.5 text-sm font-mono rounded-full font-semibold">
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* UX CASE STUDY SECTION */}
      <section className="w-full max-w-5xl mx-auto px-6 mb-32 space-y-16 relative z-10">
        
        <div className={`grid md:grid-cols-3 gap-12 border-t pt-12 transition-colors duration-500 ${theme === 'light' ? 'border-slate-300' : 'border-slate-700/50'}`}>
          <div className="md:col-span-2 space-y-6">
            <h2 className={`${outfit.className} text-2xl font-bold transition-colors duration-500 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>The Problem & The Solution</h2>
            <p className="text-lg leading-relaxed">
              Healthcare applications need to be incredibly intuitive because users often access them during times of distress or illness. The original app suffered from cluttered navigation and a confusing process for generating LOAs. 
            </p>
            <p className="text-lg leading-relaxed">
              For this redesign, I conducted a heuristic evaluation of the app and rebuilt the user flow from the ground up. I utilized a modern, calming color palette and prioritized accessibility to ensure that members can get the healthcare assistance they need with minimal taps.
            </p>
          </div>
          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-colors duration-500 ${theme === 'light' ? 'bg-white/70 border-slate-300 shadow-sm' : 'bg-brand-surface border-slate-700/50'}`}>
            <h3 className="font-bold text-teal-400 mb-4 font-mono text-xs uppercase tracking-tighter">Project Details</h3>
            <ul className={`space-y-4 text-sm transition-colors duration-500 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
              <li>
                <span className={`block font-mono text-xs mb-1 transition-colors duration-500 ${theme === 'light' ? 'text-slate-500' : 'text-brand-body/50'}`}>Role</span>
                UI/UX Designer
              </li>
              <li>
                <span className={`block font-mono text-xs mb-1 transition-colors duration-500 ${theme === 'light' ? 'text-slate-500' : 'text-brand-body/50'}`}>Deliverables</span>
                High-Fidelity UI Mockups, User Flow Diagrams
              </li>
              <li>
                <span className={`block font-mono text-xs mb-1 transition-colors duration-500 ${theme === 'light' ? 'text-slate-500' : 'text-brand-body/50'}`}>Focus Areas</span>
                LOA Automation, Telehealth (DigiMed) Interface
              </li>
            </ul>
          </div>
        </div>

        {/* SINGLE MOCKUP COMPILATION SHOWCASE */}
        <div className={`w-full rounded-2xl border overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.01] ${theme === 'light' ? 'bg-white border-slate-300' : 'bg-brand-surface border-slate-700/50'}`}>
          <img 
            src="/heyphil-redesign/HeyPhil.png" 
            alt="HeyPhil App Redesign Compilation" 
            className="w-full h-auto object-cover"
          />
        </div>
        
      </section>

      {/* FOOTER */}
      <footer className={`w-full border-t py-12 text-center mt-auto relative z-20 transition-colors duration-500 ${theme === 'light' ? 'border-slate-300 bg-transparent' : 'border-slate-700/50 bg-brand-canvas'}`}>
        <p className={`text-sm font-mono transition-colors duration-500 ${theme === 'light' ? 'text-slate-500' : 'text-brand-body/50'}`}>
          UI/UX Redesign Concept by John Adrian Mijares.
        </p>
      </footer>
    </div>
  );
}
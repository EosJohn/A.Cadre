"use client";
import { useState, useEffect, Suspense } from "react";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { experienceData, projectsData, educationData, certificationsData } from "@/data/portfolio";
import OracleChat from './components/OracleChat';

const outfit = Outfit({ subsets: ["latin"] });

export default function Home() {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    window.dispatchEvent(new Event("themeChanged"));
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsNavVisible(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`min-h-screen font-sans selection:bg-teal-400 flex flex-col transition-colors duration-500 ${theme === 'light' ? 'text-slate-800' : 'text-slate-300'}`}>

      {/* TOP NAVIGATION */}
      <nav className={`fixed top-0 z-50 w-full flex items-center justify-between px-6 py-2 md:py-3 md:px-12 lg:px-20 backdrop-blur-md border-b transition-all duration-500 ease-in-out ${isNavVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} ${theme === 'light' ? 'bg-white/80 border-slate-200' : 'bg-[#0f172a]/80 border-slate-700/50'}`}>
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-center">
          <img src="/A.Cadre.png" alt="A.Cadre Logo" className="h-24 md:h-32 w-auto hover:opacity-80 transition-transform hover:scale-105 drop-shadow-lg cursor-pointer duration-300" />
        </a>
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <ul className={`flex gap-8 lg:gap-10 text-sm font-medium tracking-wide ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
            {['about', 'experience', 'projects', 'education', 'contact'].map((item, index) => (
              <li key={item} className="flex items-center">
                <a href={`#${item}`} className={`capitalize transition-colors hover:text-teal-400 ${activeSection === item ? 'text-teal-400 font-bold' : ''}`}>
                  <span className="text-teal-400 font-mono mr-1.5 text-xs">0{index + 1}.</span>{item}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 border-l border-slate-500/30 pl-6 ml-2">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="border border-teal-400 text-teal-400 px-5 py-2 rounded font-mono text-sm hover:bg-teal-400/10 transition-colors">Resume</a>
            {mounted && (
              <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'text-teal-400 hover:bg-teal-400/10' : 'text-amber-500 hover:bg-amber-500/10'}`} aria-label="Toggle Theme">
                {theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
                )}
              </button>
            )}
          </div>
        </div>
        <div className="md:hidden flex items-center gap-4">
          {mounted && (
            <button onClick={toggleTheme} className={`p-1.5 rounded-full transition-colors ${theme === 'dark' ? 'text-teal-400' : 'text-amber-500'}`}>
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
              )}
            </button>
          )}
          <button className={`p-2 transition-colors ${theme === 'light' ? 'text-slate-800 hover:text-teal-600' : 'text-slate-200 hover:text-teal-400'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
            </svg>
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className={`absolute top-full left-0 w-full backdrop-blur-md border-b shadow-lg md:hidden flex flex-col px-6 py-6 gap-6 items-center ${theme === 'light' ? 'bg-white/95 border-slate-200' : 'bg-[#0f172a]/95 border-slate-700/50'}`}>
            {['about', 'experience', 'projects', 'education', 'contact'].map((item, index) => (
              <a key={item} href={`#${item}`} onClick={() => setIsMobileMenuOpen(false)} className={`capitalize text-sm font-medium transition-colors hover:text-teal-400 ${activeSection === item ? 'text-teal-400' : (theme === 'light' ? 'text-slate-700' : 'text-slate-300')}`}>
                <span className="text-teal-400 font-mono mr-2">0{index + 1}.</span>{item}
              </a>
            ))}
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center border border-teal-400 text-teal-400 px-4 py-3 rounded font-mono text-sm hover:bg-teal-400/10 transition-colors mt-2">Resume</a>
          </div>
        )}
      </nav>

      {/* MAIN CONTENT — no z-index here, nav z-50 is enough */}
      <main className="w-full pt-32 pb-24 flex-grow">

        {/* HERO SECTION */}
        <section className="min-h-[70vh] flex flex-col justify-center mb-24 mx-auto max-w-4xl px-6 md:px-12">
          <p className="text-teal-400 font-mono mb-4 text-sm md:text-base tracking-wide">Hi, my name is</p>
          <h1 className={`${outfit.className} text-5xl md:text-7xl font-bold tracking-tight transition-colors duration-500 ${theme === 'light' ? 'text-slate-900' : 'text-brand-heading'}`}>John Adrian Mijares</h1>
          <h2 className={`${outfit.className} text-4xl md:text-6xl font-bold mb-6 tracking-tight transition-colors duration-500 ${theme === 'light' ? 'text-slate-600' : 'text-brand-body/60'}`}>I build logical digital systems.</h2>
          <p className={`max-w-xl text-lg leading-relaxed mb-10 transition-colors duration-500 ${theme === 'light' ? 'text-slate-700' : 'text-brand-body'}`}>I'm a UI/UX Designer and Software Developer specializing in architecting clean, efficient digital experiences and civic technology solutions.</p>
          <div>
            <a href="#projects" className="inline-block border-2 border-teal-400 text-teal-400 hover:bg-teal-400/10 transition-all duration-300 px-8 py-4 rounded-md font-mono text-sm font-bold shadow-[0_0_10px_rgba(45,212,191,0.1)] hover:shadow-[0_0_15px_rgba(45,212,191,0.2)]">Check out my work!</a>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="mb-32 scroll-mt-32 mx-auto max-w-4xl px-6 md:px-12">
          <div className="flex items-center mb-8">
            <h2 className={`${outfit.className} text-2xl md:text-3xl font-bold transition-colors duration-500 ${theme === 'light' ? 'text-slate-900' : 'text-brand-heading'}`}><span className="text-teal-400 font-mono text-xl mr-2">01.</span> About Me</h2>
            <div className={`h-px ml-6 flex-grow max-w-xs transition-colors duration-500 ${theme === 'light' ? 'bg-slate-300' : 'bg-slate-700/50'}`}></div>
          </div>
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className={`leading-relaxed max-w-xl text-lg flex-1 space-y-6 transition-colors duration-500 ${theme === 'light' ? 'text-slate-700' : 'text-brand-body'}`}>
              <p>By day, I serve as a <span className="text-teal-400 font-semibold">Planning Officer I</span> for the Municipality of Real, Quezon, where I leverage my IT background to <span className="text-teal-400 font-semibold">automate government systems</span> and manage network infrastructure.</p>
              <p>By night, I'm a freelance developer and designer. I thrive on building <span className="text-teal-400 font-semibold">C#/.NET</span> systems and crafting UI/UX, always <span className="text-teal-400 font-semibold">integrating AI to push the boundaries</span> of my development speed and code quality. <span className="text-teal-400 font-semibold">I don't just use tech; I build systems that make work—and life—easier.</span></p>
            </div>
            <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto md:mx-0 group mt-4 md:mt-0 shrink-0">
              <div className="absolute inset-0 border-2 border-teal-400 rounded-md translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
              <img src="/profile.jpg" alt="John Adrian Mijares" className="relative z-10 w-full h-full object-cover rounded-md grayscale hover:grayscale-0 transition-all duration-500" />
              <div className="absolute inset-0 bg-teal-400/20 group-hover:bg-transparent transition-colors duration-500 z-20 rounded-md pointer-events-none mix-blend-multiply"></div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="mb-32 scroll-mt-32 mx-auto max-w-4xl px-6 md:px-12">
          <div className="flex items-center mb-8">
            <h2 className={`${outfit.className} text-2xl md:text-3xl font-bold transition-colors duration-500 ${theme === 'light' ? 'text-slate-900' : 'text-brand-heading'}`}><span className="text-teal-400 font-mono text-xl mr-2">02.</span> Where I've Worked</h2>
            <div className={`h-px ml-6 flex-grow max-w-xs transition-colors duration-500 ${theme === 'light' ? 'bg-slate-300' : 'bg-slate-700/50'}`}></div>
          </div>
          <div className="max-w-2xl">
            {experienceData.map((exp) => (
              <div key={exp.id} className={`mb-10 pl-6 border-l-2 py-4 rounded-r-lg transition-all duration-300 -ml-4 ${theme === 'light' ? 'border-slate-300 hover:border-teal-400 hover:bg-slate-100' : 'border-slate-700/50 hover:border-teal-400 hover:bg-teal-400/5'}`}>
                <h3 className={`text-xl font-medium mb-1 transition-colors duration-500 ${theme === 'light' ? 'text-slate-900' : 'text-brand-heading'}`}>{exp.role} <span className="text-teal-400">@ {exp.company}</span></h3>
                <p className="text-sm font-mono text-brand-sand mb-4">{exp.date}</p>
                <p className={`mb-6 transition-colors duration-500 ${theme === 'light' ? 'text-slate-700' : 'text-brand-body'}`}>{exp.description}</p>
                <ul className="flex flex-wrap gap-2">
                  {exp.tech.map((techItem, index) => (
                    <li key={index} className="bg-teal-400/10 border border-teal-400/30 text-teal-600 dark:text-teal-300 px-4 py-1.5 text-xs font-mono rounded-full font-semibold tracking-wide">{techItem}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="mb-32 scroll-mt-32 mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex items-center mb-12 max-w-4xl mx-auto">
            <h2 className={`${outfit.className} text-2xl md:text-3xl font-bold transition-colors duration-500 ${theme === 'light' ? 'text-slate-900' : 'text-brand-heading'}`}><span className="text-teal-400 font-mono text-xl mr-2">03.</span> Some Things I've Built</h2>
            <div className={`h-px ml-6 flex-grow max-w-xs transition-colors duration-500 ${theme === 'light' ? 'bg-slate-300' : 'bg-slate-700/50'}`}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {projectsData.map((project) => {
              let projectLink = project.link;
              if (project.title.includes("Agro")) projectLink = "/projects/agro-landing";
              if (project.title.includes("HeyPhil")) projectLink = "/projects/heyphil-redesign";
              if (project.title.includes("Zoning")) projectLink = "/projects/zoning-system";
              if (project.title.includes("IGM")) projectLink = "/projects/igm-events";
              if (project.title.includes("Collage")) projectLink = "/projects/digital-collages";

              const isExternal = projectLink.startsWith("http");

              return (
                <Link
                  key={project.id}
                  href={projectLink}
                  target={isExternal ? "_blank" : "_self"}
                  rel={isExternal ? "noopener noreferrer" : ""}
                  className="bg-brand-surface rounded-xl border border-slate-700/50 hover:-translate-y-2 hover:border-teal-400 hover:shadow-[0_10px_30px_rgba(45,212,191,0.1)] transition-all duration-300 flex flex-col group cursor-pointer overflow-hidden backdrop-blur-sm"
                >
                  {project.image && (
                    <div className={`w-full h-56 overflow-hidden border-b transition-colors duration-500 ${theme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-slate-800/50 border-slate-700/50'}`}>
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className={`text-xl font-bold mb-3 group-hover:text-teal-400 flex items-center transition-colors duration-500 ${theme === 'light' ? 'text-slate-900' : 'text-brand-heading'}`}>
                      {project.title}
                      {isExternal && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      )}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-6 flex-grow transition-colors duration-500 ${theme === 'light' ? 'text-slate-600' : 'text-brand-body'}`}>{project.description}</p>
                    <ul className="flex flex-wrap gap-2 mt-auto mb-6">
                      {project.tech.map((techItem, index) => (
                        <li key={index} className="bg-teal-400/10 border border-teal-400/30 text-teal-600 dark:text-teal-300 px-3 py-1 text-xs font-mono rounded-full font-semibold tracking-wide">{techItem}</li>
                      ))}
                    </ul>
                    <div className="mt-auto flex items-center text-teal-400 font-mono text-sm font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      {isExternal ? "View Live Project" : "Read Case Study"}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS SECTION */}
        <section id="education" className="mb-32 scroll-mt-32 mx-auto max-w-4xl px-6 md:px-12">
          <div className="flex items-center mb-12">
            <h2 className={`${outfit.className} text-2xl md:text-3xl font-bold transition-colors duration-500 ${theme === 'light' ? 'text-slate-900' : 'text-brand-heading'}`}><span className="text-teal-400 font-mono text-xl mr-2">04.</span> Education & Certifications</h2>
            <div className={`h-px ml-6 flex-grow max-w-xs transition-colors duration-500 ${theme === 'light' ? 'bg-slate-300' : 'bg-slate-700/50'}`}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className={`text-xl font-bold mb-6 flex items-center transition-colors duration-500 ${theme === 'light' ? 'text-slate-900' : 'text-brand-heading'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-brand-sand" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                Licenses & Certifications
              </h3>
              <div className="space-y-6">
                {certificationsData.map((cert) => (
                  <div key={cert.id} className={`border-l-2 hover:border-teal-400 transition-colors pl-4 ${theme === 'light' ? 'border-slate-300' : 'border-slate-700/50'}`}>
                    <h4 className={`font-medium transition-colors duration-500 ${theme === 'light' ? 'text-slate-900' : 'text-brand-heading'}`}>{cert.title}</h4>
                    <p className={`text-sm mt-1 transition-colors duration-500 ${theme === 'light' ? 'text-slate-600' : 'text-brand-body'}`}>{cert.issuer}</p>
                    <div className="mt-3"><span className="bg-teal-400/10 border border-teal-400/30 text-teal-600 dark:text-teal-300 px-3 py-1 text-xs font-mono rounded-full font-semibold">{cert.date}</span></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className={`text-xl font-bold mb-6 flex items-center transition-colors duration-500 ${theme === 'light' ? 'text-slate-900' : 'text-brand-heading'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                Academic Background
              </h3>
              <div className="space-y-6">
                {educationData.map((edu) => (
                  <div key={edu.id} className={`border-l-2 hover:border-teal-400 transition-colors pl-4 ${theme === 'light' ? 'border-slate-300' : 'border-slate-700/50'}`}>
                    <h4 className={`font-medium transition-colors duration-500 ${theme === 'light' ? 'text-slate-900' : 'text-brand-heading'}`}>{edu.degree}</h4>
                    <p className={`text-sm mt-1 transition-colors duration-500 ${theme === 'light' ? 'text-slate-600' : 'text-brand-body'}`}>{edu.school}</p>
                    <div className="mt-3"><span className="bg-teal-400/10 border border-teal-400/30 text-teal-600 dark:text-teal-300 px-3 py-1 text-xs font-mono rounded-full font-semibold">{edu.date}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="mb-32 scroll-mt-32 mx-auto max-w-2xl px-6 text-center flex flex-col items-center">
          <p className="text-teal-400 font-mono mb-4">05. What&apos;s Next?</p>
          <h2 className={`${outfit.className} text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500 ${theme === 'light' ? 'text-slate-900' : 'text-brand-heading'}`}>Get In Touch</h2>
          <p className={`text-lg leading-relaxed mb-10 transition-colors duration-500 ${theme === 'light' ? 'text-slate-700' : 'text-brand-body'}`}>I&apos;m currently open to new opportunities where I can blend my expertise in system architecture and UI/UX design. Whether you have an open role on your team, a freelance project, or just want to connect, my inbox is always open. Let&apos;s build something impactful together!</p>
          <a href="mailto:johnadrian.mijares@gmail.com" className="inline-block border-2 border-teal-400 text-teal-400 hover:bg-teal-400/10 transition-all duration-300 px-8 py-4 rounded-md font-mono text-sm font-bold shadow-[0_0_10px_rgba(45,212,191,0.1)] hover:shadow-[0_0_15px_rgba(45,212,191,0.2)]">Say Hello</a>
        </section>
      </main>

      {/* FOOTER */}
      <footer className={`w-full border-t py-8 text-center mt-auto transition-colors duration-500 ${theme === 'light' ? 'border-slate-300 bg-transparent' : 'border-slate-700/50 bg-brand-canvas'}`}>
        <div className={`flex justify-center gap-6 mb-4 font-mono text-sm transition-colors duration-500 ${theme === 'light' ? 'text-slate-700' : 'text-brand-body'}`}>
          <a href="https://github.com/EosJohn" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/john-adrian-mijares/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">LinkedIn</a>
          <a href="mailto:johnadrian.mijares@gmail.com" className="hover:text-teal-400 transition-colors">Email</a>
        </div>
        <p className={`text-sm font-mono transition-colors duration-500 ${theme === 'light' ? 'text-slate-500' : 'text-brand-body/50'}`}>Built by John Adrian Mijares. <br className="md:hidden" />Inspired by Brittany Chiang.</p>
      </footer>
   <Suspense fallback={null}>
        <OracleChat />
      </Suspense>
    </div>
  );
}

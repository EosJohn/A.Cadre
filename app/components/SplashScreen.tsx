"use client";

import { useEffect, useState } from "react";
import ParticleNetwork from "./ParticleNetwork"; 

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [startFadeOut, setStartFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const progressTimer = setTimeout(() => {
      setProgress(100);
    }, 100);

    const fadeTimer = setTimeout(() => {
      setStartFadeOut(true);
    }, 8000);

    const removeTimer = setTimeout(() => {
      setShowSplash(false);
      document.body.style.overflow = "auto";
    }, 9500);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!showSplash) return null;

  return (
    <div
      style={{ zIndex: 1000000 }}
      className={`fixed inset-0 flex flex-col items-center justify-center bg-[#0f172a] transition-all duration-[1500ms] ease-in-out ${
        startFadeOut ? "opacity-0 scale-105 blur-sm" : "opacity-100 scale-100"
      }`}
    >
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <ParticleNetwork />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        
        {/* THE LOGO */}
        <img
          src="/A.Cadre.png"
          alt="A.Cadre Initializing"
          className="h-36 md:h-56 w-auto animate-pulse drop-shadow-[0_0_35px_rgba(45,212,191,0.4)]"
        />

        {/* LOADING SECTION - Mas malapit na sa logo */}
        <div className="mt-1 flex flex-col items-center w-72">
          {/* Status Text */}
          <div className="text-teal-400 font-mono text-[9px] mb-3 tracking-[0.4em] uppercase animate-pulse opacity-80">
            System Initializing
          </div>
          
          {/* Techy Progress Bar */}
          <div className="w-full h-[2px] bg-slate-800/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-600 via-teal-400 to-teal-300 transition-all ease-in-out shadow-[0_0_10px_rgba(45,212,191,0.6)]"
              style={{ 
                width: `${progress}%`,
                transitionDuration: "8000ms" 
              }}
            />
          </div>

          <div className="mt-4 text-slate-500 font-mono text-[7px] tracking-[0.2em] uppercase opacity-30">
            A.Cadre OS v1.0
          </div>
        </div>
        
      </div>
    </div>
  );
}
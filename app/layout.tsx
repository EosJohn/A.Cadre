import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import ParticleNetwork from "./components/ParticleNetwork";
import CustomCursor from "./components/CustomCursor";
import SplashScreen from "./components/SplashScreen"; 
import { Suspense } from "react";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JAM | Civic Technologist & Developer",
  description: "Architecting logical systems and engineering clean digital experiences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // ✅ FIX 1: Nilagyan natin ng overflow-x-hidden sa html at body para walang kaba sa responsive
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body className={`${dmSans.className} bg-brand-canvas text-brand-navy antialiased relative min-h-screen overflow-x-hidden`}>
        
        {/* 1. OVERLAYS (Highest Z) */}
        {/* Ang z-index nito ay handled internally (dapat > 100) */}
        <CustomCursor /> 
        <SplashScreen /> 
        
        {/* 2. BACKGROUND PARTICLES (Lowest Z) */}
        {/* ✅ BULLETPROOF FIX: Gumamit tayo ng z-[-1] at pointer-events-none. 
            Ibig sabihin, nasa pinakailalim siya at multo lang siya, hindi makakaharang sa click. */}
        <div className="fixed inset-0 z-[-1] pointer-events-none opacity-50">
          <Suspense fallback={null}>
            <ParticleNetwork />
          </Suspense>
        </div>
        
        {/* 3. MAIN CONTENT Wrapper (Middle Z) */}
        {/* ✅ SECRET SAUCE: Ang "relative z-10" dito ang pumwersa sa content na umibabaw sa particles. */}
        <div className="relative z-10 bg-transparent min-h-screen w-full">
          {children}
        </div>

      </body>
    </html>
  );
}
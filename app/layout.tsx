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
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body className={`${dmSans.className} bg-brand-canvas text-brand-navy antialiased relative min-h-screen overflow-x-hidden`}>
        
        {/* 1. OVERLAYS (Highest Z) */}
        {/* ✅ BULLETPROOF FIX: Binalot natin ng Suspense ang mga ito para hindi mag-panic ang Vercel pag nag-build ng 404 page */}
        <Suspense fallback={null}>
          <CustomCursor /> 
        </Suspense>
        
        <Suspense fallback={null}>
          <SplashScreen /> 
        </Suspense>
        
        {/* 2. BACKGROUND PARTICLES (Lowest Z) */}
        <div className="fixed inset-0 z-[-1] pointer-events-none opacity-50">
          <Suspense fallback={null}>
            <ParticleNetwork />
          </Suspense>
        </div>
        
        {/* 3. MAIN CONTENT Wrapper (Middle Z) */}
        <div className="relative z-10 bg-transparent min-h-screen w-full">
          {children}
        </div>

      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import ParticleNetwork from "./components/ParticleNetwork";
import CustomCursor from "./components/CustomCursor"; // ✅ 1. INIMPORT NATIN DITO
import { Suspense } from "react";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JAM | Civic Technologist & Developer",
  description: "Architecting logical systems and engineering clean digital experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${dmSans.className} bg-brand-canvas text-brand-navy antialiased relative min-h-screen`}>
        
        {/* ✅ 2. ILINAGAY ANG CUSTOM CURSOR SA PINAKATAAS NG BODY */}
        <CustomCursor />
        
        {/* BINALOT NATIN NG SUSPENSE PARA PUMASA SA BUILD */}
        <Suspense fallback={null}>
          <ParticleNetwork />
        </Suspense>
        
        <div className="relative z-10 bg-transparent">
          {children}
        </div>
      </body>
    </html>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // BAGO: Track the theme inside the Canvas
  const [theme, setTheme] = useState("dark");

  // BAGO: Makinig sa Light/Dark button na nasa page.tsx
  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "dark");

    const handleThemeChange = () => {
      setTheme(localStorage.getItem("theme") || "dark");
    };

    window.addEventListener("themeChanged", handleThemeChange);
    return () => window.removeEventListener("themeChanged", handleThemeChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // BAGO: Ang Magic Color Switcher natin!
    // Slate 700 (51, 65, 85) for Light Mode | Teal 400 (45, 212, 191) for Dark Mode
    const rgb = theme === "light" ? "51, 65, 85" : "45, 212, 191";

    let particlesArray: any[] = [];
    let animationFrameId: number;
    let isRunning = true; 

    const setCanvasSize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseOut = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    class ConstellationStar {
      pctX: number; pctY: number; x: number; y: number; size: number; offset: number;
      constructor(pctX: number, pctY: number) {
        this.pctX = pctX;
        this.pctY = pctY;
        this.x = 0;
        this.y = 0;
        this.size = Math.random() * 2 + 1.5;
        this.offset = Math.random() * 100;
      }
      update(canvasWidth: number, canvasHeight: number) {
        let targetX = canvasWidth * this.pctX;
        let targetY = canvasHeight * this.pctY;
        this.x = targetX + Math.sin((Date.now() * 0.001) + this.offset) * 15;
        this.y = targetY + Math.cos((Date.now() * 0.001) + this.offset) * 15;
      }
    }

    const constellations = [
      {
        name: "Aquarius", 
        stars: [
          new ConstellationStar(0.15, 0.35), new ConstellationStar(0.20, 0.25), 
          new ConstellationStar(0.28, 0.28), new ConstellationStar(0.35, 0.20), 
          new ConstellationStar(0.22, 0.45), new ConstellationStar(0.30, 0.50), 
        ],
        edges: [,,,,]
      },
      {
        name: "Capricorn", 
        stars: [
          new ConstellationStar(0.75, 0.25), new ConstellationStar(0.85, 0.30), 
          new ConstellationStar(0.88, 0.45), new ConstellationStar(0.78, 0.55), 
          new ConstellationStar(0.68, 0.45), 
        ],
        edges: [,,,,]
      }
    ];

    class Particle {
      x: number; y: number; dx: number; dy: number; size: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.dx = (Math.random() - 0.5) * 1.2;
        this.dy = (Math.random() - 0.5) * 1.2;
        this.size = Math.random() * 2 + 0.5;
      }
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, 0.4)`; // Ginamit ang color variable
        ctx.fill();
      }
      update() {
        if (!canvas) return;
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    const init = () => {
      setCanvasSize();
      particlesArray = [];
      if (!canvas) return;
      let numberOfParticles = (canvas.width * canvas.height) / 15000; 
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    const animate = () => {
      if (!isRunning || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }

      constellations.forEach(constellation => {
        ctx.strokeStyle = `rgba(${rgb}, 0.15)`; // Ginamit ang color variable
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        constellation.edges.forEach((edge: any) => {
           const s1 = constellation.stars[edge];
           const s2 = constellation.stars[edge];
           
           if(s1 && s2) {
             ctx.moveTo(s1.x, s1.y);
             ctx.lineTo(s2.x, s2.y);
           }
        });
        ctx.stroke();

        constellation.stars.forEach(star => {
           star.update(canvas.width, canvas.height);
           ctx.beginPath();
           ctx.arc(star.x, star.y, star.size + 1.5, 0, Math.PI*2);
           ctx.fillStyle = `rgba(${rgb}, 0.9)`; // Ginamit ang color variable
           ctx.fill();

           let dx = star.x - mouse.x;
           let dy = star.y - mouse.y;
           let dist = dx*dx + dy*dy;
           if(dist < 40000) {
             ctx.strokeStyle = `rgba(${rgb}, ${(1 - dist/40000) * 0.8})`; // Ginamit ang color variable
             ctx.lineWidth = 1.5;
             ctx.beginPath();
             ctx.moveTo(star.x, star.y);
             ctx.lineTo(mouse.x, mouse.y);
             ctx.stroke();
           }
        });
      });

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = dx * dx + dy * dy;

          if (distance < 12000) {
            let opacityValue = 1 - distance / 12000;
            ctx!.strokeStyle = `rgba(${rgb}, ${opacityValue * 0.2})`; // Ginamit ang color variable
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx!.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx!.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleWakeUp = () => {
      init(); 
    };

    window.addEventListener("resize", handleWakeUp);
    window.addEventListener("popstate", handleWakeUp); 
    window.addEventListener("pageshow", handleWakeUp); 

    return () => {
      isRunning = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", handleWakeUp);
      window.removeEventListener("popstate", handleWakeUp);
      window.removeEventListener("pageshow", handleWakeUp);
      cancelAnimationFrame(animationFrameId);
    };
  // BAGO: Dinagdag natin ang 'theme' dito para kapag nag-click ka, magre-redraw agad ang stars!
  }, [pathname, searchParams, theme]); 

return (
    <>
      {/* 1. SOLID BACKGROUND: Ito yung magpapalit ng puti at dark navy */}
      <div 
        className={`fixed inset-0 pointer-events-none transition-colors duration-500 ${theme === 'light' ? 'bg-slate-50' : 'bg-[#0f172a]'}`} 
        aria-hidden="true" 
      />
      
      {/* 2. STARS LAYER: Tinanggal natin yung z-[-1] para hindi siya lumubog! Nakapatong na siya agad sa background natin. */}
      <canvas 
        key={pathname} 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none opacity-70" 
      />
    </>
  );
}
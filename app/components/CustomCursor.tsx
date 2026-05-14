"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const isHovering = useRef(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    setIsVisible(true);

    const checkTheme = () => {
      const currentTheme = localStorage.getItem("theme");
      setIsDark(currentTheme !== "light");
    };
    checkTheme();
    window.addEventListener("themeChanged", checkTheme);

    const moveCursor = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX.current - 5}px, ${mouseY.current - 5}px, 0) scale(${isHovering.current ? 0.5 : 1})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${mouseX.current - 20}px, ${mouseY.current - 20}px, 0) scale(${isHovering.current ? 1.5 : 1})`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      isHovering.current = 
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button";

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX.current - 5}px, ${mouseY.current - 5}px, 0) scale(${isHovering.current ? 0.5 : 1})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${mouseX.current - 20}px, ${mouseY.current - 20}px, 0) scale(${isHovering.current ? 1.5 : 1})`;
        
        const currentThemeDark = localStorage.getItem("theme") !== "light";
        // ✅ BAGO: rgba(19,78,74,0.15) ang gamit natin para sa dark hover effect sa Day Mode
        ringRef.current.style.backgroundColor = isHovering.current 
          ? (currentThemeDark ? "rgba(45,212,191,0.15)" : "rgba(19,78,74,0.15)") 
          : "transparent";
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("themeChanged", checkTheme);
    };
  }, []);

  if (!isVisible) return null;

  // ✅ BAGO: Neon Teal (#2dd4bf) sa Dark, tapos Very Dark Teal (#134e4a) sa Light
  const cursorColor = isDark ? "#2dd4bf" : "#134e4a";

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none transition-transform duration-75 ease-out"
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: cursorColor,
          // Sa light mode, inalis ko muna yung glow/shadow para mas sharp tignan. Kung gusto mo ibalik, tanggalin lang yung condition.
          boxShadow: isDark ? `0 0 10px ${cursorColor}` : "none",
          zIndex: 999999,
        }}
      />
      
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none transition-all duration-300 ease-out border-2"
        style={{
          width: "40px",
          height: "40px",
          borderColor: cursorColor,
          zIndex: 999998,
        }}
      />
    </>
  );
}
"use client";

import { useState, useEffect, useRef } from "react";

export default function OracleChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Default na bati agad ng Oracle pagkabukas
  const [messages, setMessages] = useState([
    { role: "oracle", content: "Greetings. I am the A.Cadre Oracle. What would you like to know about John Adrian's projects or skills?" }
  ]);

  // Ito yung gagamitin natin para sa Auto-Scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic: Tuwing may bagong message o naglo-loading, bababa yung screen
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    
    // I-display muna yung tinype ng user
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await res.json();

      // I-display yung sagot ng Oracle
      setMessages((prev) => [
        ...prev,
        { role: "oracle", content: data.text || "System error. No response." }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "oracle", content: "Connection lost. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* CHAT WINDOW (Lilitaw lang kapag isOpen = true) */}
      <div 
        className={`mb-4 w-[90vw] md:w-[400px] max-h-[80vh] flex flex-col bg-[#0f172a]/95 backdrop-blur-md border border-teal-400/30 rounded-2xl shadow-[0_0_30px_rgba(45,212,191,0.15)] transition-all duration-300 transform origin-bottom-right ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"}`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50 bg-slate-800/50 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(45,212,191,0.8)]"></div>
            <h3 className="text-teal-400 font-mono text-sm font-bold tracking-widest">A.CADRE ORACLE</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* MESSAGE BOX */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-[300px] max-h-[400px] custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div 
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-teal-500/20 text-teal-100 border border-teal-500/30 rounded-tr-sm" 
                    : "bg-slate-800/80 text-slate-200 border border-slate-700/50 rounded-tl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* THINKING ANIMATION (Lilitaw habang naghihintay ng sagot) */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800/80 border border-slate-700/50 p-4 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          )}
          
          {/* Invisible div para sa auto-scroll target */}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT AREA */}
        <form onSubmit={sendMessage} className="p-3 border-t border-slate-700/50 bg-slate-800/50 rounded-b-2xl flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about John Adrian..."
            className="flex-1 bg-[#0f172a] text-slate-200 text-sm px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all placeholder-slate-500"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-teal-500/20 text-teal-400 border border-teal-500/50 p-3 rounded-xl hover:bg-teal-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>

      {/* FLOATING ACTION BUTTON (Yung bilog na pipindutin para mag-open) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-slate-800 border-2 border-teal-400 text-teal-400 flex items-center justify-center shadow-[0_0_15px_rgba(45,212,191,0.3)] hover:shadow-[0_0_25px_rgba(45,212,191,0.5)] hover:scale-110 transition-all duration-300 z-50 group"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
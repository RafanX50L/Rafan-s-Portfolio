import { Terminal, Github, Linkedin, Mail, ArrowDown, Shield, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const statCards = [
    { value: "06+ Months", label: "Remote Prof. Experience", desc: "SvelteKit & Bun backends" },
    { value: "05+ Deployed", label: "Enterprise Projects", desc: "E-Commerce, AI Gym, Quizzes" },
    { value: "1000x+", label: "Microscopy Deep Zoom", desc: "OpenSeadragon integration" },
    { value: "SOLID / MVC", label: "Architecture Models", desc: "Maintainable clean code" }
  ];

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      
      {/* Decorative vector background matrix grids */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle dark glow */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[800px] bg-zinc-800/[0.02] rounded-full blur-[120px]" />
        
        {/* Vector code-like grids lines */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-10 text-center">
        
        {/* Available for hire Pill */}
        <div className="inline-flex items-center gap-2 bg-[#111] border border-[#222] px-4 py-2 rounded-full text-[10px] font-mono text-zinc-400 font-semibold uppercase tracking-[0.18em] animate-fade-in mx-auto">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-300"></span>
          </span>
          Available for remote consulting & developer roles
        </div>

        {/* Display Typography */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight text-[#F5F5F5] leading-[1.08]">
            Muhammed <span className="font-semibold text-white">Rafan</span>
          </h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.25em] font-bold">
            {PERSONAL_INFO.title}
          </p>
        </div>

        {/* Dynamic developer profile details summary */}
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl mx-auto font-sans font-normal animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {PERSONAL_INFO.summary}
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 animate-fade-in animate-delay-200">
          <button
            onClick={() => handleScrollTo("#projects")}
            className="px-6 py-3 bg-white text-black text-[10px] uppercase tracking-widest font-bold py-3 hover:bg-zinc-200 transition-colors rounded cursor-pointer flex items-center gap-2"
            id="btn-hero-projects"
          >
            <Terminal className="w-3.5 h-3.5" /> Explore Systems Sandbox
          </button>
          
          <button
            onClick={() => handleScrollTo("#contact")}
            className="px-6 py-3 bg-[#111] border border-[#222] text-zinc-300 hover:text-white text-[10px] uppercase tracking-widest font-bold py-3 hover:bg-zinc-900 transition-colors rounded cursor-pointer flex items-center gap-2"
            id="btn-hero-contact"
          >
            <Mail className="w-3.5 h-3.5 text-zinc-400" /> Dispatch Inquiry
          </button>
        </div>

        {/* Tech Quick Icons strip */}
        <div className="pt-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold mb-4">
            Core Technological Competency Matrix
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["SvelteKit", "Next.js", "React.js", "TypeScript", "Elysia.js", "Bun", "Node.js", "Express.js", "MongoDB", "OpenSeadragon"].map((tech) => (
              <span 
                key={tech} 
                className="px-3 py-1 bg-[#1A1A1A] border border-[#222] text-[11px] rounded-full text-zinc-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Summary Stat Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {statCards.map((stat, i) => (
            <div 
              key={i} 
              className="bg-[#111] border border-[#222] rounded p-5 text-left hover:border-zinc-700 transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl font-light text-white">
                {stat.value}
              </div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-semibold mt-1.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-zinc-400 font-sans mt-1 leading-normal">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Chevron down prompt */}
        <div className="pt-10 animate-bounce" style={{ animationDuration: '3s' }}>
          <button 
            onClick={() => handleScrollTo("#skills")} 
            className="text-zinc-600 hover:text-white p-2 rounded-full transition-all cursor-pointer"
            aria-label="Scroll to core skills"
            id="btn-hero-scroll-prompt"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

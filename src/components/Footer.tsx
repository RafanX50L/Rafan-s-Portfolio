import { Terminal, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Footer() {
  const scrollToTop = () => {
    const element = document.querySelector("#hero");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#222222] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        
        {/* Left Side Info */}
        <div className="text-left space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-[#F5F5F5] font-mono text-[10px] font-bold">
              MR
            </div>
            <span className="text-xs font-mono text-zinc-300 font-bold uppercase tracking-wider">
              Muhammed Rafan M
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 font-mono">
            Designed from scratch in React, Vite, and Tailwind CSS.
          </p>
        </div>

        {/* Mid social icons links */}
        <div className="flex items-center gap-4">
          <a 
            href={PERSONAL_INFO.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-zinc-500 hover:text-white transition-colors p-1"
            id="footer-github"
          >
            <Github className="w-4 h-4" />
          </a>
          <a 
            href={PERSONAL_INFO.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-zinc-500 hover:text-white transition-colors p-1"
            id="footer-linkedin"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a 
            href={`mailto:${PERSONAL_INFO.email}`}
            className="text-zinc-500 hover:text-white transition-colors p-1"
            id="footer-mail"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Scroll back to top */}
        <button 
          onClick={scrollToTop}
          className="text-zinc-500 hover:text-white transition-all flex items-center gap-1 text-[11px] font-mono cursor-pointer self-start md:self-auto hover:translate-y-[-1px]"
          id="btn-scroll-to-top"
        >
          <span>Scroll to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-[10px] text-zinc-600 font-mono mt-8 pt-6 border-t border-[#222222]">
        &copy; {new Date().getFullYear()} Muhammed Rafan M. All rights reserved. Built with solid design principles and clean code.
      </div>
    </footer>
  );
}

import { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, FileText, Terminal, Code, Briefcase, PhoneCall } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { label: "Overview", href: "#hero", icon: Terminal },
    { label: "Core Skills", href: "#skills", icon: Code },
    { label: "Experience", href: "#experience", icon: Briefcase },
    { label: "Projects", href: "#projects", icon: Terminal },
    { label: "Contact Gateway", href: "#contact", icon: Mail }
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#222222] z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a 
          href="#hero" 
          className="flex items-center gap-3 group cursor-pointer"
          onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
        >
          <div className="text-xl font-bold tracking-tighter text-[#F5F5F5]">
            MR<span className="text-[#555555]">.</span>
          </div>
          <div className="flex flex-col border-l border-[#222222] pl-3">
            <span className="text-[10px] font-sans text-zinc-400 font-bold tracking-widest leading-none group-hover:text-white transition-colors">
              MUHAMMED RAFAN M
            </span>
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none mt-1">
              FULL STACK DEVELOPER
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className="px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-[#151515] transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                id={`nav-${item.label.toLowerCase().replace(" ", "-")}`}
              >
                <Icon className="w-3 h-3 text-zinc-500" />
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action button & Socials links */}
        <div className="hidden lg:flex items-center gap-3 border-l border-[#222222] pl-4">
          <a 
            href={PERSONAL_INFO.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-zinc-400 hover:text-white p-1.5 rounded hover:bg-[#151515] transition-all duration-200"
            title="GitHub Profile"
            id="header-github"
          >
            <Github className="w-4 h-4" />
          </a>
          <a 
            href={PERSONAL_INFO.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-zinc-400 hover:text-white p-1.5 rounded hover:bg-[#151515] transition-all duration-200"
            title="LinkedIn Profile"
            id="header-linkedin"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <button 
            onClick={() => handleNavClick("#contact")}
            className="px-4 py-2 bg-white text-black hover:bg-zinc-200 text-[10px] uppercase tracking-widest font-bold transition-all rounded cursor-pointer duration-200"
            id="btn-header-hire"
          >
            Get In Touch
          </button>
        </div>

        {/* Mobile menu triggers */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-[#151515] transition-colors"
          aria-label="Toggle menu"
          id="btn-mobile-menu-toggle"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-[#222222] absolute top-16 left-0 w-full py-4 px-6 flex flex-col gap-4 animate-fade-in z-40">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className="flex items-center gap-3 py-3 px-3 rounded text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-[#151515] transition-all cursor-pointer"
                  id={`mobile-nav-${item.label.toLowerCase().replace(" ", "-")}`}
                >
                  <Icon className="w-3.5 h-3.5 text-zinc-500" />
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="h-[1px] bg-[#222222] my-1" />

          {/* Socials & Info inside drawer */}
          <div className="flex items-center justify-between px-3">
            <div className="flex items-center gap-3">
              <a 
                href={PERSONAL_INFO.github} 
                className="text-zinc-400 hover:text-white p-2 rounded bg-[#111] border border-[#222]"
                id="drawer-github"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href={PERSONAL_INFO.linkedin} 
                className="text-zinc-400 hover:text-white p-2 rounded bg-[#111] border border-[#222]"
                id="drawer-linkedin"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <button
              onClick={() => handleNavClick("#contact")}
              className="py-2.5 px-4 bg-white text-black hover:bg-zinc-200 rounded text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer"
              id="btn-drawer-hire"
            >
              Contact Gateway
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function App() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const handleSkillSelect = (skillName: string) => {
    // If already clicked, toggle off
    if (selectedSkill === skillName) {
      setSelectedSkill(null);
    } else {
      setSelectedSkill(skillName);
      // Auto scroll to projects section to see the active filter results
      const projectsSection = document.querySelector("#projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleClearSkillFilter = () => {
    setSelectedSkill(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black antialiased">
      
      {/* Background radial overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-emerald-500/[0.015] rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-indigo-500/[0.015] rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Navigation Bar */}
        <Header />

        {/* Primary Page Layout Sections */}
        <main className="flex-1">
          {/* Hero segment */}
          <Hero />

          {/* Skills segment */}
          <Skills 
            selectedSkill={selectedSkill} 
            onSkillSelect={handleSkillSelect} 
          />

          {/* Experience Timeline segment */}
          <Experience />

          {/* Projects Portfolio with Sandboxes */}
          <Projects 
            selectedSkill={selectedSkill} 
            onClearSkillFilter={handleClearSkillFilter} 
          />

          {/* Contact form segment */}
          <section id="contact" className="py-20 border-t border-[#222222]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">
                  TRANSMIT
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  Initiate Connection Gateway
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans max-w-2xl">
                  Let's collaborate! Leave a message below, and it will immediately register inside this portfolio's persistent message console.
                </p>
              </div>

              <ContactForm />
            </div>
          </section>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </div>
  );
}

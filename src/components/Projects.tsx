import { useState, useEffect } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data';
import { Terminal, Github, Link, Eye, Sparkles, Filter, X, Dumbbell, Award, Crosshair } from 'lucide-react';
import DeepZoomDemo from './DeepZoomDemo';
import LivePreviewDemo from './LivePreviewDemo';

interface ProjectsProps {
  selectedSkill: string | null;
  onClearSkillFilter: () => void;
}

export default function Projects({ selectedSkill, onClearSkillFilter }: ProjectsProps) {
  const [activeTab, setActiveTab] = useState<'featured' | 'additional' | 'sandboxes'>('featured');
  const [activeSandbox, setActiveSandbox] = useState<'deepzoom' | 'fitness' | 'quiz'>('deepzoom');

  // If a skill is selected, auto-switch to appropriate tab if needed, or filter list
  const filteredProjects = PROJECTS.filter(proj => {
    // Check tab category
    const matchesTab = activeTab === 'sandboxes' 
      ? true // handled separately
      : proj.category === activeTab;

    // Check skill
    const matchesSkill = selectedSkill 
      ? proj.technologies.some(tech => tech.toLowerCase().includes(selectedSkill.toLowerCase()))
      : true;

    return matchesTab && matchesSkill;
  });

  // If the selectedSkill is not available in the currently active tab, search which tab contains it and switch to it!
  useEffect(() => {
    if (selectedSkill && activeTab === 'sandboxes') {
      setActiveTab('featured');
    }
  }, [selectedSkill]);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Dumbbell': return <Dumbbell className="w-5 h-5 text-zinc-400" />;
      case 'Award': return <Award className="w-5 h-5 text-zinc-400" />;
      default: return <Terminal className="w-5 h-5 text-zinc-400" />;
    }
  };

  return (
    <section id="projects" className="py-20 border-t border-[#222222]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">
              PORTFOLIO PROJECTS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-[#F5F5F5] tracking-tight">
            Production-Ready Systems & Sandboxes
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans max-w-2xl">
            A selection of highly-optimized systems, each architected cleanly with modular state machines, role-based security filters, and interactive interfaces.
          </p>
        </div>

        {/* Tab Controls including the custom Interactive Sandboxes Tab */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#222222]">
          <div className="flex gap-2">
            {[
              { id: 'featured', label: 'Featured Systems' },
              { id: 'additional', label: 'Utility Projects' },
              { id: 'sandboxes', label: '💡 Live Sandboxes' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded text-xs font-mono font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id 
                    ? 'bg-white text-black shadow-none' 
                    : 'bg-[#111] border border-[#222] text-zinc-400 hover:text-zinc-200'
                }`}
                id={`tab-projects-${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {selectedSkill && activeTab !== 'sandboxes' && (
            <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#333] rounded px-2.5 py-1.5 text-[10px] font-mono text-zinc-300 font-bold uppercase tracking-wider animate-fade-in">
              <Filter className="w-3.5 h-3.5 text-zinc-500" />
              <span>Skill: {selectedSkill}</span>
              <button 
                onClick={onClearSkillFilter}
                className="text-zinc-400 hover:text-white shrink-0 p-0.5 ml-1 bg-[#222] rounded-full cursor-pointer"
                title="Clear Filter"
                id="btn-clear-skill-filter"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Sandboxes Sub-View */}
        {activeTab === 'sandboxes' ? (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-[#111] border border-[#222] rounded p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="text-left space-y-1">
                <h4 className="text-[10px] uppercase tracking-[0.15em] text-zinc-400 font-semibold">
                  Select Interactive Playground
                </h4>
                <p className="text-[11px] text-zinc-500 font-sans">
                  Execute live sandboxes representing Rafan's specialized microservices, AI nodes, and zoom rendering engines.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'deepzoom', label: 'Microscopy Lens (Knowbin)', icon: Crosshair },
                  { id: 'fitness', label: 'AI Gym Gen (Stripe + Socket)', icon: Dumbbell },
                  { id: 'quiz', label: 'MERN Stack Quiz (React)', icon: Award }
                ].map((sbox) => {
                  const Icon = sbox.icon;
                  return (
                    <button
                      key={sbox.id}
                      onClick={() => setActiveSandbox(sbox.id as any)}
                      className={`px-3 py-1.5 rounded border text-xs font-sans font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeSandbox === sbox.id
                          ? 'bg-white text-black border-white'
                          : 'bg-[#1A1A1A] border border-[#2c2c2c] text-zinc-400 hover:border-zinc-500 hover:text-white'
                      }`}
                      id={`btn-sbox-${sbox.id}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {sbox.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sandbox Viewports */}
            <div className="transition-all duration-300">
              {activeSandbox === 'deepzoom' && <DeepZoomDemo />}
              {activeSandbox === 'fitness' && (
                <LivePreviewDemo 
                  type="fitness"
                  title="AI-Powered Home Workout Fitness Application"
                  description="A comprehensive fitness platform with AI-driven personalized workout generation, featuring real-time client-trainer video rooms and secure payment flows."
                  techStack={["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "WebRTC", "Stripe", "AI Integration"]}
                />
              )}
              {activeSandbox === 'quiz' && (
                <LivePreviewDemo 
                  type="quiz"
                  title="MERN Stack Trivia Quiz Application"
                  description="An interactive quiz assessment platform featuring dynamic quiz rendering, score history trackers, role-based admin controls, and JWT-based security."
                  techStack={["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"]}
                />
              )}
            </div>
          </div>
        ) : (
          /* List of Projects Tab */
          <div className="space-y-6">
            {filteredProjects.length === 0 ? (
              <div className="py-16 text-center border border-dashed border-[#222222] rounded space-y-3 font-mono text-xs text-zinc-500">
                <Eye className="w-8 h-8 mx-auto text-zinc-700 animate-pulse" />
                <p>No projects match the technology criteria in this tab.</p>
                <button 
                  onClick={onClearSkillFilter}
                  className="px-3 py-1.5 bg-[#111] border border-[#222] text-zinc-300 rounded hover:text-white cursor-pointer"
                  id="btn-projects-no-match-reset"
                >
                  Clear Filter
                </button>
              </div>
            ) : (
              filteredProjects.map((proj) => (
                <div 
                  key={proj.id} 
                  className="bg-[#111] border border-[#222] rounded p-6 sm:p-8 hover:border-zinc-750 transition-all duration-300 flex flex-col justify-between space-y-6 relative group"
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon & Category & Links */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded bg-[#1A1A1A] border border-[#333] text-zinc-300">
                          {getIcon(proj.iconName)}
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-zinc-500 font-semibold tracking-wider uppercase">
                            {proj.subtitle || 'SYSTEM MODULE'}
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-zinc-100 font-sans tracking-tight mt-0.5 group-hover:text-white transition-colors">
                            {proj.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {proj.githubUrl && (
                          <a 
                            href={proj.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 bg-[#1A1A1A] hover:bg-zinc-900 text-zinc-450 hover:text-white rounded border border-[#333] transition-all"
                            title="View Github Source Code"
                            id={`link-git-${proj.id}`}
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a 
                            href={proj.liveUrl} 
                            onClick={(e) => {
                              if (proj.id === 'workout-app') {
                                e.preventDefault();
                                setActiveTab('sandboxes');
                                setActiveSandbox('fitness');
                              } else if (proj.id === 'quiz-app') {
                                e.preventDefault();
                                setActiveTab('sandboxes');
                                setActiveSandbox('quiz');
                              } else {
                                alert("Link clicked successfully! (This represents Muhammed Rafan's online deployed application domain)");
                              }
                            }}
                            className="p-2 bg-[#1A1A1A] hover:bg-zinc-900 text-zinc-400 hover:text-white rounded border border-[#333] transition-all flex items-center gap-1.5 text-xs font-mono"
                            title="Launch Interactive Demo"
                            id={`link-live-${proj.id}`}
                          >
                            <Eye className="w-4 h-4" />
                            <span>{proj.id === 'workout-app' || proj.id === 'quiz-app' ? 'Play Sandbox' : 'Live Demo'}</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                      {proj.description}
                    </p>

                    {/* Bullets List */}
                    <div className="space-y-2 pt-2">
                      <h4 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                        Core System Contributions
                      </h4>
                      <ul className="space-y-1.5">
                        {proj.bullets.map((bullet, idx) => (
                          <li key={idx} className="text-xs text-zinc-400 font-sans flex items-start gap-2 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-650 shrink-0 mt-2" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tech stack tags */}
                  <div className="pt-4 border-t border-[#222222] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.technologies.map((tech) => {
                        const isSkillHighlight = selectedSkill && tech.toLowerCase().includes(selectedSkill.toLowerCase());
                        return (
                          <span 
                            key={tech} 
                            className={`px-2.5 py-1 rounded-full text-[10px] font-mono transition-all ${
                              isSkillHighlight 
                                ? 'bg-white border border-white text-black font-bold' 
                                : 'bg-[#1A1A1A] border border-[#2c2c2c] text-zinc-400'
                            }`}
                          >
                            {tech}
                          </span>
                        );
                      })}
                    </div>

                    {/* Special launch buttons for demo integration */}
                    {(proj.id === 'workout-app' || proj.id === 'quiz-app') && (
                      <button
                        onClick={() => {
                          setActiveTab('sandboxes');
                          setActiveSandbox(proj.id === 'workout-app' ? 'fitness' : 'quiz');
                        }}
                        className="text-[10px] font-mono font-bold text-white hover:text-zinc-350 transition-colors flex items-center gap-1 shrink-0 cursor-pointer uppercase self-end sm:self-auto bg-[#1A1A1A] border border-[#333] hover:bg-zinc-900 px-3 py-1.5 rounded"
                        id={`btn-projects-play-${proj.id}`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-zinc-400" /> Launch Sandboxed Container
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

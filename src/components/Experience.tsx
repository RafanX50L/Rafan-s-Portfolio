import { useState } from 'react';
import { EXPERIENCE, EDUCATION } from '../data';
import { Briefcase, Calendar, MapPin, Award, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>("exp-knowbin");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-20 border-t border-[#222222]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">
              TIMELINE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-[#F5F5F5] tracking-tight">
            Professional Experience & Education
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans max-w-2xl">
            A track record of engineering scalable backend structures, crafting robust browser applications, and adopting enterprise architectures following MVC, Repository, and SOLID design patterns.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-6">
          {EXPERIENCE.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div 
                key={exp.id} 
                className={`bg-[#111] border rounded transition-all duration-300 overflow-hidden ${
                  isExpanded ? 'border-zinc-700 bg-[#141414]' : 'border-[#222] hover:border-zinc-750'
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleExpand(exp.id)}
                  className="w-full text-left p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
                  id={`btn-exp-trigger-${exp.id}`}
                >
                  <div className="flex gap-3.5 items-start">
                    <div className="p-2.5 rounded bg-[#1A1A1A] border border-[#333] text-[#F5F5F5] shrink-0 mt-1 sm:mt-0">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <h3 className="text-sm font-bold text-zinc-100 font-sans tracking-tight">
                          {exp.role}
                        </h3>
                        <span className="text-[9px] font-mono text-zinc-300 bg-[#222] border border-[#333] px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                          {exp.type === 'professional' ? 'Professional' : 'Rigorous Simulation'}
                        </span>
                      </div>
                      <p className="text-xs font-sans text-zinc-400 mt-1 font-medium">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-[#222222] pt-3 sm:pt-0 sm:border-t-0">
                    <div className="flex flex-col text-left sm:text-right font-mono text-[10px] text-zinc-500 space-y-1">
                      <div className="flex items-center sm:justify-end gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-zinc-650" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center sm:justify-end gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-zinc-650" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    
                    <div className="p-1 rounded bg-[#1A1A1A] text-zinc-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Collapsible Content */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-[#222222] pt-4 bg-[#111]/60 space-y-4 animate-fade-in">
                    <p className="text-xs font-sans text-zinc-350 leading-relaxed font-normal bg-[#151515] p-3 rounded border border-[#222]">
                      {exp.description}
                    </p>

                    <div className="space-y-2">
                      <h4 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                        Core Actions & Attainments
                      </h4>
                      <ul className="space-y-2">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-400 leading-relaxed font-sans font-normal">
                            <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2 pt-2">
                      <h4 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                        Technology Stack Employed
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-3 py-1 bg-[#1A1A1A] border border-[#333] rounded-full text-[11px] font-mono text-zinc-400 hover:text-white hover:border-zinc-500 transition-all cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Education Sub-Section */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-2 pb-2 border-b border-[#222222]">
            <Award className="w-4 h-4 text-zinc-400" />
            <h3 className="text-xs font-mono font-bold tracking-wider text-zinc-200 uppercase">
              Formal Education History
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EDUCATION.map((edu, index) => (
              <div 
                key={index} 
                className="bg-[#111] border border-[#222] rounded p-5 hover:border-zinc-750 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-zinc-350 bg-[#222] border border-[#333] px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                      {edu.status}
                    </span>
                    {edu.grade && (
                      <span className="text-[10px] font-mono text-zinc-400 font-bold">
                        {edu.grade}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-zinc-100 font-sans tracking-tight">
                    {edu.degree}
                  </h4>
                  <p className="text-xs text-zinc-400 font-sans">
                    {edu.institution}
                  </p>
                </div>

                <div className="text-[10px] font-mono text-zinc-600 mt-4 pt-2 border-t border-[#222222] flex justify-between">
                  <span>Track Type:</span>
                  <span className="text-zinc-550 font-medium">{edu.type || "Analytical Standard"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

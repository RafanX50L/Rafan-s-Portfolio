import { useState } from 'react';
import { SKILLS_DATA, CORE_COMPETENCIES } from '../data';
import { ShieldCheck, Code, Settings, Database, Hammer, Cpu } from 'lucide-react';

interface SkillsProps {
  onSkillSelect?: (skillName: string) => void;
  selectedSkill?: string | null;
}

export default function Skills({ onSkillSelect, selectedSkill }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Languages", "Frontend Frameworks & Libs", "Backend & Real-time", "Databases & Integrations", "Development Tools & Architecture"];

  // Map category title to appropriate Lucide icons
  const getCategoryIcon = (title: string) => {
    switch (title) {
      case "Languages": return <Code className="w-4 h-4 text-zinc-400" />;
      case "Frontend Frameworks & Libs": return <Cpu className="w-4 h-4 text-zinc-400" />;
      case "Backend & Real-time": return <Settings className="w-4 h-4 text-zinc-400" />;
      case "Databases & Integrations": return <Database className="w-4 h-4 text-zinc-400" />;
      default: return <Hammer className="w-4 h-4 text-zinc-400" />;
    }
  };

  const filteredSkills = activeCategory === "All" 
    ? SKILLS_DATA 
    : SKILLS_DATA.filter(cat => cat.title === activeCategory);

  return (
    <section id="skills" className="py-20 border-t border-[#222222]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">
              SKILLS MATRIX
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-[#F5F5F5] tracking-tight">
            Comprehensive Full-Stack Competency
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans max-w-2xl">
            Muhammed Rafan's technological core spans reactive browser interfaces, real-time message gateways, asynchronous background databases, and custom engineering specializations like digital microscopy deep zoom architectures.
          </p>
          <div className="bg-[#111] border border-[#222] rounded p-4 text-[11px] font-mono text-zinc-400 leading-normal">
            💡 <strong>Interactive Filter:</strong> Click any skill tag below to focus projects that leverage that technology in the Projects section.
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-[#222222]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer ${
                activeCategory === cat 
                  ? 'bg-white text-black font-semibold shadow-none' 
                  : 'bg-[#111] border border-[#222] text-zinc-400 hover:text-zinc-200'
              }`}
              id={`tab-skills-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredSkills.map((cat) => (
            <div 
              key={cat.title} 
              className="bg-[#111] border border-[#222] rounded p-5 hover:border-zinc-750 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#222222]">
                  {getCategoryIcon(cat.title)}
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
                    {cat.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => {
                    const isSelected = selectedSkill === skill.name;
                    return (
                      <button
                        key={skill.name}
                        onClick={() => onSkillSelect && onSkillSelect(skill.name)}
                        className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-white border-white text-black font-semibold'
                            : 'bg-[#1A1A1A] border border-[#2c2c2c] text-zinc-400 hover:border-zinc-550 hover:text-white'
                        }`}
                        id={`skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                        title={`Click to filter projects utilizing ${skill.name}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isSelected
                            ? 'bg-black'
                            : skill.level === 'expert' 
                            ? 'bg-zinc-300' 
                            : 'bg-zinc-600'
                        }`} />
                        {skill.name}
                        {isSelected && <span className="text-[9px] text-black font-bold ml-0.5">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#222222] flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>Skill depth breakdown:</span>
                <span className="flex items-center gap-2">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-zinc-300" /> Core</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-zinc-600" /> Strong</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Core Competencies Box */}
        <div className="border border-[#222222] rounded bg-[#111]/40 p-6 space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-[#222222]">
            <ShieldCheck className="w-4 h-4 text-zinc-400" />
            <h3 className="text-xs font-mono font-bold tracking-wider text-zinc-200 uppercase">
              Core Competencies & Practices
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans">
            {CORE_COMPETENCIES.map((comp) => (
              <div key={comp.category} className="space-y-2">
                <h4 className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  {comp.category}
                </h4>
                <ul className="space-y-1.5">
                  {comp.items.map((item, index) => (
                    <li key={index} className="text-zinc-400 flex items-center gap-2 leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-zinc-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

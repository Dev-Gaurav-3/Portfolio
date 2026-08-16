import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Terminal, Braces, Cpu, Layers, Globe, LayoutGrid, Layout, 
  Atom, Palette, Server, Network, Database, FileSpreadsheet, ShieldCheck, 
  GitBranch, Laptop, MapPin, Cloud, Sparkles, Search 
} from 'lucide-react';
import { skillsData } from '../data/portfolioData';

const iconMap = {
  FileCode: Code2,
  Terminal: Terminal,
  Braces: Braces,
  Cpu: Cpu,
  Layers: Layers,
  Globe: Globe,
  LayoutGrid: LayoutGrid,
  Layout: Layout,
  Code2: Code2,
  Atom: Atom,
  Palette: Palette,
  Server: Server,
  Network: Network,
  Database: Database,
  FileSpreadsheet: FileSpreadsheet,
  ShieldCheck: ShieldCheck,
  GitBranch: GitBranch,
  Laptop: Laptop,
  MapPin: MapPin,
  Cloud: Cloud
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Skills' },
    { id: 'languages', name: 'Languages' },
    { id: 'coreCS', name: 'Core CS & DSA' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'tools', name: 'Tools & Cloud' },
  ];

  // Consolidate skills
  const allSkillsList = [
    ...skillsData.languages.map(s => ({ ...s, category: 'languages' })),
    ...skillsData.coreCS.map(s => ({ ...s, category: 'coreCS' })),
    ...skillsData.frontend.map(s => ({ ...s, category: 'frontend' })),
    ...skillsData.backend.map(s => ({ ...s, category: 'backend' })),
    ...skillsData.tools.map(s => ({ ...s, category: 'tools' })),
  ];

  const filteredSkills = allSkillsList.filter(skill => {
    const matchesTab = activeTab === 'all' || skill.category === activeTab;
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          skill.tag.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section id="skills" className="relative py-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6b001a] border border-[#ff6b0033] text-xs font-semibold text-[#ff8800] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Skills & <span className="orange-gradient-text">Proficiency Matrix</span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Comprehensive overview of languages, frameworks, core CS concepts, and tools in my tech stack.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-[#0d0f19] border border-[#1f2438]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-colors duration-200 ${
                  activeTab === cat.id
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {activeTab === cat.id && (
                  <motion.div
                    layoutId="active-skill-tab"
                    className="absolute inset-0 bg-gradient-to-r from-[#ff6b00] to-[#ff8800] rounded-xl shadow-md shadow-[#ff6b0033]"
                    transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                  />
                )}
                <span className="relative z-10">{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill (e.g. C++, React)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-[#0d0f19] border border-[#1f2438] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#ff6b00] transition-colors"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredSkills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || Code2;
            return (
              <div
                key={index}
                className="glass-panel p-5 rounded-2xl border border-[#1f2438] hover:border-[#ff6b0044] hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Glow accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#ff6b000d] rounded-full blur-xl group-hover:scale-150 transition-transform" />

                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-[#ff6b0015] text-[#ff8800] border border-[#ff6b0028] group-hover:bg-[#ff6b0028] transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#07080e] border border-[#1f2438] text-[#ffa033]">
                    {skill.tag}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#ff8800] transition-colors">
                      {skill.name}
                    </h3>
                  </div>

                  {/* Level bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>Proficiency</span>
                      <span className="text-[#ff8800] font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#07080e] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#ff6b00] to-[#ff8800] rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 glass-panel rounded-2xl text-slate-400">
            No skills found matching "{searchTerm}".
          </div>
        )}
      </div>
    </section>
  );
}

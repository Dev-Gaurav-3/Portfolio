import React from 'react';
import { Sparkles, ExternalLink, Github, Compass, ListTodo, Gamepad2, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/portfolioData';

export default function Projects() {
  const iconMap = {
    'stayscape': Compass,
    'kanban-board': ListTodo,
    'snake-game': Gamepad2
  };

  return (
    <section id="projects" className="relative py-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6b001a] border border-[#ff6b0033] text-xs font-semibold text-[#ff8800] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Engineered <span className="orange-gradient-text">Software Projects</span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Full-stack web applications and interactive projects engineered with modern frameworks, clean architecture, and responsive design.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const ProjectIcon = iconMap[project.id] || Compass;
            return (
              <div
                key={project.id}
                className="glass-panel p-7 rounded-3xl border border-[#1f2438] hover:border-[#ff6b0066] transition-all duration-300 group flex flex-col justify-between hover:-translate-y-2 relative overflow-hidden orange-border-glow"
              >
                {/* Background ambient glow */}
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${project.gradient} blur-3xl group-hover:scale-125 transition-transform duration-500 pointer-events-none`} />

                <div className="space-y-4 z-10">
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-[#ff6b0018] text-[#ff8800] border border-[#ff6b0033] group-hover:bg-[#ff6b0028] transition-colors">
                      <ProjectIcon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#07080e] border border-[#ff6b0044] text-xs font-mono font-bold text-[#ffa033]">
                      {project.category}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl font-extrabold text-white group-hover:text-[#ff8800] transition-colors flex items-center gap-2">
                      <span>{project.title}</span>
                    </h3>
                    <p className="text-xs font-mono text-[#ff8800] mt-1">{project.subtitle}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="pt-2 border-t border-[#1f2438]">
                    <h4 className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">Key Highlights:</h4>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {project.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#ff8800] mt-0.5">•</span>
                          <span className="leading-normal">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-[#07080e]/90 border border-[#1f2438] text-[11px] font-mono text-slate-300 group-hover:border-[#ff6b0033] transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons: Live Site & GitHub Code */}
                <div className="pt-6 mt-6 border-t border-[#1f2438] grid grid-cols-2 gap-3 z-10">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-[#ff6b00] to-[#ff8800] hover:from-[#ff8800] hover:to-[#ff4500] shadow-md shadow-[#ff6b0033] flex items-center justify-center gap-1.5 transition-all active:scale-95"
                  >
                    <span>Live Site</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-slate-200 bg-[#07080e] border border-[#1f2438] hover:border-[#ff6b0044] hover:text-white hover:bg-[#141726] flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Github className="w-4 h-4 text-[#ff8800]" />
                    <span>Source Code</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

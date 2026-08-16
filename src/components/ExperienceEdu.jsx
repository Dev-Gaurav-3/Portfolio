import React from 'react';
import { GraduationCap, Award, Trophy, Flame, Code, Sparkles, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { educationList, achievementsList, personalDetails } from '../data/portfolioData';

const iconMap = {
  Award: Award,
  Trophy: Trophy,
  Flame: Flame,
  Code: Code
};

export default function ExperienceEdu() {
  return (
    <section id="experience" className="relative py-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6b001a] border border-[#ff6b0033] text-xs font-semibold text-[#ff8800] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic & Competitive Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Education & <span className="orange-gradient-text">Milestones</span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            My academic foundation at IIITDM Jabalpur alongside competitive coding ranks and flagship hackathon achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Education Timeline */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-[#1f2438]">
              <GraduationCap className="w-6 h-6 text-[#ff8800]" />
              <h3 className="text-2xl font-bold text-white">Education</h3>
            </div>

            <div className="relative border-l-2 border-[#ff6b0044] ml-4 pl-6 space-y-8">
              {educationList.map((edu, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#07080e] border-2 border-[#ff6b00] group-hover:bg-[#ff8800] transition-colors shadow-md shadow-[#ff6b00aa]" />

                  <div className="glass-panel p-6 rounded-2xl border border-[#1f2438] hover:border-[#ff6b0044] transition-all space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-white group-hover:text-[#ff8800] transition-colors">
                          {edu.institution}
                        </h4>
                        <p className="text-sm font-semibold text-[#ffa033] mt-0.5">{edu.degree}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#ff6b001a] border border-[#ff6b0033] text-xs font-mono text-[#ff8800]">
                        {edu.grade}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#ff6b00]" />
                        {edu.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#ff6b00]" />
                        {edu.location}
                      </span>
                    </div>

                    <ul className="space-y-1 text-xs text-slate-300 pt-2 border-t border-[#1f2438]">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#ff8800]">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Key Achievements */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-[#1f2438]">
              <Trophy className="w-6 h-6 text-[#ff8800]" />
              <h3 className="text-2xl font-bold text-white">Competitive Ranks & Awards</h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {achievementsList.map((ach, idx) => {
                const IconComp = iconMap[ach.icon] || Trophy;
                return (
                  <div
                    key={idx}
                    className="glass-panel p-5 rounded-2xl border border-[#1f2438] hover:border-[#ff6b0044] hover:-translate-x-1 transition-all duration-300 group flex items-start gap-4"
                  >
                    <div className="p-3 rounded-2xl bg-[#ff6b0018] text-[#ff8800] border border-[#ff6b0033] group-hover:bg-[#ff6b0028] transition-colors shrink-0">
                      <IconComp className="w-6 h-6" />
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold text-white group-hover:text-[#ff8800] transition-colors">
                          {ach.title}
                        </h4>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#07080e] border border-[#ff6b0044] text-[#ffa033]">
                          {ach.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {ach.description}
                      </p>
                      <div className="text-[10px] font-mono text-slate-400">
                        Category: {ach.category} • {ach.year}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

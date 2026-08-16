import React from 'react';
import { GraduationCap, Code, Cpu, Sparkles, MapPin, CheckCircle2, Terminal } from 'lucide-react';
import { personalDetails } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="relative py-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6b001a] border border-[#ff6b0033] text-xs font-semibold text-[#ff8800] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Engineering Student & <span className="orange-gradient-text">Problem Solver</span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Combining academic rigor at PDPM IIITDM Jabalpur with practical full-stack development experience and competitive programming logic.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: IIITDM Jabalpur Academic Profile */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-[#1f2438] hover:border-[#ff6b0044] transition-all space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-[#ff6b00] to-[#ff8800] text-white shadow-md shadow-[#ff6b0033]">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">PDPM IIITDM Jabalpur</h3>
                    <p className="text-sm text-[#ff8800] font-medium">B.Tech in Smart Manufacturing (2024 - 2028)</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full bg-[#07080e] border border-[#ff6b0044] text-xs font-mono font-bold text-[#ffa033]">
                    CGPA: 7.9
                  </span>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed">
                Currently pursuing my Bachelor of Technology at <strong className="text-white">Pandit Dwarka Prasad Mishra Indian Institute of Information Technology, Design and Manufacturing Jabalpur</strong>. My coursework combines computer science principles, software development, algorithms, and smart system engineering.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-sm text-slate-300 bg-[#07080e]/60 p-3 rounded-xl border border-[#1f2438]">
                  <CheckCircle2 className="w-4 h-4 text-[#ff8800]" />
                  <span>500+ Algorithmic Problems</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300 bg-[#07080e]/60 p-3 rounded-xl border border-[#1f2438]">
                  <CheckCircle2 className="w-4 h-4 text-[#ff8800]" />
                  <span>Flipkart GRID 8.0 Semi-Finalist</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300 bg-[#07080e]/60 p-3 rounded-xl border border-[#1f2438]">
                  <CheckCircle2 className="w-4 h-4 text-[#ff8800]" />
                  <span>Full-Stack Web Architect</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300 bg-[#07080e]/60 p-3 rounded-xl border border-[#1f2438]">
                  <CheckCircle2 className="w-4 h-4 text-[#ff8800]" />
                  <span>Hisar, Haryana, India</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1f2438] flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#ff6b00]" />
                Jabalpur & Hisar, India
              </span>
              <span className="text-[#ff8800]">Expected Graduation: June 2028</span>
            </div>
          </div>

          {/* Card 2: Core Developer Philosophy */}
          <div className="lg:col-span-5 glass-panel-orange p-8 rounded-3xl flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-4 z-10">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#ff6b0025] text-[#ff8800] border border-[#ff6b0044]">
                  <Terminal className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Development Philosophy</h3>
              </div>

              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  I believe clean code, robust data structures, and intuitive user experiences are non-negotiable. My process focuses on writing scalable backend APIs while maintaining responsive, visually arresting interfaces.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>DSA & Problem Solving</span>
                    <span className="text-[#ff8800]">92%</span>
                  </div>
                  <div className="w-full h-2 bg-[#07080e] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#ff6b00] to-[#ff8800] rounded-full w-[92%]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Full-Stack Web (Node/React)</span>
                    <span className="text-[#ff8800]">88%</span>
                  </div>
                  <div className="w-full h-2 bg-[#07080e] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#ff6b00] to-[#ff8800] rounded-full w-[88%]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Competitive Programming (C++)</span>
                    <span className="text-[#ff8800]">90%</span>
                  </div>
                  <div className="w-full h-2 bg-[#07080e] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#ff6b00] to-[#ff8800] rounded-full w-[90%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#ff6b0033] flex items-center justify-between text-xs font-semibold text-[#ffa033]">
              <span>Ready for Technical Challenges</span>
              <span>⚡ Fast Learner</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

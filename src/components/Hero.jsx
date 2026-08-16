import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Code2, Github, Linkedin, ExternalLink, Terminal, Award } from 'lucide-react';
import { personalDetails } from '../data/portfolioData';

export default function Hero() {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect logic
  useEffect(() => {
    const fullText = personalDetails.subtitles[subtitleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setSubtitleIndex((prev) => (prev + 1) % personalDetails.subtitles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, subtitleIndex]);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-radial from-[#ff6b001a] via-[#ff45000a] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#ff880010] rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d0f19] border border-[#ff6b0044] shadow-md shadow-[#ff6b0015]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff8800] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff6b00]"></span>
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#ffa033]">
                {personalDetails.status}
              </span>
            </div>

            {/* Main Greeting */}
            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-400">
                Hi, I'm <span className="text-white font-bold">{personalDetails.name}</span>
              </h2>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Architecting <br className="hidden sm:inline" />
                <span className="orange-gradient-text">Full-Stack Solutions</span> & <br />
                Algorithmic Excellence.
              </h1>
            </div>

            {/* Dynamic Animated Subtitle */}
            <div className="h-10 flex items-center">
              <div className="font-mono text-base sm:text-lg text-[#ff8800] flex items-center gap-2">
                <Terminal className="w-5 h-5 text-[#ff6b00]" />
                <span>{currentText}</span>
                <span className="w-2 h-5 bg-[#ff6b00] inline-block animate-pulse" />
              </div>
            </div>

            {/* Bio summary */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              B.Tech Student at <span className="text-white font-medium">PDPM IIITDM Jabalpur</span> specializing in full-stack JavaScript applications (Node.js, Express, MongoDB, React) and competitive programming. Qualified for <span className="text-[#ffa033] font-semibold">Flipkart GRID 8.0 Semi-Finals</span> & solved <span className="text-[#ffa033] font-semibold">500+ LeetCode problems</span>.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold rounded-xl text-white bg-gradient-to-r from-[#ff6b00] to-[#ff8800] hover:from-[#ff8800] hover:to-[#ff4500] shadow-lg shadow-[#ff6b0040] hover:shadow-xl hover:shadow-[#ff6b0060] transition-all duration-300 active:scale-95"
              >
                <span>View Projects</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold rounded-xl text-slate-200 bg-[#0d0f19] border border-[#1f2438] hover:border-[#ff6b0066] hover:text-white hover:bg-[#141726] transition-all duration-300"
              >
                <span>Contact Me</span>
              </a>

              <a
                href={personalDetails.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-semibold rounded-xl text-[#ffa033] bg-[#ff6b0015] border border-[#ff6b0033] hover:bg-[#ff6b0025] transition-all duration-300"
              >
                <Award className="w-4 h-4 text-[#ff8800]" />
                <span>LeetCode (1670)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

            {/* Quick Links */}
            <div className="pt-4 flex items-center gap-4 text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Profiles:</span>
              <div className="flex items-center gap-3">
                <a
                  href={personalDetails.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#0d0f19] border border-[#1f2438] hover:border-[#ff6b00] hover:text-[#ff8800] transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={personalDetails.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#0d0f19] border border-[#1f2438] hover:border-[#ff6b00] hover:text-[#ff8800] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={personalDetails.socials.codeforces}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-mono rounded-lg bg-[#0d0f19] border border-[#1f2438] hover:border-[#ff6b00] text-slate-300 hover:text-[#ff8800] transition-colors"
                >
                  Codeforces
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Holographic Avatar & Interactive Cosmic Badge */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
              
              {/* Outer Spinning Cosmic Rings */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#ff6b0044] animate-spin-slow" />
              <div className="absolute -inset-4 rounded-full border border-dotted border-[#ff880025] animate-pulse" />

              {/* Main Glowing Holographic Card Container */}
              <div className="w-full h-full rounded-3xl glass-panel-orange p-6 flex flex-col justify-between relative overflow-hidden group shadow-2xl shadow-[#ff6b0020] orange-border-glow">
                
                {/* Floating Stardust Graphic Element */}
                <div className="absolute -right-8 -top-8 w-40 h-40 bg-[#ff6b0020] rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                
                {/* Top Badge */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-[#ff6b0022] text-[#ff8800]">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">STATUS</div>
                      <div className="text-sm font-bold text-white">Full-Stack Dev</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#ff8800] bg-[#ff6b001a] px-2.5 py-1 rounded-full border border-[#ff6b0033]">
                    IIITDM Jabalpur
                  </span>
                </div>

                {/* Central Visual: Holographic Dev Symbol & Stats */}
                <div className="my-auto text-center z-10 space-y-3">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-[#ff6b00] to-[#ff8800] p-1 shadow-lg shadow-[#ff6b0055]">
                    <div className="w-full h-full bg-[#07080e] rounded-xl flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-[#ff8800] animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white tracking-wider">
                      500+ <span className="text-[#ff8800]">DSA</span>
                    </div>
                    <p className="text-xs text-slate-300 font-mono">
                      Solved on LeetCode & Codeforces
                    </p>
                  </div>
                </div>

                {/* Bottom Floating Skill Badges */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#1f2438] z-10 text-center text-xs font-medium">
                  <div className="py-1.5 rounded-lg bg-[#07080e]/80 border border-[#1f2438] text-slate-200">
                    C++ / DSA
                  </div>
                  <div className="py-1.5 rounded-lg bg-[#07080e]/80 border border-[#1f2438] text-slate-200">
                    Node / Express
                  </div>
                  <div className="py-1.5 rounded-lg bg-[#07080e]/80 border border-[#1f2438] text-slate-200">
                    MongoDB
                  </div>
                </div>
              </div>

              {/* Floating Orbit Pills */}
              <div className="absolute -top-4 -left-4 px-3.5 py-1.5 rounded-full bg-[#0d0f19] border border-[#ff6b0044] text-xs font-semibold text-[#ffa033] shadow-lg animate-float">
                ⚡ Flipkart GRID 8.0 Semi-Finalist
              </div>

              <div className="absolute -bottom-4 -right-4 px-3.5 py-1.5 rounded-full bg-[#0d0f19] border border-[#ff6b0044] text-xs font-semibold text-[#ff8800] shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                🏆 LeetCode 1670 Max Rating
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

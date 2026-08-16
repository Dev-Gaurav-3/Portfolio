import React from 'react';
import { ArrowUp, Heart, Code2 } from 'lucide-react';
import { personalDetails } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[#1f2438] bg-[#07080e] py-12 text-slate-400 text-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Signature */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ff6b001a] border border-[#ff6b0033] flex items-center justify-center font-bold text-[#ff8800]">
              GS
            </div>
            <div>
              <p className="text-white font-semibold">{personalDetails.name}</p>
              <p className="text-xs text-slate-500">
                PDPM IIITDM Jabalpur • Smart Manufacturing 2024-2028
              </p>
            </div>
          </div>

          {/* Center Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <a href="#about" className="hover:text-[#ff8800] transition-colors">About</a>
            <a href="#skills" className="hover:text-[#ff8800] transition-colors">Skills</a>
            <a href="#projects" className="hover:text-[#ff8800] transition-colors">Projects</a>
            <a href="#experience" className="hover:text-[#ff8800] transition-colors">Achievements</a>
            <a href="#contact" className="hover:text-[#ff8800] transition-colors">Contact</a>
          </div>

          {/* Right Action: Scroll Top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-[#0d0f19] border border-[#1f2438] hover:border-[#ff6b00] text-slate-300 hover:text-white transition-colors flex items-center gap-2 group"
            aria-label="Back to top"
          >
            <span className="text-xs font-semibold group-hover:text-[#ff8800]">Top</span>
            <ArrowUp className="w-4 h-4 text-[#ff8800]" />
          </button>

        </div>

        <div className="mt-8 pt-6 border-t border-[#1f2438]/50 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Gaurav Suryavanshi. All rights reserved.</p>
          <p className="flex items-center justify-center gap-1">
            Built with <span className="text-[#ff8800]">React</span>, <span className="text-[#ff8800]">Tailwind CSS</span> & <span className="text-[#ff8800]">Lenis Smooth Scroll</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

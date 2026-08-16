import React from 'react';
import { Trophy, Code2, Award, Zap, ArrowUpRight } from 'lucide-react';
import { keyMetrics, personalDetails } from '../data/portfolioData';

const iconMap = {
  Trophy: Trophy,
  Code2: Code2,
  Award: Award,
  Zap: Zap
};

export default function MetricsBar() {
  return (
    <section className="relative py-10 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {keyMetrics.map((item) => {
            const IconComponent = iconMap[item.icon] || Trophy;
            return (
              <div
                key={item.id}
                className="glass-panel p-6 rounded-2xl border border-[#1f2438] hover:border-[#ff6b0044] transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Ambient hover glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff6b0010] rounded-full blur-xl group-hover:scale-150 transition-transform" />

                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-[#ff6b0018] text-[#ff8800] border border-[#ff6b0033] group-hover:bg-[#ff6b0028] transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">VERIFIED</span>
                </div>

                <div className="mt-4 space-y-1">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono flex items-baseline">
                    <span className="orange-gradient-text">{item.value}</span>
                    <span className="text-lg font-semibold text-[#ff8800] ml-1">{item.suffix}</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-200">{item.label}</h3>
                  <p className="text-xs text-slate-400">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

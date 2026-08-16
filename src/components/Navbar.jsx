import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, User, Code2, FolderGit2, Trophy, Mail, Sparkles } from 'lucide-react';
import { personalDetails } from '../data/portfolioData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about', icon: User },
    { name: 'Skills', href: '#skills', id: 'skills', icon: Code2 },
    { name: 'Projects', href: '#projects', id: 'projects', icon: FolderGit2 },
    { name: 'Achievements', href: '#experience', id: 'experience', icon: Trophy },
    { name: 'Contact', href: '#contact', id: 'contact', icon: Mail },
  ];

  const getSectionTitle = (id) => {
    switch(id) {
      case 'about': return 'About Me';
      case 'skills': return 'Skills Matrix';
      case 'projects': return 'Projects';
      case 'experience': return 'Achievements';
      case 'contact': return 'Get In Touch';
      default: return 'Home';
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#07080e]/90 backdrop-blur-2xl border-b border-[#ff6b0028] shadow-2xl shadow-[#000000]/80'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Dynamic Breadcrumb */}
          <a
            href="#hero"
            className="flex items-center gap-3 group text-left"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff8800] to-[#ff4500] p-[1px] shadow-lg shadow-[#ff6b0033] group-hover:shadow-[#ff6b0077] transition-all duration-300">
              <div className="w-full h-full bg-[#07080e] rounded-[11px] flex items-center justify-center font-extrabold text-[#ff8800] group-hover:text-white transition-colors">
                GS
              </div>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-[#ff8800] transition-colors">
                Gaurav <span className="text-[#ff6b00]">Suryavanshi</span>
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff8800] animate-pulse" />
                <span className="font-mono text-[11px] text-[#ffa033]">
                  {getSectionTitle(activeSection)}
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Links with Sliding Cosmic Orange Pill Indicator */}
          <div className="hidden md:flex items-center gap-1 bg-[#0d0f19]/90 border border-[#1f2438] backdrop-blur-xl px-2 py-1.5 rounded-full shadow-inner relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const LinkIcon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 flex items-center gap-1.5 z-10 ${
                    isActive
                      ? 'text-white font-bold drop-shadow-[0_0_12px_rgba(255,136,0,0.8)]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {/* Sliding Animated Glow Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ff8800] shadow-md shadow-[#ff6b0066] -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <LinkIcon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl text-white bg-gradient-to-r from-[#ff6b00] to-[#ff8800] hover:from-[#ff8800] hover:to-[#ff4500] shadow-md shadow-[#ff6b0033] hover:shadow-lg hover:shadow-[#ff6b0060] transition-all duration-300 active:scale-95"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#0d0f19] border border-[#1f2438] text-slate-300 hover:text-white hover:border-[#ff6b0044] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-4 pb-6 pt-2 bg-[#0d0f19]/98 backdrop-blur-2xl border-b border-[#ff6b0033] space-y-3 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const LinkIcon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-gradient-to-r from-[#ff6b00] to-[#ff8800] text-white shadow-md shadow-[#ff6b0040]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <LinkIcon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </div>
                  {isActive && <Sparkles className="w-4 h-4 text-white animate-pulse" />}
                </a>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#1f2438] flex flex-col gap-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-center text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-[#ff6b00] to-[#ff8800] shadow-md shadow-[#ff6b0033]"
            >
              Contact Gaurav
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

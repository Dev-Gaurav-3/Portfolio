import React, { useEffect } from 'react';
import Lenis from 'lenis';
import StardustCanvas from './components/StardustCanvas';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MetricsBar from './components/MetricsBar';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ExperienceEdu from './components/ExperienceEdu';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollFrames from './components/ScrollFrames';

export default function App() {
  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom smooth cubic-bezier curve
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent text-slate-100 selection:bg-[#ff6b0033] selection:text-[#ff8800]">
      {/* Video Background */}
      <ScrollFrames />

      {/* Background Interactive Stardust Particle Canvas */}
      <StardustCanvas />

      {/* Custom Cosmic Glowing Cursor */}
      <CustomCursor />

      {/* Main Glassmorphic Navigation Header */}
      <Navbar />

      {/* Main Page Sections */}
      <main className="relative z-10">
        <Hero />
        <MetricsBar />
        <About />
        <Skills />
        <Projects />
        <ExperienceEdu />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

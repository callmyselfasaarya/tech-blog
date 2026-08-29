import React from 'react';
import { Link } from 'react-router-dom';
import { TechniccalLogo } from '../ui/TechniccalLogo';
import { BlurFade } from '../ui/BlurFade';
import { useLenis } from '../../context/LenisContext';

export const Footer: React.FC = () => {
  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="mt-20 pt-10 pb-16 border-t border-[#E1E1E1] dark:border-[#2C2C30] text-xs font-sans text-[#4C586F] dark:text-[#A0A9B8]">
      <BlurFade delay={0.1} yOffset={16}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#E1E1E1] dark:border-[#2C2C30]">
          <div className="space-y-4 md:col-span-1">
            <Link to="/">
              <TechniccalLogo size="md" />
            </Link>
            <p className="text-xs text-[#4C586F] dark:text-[#A0A9B8] leading-relaxed">
              Engineering research & systems publication exploring high-scale software, AI reasoning engines, and software architecture.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#E8E7E2] dark:bg-[#252528] border border-[#E1E1E1] dark:border-[#2C2C30] text-[10px] font-mono text-[#3B719F]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold uppercase tracking-wider">SYSTEM STATUS / OPERATIONAL</span>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#1C1C1E] dark:text-[#F6F5F0] font-semibold mb-3">
              Editorial Sections
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li><Link to="/" className="hover:text-[#3B719F] transition-colors">INDEX / HOME</Link></li>
              <li><Link to="/blog" className="hover:text-[#3B719F] transition-colors">ALL DISPATCHES</Link></li>
              <li><Link to="/ai" className="hover:text-[#3B719F] transition-colors">AI & ML SYSTEMS</Link></li>
              <li><Link to="/programming" className="hover:text-[#3B719F] transition-colors">PROGRAMMING</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#1C1C1E] dark:text-[#F6F5F0] font-semibold mb-3">
              Resources & Tools
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li><Link to="/career" className="hover:text-[#3B719F] transition-colors">CAREER & LEADERSHIP</Link></li>
              <li><Link to="/projects" className="hover:text-[#3B719F] transition-colors">PROJECT TUTORIALS</Link></li>
              <li><Link to="/tools" className="hover:text-[#3B719F] transition-colors">DEVELOPER STACK</Link></li>
              <li><Link to="/newsletter" className="hover:text-[#3B719F] transition-colors">WEEKLY DISPATCH</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#1C1C1E] dark:text-[#F6F5F0] font-semibold mb-3">
              Journal & Account
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li><Link to="/about" className="hover:text-[#3B719F] transition-colors">ABOUT MANIFESTO</Link></li>
              <li><Link to="/contact" className="hover:text-[#3B719F] transition-colors">CONTACT EDITORIAL</Link></li>
              <li><Link to="/account" className="hover:text-[#3B719F] transition-colors">MEMBER PORTAL</Link></li>
              <li><Link to="/login" className="hover:text-[#3B719F] transition-colors">READER SIGN IN</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#4C586F] dark:text-[#A0A9B8]">
          <span>© 2026 TECHNICALL MEDIA INC. ALL RIGHTS RESERVED. // ISSUE 026</span>
          <button
            onClick={scrollToTop}
            className="hover:text-[#3B719F] transition-colors cursor-pointer flex items-center gap-1 uppercase font-bold"
          >
            BACK TO TOP ↑
          </button>
        </div>
      </BlurFade>
    </footer>
  );
};

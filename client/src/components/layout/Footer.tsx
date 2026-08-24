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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#E1E1E1]/60 dark:border-[#2C2C30]/60">
          <div className="space-y-3 md:col-span-1">
            <Link to="/">
              <TechniccalLogo size="md" />
            </Link>
            <p className="text-xs text-[#7E8798] dark:text-[#A0A9B8] leading-relaxed">
              Engineering research & systems publication exploring high-scale software, AI reasoning engines, and software architecture.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#1C1C1E] dark:text-[#F6F5F0] font-semibold mb-3">
              Editorial Sections
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">Homepage</Link></li>
              <li><Link to="/blog" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">All Articles</Link></li>
              <li><Link to="/ai" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">AI Articles</Link></li>
              <li><Link to="/programming" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">Programming</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#1C1C1E] dark:text-[#F6F5F0] font-semibold mb-3">
              Explore & Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/career" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">Jobs / Career</Link></li>
              <li><Link to="/projects" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">Project Tutorials</Link></li>
              <li><Link to="/tools" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">Developer Tools</Link></li>
              <li><Link to="/newsletter" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">Newsletter</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#1C1C1E] dark:text-[#F6F5F0] font-semibold mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">Contact</Link></li>
              <li><Link to="/account" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">Member Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between text-[11px] text-[#7E8798] dark:text-[#6B7485]">
          <span>© 2026 Techniccal Media Inc. All rights reserved.</span>
          <button
            onClick={scrollToTop}
            className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors cursor-pointer"
          >
            Back to top ↑
          </button>
        </div>
      </BlurFade>
    </footer>
  );
};

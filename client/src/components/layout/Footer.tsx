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
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/">
            <TechniccalLogo size="md" />
          </Link>

          <div className="flex items-center gap-6 font-medium text-xs">
            <Link to="/" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">
              About Techniccal
            </Link>
            <Link to="/letters" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">
              Dispatches
            </Link>
            <Link to="/sign-up" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">
              Insider Membership
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#E1E1E1]/60 dark:border-[#2C2C30]/60 flex items-center justify-between text-[11px] text-[#7E8798] dark:text-[#6B7485]">
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

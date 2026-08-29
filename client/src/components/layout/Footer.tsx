import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlurFade } from '../ui/BlurFade';
import { useLenis } from '../../context/LenisContext';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const lenis = useLenis();
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="mt-24 pt-12 pb-16 border-t border-[#E1E1E1] dark:border-[#2C2C30] text-[#121214] dark:text-[#FAFAFA] font-sans">
      <BlurFade delay={0.1} yOffset={12}>
        {/* Top Header Row: Author Name & Live Time */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-[#E1E1E1] dark:border-[#2C2C30]">
          <div>
            <Link to="/" className="font-display font-bold text-xl sm:text-2xl tracking-tight text-[#1C1C1E] dark:text-[#F6F5F0] hover:text-[#3B719F] transition-colors">
              Techniccal
            </Link>
            <p className="text-xs font-mono text-[#6E6E73] dark:text-[#98989F] mt-0.5">
              Software Engineer / Builder / Writer
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8E7E2]/60 dark:bg-[#252528]/80 border border-[#E1E1E1] dark:border-[#2C2C30] text-xs font-mono text-[#4C586F] dark:text-[#A0A9B8]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-[#1C1C1E] dark:text-[#F6F5F0]">{timeString || '12:00 PM'}</span>
            <span className="text-[10px] text-[#8E8E93]">LOCAL TIME</span>
          </div>
        </div>

        {/* Middle Navigation Grid */}
        <div className="py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm border-b border-[#E1E1E1] dark:border-[#2C2C30]">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#3B719F] uppercase block mb-3">NAVIGATION</span>
            <ul className="space-y-2.5 font-mono text-xs text-[#4C586F] dark:text-[#A0A9B8]">
              <li>
                <Link to="/" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">
                  Posts
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/newsletter" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">
                  Subscribe
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#3B719F] uppercase block mb-3">TOPICS</span>
            <ul className="space-y-2.5 font-mono text-xs text-[#4C586F] dark:text-[#A0A9B8]">
              <li>
                <Link to="/ai" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">
                  AI & ML Systems
                </Link>
              </li>
              <li>
                <Link to="/programming" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">
                  Software Architecture
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">
                  Build Blueprints
                </Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">
                  Developer Tools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#3B719F] uppercase block mb-3">CONNECT</span>
            <ul className="space-y-2.5 font-mono text-xs text-[#4C586F] dark:text-[#A0A9B8]">
              <li>
                <a href="https://github.com/callmyselfasaarya" target="_blank" rel="noopener noreferrer" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">
                  GitHub ↗
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/aarya-lekshmanan" target="_blank" rel="noopener noreferrer" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href="https://x.com/_its_aarya_" target="_blank" rel="noopener noreferrer" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">
                  X (Twitter) ↗
                </a>
              </li>
              <li>
                <a href="mailto:thisisaarya29@gmail.com" className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors">
                  Email Me ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#3B719F] uppercase block mb-3">LOCATION</span>
            <p className="text-xs text-[#4C586F] dark:text-[#A0A9B8] leading-relaxed font-sans">
              Based in Tamil Nadu, India. Writing dispatches on code, engineering, and artificial intelligence.
            </p>
          </div>
        </div>

        {/* Bottom Tagline & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6E6E73] dark:text-[#98989F]">
          <div className="flex items-center gap-2">
            <span>From Tamil Nadu with ♡</span>
          </div>

          <div className="flex items-center gap-6">
            <span>© 2026 Techniccal. All rights reserved.</span>
            <button
              onClick={scrollToTop}
              className="hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors cursor-pointer flex items-center gap-1 uppercase font-semibold text-[11px]"
            >
              Top <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </BlurFade>
    </footer>
  );
};


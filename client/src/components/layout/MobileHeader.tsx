import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Sun, Moon, Home as HomeIcon, Info, BookOpen, UserPlus, Github, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { TechniccalLogo } from '../ui/TechniccalLogo';

interface MobileHeaderProps {
  onOpenSearch?: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onOpenSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-5 py-3 bg-[#F6F5F0]/90 dark:bg-[#141416]/90 backdrop-blur-md border-b border-[#E1E1E1] dark:border-[#2C2C30]">
        <Link to="/" onClick={closeMenu}>
          <TechniccalLogo size="sm" />
        </Link>

        <div className="flex items-center gap-2">
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#4C586F] dark:text-[#A0A9B8] hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0]"
              aria-label="Open Search"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 text-[#1C1C1E] dark:text-[#F6F5F0]"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Slide-over Fullscreen Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#F6F5F0] dark:bg-[#141416] flex flex-col justify-between p-6 overflow-y-auto font-poppins"
          >
            <div>
              {/* Menu Top Action Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-[#E1E1E1] dark:border-[#2C2C30]">
                <Link to="/" onClick={closeMenu}>
                  <TechniccalLogo size="md" />
                </Link>

                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleTheme}
                    className="p-2 text-[#4C586F] dark:text-[#A0A9B8] hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0]"
                  >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={closeMenu}
                    className="p-2 text-[#1C1C1E] dark:text-[#F6F5F0]"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Main Links */}
              <nav className="mt-6 space-y-2">
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-[#222225] text-sm font-semibold text-[#1C1C1E] dark:text-[#F6F5F0]"
                >
                  <HomeIcon className="w-5 h-5" />
                  <span>Home</span>
                </Link>

                <Link
                  to="/about"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-[#222225] text-sm font-semibold text-[#1C1C1E] dark:text-[#F6F5F0]"
                >
                  <Info className="w-5 h-5" />
                  <span>About Techniccal</span>
                </Link>

                <Link
                  to="/letters"
                  onClick={closeMenu}
                  className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white dark:bg-[#222225] text-sm font-semibold text-[#1C1C1E] dark:text-[#F6F5F0]"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5" />
                    <span>Dispatches</span>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#E1E1E1] dark:bg-[#2C2C30]">
                    6
                  </span>
                </Link>

                <Link
                  to="/sign-up"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-[#222225] text-sm font-semibold text-[#1C1C1E] dark:text-[#F6F5F0]"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Join Insider</span>
                </Link>
              </nav>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-[#E1E1E1] dark:border-[#2C2C30]">
                <div className="text-[10px] font-mono tracking-widest text-[#7E8798] uppercase mb-3">
                  COMMUNITY
                </div>
                <div className="flex items-center gap-4 text-[#4C586F] dark:text-[#A0A9B8]">
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs">
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs">
                    <Twitter className="w-4 h-4" /> X / Twitter
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 text-xs text-[#7E8798] text-center">
              © 2026 Techniccal Media Inc.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

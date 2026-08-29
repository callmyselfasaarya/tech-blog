import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Posts', path: '/posts' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path) || (path === '/posts' && location.pathname.startsWith('/blog'));
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FBFBFA]/90 dark:bg-[#0C0C0D]/90 backdrop-blur-md border-b border-[#E1E1E1]/80 dark:border-[#2C2C30]/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between font-sans">
        {/* Brand Name on Left */}
        <Link
          to="/"
          className="font-display font-bold text-lg sm:text-xl tracking-tight text-[#1C1C1E] dark:text-[#F6F5F0] hover:opacity-80 transition-opacity"
        >
          Techniccal
        </Link>

        {/* Desktop Center/Right Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono">
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors relative py-1 ${
                  isActive(item.path)
                    ? 'text-[#1C1C1E] dark:text-[#F6F5F0] font-bold'
                    : 'text-[#6E6E73] dark:text-[#98989F] hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0]'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B719F] dark:bg-[#5B9AD5] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="h-4 w-px bg-[#E1E1E1] dark:bg-[#2C2C30]" />

          {/* Right Action Links */}
          <div className="flex items-center gap-4">
            <Link
              to="/subscribe"
              className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-[#1C1C1E] dark:text-[#F6F5F0] bg-[#E8E7E2]/70 dark:bg-[#202024] border border-[#E1E1E1] dark:border-[#2C2C30] hover:border-[#3B719F] dark:hover:border-[#5B9AD5] transition-all"
            >
              Subscribe
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 text-[#6E6E73] hover:text-[#1C1C1E] dark:text-[#98989F] dark:hover:text-[#F6F5F0] transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Header Controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 text-[#6E6E73] dark:text-[#98989F]"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1C1C1E] dark:text-[#F6F5F0]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-[#E1E1E1] dark:border-[#2C2C30] bg-[#FBFBFA] dark:bg-[#0C0C0D] px-6 py-4 space-y-4 font-mono text-xs"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 ${
                  isActive(item.path)
                    ? 'text-[#1C1C1E] dark:text-[#F6F5F0] font-bold'
                    : 'text-[#6E6E73] dark:text-[#98989F]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-[#E1E1E1] dark:border-[#2C2C30]">
              <Link
                to="/subscribe"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-block w-full text-center py-2.5 rounded-lg bg-[#1C1C1E] text-white dark:bg-[#F6F5F0] dark:text-[#1C1C1E] font-medium"
              >
                Subscribe
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

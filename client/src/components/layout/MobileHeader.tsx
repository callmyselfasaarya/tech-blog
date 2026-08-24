import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  Moon,
  Sun,
  Home,
  BookOpen,
  Info,
  UserPlus,
  Cpu,
  Terminal,
  Briefcase,
  Code,
  Wrench,
  Mail,
  Send
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { TechniccalLogo } from '../ui/TechniccalLogo';

interface MobileHeaderProps {
  onOpenSearch?: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onOpenSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="lg:hidden sticky top-0 z-40 bg-[#F6F5F0]/90 dark:bg-[#141416]/90 backdrop-blur-md border-b border-[#E1E1E1] dark:border-[#2C2C30] px-4 py-3 font-poppins">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <TechniccalLogo size="sm" />
        </Link>

        <div className="flex items-center gap-2">
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-xl text-[#4C586F] dark:text-[#A0A9B8] hover:bg-[#E8E7E2] dark:hover:bg-[#222225]"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-[#1C1C1E] dark:text-[#F6F5F0] hover:bg-[#E8E7E2] dark:hover:bg-[#222225]"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-x-0 top-[57px] bg-[#F6F5F0] dark:bg-[#141416] border-b border-[#E1E1E1] dark:border-[#2C2C30] p-6 shadow-xl space-y-6 max-h-[85vh] overflow-y-auto">
          <nav className="space-y-1">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/') ? 'bg-white dark:bg-[#222225] font-semibold text-[#1C1C1E] dark:text-white' : 'text-[#4C586F] dark:text-[#A0A9B8]'
              }`}
            >
              <Home className="w-4 h-4" /> Home
            </Link>

            <Link
              to="/blog"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/blog') ? 'bg-white dark:bg-[#222225] font-semibold text-[#1C1C1E] dark:text-white' : 'text-[#4C586F] dark:text-[#A0A9B8]'
              }`}
            >
              <BookOpen className="w-4 h-4" /> All Articles
            </Link>

            <Link
              to="/ai"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/ai') ? 'bg-white dark:bg-[#222225] font-semibold text-[#1C1C1E] dark:text-white' : 'text-[#4C586F] dark:text-[#A0A9B8]'
              }`}
            >
              <Cpu className="w-4 h-4 text-[#3B719F]" /> AI Articles
            </Link>

            <Link
              to="/programming"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/programming') ? 'bg-white dark:bg-[#222225] font-semibold text-[#1C1C1E] dark:text-white' : 'text-[#4C586F] dark:text-[#A0A9B8]'
              }`}
            >
              <Terminal className="w-4 h-4" /> Programming
            </Link>

            <Link
              to="/career"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/career') ? 'bg-white dark:bg-[#222225] font-semibold text-[#1C1C1E] dark:text-white' : 'text-[#4C586F] dark:text-[#A0A9B8]'
              }`}
            >
              <Briefcase className="w-4 h-4 text-[#4C586F]" /> Jobs / Career
            </Link>

            <Link
              to="/projects"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/projects') ? 'bg-white dark:bg-[#222225] font-semibold text-[#1C1C1E] dark:text-white' : 'text-[#4C586F] dark:text-[#A0A9B8]'
              }`}
            >
              <Code className="w-4 h-4 text-[#3B719F]" /> Projects
            </Link>

            <Link
              to="/tools"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/tools') ? 'bg-white dark:bg-[#222225] font-semibold text-[#1C1C1E] dark:text-white' : 'text-[#4C586F] dark:text-[#A0A9B8]'
              }`}
            >
              <Wrench className="w-4 h-4" /> Tools
            </Link>

            <Link
              to="/newsletter"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/newsletter') ? 'bg-white dark:bg-[#222225] font-semibold text-[#1C1C1E] dark:text-white' : 'text-[#4C586F] dark:text-[#A0A9B8]'
              }`}
            >
              <Mail className="w-4 h-4 text-[#3B719F]" /> Newsletter
            </Link>

            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/about') ? 'bg-white dark:bg-[#222225] font-semibold text-[#1C1C1E] dark:text-white' : 'text-[#4C586F] dark:text-[#A0A9B8]'
              }`}
            >
              <Info className="w-4 h-4" /> About
            </Link>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/contact') ? 'bg-white dark:bg-[#222225] font-semibold text-[#1C1C1E] dark:text-white' : 'text-[#4C586F] dark:text-[#A0A9B8]'
              }`}
            >
              <Send className="w-4 h-4" /> Contact
            </Link>
          </nav>

          <div className="pt-4 border-t border-[#E1E1E1] dark:border-[#2C2C30] flex items-center justify-between">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-xs font-mono text-[#7E8798]"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>Toggle Theme</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

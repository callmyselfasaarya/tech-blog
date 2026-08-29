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
    <header className="lg:hidden sticky top-0 z-40 bg-[#FBFBFA]/90 dark:bg-[#09090B]/90 backdrop-blur-md border-b border-[#E7E6E1] dark:border-[#27272A] px-4 py-3 font-sans">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <TechniccalLogo size="sm" />
        </Link>

        <div className="flex items-center gap-2">
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-xl text-[#74747E] dark:text-[#A1A1AA] hover:bg-[#F2F1EC] dark:hover:bg-[#18181B] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-[#121214] dark:text-[#FAFAFA] hover:bg-[#F2F1EC] dark:hover:bg-[#18181B] transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-x-0 top-[57px] bg-[#FBFBFA] dark:bg-[#09090B] border-b border-[#E7E6E1] dark:border-[#27272A] p-6 shadow-xl space-y-6 max-h-[85vh] overflow-y-auto z-50">
          <nav className="space-y-1">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/') ? 'bg-white dark:bg-[#18181B] font-semibold text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A]' : 'text-[#4A4A52] dark:text-[#A1A1AA]'
              }`}
            >
              <Home className="w-4 h-4" /> Home
            </Link>

            <Link
              to="/blog"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/blog') ? 'bg-white dark:bg-[#18181B] font-semibold text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A]' : 'text-[#4A4A52] dark:text-[#A1A1AA]'
              }`}
            >
              <BookOpen className="w-4 h-4" /> All Articles
            </Link>

            <Link
              to="/ai"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/ai') ? 'bg-white dark:bg-[#18181B] font-semibold text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A]' : 'text-[#4A4A52] dark:text-[#A1A1AA]'
              }`}
            >
              <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" /> AI Articles
            </Link>

            <Link
              to="/programming"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/programming') ? 'bg-white dark:bg-[#18181B] font-semibold text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A]' : 'text-[#4A4A52] dark:text-[#A1A1AA]'
              }`}
            >
              <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Programming
            </Link>

            <Link
              to="/career"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/career') ? 'bg-white dark:bg-[#18181B] font-semibold text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A]' : 'text-[#4A4A52] dark:text-[#A1A1AA]'
              }`}
            >
              <Briefcase className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Jobs / Career
            </Link>

            <Link
              to="/projects"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/projects') ? 'bg-white dark:bg-[#18181B] font-semibold text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A]' : 'text-[#4A4A52] dark:text-[#A1A1AA]'
              }`}
            >
              <Code className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Projects
            </Link>

            <Link
              to="/tools"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/tools') ? 'bg-white dark:bg-[#18181B] font-semibold text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A]' : 'text-[#4A4A52] dark:text-[#A1A1AA]'
              }`}
            >
              <Wrench className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Tools
            </Link>

            <Link
              to="/newsletter"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/newsletter') ? 'bg-white dark:bg-[#18181B] font-semibold text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A]' : 'text-[#4A4A52] dark:text-[#A1A1AA]'
              }`}
            >
              <Mail className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" /> Newsletter
            </Link>

            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/about') ? 'bg-white dark:bg-[#18181B] font-semibold text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A]' : 'text-[#4A4A52] dark:text-[#A1A1AA]'
              }`}
            >
              <Info className="w-4 h-4" /> About
            </Link>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/contact') ? 'bg-white dark:bg-[#18181B] font-semibold text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A]' : 'text-[#4A4A52] dark:text-[#A1A1AA]'
              }`}
            >
              <Send className="w-4 h-4" /> Contact
            </Link>
          </nav>

          <div className="pt-4 border-t border-[#E7E6E1] dark:border-[#27272A] flex items-center justify-between">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-xs font-mono text-[#74747E]"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

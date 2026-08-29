import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home as HomeIcon,
  BookOpen,
  Info,
  UserPlus,
  User,
  Moon,
  Sun,
  Search,
  ChevronLeft,
  ArrowUpRight,
  Github,
  Cpu,
  Terminal,
  Briefcase,
  Code,
  Wrench,
  Mail,
  Send,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { TechniccalLogo, TechniccalMonogram } from '../ui/TechniccalLogo';

interface SidebarProps {
  onOpenSearch?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenSearch }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  if (isCollapsed) {
    return (
      <aside className="w-18 h-screen sticky top-0 flex flex-col justify-between items-center py-6 px-2 border-r border-[#E7E6E1] dark:border-[#27272A] bg-[#FBFBFA] dark:bg-[#09090B] select-none shrink-0 transition-all duration-300 font-sans z-30">
        <div className="flex flex-col items-center space-y-6">
          <button
            onClick={() => setIsCollapsed(false)}
            className="w-10 h-10 rounded-xl bg-white dark:bg-[#18181B] border border-[#E7E6E1] dark:border-[#27272A] flex items-center justify-center hover:border-black/20 dark:hover:border-white/20 transition-all cursor-pointer shadow-xs"
            title="Expand Sidebar"
          >
            <TechniccalMonogram className="w-5 h-5 text-[#121214] dark:text-white" />
          </button>

          <nav className="flex flex-col items-center space-y-3">
            <Link
              to="/"
              className={`p-2.5 rounded-xl transition-all ${
                isActive('/')
                  ? 'bg-white dark:bg-[#18181B] text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A] shadow-xs'
                  : 'text-[#74747E] hover:text-[#121214] dark:hover:text-white'
              }`}
              title="Home"
            >
              <HomeIcon className="w-4 h-4" />
            </Link>

            <Link
              to="/blog"
              className={`p-2.5 rounded-xl transition-all ${
                isActive('/blog')
                  ? 'bg-white dark:bg-[#18181B] text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A] shadow-xs'
                  : 'text-[#74747E] hover:text-[#121214] dark:hover:text-white'
              }`}
              title="All Articles"
            >
              <BookOpen className="w-4 h-4" />
            </Link>

            <Link
              to="/ai"
              className={`p-2.5 rounded-xl transition-all ${
                isActive('/ai')
                  ? 'bg-white dark:bg-[#18181B] text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A] shadow-xs'
                  : 'text-[#74747E] hover:text-[#121214] dark:hover:text-white'
              }`}
              title="AI Articles"
            >
              <Cpu className="w-4 h-4" />
            </Link>

            <Link
              to="/about"
              className={`p-2.5 rounded-xl transition-all ${
                isActive('/about')
                  ? 'bg-white dark:bg-[#18181B] text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A] shadow-xs'
                  : 'text-[#74747E] hover:text-[#121214] dark:hover:text-white'
              }`}
              title="About"
            >
              <Info className="w-4 h-4" />
            </Link>
          </nav>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl text-[#74747E] hover:text-[#121214] dark:hover:text-[#FAFAFA] transition-colors cursor-pointer"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </aside>
    );
  }

  return (
    <aside data-lenis-prevent className="w-[270px] h-screen sticky top-0 flex flex-col justify-between p-5 border-r border-[#E7E6E1] dark:border-[#27272A] bg-[#FBFBFA] dark:bg-[#09090B] select-none shrink-0 overflow-y-auto font-sans transition-all duration-300 z-30">
      <div className="space-y-6">
        {/* Official Techniccal Header */}
        <div className="space-y-1.5 pb-1">
          <div className="flex items-center justify-between">
            <Link to="/" className="group block">
              <TechniccalLogo size="md" />
            </Link>

            <button
              onClick={() => setIsCollapsed(true)}
              className="w-6 h-6 rounded-full bg-[#1C1C1E] dark:bg-[#F6F5F0] text-[#F6F5F0] dark:text-[#1C1C1E] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer shadow-xs"
              title="Collapse Sidebar"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-1.5 px-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B719F] animate-pulse" />
            <span className="text-[10px] font-mono text-[#4C586F] dark:text-[#A0A9B8] uppercase tracking-wider font-medium">
              TECHNICALL / ISSUE 026
            </span>
          </div>
        </div>

        {/* Quick Command Search Trigger */}
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3 py-2 text-xs text-[#74747E] bg-white dark:bg-[#18181B] border border-[#E7E6E1] dark:border-[#27272A] rounded-xl hover:border-[#121214]/20 dark:hover:border-white/20 transition-all cursor-pointer shadow-xs group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#74747E] group-hover:text-[#121214] dark:group-hover:text-white transition-colors" />
            <span className="group-hover:text-[#121214] dark:group-hover:text-white transition-colors">Search dispatches...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#F2F1EC] dark:bg-[#09090B] border border-[#E7E6E1] dark:border-[#27272A] rounded text-[#74747E]">
            ⌘K
          </kbd>
        </button>

        {/* Primary Navigation */}
        <nav className="space-y-1">
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              isActive('/')
                ? 'bg-white dark:bg-[#18181B] text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A] shadow-xs font-semibold'
                : 'text-[#4A4A52] dark:text-[#A1A1AA] hover:bg-[#F2F1EC] dark:hover:bg-[#121215] hover:text-[#121214] dark:hover:text-white'
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            <span>Home</span>
          </Link>

          <Link
            to="/blog"
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              isActive('/blog')
                ? 'bg-white dark:bg-[#18181B] text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A] shadow-xs font-semibold'
                : 'text-[#4A4A52] dark:text-[#A1A1AA] hover:bg-[#F2F1EC] dark:hover:bg-[#121215] hover:text-[#121214] dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>All Articles</span>
          </Link>

          <Link
            to="/about"
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              isActive('/about')
                ? 'bg-white dark:bg-[#18181B] text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A] shadow-xs font-semibold'
                : 'text-[#4A4A52] dark:text-[#A1A1AA] hover:bg-[#F2F1EC] dark:hover:bg-[#121215] hover:text-[#121214] dark:hover:text-white'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>About</span>
          </Link>

          <Link
            to="/contact"
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              isActive('/contact')
                ? 'bg-white dark:bg-[#18181B] text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A] shadow-xs font-semibold'
                : 'text-[#4A4A52] dark:text-[#A1A1AA] hover:bg-[#F2F1EC] dark:hover:bg-[#121215] hover:text-[#121214] dark:hover:text-white'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Contact</span>
          </Link>
        </nav>

        {/* TOPICS & SECTIONS */}
        <div>
          <div className="text-[10px] font-mono tracking-widest text-[#74747E] uppercase mb-2 px-3">
            TOPICS & DISPATCHES
          </div>
          <div className="space-y-0.5">
            <Link
              to="/ai"
              className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isActive('/ai')
                  ? 'bg-white dark:bg-[#18181B] text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A] shadow-xs font-medium'
                  : 'text-[#4A4A52] dark:text-[#A1A1AA] hover:bg-[#F2F1EC] dark:hover:bg-[#121215] hover:text-[#121214] dark:hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>AI Articles</span>
            </Link>

            <Link
              to="/programming"
              className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isActive('/programming')
                  ? 'bg-white dark:bg-[#18181B] text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A] shadow-xs font-medium'
                  : 'text-[#4A4A52] dark:text-[#A1A1AA] hover:bg-[#F2F1EC] dark:hover:bg-[#121215] hover:text-[#121214] dark:hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Programming</span>
            </Link>

            <Link
              to="/career"
              className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isActive('/career')
                  ? 'bg-white dark:bg-[#18181B] text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A] shadow-xs font-medium'
                  : 'text-[#4A4A52] dark:text-[#A1A1AA] hover:bg-[#F2F1EC] dark:hover:bg-[#121215] hover:text-[#121214] dark:hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Jobs / Career</span>
            </Link>

            <Link
              to="/projects"
              className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isActive('/projects')
                  ? 'bg-white dark:bg-[#18181B] text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A] shadow-xs font-medium'
                  : 'text-[#4A4A52] dark:text-[#A1A1AA] hover:bg-[#F2F1EC] dark:hover:bg-[#121215] hover:text-[#121214] dark:hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Projects</span>
            </Link>

            <Link
              to="/tools"
              className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isActive('/tools')
                  ? 'bg-white dark:bg-[#18181B] text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A] shadow-xs font-medium'
                  : 'text-[#4A4A52] dark:text-[#A1A1AA] hover:bg-[#F2F1EC] dark:hover:bg-[#121215] hover:text-[#121214] dark:hover:text-white'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Tools</span>
            </Link>

            <Link
              to="/newsletter"
              className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isActive('/newsletter')
                  ? 'bg-white dark:bg-[#18181B] text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A] shadow-xs font-medium'
                  : 'text-[#4A4A52] dark:text-[#A1A1AA] hover:bg-[#F2F1EC] dark:hover:bg-[#121215] hover:text-[#121214] dark:hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#3B82F6]" />
              <span>Newsletter</span>
            </Link>
          </div>
        </div>

        {/* COMMUNITY & SOCIAL */}
        <div>
          <div className="text-[10px] font-mono tracking-widest text-[#74747E] uppercase mb-2 px-3">
            COMMUNITY & CODE
          </div>
          <div className="space-y-0.5">
            <a
              href="https://github.com/callmyselfasaarya/tech-blog"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3 py-1.5 rounded-xl text-xs text-[#4A4A52] dark:text-[#A1A1AA] hover:text-[#121214] dark:hover:text-white hover:bg-[#F2F1EC] dark:hover:bg-[#121215] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>

        {/* MEMBERSHIP */}
        <div>
          <div className="text-[10px] font-mono tracking-widest text-[#74747E] uppercase mb-2 px-3">
            MEMBERSHIP & ACCESS
          </div>
          <div className="space-y-0.5">
            <Link
              to="/account"
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                isActive('/account')
                  ? 'bg-white dark:bg-[#18181B] text-[#121214] dark:text-white border border-[#E7E6E1] dark:border-[#27272A] shadow-xs font-semibold'
                  : 'text-[#4A4A52] dark:text-[#A1A1AA] hover:bg-[#F2F1EC] dark:hover:bg-[#121215] hover:text-[#121214] dark:hover:text-white'
              }`}
            >
              <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Member Portal</span>
            </Link>
            <Link
              to="/sign-up"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#4A4A52] dark:text-[#A1A1AA] hover:bg-[#F2F1EC] dark:hover:bg-[#121215] hover:text-[#121214] dark:hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <UserPlus className="w-4 h-4" />
                <span>Join Insider</span>
              </div>
              <Sparkles className="w-3 h-3 text-amber-500" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="pt-4 border-t border-[#E7E6E1] dark:border-[#27272A] flex items-center justify-between">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 text-xs font-mono text-[#74747E] hover:text-[#121214] dark:hover:text-[#FAFAFA] transition-colors cursor-pointer"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        <Link to="/admin/login" className="text-[10px] font-mono text-[#74747E] hover:underline hover:text-[#121214] dark:hover:text-white">
          CMS
        </Link>
      </div>
    </aside>
  );
};


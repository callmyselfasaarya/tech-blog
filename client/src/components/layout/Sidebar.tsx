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
  ChevronRight,
  ArrowUpRight,
  Github,
  Twitter,
  MessageSquare,
  Cpu,
  Terminal,
  Briefcase,
  Code,
  Wrench,
  Mail,
  Send
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
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  if (isCollapsed) {
    return (
      <aside className="w-18 h-screen sticky top-0 flex flex-col justify-between items-center py-6 px-2 border-r border-[#E1E1E1] dark:border-[#2C2C30] bg-[#F6F5F0] dark:bg-[#141416] select-none shrink-0 transition-all duration-300 font-poppins">
        <div className="flex flex-col items-center space-y-6">
          <button
            onClick={() => setIsCollapsed(false)}
            className="w-9 h-9 rounded-xl bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer shadow-xs"
            title="Expand Sidebar"
          >
            <TechniccalMonogram className="w-5 h-5 text-[#1C1C1E] dark:text-white" />
          </button>

          <nav className="flex flex-col items-center space-y-3">
            <Link
              to="/"
              className={`p-2.5 rounded-xl transition-all ${
                isActive('/') ? 'bg-white dark:bg-[#222225] text-[#1C1C1E] dark:text-white shadow-xs' : 'text-[#4C586F] dark:text-[#A0A9B8]'
              }`}
              title="Home"
            >
              <HomeIcon className="w-4 h-4" />
            </Link>

            <Link
              to="/blog"
              className={`p-2.5 rounded-xl transition-all ${
                isActive('/blog') ? 'bg-white dark:bg-[#222225] text-[#1C1C1E] dark:text-white shadow-xs' : 'text-[#4C586F] dark:text-[#A0A9B8]'
              }`}
              title="All Articles"
            >
              <BookOpen className="w-4 h-4" />
            </Link>

            <Link
              to="/ai"
              className={`p-2.5 rounded-xl transition-all ${
                isActive('/ai') ? 'bg-white dark:bg-[#222225] text-[#1C1C1E] dark:text-white shadow-xs' : 'text-[#4C586F] dark:text-[#A0A9B8]'
              }`}
              title="AI Articles"
            >
              <Cpu className="w-4 h-4" />
            </Link>

            <Link
              to="/about"
              className={`p-2.5 rounded-xl transition-all ${
                isActive('/about') ? 'bg-white dark:bg-[#222225] text-[#1C1C1E] dark:text-white shadow-xs' : 'text-[#4C586F] dark:text-[#A0A9B8]'
              }`}
              title="About"
            >
              <Info className="w-4 h-4" />
            </Link>
          </nav>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-[#4C586F] hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0]"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </aside>
    );
  }

  return (
    <aside data-lenis-prevent className="w-[280px] h-screen sticky top-0 flex flex-col justify-between p-6 border-r border-[#E1E1E1] dark:border-[#2C2C30] bg-[#F6F5F0] dark:bg-[#141416] select-none shrink-0 overflow-y-auto font-poppins transition-all duration-300">
      <div className="space-y-6">
        {/* Official Techniccal Header */}
        <div className="flex items-center justify-between pb-2">
          <Link to="/" className="group block">
            <TechniccalLogo size="md" />
          </Link>

          <button
            onClick={() => setIsCollapsed(true)}
            className="w-6 h-6 rounded-full bg-[#1C1C1E] dark:bg-white text-white dark:text-[#1C1C1E] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
            title="Collapse Sidebar"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Command Search Trigger */}
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3 py-2 text-xs text-[#7E8798] dark:text-[#A0A9B8] bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] rounded-xl hover:border-[#1C1C1E]/30 dark:hover:border-white/30 transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#7E8798]" />
            <span>Search...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#F4F2EE] dark:bg-[#1C1C1E] border border-[#E1E1E1] dark:border-[#2C2C30] rounded text-[#7E8798]">
            ⌘K
          </kbd>
        </button>

        {/* Primary Navigation */}
        <nav className="space-y-1">
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              isActive('/')
                ? 'bg-white dark:bg-[#222225] text-[#1C1C1E] dark:text-[#F6F5F0] shadow-sm font-semibold'
                : 'text-[#4C586F] dark:text-[#A0A9B8] hover:bg-[#E8E7E2]/60 dark:hover:bg-[#1C1C1E]/60'
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            <span>Home</span>
          </Link>

          <Link
            to="/blog"
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              isActive('/blog')
                ? 'bg-white dark:bg-[#222225] text-[#1C1C1E] dark:text-[#F6F5F0] shadow-sm font-semibold'
                : 'text-[#4C586F] dark:text-[#A0A9B8] hover:bg-[#E8E7E2]/60 dark:hover:bg-[#1C1C1E]/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>All Articles</span>
          </Link>

          <Link
            to="/about"
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              isActive('/about')
                ? 'bg-white dark:bg-[#222225] text-[#1C1C1E] dark:text-[#F6F6F0] shadow-sm font-semibold'
                : 'text-[#4C586F] dark:text-[#A0A9B8] hover:bg-[#E8E7E2]/60 dark:hover:bg-[#1C1C1E]/60'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>About</span>
          </Link>

          <Link
            to="/contact"
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              isActive('/contact')
                ? 'bg-white dark:bg-[#222225] text-[#1C1C1E] dark:text-[#F6F5F0] shadow-sm font-semibold'
                : 'text-[#4C586F] dark:text-[#A0A9B8] hover:bg-[#E8E7E2]/60 dark:hover:bg-[#1C1C1E]/60'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Contact</span>
          </Link>
        </nav>

        {/* TOPICS & SECTIONS */}
        <div>
          <div className="text-[10px] font-mono tracking-widest text-[#7E8798] dark:text-[#6B7485] uppercase mb-2 px-3">
            TOPICS & SECTIONS
          </div>
          <div className="space-y-0.5">
            <Link
              to="/ai"
              className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isActive('/ai')
                  ? 'bg-white dark:bg-[#222225] text-[#1C1C1E] dark:text-[#F6F5F0] shadow-xs'
                  : 'text-[#4C586F] dark:text-[#A0A9B8] hover:bg-[#E8E7E2]/50 dark:hover:bg-[#1C1C1E]/50'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-[#3B719F]" />
              <span>AI Articles</span>
            </Link>

            <Link
              to="/programming"
              className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isActive('/programming')
                  ? 'bg-white dark:bg-[#222225] text-[#1C1C1E] dark:text-[#F6F5F0] shadow-xs'
                  : 'text-[#4C586F] dark:text-[#A0A9B8] hover:bg-[#E8E7E2]/50 dark:hover:bg-[#1C1C1E]/50'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Programming</span>
            </Link>

            <Link
              to="/career"
              className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isActive('/career')
                  ? 'bg-white dark:bg-[#222225] text-[#1C1C1E] dark:text-[#F6F5F0] shadow-xs'
                  : 'text-[#4C586F] dark:text-[#A0A9B8] hover:bg-[#E8E7E2]/50 dark:hover:bg-[#1C1C1E]/50'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-[#4C586F]" />
              <span>Jobs / Career</span>
            </Link>

            <Link
              to="/projects"
              className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isActive('/projects')
                  ? 'bg-white dark:bg-[#222225] text-[#1C1C1E] dark:text-[#F6F5F0] shadow-xs'
                  : 'text-[#4C586F] dark:text-[#A0A9B8] hover:bg-[#E8E7E2]/50 dark:hover:bg-[#1C1C1E]/50'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-[#3B719F]" />
              <span>Projects</span>
            </Link>

            <Link
              to="/tools"
              className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isActive('/tools')
                  ? 'bg-white dark:bg-[#222225] text-[#1C1C1E] dark:text-[#F6F5F0] shadow-xs'
                  : 'text-[#4C586F] dark:text-[#A0A9B8] hover:bg-[#E8E7E2]/50 dark:hover:bg-[#1C1C1E]/50'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Tools</span>
            </Link>

            <Link
              to="/newsletter"
              className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isActive('/newsletter')
                  ? 'bg-white dark:bg-[#222225] text-[#1C1C1E] dark:text-[#F6F5F0] shadow-xs'
                  : 'text-[#4C586F] dark:text-[#A0A9B8] hover:bg-[#E8E7E2]/50 dark:hover:bg-[#1C1C1E]/50'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-[#3B719F]" />
              <span>Newsletter</span>
            </Link>
          </div>
        </div>

        {/* COMMUNITY & SOCIAL */}
        <div>
          <div className="text-[10px] font-mono tracking-widest text-[#7E8798] dark:text-[#6B7485] uppercase mb-2 px-3">
            COMMUNITY & SOCIAL
          </div>
          <div className="space-y-0.5">
            <a
              href="https://github.com/callmyselfasaarya/tech-blog"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3 py-1.5 rounded-xl text-xs text-[#4C586F] dark:text-[#A0A9B8] hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] hover:bg-[#E8E7E2]/50 dark:hover:bg-[#1C1C1E]/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>

          </div>
        </div>

        {/* MEMBERSHIP */}
        <div>
          <div className="text-[10px] font-mono tracking-widest text-[#7E8798] dark:text-[#6B7485] uppercase mb-2 px-3">
            READER & MEMBER TRACK
          </div>
          <div className="space-y-0.5">
            <Link
              to="/account"
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                isActive('/account')
                  ? 'bg-white dark:bg-[#222225] text-[#1C1C1E] dark:text-[#F6F5F0] shadow-sm font-semibold'
                  : 'text-[#4C586F] dark:text-[#A0A9B8] hover:bg-[#E8E7E2]/60 dark:hover:bg-[#1C1C1E]/60'
              }`}
            >
              <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Member Portal</span>
            </Link>
            <Link
              to="/sign-up"
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-[#4C586F] dark:text-[#A0A9B8] hover:bg-[#E8E7E2]/60 dark:hover:bg-[#1C1C1E]/60 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>Join Insider</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="pt-6 border-t border-[#E1E1E1] dark:border-[#2C2C30] flex items-center justify-between">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 text-xs font-mono text-[#7E8798] hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] cursor-pointer"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span>Theme Mode</span>
        </button>

        <Link to="/admin/login" className="text-[10px] font-mono text-[#7E8798] hover:underline">
          CMS
        </Link>
      </div>
    </aside>
  );
};

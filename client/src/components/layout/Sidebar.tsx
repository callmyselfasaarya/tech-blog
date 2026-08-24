import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Info, BookOpen, Github, Twitter, MessageSquare, UserPlus, ArrowUpRight, Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { TechniccalLogo, TechniccalMonogram } from '../ui/TechniccalLogo';

interface SidebarProps {
  onOpenSearch?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = () => {
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
      <aside className="w-16 h-screen sticky top-0 flex flex-col justify-between items-center py-6 border-r border-[#E1E1E1] dark:border-[#2C2C30] bg-[#F6F5F0] dark:bg-[#141416] select-none shrink-0 transition-all duration-300">
        <div className="flex flex-col items-center gap-4">
          <Link to="/" className="w-8 h-8 rounded-lg bg-[#1C1C1E] text-white flex items-center justify-center p-1.5 shadow-sm">
            <TechniccalMonogram color="#FFFFFF" className="w-5 h-5" />
          </Link>

          <button
            onClick={() => setIsCollapsed(false)}
            className="p-1.5 rounded-full bg-[#E8E7E2] dark:bg-[#1C1C1E] hover:bg-[#E1E1E1] dark:hover:bg-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] transition-colors cursor-pointer mt-2"
            title="Expand Sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <nav className="space-y-4 flex flex-col items-center">
          <Link to="/" className={`p-2 rounded-xl ${isActive('/') ? 'bg-white dark:bg-[#222225] shadow-sm' : 'text-[#4C586F]'}`}>
            <HomeIcon className="w-5 h-5" />
          </Link>
          <Link to="/about" className={`p-2 rounded-xl ${isActive('/about') ? 'bg-white dark:bg-[#222225] shadow-sm' : 'text-[#4C586F]'}`}>
            <Info className="w-5 h-5" />
          </Link>
          <Link to="/letters" className={`p-2 rounded-xl ${isActive('/letters') ? 'bg-white dark:bg-[#222225] shadow-sm' : 'text-[#4C586F]'}`}>
            <BookOpen className="w-5 h-5" />
          </Link>
        </nav>

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
    <aside className="w-[280px] h-screen sticky top-0 flex flex-col justify-between p-6 border-r border-[#E1E1E1] dark:border-[#2C2C30] bg-[#F6F5F0] dark:bg-[#141416] select-none shrink-0 overflow-y-auto font-poppins transition-all duration-300">
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
            to="/letters"
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              isActive('/letters')
                ? 'bg-white dark:bg-[#222225] text-[#1C1C1E] dark:text-[#F6F5F0] shadow-sm font-semibold'
                : 'text-[#4C586F] dark:text-[#A0A9B8] hover:bg-[#E8E7E2]/60 dark:hover:bg-[#1C1C1E]/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-4 h-4" />
              <span>Dispatches</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#E1E1E1] dark:bg-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] font-semibold">
              6
            </span>
          </Link>
        </nav>

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

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3 py-1.5 rounded-xl text-xs text-[#4C586F] dark:text-[#A0A9B8] hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] hover:bg-[#E8E7E2]/50 dark:hover:bg-[#1C1C1E]/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Twitter className="w-4 h-4" />
                <span>X / Twitter</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>

            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3 py-1.5 rounded-xl text-xs text-[#4C586F] dark:text-[#A0A9B8] hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] hover:bg-[#E8E7E2]/50 dark:hover:bg-[#1C1C1E]/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                <span>Discord</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>

        {/* MEMBERSHIP */}
        <div>
          <div className="text-[10px] font-mono tracking-widest text-[#7E8798] dark:text-[#6B7485] uppercase mb-2 px-3">
            MEMBERSHIP
          </div>
          <Link
            to="/sign-up"
            className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs transition-colors ${
              isActive('/sign-up')
                ? 'bg-white dark:bg-[#222225] text-[#1C1C1E] dark:text-[#F6F5F0] font-semibold'
                : 'text-[#4C586F] dark:text-[#A0A9B8] hover:bg-[#E8E7E2]/50 dark:hover:bg-[#1C1C1E]/50'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Join Insider</span>
          </Link>
        </div>

        {/* FEATURED ESSAY */}
        <div>
          <div className="text-[10px] font-mono tracking-widest text-[#7E8798] dark:text-[#6B7485] uppercase mb-2 px-3">
            FEATURED ESSAY
          </div>
          <Link
            to="/article/designing-high-throughput-distributed-systems"
            className="block p-3 rounded-2xl bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] hover:shadow-md transition-all group"
          >
            <div className="overflow-hidden rounded-xl mb-2.5 aspect-[16/10] bg-[#E8E7E2]">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
                alt="Designing High-Throughput Distributed Systems"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex items-start justify-between gap-1">
              <h3 className="font-display font-semibold text-xs text-[#1C1C1E] dark:text-[#F6F5F0] leading-snug line-clamp-2">
                Designing High-Throughput Distributed Systems
              </h3>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#7E8798] shrink-0 group-hover:text-[#1C1C1E] dark:group-hover:text-[#F6F5F0] transition-colors" />
            </div>
          </Link>
        </div>

        {/* Subscribe to Techniccal */}
        <div className="pt-2">
          <h3 className="font-display font-semibold text-xs text-[#1C1C1E] dark:text-[#F6F5F0] mb-2 px-1">
            Subscribe to Techniccal
          </h3>
          {subscribed ? (
            <div className="p-3 bg-[#3B719F]/10 border border-[#3B719F]/30 text-[#3B719F] dark:text-blue-400 text-xs rounded-xl font-medium text-center">
              Subscribed to Tech Dispatch!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="work@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#7E8798] focus:outline-none focus:ring-1 focus:ring-[#1C1C1E] dark:focus:ring-white transition-all"
              />
              <button
                type="submit"
                className="w-full py-2 px-4 text-xs font-semibold rounded-xl bg-[#1C1C1E] dark:bg-white text-white dark:text-[#1C1C1E] hover:opacity-90 transition-opacity cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer details */}
      <div className="pt-4 mt-6 border-t border-[#E1E1E1] dark:border-[#2C2C30] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-[#7E8798] dark:text-[#6B7485]">
            Theme Mode
          </span>
          <button
            onClick={toggleTheme}
            className="p-1 text-[#4C586F] dark:text-[#A0A9B8] hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] text-[#7E8798] dark:text-[#6B7485]">
          <span>© 2026 Techniccal Inc.</span>
          <Link to="/admin" className="hover:underline hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0]">
            CMS
          </Link>
        </div>
      </div>
    </aside>
  );
};

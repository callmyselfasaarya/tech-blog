import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, User, BookOpen, Instagram, Youtube, Mail, UserPlus, ArrowUpRight, Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

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
      <aside className="w-16 h-screen sticky top-0 flex flex-col justify-between items-center py-6 border-r border-[#EDEAE7] dark:border-[#2C2927] bg-[#F4F2F0] dark:bg-[#161514] select-none shrink-0 transition-all duration-300">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 rounded-full bg-[#EDEAE7] dark:bg-[#22201F] hover:bg-[#E2DDD8] dark:hover:bg-[#2D2A28] text-[#1A1918] dark:text-[#F4F2F0] transition-colors"
          title="Expand Sidebar"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <nav className="space-y-4 flex flex-col items-center">
          <Link to="/" className={`p-2 rounded-xl ${isActive('/') ? 'bg-white dark:bg-[#201E1D] shadow-sm' : 'text-[#6E6862]'}`}>
            <HomeIcon className="w-5 h-5" />
          </Link>
          <Link to="/about" className={`p-2 rounded-xl ${isActive('/about') ? 'bg-white dark:bg-[#201E1D] shadow-sm' : 'text-[#6E6862]'}`}>
            <User className="w-5 h-5" />
          </Link>
          <Link to="/letters" className={`p-2 rounded-xl ${isActive('/letters') ? 'bg-white dark:bg-[#201E1D] shadow-sm' : 'text-[#6E6862]'}`}>
            <BookOpen className="w-5 h-5" />
          </Link>
        </nav>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-[#6E6862] hover:text-[#1A1918] dark:hover:text-[#F4F2F0]"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </aside>
    );
  }

  return (
    <aside className="w-[280px] h-screen sticky top-0 flex flex-col justify-between p-6 border-r border-[#EDEAE7] dark:border-[#2C2927] bg-[#F4F2F0] dark:bg-[#161514] select-none shrink-0 overflow-y-auto font-sans transition-all duration-300">
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-center justify-between pb-2">
          <Link to="/about" className="flex items-center gap-3 group">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
              alt="Skylar Rowe"
              className="w-10 h-10 rounded-full object-cover border border-[#E8E4DF] dark:border-[#2C2927]"
            />
            <div>
              <h2 className="font-display font-semibold text-sm text-[#1A1918] dark:text-[#F4F2F0] group-hover:opacity-80 transition-opacity">
                Skylar Rowe
              </h2>
              <p className="text-[11px] text-[#99938B] dark:text-[#78736B] leading-tight">
                Writer & Digital Creator
              </p>
            </div>
          </Link>

          <button
            onClick={() => setIsCollapsed(true)}
            className="w-6 h-6 rounded-full bg-[#1A1918] dark:bg-white text-white dark:text-[#1A1918] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
            title="Collapse Sidebar"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1">
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              isActive('/')
                ? 'bg-white dark:bg-[#201E1D] text-[#1A1918] dark:text-[#F4F2F0] shadow-sm font-semibold'
                : 'text-[#6E6862] dark:text-[#A8A29A] hover:bg-[#EDEAE7]/60 dark:hover:bg-[#22201F]/60'
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            <span>Home</span>
          </Link>

          <Link
            to="/about"
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              isActive('/about')
                ? 'bg-white dark:bg-[#201E1D] text-[#1A1918] dark:text-[#F4F2F0] shadow-sm font-semibold'
                : 'text-[#6E6862] dark:text-[#A8A29A] hover:bg-[#EDEAE7]/60 dark:hover:bg-[#22201F]/60'
            }`}
          >
            <User className="w-4 h-4" />
            <span>About</span>
          </Link>

          <Link
            to="/letters"
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              isActive('/letters')
                ? 'bg-white dark:bg-[#201E1D] text-[#1A1A18] dark:text-[#F4F2F0] shadow-sm font-semibold'
                : 'text-[#6E6862] dark:text-[#A8A29A] hover:bg-[#EDEAE7]/60 dark:hover:bg-[#22201F]/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-4 h-4" />
              <span>Letters</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#EDEAE7] dark:bg-[#2C2927] text-[#6E6862] dark:text-[#A8A29A]">
              6
            </span>
          </Link>
        </nav>

        {/* FIND ME Section */}
        <div className="pt-2">
          <div className="text-[10px] font-mono tracking-widest text-[#99938B] dark:text-[#78736B] uppercase mb-2 px-3">
            FIND ME
          </div>
          <div className="space-y-0.5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3 py-1.5 rounded-xl text-xs text-[#6E6862] dark:text-[#A8A29A] hover:text-[#1A1918] dark:hover:text-[#F4F2F0] hover:bg-[#EDEAE7]/50 dark:hover:bg-[#22201F]/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3 py-1.5 rounded-xl text-xs text-[#6E6862] dark:text-[#A8A29A] hover:text-[#1A1918] dark:hover:text-[#F4F2F0] hover:bg-[#EDEAE7]/50 dark:hover:bg-[#22201F]/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Youtube className="w-4 h-4" />
                <span>YouTube</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>

            <a
              href="mailto:skylar@memoir.blog"
              className="flex items-center justify-between px-3 py-1.5 rounded-xl text-xs text-[#6E6862] dark:text-[#A8A29A] hover:text-[#1A1918] dark:hover:text-[#F4F2F0] hover:bg-[#EDEAE7]/50 dark:hover:bg-[#22201F]/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>

        {/* ACCOUNT Section */}
        <div>
          <div className="text-[10px] font-mono tracking-widest text-[#99938B] dark:text-[#78736B] uppercase mb-2 px-3">
            ACCOUNT
          </div>
          <Link
            to="/sign-up"
            className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs transition-colors ${
              isActive('/sign-up')
                ? 'bg-white dark:bg-[#201E1D] text-[#1A1918] dark:text-[#F4F2F0] font-semibold'
                : 'text-[#6E6862] dark:text-[#A8A29A] hover:bg-[#EDEAE7]/50 dark:hover:bg-[#22201F]/50'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Sign Up</span>
          </Link>
        </div>

        {/* PINNED Section */}
        <div>
          <div className="text-[10px] font-mono tracking-widest text-[#99938B] dark:text-[#78736B] uppercase mb-2 px-3">
            PINNED
          </div>
          <Link
            to="/article/the-only-writing-tools-i-actually-use"
            className="block p-3 rounded-2xl bg-white dark:bg-[#201E1D] border border-[#E8E4DF] dark:border-[#2C2927] hover:shadow-md transition-all group"
          >
            <div className="overflow-hidden rounded-xl mb-2.5 aspect-[16/10]">
              <img
                src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80"
                alt="The Only Writing Tools I Actually Use"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex items-start justify-between gap-1">
              <h3 className="font-display font-semibold text-xs text-[#1A1918] dark:text-[#F4F2F0] leading-snug line-clamp-2">
                The Only Writing Tools I Actually Use
              </h3>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#99938B] shrink-0 group-hover:text-[#1A1918] dark:group-hover:text-[#F4F2F0] transition-colors" />
            </div>
          </Link>
        </div>

        {/* Stay in the loop Newsletter Widget */}
        <div className="pt-2">
          <h3 className="font-display font-medium text-xs text-[#1A1918] dark:text-[#F4F2F0] mb-2 px-1">
            Stay in the loop
          </h3>
          {subscribed ? (
            <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs rounded-xl font-medium text-center">
              You're subscribed!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#201E1D] border border-[#E8E4DF] dark:border-[#2C2927] text-[#1A1918] dark:text-[#F4F2F0] placeholder-[#99938B] focus:outline-none focus:ring-1 focus:ring-[#1A1918] dark:focus:ring-white transition-all"
              />
              <button
                type="submit"
                className="w-full py-2 px-4 text-xs font-semibold rounded-xl bg-[#1A1918] dark:bg-white text-white dark:text-[#1A1918] hover:opacity-90 transition-opacity cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer details */}
      <div className="pt-4 mt-6 border-t border-[#EDEAE7] dark:border-[#2C2927] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-[#99938B] dark:text-[#78736B]">
            Theme
          </span>
          <button
            onClick={toggleTheme}
            className="p-1 text-[#6E6862] dark:text-[#A8A29A] hover:text-[#1A1918] dark:hover:text-[#F4F2F0] transition-colors cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] text-[#99938B] dark:text-[#78736B]">
          <span>© 2025 Memoir.</span>
          <Link to="/admin" className="hover:underline hover:text-[#1A1918] dark:hover:text-[#F4F2F0]">
            CMS
          </Link>
        </div>
      </div>
    </aside>
  );
};

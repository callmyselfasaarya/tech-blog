import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Sun, Moon, Home as HomeIcon, User, BookOpen, UserPlus, Instagram, Youtube, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

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
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-5 py-3.5 bg-[#F4F2F0]/90 dark:bg-[#161514]/90 backdrop-blur-md border-b border-[#EDEAE7] dark:border-[#2C2927]">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2.5">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
            alt="Skylar Rowe"
            className="w-8 h-8 rounded-full object-cover border border-[#E8E4DF] dark:border-[#2C2927]"
          />
          <div>
            <span className="font-display font-semibold text-xs text-[#1A1918] dark:text-[#F4F2F0]">
              Skylar Rowe
            </span>
            <span className="block text-[10px] text-[#99938B] dark:text-[#78736B]">Memoir</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#6E6862] dark:text-[#A8A29A] hover:text-[#1A1918] dark:hover:text-[#F4F2F0]"
              aria-label="Open Search"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 text-[#1A1918] dark:text-[#F4F2F0]"
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
            className="fixed inset-0 z-50 bg-[#F4F2F0] dark:bg-[#161514] flex flex-col justify-between p-6 overflow-y-auto"
          >
            <div>
              {/* Menu Top Action Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-[#EDEAE7] dark:border-[#2C2927]">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                    alt="Skylar Rowe"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-display font-semibold text-sm text-[#1A1918] dark:text-[#F4F2F0]">
                      Skylar Rowe
                    </h2>
                    <p className="text-xs text-[#99938B]">Writer & Digital Creator</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleTheme}
                    className="p-2 text-[#6E6862] dark:text-[#A8A29A] hover:text-[#1A1918] dark:hover:text-[#F4F2F0]"
                  >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={closeMenu}
                    className="p-2 text-[#1A1918] dark:text-[#F4F2F0]"
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
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-[#201E1D] text-sm font-semibold text-[#1A1918] dark:text-[#F4F2F0]"
                >
                  <HomeIcon className="w-5 h-5" />
                  <span>Home</span>
                </Link>

                <Link
                  to="/about"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-[#201E1D] text-sm font-semibold text-[#1A1918] dark:text-[#F4F2F0]"
                >
                  <User className="w-5 h-5" />
                  <span>About</span>
                </Link>

                <Link
                  to="/letters"
                  onClick={closeMenu}
                  className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white dark:bg-[#201E1D] text-sm font-semibold text-[#1A1918] dark:text-[#F4F2F0]"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5" />
                    <span>Letters</span>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#EDEAE7] dark:bg-[#2C2927]">
                    6
                  </span>
                </Link>

                <Link
                  to="/sign-up"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-[#201E1D] text-sm font-semibold text-[#1A1918] dark:text-[#F4F2F0]"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Sign Up</span>
                </Link>
              </nav>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-[#EDEAE7] dark:border-[#2C2927]">
                <div className="text-[10px] font-mono tracking-widest text-[#99938B] uppercase mb-3">
                  FIND ME
                </div>
                <div className="flex items-center gap-4 text-[#6E6862] dark:text-[#A8A29A]">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs">
                    <Instagram className="w-4 h-4" /> Instagram
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs">
                    <Youtube className="w-4 h-4" /> YouTube
                  </a>
                  <a href="mailto:skylar@memoir.blog" className="flex items-center gap-2 text-xs">
                    <Mail className="w-4 h-4" /> Email
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 text-xs text-[#99938B] text-center">
              © 2025 Memoir. Created by Hamza Ehsan.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

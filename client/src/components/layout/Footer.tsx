import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 pt-10 pb-16 border-t border-[#EDEAE7] dark:border-[#2C2927] text-xs font-sans text-[#6E6862] dark:text-[#A8A29A]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="font-serif italic font-medium text-2xl text-[#1A1918] dark:text-[#F4F2F0] mb-1">
            Memoir
          </h2>
          <p className="text-xs text-[#99938B] dark:text-[#78736B]">
            Ideas and insights for the modern creator.
          </p>
        </div>

        <div className="flex items-center gap-6 font-medium text-xs">
          <Link to="/" className="hover:text-[#1A1918] dark:hover:text-[#F4F2F0] transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-[#1A1918] dark:hover:text-[#F4F2F0] transition-colors">
            About
          </Link>
          <Link to="/letters" className="hover:text-[#1A1918] dark:hover:text-[#F4F2F0] transition-colors">
            Letters
          </Link>
          <Link to="/sign-up" className="hover:text-[#1A1918] dark:hover:text-[#F4F2F0] transition-colors">
            Sign Up
          </Link>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[#EDEAE7]/60 dark:border-[#2C2927]/60 flex items-center justify-between text-[11px] text-[#99938B] dark:text-[#78736B]">
        <span>© 2025 Memoir. Created by Hamza Ehsan.</span>
        <button
          onClick={scrollToTop}
          className="hover:text-[#1A1918] dark:hover:text-[#F4F2F0] transition-colors cursor-pointer"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
};

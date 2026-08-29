import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Terminal } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-xl mx-auto px-4 py-32 text-center font-sans space-y-6"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#E8E7E2] dark:bg-[#252528] border border-[#E1E1E1] dark:border-[#2C2C30] text-xs font-mono font-bold text-[#3B719F] uppercase tracking-widest">
        <Terminal className="w-3.5 h-3.5" /> 404 / SIGNAL LOST
      </div>

      <div className="space-y-2">
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-[#1C1C1E] dark:text-[#F6F5F0] tracking-tight">
          The requested dispatch could not be located.
        </h1>
        <p className="text-xs font-mono text-[#4C586F] dark:text-[#A0A9B8]">
          SYSTEM_ERROR: ROUTE_NOT_FOUND // HTTP_404_NOT_FOUND
        </p>
      </div>

      <p className="text-sm font-serif text-[#4C586F] dark:text-[#A0A9B8] leading-relaxed max-w-md mx-auto">
        The URL path you specified does not map to any active dispatch or technical resource in the Techniccal index.
      </p>

      <div className="pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C1C1E] text-white dark:bg-[#F6F5F0] dark:text-[#1C1C1E] font-mono text-xs uppercase tracking-wider font-bold rounded hover:opacity-90 transition-opacity shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          RETURN TO INDEX
        </Link>
      </div>
    </motion.div>
  );
};

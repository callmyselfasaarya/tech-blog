import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-md mx-auto px-4 py-32 text-center"
    >
      <span className="font-editorial text-7xl font-light text-[#9E9A8E] dark:text-[#6E6E6E] block mb-2">
        404
      </span>
      <h1 className="font-serif text-3xl font-medium text-[#1A1A1A] dark:text-[#ECECEC] mb-3">
        Page Not Found
      </h1>
      <p className="text-sm text-[#6B685F] dark:text-[#A0A0A0] leading-relaxed mb-8 font-sans font-light">
        Looks like this page wandered somewhere else or never existed in this edition.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1A1A1A] dark:bg-[#EEEEEE] text-[#FAF9F5] dark:text-[#121212] font-mono text-xs uppercase tracking-wider font-semibold rounded-sm hover:opacity-90 transition-opacity"
      >
        <ArrowLeft className="w-4 h-4" />
        Return Home
      </Link>
    </motion.div>
  );
};

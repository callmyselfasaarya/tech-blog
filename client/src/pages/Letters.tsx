import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { NewsletterIssue } from '../types';
import { api } from '../services/api';

export const Letters: React.FC = () => {
  const [issues, setIssues] = useState<NewsletterIssue[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      setIsLoading(true);
      try {
        const data = await api.getNewsletterIssues();
        setIssues(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIssues();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto px-4 sm:px-8 py-10"
    >
      <header className="mb-10 text-center max-w-xl mx-auto">
        <div className="inline-block px-3.5 py-1 mb-4 rounded-full bg-[#EDEAE7] dark:bg-[#201E1D] border border-[#E8E4DF] dark:border-[#2C2927] text-xs font-sans font-medium text-[#6E6862] dark:text-[#A8A29A]">
          Letters Archive
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#1A1918] dark:text-[#F4F2F0] tracking-tight mb-3">
          Weekly Dispatches & Reflections
        </h1>
        <p className="text-sm text-[#6E6862] dark:text-[#A8A29A] font-sans leading-relaxed">
          Chronological archive of past newsletter editions written by Aarya Lekshmanan.
        </p>
      </header>

      {/* Issues List */}
      <div className="space-y-4">
        {issues.map((issue) => (
          <article
            key={issue.id}
            className="p-6 rounded-2xl bg-white dark:bg-[#201E1D] border border-[#EDEAE7] dark:border-[#2C2927] hover:shadow-md transition-all group duration-300"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-full bg-[#EDEAE7] dark:bg-[#2C2927] text-[#1A1918] dark:text-[#F4F2F0]">
                {issue.issueNumber}
              </span>
              <span className="text-xs font-mono text-[#99938B]">
                {issue.publishedAt} • {issue.readTime}
              </span>
            </div>

            <h2 className="font-display font-bold text-xl text-[#1A1918] dark:text-[#F4F2F0] group-hover:text-black dark:group-hover:text-white transition-colors mb-2">
              {issue.title}
            </h2>

            <p className="text-sm text-[#6E6862] dark:text-[#A8A29A] leading-relaxed mb-4">
              {issue.excerpt}
            </p>

            <div className="flex items-center gap-1 text-xs font-semibold text-[#1A1918] dark:text-[#F4F2F0] group-hover:translate-x-1 transition-transform">
              <span>Read Letter</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </article>
        ))}
      </div>
    </motion.div>
  );
};

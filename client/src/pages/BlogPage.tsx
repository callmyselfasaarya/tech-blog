import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import { api } from '../services/api';
import { motion } from 'framer-motion';
import { Search, ArrowUpRight } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Posts — Techniccal';
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const articlesData = await api.getArticles('ALL');
        setArticles(articlesData);
      } catch (e) {
        console.error('Error fetching blog articles:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = ['All', 'Engineering', 'AI', 'Design', 'Culture', 'Personal'];

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        art.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        searchQuery === '' ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 font-sans space-y-12">
      {/* Header Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4 pb-8 border-b border-[#E1E1E1] dark:border-[#2C2C30]"
      >
        <span className="text-xs font-mono font-bold tracking-widest text-[#3B719F] dark:text-[#5B9AD5] uppercase">
          WRITING & ESSAYS
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1C1E] dark:text-[#F6F5F0] tracking-tight">
          All Posts
        </h1>
        <p className="text-base sm:text-lg text-[#4C586F] dark:text-[#A0A9B8] leading-relaxed">
          Technical essays, architectural blueprints, AI research notes, and personal reflections.
        </p>
      </motion.section>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1C1C1E] text-white dark:bg-[#F6F5F0] dark:text-[#1C1C1E] font-bold'
                  : 'bg-[#FAF9F5] dark:bg-[#141416] text-[#6E6E73] dark:text-[#98989F] border border-[#E1E1E1] dark:border-[#2C2C30] hover:border-[#3B719F]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#8E8E93] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-4 py-2 text-xs font-mono rounded-xl bg-[#FAF9F5] dark:bg-[#141416] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-[#3B719F]"
          />
        </div>
      </div>

      {/* Articles Chronological List */}
      <div className="divide-y divide-[#E1E1E1] dark:divide-[#2C2C30]">
        {isLoading ? (
          <div className="py-12 text-center text-xs font-mono text-[#8E8E93]">Loading posts...</div>
        ) : filteredArticles.length === 0 ? (
          <div className="py-12 text-center text-xs font-mono text-[#8E8E93]">No articles found matching your criteria.</div>
        ) : (
          filteredArticles.map((art, idx) => {
            const numStr = (idx + 1).toString().padStart(2, '0');
            return (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
              >
                <Link
                  to={`/article/${art.slug}`}
                  className="group py-6 px-2 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-[#FAF9F5] dark:hover:bg-[#141416] rounded-xl transition-all gap-4"
                >
                  <div className="flex items-start sm:items-center gap-4 min-w-0">
                    <span className="text-xs font-mono text-[#6E6E73] dark:text-[#8E8E93] shrink-0 font-bold">
                      {numStr}
                    </span>

                    <div className="space-y-1 min-w-0">
                      <h2 className="font-serif text-xl sm:text-2xl text-[#1C1C1E] dark:text-[#F6F5F0] group-hover:translate-x-1 transition-transform leading-snug">
                        {art.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#4C586F] dark:text-[#A0A9B8] font-sans line-clamp-2">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 font-mono text-xs text-[#6E6E73] dark:text-[#98989F] self-end sm:self-center">
                    <span className="px-2 py-0.5 rounded bg-[#E8E7E2]/60 dark:bg-[#202024] text-[#3B719F] dark:text-[#5B9AD5] text-[10px] font-bold tracking-wider uppercase">
                      {art.category}
                    </span>
                    <span>{art.publishedAt}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#3B719F] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </Link>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

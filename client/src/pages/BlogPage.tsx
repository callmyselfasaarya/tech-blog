import React, { useEffect, useState, useMemo } from 'react';
import { ArticleList } from '../components/blog/ArticleList';
import { Article } from '../types';
import { api } from '../services/api';
import { BlurFade } from '../components/ui/BlurFade';
import { BookOpen, Search, ChevronDown } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'All Articles & Engineering Dispatches — Techniccal';
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [catsData, articlesData] = await Promise.all([
          api.getCategories(),
          api.getArticles('ALL'),
        ]);
        setCategories(['All', ...catsData.map((c) => c.name)]);
        setArticles(articlesData);
      } catch (e) {
        console.error('Error fetching blog articles:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
      {/* Header Banner */}
      <section className="mb-10 text-center max-w-3xl mx-auto space-y-3">
        <BlurFade delay={0.05} yOffset={12}>
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#3B719F] uppercase bg-[#E8E7E2] dark:bg-[#252528] px-3 py-1 rounded border border-[#E1E1E1] dark:border-[#2C2C30]">
            TECHNICAL ARCHIVE // DISPATCHES
          </span>
        </BlurFade>

        <BlurFade delay={0.1} yOffset={16}>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-[#1C1C1E] dark:text-[#F6F5F0] tracking-tight">
            ALL DISPATCHES
          </h1>
        </BlurFade>

        <BlurFade delay={0.15} yOffset={16}>
          <p className="text-base text-[#4C586F] dark:text-[#A0A9B8] font-serif">
            A technical archive for builders.
          </p>
        </BlurFade>
      </section>

      {/* Filter and Search Controls */}
      <BlurFade delay={0.28} yOffset={16}>
        <section className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#74747E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search all tech articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-white dark:bg-[#18181B] border border-[#E7E6E1] dark:border-[#27272A] text-[#121214] dark:text-[#FAFAFA] placeholder-[#74747E] focus:outline-none focus:ring-1 focus:ring-[#121214] dark:focus:ring-white transition-all shadow-xs"
            />
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto appearance-none bg-white dark:bg-[#18181B] border border-[#E7E6E1] dark:border-[#27272A] text-[#121214] dark:text-[#FAFAFA] text-xs rounded-xl px-4 py-2.5 pr-9 font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#121214] dark:focus:ring-white shadow-xs"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[#74747E] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </section>
      </BlurFade>

      {/* Articles Grid */}
      <BlurFade delay={0.35} yOffset={20}>
        <ArticleList articles={filteredArticles} isLoading={isLoading} />
      </BlurFade>
    </div>
  );
};

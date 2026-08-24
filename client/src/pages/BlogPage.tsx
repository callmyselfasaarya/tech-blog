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
      <section className="mb-10 text-center max-w-3xl mx-auto space-y-4">
        <BlurFade delay={0.05} yOffset={12}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8E7E2] dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] text-xs font-mono font-medium text-[#4C586F] dark:text-[#A0A9B8]">
            <BookOpen className="w-4 h-4 text-[#3B719F]" />
            <span>/blog</span>
          </div>
        </BlurFade>

        <BlurFade delay={0.12} yOffset={18}>
          <h1 className="font-display font-semibold text-4xl sm:text-6xl text-[#1C1C1E] dark:text-[#F6F5F0] tracking-tight">
            All Engineering Dispatches
          </h1>
        </BlurFade>

        <BlurFade delay={0.2} yOffset={16}>
          <p className="text-base sm:text-lg text-[#4C586F] dark:text-[#A0A9B8] font-sans leading-relaxed">
            Browse our complete archive of software architecture breakdowns, distributed systems essays, and AI benchmarks.
          </p>
        </BlurFade>
      </section>

      {/* Filter and Search Controls */}
      <BlurFade delay={0.28} yOffset={16}>
        <section className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#7E8798] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search all tech articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#7E8798] focus:outline-none focus:ring-1 focus:ring-[#1C1C1E] transition-all"
            />
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto appearance-none bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] text-xs rounded-xl px-4 py-2.5 pr-9 font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#1C1C1E]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[#7E8798] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
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

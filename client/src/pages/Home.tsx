import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import { ArticleList } from '../components/blog/ArticleList';
import { Article } from '../types';
import { api } from '../services/api';
import { TechniccalMonogram } from '../components/ui/TechniccalLogo';
import { BlurFade } from '../components/ui/BlurFade';

export const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'All';

  const [articles, setArticles] = useState<Article[]>(() => api.getArticlesSync('ALL'));
  const [categories, setCategories] = useState<string[]>(() => ['All', ...api.getCategoriesSync().map(c => c.name)]);
  const [searchQuery, setSearchQuery] = useState('');
  const [heroEmail, setHeroEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const [catsData, articlesData] = await Promise.all([
          api.getCategories(),
          api.getArticles('ALL')
        ]);
        if (isMounted) {
          const catNames = ['All', ...catsData.map(c => c.name)];
          setCategories(catNames);
          setArticles(articlesData);
        }
      } catch (e) {
        console.error('Error fetching home data:', e);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setHeroEmail('');
    }
  };

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
      {/* Techniccal Top Hero Section with Blur Fade Animations */}
      <section className="text-center pt-8 pb-14">
        {/* Top Pill Badge */}
        <BlurFade delay={0.05} yOffset={12}>
          <div className="inline-block px-4 py-1 mb-8 rounded-full bg-[#EAE7E2]/90 dark:bg-[#222225] border border-[#E1DDD7] dark:border-[#2C2C30] text-[13px] font-sans font-medium text-[#222120] dark:text-[#A0A9B8] shadow-xs">
            From the desk of Techniccal
          </div>
        </BlurFade>

        {/* Headline with Blur Fade */}
        <BlurFade delay={0.15} yOffset={20}>
          <h1 className="font-display font-thin text-5xl sm:text-7xl lg:text-[76px] text-[#1C1C1E] dark:text-[#F6F5F0] tracking-[-0.04em] leading-[1.05] max-w-4xl mx-auto">
            Ideas and insights for
            <br className="hidden sm:inline" />
            the <span className="font-serif-italic font-normal italic pr-1">modern</span> builder.
          </h1>
        </BlurFade>

        {/* Subscribe Bar with Blur Fade */}
        <BlurFade delay={0.25} yOffset={24}>
          <div className="mt-10 max-w-xl mx-auto">
            {subscribed ? (
              <div className="p-3.5 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs rounded-2xl font-medium">
                Subscribed to Techniccal Weekly Dispatch!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <input
                  type="email"
                  placeholder="Your email"
                  value={heroEmail}
                  onChange={(e) => setHeroEmail(e.target.value)}
                  required
                  className="w-full sm:w-80 px-6 py-3.5 text-sm rounded-2xl bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#9E9A8E] focus:outline-none focus:ring-1 focus:ring-[#1C1C1E] shadow-xs transition-all"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#1C1C1E] dark:bg-white text-white dark:text-[#1C1C1E] font-medium text-sm px-8 py-3.5 rounded-2xl hover:opacity-90 transition-opacity cursor-pointer shrink-0 shadow-xs"
                >
                  Subscribe
                </button>
              </form>
            )}
            <p className="mt-3.5 text-xs text-[#7E8798] dark:text-[#6B7485] font-sans">
              No spam, unsubscribe anytime.
            </p>
          </div>
        </BlurFade>
      </section>

      {/* Filter and Search Bar with Blur Fade */}
      <BlurFade delay={0.35} yOffset={16}>
        <section className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Left: Search input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#7E8798] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tech articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#7E8798] focus:outline-none focus:ring-1 focus:ring-[#1C1C1E] transition-all"
            />
          </div>

          {/* Right: Category Dropdown */}
          <div className="relative w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'All') {
                  searchParams.delete('category');
                  setSearchParams(searchParams);
                } else {
                  setSearchParams({ category: val });
                }
              }}
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

      {/* Article Cards Grid with Blur Fade Cascade */}
      <BlurFade delay={0.45} yOffset={20}>
        <ArticleList articles={filteredArticles} isLoading={isLoading} />
      </BlurFade>
    </div>
  );
};

import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import { ArticleList } from '../components/blog/ArticleList';
import { Article } from '../types';
import { api } from '../services/api';

export const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'All';

  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [searchQuery, setSearchQuery] = useState('');
  const [heroEmail, setHeroEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [catsData, articlesData] = await Promise.all([
          api.getCategories(),
          api.getArticles('ALL')
        ]);
        
        const catNames = ['All', ...catsData.map(c => c.name)];
        setCategories(catNames);
        setArticles(articlesData);
      } catch (e) {
        console.error('Error fetching home data:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto px-4 sm:px-8 py-10"
    >
      {/* Memoir Top Hero Section */}
      <section className="text-center pt-6 pb-12">
        {/* Desk Pill Badge */}
        <div className="inline-block px-3.5 py-1 mb-6 rounded-full bg-[#EDEAE7] dark:bg-[#201E1D] border border-[#E8E4DF] dark:border-[#2C2927] text-xs font-sans font-medium text-[#6E6862] dark:text-[#A8A29A]">
          From the desk of Skylar
        </div>

        {/* Headline with Serif Italic Accent */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-[#1A1918] dark:text-[#F4F2F0] tracking-tight leading-[1.1] max-w-3xl mx-auto">
          Ideas and insights for the{' '}
          <span className="font-serif italic font-medium font-serif-italic">modern</span>{' '}
          creator.
        </h1>

        {/* Subscribe Bar */}
        <div className="mt-8 max-w-md mx-auto">
          {subscribed ? (
            <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs rounded-full font-medium">
              Thanks for subscribing! Check your inbox soon.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex items-center bg-white dark:bg-[#201E1D] p-1.5 rounded-full border border-[#EDEAE7] dark:border-[#2C2927] shadow-sm hover:border-[#1A1918] dark:hover:border-white transition-all">
              <input
                type="email"
                placeholder="Your email"
                value={heroEmail}
                onChange={(e) => setHeroEmail(e.target.value)}
                required
                className="flex-1 px-4 py-2 text-sm bg-transparent outline-none text-[#1A1918] dark:text-[#F4F2F0] placeholder-[#99938B]"
              />
              <button
                type="submit"
                className="bg-[#1A1918] dark:bg-white text-white dark:text-[#1A1918] font-medium text-xs py-2.5 px-6 rounded-full hover:opacity-90 transition-opacity cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="mt-2.5 text-[11px] text-[#99938B] dark:text-[#78736B]">
            No spam, unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Left: Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#99938B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-[#201E1D] border border-[#EDEAE7] dark:border-[#2C2927] text-[#1A1918] dark:text-[#F4F2F0] placeholder-[#99938B] focus:outline-none focus:ring-1 focus:ring-[#1A1918] dark:focus:ring-white transition-all"
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
            className="w-full sm:w-auto appearance-none bg-white dark:bg-[#201E1D] border border-[#EDEAE7] dark:border-[#2C2927] text-[#1A1918] dark:text-[#F4F2F0] text-xs rounded-xl px-4 py-2 pr-9 font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#1A1918]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-[#99938B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </section>

      {/* Article Cards Grid */}
      <ArticleList articles={filteredArticles} isLoading={isLoading} />
    </motion.div>
  );
};

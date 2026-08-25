import React, { useEffect, useState, useMemo, lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Sparkles, Send } from 'lucide-react';
import { Article } from '../types';
import { api } from '../services/api';
import { BlurFade } from '../components/ui/BlurFade';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';

const ArticleList = lazy(() => import('../components/blog/ArticleList').then((m) => ({ default: m.ArticleList })));

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

  const handleCategoryChange = (val: string) => {
    if (val === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: val });
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
      {/* Hero Section */}
      <section className="text-center pt-8 pb-12">
        <BlurFade delay={0} yOffset={6}>
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="pinned" className="px-3 py-1 text-xs font-sans font-medium rounded-full">
              <Sparkles className="w-3 h-3 mr-1 text-[#3B719F]" />
              From the desk of Techniccal
            </Badge>
          </div>
        </BlurFade>

        <BlurFade delay={0.02} yOffset={8}>
          <h1 className="font-display font-thin text-5xl sm:text-7xl lg:text-[76px] text-[#1C1C1E] dark:text-[#F6F5F0] tracking-[-0.04em] leading-[1.05] max-w-4xl mx-auto">
            Ideas and insights for
            <br className="hidden sm:inline" />
            the <span className="font-serif-italic font-normal italic pr-1">modern</span> builder.
          </h1>
        </BlurFade>

        <BlurFade delay={0.04} yOffset={10}>
          <div className="mt-8 max-w-lg mx-auto">
            {subscribed ? (
              <div className="p-3.5 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs rounded-2xl font-medium">
                Subscribed to Techniccal Weekly Dispatch!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={heroEmail}
                  onChange={(e) => setHeroEmail(e.target.value)}
                  required
                  className="w-full sm:w-80 px-4 py-2.5 text-xs rounded-xl bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#7E8798] focus:outline-none focus:ring-1 focus:ring-[#1C1C1E] shadow-xs transition-all"
                />
                <Button type="submit" size="default" className="w-full sm:w-auto">
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </Button>
              </form>
            )}
            <p className="mt-3 text-[11px] text-[#7E8798] dark:text-[#6B7485] font-sans">
              No spam. Curated engineering dispatches delivered weekly.
            </p>
          </div>
        </BlurFade>
      </section>

      {/* Interactive Category Filter & Search Bar */}
      <BlurFade delay={0.06} yOffset={10}>
        <section className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Left: Category Tabs */}
          <div className="overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <Tabs value={selectedCategory} onValueChange={handleCategoryChange}>
              <TabsList className="bg-[#E8E7E2]/70 dark:bg-[#222225] p-1 rounded-xl">
                {categories.map((cat) => (
                  <TabsTrigger key={cat} value={cat} className="text-xs px-3.5 py-1.5 rounded-lg">
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Right: Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-[#7E8798] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search tech articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#7E8798] focus:outline-none focus:ring-1 focus:ring-[#1C1C1E] transition-all"
            />
          </div>
        </section>
      </BlurFade>

      {/* Article Cards Grid */}
      <BlurFade delay={0.08} yOffset={10}>
        <Suspense fallback={<div className="min-h-[300px]" />}>
          <ArticleList articles={filteredArticles} isLoading={isLoading} />
        </Suspense>
      </BlurFade>
    </div>
  );
};

import React, { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Sparkles, Send, ArrowRight, ArrowUpRight, Clock, BookOpen, Terminal, Cpu, Briefcase, Code, Wrench } from 'lucide-react';
import { Article } from '../types';
import { api } from '../services/api';
import { BlurFade } from '../components/ui/BlurFade';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { EngineeringVisualization } from '../components/technical/EngineeringVisualization';
import { ArticleCard } from '../components/articles/ArticleCard';

export const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'All';

  const [articles, setArticles] = useState<Article[]>(() => api.getArticlesSync('ALL'));
  const [searchQuery, setSearchQuery] = useState('');
  const [heroEmail, setHeroEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const articlesData = await api.getArticles('ALL');
        if (isMounted) {
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

  const featuredArticles = useMemo(() => {
    return articles.filter((a) => a.featured || a.pinned);
  }, [articles]);

  const dominantFeatured = featuredArticles[0] || articles[0];
  const secondaryFeatured = featuredArticles.slice(1, 3);

  const categoryExplorerItems = [
    { name: 'AI', label: 'AI / INTELLIGENCE SYSTEMS', icon: Cpu, desc: 'Machine learning, LLM inference engines, vector retrieval, and agentic systems.', path: '/ai' },
    { name: 'PROGRAMMING', label: 'PROGRAMMING / SYSTEMS & SOFTWARE', icon: Terminal, desc: 'High-throughput systems, Go concurrency, Rust safety, and distributed databases.', path: '/programming' },
    { name: 'CAREER', label: 'CAREER / ENGINEERING LEADERSHIP', icon: Briefcase, desc: 'Software engineering career growth, interview prep, and technical culture.', path: '/career' },
    { name: 'PROJECTS', label: 'PROJECTS / BLUEPRINTS', icon: Code, desc: 'Hands-on project tutorials, open-source codebase walkthroughs, and architecture specs.', path: '/projects' },
    { name: 'TOOLS', label: 'TOOLS / DEVELOPER STACK', icon: Wrench, desc: 'Compilers, inference servers, databases, and engineering workflows.', path: '/tools' },
  ];

  const latestDispatches = useMemo(() => {
    return articles.filter((art) => {
      const matchesSearch =
        searchQuery === '' ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [articles, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-sans">
      {/* 9. HERO SECTION */}
      <section className="pt-4 pb-16 border-b border-[#E1E1E1] dark:border-[#2C2C30] mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <BlurFade delay={0} yOffset={6}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 text-[11px] font-mono font-bold tracking-widest text-[#3B719F] bg-[#E8E7E2] dark:bg-[#252528] rounded border border-[#E1E1E1] dark:border-[#2C2C30] uppercase">
                  TECHNICAL JOURNAL / 2026
                </span>
                <span className="text-xs font-mono text-[#4C586F] dark:text-[#A0A9B8]">
                  SYSTEM 01 • READ / BUILD / UNDERSTAND
                </span>
              </div>
            </BlurFade>

            <BlurFade delay={0.02} yOffset={8}>
              <h1 className="font-display font-medium text-4xl sm:text-6xl lg:text-[64px] text-[#1C1C1E] dark:text-[#F6F5F0] tracking-tight leading-[1.08]">
                Engineering ideas for people who build the future.
              </h1>
            </BlurFade>

            <BlurFade delay={0.04} yOffset={10}>
              <p className="text-base sm:text-lg text-[#4C586F] dark:text-[#A0A9B8] font-sans leading-relaxed max-w-2xl">
                Deep technical writing covering software architecture, AI, engineering systems, projects, tools, and technology careers.
              </p>
            </BlurFade>

            <BlurFade delay={0.06} yOffset={10}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/blog">
                  <Button size="lg" className="bg-[#1C1C1E] text-white dark:bg-[#F6F5F0] dark:text-[#1C1C1E] font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded">
                    EXPLORE DISPATCHES <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/newsletter">
                  <Button variant="outline" size="lg" className="border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded">
                    JOIN THE NEWSLETTER
                  </Button>
                </Link>
              </div>
            </BlurFade>

            {/* Micro Details Ticker */}
            <div className="pt-4 flex items-center gap-4 text-[10px] font-mono text-[#4C586F] dark:text-[#A0A9B8] border-t border-[#E1E1E1]/60 dark:border-[#2C2C30]/60">
              <span>ARCHITECTURE / AI / SOFTWARE</span>
              <span>•</span>
              <span>HIGH-SIGNAL CONTENT</span>
              <span>•</span>
              <span>WEEKLY DISPATCHES</span>
            </div>
          </div>

          {/* Right Column Animated Engineering Visualization */}
          <div className="lg:col-span-5">
            <BlurFade delay={0.08} yOffset={12}>
              <EngineeringVisualization />
            </BlurFade>
          </div>
        </div>
      </section>

      {/* 11. FEATURED DISPATCHES */}
      <section className="mb-16">
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#E1E1E1] dark:border-[#2C2C30]">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#3B719F] uppercase">HIGH-SIGNAL ENGINEERING</span>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl text-[#1C1C1E] dark:text-[#F6F5F0]">FEATURED DISPATCHES</h2>
          </div>
          <Link to="/blog" className="text-xs font-mono text-[#3B719F] hover:underline font-semibold flex items-center gap-1">
            VIEW ALL <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {dominantFeatured && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Dominant Feature Card (~65% width) */}
            <div className="lg:col-span-7">
              <ArticleCard article={dominantFeatured} variant="featured" />
            </div>

            {/* Secondary Feature Cards (Remaining Width) */}
            <div className="lg:col-span-5 space-y-4">
              {secondaryFeatured.map((art) => (
                <ArticleCard key={art.id} article={art} variant="horizontal" />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 12. CATEGORY EXPLORER */}
      <section className="mb-16">
        <div className="pb-4 mb-8 border-b border-[#E1E1E1] dark:border-[#2C2C30]">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#3B719F] uppercase">EXPLORE SECTIONS</span>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl text-[#1C1C1E] dark:text-[#F6F5F0]">KNOWLEDGE CATEGORIES</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categoryExplorerItems.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <BlurFade key={cat.name} delay={0.03 * idx}>
                <Link
                  to={cat.path}
                  className="group block p-5 rounded-lg border border-[#E1E1E1] dark:border-[#2C2C30] bg-white dark:bg-[#222225] hover:border-[#3B719F] hover:shadow-sm transition-all h-full flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded bg-[#F6F5F0] dark:bg-[#1C1C1E] flex items-center justify-center text-[#3B719F]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-mono text-[#4C586F] dark:text-[#A0A9B8] font-bold tracking-wider uppercase block">{cat.label}</span>
                    <h3 className="font-display font-bold text-lg text-[#1C1C1E] dark:text-[#F6F5F0] group-hover:text-[#3B719F] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#4C586F] dark:text-[#A0A9B8] leading-relaxed font-sans line-clamp-3">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 flex items-center justify-between text-xs font-mono text-[#3B719F] group-hover:translate-x-1 transition-transform">
                    <span>EXPLORE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </BlurFade>
            );
          })}
        </div>
      </section>

      {/* 13. LATEST ARTICLES INDEX */}
      <section className="mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-8 border-b border-[#E1E1E1] dark:border-[#2C2C30] gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#3B719F] uppercase">CHRONOLOGICAL INDEX</span>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl text-[#1C1C1E] dark:text-[#F6F5F0]">LATEST DISPATCHES</h2>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#4C586F] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search dispatches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-4 py-2 text-xs font-mono rounded bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#7E8798] focus:outline-none focus:ring-1 focus:ring-[#3B719F]"
            />
          </div>
        </div>

        {/* Index Rows List */}
        <div className="divide-y divide-[#E1E1E1] dark:divide-[#2C2C30]">
          {latestDispatches.map((article, idx) => (
            <BlurFade key={article.id} delay={0.02 * idx}>
              <Link
                to={`/article/${article.slug}`}
                className="group flex flex-col md:flex-row md:items-center justify-between py-4 px-2 hover:bg-white dark:hover:bg-[#222225] rounded transition-all border-l-2 border-transparent hover:border-[#3B719F] gap-4"
              >
                {/* Left: Category + Publication Date */}
                <div className="md:w-48 shrink-0 space-y-0.5">
                  <span className="text-[10px] font-mono font-bold text-[#3B719F] uppercase tracking-wider block">{article.category}</span>
                  <span className="text-xs font-mono text-[#4C586F] dark:text-[#A0A9B8]">{article.publishedAt}</span>
                </div>

                {/* Center: Title & Excerpt */}
                <div className="flex-1 space-y-1">
                  <h3 className="font-display font-semibold text-base sm:text-lg text-[#1C1C1E] dark:text-[#F6F5F0] group-hover:text-[#3B719F] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-xs text-[#4C586F] dark:text-[#A0A9B8] font-sans line-clamp-1">
                      {article.excerpt}
                    </p>
                  )}
                </div>

                {/* Right: Reading time + Arrow */}
                <div className="md:w-32 shrink-0 flex items-center justify-end gap-2 text-xs font-mono text-[#4C586F] dark:text-[#A0A9B8]">
                  <span>{article.readingTime ? `${article.readingTime} read` : '5 min read'}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#3B719F] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>
      </section>
    </div>
  );
};


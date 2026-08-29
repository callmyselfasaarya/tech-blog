import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Article } from '../types';
import { api } from '../services/api';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const articlesData = await api.getArticles('ALL');
        if (isMounted && articlesData.length > 0) {
          setArticles(articlesData);
        }
      } catch (e) {
        console.error('Error fetching home articles:', e);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    try {
      await api.subscribeNewsletter(email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 6000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Featured Articles (3 large editorial cards)
  const featuredArticles = useMemo(() => {
    const feat = articles.filter((a) => a.featured);
    return feat.length >= 3 ? feat.slice(0, 3) : articles.slice(0, 3);
  }, [articles]);

  // Latest Posts (Chronological List 01 to 06)
  const latestPosts = useMemo(() => {
    return [...articles]
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt).getTime() || 0;
        const dateB = new Date(b.publishedAt).getTime() || 0;
        return dateB - dateA;
      })
      .slice(0, 6);
  }, [articles]);

  const socialLinks = [
    { label: 'GitHub', url: 'https://github.com/callmyselfasaarya/tech-blog' },
    { label: 'LinkedIn', url: 'https://linkedin.com' },
    { label: 'X (Twitter)', url: 'https://x.com' },
    { label: 'Email', url: 'mailto:hello@example.com' },
  ];

  const beyondBlogLinks = [
    { title: 'Portfolio', desc: 'Case studies, architecture blueprints, and design systems.', path: '/projects', external: false },
    { title: 'Projects', desc: 'Open-source software, developer tools, and Go/Rust repositories.', path: '/tools', external: false },
    { title: 'Experiments', desc: 'Neural retrieval, vector indexing, and AI agent sandboxes.', path: '/ai', external: false },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 font-sans space-y-24">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="pt-4 pb-12 border-b border-[#E1E1E1] dark:border-[#2C2C30]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 max-w-3xl"
        >
          <div className="space-y-4 text-base sm:text-lg text-[#4C586F] dark:text-[#A0A9B8] font-sans leading-relaxed">
            <p>
              I'm a software engineer and curious builder exploring technology, artificial intelligence, systems and the ideas that shape the future of software.
            </p>
            <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#8E8E93]">
              Here I share technical essays, experiments, notes and random sparks of inspiration.
            </p>
          </div>

          {/* Social Text Links */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1C1C1E] dark:text-[#F6F5F0] hover:text-[#3B719F] dark:hover:text-[#5B9AD5] transition-colors font-medium underline underline-offset-4 decoration-[#E1E1E1] dark:decoration-[#3E3E44] hover:decoration-[#3B719F]"
              >
                {item.label} ↗
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FEATURED POSTS SECTION */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="pb-3 border-b border-[#E1E1E1] dark:border-[#2C2C30] flex items-center justify-between">
          <span className="text-xs font-mono font-bold tracking-widest text-[#3B719F] dark:text-[#5B9AD5] uppercase">
            FEATURED POSTS
          </span>
          <Link
            to="/posts"
            className="text-xs font-mono text-[#6E6E73] dark:text-[#98989F] hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors flex items-center gap-1"
          >
            All Posts <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                to={`/article/${article.slug}`}
                className="group block h-full p-6 rounded-xl border border-[#E1E1E1] dark:border-[#2C2C30] bg-[#FBFBFA] dark:bg-[#121214] hover:border-[#1C1C1E]/40 dark:hover:border-[#F6F5F0]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {article.coverImage && (
                    <div className="overflow-hidden rounded-lg aspect-[16/9] bg-[#E8E7E2] dark:bg-[#202024]">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#6E6E73] dark:text-[#98989F]">
                      <span className="uppercase tracking-wider font-semibold text-[#3B719F] dark:text-[#5B9AD5]">
                        {article.category}
                      </span>
                      <span>{article.readingTime}</span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl text-[#1C1C1E] dark:text-[#F6F5F0] group-hover:translate-x-1 transition-transform duration-300 leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#4C586F] dark:text-[#A0A9B8] font-sans leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E1E1E1]/60 dark:border-[#2C2C30]/60 flex items-center justify-between text-xs font-mono text-[#6E6E73] dark:text-[#98989F] group-hover:text-[#1C1C1E] dark:group-hover:text-[#F6F5F0]">
                  <span>{article.publishedAt}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 text-[#3B719F] dark:text-[#5B9AD5]" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. LATEST POSTS SECTION */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="pb-3 border-b border-[#E1E1E1] dark:border-[#2C2C30] flex items-center justify-between">
          <span className="text-xs font-mono font-bold tracking-widest text-[#3B719F] dark:text-[#5B9AD5] uppercase">
            NEW POSTS
          </span>
        </div>

        <div className="divide-y divide-[#E1E1E1] dark:divide-[#2C2C30]">
          {latestPosts.map((art, idx) => {
            const numStr = (idx + 1).toString().padStart(2, '0');
            return (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Link
                  to={`/article/${art.slug}`}
                  className="group py-5 px-3 -mx-3 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-[#E8E7E2]/40 dark:hover:bg-[#18181C] rounded-lg transition-all duration-200 gap-3"
                >
                  <div className="flex items-start sm:items-center gap-4 min-w-0">
                    <span className="text-xs font-mono text-[#6E6E73] dark:text-[#8E8E93] shrink-0 font-bold">
                      {numStr}
                    </span>

                    <div className="space-y-1 min-w-0">
                      <h3 className="font-serif text-lg sm:text-xl text-[#1C1C1E] dark:text-[#F6F5F0] group-hover:translate-x-1 transition-transform duration-200 truncate">
                        {art.title}
                      </h3>
                      {art.excerpt && (
                        <p className="text-xs text-[#4C586F] dark:text-[#A0A9B8] font-sans line-clamp-1">
                          {art.excerpt}
                        </p>
                      )}
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
          })}
        </div>

        <div className="pt-4 text-right">
          <Link
            to="/posts"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#1C1C1E] dark:text-[#F6F5F0] hover:text-[#3B719F] dark:hover:text-[#5B9AD5] transition-colors"
          >
            <span>View all posts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. NEWSLETTER SECTION */}
      {/* ========================================================================= */}
      <section className="py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-12 rounded-2xl border border-[#E1E1E1] dark:border-[#2C2C30] bg-[#FAF9F5] dark:bg-[#121214] space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#3B719F] dark:text-[#5B9AD5] uppercase">
              NOTES IN YOUR INBOX
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8E7E2] dark:bg-[#202024] text-[11px] font-mono text-[#1C1C1E] dark:text-[#F6F5F0] font-semibold w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              300+ readers
            </span>
          </div>

          <div className="space-y-2 max-w-xl">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1C1E] dark:text-[#F6F5F0]">
              Notes in your inbox
            </h2>
            <p className="text-sm sm:text-base text-[#4C586F] dark:text-[#A0A9B8] leading-relaxed font-sans">
              Thoughts on technology, engineering, AI and whatever I'm currently exploring.
            </p>
          </div>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-mono flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>You're on the list! Thank you for subscribing.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3 max-w-lg">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:flex-1 px-4 py-3 text-xs font-mono rounded-xl bg-white dark:bg-[#1A1A1E] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-[#3B719F]"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-mono font-bold tracking-wider uppercase text-white bg-[#1C1C1E] dark:bg-[#F6F5F0] dark:text-[#1C1C1E] rounded-xl hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              <p className="text-[11px] font-mono text-[#6E6E73] dark:text-[#8E8E93]">
                No spam. Just occasional essays and notes.
              </p>
            </form>
          )}
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 5. BEYOND THE BLOG SECTION */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="pb-3 border-b border-[#E1E1E1] dark:border-[#2C2C30] space-y-1">
          <span className="text-xs font-mono font-bold tracking-widest text-[#3B719F] dark:text-[#5B9AD5] uppercase block">
            BEYOND THE BLOG
          </span>
          <p className="text-sm text-[#4C586F] dark:text-[#A0A9B8] font-sans">
            There's more than writing. Explore the things I'm building, researching and experimenting with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {beyondBlogLinks.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                to={item.path}
                className="group block p-6 rounded-xl border border-[#E1E1E1] dark:border-[#2C2C30] bg-[#FBFBFA] dark:bg-[#121214] hover:border-[#3B719F] dark:hover:border-[#5B9AD5] transition-all duration-300 h-full flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between font-serif text-2xl text-[#1C1C1E] dark:text-[#F6F5F0] group-hover:translate-x-1 transition-transform duration-300 mb-2">
                    <span>{item.title}</span>
                    <ArrowRight className="w-4 h-4 text-[#3B719F] dark:text-[#5B9AD5] group-hover:translate-x-1.5 transition-transform" />
                  </div>
                  <p className="text-xs text-[#4C586F] dark:text-[#A0A9B8] font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

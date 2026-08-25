import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Share2,
  Check,
  ArrowUpRight,
  ChevronLeft,
  Calendar,
  Clock,
  RefreshCw,
  Copy,
  Mail,
  Github,
  Twitter,
  Linkedin,
  UserCheck
} from 'lucide-react';
import { Article } from '../types';
import { api } from '../services/api';
import { ReadingProgress } from '../components/blog/ReadingProgress';
import { TableOfContents } from '../components/blog/TableOfContents';
import { ArticleComments } from '../components/blog/ArticleComments';
import { Skeleton } from '../components/ui/Skeleton';
import { BlurFade } from '../components/ui/BlurFade';
import { Avatar } from '../components/ui/avatar';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent } from '../components/ui/card';
import { Tooltip } from '../components/ui/tooltip';

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [ctaSubscribed, setCtaSubscribed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchArticle = async () => {
      if (!slug) return;
      setIsLoading(true);
      try {
        const found = await api.getArticleBySlug(slug);
        if (found) {
          setArticle(found);
          const all = await api.getArticles('ALL');
          setRelated(
            all.filter((a) => a.id !== found.id && a.category === found.category).slice(0, 3)
          );
          document.title = found.seo?.title || `${found.title} — Techniccal`;
        } else {
          setArticle(null);
        }
      } catch (e) {
        console.error('Error loading article:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCtaSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setCtaSubscribed(true);
      setTimeout(() => setCtaSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <Skeleton className="h-6 w-24 rounded-full mx-auto" />
        <Skeleton className="h-14 w-full rounded-2xl" />
        <Skeleton className="h-6 w-2/3 mx-auto rounded-xl" />
        <Skeleton className="h-80 w-full rounded-3xl" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h2 className="font-display font-bold text-2xl mb-3 text-[#1C1C1E] dark:text-[#F6F5F0]">
          Article Not Found
        </h2>
        <p className="text-xs text-[#7E8798] mb-6">
          The essay you are looking for may have been renamed or moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full bg-[#1C1C1E] text-white dark:bg-white dark:text-[#1C1C1E]"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <ReadingProgress />

      <article className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
        {/* Memoir Top Action Bar */}
        <BlurFade delay={0.05} yOffset={12}>
          <div className="flex items-center justify-between gap-4 mb-8">
            {/* Back Pill */}
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1C1C1E] dark:text-[#F6F5F0] bg-[#E8E7E2] dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] hover:opacity-80 px-3.5 py-1.5 rounded-full transition-opacity cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Back
            </button>

            {/* Center Category & Read time Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8E7E2] dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] text-xs font-mono text-[#4C586F] dark:text-[#A0A9B8]">
              <span>{article.category}</span>
              <span>•</span>
              <span>{article.readingTime || '4 min read'}</span>
            </div>

            {/* Share Button Bar */}
            <div className="flex items-center gap-2">
              <ShareButtons title={article.title} onCopy={handleShare} copied={copied} />
            </div>
          </div>
        </BlurFade>

        {/* 1. Article Title Header & Metadata */}
        <BlurFade delay={0.15} yOffset={20}>
          <header className="max-w-3xl mx-auto text-center mb-8">
            {/* 1. Title */}
            <h1 className="font-display font-semibold text-3xl sm:text-5xl text-[#1C1C1E] dark:text-[#F6F5F0] leading-[1.12] tracking-tight mb-5">
              {article.title}
            </h1>

            {/* 6. Introduction Excerpt */}
            <p className="text-base sm:text-lg text-[#4C586F] dark:text-[#A0A9B8] font-sans leading-relaxed max-w-2xl mx-auto mb-6">
              {article.excerpt}
            </p>

            {/* 2, 3, 4. Author, Published Date & Updated Date Metadata Bar */}
            <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-5 px-5 py-2.5 rounded-2xl bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] text-xs text-[#7E8798] dark:text-[#A0A9B8]">
              {/* Author Info */}
              <div className="flex items-center gap-2">
                <Avatar
                  src={article.author.avatar}
                  alt={article.author.name}
                  size="sm"
                />
                <span className="font-semibold text-[#1C1C1E] dark:text-[#F6F5F0]">
                  {article.author.name}
                </span>
              </div>

              <span>•</span>

              {/* Published Date */}
              <div className="flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>Published {article.publishedAt}</span>
              </div>

              <span>•</span>

              {/* Updated Date */}
              <div className="flex items-center gap-1 font-mono text-[#4C586F] dark:text-[#A0A9B8]">
                <RefreshCw className="w-3 h-3 text-[#3B719F]" />
                <span>Updated {article.updatedAt || article.publishedAt}</span>
              </div>
            </div>
          </header>
        </BlurFade>

        {/* 5. Featured Hero Cover Image */}
        {article.coverImage && (
          <BlurFade delay={0.25} yOffset={24}>
            <div className="max-w-4xl mx-auto mb-12 space-y-2">
              <div className="rounded-3xl overflow-hidden border border-[#E1E1E1] dark:border-[#2C2C30] bg-[#E8E7E2] dark:bg-[#222225] aspect-[16/9] shadow-sm">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center text-[11px] font-mono text-[#7E8798]">
                Figure 1.0 — Architecture diagram and runtime flow for {article.title}
              </p>
            </div>
          </BlurFade>
        )}

        {/* Main Content Layout Container */}
        <div className="flex flex-col xl:flex-row items-start justify-center gap-12 max-w-6xl mx-auto">
          {/* 7. Table of Contents (Mobile Collapsible) */}
          <div className="w-full max-w-[720px] mx-auto space-y-12 flex-1">
            <BlurFade delay={0.3} yOffset={16}>
              <TableOfContents content={article.content} />
            </BlurFade>

            {/* 8, 9, 10. Main Content Body + Code Examples + Diagrams */}
            <BlurFade delay={0.35} yOffset={20}>
              <div className="prose-editorial font-sans text-base sm:text-lg leading-relaxed text-[#1C1C1E] dark:text-[#F6F5F0]">
                <ArticleContentRenderer content={article.content} />
              </div>
            </BlurFade>

            {/* 15. Bottom Share Bar */}
            <BlurFade delay={0.38} yOffset={16}>
              <div className="p-4 rounded-2xl bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] flex flex-wrap items-center justify-between gap-4 shadow-xs">
                <span className="text-xs font-mono text-[#7E8798]">Share this article</span>
                <ShareButtons title={article.title} onCopy={handleShare} copied={copied} />
              </div>
            </BlurFade>

            {/* 12. Newsletter CTA Box */}
            <BlurFade delay={0.4} yOffset={20}>
              <div className="p-8 sm:p-10 rounded-3xl bg-[#E8E7E2]/60 dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] text-center space-y-4 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#141416] flex items-center justify-center mx-auto text-[#1C1C1E] dark:text-white">
                  <Mail className="w-5 h-5 text-[#3B719F]" />
                </div>
                <h3 className="font-display font-semibold text-xl text-[#1C1C1E] dark:text-[#F6F5F0]">
                  Enjoyed this technical dispatch?
                </h3>
                <p className="text-xs sm:text-sm text-[#4C586F] dark:text-[#A0A9B8] max-w-md mx-auto">
                  Get our weekly software architecture breakdowns and system benchmarks delivered straight to your inbox.
                </p>

                {ctaSubscribed ? (
                  <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs rounded-2xl font-medium max-w-md mx-auto">
                    Subscribed! Welcome to Techniccal Dispatch.
                  </div>
                ) : (
                  <form onSubmit={handleCtaSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Your work email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-white dark:bg-[#141416] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#7E8798] focus:outline-none focus:ring-1 focus:ring-[#1C1C1E]"
                    />
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold rounded-xl bg-[#1C1C1E] dark:bg-white text-white dark:text-[#1C1C1E] hover:opacity-90 transition-opacity cursor-pointer shrink-0"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </BlurFade>

            {/* 13. Author Information Box */}
            <BlurFade delay={0.45} yOffset={20}>
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-[#E1E1E1] dark:border-[#2C2C30]"
                />
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-semibold text-base text-[#1C1C1E] dark:text-[#F6F5F0]">
                      Written by {article.author.name}
                    </h4>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#E8E7E2] dark:bg-[#141416] text-[#3B719F]">
                      {article.author.role || 'Staff Architect'}
                    </span>
                  </div>
                  <p className="text-xs text-[#4C586F] dark:text-[#A0A9B8] leading-relaxed">
                    {article.author.bio}
                  </p>
                  <div className="flex items-center gap-3 pt-1 text-xs text-[#7E8798]">
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#1C1C1E] dark:hover:text-white transition-colors flex items-center gap-1">
                      <Twitter className="w-3.5 h-3.5" /> Twitter
                    </a>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#1C1C1E] dark:hover:text-white transition-colors flex items-center gap-1">
                      <Github className="w-3.5 h-3.5" /> GitHub
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#1C1C1E] dark:hover:text-white transition-colors flex items-center gap-1">
                      <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </BlurFade>

            {/* 14. Comments/Discussion Section */}
            <ArticleComments articleId={article.id} articleTitle={article.title} />

            {/* 11. Related Articles */}
            {related.length > 0 && (
              <BlurFade delay={0.5} yOffset={20}>
                <section className="mt-16 pt-10 border-t border-[#E1E1E1] dark:border-[#2C2C30]">
                  <h3 className="text-xs font-mono tracking-widest text-[#7E8798] dark:text-[#A0A9B8] uppercase mb-6">
                    MORE FROM {article.category.toUpperCase()}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {related.map((rel) => (
                      <Link
                        key={rel.id}
                        to={`/article/${rel.slug}`}
                        className="p-4 rounded-2xl bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] hover:shadow-md transition-all group flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-display font-semibold text-xs sm:text-sm text-[#1C1C1E] dark:text-[#F6F5F0] group-hover:text-[#3B719F] line-clamp-2">
                            {rel.title}
                          </h4>
                          <div className="w-5 h-5 rounded-md bg-[#F4F2EE] dark:bg-[#2C2C30] flex items-center justify-center shrink-0">
                            <ArrowUpRight className="w-3 h-3 text-[#7E8798]" />
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-[#7E8798] mt-3">
                          {rel.readingTime || '4 min'}
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              </BlurFade>
            )}
          </div>
        </div>
      </article>
    </>
  );
};

/* 15. Social Share Buttons Component */
const ShareButtons: React.FC<{ title: string; onCopy: () => void; copied: boolean }> = ({ title, onCopy, copied }) => {
  const currentUrl = encodeURIComponent(window.location.href);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={onCopy}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1C1C1E] dark:text-[#F6F5F0] bg-[#E8E7E2] dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] hover:opacity-80 px-3 py-1.5 rounded-full transition-opacity cursor-pointer shadow-xs"
        title="Copy Link"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </button>

      <a
        href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noreferrer"
        className="p-1.5 text-xs font-medium text-[#1C1C1E] dark:text-[#F6F5F0] bg-[#E8E7E2] dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] hover:opacity-80 rounded-full transition-opacity cursor-pointer shadow-xs"
        title="Share on X / Twitter"
      >
        <Twitter className="w-3.5 h-3.5" />
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
        target="_blank"
        rel="noreferrer"
        className="p-1.5 text-xs font-medium text-[#1C1C1E] dark:text-[#F6F5F0] bg-[#E8E7E2] dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] hover:opacity-80 rounded-full transition-opacity cursor-pointer shadow-xs"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};

/* Helper component to parse markdown content into styled HTML elements with Copy Code buttons & diagrams */
const ArticleContentRenderer: React.FC<{ content: string }> = ({ content }) => {
  const paragraphs = content.split('\n\n').filter(Boolean);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copyCode = (codeText: string, idx: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6">
      {paragraphs.map((p, idx) => {
        const trimmed = p.trim();

        if (trimmed.startsWith('## ')) {
          return (
            <h2
              key={idx}
              id={trimmed.replace('## ', '').toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}
              className="font-display font-semibold text-2xl sm:text-3xl text-[#1C1C1E] dark:text-[#F6F5F0] mt-10 mb-4 tracking-tight"
            >
              {trimmed.replace('## ', '')}
            </h2>
          );
        }

        if (trimmed.startsWith('### ')) {
          return (
            <h3
              key={idx}
              id={trimmed.replace('### ', '').toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}
              className="font-display font-semibold text-xl text-[#1C1C1E] dark:text-[#F6F5F0] mt-8 mb-3"
            >
              {trimmed.replace('### ', '')}
            </h3>
          );
        }

        if (trimmed.startsWith('> ')) {
          return (
            <blockquote
              key={idx}
              className="border-l-3 border-[#1C1C1E] dark:border-white pl-5 py-2 my-6 font-serif-italic italic text-xl text-[#4C586F] dark:text-[#A0A9B8]"
            >
              {trimmed.replace('> ', '')}
            </blockquote>
          );
        }

        {/* 10. Images / Diagrams Rendering */}
        if (trimmed.startsWith('![') && trimmed.includes('](')) {
          const match = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
          if (match) {
            const alt = match[1];
            const src = match[2];
            return (
              <figure key={idx} className="my-8 text-center space-y-2">
                <div className="rounded-2xl overflow-hidden border border-[#E1E1E1] dark:border-[#2C2C30] bg-[#E8E7E2] dark:bg-[#222225] shadow-sm">
                  <img src={src} alt={alt} className="w-full h-auto object-cover max-h-[460px]" />
                </div>
                {alt && (
                  <figcaption className="text-xs font-mono text-[#7E8798]">
                    Figure — {alt}
                  </figcaption>
                )}
              </figure>
            );
          }
        }

        {/* 9. Code Examples Block with Interactive Copy Code Button */}
        if (trimmed.startsWith('```')) {
          const lines = trimmed.split('\n');
          const langMatch = lines[0].replace('```', '').trim() || 'typescript';
          const codeText = lines.slice(1, -1).join('\n');

          return (
            <div key={idx} className="my-6 rounded-2xl overflow-hidden border border-[#E1E1E1] dark:border-[#2C2C30] bg-[#1C1C1E] text-[#F6F5F0] shadow-sm">
              <div className="flex items-center justify-between px-4 py-2 bg-[#252528] border-b border-[#2C2C30] text-xs font-mono text-[#A0A9B8]">
                <span>{langMatch}</span>
                <button
                  onClick={() => copyCode(codeText, idx)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#323236] hover:bg-[#3E3E44] text-white transition-colors cursor-pointer"
                >
                  {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIdx === idx ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed">
                <code>{codeText}</code>
              </pre>
            </div>
          );
        }

        {/* Unordered Lists */}
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const items = trimmed.split('\n').map((l) => l.replace(/^[-*]\s+/, ''));
          return (
            <ul key={idx} className="my-4 space-y-2 pl-6 list-disc text-[#1C1C1E] dark:text-[#F6F5F0]">
              {items.map((item, i) => (
                <li key={i} className="text-base sm:text-lg leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={idx} className="text-[#1C1C1E] dark:text-[#F6F5F0] leading-relaxed">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
};

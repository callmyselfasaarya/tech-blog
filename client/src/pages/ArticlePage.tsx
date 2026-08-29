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
import { CodeBlock } from '../components/technical/CodeBlock';
import { Diagram } from '../components/technical/Diagram';
import { ArticleCard } from '../components/articles/ArticleCard';
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
        <div className="font-mono text-xs text-[#3B719F] uppercase tracking-widest mb-2">404 / SIGNAL LOST</div>
        <h2 className="font-display font-bold text-3xl mb-3 text-[#1C1C1E] dark:text-[#F6F5F0]">
          The requested dispatch could not be located.
        </h2>
        <p className="text-xs text-[#4C586F] dark:text-[#A0A9B8] mb-6 font-mono">
          SYSTEM_ERROR: ARTICLE_NOT_FOUND // ERR_404
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold px-5 py-2.5 rounded bg-[#1C1C1E] text-white dark:bg-[#F6F5F0] dark:text-[#1C1C1E] uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> RETURN TO INDEX
        </Link>
      </div>
    );
  }

  return (
    <>
      <ReadingProgress />

      <article className="max-w-7xl mx-auto px-4 sm:px-8 py-8 font-sans">
        {/* Memoir Top Action Bar */}
        <BlurFade delay={0.05} yOffset={12}>
          <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E1E1E1] dark:border-[#2C2C30]">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#1C1C1E] dark:text-[#F6F5F0] bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] hover:border-[#3B719F] px-3.5 py-1.5 rounded transition-all cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> INDEX
            </button>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] text-xs font-mono text-[#4C586F] dark:text-[#A0A9B8]">
              <span className="text-[#3B719F] font-bold uppercase">{article.category}</span>
              <span>•</span>
              <span>{article.readingTime ? `${article.readingTime} read` : '12 MIN READ'}</span>
            </div>
          </div>
        </BlurFade>

        {/* 16. ARTICLE HEADER */}
        <BlurFade delay={0.15} yOffset={20}>
          <header className="max-w-4xl mx-auto text-center mb-10 space-y-4">
            <div className="text-xs font-mono tracking-widest text-[#3B719F] uppercase font-bold">
              {article.category} / SOFTWARE ARCHITECTURE
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#1C1C1E] dark:text-[#F6F5F0] leading-[1.1] tracking-tight">
              {article.title}
            </h1>

            <p className="text-base sm:text-xl text-[#4C586F] dark:text-[#A0A9B8] font-serif leading-relaxed max-w-3xl mx-auto">
              {article.excerpt}
            </p>

            {/* Author, Published Date & Updated Date Metadata Bar */}
            <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-6 py-3 rounded-lg bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] text-xs font-mono text-[#4C586F] dark:text-[#A0A9B8] shadow-xs">
              <div className="flex items-center gap-2">
                <Avatar src={article.author.avatar} alt={article.author.name} size="sm" />
                <span className="font-semibold text-[#1C1C1E] dark:text-[#F6F5F0]">{article.author.name}</span>
                <span className="text-[10px] text-[#3B719F]">({article.author.role || 'Staff Architect'})</span>
              </div>

              <span>•</span>

              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#3B719F]" />
                <span>PUB: {article.publishedAt.toUpperCase()}</span>
              </div>

              <span>•</span>

              <div className="flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5 text-[#3B719F]" />
                <span>UPD: {(article.updatedAt || article.publishedAt).toUpperCase()}</span>
              </div>
            </div>
          </header>
        </BlurFade>

        {/* 17. ARTICLE FEATURE IMAGE */}
        {article.coverImage && (
          <BlurFade delay={0.25} yOffset={24}>
            <div className="max-w-5xl mx-auto mb-14 space-y-2">
              <div className="rounded-lg overflow-hidden border border-[#E1E1E1] dark:border-[#2C2C30] bg-[#E8E7E2] dark:bg-[#222225] aspect-[16/9] shadow-sm">
                <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-[11px] font-mono text-[#4C586F] dark:text-[#A0A9B8]">
                FIG 1.0 — Architectural blueprint and runtime execution flow for {article.title}
              </p>
            </div>
          </BlurFade>
        )}

        {/* 18. DESKTOP THREE-COLUMN READING LAYOUT (18% TOC | 58% CONTENT | 14% TOOLS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto">
          {/* Left Column Sticky TOC (18% / ~2.5 cols) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-4">
            <div className="p-4 rounded-lg border border-[#E1E1E1] dark:border-[#2C2C30] bg-white dark:bg-[#222225]">
              <TableOfContents content={article.content} />
            </div>
          </aside>

          {/* Center Column Main Article Content (58% / ~7 cols) */}
          <main className="lg:col-span-7 space-y-10">
            {/* Mobile TOC Drawer Toggle */}
            <div className="lg:hidden">
              <TableOfContents content={article.content} />
            </div>

            {/* Main Content Body */}
            <BlurFade delay={0.3} yOffset={16}>
              <div className="prose-editorial font-serif text-lg sm:text-[20px] leading-[1.8] text-[#1C1C1E] dark:text-[#F6F5F0]">
                <ArticleContentRenderer content={article.content} />
              </div>
            </BlurFade>

            {/* 25. NEWSLETTER CTA */}
            <BlurFade delay={0.35} yOffset={16}>
              <div className="p-8 sm:p-10 rounded-lg bg-[#E8E7E2]/60 dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] text-center space-y-4 shadow-xs">
                <div className="w-10 h-10 rounded bg-white dark:bg-[#1C1C1E] border border-[#E1E1E1] dark:border-[#2C2C30] flex items-center justify-center mx-auto text-[#3B719F]">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-2xl text-[#1C1C1E] dark:text-[#F6F5F0]">
                  The signal, not the noise.
                </h3>
                <p className="text-xs sm:text-sm text-[#4C586F] dark:text-[#A0A9B8] max-w-md mx-auto font-sans">
                  Receive carefully selected engineering dispatches, architecture breakdowns, AI developments, projects, and career insights.
                </p>

                {ctaSubscribed ? (
                  <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs rounded font-mono font-medium max-w-md mx-auto">
                    Subscribed! Welcome to Techniccal Weekly Dispatch.
                  </div>
                ) : (
                  <form onSubmit={handleCtaSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 text-xs font-mono rounded bg-white dark:bg-[#1C1C1E] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#7E8798] focus:outline-none focus:ring-1 focus:ring-[#3B719F]"
                    />
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2.5 text-xs font-mono font-bold tracking-wider rounded bg-[#1C1C1E] dark:bg-[#F6F5F0] text-[#F6F5F0] dark:text-[#1C1C1E] hover:opacity-90 transition-opacity cursor-pointer shrink-0 uppercase"
                    >
                      SUBSCRIBE
                    </button>
                  </form>
                )}
                <p className="text-[10px] font-mono text-[#4C586F] dark:text-[#A0A9B8]">
                  Zero spam. One-click unsubscribe anytime.
                </p>
              </div>
            </BlurFade>

            {/* Author Info Box */}
            <BlurFade delay={0.4} yOffset={16}>
              <div className="p-6 rounded-lg bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <img src={article.author.avatar} alt={article.author.name} className="w-16 h-16 rounded object-cover border border-[#E1E1E1] dark:border-[#2C2C30]" />
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-semibold text-base text-[#1C1C1E] dark:text-[#F6F5F0]">
                      Written by {article.author.name}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F6F5F0] dark:bg-[#1C1C1E] text-[#3B719F] font-bold">
                      {article.author.role || 'Staff Architect'}
                    </span>
                  </div>
                  <p className="text-xs text-[#4C586F] dark:text-[#A0A9B8] font-sans leading-relaxed">
                    {article.author.bio}
                  </p>
                </div>
              </div>
            </BlurFade>

            {/* 14. Discussion / Comments */}
            <ArticleComments articleId={article.id} articleTitle={article.title} />

            {/* 24. RELATED ARTICLES (CONTINUE READING) */}
            {related.length > 0 && (
              <BlurFade delay={0.45} yOffset={16}>
                <section className="pt-8 border-t border-[#E1E1E1] dark:border-[#2C2C30]">
                  <div className="pb-4 mb-6 border-b border-[#E1E1E1] dark:border-[#2C2C30] flex items-center justify-between">
                    <h3 className="text-xs font-mono font-bold tracking-widest text-[#3B719F] uppercase">
                      CONTINUE READING
                    </h3>
                    <span className="text-xs font-mono text-[#4C586F]">{article.category.toUpperCase()}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {related.map((rel) => (
                      <ArticleCard key={rel.id} article={rel} variant="related" />
                    ))}
                  </div>
                </section>
              </BlurFade>
            )}
          </main>

          {/* Right Column Sticky Share Controls & Tools (14% / ~2 cols) */}
          <aside className="hidden lg:block lg:col-span-2 sticky top-24 space-y-4">
            <div className="p-4 rounded-lg border border-[#E1E1E1] dark:border-[#2C2C30] bg-white dark:bg-[#222225] text-center space-y-3">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#4C586F] uppercase block">SHARE DISPATCH</span>
              <ShareButtons title={article.title} onCopy={handleShare} copied={copied} layout="vertical" />
            </div>
          </aside>
        </div>
      </article>
    </>
  );
};

/* 23. Sticky Share Buttons Component */
const ShareButtons: React.FC<{ title: string; onCopy: () => void; copied: boolean; layout?: 'horizontal' | 'vertical' }> = ({
  title,
  onCopy,
  copied,
  layout = 'horizontal',
}) => {
  const currentUrl = encodeURIComponent(window.location.href);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className={`flex ${layout === 'vertical' ? 'flex-col' : 'flex-row'} items-center justify-center gap-2`}>
      <button
        onClick={onCopy}
        className="w-full flex items-center justify-center gap-1.5 text-xs font-mono text-[#1C1C1E] dark:text-[#F6F5F0] bg-[#F6F5F0] dark:bg-[#1C1C1E] border border-[#E1E1E1] dark:border-[#2C2C30] hover:border-[#3B719F] px-3 py-2 rounded transition-all cursor-pointer"
        title="Copy Link"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-[#3B719F]" />}
        <span>{copied ? 'COPIED' : 'COPY'}</span>
      </button>

      <a
        href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noreferrer"
        className="w-full flex items-center justify-center gap-1.5 text-xs font-mono text-[#1C1C1E] dark:text-[#F6F5F0] bg-[#F6F5F0] dark:bg-[#1C1C1E] border border-[#E1E1E1] dark:border-[#2C2C30] hover:border-[#3B719F] px-3 py-2 rounded transition-all cursor-pointer"
        title="Share on X"
      >
        <Twitter className="w-3.5 h-3.5 text-[#3B719F]" />
        <span>X</span>
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
        target="_blank"
        rel="noreferrer"
        className="w-full flex items-center justify-center gap-1.5 text-xs font-mono text-[#1C1C1E] dark:text-[#F6F5F0] bg-[#F6F5F0] dark:bg-[#1C1C1E] border border-[#E1E1E1] dark:border-[#2C2C30] hover:border-[#3B719F] px-3 py-2 rounded transition-all cursor-pointer"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-3.5 h-3.5 text-[#3B719F]" />
        <span>LINKEDIN</span>
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
              className="font-display font-semibold text-2xl sm:text-3xl text-[#121214] dark:text-[#FAFAFA] mt-10 mb-4 tracking-tight"
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
              className="font-display font-semibold text-xl text-[#121214] dark:text-[#FAFAFA] mt-8 mb-3"
            >
              {trimmed.replace('### ', '')}
            </h3>
          );
        }

        if (trimmed.startsWith('> ')) {
          return (
            <blockquote
              key={idx}
              className="border-l-3 border-[#2563EB] dark:border-[#3B82F6] pl-5 py-2 my-6 font-serif-italic italic text-xl text-[#4A4A52] dark:text-[#A1A1AA]"
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
                <div className="rounded-2xl overflow-hidden border border-[#E7E6E1] dark:border-[#27272A] bg-[#F2F1EC] dark:bg-[#18181B] shadow-xs">
                  <img src={src} alt={alt} className="w-full h-auto object-cover max-h-[460px]" />
                </div>
                {alt && (
                  <figcaption className="text-xs font-mono text-[#74747E]">
                    Figure — {alt}
                  </figcaption>
                )}
              </figure>
            );
          }
        }

        if (trimmed.toLowerCase().includes('[diagram]') || trimmed.toLowerCase().includes('[architecture]')) {
          return <Diagram key={idx} title="SYSTEM ARCHITECTURE FLOW" />;
        }

        {/* 9. Code Examples Block with Interactive Copy Code Button */}
        if (trimmed.startsWith('```')) {
          const lines = trimmed.split('\n');
          const langMatch = lines[0].replace('```', '').trim() || 'typescript';
          const codeText = lines.slice(1, -1).join('\n');

          return <CodeBlock key={idx} language={langMatch} code={codeText} />;
        }

        {/* Unordered Lists */}
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const items = trimmed.split('\n').map((l) => l.replace(/^[-*]\s+/, ''));
          return (
            <ul key={idx} className="my-4 space-y-2 pl-6 list-disc text-[#121214] dark:text-[#FAFAFA]">
              {items.map((item, i) => (
                <li key={i} className="text-base sm:text-lg leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={idx} className="text-[#121214] dark:text-[#FAFAFA] leading-relaxed">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
};

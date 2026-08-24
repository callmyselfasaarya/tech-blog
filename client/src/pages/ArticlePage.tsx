import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Check, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Article } from '../types';
import { api } from '../services/api';
import { ReadingProgress } from '../components/blog/ReadingProgress';
import { TableOfContents } from '../components/blog/TableOfContents';
import { Skeleton } from '../components/ui/Skeleton';

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

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
          setRelated(all.filter(a => a.id !== found.id && a.category === found.category).slice(0, 3));

          document.title = found.seo?.title || `${found.title} — Memoir`;
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
        <h2 className="font-display font-bold text-2xl mb-3 text-[#1A1918] dark:text-[#F4F2F0]">Article Not Found</h2>
        <p className="text-xs text-[#99938B] mb-6">
          The essay you are looking for may have been renamed or moved.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-[#1A1918] text-white dark:bg-white dark:text-[#1A1918]">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <ReadingProgress />

      <motion.article 
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto px-4 sm:px-8 py-8"
      >
        {/* Memoir Top Action Bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          {/* Back Pill */}
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1A1918] dark:text-[#F4F2F0] bg-[#EDEAE7] dark:bg-[#201E1D] border border-[#E8E4DF] dark:border-[#2C2927] hover:opacity-80 px-3.5 py-1.5 rounded-full transition-opacity cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Back
          </button>

          {/* Center Category & Read time Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EDEAE7] dark:bg-[#201E1D] border border-[#E8E4DF] dark:border-[#2C2927] text-xs font-mono text-[#6E6862] dark:text-[#A8A29A]">
            <span>{article.category}</span>
            <span>•</span>
            <span>{article.readingTime || '4 min read'}</span>
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1A1918] dark:text-[#F4F2F0] bg-[#EDEAE7] dark:bg-[#201E1D] border border-[#E8E4DF] dark:border-[#2C2927] hover:opacity-80 px-3.5 py-1.5 rounded-full transition-opacity cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>
        </div>

        {/* Article Title */}
        <header className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#1A1918] dark:text-[#F4F2F0] leading-[1.12] tracking-tight mb-4">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-[#6E6862] dark:text-[#A8A29A] font-sans leading-relaxed max-w-2xl mx-auto">
            {article.excerpt}
          </p>
        </header>

        {/* Hero Cover Image */}
        {article.coverImage && (
          <div className="max-w-4xl mx-auto mb-12 rounded-3xl overflow-hidden border border-[#EDEAE7] dark:border-[#2C2927] bg-[#EDEAE7] dark:bg-[#201E1D] aspect-[16/9] shadow-sm">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Main Content Body */}
        <div className="max-w-[720px] mx-auto">
          <TableOfContents content={article.content} />

          <div className="prose-editorial font-sans text-base sm:text-lg leading-relaxed text-[#1A1918] dark:text-[#F4F2F0]">
            <ArticleContentRenderer content={article.content} />
          </div>

          {/* Author Box */}
          <div className="mt-16 p-6 rounded-2xl bg-white dark:bg-[#201E1D] border border-[#EDEAE7] dark:border-[#2C2927] flex items-center gap-4">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-12 h-12 rounded-full object-cover shrink-0"
            />
            <div>
              <h4 className="font-display font-semibold text-sm text-[#1A1918] dark:text-[#F4F2F0]">
                Written by {article.author.name}
              </h4>
              <p className="text-xs text-[#6E6862] dark:text-[#A8A29A] leading-relaxed mt-0.5">
                {article.author.bio}
              </p>
            </div>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <section className="mt-16 pt-10 border-t border-[#EDEAE7] dark:border-[#2C2927]">
              <h3 className="text-xs font-mono tracking-widest text-[#99938B] dark:text-[#78736B] uppercase mb-6">
                MORE FROM {article.category.toUpperCase()}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/article/${rel.slug}`}
                    className="p-4 rounded-2xl bg-white dark:bg-[#201E1D] border border-[#EDEAE7] dark:border-[#2C2927] hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display font-semibold text-sm text-[#1A1918] dark:text-[#F4F2F0] group-hover:text-black dark:group-hover:text-white line-clamp-2">
                        {rel.title}
                      </h4>
                      <ArrowUpRight className="w-4 h-4 text-[#99938B] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <span className="text-[11px] font-mono text-[#99938B] mt-4">
                      {rel.readingTime || '4 min'}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </motion.article>
    </>
  );
};

/* Helper component to parse markdown content into styled HTML elements */
const ArticleContentRenderer: React.FC<{ content: string }> = ({ content }) => {
  const paragraphs = content.split('\n\n').filter(Boolean);

  return (
    <div className="space-y-6">
      {paragraphs.map((p, idx) => {
        const trimmed = p.trim();

        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={idx} className="font-display font-bold text-2xl sm:text-3xl text-[#1A1918] dark:text-[#F4F2F0] mt-10 mb-4 tracking-tight">
              {trimmed.replace('## ', '')}
            </h2>
          );
        }

        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="font-display font-semibold text-xl text-[#1A1918] dark:text-[#F4F2F0] mt-8 mb-3">
              {trimmed.replace('### ', '')}
            </h3>
          );
        }

        if (trimmed.startsWith('> ')) {
          return (
            <blockquote key={idx} className="border-l-2 border-[#1A1918] dark:border-white pl-5 py-2 my-6 font-serif italic text-lg text-[#6E6862] dark:text-[#A8A29A]">
              {trimmed.replace('> ', '')}
            </blockquote>
          );
        }

        if (trimmed.startsWith('```')) {
          const codeLines = trimmed.split('\n').slice(1, -1).join('\n');
          return (
            <pre key={idx} className="bg-white dark:bg-[#201E1D] border border-[#EDEAE7] dark:border-[#2C2927] rounded-xl p-4 overflow-x-auto text-xs font-mono my-6 text-[#1A1918] dark:text-[#F4F2F0]">
              <code>{codeLines}</code>
            </pre>
          );
        }

        return (
          <p key={idx} className="text-[#1A1918] dark:text-[#F4F2F0] leading-relaxed">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
};

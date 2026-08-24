import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Article } from '../../types';

interface ArticleRowProps {
  article: Article;
}

export const ArticleRow: React.FC<ArticleRowProps> = ({ article }) => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="group py-7 border-b border-[#E8E5DC] dark:border-[#262626] first:pt-2 last:border-b-0"
    >
      <Link to={`/article/${article.slug}`} className="block">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1 pr-0 md:pr-8">
            {/* Category Header Tag */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono tracking-wider text-[#9E9A8E] dark:text-[#6E6E6E] uppercase">
                {article.category}
              </span>
            </div>

            {/* Article Headline */}
            <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-[#1A1A1A] dark:text-[#ECECEC] leading-snug group-hover:text-[#6B685F] dark:group-hover:text-[#A0A0A0] transition-colors mb-2">
              {article.title}
            </h2>

            {/* Excerpt */}
            <p className="text-sm text-[#6B685F] dark:text-[#A0A0A0] leading-relaxed line-clamp-2 font-sans font-light mb-3 max-w-2xl">
              {article.excerpt}
            </p>

            {/* Article Metadata */}
            <div className="flex items-center gap-3 text-xs font-mono text-[#9E9A8E] dark:text-[#6E6E6E]">
              <span>{article.publishedAt}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readingTime}
              </span>
            </div>
          </div>

          {/* Optional Right Column Action / Hover Indicator */}
          <div className="hidden md:flex items-center gap-3 shrink-0 pt-1">
            {article.coverImage && (
              <div className="w-20 h-14 rounded-sm overflow-hidden bg-[#F3F1EA] dark:bg-[#1A1A1A] opacity-70 group-hover:opacity-100 transition-opacity">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                />
              </div>
            )}
            <div className="w-8 h-8 rounded-full border border-[#E8E5DC] dark:border-[#262626] flex items-center justify-center text-[#9E9A8E] dark:text-[#6E6E6E] group-hover:text-[#1A1A1A] dark:group-hover:text-[#ECECEC] group-hover:border-[#1A1A1A] dark:group-hover:border-[#ECECEC] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-all duration-200">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

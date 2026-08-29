import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { Article } from '../../types';
import { ArrowUpRight, Clock } from 'lucide-react';

interface FeaturedArticleProps {
  article: Article;
}

export const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article }) => {
  return (
    <section className="mb-14 pb-12 border-b border-[#E7E6E1] dark:border-[#27272A]">
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="pinned" className="bg-[#121214] text-white dark:bg-white dark:text-[#121214] text-[10px]">PINNED DISPATCH</Badge>
        <span className="text-xs font-mono text-[#74747E]">•</span>
        <span className="text-xs font-mono tracking-wider text-[#74747E] uppercase">
          {article.category}
        </span>
      </div>

      <Link to={`/article/${article.slug}`} className="group block">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Editorial Text Column */}
          <div className={`${article.coverImage ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#121214] dark:text-[#FAFAFA] leading-[1.12] mb-4 group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6] transition-colors">
              {article.title}
            </h1>
            <p className="text-base sm:text-lg text-[#4A4A52] dark:text-[#A1A1AA] leading-relaxed mb-6 font-sans font-light max-w-2xl">
              {article.excerpt}
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-[#74747E]">
              <span>{article.author.name}</span>
              <span>·</span>
              <span>{article.publishedAt}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#2563EB] dark:text-[#3B82F6]" />
                {article.readingTime}
              </span>
              <span className="inline-flex items-center gap-0.5 text-[#121214] dark:text-[#FAFAFA] font-sans font-medium group-hover:translate-x-1 transition-transform ml-auto">
                Read Dispatch <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Hero Cover Image */}
          {article.coverImage && (
            <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-[#E7E6E1] dark:border-[#27272A] bg-[#F2F1EC] dark:bg-[#121215] aspect-[16/10] lg:aspect-[4/3] shadow-xs">
              <img
                src={article.coverImage}
                alt={article.title}
                width="800"
                height="600"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-500 ease-out"
              />
            </div>
          )}
        </div>
      </Link>
    </section>
  );
};

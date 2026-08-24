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
    <section className="mb-14 pb-12 border-b border-[#E8E5DC] dark:border-[#262626]">
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="pinned">PINNED</Badge>
        <span className="text-xs font-mono text-[#9E9A8E] dark:text-[#6E6E6E]">•</span>
        <span className="text-xs font-mono tracking-wider text-[#6B685F] dark:text-[#A0A0A0] uppercase">
          {article.category}
        </span>
      </div>

      <Link to={`/article/${article.slug}`} className="group block">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Editorial Text Column */}
          <div className={`${article.coverImage ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1A1A1A] dark:text-[#ECECEC] leading-[1.12] mb-4 group-hover:text-[#6B685F] dark:group-hover:text-[#A0A0A0] transition-colors">
              {article.title}
            </h1>
            <p className="text-base sm:text-lg text-[#6B685F] dark:text-[#A0A0A0] leading-relaxed mb-6 font-sans font-light max-w-2xl">
              {article.excerpt}
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-[#9E9A8E] dark:text-[#6E6E6E]">
              <span>{article.author.name}</span>
              <span>·</span>
              <span>{article.publishedAt}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readingTime}
              </span>
              <span className="inline-flex items-center gap-0.5 text-[#1A1A1A] dark:text-[#ECECEC] font-sans font-medium group-hover:translate-x-1 transition-transform ml-auto">
                Read Article <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Hero Cover Image */}
          {article.coverImage && (
            <div className="lg:col-span-5 relative overflow-hidden rounded-sm bg-[#F3F1EA] dark:bg-[#1A1A1A] aspect-[16/10] lg:aspect-[4/3]">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500 ease-out"
                loading="eager"
              />
            </div>
          )}
        </div>
      </Link>
    </section>
  );
};

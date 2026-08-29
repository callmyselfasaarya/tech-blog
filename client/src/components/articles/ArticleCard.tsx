import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowUpRight, Bookmark } from 'lucide-react';
import { Article } from '../../types';
import { Badge } from '../ui/Badge';
import { Card, CardFooter } from '../ui/card';
import { slugify } from '../../lib/utils';

export interface ArticleCardProps {
  article: Article;
  variant?: 'featured' | 'standard' | 'compact' | 'horizontal' | 'related';
  onBookmark?: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  variant = 'standard',
  onBookmark,
}) => {
  const targetSlug = slugify(article.slug || article.title);

  const formattedReadTime = article.readingTime
    ? typeof article.readingTime === 'number'
      ? `${article.readingTime} MIN READ`
      : article.readingTime.toUpperCase().replace(' READ', '') + ' READ'
    : '5 MIN READ';


  if (variant === 'featured') {
    return (
      <div className="mb-12 pb-10 border-b border-[#E1E1E1] dark:border-[#2C2C30] engineering-grid p-6 rounded-xl bg-[#F6F5F0]/60 dark:bg-[#1C1C1E]/60">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="pinned" className="bg-[#1C1C1E] text-[#F6F5F0] dark:bg-[#F6F5F0] dark:text-[#1C1C1E] text-[10px] font-mono tracking-widest uppercase">
            FEATURED DISPATCH
          </Badge>
          <span className="text-xs font-mono text-[#4C586F] dark:text-[#A0A9B8]">•</span>
          <span className="text-xs font-mono tracking-wider text-[#3B719F] uppercase font-semibold">
            {article.category}
          </span>
        </div>

        <Link to={`/article/${targetSlug}`} className="group block">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className={`${article.coverImage ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-4`}>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1C1E] dark:text-[#F6F5F0] leading-[1.12] group-hover:text-[#3B719F] transition-colors">
                {article.title}
              </h1>
              <p className="text-base sm:text-lg text-[#4C586F] dark:text-[#A0A9B8] leading-relaxed font-serif font-normal max-w-2xl">
                {article.excerpt}
              </p>

              <div className="flex items-center gap-4 text-xs font-mono text-[#4C586F] dark:text-[#A0A9B8] pt-2">
                <span className="font-semibold text-[#1C1C1E] dark:text-[#F6F5F0]">{article.author.name}</span>
                <span>·</span>
                <span>{article.publishedAt}</span>
                <span>·</span>
                <span className="flex items-center gap-1 text-[#3B719F]">
                  <Clock className="w-3.5 h-3.5" />
                  {formattedReadTime}
                </span>
                <span className="inline-flex items-center gap-1 text-[#1C1C1E] dark:text-[#F6F5F0] font-sans font-semibold group-hover:translate-x-1 transition-transform ml-auto">
                  READ DISPATCH <ArrowUpRight className="w-4 h-4 text-[#3B719F]" />
                </span>
              </div>
            </div>

            {article.coverImage && (
              <div className="lg:col-span-5 relative overflow-hidden rounded-lg border border-[#E1E1E1] dark:border-[#2C2C30] bg-[#E8E7E2] dark:bg-[#252528] aspect-[16/10]">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  loading="eager"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
            )}
          </div>
        </Link>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Card className="p-4 group border-[#E1E1E1] dark:border-[#2C2C30] bg-white dark:bg-[#222225] hover:border-[#3B719F] transition-all rounded-lg">
        <Link to={`/article/${targetSlug}`} className="flex flex-col sm:flex-row items-center gap-4">
          {article.coverImage && (
            <div className="w-full sm:w-48 aspect-[16/10] shrink-0 rounded-md overflow-hidden bg-[#E8E7E2] dark:bg-[#252528] border border-[#E1E1E1] dark:border-[#2C2C30]">
              <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
          )}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#3B719F] uppercase font-bold tracking-wider">{article.category}</span>
              <span className="text-xs font-mono text-[#4C586F]">•</span>
              <span className="text-[10px] font-mono text-[#4C586F] dark:text-[#A0A9B8]">{article.publishedAt}</span>
            </div>
            <h3 className="font-display font-semibold text-lg text-[#1C1C1E] dark:text-[#F6F5F0] group-hover:text-[#3B719F] transition-colors leading-snug">
              {article.title}
            </h3>
            <p className="text-xs text-[#4C586F] dark:text-[#A0A9B8] line-clamp-2 font-sans leading-relaxed">
              {article.excerpt}
            </p>
          </div>
        </Link>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="py-3 border-b border-[#E1E1E1] dark:border-[#2C2C30] group">
        <Link to={`/article/${targetSlug}`} className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-[#3B719F] uppercase font-bold">{article.category}</span>
            <h4 className="font-display font-medium text-sm text-[#1C1C1E] dark:text-[#F6F5F0] group-hover:text-[#3B719F] transition-colors leading-snug line-clamp-2 mt-0.5">
              {article.title}
            </h4>
          </div>
          <span className="text-[10px] font-mono text-[#4C586F] dark:text-[#A0A9B8] shrink-0">{formattedReadTime}</span>
        </Link>
      </div>
    );
  }

  if (variant === 'related') {
    return (
      <Card className="p-4 border-[#E1E1E1] dark:border-[#2C2C30] bg-white dark:bg-[#222225] hover:border-[#3B719F] transition-all rounded-lg flex flex-col justify-between h-full group">
        <Link to={`/article/${targetSlug}`} className="space-y-2 block">
          <span className="text-[10px] font-mono text-[#3B719F] uppercase font-bold">{article.category}</span>
          <h4 className="font-display font-semibold text-sm text-[#1C1C1E] dark:text-[#F6F5F0] group-hover:text-[#3B719F] transition-colors leading-snug line-clamp-2">
            {article.title}
          </h4>
        </Link>
        <div className="mt-3 pt-2 border-t border-[#E1E1E1]/60 dark:border-[#2C2C30]/60 flex items-center justify-between text-[11px] font-mono text-[#4C586F] dark:text-[#A0A9B8]">
          <span>{formattedReadTime}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#3B719F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </Card>
    );
  }

  // Standard Variant
  return (
    <Card className="p-4 group border-[#E1E1E1] dark:border-[#2C2C30] hover:border-[#3B719F] hover:shadow-sm transition-all duration-300 flex flex-col justify-between h-full bg-white dark:bg-[#222225] rounded-lg">
      <Link to={`/article/${targetSlug}`} className="block flex-1">
        {article.coverImage && (
          <div className="overflow-hidden rounded-md aspect-[16/10] relative mb-3.5 bg-[#E8E7E2] dark:bg-[#252528] border border-[#E1E1E1] dark:border-[#2C2C30]">
            <img
              src={article.coverImage}
              alt={article.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
            <div className="absolute top-2.5 left-2.5 z-10">
              <Badge variant="secondary" className="bg-white/95 dark:bg-[#1C1C1E]/95 text-[#1C1C1E] dark:text-[#F6F5F0] border border-[#E1E1E1] dark:border-[#2C2C30] text-[10px] font-mono font-bold uppercase">
                {article.category}
              </Badge>
            </div>
          </div>
        )}

        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold text-base sm:text-[17px] text-[#1C1C1E] dark:text-[#F6F5F0] leading-snug group-hover:text-[#3B719F] transition-colors line-clamp-2">
            {article.title}
          </h3>
          <div className="w-6 h-6 rounded bg-[#F6F5F0] dark:bg-[#1C1C1E] text-[#4C586F] dark:text-[#A0A9B8] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#3B719F] group-hover:text-white transition-colors">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {article.excerpt && (
          <p className="mt-2 text-xs text-[#4C586F] dark:text-[#A0A9B8] line-clamp-2 leading-relaxed font-sans">
            {article.excerpt}
          </p>
        )}
      </Link>

      <CardFooter className="mt-4 px-0 pt-3 pb-0 border-t border-[#E1E1E1] dark:border-[#2C2C30] flex items-center justify-between text-xs text-[#4C586F] dark:text-[#A0A9B8]">
        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <Clock className="w-3.5 h-3.5 text-[#3B719F]" />
          <span>{formattedReadTime}</span>
        </div>

        {onBookmark && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onBookmark(article);
            }}
            className="p-1 rounded hover:bg-[#F6F5F0] dark:hover:bg-[#1C1C1E] text-[#4C586F] hover:text-[#3B719F] transition-colors cursor-pointer"
            title="Bookmark Article"
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        )}
      </CardFooter>
    </Card>
  );
};

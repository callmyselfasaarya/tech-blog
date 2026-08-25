import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, Bookmark, Share2 } from 'lucide-react';
import { Article } from '../../types';
import { Skeleton } from '../ui/Skeleton';
import { BlurFade } from '../ui/BlurFade';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/Badge';
import { Tooltip } from '../ui/tooltip';

interface ArticleListProps {
  articles: Article[];
  isLoading?: boolean;
}

export const ArticleList: React.FC<ArticleListProps> = ({ articles, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="p-4 space-y-3.5">
            <Skeleton className="aspect-[16/11] w-full rounded-xl" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-1/3" />
          </Card>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <BlurFade delay={0.1}>
        <Card className="py-16 text-center p-8">
          <CardContent className="p-0">
            <p className="font-display font-semibold text-lg text-[#1C1C1E] dark:text-[#F6F5F0] mb-1">
              No articles found
            </p>
            <p className="text-xs text-[#7E8798] dark:text-[#A0A9B8]">
              Try selecting a different topic or resetting your search filter.
            </p>
          </CardContent>
        </Card>
      </BlurFade>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, idx) => (
        <BlurFade key={article.id} delay={0.04 * idx} yOffset={20}>
          <Card className="p-[14px] sm:p-4 group hover:border-[#1C1C1E]/30 dark:hover:border-white/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full bg-white dark:bg-[#222225]">
            <Link to={`/article/${article.slug}`} className="block flex-1">
              {/* Card Thumbnail Image Container */}
              <div className="overflow-hidden rounded-xl aspect-[16/11] relative mb-3.5 bg-[#F4F2EE] dark:bg-[#1C1C1E]">
                {article.coverImage ? (
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    width="600"
                    height="412"
                    loading={idx < 2 ? 'eager' : 'lazy'}
                    fetchPriority={idx < 2 ? 'high' : 'auto'}
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-[#7E8798]">
                    No Image
                  </div>
                )}
                {/* Category Pill Tag Overlay */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <Badge variant="secondary" className="backdrop-blur-md bg-white/80 dark:bg-[#1C1C1E]/80 text-[10px]">
                    {article.category}
                  </Badge>
                </div>
              </div>

              {/* Card Title + Arrow Badge */}
              <div className="flex items-start justify-between gap-2.5 px-0.5">
                <h3 className="font-display font-semibold text-base sm:text-[17px] text-[#1C1C1E] dark:text-[#F6F5F0] leading-snug group-hover:text-[#3B719F] dark:group-hover:text-[#60A5FA] transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <div className="w-7 h-7 rounded-lg bg-[#F4F2EE] dark:bg-[#2C2C30] text-[#7E8798] dark:text-[#A0A9B8] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#1C1C1E] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Excerpt line clamp */}
              {article.excerpt && (
                <p className="mt-2 text-xs text-[#7E8798] dark:text-[#A0A9B8] line-clamp-2 leading-relaxed px-0.5 font-sans">
                  {article.excerpt}
                </p>
              )}
            </Link>

            {/* Footer Metadata */}
            <CardFooter className="mt-4 px-0.5 pt-3 pb-0 border-t border-[#F0EEEA] dark:border-[#2C2C30] flex items-center justify-between text-xs text-[#7E8798] dark:text-[#A0A9B8]">
              <div className="flex items-center gap-1.5 font-sans text-[11px]">
                <Clock className="w-3.5 h-3.5 opacity-70" />
                <span>{article.readingTime ? article.readingTime.replace(' read', '') : '5 min'} read</span>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Tooltip content="Bookmark">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className="p-1 rounded-md hover:bg-[#F4F2EE] dark:hover:bg-[#2C2C30] text-[#7E8798] hover:text-[#1C1C1E] dark:hover:text-[#F6F5F0] transition-colors cursor-pointer"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </Tooltip>
              </div>
            </CardFooter>
          </Card>
        </BlurFade>
      ))}
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Article } from '../../types';
import { Skeleton } from '../ui/Skeleton';
import { BlurFade } from '../ui/BlurFade';

interface ArticleListProps {
  articles: Article[];
  isLoading?: boolean;
}

export const ArticleList: React.FC<ArticleListProps> = ({ articles, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white dark:bg-[#222225] p-4 rounded-2xl border border-[#E8E6E1] dark:border-[#2C2C30] space-y-3.5">
            <Skeleton className="aspect-[16/11] w-full rounded-xl" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <BlurFade delay={0.1}>
        <div className="py-16 text-center bg-white dark:bg-[#222225] rounded-2xl border border-[#E8E6E1] dark:border-[#2C2C30] p-8">
          <p className="font-display font-semibold text-lg text-[#1C1C1E] dark:text-[#F6F5F0] mb-1">
            No articles found
          </p>
          <p className="text-xs text-[#7E8798] dark:text-[#A0A9B8]">
            Try selecting a different topic or resetting your search filter.
          </p>
        </div>
      </BlurFade>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, idx) => (
        <BlurFade key={article.id} delay={0.06 * idx} yOffset={24}>
          <Link
            to={`/article/${article.slug}`}
            className="bg-white dark:bg-[#222225] rounded-2xl border border-[#E8E6E1] dark:border-[#2C2C30] p-[14px] sm:p-4 shadow-xs hover:shadow-md transition-all group duration-300 flex flex-col justify-between h-full"
          >
            <div>
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
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-[#7E8798]">
                    No Image
                  </div>
                )}
              </div>

              {/* Card Title + Top Right Arrow Badge */}
              <div className="flex items-start justify-between gap-2.5 px-0.5">
                <h3 className="font-display font-semibold text-base sm:text-[17px] text-[#1C1C1E] dark:text-[#F6F5F0] leading-snug group-hover:text-black dark:group-hover:text-white transition-colors line-clamp-2">
                  {article.title}
                </h3>

                {/* Arrow Badge Container matching Framer Memoir design */}
                <div className="w-6 h-6 rounded-md bg-[#F4F2EE] dark:bg-[#2C2C30] text-[#7E8798] dark:text-[#A0A9B8] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#1C1C1E] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Category & Reading Time Footer */}
            <div className="mt-3.5 px-0.5 flex items-center gap-1.5 text-xs text-[#7E8798] dark:text-[#A0A9B8] font-sans font-normal">
              <span>{article.category}</span>
              <span>•</span>
              <span>{article.readingTime ? article.readingTime.replace(' read', '') : '5 min'}</span>
            </div>
          </Link>
        </BlurFade>
      ))}
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Article } from '../../types';
import { Skeleton } from '../ui/Skeleton';

interface ArticleListProps {
  articles: Article[];
  isLoading?: boolean;
}

export const ArticleList: React.FC<ArticleListProps> = ({ articles, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white dark:bg-[#201E1D] p-3 rounded-2xl border border-[#EDEAE7] dark:border-[#2C2927] space-y-3">
            <Skeleton className="h-44 w-full rounded-xl" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="py-16 text-center bg-white dark:bg-[#201E1D] rounded-2xl border border-[#EDEAE7] dark:border-[#2C2927] p-8">
        <p className="font-display font-semibold text-lg text-[#1A1918] dark:text-[#F4F2F0] mb-1">
          No articles found
        </p>
        <p className="text-xs text-[#99938B] dark:text-[#78736B]">
          Try selecting a different topic or resetting your search filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Link
          key={article.id}
          to={`/article/${article.slug}`}
          className="bg-white dark:bg-[#201E1D] rounded-2xl border border-[#EDEAE7] dark:border-[#2C2927] p-3 shadow-sm hover:shadow-md transition-all group duration-300 flex flex-col justify-between"
        >
          <div>
            {/* Card Thumbnail Image */}
            <div className="overflow-hidden rounded-xl aspect-[4/3] relative mb-3.5 bg-[#EDEAE7] dark:bg-[#2C2927]">
              {article.coverImage ? (
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-[#99938B]">
                  No Image
                </div>
              )}
            </div>

            {/* Card Title + Hover Arrow */}
            <div className="flex items-start justify-between gap-2 px-1">
              <h3 className="font-display font-semibold text-base text-[#1A1918] dark:text-[#F4F2F0] leading-snug group-hover:text-black dark:group-hover:text-white transition-colors line-clamp-2">
                {article.title}
              </h3>
              <ArrowUpRight className="w-4 h-4 text-[#99938B] shrink-0 mt-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Metadata Footer */}
          <div className="mt-4 px-1 pt-2 border-t border-[#F4F2F0] dark:border-[#282524] flex items-center justify-between text-xs text-[#99938B] dark:text-[#78736B] font-mono">
            <span>{article.category}</span>
            <span>•</span>
            <span>{article.readingTime || '4 min'}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

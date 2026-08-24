import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowUpRight } from 'lucide-react';
import { Article } from '../types';
import { api } from '../services/api';

interface GroupedArchive {
  year: string;
  months: {
    month: string;
    articles: Article[];
  }[];
}

export const Archive: React.FC = () => {
  const [grouped, setGrouped] = useState<GroupedArchive[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchArchive = async () => {
      const articles = await api.getArticles();
      setTotalCount(articles.length);

      // Group by year and month
      const map: { [year: string]: { [month: string]: Article[] } } = {};

      articles.forEach((art) => {
        const date = new Date(art.publishedAt);
        const year = date.getFullYear().toString();
        const month = date.toLocaleString('default', { month: 'long' });

        if (!map[year]) map[year] = {};
        if (!map[year][month]) map[year][month] = [];
        map[year][month].push(art);
      });

      // Sort descending
      const sortedYears = Object.keys(map).sort((a, b) => Number(b) - Number(a));
      const result: GroupedArchive[] = sortedYears.map((year) => ({
        year,
        months: Object.keys(map[year]).map((month) => ({
          month,
          articles: map[year][month]
        }))
      }));

      setGrouped(result);
    };

    fetchArchive();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto px-4 sm:px-8 py-12"
    >
      <header className="mb-12">
        <span className="text-xs font-mono tracking-widest text-[#9E9A8E] dark:text-[#6E6E6E] uppercase">
          CHRONOLOGICAL INDEX
        </span>
        <div className="flex items-baseline justify-between mt-2 mb-3">
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-[#1A1A1A] dark:text-[#ECECEC]">
            Publication Archive
          </h1>
          <span className="text-xs font-mono text-[#9E9A8E]">{totalCount} TOTAL ESSAYS</span>
        </div>
        <p className="text-base text-[#6B685F] dark:text-[#A0A0A0] font-sans font-light leading-relaxed max-w-xl">
          Complete timeline of published essays, architectural breakdowns, and reflections ordered chronologically.
        </p>
      </header>

      {/* Timeline Groups */}
      <div className="space-y-16">
        {grouped.map((yearGroup) => (
          <section key={yearGroup.year} className="relative">
            {/* Year Badge Header */}
            <div className="sticky top-0 z-10 bg-[#FAF9F5]/90 dark:bg-[#121212]/90 backdrop-blur-sm py-2 mb-6 border-b-2 border-[#1A1A1A] dark:border-[#ECECEC] flex items-center justify-between">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#ECECEC]">
                {yearGroup.year}
              </h2>
              <span className="text-xs font-mono text-[#9E9A8E]">
                {yearGroup.months.reduce((acc, m) => acc + m.articles.length, 0)} ESSAYS
              </span>
            </div>

            {/* Months */}
            <div className="space-y-10 pl-2 sm:pl-4 border-l border-[#E8E5DC] dark:border-[#262626]">
              {yearGroup.months.map((monthGroup) => (
                <div key={monthGroup.month} className="relative">
                  <span className="absolute -left-[13px] sm:-left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#E8E5DC] dark:bg-[#333] border-2 border-[#FAF9F5] dark:border-[#121212]" />

                  <h3 className="text-xs font-mono tracking-widest text-[#9E9A8E] dark:text-[#6E6E6E] uppercase mb-4 pl-2">
                    {monthGroup.month}
                  </h3>

                  <div className="space-y-4 pl-2">
                    {monthGroup.articles.map((art) => (
                      <Link
                        key={art.id}
                        to={`/article/${art.slug}`}
                        className="group flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-sm hover:bg-[#F3F1EA] dark:hover:bg-[#1C1C1C] transition-colors"
                      >
                        <div className="pr-4">
                          <span className="text-[10px] font-mono text-[#9E9A8E] uppercase block mb-0.5">
                            {art.category}
                          </span>
                          <h4 className="font-serif text-xl font-medium text-[#1A1A1A] dark:text-[#ECECEC] group-hover:text-[#6B685F] dark:group-hover:text-[#A0A0A0] transition-colors">
                            {art.title}
                          </h4>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-[#9E9A8E] mt-2 sm:mt-0">
                          <span>{art.publishedAt}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {art.readingTime}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-[#1A1A1A] dark:text-[#ECECEC] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </motion.div>
  );
};

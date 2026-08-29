import React, { useEffect, useState } from 'react';
import { ArticleList } from '../components/blog/ArticleList';
import { Article } from '../types';
import { api } from '../services/api';
import { BlurFade } from '../components/ui/BlurFade';
import { Terminal, Cpu, Briefcase, Code } from 'lucide-react';

interface CategoryPageProps {
  category: string;
  title: string;
  description: string;
  iconName?: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  title,
  description,
  iconName,
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${title} — Techniccal`;
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const data = await api.getArticles(category);
        setArticles(data);
      } catch (e) {
        console.error('Error fetching category articles:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [category]);

  const getIcon = () => {
    switch (category.toLowerCase()) {
      case 'ai':
        return <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'programming':
        return <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'career':
        return <Briefcase className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'projects':
        return <Code className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <Terminal className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
      {/* Category Header Banner */}
      <section className="mb-12 text-center max-w-3xl mx-auto space-y-4">
        <BlurFade delay={0.05} yOffset={12}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F2F1EC] dark:bg-[#18181B] border border-[#E7E6E1] dark:border-[#27272A] text-xs font-mono font-medium text-[#4A4A52] dark:text-[#A1A1AA]">
            {getIcon()}
            <span>/{category.toLowerCase()}</span>
          </div>
        </BlurFade>

        <BlurFade delay={0.12} yOffset={18}>
          <h1 className="font-display font-semibold text-4xl sm:text-6xl text-[#121214] dark:text-[#FAFAFA] tracking-tight">
            {title}
          </h1>
        </BlurFade>

        <BlurFade delay={0.2} yOffset={16}>
          <p className="text-base sm:text-lg text-[#4A4A52] dark:text-[#A1A1AA] font-sans leading-relaxed">
            {description}
          </p>
        </BlurFade>
      </section>

      {/* Article Cards Grid */}
      <BlurFade delay={0.3} yOffset={20}>
        <ArticleList articles={articles} isLoading={isLoading} />
      </BlurFade>
    </div>
  );
};

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
        return <Cpu className="w-6 h-6 text-[#3B719F]" />;
      case 'programming':
        return <Terminal className="w-6 h-6 text-[#1C1C1E] dark:text-white" />;
      case 'career':
        return <Briefcase className="w-6 h-6 text-[#4C586F]" />;
      case 'projects':
        return <Code className="w-6 h-6 text-[#3B719F]" />;
      default:
        return <Terminal className="w-6 h-6" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
      {/* Category Header Banner */}
      <section className="mb-12 text-center max-w-3xl mx-auto space-y-4">
        <BlurFade delay={0.05} yOffset={12}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8E7E2] dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] text-xs font-mono font-medium text-[#4C586F] dark:text-[#A0A9B8]">
            {getIcon()}
            <span>/{category.toLowerCase()}</span>
          </div>
        </BlurFade>

        <BlurFade delay={0.12} yOffset={18}>
          <h1 className="font-display font-semibold text-4xl sm:text-6xl text-[#1C1C1E] dark:text-[#F6F5F0] tracking-tight">
            {title}
          </h1>
        </BlurFade>

        <BlurFade delay={0.2} yOffset={16}>
          <p className="text-base sm:text-lg text-[#4C586F] dark:text-[#A0A9B8] font-sans leading-relaxed">
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

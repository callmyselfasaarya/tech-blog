import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Eye, Users, FileCheck, FileEdit, Plus, ArrowUpRight } from 'lucide-react';
import { Article, Subscriber } from '../types';
import { api } from '../services/api';

export const Dashboard: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      setIsLoading(true);
      try {
        const [arts, subs] = await Promise.all([
          api.getAllArticlesAdmin(),
          api.getSubscribers()
        ]);
        setArticles(arts);
        setSubscribers(subs);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const totalArticles = articles.length;
  const publishedCount = articles.filter(a => a.status === 'published').length;
  const draftsCount = articles.filter(a => a.status === 'draft').length;
  const totalViews = articles.reduce((acc, a) => acc + (a.views || 0), 0);
  const subscriberCount = subscribers.length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Overview Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#1A1A1A] dark:text-[#ECECEC]">
            Publication Overview
          </h1>
          <p className="text-xs font-mono text-[#9E9A8E] mt-1">
            STATISTICS & RECENT EDITORIAL METRICS
          </p>
        </div>
        <Link
          to="/admin/articles/new"
          className="px-4 py-2 bg-[#1A1A1A] dark:bg-[#EEEEEE] text-[#FAF9F5] dark:text-[#121212] font-mono text-xs uppercase tracking-wider font-semibold rounded-sm flex items-center gap-1.5 hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> Create Essay
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-5 bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm">
          <div className="flex items-center justify-between text-[#9E9A8E] mb-2">
            <span className="text-[10px] font-mono uppercase">Total Essays</span>
            <FileText className="w-4 h-4" />
          </div>
          <p className="font-serif text-3xl font-bold text-[#1A1A1A] dark:text-[#ECECEC]">
            {totalArticles}
          </p>
        </div>

        <div className="p-5 bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm">
          <div className="flex items-center justify-between text-[#9E9A8E] mb-2">
            <span className="text-[10px] font-mono uppercase">Published</span>
            <FileCheck className="w-4 h-4 text-green-600" />
          </div>
          <p className="font-serif text-3xl font-bold text-[#1A1A1A] dark:text-[#ECECEC]">
            {publishedCount}
          </p>
        </div>

        <div className="p-5 bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm">
          <div className="flex items-center justify-between text-[#9E9A8E] mb-2">
            <span className="text-[10px] font-mono uppercase">Drafts</span>
            <FileEdit className="w-4 h-4 text-amber-600" />
          </div>
          <p className="font-serif text-3xl font-bold text-[#1A1A1A] dark:text-[#ECECEC]">
            {draftsCount}
          </p>
        </div>

        <div className="p-5 bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm">
          <div className="flex items-center justify-between text-[#9E9A8E] mb-2">
            <span className="text-[10px] font-mono uppercase">Total Views</span>
            <Eye className="w-4 h-4 text-blue-600" />
          </div>
          <p className="font-serif text-3xl font-bold text-[#1A1A1A] dark:text-[#ECECEC]">
            {totalViews.toLocaleString()}
          </p>
        </div>

        <div className="p-5 bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-[#9E9A8E] mb-2">
            <span className="text-[10px] font-mono uppercase">Subscribers</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <p className="font-serif text-3xl font-bold text-[#1A1A1A] dark:text-[#ECECEC]">
            {subscriberCount}
          </p>
        </div>
      </div>

      {/* Recent Articles Table */}
      <div className="bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm p-6">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#E8E5DC] dark:border-[#262626]">
          <h3 className="font-serif text-xl font-medium">Recent Articles</h3>
          <Link to="/admin/articles" className="text-xs font-mono text-[#6B685F] hover:underline">
            View All →
          </Link>
        </div>

        <div className="divide-y divide-[#F3F1EA] dark:divide-[#222222]">
          {articles.slice(0, 5).map((article) => (
            <div key={article.id} className="py-3 flex items-center justify-between text-xs">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-mono text-[10px] uppercase text-[#9E9A8E]">{article.category}</span>
                  <span className={`px-1.5 py-0.2 text-[9px] font-mono rounded ${
                    article.status === 'published' ? 'bg-green-500/10 text-green-600' : 'bg-amber-500/10 text-amber-600'
                  }`}>
                    {article.status}
                  </span>
                </div>
                <Link to={`/admin/articles/edit/${article.id}`} className="font-serif text-base font-medium hover:underline">
                  {article.title}
                </Link>
              </div>

              <div className="flex items-center gap-4 font-mono text-[#9E9A8E]">
                <span>{article.views || 0} views</span>
                <span>{article.publishedAt}</span>
                <Link to={`/admin/articles/edit/${article.id}`} className="text-[#1A1A1A] dark:text-[#ECECEC] hover:underline">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

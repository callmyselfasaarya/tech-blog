import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit3, Trash2, Eye, Pin, Star, CheckCircle, Clock } from 'lucide-react';
import { Article } from '../types';
import { api } from '../services/api';

export const ArticlesManager: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setIsLoading(true);
    try {
      const data = await api.getAllArticlesAdmin();
      setArticles(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await api.deleteArticle(id);
      loadArticles();
    }
  };

  const filtered = articles.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold tracking-tight">Articles Manager</h1>
          <p className="text-xs font-mono text-[#9E9A8E] mt-1">MANAGE, EDIT, AND PUBLISH JOURNAL ESSAYS</p>
        </div>
        <Link
          to="/admin/articles/new"
          className="px-4 py-2 bg-[#1A1A1A] dark:bg-[#EEEEEE] text-[#FAF9F5] dark:text-[#121212] font-mono text-xs uppercase tracking-wider font-semibold rounded-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> New Article
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#9E9A8E] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title or category..."
            className="w-full bg-[#F3F1EA] dark:bg-[#121212] border border-[#E8E5DC] dark:border-[#333] rounded-sm pl-9 pr-3 py-1.5 text-xs text-[#1A1A1A] dark:text-[#ECECEC] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 font-mono text-xs w-full sm:w-auto justify-end">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1 rounded-sm border ${filterStatus === 'all' ? 'bg-[#1A1A1A] text-white dark:bg-white dark:text-black' : 'border-[#E8E5DC] dark:border-[#333]'}`}
          >
            All ({articles.length})
          </button>
          <button
            onClick={() => setFilterStatus('published')}
            className={`px-3 py-1 rounded-sm border ${filterStatus === 'published' ? 'bg-[#1A1A1A] text-white dark:bg-white dark:text-black' : 'border-[#E8E5DC] dark:border-[#333]'}`}
          >
            Published ({articles.filter(a => a.status === 'published').length})
          </button>
          <button
            onClick={() => setFilterStatus('draft')}
            className={`px-3 py-1 rounded-sm border ${filterStatus === 'draft' ? 'bg-[#1A1A1A] text-white dark:bg-white dark:text-black' : 'border-[#E8E5DC] dark:border-[#333]'}`}
          >
            Drafts ({articles.filter(a => a.status === 'draft').length})
          </button>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E8E5DC] dark:border-[#262626] text-[10px] font-mono text-[#9E9A8E] uppercase">
              <th className="p-4">Title & Slug</th>
              <th className="p-4">Category</th>
              <th className="p-4">Status</th>
              <th className="p-4">Views</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3F1EA] dark:divide-[#222222] text-xs">
            {filtered.map((art) => (
              <tr key={art.id} className="hover:bg-[#F3F1EA]/60 dark:hover:bg-[#222222]/60 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {art.pinned && (
                      <span title="Pinned" className="inline-flex shrink-0">
                        <Pin className="w-3.5 h-3.5 text-amber-600" />
                      </span>
                    )}
                    <div>
                      <Link to={`/admin/articles/edit/${art.id}`} className="font-serif text-lg font-medium hover:underline block">
                        {art.title}
                      </Link>
                      <span className="font-mono text-[10px] text-[#9E9A8E]">/article/{art.slug}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-mono text-[11px]">{art.category}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                    art.status === 'published' ? 'bg-green-500/10 text-green-600 font-semibold' : 'bg-amber-500/10 text-amber-600'
                  }`}>
                    {art.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 font-mono text-[#9E9A8E]">{art.views || 0}</td>
                <td className="p-4 font-mono text-[#9E9A8E]">{art.publishedAt}</td>
                <td className="p-4 text-right space-x-2">
                  <Link
                    to={`/article/${art.slug}`}
                    target="_blank"
                    className="p-1.5 inline-block text-[#6B685F] hover:text-[#1A1A1A] dark:hover:text-white"
                    title="View Live"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <Link
                    to={`/admin/articles/edit/${art.id}`}
                    className="p-1.5 inline-block text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(art.id, art.title)}
                    className="p-1.5 inline-block text-red-600 hover:text-red-800 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Bookmark, 
  Mail, 
  Sparkles, 
  User, 
  LogOut, 
  ArrowUpRight, 
  BookOpen, 
  CheckCircle2, 
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { api } from '../services/api';
import { Article, User as UserType } from '../types';

export const MemberPortal: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = api.getCurrentUser();
    if (!user) {
      // Default fallback for demo: sign in as member
      const memberUser = api.loginAsRole('MEMBER');
      setCurrentUser(memberUser);
    } else {
      setCurrentUser(user);
    }

    loadSavedArticles();
  }, []);

  const loadSavedArticles = async () => {
    const user = api.getCurrentUser();
    const allArticles = await api.getArticles();
    if (user?.savedArticles && user.savedArticles.length > 0) {
      setSavedArticles(allArticles.filter(a => user.savedArticles?.includes(a.id)));
    } else {
      // Default demo saved articles
      setSavedArticles(allArticles.slice(0, 2));
    }
  };

  const handleLogout = () => {
    api.logout();
    navigate('/');
  };

  const handleRemoveBookmark = (articleId: string) => {
    api.toggleSaveArticle(articleId);
    loadSavedArticles();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
      {/* Member Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-[#1E1D1B] border border-[#E8E5DC] dark:border-[#282724] p-6 sm:p-8 rounded-2xl mb-10 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'}
              alt={currentUser?.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#1A1918] dark:border-[#F4F2F0]"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-serif font-bold text-[#1A1918] dark:text-[#F4F2F0]">
                  {currentUser?.name || 'Techniccal Member'}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[10px] font-mono font-bold uppercase rounded-full">
                  <Sparkles className="w-3 h-3" /> Member
                </span>
              </div>
              <p className="text-xs font-mono text-[#7E8798]">
                {currentUser?.email} • Account Level: {currentUser?.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'ADMIN' || currentUser?.role === 'EDITOR' ? (
              <Link
                to="/admin"
                className="flex-1 sm:flex-initial px-4 py-2 bg-[#1A1918] text-[#F4F2F0] dark:bg-[#F4F2F0] dark:text-[#1A1918] text-xs font-mono font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
              >
                <ShieldCheck className="w-4 h-4" /> Go to CMS
              </Link>
            ) : null}

            <button
              onClick={handleLogout}
              className="flex-1 sm:flex-initial px-4 py-2 border border-[#E8E5DC] dark:border-[#282724] text-xs font-mono text-[#7E8798] hover:text-red-600 dark:hover:text-red-400 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </motion.div>

      {/* Member Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="p-5 bg-white dark:bg-[#1E1D1B] border border-[#E8E5DC] dark:border-[#282724] rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
            <BookOpen className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-sans font-semibold text-[#1A1918] dark:text-[#F4F2F0] mb-1">
            Unlimited Deep Reads
          </h3>
          <p className="text-xs text-[#7E8798]">
            Full access to long-form software architecture dispatches & AI reasoning research.
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-[#1E1D1B] border border-[#E8E5DC] dark:border-[#282724] rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
            <Mail className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-sans font-semibold text-[#1A1918] dark:text-[#F4F2F0] mb-1">
            Insider Weekly Dispatch
          </h3>
          <p className="text-xs text-[#7E8798]">
            Direct email delivery of curated engineering papers and systems blueprints.
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-[#1E1D1B] border border-[#E8E5DC] dark:border-[#282724] rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
            <Zap className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-sans font-semibold text-[#1A1918] dark:text-[#F4F2F0] mb-1">
            Saved Reading List
          </h3>
          <p className="text-xs text-[#7E8798]">
            Bookmark technical essays to read offline across desktop & mobile devices.
          </p>
        </div>
      </div>

      {/* Saved Reading List Section */}
      <div>
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E8E5DC] dark:border-[#282724]">
          <h2 className="text-lg font-serif font-bold text-[#1A1918] dark:text-[#F4F2F0] flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            Your Saved Reading List
          </h2>
          <span className="text-xs font-mono text-[#7E8798]">
            {savedArticles.length} {savedArticles.length === 1 ? 'article' : 'articles'}
          </span>
        </div>

        {savedArticles.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-[#1E1D1B] border border-[#E8E5DC] dark:border-[#282724] rounded-2xl">
            <Bookmark className="w-8 h-8 text-[#7E8798] mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium text-[#1A1918] dark:text-[#F4F2F0]">No saved articles yet</p>
            <p className="text-xs text-[#7E8798] mt-1 mb-4">Browse articles on Techniccal and bookmark essays for later.</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1A1918] text-[#F4F2F0] dark:bg-[#F4F2F0] dark:text-[#1A1918] text-xs font-mono uppercase tracking-wider rounded-xl font-medium"
            >
              Browse Articles <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {savedArticles.map((article) => (
              <div
                key={article.id}
                className="p-5 bg-white dark:bg-[#1E1D1B] border border-[#E8E5DC] dark:border-[#282724] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#1A1918] dark:hover:border-[#F4F2F0] transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold uppercase mb-1">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span className="text-[#7E8798] font-normal">{article.readingTime}</span>
                  </div>
                  <Link
                    to={`/article/${article.slug}`}
                    className="text-base font-serif font-bold text-[#1A1918] dark:text-[#F4F2F0] hover:underline"
                  >
                    {article.title}
                  </Link>
                  <p className="text-xs text-[#7E8798] line-clamp-1 mt-1">{article.excerpt}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    to={`/article/${article.slug}`}
                    className="px-3 py-1.5 bg-[#F4F2F0] dark:bg-[#282724] text-[#1A1918] dark:text-[#F4F2F0] text-xs font-mono rounded-lg hover:opacity-80 transition-opacity flex items-center gap-1"
                  >
                    Read Essay <ArrowUpRight className="w-3 h-3" />
                  </Link>
                  <button
                    onClick={() => handleRemoveBookmark(article.id)}
                    className="p-1.5 text-[#7E8798] hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                    title="Remove from saved"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberPortal;

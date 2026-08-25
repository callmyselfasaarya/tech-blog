import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Bookmark, 
  Mail, 
  Sparkles, 
  LogOut, 
  ArrowUpRight, 
  BookOpen, 
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { api } from '../services/api';
import { Article, User as UserType } from '../types';
import { Card, CardContent } from '../components/ui/card';
import { Avatar } from '../components/ui/avatar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const MemberPortal: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = api.getCurrentUser();
    if (!user) {
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
      >
        <Card className="p-6 sm:p-8 mb-10">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Avatar
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'}
                  alt={currentUser?.name}
                  size="lg"
                  className="w-16 h-16"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-xl font-display font-bold text-[#1C1C1E] dark:text-[#F6F5F0]">
                      {currentUser?.name || 'Techniccal Member'}
                    </h1>
                    <Badge variant="accent" className="text-[10px]">
                      <Sparkles className="w-3 h-3 mr-1" /> Member
                    </Badge>
                  </div>
                  <p className="text-xs font-mono text-[#7E8798]">
                    {currentUser?.email} • Role: {currentUser?.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'ADMIN' || currentUser?.role === 'EDITOR' ? (
                  <Link to="/admin">
                    <Button variant="default" size="sm">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Admin CMS</span>
                    </Button>
                  </Link>
                ) : null}

                <Button onClick={handleLogout} variant="outline" size="sm">
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Grid: Member Perks & Saved Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Saved Articles Section (2 cols) */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E1E1E1] dark:border-[#2C2C30]">
            <h2 className="font-display font-semibold text-lg text-[#1C1C1E] dark:text-[#F6F5F0] flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#3B719F]" />
              Bookmarked Reading List ({savedArticles.length})
            </h2>
            <span className="text-xs font-mono text-[#7E8798]">Saved Offline</span>
          </div>

          {savedArticles.length === 0 ? (
            <Card className="p-8 text-center">
              <CardContent className="p-0">
                <BookOpen className="w-8 h-8 text-[#7E8798] mx-auto mb-2 opacity-50" />
                <p className="text-xs text-[#7E8798]">No bookmarked articles yet.</p>
              </CardContent>
            </Card>
          ) : (
            savedArticles.map((art) => (
              <Card key={art.id} className="p-4 group hover:border-[#1C1C1E]/30 dark:hover:border-white/30 transition-all">
                <CardContent className="p-0 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] text-[#7E8798]">
                      <Badge variant="secondary" className="text-[10px]">
                        {art.category}
                      </Badge>
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {art.readingTime}
                      </span>
                    </div>
                    <Link
                      to={`/article/${art.slug}`}
                      className="font-display font-semibold text-sm sm:text-base text-[#1C1C1E] dark:text-[#F6F5F0] hover:text-[#3B719F] transition-colors line-clamp-1 block"
                    >
                      {art.title}
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      to={`/article/${art.slug}`}
                      className="p-2 rounded-lg bg-[#F4F2EE] dark:bg-[#2C2C30] text-[#1C1C1E] dark:text-white hover:bg-[#1C1C1E] hover:text-white transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleRemoveBookmark(art.id)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer text-xs"
                      title="Remove bookmark"
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Member Dispatch Perks Card (1 col) */}
        <div className="space-y-4">
          <div className="pb-2 border-b border-[#E1E1E1] dark:border-[#2C2C30]">
            <h2 className="font-display font-semibold text-lg text-[#1C1C1E] dark:text-[#F6F5F0] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#3B719F]" />
              Insider Benefits
            </h2>
          </div>

          <Card className="p-5">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#3B719F]/10 text-[#3B719F] shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-xs text-[#1C1C1E] dark:text-[#F6F5F0]">
                    Weekly Architecture Digest
                  </h4>
                  <p className="text-[11px] text-[#7E8798] leading-relaxed mt-0.5">
                    Subscribed to early-access benchmark dispatches.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-xs text-[#1C1C1E] dark:text-[#F6F5F0]">
                    Ad-Free Editorial
                  </h4>
                  <p className="text-[11px] text-[#7E8798] leading-relaxed mt-0.5">
                    Uninterrupted high-signal reading experience.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, CornerDownLeft, Clock, Command } from 'lucide-react';
import { Article } from '../../types';
import { api } from '../../services/api';
import { Badge } from '../ui/Badge';
import { slugify } from '../../lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = api.getArticlesSync(undefined, query);
      setResults(searchResults);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        const target = results[selectedIndex];
        const targetSlug = slugify(target.slug || target.title);
        navigate(`/article/${targetSlug}`);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, navigate]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="w-full max-w-2xl bg-white dark:bg-[#1C1C1E] border border-[#E1E1E1] dark:border-[#2C2C30] rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Search Header Input */}
          <div className="p-4 border-b border-[#E1E1E1] dark:border-[#2C2C30] flex items-center gap-3">
            <Search className="w-5 h-5 text-[#3B719F] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search articles, categories, topics, or system design tags..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm font-sans text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#7E8798] focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#7E8798] hover:bg-[#F6F5F0] dark:hover:bg-[#222225] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {query.trim() === '' ? (
              <div className="py-12 text-center text-xs font-mono text-[#7E8798]">
                Type to begin searching across Techniccal publication database.
              </div>
            ) : results.length === 0 ? (
              <div className="py-12 text-center text-xs font-mono text-[#7E8798]">
                No technical dispatches matched your query "{query}".
              </div>
            ) : (
              results.map((article, idx) => {
                const isSelected = idx === selectedIndex;
                const targetSlug = slugify(article.slug || article.title);
                return (
                  <div
                    key={article.id}
                    onClick={() => {
                      navigate(`/article/${targetSlug}`);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`p-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#F4F2EE] dark:bg-[#2C2C30] text-[#1C1C1E] dark:text-white'
                        : 'hover:bg-[#F4F2EE]/60 dark:hover:bg-[#2C2C30]/50 text-[#1C1C1E] dark:text-[#F6F5F0]'
                    }`}
                  >
                    <div className="pr-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px]">
                          {article.category}
                        </Badge>
                        <span className="text-[11px] text-[#7E8798] dark:text-[#A0A9B8] flex items-center gap-1 font-sans">
                          <Clock className="w-3 h-3" />
                          {article.readingTime}
                        </span>
                      </div>
                      <h4 className="font-display font-semibold text-sm sm:text-base leading-snug">
                        {article.title}
                      </h4>
                      <p className="text-xs text-[#7E8798] dark:text-[#A0A9B8] line-clamp-1 font-sans">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="shrink-0 text-[#7E8798] dark:text-[#A0A9B8]">
                      {isSelected && <CornerDownLeft className="w-4 h-4 text-[#1C1C1E] dark:text-white" />}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Command Footer */}
          <div className="px-4 py-2.5 bg-[#F6F5F0] dark:bg-[#141416] border-t border-[#E1E1E1] dark:border-[#2C2C30] flex items-center justify-between text-[11px] text-[#7E8798] dark:text-[#A0A9B8] font-sans">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] rounded text-[10px]">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] rounded text-[10px]">↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] rounded text-[10px]">↵</kbd>
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] rounded text-[10px]">Esc</kbd>
                Close
              </span>
            </div>
            <span className="flex items-center gap-1">
              <Command className="w-3 h-3" /> Search
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

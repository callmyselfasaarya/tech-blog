import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, CornerDownLeft, Clock } from 'lucide-react';
import { Article } from '../../types';
import { api } from '../../services/api';

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

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      loadInitial();
    }
  }, [isOpen]);

  const loadInitial = async () => {
    const articles = await api.getArticles();
    setResults(articles.slice(0, 5));
  };

  // Perform instant search
  useEffect(() => {
    if (!isOpen) return;

    const performSearch = async () => {
      if (!query.trim()) {
        const articles = await api.getArticles();
        setResults(articles.slice(0, 5));
      } else {
        const searched = await api.getArticles(undefined, query);
        setResults(searched);
      }
      setSelectedIndex(0);
    };

    performSearch();
  }, [query, isOpen]);

  // Keyboard navigation & global Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }

      if (!isOpen) return;

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
        navigate(`/article/${results[selectedIndex].slug}`);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, navigate]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div data-lenis-prevent className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#121212]/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.15 }}
          className="w-full max-w-2xl bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#333333] rounded-sm shadow-2xl overflow-hidden"
        >
          {/* Input Header Bar */}
          <div className="flex items-center px-4 border-b border-[#E8E5DC] dark:border-[#262626]">
            <Search className="w-5 h-5 text-[#9E9A8E] dark:text-[#6E6E6E] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, topic, tag, or content..."
              className="w-full py-4 px-3 bg-transparent text-base text-[#1A1A1A] dark:text-[#ECECEC] placeholder-[#9E9A8E] dark:placeholder-[#6E6E6E] focus:outline-none font-sans"
            />
            <button
              onClick={onClose}
              className="p-1.5 text-[#9E9A8E] dark:text-[#6E6E6E] hover:text-[#1A1A1A] dark:hover:text-[#ECECEC]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results List */}
          <div data-lenis-prevent className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-[#F3F1EA] dark:divide-[#222222]">
            {results.length === 0 ? (
              <div className="py-12 text-center text-xs font-mono text-[#9E9A8E] dark:text-[#6E6E6E]">
                No articles matching "{query}"
              </div>
            ) : (
              results.map((article, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={article.id}
                    onClick={() => {
                      navigate(`/article/${article.slug}`);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`p-3.5 rounded-sm transition-colors cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#F3F1EA] dark:bg-[#262626]'
                        : 'hover:bg-[#F3F1EA]/50 dark:hover:bg-[#222222]'
                    }`}
                  >
                    <div className="pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono tracking-wider uppercase text-[#9E9A8E] dark:text-[#6E6E6E]">
                          {article.category}
                        </span>
                        <span className="text-xs text-[#9E9A8E] dark:text-[#6E6E6E]">·</span>
                        <span className="text-[10px] font-mono text-[#9E9A8E] dark:text-[#6E6E6E] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readingTime}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg font-medium text-[#1A1A1A] dark:text-[#ECECEC] leading-snug">
                        {article.title}
                      </h4>
                      <p className="text-xs text-[#6B685F] dark:text-[#A0A0A0] line-clamp-1 mt-0.5 font-light">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="shrink-0 text-[#9E9A8E] dark:text-[#6E6E6E]">
                      {isSelected ? <CornerDownLeft className="w-4 h-4 text-[#1A1A1A] dark:text-[#ECECEC]" /> : <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-4 py-2.5 bg-[#F3F1EA] dark:bg-[#141414] border-t border-[#E8E5DC] dark:border-[#262626] flex items-center justify-between text-[11px] font-mono text-[#9E9A8E] dark:text-[#6E6E6E]">
            <div className="flex items-center gap-3">
              <span><kbd className="px-1 py-0.5 bg-[#FAF9F5] dark:bg-[#222] border rounded">↑</kbd> <kbd className="px-1 py-0.5 bg-[#FAF9F5] dark:bg-[#222] border rounded">↓</kbd> navigate</span>
              <span><kbd className="px-1 py-0.5 bg-[#FAF9F5] dark:bg-[#222] border rounded">↵</kbd> select</span>
              <span><kbd className="px-1 py-0.5 bg-[#FAF9F5] dark:bg-[#222] border rounded">esc</kbd> close</span>
            </div>
            <span>{results.length} results</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { api } from '../services/api';

export const NewsletterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    try {
      await api.subscribeNewsletter(email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 6000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-16 font-sans space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4 pb-8 border-b border-[#E1E1E1] dark:border-[#2C2C30]"
      >
        <span className="text-xs font-mono font-bold tracking-widest text-[#3B719F] dark:text-[#5B9AD5] uppercase">
          NEWSLETTER
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1C1E] dark:text-[#F6F5F0] tracking-tight">
          NOTES IN YOUR INBOX
        </h1>
        <p className="text-base sm:text-lg text-[#4C586F] dark:text-[#A0A9B8] leading-relaxed">
          Thoughts on technology, engineering, AI and whatever I'm currently exploring.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="p-8 sm:p-12 rounded-2xl border border-[#E1E1E1] dark:border-[#2C2C30] bg-[#FAF9F5] dark:bg-[#121214] space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#3B719F] uppercase">INBOX DISPATCHES</span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8E7E2] dark:bg-[#202024] text-[11px] font-mono text-[#1C1C1E] dark:text-[#F6F5F0] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              300+ readers
            </span>
          </div>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-mono flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>You're on the list! Thank you for subscribing.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-4 max-w-lg">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:flex-1 px-4 py-3 text-xs font-mono rounded-xl bg-white dark:bg-[#1A1A1E] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-[#3B719F]"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-mono font-bold tracking-wider uppercase text-white bg-[#1C1C1E] dark:bg-[#F6F5F0] dark:text-[#1C1C1E] rounded-xl hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              <p className="text-xs font-mono text-[#6E6E73] dark:text-[#8E8E93]">
                No spam. Just occasional essays and notes.
              </p>
            </form>
          )}
        </div>
      </motion.section>
    </div>
  );
};

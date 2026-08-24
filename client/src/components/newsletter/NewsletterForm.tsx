import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { api } from '../../services/api';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setStatus('error');
      setMessage('Please provide a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await api.subscribeNewsletter(email.trim());
      setStatus('success');
      setMessage(res.message);
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section className="my-16 p-8 sm:p-12 bg-[#F3F1EA] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm">
      <div className="max-w-xl mx-auto text-center">
        <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-[#FAF9F5] dark:bg-[#121212] border border-[#E8E5DC] dark:border-[#333] flex items-center justify-center text-[#1A1A1A] dark:text-[#ECECEC]">
          <Mail className="w-5 h-5" />
        </div>

        <h3 className="font-serif text-3xl font-medium tracking-tight text-[#1A1A1A] dark:text-[#ECECEC] mb-2">
          Stay in the loop
        </h3>
        <p className="text-sm text-[#6B685F] dark:text-[#A0A0A0] leading-relaxed mb-6 font-sans font-light">
          Occasional essays on software engineering, minimalist design, systems thinking, and long-term execution. Sent once every fortnight.
        </p>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-[#FAF9F5] dark:bg-[#121212] border border-green-500/30 rounded-sm text-left flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[#1A1A1A] dark:text-[#ECECEC]">Subscribed successfully!</p>
              <p className="text-xs text-[#6B685F] dark:text-[#A0A0A0] mt-0.5">{message}</p>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Your email address"
                disabled={status === 'loading'}
                className="flex-1 bg-[#FAF9F5] dark:bg-[#121212] border border-[#E8E5DC] dark:border-[#333333] rounded-sm px-4 py-2.5 text-sm text-[#1A1A1A] dark:text-[#ECECEC] placeholder-[#9E9A8E] dark:placeholder-[#6E6E6E] focus:outline-none focus:border-[#1A1A1A] dark:focus:border-[#EEEEEE] transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#333333] dark:bg-[#EEEEEE] dark:hover:bg-[#FFFFFF] text-[#FAF9F5] dark:text-[#121212] font-mono text-xs tracking-wider uppercase font-semibold rounded-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-1.5 text-xs text-red-600 dark:text-red-400 font-sans"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{message}</span>
              </motion.div>
            )}

            <p className="text-[11px] font-mono text-[#9E9A8E] dark:text-[#6E6E6E]">
              No spam. Unsubscribe anytime with one click.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

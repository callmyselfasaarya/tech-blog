import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Twitter, Send, Check } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 600);
  };

  const socialLinks = [
    { label: 'Email', url: 'mailto:hello@example.com', icon: Mail },
    { label: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
    { label: 'GitHub', url: 'https://github.com/callmyselfasaarya', icon: Github },
    { label: 'X (Twitter)', url: 'https://x.com', icon: Twitter },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12 font-sans space-y-12">
      {/* Header Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4 pb-8 border-b border-[#E1E1E1] dark:border-[#2C2C30]"
      >
        <span className="text-xs font-mono font-bold tracking-widest text-[#3B719F] dark:text-[#5B9AD5] uppercase">
          CONTACT
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1C1E] dark:text-[#F6F5F0] tracking-tight">
          LET'S TALK
        </h1>
        <p className="text-base sm:text-lg text-[#4C586F] dark:text-[#A0A9B8] leading-relaxed">
          Have an interesting project, idea or question? I'd love to hear from you.
        </p>

        {/* Direct Links */}
        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full border border-[#E1E1E1] dark:border-[#2C2C30] bg-[#FAF9F5] dark:bg-[#141416] text-[#1C1C1E] dark:text-[#F6F5F0] hover:border-[#3B719F] dark:hover:border-[#5B9AD5] transition-colors"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </motion.section>

      {/* Form Container */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="p-8 sm:p-10 rounded-2xl border border-[#E1E1E1] dark:border-[#2C2C30] bg-[#FAF9F5] dark:bg-[#121214] space-y-6">
          <h2 className="font-serif text-2xl text-[#1C1C1E] dark:text-[#F6F5F0]">
            Send a message
          </h2>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-mono flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Thank you! Your message has been sent. I will get back to you soon.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-[#6E6E73] dark:text-[#8E8E93] uppercase font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 text-xs font-mono rounded-xl bg-white dark:bg-[#1A1A1E] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-[#3B719F]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-[#6E6E73] dark:text-[#8E8E93] uppercase font-semibold">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 text-xs font-mono rounded-xl bg-white dark:bg-[#1A1A1E] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-[#3B719F]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-[#6E6E73] dark:text-[#8E8E93] uppercase font-semibold">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can I help you?"
                  className="w-full px-4 py-3 text-xs font-mono rounded-xl bg-white dark:bg-[#1A1A1E] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-[#3B719F]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 text-xs font-mono font-bold tracking-wider uppercase text-white bg-[#1C1C1E] dark:bg-[#F6F5F0] dark:text-[#1C1C1E] rounded-xl hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Sending...' : 'Send message'}</span>
              </button>
            </form>
          )}
        </div>
      </motion.section>
    </div>
  );
};

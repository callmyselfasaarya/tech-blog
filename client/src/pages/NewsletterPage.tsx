import React, { useState } from 'react';
import { BlurFade } from '../components/ui/BlurFade';
import { Mail, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { TechniccalWordmarkLogo } from '../components/ui/TechniccalLogo';

export const NewsletterPage: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Weekly Dispatch Newsletter — Techniccal';
  }, []);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const perks = [
    { title: 'Zero Hype, High Signal', desc: 'No fluff or clickbait. Only architectural benchmarks, code snippets, and system design patterns.' },
    { title: 'Weekly Technical Deep-Dives', desc: 'Delivered every Tuesday morning directly to 25,000+ senior engineers and software architects.' },
    { title: 'Exclusive Code Repositories', desc: 'Access private GitHub benchmark repositories and Docker Compose templates.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10">
      {/* Header Banner */}
      <section className="mb-12 text-center max-w-2xl mx-auto space-y-4">
        <BlurFade delay={0.05} yOffset={12}>
          <div className="inline-block px-4 py-1 rounded-full bg-[#EAE7E2]/90 dark:bg-[#222225] border border-[#E1DDD7] dark:border-[#2C2C30] text-[13px] font-sans font-medium text-[#222120] dark:text-[#A0A9B8]">
            Techniccal Dispatch
          </div>
        </BlurFade>

        <BlurFade delay={0.12} yOffset={18}>
          <h1 className="font-display font-semibold text-4xl sm:text-6xl text-[#1C1C1E] dark:text-[#F6F5F0] tracking-tight">
            The Weekly Engineering Dispatch
          </h1>
        </BlurFade>

        <BlurFade delay={0.2} yOffset={16}>
          <p className="text-base sm:text-lg text-[#4C586F] dark:text-[#A0A9B8] font-sans leading-relaxed">
            Join 25,000+ engineers, software architects, and tech leads getting weekly insights on distributed systems, AI infrastructure, and developer tooling.
          </p>
        </BlurFade>
      </section>

      {/* Subscribe Hero Card */}
      <BlurFade delay={0.28} yOffset={20}>
        <div className="bg-[#E8E7E2]/50 dark:bg-[#222225] p-8 sm:p-14 rounded-3xl border border-[#E1E1E1] dark:border-[#2C2C30] text-center max-w-3xl mx-auto mb-16 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#141416] flex items-center justify-center mx-auto mb-6 text-[#1C1C1E] dark:text-white shadow-xs">
            <Mail className="w-6 h-6" />
          </div>

          <h2 className="font-display font-semibold text-2xl sm:text-3xl text-[#1C1C1E] dark:text-[#F6F5F0] mb-6">
            Subscribe to Techniccal Dispatch
          </h2>

          <div className="max-w-md mx-auto">
            {subscribed ? (
              <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs rounded-2xl font-medium">
                Welcome! You are now subscribed to the Techniccal Weekly Dispatch.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full sm:w-80 px-5 py-3 text-sm rounded-2xl bg-white dark:bg-[#141416] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#9E9A8E] focus:outline-none focus:ring-1 focus:ring-[#1C1C1E] shadow-xs"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#1C1C1E] dark:bg-white text-white dark:text-[#1C1C1E] font-medium text-sm px-8 py-3 rounded-2xl hover:opacity-90 transition-opacity cursor-pointer shrink-0 shadow-xs"
                >
                  Subscribe
                </button>
              </form>
            )}
            <p className="mt-3.5 text-xs text-[#7E8798] dark:text-[#6B7485] font-sans">
              No spam. One-click unsubscribe at any time.
            </p>
          </div>
        </div>
      </BlurFade>

      {/* Dispatch Perks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {perks.map((p, idx) => (
          <BlurFade key={p.title} delay={0.35 + idx * 0.08} yOffset={16}>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] shadow-xs space-y-3 h-full">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              <h3 className="font-display font-semibold text-base text-[#1C1C1E] dark:text-[#F6F5F0]">
                {p.title}
              </h3>
              <p className="text-xs text-[#4C586F] dark:text-[#A0A9B8] leading-relaxed">
                {p.desc}
              </p>
            </div>
          </BlurFade>
        ))}
      </div>

      <div className="text-center pt-6">
        <TechniccalWordmarkLogo size="md" />
      </div>
    </div>
  );
};

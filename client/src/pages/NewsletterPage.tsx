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
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 font-sans">
      {/* Header Banner */}
      <section className="mb-12 text-center max-w-2xl mx-auto space-y-4">
        <BlurFade delay={0.05} yOffset={12}>
          <div className="inline-block px-4 py-1 rounded-full bg-[#F2F1EC] dark:bg-[#18181B] border border-[#E7E6E1] dark:border-[#27272A] text-xs font-sans font-medium text-[#121214] dark:text-[#FAFAFA]">
            Techniccal Dispatch
          </div>
        </BlurFade>

        <BlurFade delay={0.12} yOffset={18}>
          <h1 className="font-display font-semibold text-4xl sm:text-6xl text-[#121214] dark:text-[#FAFAFA] tracking-tight">
            The Weekly Engineering Dispatch
          </h1>
        </BlurFade>

        <BlurFade delay={0.2} yOffset={16}>
          <p className="text-base sm:text-lg text-[#4A4A52] dark:text-[#A1A1AA] font-sans leading-relaxed">
            Join 25,000+ engineers, software architects, and tech leads getting weekly insights on distributed systems, AI infrastructure, and developer tooling.
          </p>
        </BlurFade>
      </section>

      {/* Subscribe Hero Card */}
      <BlurFade delay={0.28} yOffset={20}>
        <div className="bg-[#F2F1EC] dark:bg-[#18181B] p-8 sm:p-14 rounded-3xl border border-[#E7E6E1] dark:border-[#27272A] text-center max-w-3xl mx-auto mb-16 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#09090B] border border-[#E7E6E1] dark:border-[#27272A] flex items-center justify-center mx-auto mb-6 text-[#121214] dark:text-white shadow-xs">
            <Mail className="w-6 h-6 text-[#2563EB] dark:text-[#3B82F6]" />
          </div>

          <h2 className="font-display font-semibold text-2xl sm:text-3xl text-[#121214] dark:text-[#FAFAFA] mb-6">
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
                  className="w-full sm:w-80 px-5 py-3 text-sm rounded-2xl bg-white dark:bg-[#09090B] border border-[#E7E6E1] dark:border-[#27272A] text-[#121214] dark:text-[#FAFAFA] placeholder-[#74747E] focus:outline-none focus:ring-1 focus:ring-[#121214] dark:focus:ring-white shadow-xs"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#121214] dark:bg-white text-white dark:text-[#121214] font-medium text-sm px-8 py-3 rounded-2xl hover:opacity-90 transition-opacity cursor-pointer shrink-0 shadow-xs"
                >
                  Subscribe
                </button>
              </form>
            )}
            <p className="mt-3.5 text-xs text-[#74747E] font-sans">
              No spam. One-click unsubscribe at any time.
            </p>
          </div>
        </div>
      </BlurFade>

      {/* Dispatch Perks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {perks.map((p, idx) => (
          <BlurFade key={p.title} delay={0.35 + idx * 0.08} yOffset={16}>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#18181B] border border-[#E7E6E1] dark:border-[#27272A] shadow-xs space-y-3 h-full">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-display font-semibold text-base text-[#121214] dark:text-[#FAFAFA]">
                {p.title}
              </h3>
              <p className="text-xs text-[#4A4A52] dark:text-[#A1A1AA] leading-relaxed">
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

import React, { useState } from 'react';
import { BlurFade } from '../components/ui/BlurFade';

export const About: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  const quickFireFacts = [
    { label: 'Based in', value: 'India' },
    { label: 'Current project', value: 'Building AI Agents for Myself' },
    { label: 'First win', value: 'Existing' },
    { label: 'Tools I can\'t quit', value: 'Notion, Canva, Github & React' },
    { label: 'Writing vibe', value: 'Off-beat but honest' },
    { label: 'Coffee order', value: '' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
      {/* Top Section: Who's writing + Headline + Bio + Signature + Portrait Photo */}
      <section className="pb-16 border-b border-[#E1E1E1] dark:border-[#2C2C30]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <BlurFade delay={0.05} yOffset={12}>
              <div className="inline-block px-3.5 py-1 rounded-full bg-[#EAE7E2]/90 dark:bg-[#222225] border border-[#E1DDD7] dark:border-[#2C2C30] text-[13px] font-sans font-medium text-[#222120] dark:text-[#A0A9B8]">
                About the Developer
              </div>
            </BlurFade>

            <BlurFade delay={0.12} yOffset={18}>
              <h1 className="font-display font-thin text-5xl sm:text-6xl text-[#1C1C1E] dark:text-[#F6F5F0] tracking-[-0.04em] leading-[1.05]">
                Hey, I'm Aarya.
              </h1>
            </BlurFade>

            <BlurFade delay={0.2} yOffset={18}>
              <div className="space-y-4 text-base sm:text-[17px] text-[#4C586F] dark:text-[#A0A9B8] font-sans leading-relaxed">
                <p>
                  I'm a writer and digital creator sharing what I learn about building an independent career online. Most of what I publish comes from testing ideas, making mistakes, and finding what works—one project at a time.
                </p>
                <p>
                  I started out writing as a side project, but after a few small wins (and a lot of failures), I turned it into my main thing. Now I focus on helping other creators do the same, without the hype or sugarcoating.
                </p>
              </div>
            </BlurFade>

            {/* Handwritten Signature */}
            <BlurFade delay={0.28} yOffset={14}>
              <div className="pt-2">
                <span className="font-signature text-xl sm:text-7xl text-[#1C1C1E] dark:text-[#F6F5F0] select-none leading-none">
                  Aarya
                </span>
              </div>
            </BlurFade>
          </div>

          {/* Right Portrait Image */}
          <div className="lg:col-span-5">
            <BlurFade delay={0.25} yOffset={24}>
              <div className="overflow-hidden rounded-3xl border border-[#E1E1E1] dark:border-[#2C2C30] bg-[#E8E7E2] dark:bg-[#222225] aspect-[4/3] lg:aspect-[1/1.1] shadow-sm">
                <img
                  src="/Aarya.jpeg"
                  alt="Aarya"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Middle Section: Quick-fire facts */}
      <section className="py-16 border-b border-[#E1E1E1] dark:border-[#2C2C30]">
        <BlurFade delay={0.35} yOffset={18}>
          <h2 className="font-display font-semibold text-3xl text-[#1C1C1E] dark:text-[#F6F5F0] tracking-[-0.03em] mb-8">
            Quick-fire facts
          </h2>
        </BlurFade>

        <div className="divide-y divide-[#E1E1E1] dark:divide-[#2C2C30] border-t border-b border-[#E1E1E1] dark:border-[#2C2C30]">
          {quickFireFacts.map((fact, idx) => (
            <BlurFade key={fact.label} delay={0.38 + idx * 0.05} yOffset={12}>
              <div className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm sm:text-base">
                <span className="font-sans text-[#7E8798] dark:text-[#A0A9B8]">
                  {fact.label}
                </span>
                <span className="font-sans font-medium text-[#1C1C1E] dark:text-[#F6F5F0]">
                  {fact.value}
                </span>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Bottom Hero Section: Mission Banner & Subscribe */}
      <section className="pt-16">
        <BlurFade delay={0.5} yOffset={24}>
          <div className="bg-[#E8E7E2]/50 dark:bg-[#222225] p-8 sm:p-16 rounded-3xl border border-[#E1E1E1] dark:border-[#2C2C30] text-center max-w-4xl mx-auto shadow-xs">
            <div className="inline-block px-3.5 py-1 mb-6 rounded-full bg-white dark:bg-[#141416] border border-[#E1E1E1] dark:border-[#2C2C30] text-xs font-sans font-medium text-[#4C586F] dark:text-[#A0A9B8]">
              My mission is to
            </div>

            <h2 className="font-display font-semibold text-4xl sm:text-6xl text-[#1C1C1E] dark:text-[#F6F5F0] tracking-[-0.04em] leading-[1.08] max-w-2xl mx-auto mb-8">
              Help you create and
              <br />
              earn on <span className="font-serif-italic font-normal italic pr-1">your</span> terms.
            </h2>

            {/* Subscribe Form Box */}
            <div className="max-w-md mx-auto">
              {subscribed ? (
                <div className="p-3.5 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs rounded-2xl font-medium">
                  Subscribed to Techniccal Weekly Dispatch!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full sm:w-72 px-5 py-3 text-sm rounded-2xl bg-white dark:bg-[#141416] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#9E9A8E] focus:outline-none focus:ring-1 focus:ring-[#1C1C1E] shadow-xs"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#1C1C1E] dark:bg-white text-white dark:text-[#1C1C1E] font-medium text-sm px-7 py-3 rounded-2xl hover:opacity-90 transition-opacity cursor-pointer shrink-0 shadow-xs"
                  >
                    Subscribe
                  </button>
                </form>
              )}
              <p className="mt-3 text-xs text-[#7E8798] dark:text-[#6B7485] font-sans">
                No spam, unsubscribe anytime.
              </p>
            </div>
          </div>
        </BlurFade>
      </section>
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  const quickFacts = [
    { label: 'Based in', value: 'London' },
    { label: 'Current project', value: 'Building a course for writers' },
    { label: 'First win', value: '100 email subscribers in 30 days' },
    { label: 'Tools I can\'t quit', value: 'Notion' },
    { label: 'Writing vibe', value: 'Coffee with a friend' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto px-4 sm:px-8 py-10"
    >
      {/* Top Header & Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Text Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#EDEAE7] dark:bg-[#201E1D] border border-[#E8E4DF] dark:border-[#2C2927] text-xs font-sans font-medium text-[#6E6862] dark:text-[#A8A29A]">
            Who's writing
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-[#1A1918] dark:text-[#F4F2F0] tracking-tight">
            Hey, I'm Skylar.
          </h1>

          <div className="space-y-4 text-base text-[#6E6862] dark:text-[#A8A29A] leading-relaxed font-sans">
            <p>
              I'm a writer and digital creator sharing what I learn about building an independent career online. Most of what I publish comes from testing ideas, making mistakes, and finding what works—one project at a time.
            </p>
            <p>
              I started out writing as a side project, but after a few small wins (and a lot of failures), I turned it into my main thing. Now I focus on helping other creators do the same, without the hype or sugarcoating.
            </p>
          </div>

          {/* Cursive Signature SVG */}
          <div className="pt-2">
            <svg
              className="w-36 h-14 text-[#1A1918] dark:text-[#F4F2F0]"
              viewBox="0 0 200 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 50 Q 35 15, 45 40 T 70 30 T 90 55 T 110 35 T 130 50 T 150 30 T 175 45" />
            </svg>
          </div>
        </div>

        {/* Right Column: Large Portrait Image */}
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-2xl border border-[#EDEAE7] dark:border-[#2C2927] shadow-sm bg-white dark:bg-[#201E1D] aspect-[4/5]">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
              alt="Skylar Rowe"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Quick-fire facts Section */}
      <section className="mt-16">
        <h2 className="font-display font-extrabold text-2xl text-[#1A1918] dark:text-[#F4F2F0] mb-6">
          Quick-fire facts
        </h2>

        <div className="divide-y divide-[#EDEAE7] dark:divide-[#2C2927] border-t border-b border-[#EDEAE7] dark:border-[#2C2927]">
          {quickFacts.map((fact) => (
            <div key={fact.label} className="py-3.5 flex items-center justify-between text-sm">
              <span className="font-sans text-[#6E6862] dark:text-[#A8A29A]">
                {fact.label}
              </span>
              <span className="font-sans font-medium text-[#1A1918] dark:text-[#F4F2F0]">
                {fact.value}
              </span>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

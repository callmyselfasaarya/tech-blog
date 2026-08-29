import React from 'react';
import { BlurFade } from '../components/ui/BlurFade';
import { TechniccalLogo } from '../components/ui/TechniccalLogo';
import { Terminal, Shield, Cpu, BookOpen, Layers, Users } from 'lucide-react';

export const About: React.FC = () => {
  const principles = [
    { title: 'Technical Rigor', desc: 'Every dispatch is grounded in actual production engineering practice, real benchmarks, and proven software architecture.' },
    { title: 'Signal Over Hype', desc: 'We ignore temporary tech trends and focus on core principles, scalable infrastructure, and enduring engineering knowledge.' },
    { title: 'Architectural Depth', desc: 'We examine the internal trade-offs, failure modes, and low-level mechanics of systems rather than surface-level overviews.' },
    { title: 'Open Knowledge', desc: 'Knowledge is meant to be shared. We publish detailed code blueprints, structural diagrams, and accessible research dispatches.' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 font-sans space-y-16">
      {/* 30. MANIFESTO HEADLINE */}
      <section className="text-center space-y-6 pt-4 pb-12 border-b border-[#E1E1E1] dark:border-[#2C2C30]">
        <BlurFade delay={0.05} yOffset={12}>
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#3B719F] uppercase bg-[#E8E7E2] dark:bg-[#252528] px-3 py-1 rounded border border-[#E1E1E1] dark:border-[#2C2C30]">
            EDITORIAL MANIFESTO // ABOUT TECHNICALL
          </span>
        </BlurFade>

        <BlurFade delay={0.1} yOffset={16}>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#1C1C1E] dark:text-[#F6F5F0] tracking-tight max-w-4xl mx-auto leading-[1.08]">
            We publish the engineering knowledge worth keeping.
          </h1>
        </BlurFade>

        <BlurFade delay={0.15} yOffset={16}>
          <p className="text-lg sm:text-xl text-[#4C586F] dark:text-[#A0A9B8] font-serif max-w-2xl mx-auto leading-relaxed">
            Techniccal is an independent engineering journal and technical knowledge platform built for developers, software architects, and systems engineers.
          </p>
        </BlurFade>
      </section>

      {/* MISSION & EDITORIAL PHILOSOPHY */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <BlurFade delay={0.2} yOffset={16}>
          <div className="space-y-4 p-6 rounded-lg bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] shadow-xs">
            <div className="w-10 h-10 rounded bg-[#F6F5F0] dark:bg-[#1C1C1E] flex items-center justify-center text-[#3B719F]">
              <Terminal className="w-5 h-5" />
            </div>
            <h2 className="font-display font-bold text-2xl text-[#1C1C1E] dark:text-[#F6F5F0]">
              Our Mission
            </h2>
            <p className="text-sm text-[#4C586F] dark:text-[#A0A9B8] font-serif leading-relaxed">
              Software engineering is suffering from an overflow of superficial tutorials and high-hype marketing. Techniccal was founded to provide deep, high-signal technical writing that respects the reader's intelligence and time.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.25} yOffset={16}>
          <div className="space-y-4 p-6 rounded-lg bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] shadow-xs">
            <div className="w-10 h-10 rounded bg-[#F6F5F0] dark:bg-[#1C1C1E] flex items-center justify-center text-[#3B719F]">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="font-display font-bold text-2xl text-[#1C1C1E] dark:text-[#F6F5F0]">
              Editorial Philosophy
            </h2>
            <p className="text-sm text-[#4C586F] dark:text-[#A0A9B8] font-serif leading-relaxed">
              We treat software engineering as an exact craft. Our dispatches focus on practical system architecture, distributed databases, compiler optimizations, LLM inference mechanics, and career growth for senior builders.
            </p>
          </div>
        </BlurFade>
      </section>

      {/* PRINCIPLES GRID */}
      <section className="space-y-8">
        <div className="pb-4 border-b border-[#E1E1E1] dark:border-[#2C2C30]">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#3B719F] uppercase">FOUNDATIONAL VALUES</span>
          <h2 className="font-display font-bold text-3xl text-[#1C1C1E] dark:text-[#F6F5F0]">EDITORIAL PRINCIPLES</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {principles.map((p, idx) => (
            <BlurFade key={p.title} delay={0.05 * idx}>
              <div className="p-6 rounded-lg bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] space-y-2 h-full">
                <span className="text-xs font-mono font-bold text-[#3B719F]">0{idx + 1} //</span>
                <h3 className="font-display font-bold text-lg text-[#1C1C1E] dark:text-[#F6F5F0]">
                  {p.title}
                </h3>
                <p className="text-xs text-[#4C586F] dark:text-[#A0A9B8] font-sans leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* WHAT WE COVER */}
      <section className="p-8 rounded-lg bg-[#E8E7E2]/60 dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#3B719F] uppercase">DOMAINS // SCOPE</span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#1C1C1E] dark:text-[#F6F5F0]">WHAT WE COVER</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs text-[#4C586F] dark:text-[#A0A9B8]">
          <div className="space-y-2">
            <span className="font-bold text-[#1C1C1E] dark:text-[#F6F5F0]">01. AI SYSTEMS</span>
            <p className="font-sans text-xs">LLM inference optimization, GPU memory management, vector indexing, RAG pipelines, agentic execution.</p>
          </div>
          <div className="space-y-2">
            <span className="font-bold text-[#1C1C1E] dark:text-[#F6F5F0]">02. SOFTWARE ARCHITECTURE</span>
            <p className="font-sans text-xs">High-throughput microservices, distributed consensus algorithms, database internals, API design.</p>
          </div>
          <div className="space-y-2">
            <span className="font-bold text-[#1C1C1E] dark:text-[#F6F5F0]">03. ENGINEERING CULTURE</span>
            <p className="font-sans text-xs">Staff+ engineering roles, tech leadership, architectural decision records (ADRs), system design interviews.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

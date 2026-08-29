import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Twitter, Mail } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 font-sans space-y-16">
      {/* Header & Portrait */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-12 border-b border-[#E1E1E1] dark:border-[#2C2C30]"
      >
        <div className="md:col-span-8 space-y-6">
          <span className="text-xs font-mono font-bold tracking-widest text-[#3B719F] dark:text-[#5B9AD5] uppercase">
            BIOGRAPHY
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1C1E] dark:text-[#F6F5F0] tracking-tight">
            About me
          </h1>
          <p className="text-lg sm:text-xl text-[#4C586F] dark:text-[#A0A9B8] font-sans leading-relaxed">
            Software engineer, AI builder, and technical writer based in Tamil Nadu. Exploring systems, artificial intelligence, and software craftsmanship.
          </p>
        </div>

        {/* Editorial Portrait Area */}
        <div className="md:col-span-4 space-y-2">
          <div className="aspect-[4/5] rounded-xl overflow-hidden border border-[#E1E1E1] dark:border-[#2C2C30] bg-[#E8E7E2] dark:bg-[#1A1A1D]">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
              alt="Techniccal"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <p className="text-[11px] font-mono text-[#6E6E73] dark:text-[#8E8E93] text-center">
            Techniccal — Engineering & Blog
          </p>
        </div>
      </motion.section>

      {/* Sections Grid */}
      <div className="space-y-12">
        {/* 1. Who I am */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-[#3B719F] dark:text-[#5B9AD5] uppercase">
            01 / WHO I AM
          </span>
          <h2 className="font-serif text-2xl text-[#1C1C1E] dark:text-[#F6F5F0]">
            Who I am
          </h2>
          <p className="text-base text-[#4C586F] dark:text-[#A0A9B8] font-sans leading-relaxed max-w-3xl">
            I am a developer who believes software should be simple, performant, and human-centric. Over the past several years, I have worked on distributed backend services, full-stack web applications, and artificial intelligence projects.
          </p>
        </motion.section>

        {/* 2. What I do */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-[#3B719F] dark:text-[#5B9AD5] uppercase">
            02 / WHAT I DO
          </span>
          <h2 className="font-serif text-2xl text-[#1C1C1E] dark:text-[#F6F5F0]">
            What I do
          </h2>
          <p className="text-base text-[#4C586F] dark:text-[#A0A9B8] font-sans leading-relaxed max-w-3xl">
            I build software products, research agentic AI systems, write technical dispatches, and consult on system architecture. My primary goal is bridging deep technical rigor with intuitive editorial design.
          </p>
        </motion.section>

        {/* 3. What I'm interested in */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-[#3B719F] dark:text-[#5B9AD5] uppercase">
            03 / INTERESTS
          </span>
          <h2 className="font-serif text-2xl text-[#1C1C1E] dark:text-[#F6F5F0]">
            What I'm interested in
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-mono text-[#4C586F] dark:text-[#A0A9B8]">
            <li className="p-3 rounded-lg border border-[#E1E1E1] dark:border-[#2C2C30] bg-[#FAF9F5] dark:bg-[#141416]">
              • LLM Inference & Vector Retrieval
            </li>
            <li className="p-3 rounded-lg border border-[#E1E1E1] dark:border-[#2C2C30] bg-[#FAF9F5] dark:bg-[#141416]">
              • High-Throughput Distributed Systems
            </li>
            <li className="p-3 rounded-lg border border-[#E1E1E1] dark:border-[#2C2C30] bg-[#FAF9F5] dark:bg-[#141416]">
              • Developer Tooling & Compilers
            </li>
            <li className="p-3 rounded-lg border border-[#E1E1E1] dark:border-[#2C2C30] bg-[#FAF9F5] dark:bg-[#141416]">
              • Editorial Design & Typography
            </li>
          </ul>
        </motion.section>

        {/* 4. What I'm building */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-[#3B719F] dark:text-[#5B9AD5] uppercase">
            04 / BUILDING
          </span>
          <h2 className="font-serif text-2xl text-[#1C1C1E] dark:text-[#F6F5F0]">
            What I'm building
          </h2>
          <p className="text-base text-[#4C586F] dark:text-[#A0A9B8] font-sans leading-relaxed max-w-3xl">
            Currently working on open-source AI retrieval libraries, personal writing tools, and an experimental React architecture for high-signal technical publications.
          </p>
        </motion.section>

        {/* 5. Currently learning */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-[#3B719F] dark:text-[#5B9AD5] uppercase">
            05 / LEARNING
          </span>
          <h2 className="font-serif text-2xl text-[#1C1C1E] dark:text-[#F6F5F0]">
            Currently learning
          </h2>
          <p className="text-base text-[#4C586F] dark:text-[#A0A9B8] font-sans leading-relaxed max-w-3xl">
            Diving deep into Rust memory safety guarantees, GPU kernels for matrix multiplication, and spatial typography.
          </p>
        </motion.section>

        {/* 6. Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pt-8 border-t border-[#E1E1E1] dark:border-[#2C2C30] space-y-4"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-[#3B719F] dark:text-[#5B9AD5] uppercase">
            06 / GET IN TOUCH
          </span>
          <h2 className="font-serif text-2xl text-[#1C1C1E] dark:text-[#F6F5F0]">
            Contact
          </h2>
          <p className="text-sm text-[#4C586F] dark:text-[#A0A9B8]">
            Want to collaborate, discuss a project, or say hello? Reach out via{' '}
            <Link to="/contact" className="underline text-[#1C1C1E] dark:text-[#F6F5F0] font-semibold">
              the contact page →
            </Link>
          </p>
        </motion.section>
      </div>
    </div>
  );
};

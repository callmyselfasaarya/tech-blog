import React from 'react';
import { BlurFade } from '../components/ui/BlurFade';
import { Terminal, Wrench, Code2, Cpu, Server, Database, ArrowUpRight } from 'lucide-react';

export const ToolsPage: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Developer Tools & Stack — Techniccal';
  }, []);
  const toolCategories = [
    {
      name: 'Languages & Runtimes',
      icon: Terminal,
      tools: [
        { name: 'Go (Golang)', desc: 'High-concurrency systems programming runtime', tag: 'Language', link: 'https://go.dev' },
        { name: 'Rust', desc: 'Memory-safe zero-cost abstraction language', tag: 'Language', link: 'https://rust-lang.org' },
        { name: 'Node.js / TypeScript', desc: 'Event-driven JavaScript runtime and static typing', tag: 'Runtime', link: 'https://typescriptlang.org' },
      ],
    },
    {
      name: 'AI & Inference Engines',
      icon: Cpu,
      tools: [
        { name: 'Ollama', desc: 'Local LLM runner for Llama3, Qwen, and DeepSeek models', tag: 'AI Engine', link: 'https://ollama.com' },
        { name: 'vLLM', desc: 'High-throughput PagedAttention LLM inference server', tag: 'Inference', link: 'https://vllm.ai' },
        { name: 'Qdrant', desc: 'Vector database for production neural search & RAG', tag: 'Vector DB', link: 'https://qdrant.tech' },
      ],
    },
    {
      name: 'Distributed Systems & Data',
      icon: Database,
      tools: [
        { name: 'Apache Kafka', desc: 'Distributed event streaming platform', tag: 'Streaming', link: 'https://kafka.apache.org' },
        { name: 'Redis Streams', desc: 'In-memory data structure store & pub/sub engine', tag: 'In-Memory', link: 'https://redis.io' },
        { name: 'PostgreSQL', desc: 'Advanced open-source relational database with pgvector', tag: 'Database', link: 'https://postgresql.org' },
      ],
    },
    {
      name: 'Developer Environment',
      icon: Code2,
      tools: [
        { name: 'Neovim / LazyVim', desc: 'Hyper-extensible Lua-based text editor', tag: 'IDE', link: 'https://neovim.io' },
        { name: 'Docker & OrbStack', desc: 'Lightweight fast container virtualization', tag: 'Containers', link: 'https://docker.com' },
        { name: 'Postman & Bruno', desc: 'Fast API testing and endpoint debugging', tag: 'API Tool', link: 'https://usebruno.com' },
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
      {/* Header Banner */}
      <section className="mb-14 text-center max-w-3xl mx-auto space-y-4">
        <BlurFade delay={0.05} yOffset={12}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8E7E2] dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] text-xs font-mono font-medium text-[#4C586F] dark:text-[#A0A9B8]">
            <Wrench className="w-4 h-4 text-[#3B719F]" />
            <span>/tools</span>
          </div>
        </BlurFade>

        <BlurFade delay={0.12} yOffset={18}>
          <h1 className="font-display font-semibold text-4xl sm:text-6xl text-[#1C1C1E] dark:text-[#F6F5F0] tracking-tight">
            Developer Stack & Tools
          </h1>
        </BlurFade>

        <BlurFade delay={0.2} yOffset={16}>
          <p className="text-base sm:text-lg text-[#4C586F] dark:text-[#A0A9B8] font-sans leading-relaxed">
            A curated inventory of the open-source libraries, compilers, inference engines, and developer tools used to write Techniccal benchmarks.
          </p>
        </BlurFade>
      </section>

      {/* Tools Category Grid */}
      <div className="space-y-12">
        {toolCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <BlurFade key={cat.name} delay={0.25 + idx * 0.1} yOffset={18}>
              <div>
                <div className="flex items-center gap-2.5 mb-6 pb-2 border-b border-[#E1E1E1] dark:border-[#2C2C30]">
                  <Icon className="w-5 h-5 text-[#1C1C1E] dark:text-[#F6F5F0]" />
                  <h2 className="font-display font-semibold text-xl text-[#1C1C1E] dark:text-[#F6F5F0]">
                    {cat.name}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {cat.tools.map((t) => (
                    <a
                      key={t.name}
                      href={t.link}
                      target="_blank"
                      rel="noreferrer"
                      className="p-5 rounded-2xl bg-white dark:bg-[#222225] border border-[#E1E1E1] dark:border-[#2C2C30] hover:shadow-md transition-all group flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#E8E7E2] dark:bg-[#141416] text-[#4C586F] dark:text-[#A0A9B8]">
                            {t.tag}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-[#7E8798] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                        <h3 className="font-display font-semibold text-base text-[#1C1C1E] dark:text-[#F6F5F0] group-hover:text-[#3B719F] transition-colors">
                          {t.name}
                        </h3>
                        <p className="text-xs text-[#4C586F] dark:text-[#A0A9B8] leading-relaxed">
                          {t.desc}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </BlurFade>
          );
        })}
      </div>
    </div>
  );
};

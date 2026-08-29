import React from 'react';
import { BlurFade } from '../components/ui/BlurFade';
import { Terminal, Wrench, Code2, Cpu, Database, ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/Badge';

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
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 font-sans">
      {/* Header Banner */}
      <section className="mb-14 text-center max-w-3xl mx-auto space-y-4">
        <BlurFade delay={0.05} yOffset={12}>
          <Badge variant="pinned" className="px-4 py-1.5 text-xs font-mono font-medium rounded-full bg-[#F2F1EC] dark:bg-[#18181B] text-[#121214] dark:text-[#FAFAFA] border border-[#E7E6E1] dark:border-[#27272A]">
            <Wrench className="w-4 h-4 mr-1 text-[#2563EB] dark:text-[#3B82F6]" />
            <span>/tools</span>
          </Badge>
        </BlurFade>

        <BlurFade delay={0.12} yOffset={18}>
          <h1 className="font-display font-semibold text-4xl sm:text-6xl text-[#121214] dark:text-[#FAFAFA] tracking-tight">
            Developer Stack & Tools
          </h1>
        </BlurFade>

        <BlurFade delay={0.2} yOffset={16}>
          <p className="text-base sm:text-lg text-[#4A4A52] dark:text-[#A1A1AA] font-sans leading-relaxed">
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
                <div className="flex items-center gap-2.5 mb-6 pb-2 border-b border-[#E7E6E1] dark:border-[#27272A]">
                  <Icon className="w-5 h-5 text-[#121214] dark:text-[#FAFAFA]" />
                  <h2 className="font-display font-semibold text-xl text-[#121214] dark:text-[#FAFAFA]">
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
                      className="group block"
                    >
                      <Card className="p-5 border-[#E7E6E1] dark:border-[#27272A] bg-white dark:bg-[#18181B] hover:border-[#121214]/30 dark:hover:border-white/30 hover:shadow-md transition-all rounded-2xl h-full">
                        <CardContent className="p-0 space-y-2.5 flex flex-col justify-between h-full">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="secondary" className="text-[10px] bg-[#F2F1EC] dark:bg-[#09090B] text-[#121214] dark:text-[#FAFAFA] border border-[#E7E6E1] dark:border-[#27272A]">
                                {t.tag}
                              </Badge>
                              <ArrowUpRight className="w-4 h-4 text-[#74747E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                            <h3 className="font-display font-semibold text-base text-[#121214] dark:text-[#FAFAFA] group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6] transition-colors">
                              {t.name}
                            </h3>
                          </div>
                          <p className="text-xs text-[#4A4A52] dark:text-[#A1A1AA] leading-relaxed">
                            {t.desc}
                          </p>
                        </CardContent>
                      </Card>
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

import React, { useState } from 'react';
import { BlurFade } from '../components/ui/BlurFade';
import { 
  Wrench, 
  Code2, 
  Server, 
  ShieldCheck, 
  Sparkles, 
  LayoutGrid, 
  Table as TableIcon 
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/Badge';

interface StackRow {
  layer: string;
  tech: string;
  pattern: string;
  category: string;
}

export const ToolsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Developer Stack & Tools — Techniccal';
  }, []);

  const stackData: StackRow[] = [
    // Frontend & UI
    { layer: 'Language', tech: 'TypeScript', pattern: 'Your default language across frontend + backend', category: 'Frontend & User Interface' },
    { layer: 'Frontend', tech: 'React 19', pattern: 'Your primary UI framework', category: 'Frontend & User Interface' },
    { layer: 'Build', tech: 'Vite', pattern: 'Frequently paired with React', category: 'Frontend & User Interface' },
    { layer: 'Styling', tech: 'Tailwind CSS', pattern: 'Your usual styling system', category: 'Frontend & User Interface' },
    { layer: 'Animations', tech: 'Framer Motion / Motion', pattern: 'Used for premium interactions and transitions', category: 'Frontend & User Interface' },
    { layer: 'Icons', tech: 'Lucide React', pattern: 'Repeatedly used in your UI', category: 'Frontend & User Interface' },
    { layer: 'Server State', tech: 'TanStack Query', pattern: 'Used when dealing with API/server state', category: 'Frontend & User Interface' },

    // Backend & Architecture
    { layer: 'Backend', tech: 'Node.js', pattern: 'Your standard backend runtime', category: 'Backend & System Architecture' },
    { layer: 'API', tech: 'Express / NestJS', pattern: 'Express for simpler systems; NestJS for more serious architecture', category: 'Backend & System Architecture' },
    { layer: 'Database', tech: 'MongoDB + Mongoose', pattern: 'Your most common database combination', category: 'Backend & System Architecture' },
    { layer: 'Architecture', tech: 'REST APIs + modular backend', pattern: 'Your most common backend approach', category: 'Backend & System Architecture' },

    // Authentication & Realtime
    { layer: 'Authentication', tech: 'JWT + Passport', pattern: 'Especially in your structured backends', category: 'Auth, Security & Realtime' },
    { layer: 'Security', tech: 'Helmet + rate limiting + bcrypt', pattern: 'Particularly in your NestJS architecture', category: 'Auth, Security & Realtime' },
    { layer: 'Realtime', tech: 'Socket.IO', pattern: 'A recurring choice for live applications', category: 'Auth, Security & Realtime' },
    { layer: 'Realtime alternative', tech: 'Supabase Realtime', pattern: "You've explored this for spectator/live broadcasting", category: 'Auth, Security & Realtime' },

    // Visual & Content Systems
    { layer: '3D / visual tech', tech: 'Three.js', pattern: 'For high-impact interactive hero experiences', category: 'Visual & Content Systems' },
    { layer: 'CMS', tech: 'Sanity Studio', pattern: 'Used in your publication/content-platform work', category: 'Visual & Content Systems' },
  ];

  const categories = [
    { name: 'Frontend & User Interface', icon: Code2 },
    { name: 'Backend & System Architecture', icon: Server },
    { name: 'Auth, Security & Realtime', icon: ShieldCheck },
    { name: 'Visual & Content Systems', icon: Sparkles },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 font-sans">
      {/* Header Banner */}
      <section className="mb-12 text-center max-w-3xl mx-auto space-y-4">
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
            Primary technology choices, core architecture patterns, and tools used across engineering projects.
          </p>
        </BlurFade>

        {/* View Toggle */}
        <BlurFade delay={0.25} yOffset={12}>
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors border ${
                viewMode === 'grid'
                  ? 'bg-[#121214] text-white dark:bg-white dark:text-[#121214] border-transparent'
                  : 'bg-transparent text-[#4A4A52] dark:text-[#A1A1AA] border-[#E7E6E1] dark:border-[#27272A] hover:bg-[#F2F1EC] dark:hover:bg-[#18181B]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Cards View
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors border ${
                viewMode === 'table'
                  ? 'bg-[#121214] text-white dark:bg-white dark:text-[#121214] border-transparent'
                  : 'bg-transparent text-[#4A4A52] dark:text-[#A1A1AA] border-[#E7E6E1] dark:border-[#27272A] hover:bg-[#F2F1EC] dark:hover:bg-[#18181B]'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              Specification Table
            </button>
          </div>
        </BlurFade>
      </section>

      {/* Main Content: Grid vs Table */}
      {viewMode === 'grid' ? (
        <div className="space-y-12">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const catTools = stackData.filter((item) => item.category === cat.name);
            return (
              <BlurFade key={cat.name} delay={0.25 + idx * 0.1} yOffset={18}>
                <div>
                  <div className="flex items-center gap-2.5 mb-6 pb-2 border-b border-[#E7E6E1] dark:border-[#27272A]">
                    <Icon className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" />
                    <h2 className="font-display font-semibold text-xl text-[#121214] dark:text-[#FAFAFA]">
                      {cat.name}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {catTools.map((t) => (
                      <Card 
                        key={t.layer + t.tech} 
                        className="p-5 border-[#E7E6E1] dark:border-[#27272A] bg-white dark:bg-[#18181B] hover:border-[#2563EB]/30 dark:hover:border-[#3B82F6]/30 hover:shadow-md transition-all rounded-2xl h-full flex flex-col justify-between"
                      >
                        <CardContent className="p-0 space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="text-[10px] font-mono bg-[#F2F1EC] dark:bg-[#09090B] text-[#2563EB] dark:text-[#3B82F6] border border-[#E7E6E1] dark:border-[#27272A]">
                              {t.layer}
                            </Badge>
                          </div>
                          <div>
                            <h3 className="font-display font-semibold text-lg text-[#121214] dark:text-[#FAFAFA]">
                              {t.tech}
                            </h3>
                            <p className="text-xs text-[#4A4A52] dark:text-[#A1A1AA] mt-1.5 leading-relaxed">
                              {t.pattern}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </BlurFade>
            );
          })}
        </div>
      ) : (
        <BlurFade delay={0.25} yOffset={18}>
          <div className="overflow-x-auto rounded-2xl border border-[#E7E6E1] dark:border-[#27272A] bg-white dark:bg-[#18181B]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E7E6E1] dark:border-[#27272A] bg-[#F9F8F5] dark:bg-[#121214] text-xs font-mono font-bold uppercase tracking-wider text-[#4A4A52] dark:text-[#A1A1AA]">
                  <th className="py-3.5 px-5">Layer</th>
                  <th className="py-3.5 px-5">Technologies Most Used</th>
                  <th className="py-3.5 px-5">Pattern / Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E6E1] dark:divide-[#27272A] text-sm">
                {stackData.map((row) => (
                  <tr 
                    key={row.layer + row.tech}
                    className="hover:bg-[#F2F1EC]/50 dark:hover:bg-[#27272A]/40 transition-colors"
                  >
                    <td className="py-3.5 px-5 font-mono text-xs font-semibold text-[#2563EB] dark:text-[#3B82F6]">
                      {row.layer}
                    </td>
                    <td className="py-3.5 px-5 font-semibold text-[#121214] dark:text-[#FAFAFA]">
                      {row.tech}
                    </td>
                    <td className="py-3.5 px-5 text-[#4A4A52] dark:text-[#A1A1AA] text-xs sm:text-sm">
                      {row.pattern}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BlurFade>
      )}
    </div>
  );
};

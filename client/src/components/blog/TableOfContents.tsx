import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, List } from 'lucide-react';
import { useLenis } from '../../context/LenisContext';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const lenis = useLenis();

  // Extract headings from markdown content or HTML elements
  useEffect(() => {
    const headingLines = content.split('\n').filter(line => line.startsWith('## ') || line.startsWith('### '));
    const items: TOCItem[] = headingLines.map((line, index) => {
      const level = line.startsWith('### ') ? 3 : 2;
      const text = line.replace(/^#{2,3}\s+/, '').trim();
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      return { id: id || `section-${index}`, text, level };
    });

    setHeadings(items);

    if (items.length > 0) {
      setActiveId(items[0].id);
    }
  }, [content]);

  // Track active heading on scroll
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    if (lenis) {
      lenis.scrollTo('#' + id, { offset: -90 });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const offset = 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setActiveId(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Collapsible TOC */}
      <div className="xl:hidden my-6 p-4 bg-[#F3F1EA] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#262626] rounded-sm">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full flex items-center justify-between text-xs font-mono tracking-wider text-[#1A1A1A] dark:text-[#ECECEC] uppercase"
        >
          <span className="flex items-center gap-2">
            <List className="w-4 h-4 text-[#6B685F]" />
            ON THIS PAGE ({headings.length})
          </span>
          {isMobileOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isMobileOpen && (
          <nav className="mt-4 pt-3 border-t border-[#E8E5DC] dark:border-[#262626] space-y-2">
            {headings.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => scrollToHeading(item.id)}
                className={`block w-full text-left text-xs font-sans transition-colors ${
                  item.level === 3 ? 'pl-4 text-[11px]' : ''
                } ${
                  activeId === item.id
                    ? 'text-[#1A1A1A] dark:text-[#ECECEC] font-medium underline'
                    : 'text-[#6B685F] dark:text-[#A0A0A0]'
                }`}
              >
                <span className="font-mono text-[10px] text-[#9E9A8E] mr-2">0{idx + 1}</span>
                {item.text}
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* Desktop Sticky Sidebar TOC */}
      <div className="hidden xl:block w-60 sticky top-28 shrink-0 self-start ml-12">
        <div className="text-[10px] font-mono tracking-widest text-[#9E9A8E] dark:text-[#6E6E6E] uppercase mb-4">
          ON THIS PAGE
        </div>
        <nav className="space-y-2.5 text-xs">
          {headings.map((item, idx) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToHeading(item.id)}
                className={`block text-left transition-all duration-200 cursor-pointer ${
                  item.level === 3 ? 'pl-3 text-[11px]' : ''
                } ${
                  isActive
                    ? 'text-[#1A1A1A] dark:text-[#ECECEC] font-medium translate-x-1'
                    : 'text-[#6B685F] dark:text-[#A0A0A0] hover:text-[#1A1A1A] dark:hover:text-[#ECECEC]'
                }`}
              >
                <span className="font-mono text-[10px] text-[#9E9A8E] mr-2">
                  0{idx + 1}
                </span>
                {item.text}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

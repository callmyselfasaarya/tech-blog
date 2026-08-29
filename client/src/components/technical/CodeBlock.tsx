import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  language?: string;
  code: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  language = 'typescript',
  code,
  filename,
  showLineNumbers = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-[#E1E1E1] dark:border-[#2C2C30] bg-[#1C1C1E] text-[#F6F5F0] shadow-sm font-mono text-xs sm:text-sm">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#252528] border-b border-[#2C2C30] text-xs font-mono text-[#A0A9B8]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3B719F]" />
          <span className="text-[#F6F5F0] font-semibold">{filename || language}</span>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#323236] hover:bg-[#3E3E44] text-[#F6F5F0] transition-colors cursor-pointer text-[11px] font-mono tracking-wider font-semibold"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1 text-emerald-400"
              >
                <Check className="w-3.5 h-3.5" /> COPIED
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5 text-[#3B719F]" /> COPY
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-colors">
                {showLineNumbers && (
                  <td className="pr-4 text-right text-[#6B7485] select-none w-8 text-[11px]">
                    {idx + 1}
                  </td>
                )}
                <td className="whitespace-pre font-mono leading-relaxed text-[#F6F5F0]">
                  {line}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

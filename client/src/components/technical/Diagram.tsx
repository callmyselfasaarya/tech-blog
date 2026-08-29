import React from 'react';
import { motion } from 'framer-motion';

interface DiagramProps {
  title?: string;
  type?: 'architecture' | 'flow' | 'pipeline';
}

export const Diagram: React.FC<DiagramProps> = ({
  title = 'SYSTEM ARCHITECTURE',
  type = 'architecture',
}) => {
  return (
    <div className="my-8 p-6 rounded-lg border border-[#E1E1E1] dark:border-[#2C2C30] bg-[#F6F5F0] dark:bg-[#1C1C1E] engineering-grid shadow-xs font-mono">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E1E1E1] dark:border-[#2C2C30] text-xs">
        <span className="text-[#3B719F] font-bold tracking-widest uppercase">// {title}</span>
        <span className="text-[10px] text-[#4C586F] dark:text-[#A0A9B8]">FIG 2.1 — ARCHITECTURAL BLUEPRINT</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center text-center">
        {/* Step 1: Client */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded border border-[#E1E1E1] dark:border-[#2C2C30] bg-white dark:bg-[#222225] space-y-1 shadow-xs"
        >
          <div className="text-[10px] text-[#3B719F] font-bold uppercase">Client Node</div>
          <div className="text-xs font-bold text-[#1C1C1E] dark:text-[#F6F5F0]">React Client</div>
          <div className="text-[9px] text-[#4C586F] dark:text-[#A0A9B8]">HTTPS / WSS</div>
        </motion.div>

        {/* Connection Arrow */}
        <div className="hidden md:flex items-center justify-center">
          <div className="w-full h-0.5 bg-[#4C586F]/40 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-[#4C586F] rotate-45" />
          </div>
        </div>

        {/* Step 2: API Gateway */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded border border-[#3B719F] bg-white dark:bg-[#222225] space-y-1 shadow-xs"
        >
          <div className="text-[10px] text-[#3B719F] font-bold uppercase">API Gateway</div>
          <div className="text-xs font-bold text-[#1C1C1E] dark:text-[#F6F5F0]">Express / Auth</div>
          <div className="text-[9px] text-[#4C586F] dark:text-[#A0A9B8]">JWT + RBAC</div>
        </motion.div>

        {/* Connection Arrow */}
        <div className="hidden md:flex items-center justify-center">
          <div className="w-full h-0.5 bg-[#4C586F]/40 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-[#4C586F] rotate-45" />
          </div>
        </div>

        {/* Step 3: Service Engine */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded border border-[#E1E1E1] dark:border-[#2C2C30] bg-white dark:bg-[#222225] space-y-1 shadow-xs"
        >
          <div className="text-[10px] text-[#3B719F] font-bold uppercase">Inference Engine</div>
          <div className="text-xs font-bold text-[#1C1C1E] dark:text-[#F6F5F0]">vLLM / Qdrant</div>
          <div className="text-[9px] text-[#4C586F] dark:text-[#A0A9B8]">Vector RAG</div>
        </motion.div>

        {/* Connection Arrow */}
        <div className="hidden md:flex items-center justify-center">
          <div className="w-full h-0.5 bg-[#4C586F]/40 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-[#4C586F] rotate-45" />
          </div>
        </div>

        {/* Step 4: Database Layer */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded border border-[#E1E1E1] dark:border-[#2C2C30] bg-white dark:bg-[#222225] space-y-1 shadow-xs"
        >
          <div className="text-[10px] text-[#3B719F] font-bold uppercase">Data Store</div>
          <div className="text-xs font-bold text-[#1C1C1E] dark:text-[#F6F5F0]">MongoDB / Sanity</div>
          <div className="text-[9px] text-[#4C586F] dark:text-[#A0A9B8]">Persistence</div>
        </motion.div>
      </div>
    </div>
  );
};

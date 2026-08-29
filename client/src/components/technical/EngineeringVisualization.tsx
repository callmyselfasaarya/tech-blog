import React from 'react';
import { motion } from 'framer-motion';

export const EngineeringVisualization: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] max-w-lg mx-auto rounded-xl border border-[#E1E1E1] dark:border-[#2C2C30] bg-[#F6F5F0] dark:bg-[#1C1C1E] p-6 overflow-hidden select-none engineering-grid shadow-sm">
      {/* Corner Technical Coordinate Markers */}
      <div className="absolute top-2 left-3 font-mono text-[9px] text-[#4C586F] dark:text-[#A0A9B8] tracking-widest">
        SYS.NODE // 0x4F91
      </div>
      <div className="absolute top-2 right-3 font-mono text-[9px] text-[#3B719F] tracking-widest font-semibold">
        STATUS / ONLINE
      </div>
      <div className="absolute bottom-2 left-3 font-mono text-[9px] text-[#4C586F] dark:text-[#A0A9B8]">
        COORD: [47.6062, -122.3321]
      </div>
      <div className="absolute bottom-2 right-3 font-mono text-[9px] text-[#4C586F] dark:text-[#A0A9B8]">
        LATENCY: 1.2ms
      </div>

      {/* SVG Architectural Grid Lines & Nodes */}
      <svg className="w-full h-full relative z-10" viewBox="0 0 400 300" fill="none">
        {/* Animated Grid Lines */}
        <motion.path
          d="M 50 80 H 350 M 50 150 H 350 M 50 220 H 350"
          stroke="#E1E1E1"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="dark:stroke-[#2C2C30]"
        />
        <motion.path
          d="M 100 40 V 260 M 200 40 V 260 M 300 40 V 260"
          stroke="#E1E1E1"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="dark:stroke-[#2C2C30]"
        />

        {/* Dynamic Data Flow Connection Line */}
        <motion.path
          d="M 100 80 L 200 150 L 300 80 L 300 220 L 200 220 Z"
          stroke="#3B719F"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />

        {/* Animated Moving Data Pulse */}
        <motion.circle
          r="4"
          fill="#3B719F"
          animate={{
            cx: [100, 200, 300, 300, 200, 100],
            cy: [80, 150, 80, 220, 220, 80],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* System Blocks (Nodes) */}
        {/* Node 1: Ingestion API */}
        <rect x="70" y="60" width="60" height="40" rx="4" fill="var(--bg-card)" stroke="#E1E1E1" className="dark:stroke-[#2C2C30]" />
        <text x="100" y="84" textAnchor="middle" fill="#1C1C1E" className="dark:fill-[#F6F5F0]" fontSize="10" fontFamily="JetBrains Mono" fontWeight="600">INJECT</text>

        {/* Node 2: Pipeline Engine */}
        <rect x="170" y="130" width="60" height="40" rx="4" fill="var(--bg-card)" stroke="#3B719F" strokeWidth="1.5" />
        <text x="200" y="154" textAnchor="middle" fill="#3B719F" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">CORE</text>

        {/* Node 3: Vector Store */}
        <rect x="270" y="60" width="60" height="40" rx="4" fill="var(--bg-card)" stroke="#E1E1E1" className="dark:stroke-[#2C2C30]" />
        <text x="300" y="84" textAnchor="middle" fill="#1C1C1E" className="dark:fill-[#F6F5F0]" fontSize="10" fontFamily="JetBrains Mono" fontWeight="600">QDRANT</text>

        {/* Node 4: LLM Reasoning */}
        <rect x="270" y="200" width="60" height="40" rx="4" fill="var(--bg-card)" stroke="#E1E1E1" className="dark:stroke-[#2C2C30]" />
        <text x="300" y="224" textAnchor="middle" fill="#1C1C1E" className="dark:fill-[#F6F5F0]" fontSize="10" fontFamily="JetBrains Mono" fontWeight="600">vLLM</text>

        {/* Technical Annotations */}
        <text x="100" y="115" textAnchor="middle" fill="#4C586F" className="dark:fill-[#A0A9B8]" fontSize="8" fontFamily="JetBrains Mono">gRPC / HTTP2</text>
        <text x="250" y="105" textAnchor="middle" fill="#4C586F" className="dark:fill-[#A0A9B8]" fontSize="8" fontFamily="JetBrains Mono">Embedding Stream</text>
        <text x="250" y="240" textAnchor="middle" fill="#4C586F" className="dark:fill-[#A0A9B8]" fontSize="8" fontFamily="JetBrains Mono">GPU PagedAttention</text>
      </svg>
    </div>
  );
};

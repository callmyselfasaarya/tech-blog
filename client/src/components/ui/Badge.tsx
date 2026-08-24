import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'accent' | 'pinned';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default',
  className = '' 
}) => {
  const base = "inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono tracking-widest uppercase transition-colors rounded-sm";
  
  const variants = {
    default: "bg-[#F3F1EA] dark:bg-[#222222] text-[#6B685F] dark:text-[#A0A0A0]",
    outline: "border border-[#E8E5DC] dark:border-[#333333] text-[#6B685F] dark:text-[#A0A0A0]",
    accent: "bg-[#1A1A1A] dark:bg-[#EEEEEE] text-[#FAF9F5] dark:text-[#121212] font-semibold",
    pinned: "bg-[#2C2B29] dark:bg-[#E8E8E8] text-[#FAF9F5] dark:text-[#121212] font-bold tracking-wider"
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

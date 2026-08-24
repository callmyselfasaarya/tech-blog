import React, { useEffect, useState } from 'react';
import { useLenis } from '../../context/LenisContext';

export const ReadingProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useLenis((e) => {
    setProgress(e.progress * 100);
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2.5px] z-50 pointer-events-none bg-transparent">
      <div 
        className="h-full bg-[#1A1A1A] dark:bg-[#ECECEC] transition-all duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

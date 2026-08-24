import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div 
      className={`animate-pulse bg-[#F3F1EA] dark:bg-[#222222] rounded-sm ${className}`}
    />
  );
};

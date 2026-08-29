import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  variant?: 'light' | 'dark' | 'auto';
}

/**
 * Official Geometric T Monogram (Vector SVG)
 */
export const TechniccalMonogram: React.FC<{ className?: string; color?: string }> = ({
  className = "w-6 h-6",
  color = "currentColor"
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Techniccal Geometric T Monogram"
    >
      {/* Background Engineering Grid Ticks */}
      <line x1="50" y1="5" x2="50" y2="95" stroke={color} strokeWidth="0.75" strokeDasharray="2 2" opacity="0.35" />
      <line x1="5" y1="18" x2="95" y2="18" stroke={color} strokeWidth="0.75" strokeDasharray="2 2" opacity="0.35" />
      <line x1="5" y1="36" x2="95" y2="36" stroke={color} strokeWidth="0.75" strokeDasharray="2 2" opacity="0.25" />
      <line x1="5" y1="86" x2="95" y2="86" stroke={color} strokeWidth="0.75" strokeDasharray="2 2" opacity="0.25" />

      {/* Grid Intersection Crosshairs */}
      <circle cx="50" cy="18" r="1.5" fill={color} opacity="0.5" />
      <circle cx="10" cy="18" r="1.5" fill={color} opacity="0.5" />
      <circle cx="90" cy="18" r="1.5" fill={color} opacity="0.5" />

      {/* Left Wing & Stem */}
      <path
        d="M 10 18 H 47 V 36 C 47 52 44 66 44 86 H 31 V 48 C 31 34 24 34 10 34 V 18 Z"
        fill={color}
      />
      {/* Right Wing & Stem */}
      <path
        d="M 90 18 H 53 V 36 C 53 52 56 66 56 86 H 69 V 48 C 69 34 76 34 90 34 V 18 Z"
        fill={color}
      />
    </svg>
  );
};

/**
 * Image 1 Form: Techniccal Wordmark-only Logo
 * Clean, bold geometric lowercase wordmark
 */
export const TechniccalWordmarkLogo: React.FC<{
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'auto';
  className?: string;
}> = ({ size = 'md', variant = 'auto', className = '' }) => {
  const textSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-4xl sm:text-5xl',
  };

  const colorClasses =
    variant === 'light'
      ? 'text-white'
      : variant === 'dark'
      ? 'text-[#1C1C1E]'
      : 'text-[#1C1C1E] dark:text-[#F6F5F0]';

  return (
    <span className={`font-display font-extrabold tracking-tight lowercase ${textSizes[size]} ${colorClasses} ${className}`}>
      techniccal
    </span>
  );
};

/**
 * Image 2 Form: Stacked Monogram + Wordmark Logo
 * Dark container box (#1C1C1E) featuring Geometric T Monogram above wordmark
 */
export const TechniccalStackedLogo: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ size = 'md', className = '' }) => {
  const boxPadding = {
    sm: 'p-3 rounded-2xl w-24',
    md: 'p-4 rounded-3xl w-32',
    lg: 'p-6 rounded-3xl w-44',
  };

  const iconSizes = {
    sm: 'w-8 h-8 mb-1.5',
    md: 'w-12 h-12 mb-2',
    lg: 'w-16 h-16 mb-3',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={`bg-[#1C1C1E] text-white flex flex-col items-center justify-center text-center shadow-md select-none shrink-0 ${boxPadding[size]} ${className}`}>
      <TechniccalMonogram className={iconSizes[size]} color="#FFFFFF" />
      <span className={`font-display font-extrabold tracking-tight lowercase text-white ${textSizes[size]}`}>
        techniccal
      </span>
    </div>
  );
};

/**
 * Compact Boxed Icon Badge
 */
export const TechniccalCompactLogo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const boxSizes = {
    sm: 'w-8 h-8 rounded-lg p-1.5',
    md: 'w-10 h-10 rounded-xl p-2',
    lg: 'w-12 h-12 rounded-2xl p-2.5',
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
  };

  return (
    <div className={`bg-[#1C1C1E] text-white flex items-center justify-center shadow-sm shrink-0 ${boxSizes[size]}`}>
      <TechniccalMonogram className={iconSizes[size]} color="#FFFFFF" />
    </div>
  );
};

/**
 * Master Techniccal Logo Component supporting all forms
 */
export const TechniccalLogo: React.FC<{
  form?: 'horizontal' | 'wordmark' | 'stacked' | 'badge';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
  className?: string;
}> = ({ form = 'horizontal', size = 'md', variant = 'auto', showSubtitle = true, className = '' }) => {
  if (form === 'wordmark') {
    return <TechniccalWordmarkLogo size={size} variant={variant} className={className} />;
  }

  if (form === 'stacked') {
    return <TechniccalStackedLogo size={size} className={className} />;
  }

  if (form === 'badge') {
    return <TechniccalCompactLogo size={size} />;
  }

  // Default: Horizontal Logo (Compact Badge + Wordmark)
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <TechniccalCompactLogo size={size} />
      <div className="flex flex-col">
        <TechniccalWordmarkLogo size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'} variant={variant} />
        {showSubtitle && (
          <span
            className={`text-[10px] font-mono leading-none tracking-wider uppercase mt-0.5 ${
              variant === 'light'
                ? 'text-[#A0A9B8]'
                : variant === 'dark'
                ? 'text-[#4C586F]'
                : 'text-[#4C586F] dark:text-[#A8A29A]'
            }`}
          >
            Engineering Journal
          </span>
        )}
      </div>
    </div>
  );
};

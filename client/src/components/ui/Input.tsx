import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-mono tracking-wider text-[#6B685F] dark:text-[#A0A0A0] uppercase mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full bg-[#FAF9F5] dark:bg-[#1A1A1A] border border-[#E8E5DC] dark:border-[#333333] rounded-sm px-3.5 py-2 text-sm text-[#1A1A1A] dark:text-[#ECECEC] placeholder-[#9E9A8E] dark:placeholder-[#6E6E6E] focus:outline-none focus:border-[#1A1A1A] dark:focus:border-[#EEEEEE] transition-colors ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500 font-sans">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

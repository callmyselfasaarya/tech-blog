import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const base = "inline-flex items-center justify-center font-sans font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-[#1A1A1A] hover:bg-[#333333] dark:bg-[#EEEEEE] dark:hover:bg-[#FFFFFF] text-[#FAF9F5] dark:text-[#121212]",
    secondary: "bg-[#F3F1EA] hover:bg-[#E8E5DC] dark:bg-[#262626] dark:hover:bg-[#333333] text-[#1A1A1A] dark:text-[#ECECEC]",
    outline: "border border-[#E8E5DC] hover:border-[#1A1A1A] dark:border-[#333333] dark:hover:border-[#EEEEEE] text-[#1A1A1A] dark:text-[#ECECEC]",
    ghost: "bg-transparent hover:bg-[#F3F1EA] dark:hover:bg-[#262626] text-[#6B685F] dark:text-[#A0A0A0] hover:text-[#1A1A1A] dark:hover:text-[#ECECEC]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-sm gap-1.5",
    md: "px-4 py-2 text-sm rounded-sm gap-2",
    lg: "px-6 py-3 text-base rounded-sm gap-2.5"
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

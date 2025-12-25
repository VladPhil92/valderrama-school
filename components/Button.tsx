'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-red' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-medium uppercase tracking-widest
    transition-all duration-300 ease-out
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    active:scale-[0.98]
  `;

  const variantClasses = {
    primary: `
      bg-[#C41E3A] text-white border-2 border-[#C41E3A]
      hover:bg-[#9B1B30] hover:border-[#9B1B30] hover:-translate-y-0.5
      hover:shadow-lg hover:shadow-[#C41E3A]/25
      focus-visible:ring-[#C41E3A]
    `,
    secondary: `
      bg-slate-900 text-white border-2 border-slate-900
      hover:bg-slate-800 hover:border-slate-800 hover:-translate-y-0.5
      hover:shadow-lg hover:shadow-slate-900/20
      focus-visible:ring-slate-900
      dark:bg-white dark:text-slate-900 dark:border-white
      dark:hover:bg-slate-100
    `,
    outline: `
      bg-transparent text-slate-700 border border-slate-300
      hover:bg-slate-900 hover:text-white hover:border-slate-900 hover:-translate-y-0.5
      focus-visible:ring-slate-500
      dark:text-slate-300 dark:border-slate-600
      dark:hover:bg-white dark:hover:text-slate-900 dark:hover:border-white
    `,
    'outline-red': `
      bg-transparent text-[#C41E3A] border border-[#C41E3A]
      hover:bg-[#C41E3A] hover:text-white hover:-translate-y-0.5
      hover:shadow-lg hover:shadow-[#C41E3A]/20
      focus-visible:ring-[#C41E3A]
    `,
    ghost: `
      bg-transparent text-slate-600 border-none
      hover:bg-slate-100 hover:text-slate-900
      focus-visible:ring-slate-500
      dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white
    `,
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-6 py-3 text-[11px]',
    lg: 'px-8 py-4 text-xs',
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <span>{children}</span>
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </button>
  );
}

import { cn } from './cn';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  const variants = {
    primary:   'bg-black hover:bg-neutral-800 text-white shadow-sm',
    gradient:  'bg-black hover:bg-neutral-800 text-white shadow-sm',
    secondary: 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-100',
    ghost:     'hover:bg-neutral-100 text-neutral-700 dark:hover:bg-neutral-800 dark:text-neutral-300',
    danger:    'bg-red-600 hover:bg-red-700 text-white',
    outline:   'border border-neutral-300 hover:border-black hover:bg-neutral-50 text-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-sm rounded-xl',
    lg: 'px-6 py-3 text-base rounded-xl',
    xl: 'px-8 py-4 text-lg rounded-2xl',
  };
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase text-xs',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

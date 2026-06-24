import { cn } from './cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'accent' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-black text-white dark:bg-white dark:text-black',
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    danger:  'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    accent:  'bg-neutral-900 text-white dark:bg-white dark:text-black',
    outline: 'border border-neutral-300 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300',
  };
  return (
    <span className={cn(
      'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}

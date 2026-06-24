import { motion } from 'framer-motion';
import { cn } from './cn';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: { value: string; positive: boolean };
  color?: 'blue' | 'cyan' | 'green' | 'amber' | 'purple';
  delay?: number;
  className?: string;
}

const colorMap = {
  blue: { icon: 'text-black dark:text-white', bg: 'bg-neutral-100 dark:bg-neutral-900/20', border: 'border-neutral-200 dark:border-neutral-800/30' },
  cyan: { icon: 'text-black dark:text-white', bg: 'bg-neutral-100 dark:bg-neutral-900/20', border: 'border-neutral-200 dark:border-neutral-800/30' },
  green: { icon: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-100 dark:border-emerald-800/30' },
  amber: { icon: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-100 dark:border-amber-800/30' },
  purple: { icon: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-100 dark:border-purple-800/30' },
};

export function MetricCard({ title, value, subtitle, icon: Icon, trend, color = 'blue', delay = 0, className }: MetricCardProps) {
  const colors = colorMap[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={cn(
        'bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-card p-5 sm:p-6',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</p>
          {subtitle && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{subtitle}</p>}
          {trend && (
            <div className={cn('flex items-center gap-1 mt-2 text-xs font-medium', trend.positive ? 'text-emerald-600' : 'text-red-500')}>
              <span>{trend.positive ? '↑' : '↓'}</span>
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ml-3', colors.bg)}>
            <Icon className={cn('w-5 h-5', colors.icon)} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

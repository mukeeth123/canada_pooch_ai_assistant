import { motion } from 'framer-motion';
import { cn } from './cn';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  sublabel?: string;
  color?: 'blue' | 'cyan' | 'green' | 'amber' | 'red' | 'gradient';
  showValue?: boolean;
  className?: string;
  delay?: number;
}

export function ProgressBar({ value, max = 100, label, sublabel, color = 'blue', showValue = true, className, delay = 0 }: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100);

  const colors = {
    blue: 'bg-black',
    cyan: 'bg-neutral-500',
    green: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    gradient: 'gradient-accent',
  };

  return (
    <div className={cn('space-y-1.5', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          <div>
            {label && <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</p>}
            {sublabel && <p className="text-xs text-slate-400">{sublabel}</p>}
          </div>
          {showValue && <span className="text-sm font-bold text-slate-900 dark:text-white">{value}%</span>}
        </div>
      )}
      <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
          className={cn('h-full rounded-full', colors[color])}
        />
      </div>
    </div>
  );
}

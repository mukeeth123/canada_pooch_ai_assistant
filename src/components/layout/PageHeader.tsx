import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  icon?: LucideIcon;
  badge?: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ icon: Icon, badge, title, subtitle, actions }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8"
    >
      <div>
        {badge && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800/50 text-black dark:text-neutral-400 text-xs font-semibold mb-3">
            {Icon && <Icon className="w-3 h-3" />}
            {badge}
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm sm:text-base">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </motion.div>
  );
}

import { Link, useLocation } from 'react-router-dom';
import { Home, Ruler, ShoppingBag, Activity, Map } from 'lucide-react';
import { cn } from '../ui/cn';

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/fit-finder', label: 'Fit Finder', icon: Ruler },
  { to: '/recommendations', label: 'Products', icon: ShoppingBag },
  { to: '/interactions', label: 'Analytics', icon: Activity },
  { to: '/roadmap', label: 'Roadmap', icon: Map },
];

export function MobileBottomNav() {
  const location = useLocation();
  return (
    <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-slate-200/60 dark:border-slate-700/60 dark:bg-slate-900/90 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-[56px]',
                active ? 'text-black dark:text-white' : 'text-slate-400 dark:text-slate-500'
              )}
            >
              <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center transition-all', active && 'bg-neutral-100 dark:bg-neutral-800')}>
                <Icon className={cn('w-4.5 h-4.5', active ? 'text-black dark:text-white' : 'text-slate-400')} />
              </div>
              <span className={cn('text-[10px] font-semibold', active ? 'text-black dark:text-white' : 'text-slate-400')}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

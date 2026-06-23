import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Ruler, Info, Eye, ShoppingBag, AlertTriangle,
  Activity, Map, Moon, Sun, Bell, Menu, X, Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { cn } from '../ui/cn';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/fit-finder', label: 'Fit Finder', icon: Ruler },
  { to: '/why-this-size', label: 'Why This Size', icon: Info },
  { to: '/fit-visualization', label: 'Fit View', icon: Eye },
  { to: '/recommendations', label: 'Products', icon: ShoppingBag },
  { to: '/return-risk', label: 'Return Risk', icon: AlertTriangle },
  { to: '/interactions', label: 'Interactions', icon: Activity },
  { to: '/roadmap', label: 'Roadmap', icon: Map },
];

export function Navbar() {
  const { state, dispatch } = useApp();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const unread = state.notifications.filter(n => !n.read).length;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-slate-200/60 dark:border-slate-700/60 dark:bg-slate-900/85">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-black">CP</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-black text-slate-900 dark:text-white text-sm tracking-tight">Canada Pooch</span>
              <div className="text-[10px] text-gradient font-semibold -mt-0.5">AI Fit Intelligence</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200',
                  location.pathname === to
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(s => !s)}
              className="w-9 h-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors"
            >
              <Search className="w-4.5 h-4.5" />
            </button>
            {/* Notifications */}
            <button
              onClick={() => setNotifOpen(s => !s)}
              className="relative w-9 h-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors"
            >
              <Bell className="w-4.5 h-4.5" />
              {unread > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unread}
                </span>
              )}
            </button>
            {/* Theme */}
            <button
              onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
              className="w-9 h-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors"
            >
              {state.darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
            {/* Hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="xl:hidden w-9 h-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-slate-200/60 dark:border-slate-700/60 overflow-hidden"
            >
              <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-3">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products, breeds, insights..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Notifications Panel */}
      <AnimatePresence>
        {notifOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="fixed top-20 right-4 z-50 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Notifications</h3>
                <button
                  onClick={() => { dispatch({ type: 'CLEAR_NOTIFICATIONS' }); setNotifOpen(false); }}
                  className="text-xs text-blue-600 font-medium hover:underline"
                >
                  Mark all read
                </button>
              </div>
              <div className="divide-y divide-slate-50 dark:divide-slate-800 max-h-80 overflow-y-auto">
                {state.notifications.map(n => (
                  <div key={n.id} className={cn('px-4 py-3', !n.read && 'bg-blue-50/50 dark:bg-blue-900/10')}>
                    <div className="flex items-start gap-2.5">
                      <div className={cn('w-2 h-2 rounded-full mt-1.5 flex-shrink-0', {
                        'bg-emerald-500': n.type === 'success',
                        'bg-amber-500': n.type === 'warning',
                        'bg-blue-500': n.type === 'info',
                        'bg-red-500': n.type === 'error',
                      })} />
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{n.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{n.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-white dark:bg-slate-900 shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <p className="font-black text-slate-900 dark:text-white text-sm">Canada Pooch</p>
                  <p className="text-[10px] text-gradient font-semibold">AI Fit Intelligence</p>
                </div>
                <button onClick={() => setDrawerOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <div className="p-3 space-y-0.5">
                {navItems.map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setDrawerOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all',
                      location.pathname === to
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, ChevronDown, ChevronUp, CheckCircle, Clock, Zap } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Badge } from '../components/ui/Badge';
import { ROADMAP_PHASES } from '../mock/roadmap';
import { cn } from '../components/ui/cn';

const statusConfig = {
  completed: { label: 'Completed', badge: 'success' as const, lineColor: 'bg-emerald-500', dotColor: 'bg-emerald-500', icon: CheckCircle, textColor: 'text-emerald-600' },
  active: { label: 'In Progress', badge: 'default' as const, lineColor: 'bg-blue-600', dotColor: 'bg-blue-600 shadow-glow', icon: Zap, textColor: 'text-blue-600' },
  upcoming: { label: 'Upcoming', badge: 'outline' as const, lineColor: 'bg-slate-200 dark:bg-slate-700', dotColor: 'bg-slate-300 dark:bg-slate-600', icon: Clock, textColor: 'text-slate-400' },
};

export function FutureRoadmap() {
  const [expanded, setExpanded] = useState<string>('phase1');

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        icon={Map}
        badge="AI Roadmap"
        title="Future AI Roadmap"
        subtitle="Six phases of AI commerce intelligence — from fit accuracy to full revenue optimization"
      />

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden mb-10 gradient-hero p-8"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            From AI Fit Finder to <span className="text-gradient">Full Commerce Intelligence</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Starting with the core AI Fit Finder before Black Friday, then expanding to product recommendations, AI search, and category merchandising — exactly as scoped by the Canada Pooch team.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <CheckCircle className="w-3 h-3" /> Phase 1 Active
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-semibold">
              <Zap className="w-3 h-3" /> 4 Phases Total
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold">
              <Clock className="w-3 h-3" /> Target: September 2024
            </div>
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 sm:left-10 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />

        <div className="space-y-4">
          {ROADMAP_PHASES.map((phase, i) => {
            const config = statusConfig[phase.status];
            const StatusIcon = config.icon;
            const isExpanded = expanded === phase.id;

            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-20 sm:pl-24"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-6 flex items-center justify-center">
                  <div className={cn(
                    'w-16 sm:w-20 h-px',
                    config.lineColor
                  )} />
                  <div className={cn(
                    'absolute left-0 w-6 h-6 rounded-full flex items-center justify-center',
                    config.dotColor
                  )}>
                    {phase.status === 'active' && (
                      <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-40" />
                    )}
                    <StatusIcon className={cn('w-3 h-3', phase.status === 'active' ? 'text-white' : 'text-white')} />
                  </div>
                </div>

                {/* Card */}
                <div className={cn(
                  'rounded-2xl border overflow-hidden transition-all duration-300',
                  isExpanded
                    ? 'border-blue-200 dark:border-blue-800/60 shadow-card-hover'
                    : 'border-slate-100 dark:border-slate-700/50 shadow-card',
                  phase.status === 'active' && isExpanded && 'border-blue-400 dark:border-blue-600'
                )}>
                  <button
                    className="w-full flex items-center gap-4 p-5 sm:p-6 bg-white dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                    onClick={() => setExpanded(isExpanded ? '' : phase.id)}
                  >
                    {/* Phase icon */}
                    <div className={cn(
                      'w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0',
                      phase.status === 'active' ? 'gradient-accent' : phase.status === 'completed' ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-slate-100 dark:bg-slate-700'
                    )}>
                      {phase.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-bold text-slate-400">Phase {phase.phase}</span>
                        <Badge variant={config.badge}>{config.label}</Badge>
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">{phase.title}</h3>
                      <p className="text-slate-500 text-sm mt-0.5 line-clamp-1">{phase.description}</p>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="hidden sm:block text-right">
                        <p className="text-xs text-slate-400">Timeline</p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{phase.timeline.split(' — ')[1]}</p>
                      </div>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-700/50 px-5 sm:px-6 py-5">
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {/* Description */}
                            <div className="lg:col-span-1">
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Overview</p>
                              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{phase.description}</p>
                              <div className="mt-3 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                <p className="text-xs text-slate-400 mb-0.5">Timeline</p>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">{phase.timeline}</p>
                              </div>
                            </div>

                            {/* Tech Components */}
                            <div>
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Technical Components</p>
                              <ul className="space-y-2">
                                {phase.technicalComponents.map(c => (
                                  <li key={c} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                                    {c}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Business Value & ROI */}
                            <div>
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Business Value</p>
                              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-3">{phase.businessValue}</p>
                              <div className={cn(
                                'p-3 rounded-xl border text-sm font-semibold',
                                phase.status === 'active' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/40 text-blue-700 dark:text-blue-300'
                                : phase.status === 'completed' ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-300'
                                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                              )}>
                                <p className="text-xs font-bold opacity-70 mb-1">Expected ROI</p>
                                {phase.expectedROI}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center p-8 rounded-3xl gradient-hero"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold mb-4">
          <Clock className="w-3 h-3" /> Target: September 2024 — Before Black Friday
        </div>
        <h3 className="text-2xl font-black text-white mb-2">Phase 1 — AI Fit Finder is ready to ship</h3>
        <p className="text-slate-300 mb-6 max-w-xl mx-auto">
          No login required. Works on mobile and desktop. Tracks user interactions out of the box.
          iOSYS can deliver Phase 1 in 6 weeks — well before your Black Friday deadline.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-8 py-3.5 rounded-xl gradient-accent text-white font-bold text-sm hover:opacity-90 transition-opacity">
            Schedule Implementation Call
          </button>
          <button className="px-8 py-3.5 rounded-xl border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-colors">
            Download Roadmap PDF
          </button>
        </div>
      </motion.div>
    </div>
  );
}

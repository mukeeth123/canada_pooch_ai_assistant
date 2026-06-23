import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Users, Ruler, ShoppingBag, Cpu, ChevronDown, ChevronUp, TrendingUp } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import { PageHeader } from '../components/layout/PageHeader';
import { MetricCard } from '../components/ui/MetricCard';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { BLACK_FRIDAY_DATA } from '../mock/blackFriday';
import { cn } from '../components/ui/cn';

const impactColors = { high: 'danger', medium: 'warning', low: 'accent' } as const;

export function BlackFridayDashboard() {
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);
  const data = BLACK_FRIDAY_DATA;

  const combinedForecast = data.trafficForecast.map((t, i) => ({
    date: t.date,
    Traffic: t.value,
    'Fit Checks': data.fitFinderForecast[i]?.value ?? 0,
    Recommendations: data.recommendationForecast[i]?.value ?? 0,
  }));

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        icon={BarChart3}
        badge="Black Friday Readiness"
        title="Black Friday Dashboard"
        subtitle="AI-powered readiness analysis for the highest traffic event of the year"
      />

      {/* Countdown Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden mb-8 gradient-hero p-6 sm:p-8"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 right-10 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              BLACK FRIDAY APPROACHING
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">System Readiness</h2>
            <p className="text-slate-300 text-sm mt-1">AI Fit Intelligence is ready to handle peak traffic</p>
          </div>
          <div className="text-center">
            <div className="relative w-28 h-28">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none" stroke="#F59E0B" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 42}
                  initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - data.systemReadiness / 100) }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white">{data.systemReadiness}%</span>
                <span className="text-xs text-slate-400">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Projected Visitors" value="120,000" icon={Users} color="blue" delay={0.1} trend={{ value: '+340% vs last year', positive: true }} />
        <MetricCard title="Expected Fit Checks" value="47,000" icon={Ruler} color="cyan" delay={0.2} trend={{ value: '39% of visitors', positive: true }} />
        <MetricCard title="Recommendation Requests" value="38,000" icon={ShoppingBag} color="green" delay={0.3} trend={{ value: '81% of fit checks', positive: true }} />
        <MetricCard title="System Readiness" value="92%" icon={Cpu} color="amber" delay={0.4} trend={{ value: 'On track', positive: true }} />
      </div>

      {/* Traffic Forecast Chart */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Traffic & Fit Activity Forecast</h3>
                  <p className="text-slate-500 text-sm">Black Friday week projections</p>
                </div>
                <Badge variant="warning">BF Week</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={combinedForecast} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="gTraffic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gFit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                    formatter={(v) => [typeof v === 'number' ? v.toLocaleString() : v, '']} />
                  <Legend />
                  <Area type="monotone" dataKey="Traffic" stroke="#2563EB" fill="url(#gTraffic)" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="Fit Checks" stroke="#06B6D4" fill="url(#gFit)" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="Recommendations" stroke="#22C55E" fill="none" strokeWidth={2} strokeDasharray="4 2" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Hourly Peak */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="h-full">
            <CardHeader>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Peak Load Hours</h3>
              <p className="text-slate-500 text-sm">Black Friday EST</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  data={[
                    { hour: '6AM', load: 18 }, { hour: '7AM', load: 34 }, { hour: '8AM', load: 62 },
                    { hour: '9AM', load: 89 }, { hour: '10AM', load: 100 }, { hour: '11AM', load: 96 },
                    { hour: '12PM', load: 88 }, { hour: '1PM', load: 74 }, { hour: '2PM', load: 58 },
                    { hour: '3PM', load: 45 }, { hour: '4PM', load: 52 }, { hour: '6PM', load: 38 },
                  ]}
                  margin={{ top: 5, right: 5, left: -25, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="hour" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                    formatter={(v) => [`${v}%`, 'Load']} />
                  <Bar dataKey="load" radius={[4, 4, 0, 0]}>
                    {[18, 34, 62, 89, 100, 96, 88, 74, 58, 45, 52, 38].map((v, i) => (
                      <rect key={i} fill={v >= 80 ? '#EF4444' : v >= 60 ? '#F59E0B' : '#2563EB'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-red-500" /><span className="text-xs text-slate-400">Peak</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-amber-500" /><span className="text-xs text-slate-400">High</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-blue-600" /><span className="text-xs text-slate-400">Normal</span></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Insights */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Insights Panel</h3>
                <p className="text-slate-500 text-sm">Actionable intelligence for Black Friday preparation</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.insights.map((insight, i) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="border border-slate-100 dark:border-slate-700/50 rounded-2xl overflow-hidden"
                >
                  <button
                    className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
                    onClick={() => setExpandedInsight(expandedInsight === insight.id ? null : insight.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant={impactColors[insight.impact]}>{insight.impact.toUpperCase()} IMPACT</Badge>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white text-sm">{insight.title}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{insight.description}</p>
                      </div>
                    </div>
                    {expandedInsight === insight.id
                      ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    }
                  </button>
                  <AnimatePresence>
                    {expandedInsight === insight.id && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-0">
                          <div className={cn(
                            'p-4 rounded-xl text-sm leading-relaxed',
                            insight.impact === 'high' ? 'bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-300 border border-red-100 dark:border-red-800/40'
                            : insight.impact === 'medium' ? 'bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-800/40'
                            : 'bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/40'
                          )}>
                            {insight.expandedContent}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

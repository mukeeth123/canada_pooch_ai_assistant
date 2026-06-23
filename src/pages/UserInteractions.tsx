import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity, Ruler, MousePointer, Clock, TrendingUp,
  Smartphone, Monitor, ArrowRight, CheckCircle
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { PageHeader } from '../components/layout/PageHeader';
import { MetricCard } from '../components/ui/MetricCard';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useApp } from '../context/AppContext';

/* ── Mock interaction data ── */
const dailySessions = [
  { day: 'Mon', sessions: 312, fitChecks: 148, completions: 122 },
  { day: 'Tue', sessions: 428, fitChecks: 203, completions: 178 },
  { day: 'Wed', sessions: 391, fitChecks: 187, completions: 161 },
  { day: 'Thu', sessions: 502, fitChecks: 241, completions: 214 },
  { day: 'Fri', sessions: 618, fitChecks: 298, completions: 267 },
  { day: 'Sat', sessions: 743, fitChecks: 361, completions: 329 },
  { day: 'Sun', sessions: 689, fitChecks: 334, completions: 302 },
];

const breedDistribution = [
  { breed: 'Golden Retriever', count: 284, pct: 28 },
  { breed: 'Labrador', count: 231, pct: 23 },
  { breed: 'French Bulldog', count: 189, pct: 19 },
  { breed: 'German Shepherd', count: 143, pct: 14 },
  { breed: 'Husky', count: 98, pct: 10 },
  { breed: 'Poodle', count: 62, pct: 6 },
];

const deviceSplit = [
  { name: 'Mobile', value: 58, color: '#2563EB' },
  { name: 'Desktop', value: 32, color: '#06B6D4' },
  { name: 'Tablet', value: 10, color: '#22C55E' },
];

const dropOffSteps = [
  { step: 'Landed on Fit Finder', users: 1000, pct: 100 },
  { step: 'Started Form', users: 821, pct: 82 },
  { step: 'Entered Measurements', users: 694, pct: 69 },
  { step: 'Submitted Form', users: 612, pct: 61 },
  { step: 'Viewed Recommendation', users: 589, pct: 59 },
  { step: 'Clicked Product', users: 402, pct: 40 },
  { step: 'Added to Cart', users: 218, pct: 22 },
];

const hourlyHeatmap = [
  { hour: '6AM', Mon: 12, Tue: 15, Wed: 11, Thu: 18, Fri: 24, Sat: 38, Sun: 35 },
  { hour: '9AM', Mon: 68, Tue: 82, Wed: 74, Thu: 91, Fri: 112, Sat: 145, Sun: 132 },
  { hour: '12PM', Mon: 95, Tue: 103, Wed: 98, Thu: 128, Fri: 161, Sat: 198, Sun: 187 },
  { hour: '3PM', Mon: 78, Tue: 89, Wed: 81, Thu: 104, Fri: 138, Sat: 172, Sun: 158 },
  { hour: '6PM', Mon: 88, Tue: 97, Wed: 91, Thu: 118, Fri: 152, Sat: 164, Sun: 143 },
  { hour: '9PM', Mon: 54, Tue: 61, Wed: 58, Thu: 72, Fri: 84, Sat: 98, Sun: 76 },
];

const recentEvents = [
  { time: '2 min ago', event: 'Fit Check Completed', detail: 'Max — Golden Retriever → XXL (96% confidence)', type: 'success' },
  { time: '4 min ago', event: 'Product Clicked', detail: 'Expedition Parka XL from recommendation', type: 'info' },
  { time: '7 min ago', event: 'Fit Check Completed', detail: 'Luna — French Bulldog → S (91% confidence)', type: 'success' },
  { time: '11 min ago', event: 'Form Abandoned', detail: 'User left at measurement step', type: 'warning' },
  { time: '15 min ago', event: 'Fit Check Completed', detail: 'Buster — Labrador → XL (94% confidence)', type: 'success' },
  { time: '18 min ago', event: 'Size Comparison Used', detail: 'XL vs XXL comparison modal opened', type: 'info' },
  { time: '22 min ago', event: 'Wishlist Added', detail: 'Urban Rain Jacket added to wishlist', type: 'info' },
  { time: '28 min ago', event: 'Fit Check Completed', detail: 'Coco — Husky → L (89% confidence)', type: 'success' },
];

const BREED_COLORS = ['#2563EB', '#06B6D4', '#22C55E', '#F59E0B', '#8B5CF6', '#EF4444'];

export function UserInteractions() {
  useApp(); // context available for future live state injection
  const [activeTab, setActiveTab] = useState<'overview' | 'funnel' | 'live'>('overview');

  const totalFitChecks = dailySessions.reduce((s, d) => s + d.fitChecks, 0);
  const totalCompletions = dailySessions.reduce((s, d) => s + d.completions, 0);
  const completionRate = Math.round((totalCompletions / totalFitChecks) * 100);

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        icon={Activity}
        badge="User Interaction Tracking"
        title="Tool Interaction Analytics"
        subtitle="Real-time tracking of how customers engage with the AI Fit Finder — no login required"
        actions={
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Live Tracking</span>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Fit Checks This Week" value={totalFitChecks.toLocaleString()} icon={Ruler} color="blue" delay={0.05} trend={{ value: '+18% vs last week', positive: true }} />
        <MetricCard title="Completion Rate" value={`${completionRate}%`} icon={CheckCircle} color="green" delay={0.1} trend={{ value: '+4pts vs last week', positive: true }} />
        <MetricCard title="Avg. Session Duration" value="2m 38s" icon={Clock} color="cyan" delay={0.15} trend={{ value: '+12s vs last week', positive: true }} />
        <MetricCard title="Fit-to-Cart Rate" value="22%" icon={MousePointer} color="amber" delay={0.2} trend={{ value: 'Target: 25%', positive: true }} />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6 w-fit">
        {(['overview', 'funnel', 'live'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
              activeTab === tab
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
            }`}
          >
            {tab === 'live' ? '🔴 Live Feed' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Sessions chart */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Daily Sessions & Fit Activity</h3>
                    <p className="text-slate-500 text-sm">This week — tool usage over time</p>
                  </div>
                  <Badge variant="default">7-Day Window</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={dailySessions} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                    <defs>
                      <linearGradient id="gSess" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gFit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gComp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px' }} />
                    <Legend />
                    <Area type="monotone" dataKey="sessions" name="Sessions" stroke="#2563EB" fill="url(#gSess)" strokeWidth={2.5} />
                    <Area type="monotone" dataKey="fitChecks" name="Fit Checks" stroke="#06B6D4" fill="url(#gFit)" strokeWidth={2.5} />
                    <Area type="monotone" dataKey="completions" name="Completions" stroke="#22C55E" fill="url(#gComp)" strokeWidth={2.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Breed distribution */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Fit Checks by Breed</h3>
                  <p className="text-slate-500 text-sm">Which breeds customers are sizing this week</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={breedDistribution} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 11 }} />
                      <YAxis dataKey="breed" type="category" tick={{ fontSize: 11 }} width={110} />
                      <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                        formatter={(v) => [`${v} checks`, 'Fit Checks']} />
                      <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                        {breedDistribution.map((_, i) => (
                          <Cell key={i} fill={BREED_COLORS[i % BREED_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Device split */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Card className="h-full">
                <CardHeader>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Device Breakdown</h3>
                  <p className="text-slate-500 text-sm">Mobile-first usage confirmed</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie data={deviceSplit} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="value">
                        {deviceSplit.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                        formatter={(v) => [`${v}%`, '']} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-2">
                    {deviceSplit.map(d => (
                      <div key={d.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {d.name === 'Mobile' ? <Smartphone className="w-3.5 h-3.5" style={{ color: d.color }} />
                            : <Monitor className="w-3.5 h-3.5" style={{ color: d.color }} />}
                          <span className="text-sm text-slate-600 dark:text-slate-300">{d.name}</span>
                        </div>
                        <span className="font-bold text-sm" style={{ color: d.color }}>{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Peak hour heatmap */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Peak Usage Hours</h3>
                <p className="text-slate-500 text-sm">Fit Finder sessions by hour and day — identify when customers need help most</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={hourlyHeatmap} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px' }} />
                    <Legend />
                    <Line type="monotone" dataKey="Sat" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Sun" stroke="#06B6D4" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Fri" stroke="#22C55E" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Mon" stroke="#94A3B8" strokeWidth={1.5} dot={{ r: 2 }} strokeDasharray="4 2" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      {/* ── FUNNEL TAB ── */}
      {activeTab === 'funnel' && (
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Fit Finder Conversion Funnel</h3>
                <p className="text-slate-500 text-sm">Drop-off analysis — where customers exit the sizing flow</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dropOffSteps.map((step, i) => {
                    const drop = i > 0 ? dropOffSteps[i - 1].pct - step.pct : 0;
                    return (
                      <motion.div
                        key={step.step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                              step.pct >= 70 ? 'bg-emerald-100 text-emerald-700' :
                              step.pct >= 40 ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-600'
                            }`}>{i + 1}</div>
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{step.step}</span>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            {drop > 0 && (
                              <span className="text-xs text-red-500 font-medium">-{drop}%</span>
                            )}
                            <span className="text-sm font-bold text-slate-900 dark:text-white w-14 text-right">
                              {step.users.toLocaleString()} <span className="text-slate-400 font-normal text-xs">users</span>
                            </span>
                            <span className={`text-sm font-black w-10 text-right ${
                              step.pct >= 70 ? 'text-emerald-600' : step.pct >= 40 ? 'text-amber-500' : 'text-red-500'
                            }`}>{step.pct}%</span>
                          </div>
                        </div>
                        <div className="h-7 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${step.pct}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className={`h-full rounded-lg flex items-center justify-end pr-2 ${
                              step.pct >= 70 ? 'bg-emerald-500' :
                              step.pct >= 40 ? 'bg-amber-500' :
                              'bg-red-500'
                            }`}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40">
                  <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-2">🤖 AI Insight</p>
                  <p className="text-sm text-blue-600 dark:text-blue-300 leading-relaxed">
                    The biggest drop-off (13%) occurs between "Started Form" and "Entered Measurements."
                    Adding inline measurement guides with visual diagrams at this step is projected to recover
                    8–10% of users, translating to ~80 additional fit completions per 1,000 visitors.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Size recommendation distribution */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recommended Size Distribution</h3>
                <p className="text-slate-500 text-sm">Breakdown of sizes the AI has recommended — informs inventory planning</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart
                    data={[
                      { size: 'XS', count: 42, pct: 6 },
                      { size: 'S', count: 98, pct: 14 },
                      { size: 'M', count: 134, pct: 19 },
                      { size: 'L', count: 187, pct: 27 },
                      { size: 'XL', count: 163, pct: 23 },
                      { size: 'XXL', count: 78, pct: 11 },
                    ]}
                    margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="size" tick={{ fontSize: 13, fontWeight: 700 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                      formatter={(v) => [`${v} recommendations`, 'Count']} />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#2563EB" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      {/* ── LIVE FEED TAB ── */}
      {activeTab === 'live' && (
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Live Event Stream</h3>
                    <p className="text-slate-500 text-sm">Real-time customer interactions with the AI Fit Finder</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-bold text-red-600 dark:text-red-400">LIVE</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentEvents.map((evt, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border ${
                        evt.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-900/15 border-emerald-100 dark:border-emerald-800/40'
                        : evt.type === 'warning' ? 'bg-amber-50 dark:bg-amber-900/15 border-amber-100 dark:border-amber-800/40'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-100 dark:border-slate-700/50'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                        evt.type === 'success' ? 'bg-emerald-500' :
                        evt.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{evt.event}</span>
                          <span className="text-xs text-slate-400">{evt.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{evt.detail}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 flex-shrink-0 mt-0.5" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Live counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Active Users Now', value: '47', color: 'text-blue-600', pulse: true },
              { label: 'Fit Checks Today', value: '361', color: 'text-emerald-600', pulse: false },
              { label: 'Avg Confidence Score', value: '93%', color: 'text-cyan-600', pulse: false },
              { label: 'Completions Today', value: '329', color: 'text-purple-600', pulse: false },
            ].map(item => (
              <Card key={item.label} className="text-center p-4">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  {item.pulse && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />}
                  <p className="text-xs text-slate-400">{item.label}</p>
                </div>
                <p className={`text-2xl font-black ${item.color}`}>{item.value}</p>
              </Card>
            ))}
          </div>

          {/* September target note */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardContent className="pt-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-900 dark:text-white">September 2024 Launch Target</h3>
                      <Badge variant="warning">On Track</Badge>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                      The AI Fit Finder is targeting a September 2024 go-live, ahead of the Black Friday season.
                      Interaction tracking is active in staging — all events shown above will flow from production
                      the moment the tool is live. Current projected completion rate of <strong>61%</strong> is
                      above the industry benchmark of 45% for sizing tools.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge variant="success">No Login Required</Badge>
                      <Badge variant="success">Mobile + Desktop</Badge>
                      <Badge variant="success">Anonymous Tracking</Badge>
                      <Badge variant="default">Target: Sept 2024</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}

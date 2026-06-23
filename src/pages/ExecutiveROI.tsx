import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, BarChart2, Download, FileText, ArrowUp } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { PageHeader } from '../components/layout/PageHeader';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ROI_DATA } from '../mock/roi';

function CountUp({ end, prefix = '', suffix = '', duration = 2000 }: { end: number; prefix?: string; suffix?: string; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(ease * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);
  return <>{prefix}{value.toLocaleString()}{suffix}</>;
}

const roiMetrics = [
  { title: 'Current Returns Cost', value: 420000, prefix: '$', color: 'text-red-500', sub: 'Annual baseline' },
  { title: 'Annual Savings', value: 147000, prefix: '$', color: 'text-emerald-600', sub: 'Year 1 projection' },
  { title: 'ROI', value: 716, suffix: '%', color: 'text-blue-600', sub: '12-month return' },
  { title: 'Payback Period', value: 1.4, suffix: ' mo', color: 'text-cyan-600', sub: 'Break-even' },
];

export function ExecutiveROI() {
  const data = ROI_DATA;
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        icon={TrendingUp}
        badge="Executive Dashboard"
        title="ROI Intelligence Dashboard"
        subtitle="Comprehensive financial impact analysis of the AI Fit Intelligence implementation"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="md" onClick={handleDownload}>
              <Download className="w-4 h-4" />
              {downloaded ? 'Downloaded!' : 'Export'}
            </Button>
            <Button variant="gradient" size="md">
              <FileText className="w-4 h-4" /> Report
            </Button>
          </div>
        }
      />

      {/* Executive Summary Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden mb-8 gradient-hero p-6 sm:p-8"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-48 h-48 bg-blue-400/15 rounded-full blur-3xl" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="success">Executive Summary</Badge>
            <Badge variant="accent">iOSYS × Canada Pooch</Badge>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="sm:col-span-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                $147,000 Annual Savings<br />
                <span className="text-gradient">716% ROI in Year One</span>
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                The AI Fit Intelligence platform delivers exceptional financial returns through measurable reduction in sizing-related returns, increased conversion rates, and higher average order values.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Annual Savings', value: '$147K' },
                { label: 'ROI', value: '716%' },
                { label: 'Payback', value: '1.4 mo' },
                { label: 'Impl. Cost', value: '$18K' },
              ].map(item => (
                <div key={item.label} className="bg-white/10 border border-white/15 rounded-2xl p-3 text-center backdrop-blur-sm">
                  <p className="text-xl font-black text-white">{item.value}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards with CountUp */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {roiMetrics.map((m, i) => (
          <motion.div key={m.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-card p-5">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">{m.title}</p>
              <p className={`text-2xl sm:text-3xl font-black tracking-tight ${m.color}`}>
                <CountUp end={m.value} prefix={m.prefix ?? ''} suffix={m.suffix ?? ''} duration={1500 + i * 200} />
              </p>
              <p className="text-xs text-slate-400 mt-1">{m.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Before vs After Returns */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Return Cost Reduction</h3>
                  <p className="text-slate-500 text-sm">Monthly returns cost before & after AI</p>
                </div>
                <Badge variant="success"><ArrowUp className="w-3 h-3 rotate-180" />35% Reduction</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={data.beforeAfterReturns} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 9 }} />
                  <YAxis tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                    formatter={(v) => [`$${typeof v === 'number' ? v.toLocaleString() : v}`, 'Returns Cost']} />
                  <Bar dataKey="value" radius={[5, 5, 0, 0]}>
                    {data.beforeAfterReturns.map((_, i) => (
                      <rect key={i} fill={i >= 6 ? '#22C55E' : '#EF4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-red-500" /><span className="text-xs text-slate-500">Before AI</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-emerald-500" /><span className="text-xs text-slate-500">After AI</span></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Savings Over Time */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Cumulative Savings</h3>
                  <p className="text-slate-500 text-sm">12-month savings trajectory</p>
                </div>
                <Badge variant="default">$147K Year 1</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={data.savingsOverTime} margin={{ top: 5, right: 5, left: -5, bottom: 5 }}>
                  <defs>
                    <linearGradient id="gSavings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 9 }} />
                  <YAxis tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                    formatter={(v) => [`$${typeof v === 'number' ? v.toLocaleString() : v}`, 'Cumulative Savings']} />
                  <Area type="monotone" dataKey="value" stroke="#22C55E" fill="url(#gSavings)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Conversion Growth */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Conversion Rate Growth</h3>
                  <p className="text-slate-500 text-sm">AI impact on site-wide conversion %</p>
                </div>
                <Badge variant="accent">+119%</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={data.conversionGrowth} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 9 }} />
                  <YAxis tickFormatter={v => `${v}%`} tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                    formatter={(v) => [`${v}%`, 'Conversion Rate']} />
                  <Line type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={3} dot={{ r: 4, fill: '#2563EB' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revenue Growth */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Revenue Uplift</h3>
                  <p className="text-slate-500 text-sm">% revenue increase attributed to AI</p>
                </div>
                <Badge variant="success">+34%</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={data.revenueGrowth} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                  <defs>
                    <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 9 }} />
                  <YAxis tickFormatter={v => `${v}%`} tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                    formatter={(v) => [`${v}%`, 'Revenue Uplift']} />
                  <Area type="monotone" dataKey="value" stroke="#06B6D4" fill="url(#gRev)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Executive Summary Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <Card>
          <CardContent className="pt-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: DollarSign, label: 'Projected Annual Savings', value: '$147,000', color: 'emerald', desc: 'Based on 35% return reduction' },
                { icon: TrendingUp, label: 'Expected ROI', value: '716%', color: 'blue', desc: 'Year 1 on $18K investment' },
                { icon: BarChart2, label: 'Payback Period', value: '1.4 Months', color: 'cyan', desc: 'Fastest in category' },
                { icon: ArrowUp, label: 'Conversion Lift', value: '+22%', color: 'purple', desc: 'Site-wide conversion rate' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-${item.color}-100 dark:bg-${item.color}-900/30 flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                    <p className="text-xl font-black text-slate-900 dark:text-white">{item.value}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Info, ArrowRight, AlertCircle } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/layout/PageHeader';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export function WhyThisSize() {
  const { state } = useApp();
  const { recommendation: rec, fitFormData: form } = state;

  if (!rec || !form) {
    return (
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-amber-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No recommendation yet</h2>
        <p className="text-slate-500 mb-6">Please complete the AI Fit Finder first to see your analysis.</p>
        <Link to="/fit-finder"><Button variant="gradient" size="lg">Go to Fit Finder</Button></Link>
      </div>
    );
  }

  const radarData = [
    { metric: 'Chest Match', score: rec.chestMatch },
    { metric: 'Neck Match', score: rec.neckMatch },
    { metric: 'Back Match', score: rec.backMatch },
    { metric: 'Breed Profile', score: rec.breedSimilarity },
    { metric: 'Historical', score: rec.historicalSuccess },
  ];

  const metrics = [
    { label: 'Chest Match', value: rec.chestMatch, color: 'gradient' as const, delay: 0.1 },
    { label: 'Neck Match', value: rec.neckMatch, color: 'gradient' as const, delay: 0.2 },
    { label: 'Back Match', value: rec.backMatch, color: 'gradient' as const, delay: 0.3 },
    { label: 'Breed Similarity', value: rec.breedSimilarity, color: 'gradient' as const, delay: 0.4 },
    { label: 'Historical Success', value: rec.historicalSuccess, color: 'gradient' as const, delay: 0.5 },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        icon={Info}
        badge="AI Explanation"
        title="Why This Size?"
        subtitle={`Understanding why ${form.dogName} needs size ${rec.recommendedSize}`}
        actions={
          <Link to="/fit-visualization">
            <Button variant="gradient" size="md">
              View Fit <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        }
      />

      {/* Result Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden mb-8 gradient-hero p-6 sm:p-8"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative grid sm:grid-cols-3 gap-6 items-center">
          <div className="sm:col-span-2">
            <Badge variant="accent" className="mb-3">AI Recommendation</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {form.dogName} needs size <span className="text-gradient">{rec.recommendedSize}</span>
            </h2>
            <p className="text-slate-300 mt-3 leading-relaxed text-sm sm:text-base">{rec.explanation}</p>
          </div>
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                <motion.circle
                  cx="60" cy="60" r="50" fill="none"
                  stroke="url(#confGrad)" strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - rec.confidenceScore / 100) }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                />
                <defs>
                  <linearGradient id="confGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white">{rec.confidenceScore}%</span>
                <span className="text-slate-400 text-xs">Confidence</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Fit Score Radar</h3>
              <p className="text-slate-500 text-sm">Multi-dimensional fit analysis</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: '#94A3B8' }} />
                  <Radar
                    name="Fit Score"
                    dataKey="score"
                    stroke="#2563EB"
                    fill="#2563EB"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                  <Tooltip
                    formatter={(v) => [`${v}%`, 'Score']}
                    contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress Bars */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Match Analysis</h3>
              <p className="text-slate-500 text-sm">Individual measurement scores</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {metrics.map(m => (
                  <ProgressBar key={m.label} label={m.label} value={m.value} color={m.color} delay={m.delay} />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Explanation */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl gradient-accent flex items-center justify-center flex-shrink-0 shadow-glow-cyan">
                <Info className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">AI Recommendation Reasoning</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{rec.explanation}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                  {[
                    { label: 'Breed', value: form.breed },
                    { label: 'Weight', value: `${form.weight}kg` },
                    { label: 'Chest', value: `${form.chestSize}cm` },
                    { label: 'Size', value: rec.recommendedSize },
                  ].map(item => (
                    <div key={item.label} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 text-center">
                      <p className="text-xs text-slate-400 mb-0.5">{item.label}</p>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Link to="/fit-visualization" className="flex-1">
          <Button variant="gradient" size="lg" className="w-full">
            View Fit Visualization <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <Link to="/recommendations" className="flex-1">
          <Button variant="outline" size="lg" className="w-full">
            See Product Recommendations
          </Button>
        </Link>
      </div>
    </div>
  );
}

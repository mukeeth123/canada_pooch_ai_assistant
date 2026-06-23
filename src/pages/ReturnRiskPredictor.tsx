import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle, AlertCircle, ArrowRight, GitCompare } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/layout/PageHeader';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';

function RiskGauge({ value }: { value: number }) {
  const color = value <= 15 ? '#22C55E' : value <= 30 ? '#F59E0B' : '#EF4444';
  const label = value <= 15 ? 'Low Risk' : value <= 30 ? 'Medium Risk' : 'High Risk';
  const angle = (value / 100) * 180 - 90;
  const rad = (angle * Math.PI) / 180;
  const nx = 160 + 90 * Math.sin(rad);
  const ny = 140 - 90 * Math.cos(rad);

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 320 160" className="w-full max-w-xs">
        <defs>
          <linearGradient id="gGreen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#86EFAC" />
          </linearGradient>
          <linearGradient id="gYellow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FCD34D" />
          </linearGradient>
          <linearGradient id="gRed" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#FCA5A5" />
          </linearGradient>
        </defs>
        {/* Green zone */}
        <path d="M 60 140 A 100 100 0 0 1 113 51" fill="none" stroke="url(#gGreen)" strokeWidth="20" strokeLinecap="round" opacity={0.8} />
        {/* Yellow zone */}
        <path d="M 118 48 A 100 100 0 0 1 202 48" fill="none" stroke="url(#gYellow)" strokeWidth="20" strokeLinecap="round" opacity={0.8} />
        {/* Red zone */}
        <path d="M 207 51 A 100 100 0 0 1 260 140" fill="none" stroke="url(#gRed)" strokeWidth="20" strokeLinecap="round" opacity={0.8} />
        {/* Needle */}
        <motion.line
          x1="160" y1="140"
          initial={{ x2: 160, y2: 40 }}
          animate={{ x2: nx, y2: ny }}
          transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.3 }}
          stroke={color} strokeWidth="3.5" strokeLinecap="round"
        />
        <circle cx="160" cy="140" r="10" fill={color} opacity={0.2} />
        <circle cx="160" cy="140" r="6" fill={color} />
        <circle cx="160" cy="140" r="3" fill="white" />
        {/* Labels */}
        <text x="42" y="156" fontSize="9" fill="#22C55E" fontWeight="700">LOW</text>
        <text x="152" y="30" fontSize="9" fill="#F59E0B" fontWeight="700" textAnchor="middle">MEDIUM</text>
        <text x="268" y="156" fontSize="9" fill="#EF4444" fontWeight="700">HIGH</text>
        <text x="160" y="115" fontSize="26" fontWeight="900" fill={color} textAnchor="middle">{value}%</text>
        <text x="160" y="133" fontSize="10" fill="#64748B" textAnchor="middle">{label}</text>
      </svg>
    </div>
  );
}

const riskFactors = [
  { area: 'Chest', status: 'slightly_loose', label: 'Chest Slightly Loose', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800/40' },
  { area: 'Body', status: 'perfect', label: 'Body Length Optimal', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800/40' },
  { area: 'Neck', status: 'perfect', label: 'Neck Fit Perfect', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800/40' },
];

const compareData = [
  { size: 'XS', returnRisk: 62, fitScore: 41 },
  { size: 'S', returnRisk: 45, fitScore: 58 },
  { size: 'M', returnRisk: 28, fitScore: 72 },
  { size: 'L', returnRisk: 18, fitScore: 85 },
  { size: 'XL', returnRisk: 4, fitScore: 97 },
  { size: 'XXL', returnRisk: 12, fitScore: 92 },
];

export function ReturnRiskPredictor() {
  const { state } = useApp();
  const [compareOpen, setCompareOpen] = useState(false);
  const rec = state.recommendation;
  const returnRisk = 12;
  const altSize = rec?.alternativeSize ?? 'XL';
  const altRisk = 4;

  if (!rec) {
    return (
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-amber-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No recommendation yet</h2>
        <p className="text-slate-500 mb-6">Complete the AI Fit Finder first.</p>
        <Link to="/fit-finder"><Button variant="gradient" size="lg">Go to Fit Finder</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        icon={AlertTriangle}
        badge="Return Risk Predictor"
        title="Return Risk Analysis"
        subtitle="AI-powered return probability prediction before you buy"
        actions={
          <Button variant="gradient" size="md" onClick={() => setCompareOpen(true)}>
            <GitCompare className="w-4 h-4" /> Compare Sizes
          </Button>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Current Product */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Current Selection</h3>
            </CardHeader>
            <CardContent>
              <div className="relative rounded-2xl overflow-hidden h-40 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80"
                  alt="Expedition Parka"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                  <div>
                    <p className="text-white font-bold text-sm">Expedition Parka</p>
                    <p className="text-slate-300 text-xs">Size: {rec.recommendedSize}</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-1">Return Probability</p>
                <RiskGauge value={returnRisk} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Risk Factors */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="h-full">
            <CardHeader>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Risk Factors</h3>
              <p className="text-slate-500 text-sm">Fit analysis by area</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {riskFactors.map(rf => (
                  <motion.div
                    key={rf.area}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-center gap-3 p-3 rounded-xl border ${rf.bg} ${rf.border}`}
                  >
                    <rf.icon className={`w-5 h-5 ${rf.color} flex-shrink-0`} />
                    <div>
                      <p className={`text-sm font-semibold ${rf.color}`}>{rf.label}</p>
                      <p className="text-xs text-slate-400">{rf.area} zone</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Alternative */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40">
                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-2">🎯 AI Alternative Recommendation</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Size {altSize}</p>
                    <p className="text-xs text-slate-500">Better chest fit</p>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-600 font-black text-xl">{altRisk}%</p>
                    <p className="text-xs text-slate-400">Return Risk</p>
                  </div>
                </div>
                <div className="mt-2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${altRisk}%` }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="h-full bg-emerald-500 rounded-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="h-full">
            <CardHeader>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Risk by Size</h3>
              <p className="text-slate-500 text-sm">Return probability comparison</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={compareData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="size" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(v) => [`${v}%`, 'Return Risk']}
                    contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Bar dataKey="returnRisk" radius={[6, 6, 0, 0]}>
                    {compareData.map(entry => (
                      <Cell key={entry.size} fill={entry.size === rec.recommendedSize ? '#2563EB' : entry.returnRisk <= 10 ? '#22C55E' : entry.returnRisk <= 25 ? '#F59E0B' : '#EF4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-blue-600" /><span className="text-xs text-slate-500">Selected</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-emerald-500" /><span className="text-xs text-slate-500">Low Risk</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-red-500" /><span className="text-xs text-slate-500">High Risk</span></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Size Comparison Modal */}
      <Modal open={compareOpen} onClose={() => setCompareOpen(false)} title="Size Comparison" maxWidth="2xl">
        <div className="p-6">
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              { size: rec.recommendedSize, risk: returnRisk, fitScore: rec.confidenceScore, label: 'Current Selection', highlight: true },
              { size: altSize, risk: altRisk, fitScore: rec.confidenceScore - 3, label: 'Alternative (Lower Risk)', highlight: false },
            ].map(item => (
              <div key={item.size} className={`p-5 rounded-2xl border-2 ${item.highlight ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-black text-3xl text-slate-900 dark:text-white">Size {item.size}</p>
                    <p className="text-xs text-slate-500">{item.label}</p>
                  </div>
                  {item.highlight ? <Badge variant="default">Selected</Badge> : <Badge variant="success">Recommended Alt</Badge>}
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 dark:text-slate-300">Return Risk</span>
                      <span className={`font-bold ${item.risk <= 15 ? 'text-emerald-600' : 'text-amber-600'}`}>{item.risk}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div className={`h-full rounded-full ${item.risk <= 15 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        initial={{ width: 0 }} animate={{ width: `${item.risk}%` }} transition={{ duration: 0.8 }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 dark:text-slate-300">Fit Score</span>
                      <span className="font-bold text-blue-600">{item.fitScore}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full gradient-accent"
                        initial={{ width: 0 }} animate={{ width: `${item.fitScore}%` }} transition={{ duration: 0.8, delay: 0.2 }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300">
            <strong>AI Analysis:</strong> Size {altSize} reduces return probability by {returnRisk - altRisk}% while maintaining a {rec.confidenceScore - 3}% fit confidence score. The chest area has slightly more room in {altSize} which better accommodates natural chest expansion during movement.
          </div>
          <div className="mt-4 flex gap-3">
            <Button variant="gradient" size="md" className="flex-1" onClick={() => setCompareOpen(false)}>
              Keep Size {rec.recommendedSize}
            </Button>
            <Button variant="secondary" size="md" className="flex-1" onClick={() => setCompareOpen(false)}>
              Switch to Size {altSize}
            </Button>
          </div>
        </div>
      </Modal>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Link to="/recommendations" className="flex-1">
          <Button variant="gradient" size="lg" className="w-full">
            Shop Recommendations <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <Link to="/black-friday" className="flex-1">
          <Button variant="outline" size="lg" className="w-full">
            Black Friday Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

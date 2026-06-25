import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, ArrowRight, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/layout/PageHeader';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import DogImage from '../assets/dog/DOG.png';
import DoggImage from '../assets/dog2/DOGG.png';

function getZoneColor(score: number) {
  if (score >= 85) return { fill: '#22C55E', stroke: '#16A34A', light: '#DCFCE7', label: 'Ideal' };
  if (score >= 70) return { fill: '#F59E0B', stroke: '#D97706', light: '#FEF3C7', label: 'Good' };
  return { fill: '#EF4444', stroke: '#DC2626', light: '#FEE2E2', label: 'Attention' };
}

/* ---------- Proper side-view dog silhouette ---------- */
function DogSVG({
  chestScore,
  neckScore,
  bodyScore,
  userImage,
}: {
  chestScore: number;
  neckScore: number;
  bodyScore: number;
  userImage?: string | null;
}) {
  const neck = getZoneColor(neckScore);
  const chest = getZoneColor(chestScore);
  const body = getZoneColor(bodyScore);

  return (
    <div className="relative w-full">
      {/* Labels above */}
      <div className="flex justify-between px-2 mb-3">
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-bold text-slate-500">NECK</span>
          <span
            className="text-sm font-black px-2.5 py-0.5 rounded-full"
            style={{ color: neck.fill, background: neck.light }}
          >
            {neckScore}%
          </span>
          <span className="text-[10px] font-medium" style={{ color: neck.fill }}>{neck.label}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-bold text-slate-500">CHEST</span>
          <span
            className="text-sm font-black px-2.5 py-0.5 rounded-full"
            style={{ color: chest.fill, background: chest.light }}
          >
            {chestScore}%
          </span>
          <span className="text-[10px] font-medium" style={{ color: chest.fill }}>{chest.label}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-bold text-slate-500">BODY</span>
          <span
            className="text-sm font-black px-2.5 py-0.5 rounded-full"
            style={{ color: body.fill, background: body.light }}
          >
            {bodyScore}%
          </span>
          <span className="text-[10px] font-medium" style={{ color: body.fill }}>{body.label}</span>
        </div>
      </div>

      {/* Side-profile dog SVG */}
      <svg
        viewBox="0 0 480 320"
        className="w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <image href={userImage || DogImage} x="0" y="0" width="480" height="320" preserveAspectRatio="contain" />

        {/* ── BODY FIT ZONE OVERLAY ── */}
        <motion.ellipse
          cx="265" cy="185" rx="105" ry="52"
          fill={body.fill}
          fillOpacity={0.12}
          stroke={body.stroke}
          strokeWidth="2.5"
          strokeDasharray="8 4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        />

        {/* ── NECK ZONE OVERLAY ── */}
        <motion.ellipse
          cx="162" cy="130" rx="30" ry="40"
          fill={neck.fill}
          fillOpacity={0.18}
          stroke={neck.stroke}
          strokeWidth="2.5"
          strokeDasharray="6 3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />

        {/* ── CHEST ZONE OVERLAY ── */}
        <motion.ellipse
          cx="158" cy="190" rx="38" ry="48"
          fill={chest.fill}
          fillOpacity={0.18}
          stroke={chest.stroke}
          strokeWidth="2.5"
          strokeDasharray="6 3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        />

        {/* ── CONNECTOR LINES to labels (dotted callouts) ── */}
        {/* Neck callout */}
        <line x1="162" y1="118" x2="80" y2="50" stroke={neck.stroke} strokeWidth="1.5" strokeDasharray="4 3" opacity={0.6} />
        <circle cx="162" cy="118" r="3" fill={neck.fill} />
        {/* Chest callout */}
        <line x1="158" y1="200" x2="80" y2="240" stroke={chest.stroke} strokeWidth="1.5" strokeDasharray="4 3" opacity={0.6} />
        <circle cx="158" cy="200" r="3" fill={chest.fill} />
        {/* Body callout */}
        <line x1="280" y1="175" x2="400" y2="50" stroke={body.stroke} strokeWidth="1.5" strokeDasharray="4 3" opacity={0.6} />
        <circle cx="280" cy="175" r="3" fill={body.fill} />

        {/* ── ZONE BADGE: NECK ── */}
        <rect x="30" y="20" width="90" height="34" rx="8" fill={neck.light} stroke={neck.stroke} strokeWidth="1.5" />
        <text x="75" y="35" textAnchor="middle" fontSize="9" fontWeight="800" fill={neck.fill}>NECK ZONE</text>
        <text x="75" y="47" textAnchor="middle" fontSize="11" fontWeight="900" fill={neck.stroke}>{neckScore}% {neck.label}</text>

        {/* ── ZONE BADGE: CHEST ── */}
        <rect x="22" y="218" width="92" height="34" rx="8" fill={chest.light} stroke={chest.stroke} strokeWidth="1.5" />
        <text x="68" y="233" textAnchor="middle" fontSize="9" fontWeight="800" fill={chest.fill}>CHEST ZONE</text>
        <text x="68" y="245" textAnchor="middle" fontSize="11" fontWeight="900" fill={chest.stroke}>{chestScore}% {chest.label}</text>

        {/* ── ZONE BADGE: BODY ── */}
        <rect x="358" y="20" width="90" height="34" rx="8" fill={body.light} stroke={body.stroke} strokeWidth="1.5" />
        <text x="403" y="35" textAnchor="middle" fontSize="9" fontWeight="800" fill={body.fill}>BODY ZONE</text>
        <text x="403" y="47" textAnchor="middle" fontSize="11" fontWeight="900" fill={body.stroke}>{bodyScore}% {body.label}</text>

        {/* ── JACKET SILHOUETTE OVERLAY ── */}
        <motion.path
          d="M 148 115 C 148 108 155 100 162 100 L 380 118 C 388 118 390 126 388 136 L 386 252 C 386 258 380 260 375 258 L 165 246 C 158 244 148 238 148 230 Z"
          fill="none"
          stroke="#000000"
          strokeWidth="2.5"
          strokeDasharray="10 5"
          opacity={0.35}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
        />
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 mt-3">
        {[
          { color: 'bg-emerald-500', label: 'Ideal (≥85%)' },
          { color: 'bg-amber-500', label: 'Good (70–84%)' },
          { color: 'bg-red-500', label: 'Attention (<70%)' },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
            <span className="text-xs text-slate-500">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Fit Meter gauge ---------- */
function FitMeter({ score }: { score: number }) {
  const color = score >= 85 ? '#22C55E' : score >= 70 ? '#F59E0B' : '#EF4444';
  const label = score >= 85 ? 'Ideal Fit' : score >= 70 ? 'Good Fit' : 'Needs Attention';

  // needle: 0% = left (-90°), 100% = right (+90°), 50% = top (0°)
  const angle = ((score / 100) * 180 - 90) * (Math.PI / 180);
  const R = 105;
  const cx = 160;
  const cy = 145;
  const nx = cx + R * Math.cos(angle);
  const ny = cy + R * Math.sin(angle);

  return (
    <svg viewBox="0 0 320 175" className="w-full max-w-sm mx-auto">
      {/* Track */}
      <path d="M 55 145 A 105 105 0 0 1 265 145" fill="none" stroke="#F1F5F9" strokeWidth="22" strokeLinecap="round" />
      {/* Red zone left */}
      <path d="M 55 145 A 105 105 0 0 1 95 65" fill="none" stroke="#FEE2E2" strokeWidth="22" strokeLinecap="round" />
      {/* Green zone centre */}
      <path d="M 108 52 A 105 105 0 0 1 212 52" fill="none" stroke="#DCFCE7" strokeWidth="22" strokeLinecap="round" />
      {/* Yellow zone right */}
      <path d="M 225 65 A 105 105 0 0 1 265 145" fill="none" stroke="#FEF3C7" strokeWidth="22" strokeLinecap="round" />

      {/* Zone labels on arc */}
      <text x="42" y="168" fontSize="9" fill="#EF4444" fontWeight="700">Too Tight</text>
      <text x="140" y="25" fontSize="9" fill="#22C55E" fontWeight="700" textAnchor="middle">Ideal Fit</text>
      <text x="243" y="168" fontSize="9" fill="#F59E0B" fontWeight="700">Too Loose</text>

      {/* Needle shadow */}
      <motion.line
        x1={cx} y1={cy}
        initial={{ x2: cx, y2: cy - R }}
        animate={{ x2: nx, y2: ny }}
        transition={{ type: 'spring', stiffness: 60, damping: 14, delay: 0.3 }}
        stroke="#00000015" strokeWidth="6" strokeLinecap="round"
      />
      {/* Needle */}
      <motion.line
        x1={cx} y1={cy}
        initial={{ x2: cx, y2: cy - R }}
        animate={{ x2: nx, y2: ny }}
        transition={{ type: 'spring', stiffness: 60, damping: 14, delay: 0.3 }}
        stroke={color} strokeWidth="4" strokeLinecap="round"
      />
      {/* Hub */}
      <circle cx={cx} cy={cy} r="12" fill={color} opacity={0.2} />
      <circle cx={cx} cy={cy} r="7" fill={color} />
      <circle cx={cx} cy={cy} r="3.5" fill="white" />

      {/* Score text */}
      <text x={cx} y={cy - 22} textAnchor="middle" fontSize="30" fontWeight="900" fill={color}>{score}%</text>
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fill="#64748B">{label}</text>
    </svg>
  );
}

/* ---------- Page ---------- */
export function FitVisualization() {
  const { state } = useApp();
  const { recommendation: rec, fitFormData: form } = state;

  const mobilityRef = useRef(
    rec ? Math.min(99, Math.round((rec.chestMatch + rec.neckMatch + rec.backMatch) / 3) - 1) : 0
  );

  if (!rec || !form) {
    return (
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-amber-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No recommendation yet</h2>
        <p className="text-slate-500 mb-6">Complete the AI Fit Finder first.</p>
        <Link to="/fit-finder">
          <Button variant="gradient" size="lg">Go to Fit Finder</Button>
        </Link>
      </div>
    );
  }

  const fitScore = Math.round((rec.chestMatch + rec.neckMatch + rec.backMatch) / 3);
  const mobilityScore = mobilityRef.current;

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        icon={Eye}
        badge="Fit Visualization"
        title="Visual Fit Analysis"
        subtitle={`AI body-comfort mapping for ${form.dogName} — Size ${rec.recommendedSize}`}
        actions={
          <Link to="/recommendations">
            <Button variant="gradient" size="md">
              Shop Now <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        }
      />

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Dog Visualization — takes more space */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-3"
        >
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Body Comfort Map</h3>
              <p className="text-slate-500 text-sm">
                Color-coded fit zones with jacket overlay — {form.breed} profile
              </p>
            </CardHeader>
            <CardContent>
              <DogSVG
                chestScore={rec.chestMatch}
                neckScore={rec.neckMatch}
                bodyScore={rec.backMatch}
                userImage={state.selectedDogProfile === 'dog2' ? DoggImage : state.userDogImage}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Right column: gauge + bars */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-5"
        >
          {/* Fit Meter */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Overall Fit Score</h3>
              <p className="text-slate-500 text-sm">Composite comfort rating</p>
            </CardHeader>
            <CardContent>
              <FitMeter score={fitScore} />
            </CardContent>
          </Card>

          {/* Comfort bars */}
          <Card>
            <CardHeader>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Comfort Breakdown</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ProgressBar label="Chest Comfort" value={rec.chestMatch} color="gradient" delay={0.2} />
                <ProgressBar label="Neck Comfort"  value={rec.neckMatch}  color="gradient" delay={0.3} />
                <ProgressBar label="Body Comfort"  value={rec.backMatch}  color="gradient" delay={0.4} />
                <ProgressBar label="Mobility"      value={mobilityScore}  color="cyan"     delay={0.5} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* KPI strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6"
      >
        {[
          { label: 'Recommended Size', value: rec.recommendedSize, color: 'text-black dark:text-white' },
          { label: 'Fit Score',        value: `${fitScore}%`,           color: 'text-emerald-600' },
          { label: 'Confidence',       value: `${rec.confidenceScore}%`, color: 'text-neutral-600 dark:text-neutral-400' },
          { label: 'Mobility',         value: `${mobilityScore}%`,       color: 'text-purple-600' },
        ].map(item => (
          <Card key={item.label} className="text-center p-4">
            <p className="text-xs text-slate-400 mb-1">{item.label}</p>
            <p className={`text-2xl sm:text-3xl font-black ${item.color}`}>{item.value}</p>
          </Card>
        ))}
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Link to="/recommendations" className="flex-1">
          <Button variant="gradient" size="lg" className="w-full">
            See AI Recommendations <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

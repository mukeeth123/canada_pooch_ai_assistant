import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Zap, Shield, TrendingUp, Star, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button';

const kpis = [
  { value: '95%', label: 'Fit Accuracy', color: 'text-white' },
  { value: '38%', label: 'Fewer Returns', color: 'text-neutral-300' },
  { value: '22%', label: 'Higher Conversion', color: 'text-emerald-400' },
  { value: '18%', label: 'Higher AOV', color: 'text-amber-400' },
];

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Sizing',
    desc: 'Breed-specific algorithms trained on 14,000+ real sizing outcomes deliver 95% accuracy.',
    color: 'bg-black',
  },
  {
    icon: Shield,
    title: 'Return Risk Prediction',
    desc: 'Know the probability of a return before purchase and offer the optimal alternative.',
    color: 'bg-neutral-700',
  },
  {
    icon: TrendingUp,
    title: 'Revenue Intelligence',
    desc: '$147K annual savings with 716% ROI. Payback in under 6 weeks.',
    color: 'bg-emerald-500',
  },
];

const steps = [
  { num: '01', title: 'Enter Dog Profile', desc: 'Breed, age, weight, and key measurements.' },
  { num: '02', title: 'AI Analysis', desc: 'Our model cross-references 50+ breed profiles and 14,000+ fit outcomes.' },
  { num: '03', title: 'Perfect Fit', desc: 'Get a size recommendation with a confidence score and clear reasoning.' },
];

const testimonials = [
  { name: 'Sarah M.', dog: 'Luna (Golden Retriever)', rating: 5, text: 'The AI recommended XXL and it fits perfectly. No more guessing!' },
  { name: 'James T.', dog: 'Buster (French Bulldog)', rating: 5, text: 'Finally a tool that understands Frenchie sizing. Incredible.' },
  { name: 'Emily R.', dog: 'Max (Husky)', rating: 5, text: 'Returned 3 jackets before finding this. Now I get it right every time.' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

export function Landing() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="gradient-hero min-h-screen flex flex-col justify-center relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-neutral-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-neutral-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-neutral-400/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 py-24 sm:py-32 grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-white text-xs font-semibold mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              AI-Powered Enterprise Fit Intelligence
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-tight tracking-tight"
            >
              Canada Pooch
              <span className="block text-gradient mt-1">AI Fit Intelligence</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-slate-300 text-lg sm:text-xl leading-relaxed max-w-xl"
            >
              Reduce Returns. Increase Customer Confidence. Drive More Revenue.
              <span className="block mt-2 text-slate-400 text-base">
                The enterprise AI platform purpose-built for Canada Pooch.
              </span>
            </motion.p>

            {/* KPIs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8"
            >
              {kpis.map((k, i) => (
                <motion.div
                  key={k.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 text-center backdrop-blur-sm"
                >
                  <div className={`text-2xl sm:text-3xl font-black ${k.color}`}>{k.value}</div>
                  <div className="text-slate-400 text-xs mt-1 font-medium">{k.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 mt-8"
            >
              <Link to="/fit-finder">
                <Button size="lg" variant="gradient" className="w-full sm:w-auto">
                  Find My Dog's Perfect Fit
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/interactions">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 hover:border-white/40">
                  View Interaction Analytics
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
              <img
                src="https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=700&q=80"
                alt="Golden Retriever wearing Canada Pooch jacket"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              {/* Floating card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-800 font-bold text-sm">Max — Golden Retriever</p>
                    <p className="text-slate-500 text-xs">AI Recommendation: XXL</p>
                  </div>
                  <div className="text-right">
                    <p className="text-black font-black text-xl">96%</p>
                    <p className="text-slate-400 text-xs">Confidence</p>
                  </div>
                </div>
                <div className="mt-3 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '96%' }}
                    transition={{ delay: 1, duration: 1 }}
                    className="h-full gradient-accent rounded-full"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ChevronDown className="w-6 h-6 text-slate-400" />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28 bg-white dark:bg-slate-900">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp()} className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900/30 text-black dark:text-neutral-400 text-xs font-semibold mb-4">
              <Zap className="w-3 h-3" /> Enterprise Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              AI intelligence built for <span className="text-gradient">modern commerce</span>
            </h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400">
              Not just a size chart. A full fit intelligence platform that drives measurable revenue outcomes.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div {...fadeUp(i * 0.15)} key={f.title}>
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-3xl p-8 h-full hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-slate-100 dark:border-slate-700/50">
                  <div className={`w-12 h-12 ${f.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <f.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{f.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dog Gallery */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              Built for every breed
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">50+ breed profiles. Millions of fit data points.</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Golden Retriever', img: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=300&q=80' },
              { name: 'Labrador', img: 'https://images.unsplash.com/photo-1611003228941-98852ba62227?w=300&q=80' },
              { name: 'German Shepherd', img: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=300&q=80' },
              { name: 'French Bulldog', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&q=80' },
              { name: 'Husky', img: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=300&q=80' },
              { name: 'Poodle', img: 'https://images.unsplash.com/photo-1616684000067-36952fde56ec?w=300&q=80' },
            ].map((b, i) => (
              <motion.div
                key={b.name}
                {...fadeUp(i * 0.08)}
                className="group relative rounded-2xl overflow-hidden aspect-square shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <img src={b.img} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                <p className="absolute bottom-2 left-0 right-0 text-center text-white text-xs font-bold px-1 leading-tight">{b.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28 bg-white dark:bg-slate-900">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">How it works</h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">Three steps to a perfect fit, every time.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div {...fadeUp(i * 0.15)} key={s.num} className="text-center relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-slate-200 dark:bg-slate-700" />
                )}
                <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-6 shadow-glow-cyan">
                  <span className="text-white font-black text-lg">{s.num}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{s.title}</h3>
                <p className="text-slate-500 dark:text-slate-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Loved by dog parents</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div {...fadeUp(i * 0.15)} key={t.name}>
                <div className="bg-white dark:bg-slate-800/60 rounded-3xl p-6 shadow-card border border-slate-100 dark:border-slate-700/50 h-full">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 italic leading-relaxed mb-4">"{t.text}"</p>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.dog}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-neutral-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neutral-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-screen-md mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Ready to eliminate sizing guesswork?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Join Canada Pooch in delivering the most intelligent dog-apparel shopping experience in the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/fit-finder">
                <Button size="xl" variant="gradient" className="w-full sm:w-auto bg-white text-black hover:bg-slate-50">
                  Start Fit Analysis <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/roi-dashboard">
                <Button size="xl" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                  View Executive ROI
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl overflow-hidden shadow-sm bg-white">
                <img src="/canda_pooch.png" alt="Canada Pooch" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Canada Pooch AI Fit Intelligence</p>
                <p className="text-slate-500 text-xs">Powered by iOSYS · Enterprise Demo</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Targeting September 2024 · Ready Before Black Friday</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

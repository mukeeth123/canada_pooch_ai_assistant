import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Zap, Star, ChevronDown, Camera, Ruler, SlidersHorizontal, Palette, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';

import DogBase from '../assets/dog/DOG.png';
import Coat1 from '../assets/dog/Coat_1/Full_1.png';
import CoatPink from '../assets/dog/Coat_1/Pink_3.png';
import CoatBlue from '../assets/dog/Coat_1/Blue_1.png';

const kpis = [
  { value: '95%', label: 'Fit Accuracy', color: 'text-white' },
  { value: '38%', label: 'Fewer Returns', color: 'text-neutral-300' },
  { value: '22%', label: 'Higher Conversion', color: 'text-emerald-400' },
  { value: '18%', label: 'Higher AOV', color: 'text-amber-400' },
];

const features = [
  {
    icon: Camera,
    title: 'Photo & Video Upload',
    desc: 'Simply snap a photo or upload a quick video. Our AI instantly analyzes your dog\'s proportions and breed characteristics.',
    color: 'bg-emerald-500',
  },
  {
    icon: Ruler,
    title: 'Manual Sizing Entry',
    desc: 'Prefer exact numbers? Manually enter your dog\'s chest, neck, back, and weight for pinpoint fit recommendations.',
    color: 'bg-blue-500',
  },
  {
    icon: SlidersHorizontal,
    title: 'Advanced Filtering',
    desc: 'Effortlessly filter recommendations by coats, boots, harnesses, and specific sub-categories tailored for your dog.',
    color: 'bg-amber-500',
  },
  {
    icon: Palette,
    title: 'Dynamic Color Variants',
    desc: 'Quickly toggle between different colors and styles for any product and see the high-quality imagery update instantly.',
    color: 'bg-purple-500',
  },
  {
    icon: Sparkles,
    title: 'AI Virtual Try-On',
    desc: 'Take the guesswork out of shopping. See exactly how the gear looks on your dog before you add it to the cart.',
    color: 'bg-rose-500',
  },
  {
    icon: Zap,
    title: '95% Fit Accuracy Engine',
    desc: 'Our proprietary algorithm cross-references 14,000+ real outcomes to deliver the exact size your dog needs.',
    color: 'bg-black',
  },
];

const workflowSteps = [
  {
    num: '01',
    title: 'Photo, Video & Manual Sizing',
    desc: 'Skip the measuring tape—simply upload a photo or video of your dog for instant AI analysis. Prefer exact numbers? You can also enter manual measurements to build a complete profile in seconds.',
    img: DogBase,
    tag: 'Fit Finder'
  },
  {
    num: '02',
    title: 'Smart Recommendations & Filtering',
    desc: 'Browse a curated collection of outerwear, gear, and boots. Use our advanced filters to narrow down categories and instantly see which products have the highest fit accuracy for your dog.',
    img: Coat1,
    tag: 'Smart Shopping'
  },
  {
    num: '03',
    title: 'Virtual Try-On & Color Swap',
    desc: 'Found a style you like? Toggle through different color variants and click "Try" to see an AI-generated preview of your dog wearing the exact gear. Buy with absolute confidence.',
    img: CoatPink,
    tag: 'Confidence'
  },
  {
    num: '04',
    title: 'Perfect Fit Delivery',
    desc: 'Receive gear that fits flawlessly on the first try. Say goodbye to returns and hello to adventure with boots, coats, and harnesses that feel custom-made.',
    img: CoatBlue,
    tag: 'Happy Dogs'
  },
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
              Every Pet Deserves
              <span className="block text-[#C17A3D] mt-1">the Perfect Fit.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-slate-300 text-lg sm:text-xl leading-relaxed max-w-xl"
            >
              Intelligent fit recommendations for every pet
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
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-xl shadow-emerald-900/20">
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
              Everything you need for the <span className="text-gradient">perfect fit</span>
            </h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400">
              Multiple ways to measure, advanced filtering, and immersive product exploration built specifically for dogs.
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

      {/* Complete Workflow */}
      <section className="py-20 sm:py-28 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp()} className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">The Complete Workflow</h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg">From a single photo to the perfect fit. Experience a seamless, intelligent shopping journey designed specifically for dogs.</p>
          </motion.div>
          
          <div className="relative max-w-5xl mx-auto">
            {/* The vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500/20 via-emerald-500 to-transparent md:-translate-x-1/2 hidden sm:block rounded-full" />

            <div className="space-y-24 relative">
              {workflowSteps.map((step, i) => (
                <div key={step.num} className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline dot */}
                  <div className="hidden sm:flex absolute left-8 md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-full bg-slate-900 border-4 border-emerald-500 items-center justify-center z-10 shadow-xl shadow-emerald-900/20">
                    <span className="text-emerald-500 font-black text-lg">{step.num}</span>
                  </div>

                  {/* Text Content */}
                  <div className={`flex-1 w-full space-y-6 sm:pl-24 md:pl-0 ${i % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <motion.div {...fadeUp()} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider shadow-sm ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> {step.tag}
                    </motion.div>
                    <motion.h3 {...fadeUp(0.1)} className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                      {step.title}
                    </motion.h3>
                    <motion.p {...fadeUp(0.2)} className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                      {step.desc}
                    </motion.p>
                  </div>
                  
                  {/* Visual Content */}
                  <div className="flex-1 w-full relative group sm:pl-24 md:pl-0">
                    <motion.div {...fadeUp(0.3)} className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-black/50 aspect-square md:aspect-[4/3] bg-white dark:bg-neutral-900 border border-slate-200 dark:border-slate-700/50 z-20">
                      <img src={step.img} alt={step.title} className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
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

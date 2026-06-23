import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, CheckCircle, Loader2, Dog } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import type { FitFormData } from '../types';
import { BREED_NAMES } from '../mock/breeds';

const schema = z.object({
  dogName: z.string().min(1, 'Dog name is required').max(40),
  breed: z.string().refine(v => BREED_NAMES.includes(v), { message: 'Select a breed' }),
  age: z.number().min(0.5, 'Min 0.5').max(20),
  gender: z.enum(['Male', 'Female']),
  weight: z.number().min(1).max(100),
  chestSize: z.number().min(20).max(120),
  neckSize: z.number().min(15).max(80),
  backLength: z.number().min(15).max(100),
});

type FormData = z.infer<typeof schema>;

const PROCESSING_STEPS = [
  'Analyzing Breed Profile...',
  'Comparing Measurements...',
  'Matching Product Database...',
  'Calculating Fit Confidence...',
  'Generating Recommendation...',
];

export function AiFitFinder() {
  const { state, submitFitForm } = useApp();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [done, setDone] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: state.fitFormData ?? undefined,
  });

  const onSubmit = (data: FormData) => {
    setProcessing(true);
    setStepIdx(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setStepIdx(i);
      if (i >= PROCESSING_STEPS.length - 1) {
        clearInterval(interval);
        setTimeout(() => {
          submitFitForm(data as FitFormData);
          setDone(true);
          setProcessing(false);
          setTimeout(() => navigate('/why-this-size'), 1200);
        }, 600);
      }
    }, 500);
  };

  const inputClass = (err?: { message?: string }) =>
    `w-full px-4 py-3 rounded-xl border ${err ? 'border-red-400 bg-red-50 dark:bg-red-900/10' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'} text-slate-900 dark:text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all`;

  return (
    <div className="max-w-screen-md mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        icon={Ruler}
        badge="AI Fit Finder"
        title="Find Your Dog's Perfect Fit"
        subtitle="Enter your dog's profile and measurements for an AI-powered size recommendation with 95% accuracy."
      />

      {/* Dog Image Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative rounded-3xl overflow-hidden mb-8 h-48 sm:h-56"
      >
        <img
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=900&q=80"
          alt="Dogs wearing jackets"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/40 to-transparent flex items-center px-8">
          <div>
            <p className="text-white font-black text-xl sm:text-2xl">14,000+ sizing outcomes</p>
            <p className="text-slate-300 text-sm mt-1">trained into our breed-aware AI model</p>
          </div>
        </div>
      </motion.div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Dog Info */}
            <div>
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Dog className="w-4 h-4" /> Dog Profile
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Dog Name *</label>
                  <input {...register('dogName')} placeholder="e.g. Max" className={inputClass(errors.dogName)} />
                  {errors.dogName && <p className="text-red-500 text-xs mt-1">{errors.dogName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Breed *</label>
                  <select {...register('breed')} className={inputClass(errors.breed)}>
                    <option value="">Select breed...</option>
                    {BREED_NAMES.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  {errors.breed && <p className="text-red-500 text-xs mt-1">{errors.breed.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Age (years) *</label>
                  <input {...register('age', { valueAsNumber: true })} type="number" step="0.5" placeholder="e.g. 3" className={inputClass(errors.age)} />
                  {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Gender *</label>
                  <select {...register('gender')} className={inputClass(errors.gender)}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Measurements */}
            <div>
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Ruler className="w-4 h-4" /> Measurements
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { field: 'weight' as const, label: 'Weight (kg)', placeholder: 'e.g. 32' },
                  { field: 'chestSize' as const, label: 'Chest Girth (cm)', placeholder: 'e.g. 68' },
                  { field: 'neckSize' as const, label: 'Neck Girth (cm)', placeholder: 'e.g. 46' },
                  { field: 'backLength' as const, label: 'Back Length (cm)', placeholder: 'e.g. 54' },
                ].map(({ field, label, placeholder }) => (
                  <div key={field}>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">{label} *</label>
                    <input
                      {...register(field, { valueAsNumber: true })}
                      type="number"
                      step="0.5"
                      placeholder={placeholder}
                      className={inputClass(errors[field])}
                    />
                    {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]?.message}</p>}
                  </div>
                ))}
              </div>

              {/* Measurement Guide */}
              <div className="mt-4 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40">
                <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-2">📏 How to measure</p>
                <ul className="space-y-1 text-xs text-blue-600 dark:text-blue-300">
                  <li><strong>Chest:</strong> Widest part behind the front legs</li>
                  <li><strong>Neck:</strong> Widest part of the neck, where collar sits</li>
                  <li><strong>Back:</strong> Base of neck to base of tail</li>
                </ul>
              </div>
            </div>

            <Button type="submit" size="lg" variant="gradient" className="w-full" disabled={processing}>
              {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Ruler className="w-5 h-5" />}
              {processing ? 'Analyzing...' : 'Analyze My Dog'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Processing Overlay */}
      <AnimatePresence>
        {(processing || done) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl"
            >
              {done ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                  <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">Analysis Complete!</h3>
                  <p className="text-slate-500 text-sm mt-2">Redirecting to your recommendation...</p>
                </motion.div>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-full gradient-accent flex items-center justify-center mx-auto mb-6 shadow-glow-cyan">
                    <Loader2 className="w-10 h-10 text-white animate-spin" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">AI Analysis Running</h3>
                  <div className="space-y-3">
                    {PROCESSING_STEPS.map((step, i) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: i <= stepIdx ? 1 : 0.3, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                          i < stepIdx ? 'bg-emerald-100 dark:bg-emerald-900/40' : i === stepIdx ? 'gradient-accent' : 'bg-slate-100 dark:bg-slate-800'
                        }`}>
                          {i < stepIdx
                            ? <CheckCircle className="w-3 h-3 text-emerald-600" />
                            : i === stepIdx
                            ? <Loader2 className="w-3 h-3 text-white animate-spin" />
                            : <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                          }
                        </div>
                        <span className={`text-sm text-left ${i === stepIdx ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-400'}`}>
                          {step}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, CheckCircle, Loader2, Dog, Camera, Upload, X, Image, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import type { FitFormData } from '../types';
import { BREED_NAMES } from '../mock/breeds';
import { BREED_ESTIMATES, DEFAULT_ESTIMATE } from '../mock/tryon';

const schema = z.object({
  dogName: z.string().min(1, 'Dog name is required').max(40),
  breed: z.string().refine(v => BREED_NAMES.includes(v), { message: 'Select a breed' }),
  age: z.number().min(0.5, 'Min 0.5').max(20),
  gender: z.enum(['Male', 'Female']),
  weight: z.number().min(1).max(100).optional().or(z.nan()),
  chestSize: z.number().min(20).max(120).optional().or(z.nan()),
  neckSize: z.number().min(15).max(80).optional().or(z.nan()),
  backLength: z.number().min(15).max(100).optional().or(z.nan()),
  pawWidth: z.number().min(1).max(20).optional().or(z.nan()),
  pawLength: z.number().min(1).max(20).optional().or(z.nan()),
});

type FormData = z.infer<typeof schema>;

const PROCESSING_STEPS = [
  'Analyzing Breed Profile...',
  'Comparing Measurements...',
  'Matching Product Database...',
  'Calculating Fit Confidence...',
  'Generating Recommendation...',
];

const PHOTO_STEPS = [
  { label: 'Detecting dog in photo...', icon: '🐾' },
  { label: 'Identifying breed characteristics...', icon: '🔍' },
  { label: 'Estimating body measurements...', icon: '📏' },
  { label: 'Calculating size from proportions...', icon: '🤖' },
  { label: 'Confidence score ready!', icon: '✅' },
];

export function AiFitFinder() {
  const { state, submitFitForm } = useApp();
  const navigate = useNavigate();

  // mode: manual | photo
  const [mode, setMode] = useState<'manual' | 'photo'>('manual');

  // photo upload state
  const [uploadedFiles, setUploadedFiles] = useState<{ file: File; preview: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [photoAnalyzing, setPhotoAnalyzing] = useState(false);
  const [photoStep, setPhotoStep] = useState(0);
  const [photoComplete, setPhotoComplete] = useState(false);
  const [detectedBreed, setDetectedBreed] = useState('');
  const [photoConfidence, setPhotoConfidence] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // form submission state
  const [processing, setProcessing] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [done, setDone] = useState(false);

  const { register, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: state.fitFormData ?? undefined,
  });
  const breedValue = watch('breed');

  // ── photo upload handlers ────────────────────────────────────────────────
  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const newPreviews = Array.from(files)
      .filter(f => f.type.startsWith('image/'))
      .slice(0, 5)
      .map(file => ({ file, preview: URL.createObjectURL(file) }));
    setUploadedFiles(prev => [...prev, ...newPreviews].slice(0, 5));
    setPhotoComplete(false);
  }, []);

  const removeFile = (idx: number) => {
    setUploadedFiles(prev => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
    setPhotoComplete(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const runPhotoAnalysis = () => {
    if (uploadedFiles.length === 0) return;
    setPhotoAnalyzing(true);
    setPhotoStep(0);

    // Pick a random breed from common ones or use selected
    const mockBreed = breedValue && BREED_NAMES.includes(breedValue)
      ? breedValue
      : (['Golden Retriever', 'Labrador', 'French Bulldog', 'German Shepherd', 'Husky', 'Poodle'][
          Math.floor(Math.random() * 6)
        ]);

    let step = 0;
    const iv = setInterval(() => {
      step++;
      setPhotoStep(step);
      if (step >= PHOTO_STEPS.length - 1) {
        clearInterval(iv);
        setTimeout(() => {
          const est = BREED_ESTIMATES[mockBreed] ?? DEFAULT_ESTIMATE;
          // auto-fill form with small jitter
          const jitter = (base: number, range = 3) =>
            Math.round((base + (Math.random() * range * 2 - range)) * 10) / 10;

          if (!getValues('dogName')) setValue('dogName', 'My Dog');
          if (!getValues('age')) setValue('age', 3);
          if (!getValues('gender')) setValue('gender', 'Male');

          setValue('breed', mockBreed);
          setValue('weight', jitter(est.weight));
          setValue('chestSize', jitter(est.chestSize));
          setValue('neckSize', jitter(est.neckSize));
          setValue('backLength', jitter(est.backLength));
          setValue('pawWidth', jitter(6, 1));
          setValue('pawLength', jitter(7, 1));
          setDetectedBreed(mockBreed);
          setPhotoConfidence(est.confidence);
          setPhotoAnalyzing(false);
          setPhotoComplete(true);
        }, 600);
      }
    }, 650);
  };

  // ── form submit ──────────────────────────────────────────────────────────
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
    `w-full px-4 py-3 rounded-xl border ${err
      ? 'border-red-400 bg-red-50 dark:bg-red-900/10'
      : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900'
    } text-neutral-900 dark:text-white text-sm outline-none focus:border-black focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700 transition-all`;

  return (
    <div className="max-w-screen-md mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        icon={Ruler}
        badge="AI Fit Finder"
        title="Find Your Dog's Perfect Fit"
        subtitle="Upload photos or enter measurements — our AI delivers a breed-aware size recommendation with 95% accuracy."
      />

      {/* Hero Banner */}
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent flex items-center px-8">
          <div>
            <p className="text-white font-black text-xl sm:text-2xl">14,000+ sizing outcomes</p>
            <p className="text-slate-300 text-sm mt-1">trained into our breed-aware AI model</p>
          </div>
        </div>
      </motion.div>

      {/* Mode Toggle */}
      <div className="flex rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden mb-6">
        <button
          onClick={() => setMode('manual')}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-bold uppercase tracking-wide transition-all ${
            mode === 'manual'
              ? 'bg-black text-white'
              : 'bg-white dark:bg-neutral-900 text-neutral-500 hover:text-black hover:bg-neutral-50 dark:hover:bg-neutral-800'
          }`}
        >
          <Ruler className="w-4 h-4" /> Enter Measurements
        </button>
        <button
          onClick={() => setMode('photo')}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-bold uppercase tracking-wide transition-all ${
            mode === 'photo'
              ? 'bg-black text-white'
              : 'bg-white dark:bg-neutral-900 text-neutral-500 hover:text-black hover:bg-neutral-50 dark:hover:bg-neutral-800'
          }`}
        >
          <Camera className="w-4 h-4" /> Upload Dog Photos
        </button>
      </div>

      {/* ── PHOTO UPLOAD TAB ──────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {mode === 'photo' && (
          <motion.div
            key="photo"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <Card className="mb-4">
              <CardContent className="pt-6 space-y-5">
                {/* Info banner */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex gap-3">
                  <Sparkles className="w-5 h-5 text-black dark:text-white flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-neutral-900 dark:text-white mb-1">AI Photo Measurement</p>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Don't know your dog's measurements? Upload 1–5 clear photos. Our computer vision model
                      detects breed, estimates chest girth, neck girth, and back length, then auto-fills the form.
                      <br /><span className="font-semibold text-neutral-700 dark:text-neutral-300">Best results: full body side view in good lighting.</span>
                    </p>
                  </div>
                </div>

                {/* Drag & Drop zone */}
                <div
                  onDrop={onDrop}
                  onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-black bg-neutral-50 dark:bg-neutral-900 scale-[1.01]'
                      : 'border-neutral-300 dark:border-neutral-700 hover:border-black hover:bg-neutral-50 dark:hover:bg-neutral-900'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={e => addFiles(e.target.files)}
                  />
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                      <Upload className="w-7 h-7 text-neutral-600 dark:text-neutral-400" />
                    </div>
                    <div>
                      <p className="font-bold text-neutral-800 dark:text-white text-sm">Drop photos here or click to browse</p>
                      <p className="text-xs text-neutral-500 mt-1">JPG, PNG, HEIC — up to 5 photos • One photo is enough</p>
                    </div>
                  </div>
                </div>

                {/* Preview grid */}
                {uploadedFiles.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                      {uploadedFiles.length} photo{uploadedFiles.length > 1 ? 's' : ''} uploaded
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {uploadedFiles.map((f, i) => (
                        <div key={i} className="relative rounded-xl overflow-hidden aspect-square group">
                          <img src={f.preview} alt="" className="w-full h-full object-cover" />
                          <button
                            onClick={e => { e.stopPropagation(); removeFile(i); }}
                            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          {i === 0 && (
                            <span className="absolute bottom-1 left-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/70 text-white">PRIMARY</span>
                          )}
                        </div>
                      ))}
                      {/* Add more */}
                      {uploadedFiles.length < 5 && (
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="aspect-square rounded-xl border-2 border-dashed border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:border-black transition-colors"
                        >
                          <Image className="w-5 h-5 text-neutral-400" />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Photo analysis steps (while analyzing) */}
                {photoAnalyzing && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2.5">
                    {PHOTO_STEPS.map((s, i) => (
                      <motion.div
                        key={s.label}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: i <= photoStep ? 1 : 0.25, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm transition-all ${
                          i < photoStep ? 'bg-emerald-100' : i === photoStep ? 'bg-black' : 'bg-neutral-100 dark:bg-neutral-800'
                        }`}>
                          {i < photoStep
                            ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            : i === photoStep
                            ? <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                            : <span className="text-neutral-400 text-[10px]">{i + 1}</span>
                          }
                        </div>
                        <span className={`text-sm ${i === photoStep ? 'font-bold text-neutral-900 dark:text-white' : 'text-neutral-400'}`}>
                          {s.icon} {s.label}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Photo analysis result */}
                {photoComplete && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <p className="font-bold text-emerald-800 dark:text-emerald-300 text-sm">
                        AI Analysis Complete — {photoConfidence}% confidence
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Detected Breed', value: detectedBreed },
                        { label: 'Chest Girth', value: `${watch('chestSize')} cm (est.)` },
                        { label: 'Neck Girth', value: `${watch('neckSize')} cm (est.)` },
                        { label: 'Back Length', value: `${watch('backLength')} cm (est.)` },
                        { label: 'Paw Width', value: `${watch('pawWidth')} cm (est.)` },
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-white dark:bg-emerald-900/10 rounded-xl p-2.5">
                          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{label}</p>
                          <p className="text-sm font-bold text-neutral-900 dark:text-white mt-0.5">{value}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400">
                      Measurements auto-filled below. Review and adjust if needed, then click Analyze.
                    </p>
                    <button
                      onClick={() => { setMode('manual'); }}
                      className="text-xs font-bold text-emerald-700 dark:text-emerald-400 underline underline-offset-2"
                    >
                      Review &amp; edit measurements →
                    </button>
                  </motion.div>
                )}

                {/* Analyse button */}
                {!photoAnalyzing && !photoComplete && (
                  <Button
                    type="button"
                    size="lg"
                    variant="gradient"
                    className="w-full"
                    disabled={uploadedFiles.length === 0}
                    onClick={runPhotoAnalysis}
                  >
                    <Sparkles className="w-5 h-5" /> Analyse {uploadedFiles.length > 0 ? `${uploadedFiles.length} Photo${uploadedFiles.length > 1 ? 's' : ''}` : 'Photos'}
                  </Button>
                )}

                {!photoAnalyzing && photoComplete && (
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      size="lg"
                      variant="outline"
                      className="flex-1"
                      onClick={runPhotoAnalysis}
                    >
                      <CheckCircle className="w-5 h-5" /> Re-Analyse
                    </Button>
                    <Button
                      type="button"
                      size="lg"
                      variant="gradient"
                      className="flex-1"
                      onClick={() => {
                        const data: FormData = {
                          dogName: getValues('dogName') || 'My Dog',
                          breed: detectedBreed,
                          age: getValues('age') || 3,
                          gender: getValues('gender') || 'Male',
                          weight: getValues('weight') || undefined,
                          chestSize: getValues('chestSize') || undefined,
                          neckSize: getValues('neckSize') || undefined,
                          backLength: getValues('backLength') || undefined,
                          pawWidth: getValues('pawWidth') || undefined,
                          pawLength: getValues('pawLength') || undefined,
                        };
                        onSubmit(data);
                      }}
                    >
                      <Ruler className="w-5 h-5" /> See Recommended Size
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ── MANUAL FORM TAB ───────────────────────────────────────────── */}
        {mode === 'manual' && (
          <motion.div
            key="manual"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Photo AI result notice */}
                  {photoComplete && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      Measurements pre-filled from AI photo analysis ({photoConfidence}% confidence) — breed: {detectedBreed}
                    </div>
                  )}

                  {/* Dog Info */}
                  <div>
                    <h3 className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Dog className="w-4 h-4" /> Dog Profile
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">Dog Name *</label>
                        <input {...register('dogName')} placeholder="e.g. Max" className={inputClass(errors.dogName)} />
                        {errors.dogName && <p className="text-red-500 text-xs mt-1">{errors.dogName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">Breed *</label>
                        <select {...register('breed')} className={inputClass(errors.breed)}>
                          <option value="">Select breed...</option>
                          {BREED_NAMES.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                        {errors.breed && <p className="text-red-500 text-xs mt-1">{errors.breed.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">Age (years) *</label>
                        <input {...register('age', { valueAsNumber: true })} type="number" step="0.5" placeholder="e.g. 3" className={inputClass(errors.age)} />
                        {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">Gender *</label>
                        <select {...register('gender')} className={inputClass(errors.gender)}>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Measurements */}
                  <div>
                    <h3 className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Ruler className="w-4 h-4" /> Measurements
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { field: 'weight' as const,     label: 'Weight (kg)',       placeholder: 'e.g. 32' },
                        { field: 'chestSize' as const,  label: 'Chest Girth (cm)', placeholder: 'e.g. 68' },
                        { field: 'neckSize' as const,   label: 'Neck Girth (cm)',  placeholder: 'e.g. 46' },
                        { field: 'backLength' as const, label: 'Back Length (cm)', placeholder: 'e.g. 54' },
                        { field: 'pawWidth' as const,   label: 'Paw Width (cm)',   placeholder: 'e.g. 6 (for boots)' },
                        { field: 'pawLength' as const,  label: 'Paw Length (cm)',  placeholder: 'e.g. 7 (for boots)' },
                      ].map(({ field, label, placeholder }) => (
                        <div key={field}>
                          <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">{label}</label>
                          <input
                            {...register(field, { valueAsNumber: true })}
                            type="number" step="0.5" placeholder={placeholder}
                            className={inputClass(errors[field])}
                          />
                          {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]?.message}</p>}
                        </div>
                      ))}
                    </div>

                    {/* Measurement Guide */}
                    <div className="mt-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                      <p className="text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-2 flex items-center gap-1.5">
                        <Ruler className="w-3.5 h-3.5" /> How to measure
                      </p>
                      <ul className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                        <li><strong>Chest:</strong> Widest part behind the front legs</li>
                        <li><strong>Neck:</strong> Widest part of the neck, where collar sits</li>
                        <li><strong>Back:</strong> Base of neck to base of tail</li>
                      </ul>
                      <button
                        type="button"
                        onClick={() => setMode('photo')}
                        className="mt-3 text-xs font-bold text-neutral-900 dark:text-white underline underline-offset-2 flex items-center gap-1"
                      >
                        <Camera className="w-3 h-3" /> Don't have measurements? Use photo AI instead
                      </button>
                    </div>
                  </div>

                  <Button type="submit" size="lg" variant="gradient" className="w-full" disabled={processing}>
                    {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Ruler className="w-5 h-5" />}
                    {processing ? 'Analyzing...' : 'Analyze My Dog'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Processing Overlay */}
      <AnimatePresence>
        {(processing || done) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-neutral-900 rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl"
            >
              {done ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                  <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-black text-neutral-900 dark:text-white">Analysis Complete!</h3>
                  <p className="text-neutral-500 text-sm mt-2">Redirecting to your recommendation...</p>
                </motion.div>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center mx-auto mb-6">
                    <Loader2 className="w-10 h-10 text-white animate-spin" />
                  </div>
                  <h3 className="text-xl font-black text-neutral-900 dark:text-white mb-6">AI Analysis Running</h3>
                  <div className="space-y-3">
                    {PROCESSING_STEPS.map((step, i) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: i <= stepIdx ? 1 : 0.3, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          i < stepIdx ? 'bg-emerald-100' : i === stepIdx ? 'bg-black' : 'bg-neutral-100 dark:bg-neutral-800'
                        }`}>
                          {i < stepIdx
                            ? <CheckCircle className="w-3 h-3 text-emerald-600" />
                            : i === stepIdx
                            ? <Loader2 className="w-3 h-3 text-white animate-spin" />
                            : <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600 block" />
                          }
                        </div>
                        <span className={`text-sm text-left ${i === stepIdx ? 'text-neutral-900 dark:text-white font-semibold' : 'text-neutral-400'}`}>
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

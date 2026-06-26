import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, CheckCircle, Loader2, Dog, Camera, Upload, Sparkles, Video, ArrowLeft, Play } from 'lucide-react';
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
  { label: 'Detecting dog in photos...', icon: '🐾' },
  { label: 'Cross-referencing multi-view angles...', icon: '📸' },
  { label: 'Estimating body measurements...', icon: '📏' },
  { label: 'Calculating size from proportions...', icon: '🤖' },
  { label: 'Confidence score ready!', icon: '✅' },
];

const VIDEO_STEPS = [
  { label: 'Extracting keyframes from video...', icon: '🎞️' },
  { label: 'Analyzing 3D geometry & motion...', icon: '📐' },
  { label: 'Detecting breed profile...', icon: '🐕' },
  { label: 'Mapping full-body proportions...', icon: '📏' },
  { label: 'Confidence score ready!', icon: '✅' },
];

const PHOTO_VIEWS = [
  { id: 'front', label: 'Front View', desc: 'Face and chest clearly visible' },
  { id: 'side', label: 'Side View', desc: 'Full length from nose to tail' },
  { id: 'top', label: 'Top View', desc: 'Looking down at the back' }
] as const;

export function AiFitFinder() {
  const { state, dispatch, submitFitForm } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  // mode: selection | manual | photo | video
  const [mode, setMode] = useState<'selection' | 'manual' | 'photo' | 'video'>(
    (location.state as any)?.initialMode || 'selection'
  );

  // photo upload state
  const [photoSlots, setPhotoSlots] = useState<Record<string, { file: File, preview: string }>>({});
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [photoAnalyzing, setPhotoAnalyzing] = useState(false);
  const [photoStep, setPhotoStep] = useState(0);
  const [photoComplete, setPhotoComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // video upload state
  const [uploadedVideo, setUploadedVideo] = useState<{ file: File, preview: string } | null>(null);
  const [videoAnalyzing, setVideoAnalyzing] = useState(false);
  const [videoStep, setVideoStep] = useState(0);
  const [videoComplete, setVideoComplete] = useState(false);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // common analysis state
  // removed unused detectedBreed
  const [photoConfidence, setPhotoConfidence] = useState(0);

  // form submission state
  const [processing, setProcessing] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const { register, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: state.fitFormData ?? undefined,
  });
  const breedValue = watch('breed');

  const runMockAnalysis = (type: 'photo' | 'video') => {
    if (type === 'photo') {
      setPhotoAnalyzing(true);
      setPhotoStep(0);
    } else {
      setVideoAnalyzing(true);
      setVideoStep(0);
    }

    const mockBreed = breedValue && BREED_NAMES.includes(breedValue)
      ? breedValue
      : 'Golden Retriever';

    let step = 0;
    const stepsLen = type === 'photo' ? PHOTO_STEPS.length : VIDEO_STEPS.length;
    
    const iv = setInterval(() => {
      step++;
      if (type === 'photo') setPhotoStep(step);
      else setVideoStep(step);
      
      if (step >= stepsLen - 1) {
        clearInterval(iv);
        setTimeout(() => {
          const est = BREED_ESTIMATES[mockBreed] ?? DEFAULT_ESTIMATE;
          const jitter = (base: number, range = 3) => Math.round((base + (Math.random() * range * 2 - range)) * 10) / 10;

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
          
          setPhotoConfidence(est.confidence + (type === 'video' ? 2 : 0)); // Video gets slight confidence bump
          
          if (type === 'photo') {
            setPhotoAnalyzing(false);
            setPhotoComplete(true);
          } else {
            setVideoAnalyzing(false);
            setVideoComplete(true);
          }
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
          
          if (location.state && (location.state as any).initialMode) {
            setTimeout(() => navigate('/recommendations'), 1200);
          } else if (mode !== 'manual') {
            setTimeout(() => navigate('/why-this-size'), 1200);
          }
        }, 600);
      }
    }, 500);
  };

  const inputClass = (err?: { message?: string }) =>
    `w-full px-4 py-3 rounded-xl border ${err
      ? 'border-red-400 bg-red-50 dark:bg-red-900/10'
      : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900'
    } text-neutral-900 dark:text-white text-sm outline-none focus:border-black focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700 transition-all`;

  const renderAnalysisComplete = () => (
    <motion.div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 mt-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <p className="font-bold text-emerald-800 text-sm">Analysis Complete — {photoConfidence}% confidence</p>
        </div>
        <button type="button" onClick={() => setEditMode(!editMode)} className="text-xs font-bold text-emerald-700 underline hover:text-emerald-900 transition-colors">
          {editMode ? 'Done' : 'Edit Measurements'}
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        <div className="bg-white rounded-xl p-2.5 shadow-sm border border-emerald-100">
          <p className="text-[10px] font-bold text-emerald-600">BREED</p>
          {editMode ? (
            <select {...register('breed')} className="w-full text-xs font-bold bg-neutral-100 p-1 mt-0.5 rounded outline-none border border-neutral-200">
              {BREED_NAMES.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          ) : (
            <p className="text-sm font-bold text-black mt-0.5 truncate" title={watch('breed')}>{watch('breed')}</p>
          )}
        </div>
        <div className="bg-white rounded-xl p-2.5 shadow-sm border border-emerald-100">
          <p className="text-[10px] font-bold text-emerald-600">CHEST</p>
          {editMode ? (
            <input {...register('chestSize', { valueAsNumber: true })} type="number" step="any" className="w-full text-sm font-bold bg-neutral-100 p-1 mt-0.5 rounded outline-none border border-neutral-200" />
          ) : (
            <p className="text-sm font-bold text-black mt-0.5">{watch('chestSize')} cm</p>
          )}
        </div>
        <div className="bg-white rounded-xl p-2.5 shadow-sm border border-emerald-100">
          <p className="text-[10px] font-bold text-emerald-600">BACK</p>
          {editMode ? (
            <input {...register('backLength', { valueAsNumber: true })} type="number" step="any" className="w-full text-sm font-bold bg-neutral-100 p-1 mt-0.5 rounded outline-none border border-neutral-200" />
          ) : (
            <p className="text-sm font-bold text-black mt-0.5">{watch('backLength')} cm</p>
          )}
        </div>
        <div className="bg-white rounded-xl p-2.5 shadow-sm border border-emerald-100">
          <p className="text-[10px] font-bold text-emerald-600">NECK</p>
          {editMode ? (
            <input {...register('neckSize', { valueAsNumber: true })} type="number" step="any" className="w-full text-sm font-bold bg-neutral-100 p-1 mt-0.5 rounded outline-none border border-neutral-200" />
          ) : (
            <p className="text-sm font-bold text-black mt-0.5">{watch('neckSize')} cm</p>
          )}
        </div>
        <div className="bg-white rounded-xl p-2.5 shadow-sm border border-emerald-100">
          <p className="text-[10px] font-bold text-emerald-600">PAW (W x L)</p>
          {editMode ? (
            <div className="flex gap-1 mt-0.5">
              <input {...register('pawWidth', { valueAsNumber: true })} placeholder="W" type="number" step="any" className="w-full text-xs font-bold bg-neutral-100 p-1 rounded outline-none border border-neutral-200" />
              <input {...register('pawLength', { valueAsNumber: true })} placeholder="L" type="number" step="any" className="w-full text-xs font-bold bg-neutral-100 p-1 rounded outline-none border border-neutral-200" />
            </div>
          ) : (
            <p className="text-sm font-bold text-black mt-0.5">{watch('pawWidth')}x{watch('pawLength')} cm</p>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-screen-md mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        icon={Ruler}
        badge="AI Fit Finder"
        title="Find Your Dog's Perfect Fit"
        subtitle="Our AI delivers a breed-aware size recommendation with 95% accuracy."
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

      <AnimatePresence mode="wait">
        {/* ── SELECTION SCREEN ───────────────────────────────────────────── */}
        {mode === 'selection' && (
          <motion.div
            key="selection"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <h2 className="text-xl font-bold text-center mb-6 text-neutral-900 dark:text-white">How would you like to provide details?</h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <button onClick={() => setMode('manual')} className="group flex flex-col items-center text-center p-6 rounded-3xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:border-black dark:hover:border-white transition-all hover:shadow-xl">
                <div className="w-14 h-14 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Ruler className="w-6 h-6 text-neutral-900 dark:text-white" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-1">Manual Entry</h3>
                <p className="text-xs text-neutral-500">Give breed, age, and size details manually</p>
              </button>
              
              <button onClick={() => setMode('photo')} className="group flex flex-col items-center text-center p-6 rounded-3xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:border-blue-500 transition-all hover:shadow-xl hover:shadow-blue-500/10">
                <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-1">Upload Photos</h3>
                <p className="text-xs text-neutral-500">Upload images from different views (Mandatory)</p>
              </button>

              <button onClick={() => setMode('video')} className="group flex flex-col items-center text-center p-6 rounded-3xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:border-purple-500 transition-all hover:shadow-xl hover:shadow-purple-500/10">
                <div className="w-14 h-14 rounded-full bg-purple-50 dark:bg-purple-900/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Video className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-1">Upload Video</h3>
                <p className="text-xs text-neutral-500">Upload a quick video of your dog</p>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── MANUAL FORM TAB ───────────────────────────────────────────── */}
        {mode === 'manual' && (
          <motion.div key="manual" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <div className="mb-4">
              <button onClick={() => setMode('selection')} className="flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Selection
              </button>
            </div>
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                        <input {...register('age', { valueAsNumber: true })} type="number" step="any" placeholder="e.g. 3" className={inputClass(errors.age)} />
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
                            type="number" step="any" placeholder={placeholder}
                            className={inputClass(errors[field])}
                          />
                          {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]?.message}</p>}
                        </div>
                      ))}
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

        {/* ── PHOTO UPLOAD TAB ──────────────────────────────────────────── */}
        {mode === 'photo' && (
          <motion.div key="photo" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <div className="mb-4">
              <button onClick={() => setMode('selection')} className="flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Selection
              </button>
            </div>
            <Card className="mb-4">
              <CardContent className="pt-6 space-y-5">
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 flex gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-1">Multi-View AI Measurement</p>
                    <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
                      To ensure 95%+ accuracy without manual measurements, please upload images from <strong>3 mandatory angles</strong>.
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {PHOTO_VIEWS.map(view => {
                    const hasImage = !!photoSlots[view.id];
                    return (
                      <div key={view.id} className="space-y-2">
                        <div
                          onClick={() => {
                            setActiveSlot(view.id);
                            fileInputRef.current?.click();
                          }}
                          className={`relative aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center p-4 cursor-pointer overflow-hidden transition-all ${
                            hasImage ? 'border-black dark:border-white' : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                          }`}
                        >
                          {hasImage ? (
                            <>
                              <img src={photoSlots[view.id].preview} className="absolute inset-0 w-full h-full object-cover" alt={view.label} />
                              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <Camera className="w-8 h-8 text-white mb-2" />
                                <p className="text-xs font-bold text-white">Replace</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <Upload className="w-6 h-6 text-neutral-400 mb-2" />
                              <p className="text-sm font-bold text-neutral-700 dark:text-neutral-300">{view.label}</p>
                              <p className="text-[10px] text-neutral-500 mt-1">{view.desc}</p>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file && activeSlot) {
                      setPhotoSlots(prev => ({
                        ...prev,
                        [activeSlot]: { file, preview: URL.createObjectURL(file) }
                      }));
                    }
                  }}
                />

                {photoAnalyzing && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2.5">
                    {PHOTO_STEPS.map((s, i) => (
                      <motion.div key={s.label} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm ${i < photoStep ? 'bg-emerald-100' : i === photoStep ? 'bg-black' : 'bg-neutral-100 dark:bg-neutral-800'}`}>
                          {i < photoStep ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : i === photoStep ? <Loader2 className="w-3.5 h-3.5 text-white animate-spin" /> : <span className="text-neutral-400 text-[10px]">{i + 1}</span>}
                        </div>
                        <span className={`text-sm ${i === photoStep ? 'font-bold text-neutral-900 dark:text-white' : 'text-neutral-400'}`}>{s.icon} {s.label}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {photoComplete && renderAnalysisComplete()}

                {!photoAnalyzing && !photoComplete && (
                  <Button
                    type="button" size="lg" variant="gradient" className="w-full"
                    disabled={Object.keys(photoSlots).length < 3}
                    onClick={() => runMockAnalysis('photo')}
                  >
                    <Sparkles className="w-5 h-5" /> {Object.keys(photoSlots).length < 3 ? 'Upload all 3 views to continue' : 'Analyse Photos'}
                  </Button>
                )}

                {!photoAnalyzing && photoComplete && (
                  <div className="flex gap-3">
                    <Button type="button" size="lg" variant="outline" className="flex-1" onClick={() => runMockAnalysis('photo')}><CheckCircle className="w-5 h-5" /> Re-Analyse</Button>
                    <Button type="button" size="lg" variant="gradient" className="flex-1" onClick={() => onSubmit(getValues())}><Ruler className="w-5 h-5" /> See Recommended Size</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ── VIDEO UPLOAD TAB ──────────────────────────────────────────── */}
        {mode === 'video' && (
          <motion.div key="video" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <div className="mb-4">
              <button onClick={() => setMode('selection')} className="flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Selection
              </button>
            </div>
            <Card className="mb-4">
              <CardContent className="pt-6 space-y-5">
                <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 flex gap-3">
                  <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-purple-900 dark:text-purple-300 mb-1">AI Video Analysis</p>
                    <p className="text-xs text-purple-700 dark:text-purple-400 leading-relaxed">
                      Upload a 5-10 second video walking around your dog. Our AI will extract 3D measurements and capture all necessary angles automatically.
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => videoInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    uploadedVideo ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-900/10' : 'border-neutral-300 hover:border-purple-500 hover:bg-purple-50/50'
                  }`}
                >
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) setUploadedVideo({ file, preview: URL.createObjectURL(file) });
                    }}
                  />
                  {uploadedVideo ? (
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3 text-purple-600 relative overflow-hidden">
                        <video src={uploadedVideo.preview} className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm" />
                        <Play className="w-6 h-6 z-10" />
                      </div>
                      <p className="font-bold text-purple-900 dark:text-purple-300">{uploadedVideo.file.name}</p>
                      <p className="text-xs text-purple-600 mt-1">Ready for analysis</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-900/40 flex items-center justify-center">
                        <Video className="w-7 h-7 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-bold text-neutral-800 dark:text-white text-sm">Click to browse or drop video here</p>
                        <p className="text-xs text-neutral-500 mt-1">MP4, WEBM, MOV — Max 50MB</p>
                      </div>
                    </div>
                  )}
                </div>

                {videoAnalyzing && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2.5">
                    {VIDEO_STEPS.map((s, i) => (
                      <motion.div key={s.label} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm ${i < videoStep ? 'bg-emerald-100' : i === videoStep ? 'bg-black' : 'bg-neutral-100'}`}>
                          {i < videoStep ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : i === videoStep ? <Loader2 className="w-3.5 h-3.5 text-white animate-spin" /> : <span className="text-neutral-400 text-[10px]">{i + 1}</span>}
                        </div>
                        <span className={`text-sm ${i === videoStep ? 'font-bold' : 'text-neutral-400'}`}>{s.icon} {s.label}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {videoComplete && renderAnalysisComplete()}

                {!videoAnalyzing && !videoComplete && (
                  <Button
                    type="button" size="lg" variant="gradient" className="w-full"
                    disabled={!uploadedVideo}
                    onClick={() => runMockAnalysis('video')}
                  >
                    <Sparkles className="w-5 h-5" /> Analyse Video
                  </Button>
                )}

                {!videoAnalyzing && videoComplete && (
                  <div className="flex gap-3">
                    <Button type="button" size="lg" variant="outline" className="flex-1" onClick={() => runMockAnalysis('video')}><CheckCircle className="w-5 h-5" /> Re-Analyse</Button>
                    <Button type="button" size="lg" variant="gradient" className="flex-1" onClick={() => onSubmit(getValues())}><Ruler className="w-5 h-5" /> See Recommended Size</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Processing Overlay */}
      <AnimatePresence>
        {(processing || done) && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-neutral-900 rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl"
            >
              {done ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-black text-neutral-900 dark:text-white mb-2">Analysis Complete!</h3>
                  
                  {mode === 'manual' ? (
                    <div className="mt-6 text-left">
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 text-center">
                        Upload a photo of your dog to see them in our Virtual Try-On!
                      </p>
                      <input 
                        type="file" 
                        accept="image/*" 
                        id="manual-photo-upload"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            dispatch({ type: 'SET_USER_DOG_IMAGE', payload: URL.createObjectURL(file) });
                            navigate('/why-this-size');
                          }
                        }}
                      />
                      <div className="flex flex-col gap-2">
                        <Button type="button" variant="gradient" size="lg" onClick={() => document.getElementById('manual-photo-upload')?.click()}>
                          <Camera className="w-4 h-4 mr-2" /> Upload Dog Photo
                        </Button>
                        <Button type="button" variant="outline" size="lg" onClick={() => navigate('/why-this-size')}>
                          Skip & Continue
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-neutral-500 text-sm mt-2">Redirecting to your recommendation...</p>
                  )}
                </motion.div>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center mx-auto mb-6">
                    <Loader2 className="w-10 h-10 text-white animate-spin" />
                  </div>
                  <h3 className="text-xl font-black text-neutral-900 dark:text-white mb-6">AI Analysis Running</h3>
                  <div className="space-y-3">
                    {PROCESSING_STEPS.map((step, i) => (
                      <motion.div key={step} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${i < stepIdx ? 'bg-emerald-100' : i === stepIdx ? 'bg-black' : 'bg-neutral-100'}`}>
                          {i < stepIdx ? <CheckCircle className="w-3 h-3 text-emerald-600" /> : i === stepIdx ? <Loader2 className="w-3 h-3 text-white animate-spin" /> : <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 block" />}
                        </div>
                        <span className={`text-sm text-left ${i === stepIdx ? 'text-neutral-900 dark:text-white font-semibold' : 'text-neutral-400'}`}>{step}</span>
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

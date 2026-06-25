import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, Heart, BarChart2, Star, X, Check,
  Camera, Loader2, ChevronLeft, ChevronRight, Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { PRODUCTS, OUTERWEAR_CATEGORIES, GEAR_CATEGORIES } from '../mock/products';
import { PRODUCTS_DOG2 } from '../mock/products_dog2';
// import { BREED_PORTRAITS } from '../mock/tryon';
import DogImage from '../assets/dog/DOG.png';
import DoggImage from '../assets/dog2/DOGG.png';
import type { Product } from '../types';
import { cn } from '../components/ui/cn';

// ── category navigation (matches Canada Pooch site) ──────────────────────────
const OUTERWEAR_LIST = [...OUTERWEAR_CATEGORIES] as string[];
const GEAR_LIST      = [...GEAR_CATEGORIES] as string[];

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const count = label === 'All Coats' ? PRODUCTS.filter(p => p.category !== 'Boots & Shoes' && p.category !== 'Harnesses').length : PRODUCTS.filter(p => p.category === label).length;
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all border',
        active
          ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
          : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white'
      )}
    >
      {label}
      <span className={cn(
        'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
        active ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
      )}>
        {count}
      </span>
    </motion.button>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={cn('w-3 h-3', i <= Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-neutral-200')} />
      ))}
    </div>
  );
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/70 text-white backdrop-blur-sm">
      {category}
    </span>
  );
}

function ProductCard({ product, onOpen, onTryOn, wishlist, onWishlist, compare, onCompare }: {
  product: Product;
  onOpen: (p: Product) => void;
  onTryOn: (data: { product: Product; activeImage?: string }) => void;
  wishlist: boolean;
  onWishlist: () => void;
  compare: boolean;
  onCompare: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden cursor-pointer group" onClick={() => onOpen(product)}>
        <img
          src={product.imageUrl}
          alt={`${product.name} — dog wearing Canada Pooch suit`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-white"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Category badge top-left */}
        <div className="absolute top-3 left-3">
          <CategoryBadge category={product.category} />
        </div>

        {/* Product badge below category */}
        {product.badge && (
          <div className="absolute top-9 left-3 mt-1">
            <span className="px-2.5 py-1 rounded-full bg-black text-white text-[10px] font-bold shadow-sm">
              {product.badge}
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 flex gap-1.5">
          <button
            onClick={e => { e.stopPropagation(); onWishlist(); }}
            className={cn('w-7 h-7 rounded-full flex items-center justify-center shadow-sm transition-all', wishlist ? 'bg-red-500' : 'bg-white/80 backdrop-blur-sm')}
          >
            <Heart className={cn('w-3.5 h-3.5', wishlist ? 'text-white fill-white' : 'text-slate-600')} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); onCompare(); }}
            className={cn('w-7 h-7 rounded-full flex items-center justify-center shadow-sm transition-all', compare ? 'bg-black' : 'bg-white/80 backdrop-blur-sm')}
          >
            <BarChart2 className={cn('w-3.5 h-3.5', compare ? 'text-white' : 'text-slate-600')} />
          </button>
        </div>

        {/* Breed chips */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          {product.recommendedFor.slice(0, 2).map(b => (
            <span key={b} className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white">
              {b}
            </span>
          ))}
          {product.recommendedFor.length > 2 && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white">
              +{product.recommendedFor.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">{product.name}</h3>
          <span className="text-black dark:text-white font-black text-base flex-shrink-0">${product.price}</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-slate-400">({product.reviewCount.toLocaleString()})</span>
        </div>
        <Badge variant="accent" className="self-start mb-2 text-[10px]">
          <Check className="w-2.5 h-2.5" /> AI Recommended
        </Badge>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex-1 line-clamp-2">{product.recommendationReason}</p>
        <div className="flex gap-2 mt-3">
          <Button variant="gradient" size="sm" className="flex-1" onClick={() => onOpen(product)}>
            View Details
          </Button>
          <button
            onClick={() => onTryOn({ product, activeImage: product.colors?.[0]?.image || product.imageUrl })}
            title="Virtual Try-On"
            className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 text-neutral-700 dark:text-neutral-300 text-xs font-bold uppercase tracking-wide transition-all"
          >
            <Camera className="w-3.5 h-3.5" />
            Try
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Virtual Try-On Modal ─────────────────────────────────────────────────────
function TryOnModal({ product, activeImage, breed, userImage, onClose }: { product: Product; activeImage?: string; breed: string; userImage?: string | null; onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  const [viewIdx, setViewIdx] = useState(0);

  const views = [{ label: 'Wearing Product', url: activeImage || product.imageUrl, crop: 'center' }];
  const breedPortrait = userImage || DogImage;

  // simulate 2s AI generation
  useState(() => { setTimeout(() => setLoading(false), 2000); });

  const prev = () => setViewIdx(i => (i - 1 + views.length) % views.length);
  const next = () => setViewIdx(i => (i + 1) % views.length);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Camera className="w-4 h-4 text-neutral-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Virtual Try-On</span>
            </div>
            <h3 className="font-black text-neutral-900 dark:text-white">{product.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-neutral-500" />
          </button>
        </div>

        {loading ? (
          /* Loading state */
          <div className="flex flex-col items-center justify-center gap-4 py-20 px-6">
            <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <div className="text-center">
              <p className="font-bold text-neutral-900 dark:text-white">Generating Virtual Try-On...</p>
              <p className="text-sm text-neutral-500 mt-1">Our AI is fitting {product.name} on a {breed}</p>
            </div>
            <div className="flex gap-2 mt-2">
              {['Detecting proportions', 'Fitting garment', 'Rendering result'].map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.5 }}
                  className="text-[10px] font-semibold px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        ) : (
          /* Result */
          <div className="p-6 space-y-5">
            {/* AI confidence badge */}
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neutral-500" />
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                AI Fit Simulation — {Math.floor(88 + Math.random() * 9)}% match confidence
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Before — breed portrait */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 text-center">Your Dog ({breed})</p>
                <div className="rounded-2xl overflow-hidden aspect-square bg-neutral-100 dark:bg-neutral-800">
                  <img src={breedPortrait} alt={breed} className="w-full h-full object-cover" />
                </div>
                <div className="text-center text-xs text-neutral-500">Without outfit</div>
              </div>

              {/* After — dog in outfit (carousel) */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 text-center">{views[viewIdx].label}</p>
                <div className="relative rounded-2xl overflow-hidden aspect-square bg-neutral-100 dark:bg-neutral-800 group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={viewIdx}
                      src={views[viewIdx].url}
                      alt={views[viewIdx].label}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    />
                  </AnimatePresence>
                  {/* Carousel controls (only if multiple views) */}
                  {views.length > 1 && (
                    <>
                      <button onClick={prev} className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button onClick={next} className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  {/* AI badge */}
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 text-white text-[9px] font-bold flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> AI Try-On
                  </div>
                </div>
                <div className="text-center text-xs text-neutral-500">Wearing {product.name}</div>
              </div>
            </div>

            {/* View dots */}
            {views.length > 1 && (
               <div className="flex justify-center gap-1.5">
                 {views.map((_, i) => (
                   <button
                     key={i}
                     onClick={() => setViewIdx(i)}
                     className={cn('rounded-full transition-all', i === viewIdx ? 'w-5 h-2 bg-black dark:bg-white' : 'w-2 h-2 bg-neutral-200 dark:bg-neutral-700')}
                   />
                 ))}
               </div>
            )}

            {/* Fit notes */}
            <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <span className="font-bold text-neutral-900 dark:text-white">AI Fit Note:</span>{' '}
              {product.recommendationReason}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="md" onClick={onClose} className="flex-1">Close</Button>
              <Button variant="gradient" size="md" className="flex-1">
                <ShoppingBag className="w-4 h-4" /> Add to Cart — ${product.price}
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ── main page ────────────────────────────────────────────────────────────────
export function ProductRecommendations() {
  const { state, dispatch } = useApp();
  const [hasSelectedDog, setHasSelectedDog] = useState(false);
  const [filter, setFilter] = useState<string>('All Coats');
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalColorIdx, setModalColorIdx] = useState(0);

  const [tryOnData, setTryOnData] = useState<{ product: Product; activeImage?: string } | null>(null);
  const rec = state.recommendation;
  const breed = state.fitFormData?.breed ?? 'Golden Retriever';

  const productSource = state.selectedDogProfile === 'dog2' ? PRODUCTS_DOG2 : PRODUCTS;
  const filtered = filter === 'All Coats' ? productSource.filter(p => p.category !== 'Boots & Shoes' && p.category !== 'Harnesses') : productSource.filter(p => p.category === filter);

  if (!hasSelectedDog) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-20 flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-lg w-full">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Choose a Dog Profile</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Please select which dog profile you'd like to view recommendations for before proceeding.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                dispatch({ type: 'SET_DOG_PROFILE', payload: 'dog1' });
                setHasSelectedDog(true);
              }}
              className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-2xl p-6 transition-all group"
            >
              <div className="w-24 h-24 mx-auto bg-slate-100 dark:bg-slate-700 rounded-full mb-4 overflow-hidden group-hover:scale-105 transition-transform">
                <img src={DogImage} alt="Dog 1" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Dog 1</h3>
              <p className="text-xs text-slate-500 mt-1">Default dataset</p>
            </button>
            <button
              onClick={() => {
                dispatch({ type: 'SET_DOG_PROFILE', payload: 'dog2' });
                setHasSelectedDog(true);
              }}
              className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-2xl p-6 transition-all group"
            >
              <div className="w-24 h-24 mx-auto bg-slate-100 dark:bg-slate-700 rounded-full mb-4 overflow-hidden group-hover:scale-105 transition-transform">
                <img src={DoggImage} alt="Dog 2" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Dog 2</h3>
              <p className="text-xs text-slate-500 mt-1">New dataset</p>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <PageHeader
          icon={ShoppingBag}
          badge="AI Recommendations"
          title="Perfect Products for Your Dog"
          subtitle={rec ? `Curated for ${state.fitFormData?.dogName} (${rec.recommendedSize}) — sorted by AI fit score` : 'Browse all products by season or activity'}
        />
        <Button variant="outline" size="sm" onClick={() => setHasSelectedDog(false)}>
          Change Dog
        </Button>
      </div>

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden mb-8 h-44 sm:h-52"
      >
        <img
          src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80"
          alt="Dog wearing Canada Pooch jacket"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/50 to-transparent flex items-center px-8">
          <div>
            <p className="text-white font-black text-xl sm:text-2xl">AI-Curated Collection</p>
            <p className="text-slate-300 text-sm mt-1">
              {PRODUCTS.length} products across 6 categories • {state.wishlist.length} in wishlist
            </p>
            <div className="flex gap-2 mt-3 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-black/80 text-white text-xs font-bold">❄️ Winter Suits</span>
              <span className="px-3 py-1 rounded-full bg-amber-500/80 text-white text-xs font-bold">☀️ Summer Vests</span>
              <span className="px-3 py-1 rounded-full bg-purple-600/80 text-white text-xs font-bold">✈️ Travel Jackets</span>
            </div>
          </div>
        </div>
      </motion.div>



      {/* ── Filters ─────────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/50 p-4 mb-6 shadow-card">
        {/* All */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <FilterChip label="All Coats" active={filter === 'All Coats'} onClick={() => setFilter('All Coats')} />
          <FilterChip label="Boots Only" active={filter === 'Boots & Shoes'} onClick={() => setFilter('Boots & Shoes')} />
          <FilterChip label="Harnesses Only" active={filter === 'Harnesses'} onClick={() => setFilter('Harnesses')} />
        </div>

        {/* Outerwear row */}
        <div className="mb-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Outerwear</p>
          <div className="flex flex-wrap gap-2">
            {OUTERWEAR_LIST.map(cat => (
              <FilterChip key={cat} label={cat} active={filter === cat} onClick={() => setFilter(cat)} />
            ))}
          </div>
        </div>

        {/* Gear row */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Gear</p>
          <div className="flex flex-wrap gap-2">
            {GEAR_LIST.map(cat => (
              <FilterChip key={cat} label={cat} active={filter === cat} onClick={() => setFilter(cat)} />
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing <span className="font-bold text-slate-700 dark:text-slate-200">{filtered.length}</span> products
          {filter !== 'All Coats' && <> in <span className="font-bold">{filter}</span></>}
        </p>
        {filter !== 'All Coats' && (
          <button
            onClick={() => setFilter('All Coats')}
            className="text-xs text-black dark:text-white font-semibold hover:underline"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((product, i) => (
            <motion.div key={product.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.04 }}>
              <ProductCard
                product={product}
                onOpen={(p) => {
                  setSelectedProduct(p);
                  setModalColorIdx(0);
                }}
                onTryOn={setTryOnData}
                wishlist={state.wishlist.includes(product.id)}
                onWishlist={() => dispatch({ type: 'TOGGLE_WISHLIST', payload: product.id })}
                compare={state.compareList.includes(product.id)}
                onCompare={() => dispatch({ type: 'TOGGLE_COMPARE', payload: product.id })}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Product Modal */}
      <Modal open={!!selectedProduct} onClose={() => setSelectedProduct(null)} title={selectedProduct?.name} maxWidth="xl">
        {selectedProduct && (
          <div>
            <div className="h-64 sm:h-72 overflow-hidden relative bg-white">
              <img src={selectedProduct.colors?.[modalColorIdx]?.image || selectedProduct.imageUrl} alt={`${selectedProduct.name}`} className="w-full h-full object-contain" />
              <div className="absolute bottom-3 left-3">
                <CategoryBadge category={selectedProduct.category} />
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <StarRating rating={selectedProduct.rating} />
                    <span className="text-sm text-slate-500">({selectedProduct.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                  {selectedProduct.badge && <Badge variant="default">{selectedProduct.badge}</Badge>}
                </div>
                <span className="text-3xl font-black text-black dark:text-white">${selectedProduct.price}</span>
              </div>

              {/* Color Swatches inside Modal */}
              {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-500 mb-2">Available Colors</p>
                  <div className="flex items-center gap-2">
                    {selectedProduct.colors.map((color, idx) => (
                      <button
                        key={color.name}
                        title={color.name}
                        onClick={() => setModalColorIdx(idx)}
                        className={cn(
                          'w-6 h-6 rounded-full border border-neutral-200 shadow-sm transition-all',
                          modalColorIdx === idx ? 'ring-2 ring-black dark:ring-white ring-offset-2 dark:ring-offset-slate-900' : 'opacity-70 hover:opacity-100 hover:scale-110'
                        )}
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">{selectedProduct.description}</p>

              {/* Breed tags */}
              <div>
                <p className="text-xs font-bold text-slate-500 mb-2">Best for breeds</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.recommendedFor.map(b => (
                    <span key={b} className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300">
                      🐾 {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900/20 border border-neutral-200 dark:border-neutral-800/40">
                <p className="text-xs font-bold text-black dark:text-neutral-400 mb-1">🤖 AI Recommendation Reason</p>
                <p className="text-sm text-black dark:text-neutral-300">{selectedProduct.recommendationReason}</p>
                {rec && (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-xs font-bold">
                    <Check className="w-3 h-3" /> Recommended Size: {rec.recommendedSize}
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Available Sizes</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes.map(s => (
                    <span key={s} className={cn(
                      'px-3 py-1.5 rounded-xl border text-sm font-bold transition-all',
                      rec?.recommendedSize === s
                        ? 'bg-black text-white border-black'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-black'
                    )}>
                      {s} {rec?.recommendedSize === s && '✓'}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant={state.wishlist.includes(selectedProduct.id) ? 'danger' : 'secondary'}
                  size="md"
                  onClick={() => dispatch({ type: 'TOGGLE_WISHLIST', payload: selectedProduct.id })}
                >
                  <Heart className="w-4 h-4" />
                  {state.wishlist.includes(selectedProduct.id) ? 'Remove' : 'Wishlist'}
                </Button>
                <Button variant="gradient" size="md" className="flex-1" onClick={() => {
                  setSelectedProduct(null);
                  setTryOnData({ product: selectedProduct, activeImage: selectedProduct.colors?.[modalColorIdx]?.image || selectedProduct.imageUrl });
                }}>
                  <Camera className="w-4 h-4" /> Try It
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Virtual Try-On */}
      <AnimatePresence>
        {tryOnData && (
          <TryOnModal
            product={tryOnData.product}
            activeImage={tryOnData.activeImage}
            breed={breed}
            userImage={state.selectedDogProfile === 'dog2' ? DoggImage : state.userDogImage}
            onClose={() => setTryOnData(null)}
          />
        )}
      </AnimatePresence>

      {/* Compare bar */}
      <AnimatePresence>
        {state.compareList.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-20 xl:bottom-6 left-4 right-4 xl:left-auto xl:right-24 xl:w-96 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl p-4 shadow-2xl z-30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">Comparing {state.compareList.length} products</p>
                <p className="text-slate-400 text-xs">Add up to 3 items</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="gradient">Compare</Button>
                <button onClick={() => { state.compareList.forEach(id => dispatch({ type: 'TOGGLE_COMPARE', payload: id })); }}>
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, Heart, BarChart2, Star, X, Check, Filter,
  Sun, Snowflake, CloudRain, PersonStanding, Plane, Mountain,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { PRODUCTS, SEASON_CATEGORIES, ACTIVITY_CATEGORIES } from '../mock/products';
import type { Product } from '../types';
import { cn } from '../components/ui/cn';

// ── filter meta ─────────────────────────────────────────────────────────────
const FILTER_META: Record<string, { icon: React.ElementType; emoji: string; color: string; bg: string; activeBg: string }> = {
  All:      { icon: Filter,          emoji: '🐾', color: 'text-slate-500',   bg: 'bg-slate-100 dark:bg-slate-700',        activeBg: 'bg-slate-800 dark:bg-slate-200' },
  Winter:   { icon: Snowflake,       emoji: '❄️',  color: 'text-neutral-600', bg: 'bg-neutral-100 dark:bg-neutral-900/30', activeBg: 'bg-neutral-800' },
  Summer:   { icon: Sun,             emoji: '☀️',  color: 'text-amber-500',   bg: 'bg-amber-50 dark:bg-amber-900/20',      activeBg: 'bg-amber-500' },
  Rain:     { icon: CloudRain,       emoji: '🌧',  color: 'text-neutral-600', bg: 'bg-neutral-100 dark:bg-neutral-900/20', activeBg: 'bg-neutral-700' },
  Walking:  { icon: PersonStanding,  emoji: '🚶',  color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20',  activeBg: 'bg-emerald-600' },
  Travel:   { icon: Plane,           emoji: '✈️',  color: 'text-purple-500',  bg: 'bg-purple-50 dark:bg-purple-900/20',    activeBg: 'bg-purple-600' },
  Outdoor:  { icon: Mountain,        emoji: '🏔',  color: 'text-orange-500',  bg: 'bg-orange-50 dark:bg-orange-900/20',    activeBg: 'bg-orange-600' },
};

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const meta = FILTER_META[label] ?? FILTER_META['All'];
  const Icon = meta.icon;
  const count = label === 'All' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === label).length;

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all border',
        active
          ? `${meta.activeBg} text-white border-transparent shadow-sm`
          : `${meta.bg} ${meta.color} border-slate-200 dark:border-slate-700 hover:opacity-80`
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
      <span className={cn(
        'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
        active ? 'bg-white/20 text-white' : 'bg-white/60 dark:bg-slate-900/40 text-slate-500'
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
        <Star key={i} className={cn('w-3 h-3', i <= Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200')} />
      ))}
    </div>
  );
}

function CategoryBadge({ category }: { category: string }) {
  const meta = FILTER_META[category] ?? FILTER_META['All'];
  return (
    <span className={cn('inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full', meta.bg, meta.color)}>
      {meta.emoji} {category}
    </span>
  );
}

function ProductCard({ product, onOpen, wishlist, onWishlist, compare, onCompare }: {
  product: Product;
  onOpen: (p: Product) => void;
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
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
        <Button variant="gradient" size="sm" className="w-full mt-3" onClick={() => onOpen(product)}>
          View Details
        </Button>
      </div>
    </motion.div>
  );
}

// ── main page ────────────────────────────────────────────────────────────────
export function ProductRecommendations() {
  const { state, dispatch } = useApp();
  const [filter, setFilter] = useState<string>('All');
  const [selected, setSelected] = useState<Product | null>(null);
  const rec = state.recommendation;

  const filtered = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        icon={ShoppingBag}
        badge="AI Recommendations"
        title="Perfect Products for Your Dog"
        subtitle={rec ? `Curated for ${state.fitFormData?.dogName} (${rec.recommendedSize}) — sorted by AI fit score` : 'Browse all products by season or activity'}
      />

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
        <div className="flex items-center gap-2 mb-3">
          <FilterChip label="All" active={filter === 'All'} onClick={() => setFilter('All')} />
        </div>

        {/* Season row */}
        <div className="mb-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">By Season</p>
          <div className="flex flex-wrap gap-2">
            {SEASON_CATEGORIES.map(cat => (
              <FilterChip key={cat} label={cat} active={filter === cat} onClick={() => setFilter(cat)} />
            ))}
          </div>
        </div>

        {/* Activity row */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">By Activity</p>
          <div className="flex flex-wrap gap-2">
            {ACTIVITY_CATEGORIES.map(cat => (
              <FilterChip key={cat} label={cat} active={filter === cat} onClick={() => setFilter(cat)} />
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing <span className="font-bold text-slate-700 dark:text-slate-200">{filtered.length}</span> products
          {filter !== 'All' && <> in <span className="font-bold">{filter}</span></>}
        </p>
        {filter !== 'All' && (
          <button
            onClick={() => setFilter('All')}
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
                onOpen={setSelected}
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
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name} maxWidth="xl">
        {selected && (
          <div>
            <div className="h-64 sm:h-72 overflow-hidden relative">
              <img src={selected.imageUrl} alt={`${selected.name} — dog wearing suit`} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3">
                <CategoryBadge category={selected.category} />
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <StarRating rating={selected.rating} />
                    <span className="text-sm text-slate-500">({selected.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                  {selected.badge && <Badge variant="default">{selected.badge}</Badge>}
                </div>
                <span className="text-3xl font-black text-black dark:text-white">${selected.price}</span>
              </div>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">{selected.description}</p>

              {/* Breed tags */}
              <div>
                <p className="text-xs font-bold text-slate-500 mb-2">Best for breeds</p>
                <div className="flex flex-wrap gap-2">
                  {selected.recommendedFor.map(b => (
                    <span key={b} className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300">
                      🐾 {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900/20 border border-neutral-200 dark:border-neutral-800/40">
                <p className="text-xs font-bold text-black dark:text-neutral-400 mb-1">🤖 AI Recommendation Reason</p>
                <p className="text-sm text-black dark:text-neutral-300">{selected.recommendationReason}</p>
                {rec && (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-xs font-bold">
                    <Check className="w-3 h-3" /> Recommended Size: {rec.recommendedSize}
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Available Sizes</p>
                <div className="flex flex-wrap gap-2">
                  {selected.sizes.map(s => (
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
                  variant={state.wishlist.includes(selected.id) ? 'danger' : 'secondary'}
                  size="md"
                  onClick={() => dispatch({ type: 'TOGGLE_WISHLIST', payload: selected.id })}
                >
                  <Heart className="w-4 h-4" />
                  {state.wishlist.includes(selected.id) ? 'Remove' : 'Wishlist'}
                </Button>
                <Button variant="gradient" size="md" className="flex-1">
                  Add to Cart — ${selected.price}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

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

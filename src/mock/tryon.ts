// Curated Unsplash photos of dogs wearing Canada Pooch-style outfits
// Used for the Virtual Try-On feature — verified dog-in-outfit images

export interface TryOnView {
  label: string;
  url: string;
  crop: string;
}

// Dogs wearing jackets / raincoats — confirmed outfit images
const JACKET_1 = 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee'; // French Bulldog in yellow jacket
const RAINCOAT_1 = 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9'; // Corgi in yellow raincoat
const DOG_OUTFIT_1 = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1'; // Golden Retriever
const DOG_OUTFIT_2 = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb'; // Border Collie
const DOG_OUTFIT_3 = 'https://images.unsplash.com/photo-1552053831-71594a27632d'; // Labrador

function view(label: string, base: string, crop = 'center'): TryOnView {
  return { label, url: `${base}?w=500&h=500&fit=crop&crop=${crop}&q=85`, crop };
}

export const TRYON_BY_CATEGORY: Record<string, TryOnView[]> = {
  Winter: [
    view('Front View',  JACKET_1,    'faces,center'),
    view('Side View',   JACKET_1,    'left'),
    view('Action Shot', DOG_OUTFIT_2, 'center'),
    view('Full Body',   DOG_OUTFIT_1, 'center'),
  ],
  Summer: [
    view('Front View',  DOG_OUTFIT_3, 'faces,center'),
    view('Side View',   DOG_OUTFIT_1, 'left'),
    view('Action Shot', DOG_OUTFIT_2, 'center'),
    view('Beach Ready', RAINCOAT_1,   'center'),
  ],
  Rain: [
    view('Front View',  RAINCOAT_1,  'faces,center'),
    view('Side View',   RAINCOAT_1,  'left'),
    view('Action Shot', JACKET_1,    'center'),
    view('Full Body',   DOG_OUTFIT_1, 'center'),
  ],
  Walking: [
    view('Front View',  DOG_OUTFIT_2, 'faces,center'),
    view('Side View',   DOG_OUTFIT_3, 'left'),
    view('Action Shot', DOG_OUTFIT_1, 'center'),
    view('Full Body',   JACKET_1,    'center'),
  ],
  Travel: [
    view('Front View',  DOG_OUTFIT_1, 'faces,center'),
    view('Side View',   DOG_OUTFIT_3, 'left'),
    view('Action Shot', JACKET_1,    'center'),
    view('Full Body',   DOG_OUTFIT_2, 'center'),
  ],
  Outdoor: [
    view('Front View',  DOG_OUTFIT_2, 'faces,center'),
    view('Side View',   DOG_OUTFIT_1, 'left'),
    view('Action Shot', RAINCOAT_1,   'center'),
    view('Full Body',   DOG_OUTFIT_3, 'center'),
  ],
};

// Mock breed portraits used as "Your Dog" side in try-on
export const BREED_PORTRAITS: Record<string, string> = {
  'Golden Retriever':   'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop&crop=faces&q=85',
  'Labrador':           'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop&crop=faces&q=85',
  'German Shepherd':    'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=400&fit=crop&crop=faces&q=85',
  'French Bulldog':     'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&crop=faces&q=85',
  'Husky':              'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop&crop=faces&q=85',
  'Poodle':             'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop&crop=faces&q=85',
};

// Mock AI photo analysis — breed → estimated measurements
export const BREED_ESTIMATES: Record<string, {
  weight: number; chestSize: number; neckSize: number; backLength: number; confidence: number;
}> = {
  'Golden Retriever':  { weight: 30, chestSize: 68, neckSize: 46, backLength: 52, confidence: 93 },
  'Labrador':          { weight: 32, chestSize: 70, neckSize: 48, backLength: 54, confidence: 91 },
  'German Shepherd':   { weight: 29, chestSize: 66, neckSize: 44, backLength: 55, confidence: 89 },
  'French Bulldog':    { weight: 11, chestSize: 48, neckSize: 36, backLength: 30, confidence: 95 },
  'Husky':             { weight: 24, chestSize: 62, neckSize: 42, backLength: 50, confidence: 88 },
  'Poodle':            { weight: 20, chestSize: 55, neckSize: 38, backLength: 46, confidence: 90 },
};

export const DEFAULT_ESTIMATE = { weight: 25, chestSize: 60, neckSize: 42, backLength: 48, confidence: 85 };

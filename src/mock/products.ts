import type { Product } from '../types';

// ─── Local Canada Pooch product images — from new descriptive folders ────────
const DIR_BOOTS = '/Dog Boots & Shoes _ Canada Pooch';
const DIR_COOLING = '/Dog Cooling Clothes - Shirts, Accessories & More _ Canada Pooch';
const DIR_JACKETS = '/Dog Jackets & Coats_ Winter Jackets, Coats, & Parkas _ Canada Pooch';
const DIR_VESTS = '/Dog Vests - Fleece, Cooling & Puffer Vests _ Canada Pooch';
const DIR_SNOWSUITS = '/Full Body One-Piece Dog Snowsuit _ Canada Pooch';
const DIR_SUMMER = '/Summer Dog Clothes & Accessories _ Canada Pooch';
const DIR_RAINCOATS = '/Waterproof Dog Clothing – Canada Pooch';

const IMG_PJ1 = `${DIR_JACKETS}/imgi_143_ExpeditionCoat_Reflective_Front_grande.jpg`;
const IMG_PJ2 = `${DIR_JACKETS}/imgi_137_TrueNorthParka_Black_Side_grande.jpg`;
const IMG_PJ3 = `${DIR_JACKETS}/imgi_134_WaterproofPuffer_Black_Side_grande.jpg`;
const IMG_PJ4 = `${DIR_JACKETS}/imgi_140_CompleteCoverageWinterCoat_Black_Side_grande.jpg`;
const IMG_PJ5 = `${DIR_JACKETS}/imgi_133_Eco_AlaskanArmyParka_Black_Side_grande.jpg`;
const IMG_PJ6 = `${DIR_JACKETS}/imgi_147_UtilityParka_Black_Front_grande.jpg`;
const IMG_PJ7 = `${DIR_JACKETS}/imgi_146_PrismPuffer_GreyTieDie_Side_grande.jpg`;

const IMG_RC1 = `${DIR_RAINCOATS}/imgi_89_ColdFrontRaincoat_Orange_Side_grande.jpg`;
const IMG_RC2 = `${DIR_RAINCOATS}/imgi_90_TorrentialTracker_Wetreveal_OnFigure_Side_grande.jpg`;
const IMG_RC3 = `${DIR_RAINCOATS}/imgi_91_WaterproofPuffer_Black_Side_grande.jpg`;
const IMG_RC4 = `${DIR_RAINCOATS}/imgi_56_WaterproofPuffer_Green_OffFigure_330x.jpg`;
const IMG_RC5 = `${DIR_RAINCOATS}/imgi_58_WaterproofPuffer_Violet_OffFigure_330x.jpg`;
const IMG_RC6 = `${DIR_RAINCOATS}/imgi_60_WaterproofPuffer_Taupe_OffFigure_330x.jpg`;

const IMG_SU1 = `${DIR_SNOWSUITS}/imgi_40_Snowsuit-Black2_82c016b2-511c-4563-9b5e-4556f879cd70_grande.jpg`;
const IMG_SU2 = `${DIR_JACKETS}/imgi_132_Snowsuit-Black2_82c016b2-511c-4563-9b5e-4556f879cd70_grande.jpg`;
const IMG_SU3 = `${DIR_JACKETS}/imgi_135_HarnessSnowsuit_Black_Side_grande.jpg`;
const IMG_SU4 = `${DIR_JACKETS}/imgi_150_CompleteControlHarnessJacket_Black_Side_2_grande.jpg`;
const IMG_SU5 = `${DIR_VESTS}/imgi_101_UltimateStretchVest_Black_Side_grande.jpg`;
const IMG_SU6 = `${DIR_JACKETS}/imgi_145_Shiny_Puffer_Vest_in_Black_Canada_Pooch_Dog_Puffer_Vest_color..black_size..14_side_grande.jpg`;

const IMG_SW1 = `${DIR_VESTS}/imgi_104_ThermalTechFleece_RedPlaid_Side_grande.jpg`;
const IMG_SW2 = `${DIR_VESTS}/imgi_108_ReversiblePufferVest_PinkPurple_Side_grande.jpg`;
const IMG_SW3 = `${DIR_VESTS}/imgi_97_WaterproofPuffer_Black_Side_grande.jpg`;
const IMG_SW4 = `${DIR_VESTS}/imgi_98_HarnessPuffer_Black_1_grande.jpg`;
const IMG_SW5 = `${DIR_VESTS}/imgi_99_Shiny_Puffer_Vest_in_Black_Canada_Pooch_Dog_Puffer_Vest_color..black_size..14_side_grande.jpg`;
const IMG_SW6 = `${DIR_VESTS}/imgi_100_UtilityParka_Black_Front_grande.jpg`;

const IMG_CO1 = `${DIR_SUMMER}/imgi_154_CoolingVest_Blue_-Side_grande.jpg`;
const IMG_CO2 = `${DIR_SUMMER}/imgi_152_CoolingStation_Blue_Front_grande.jpg`;
const IMG_CO3 = `${DIR_SUMMER}/imgi_153_ChillSeekerCoolingHarness_BlueGreen_Side_grande.jpg`;
const IMG_CO4 = `${DIR_COOLING}/imgi_52_MaxChillCoolingHarness_BelowTheFold_Carousel_3_ad0941f5-0995-45b2-8502-5cc1a6a4b86e.jpg`;
const IMG_CO5 = `${DIR_SUMMER}/imgi_155_ChillSeekerCoolingVest_WetRevealSmiley_Side_grande.jpg`;
const IMG_CO6 = `${DIR_SUMMER}/imgi_154_CoolingVest_Blue_-Side_grande.jpg`;

const IMG_BO1 = `${DIR_BOOTS}/imgi_57_HotPavementBoots_Blue_Side_grande.jpg`;
const IMG_BO2 = `${DIR_BOOTS}/imgi_58_WaterproofBoots_Black_Side_2_grande.jpg`;
const IMG_BO3 = `${DIR_BOOTS}/imgi_61_SoftShieldBoots_Green_Front_grande.jpg`;
const IMG_BO4 = `${DIR_BOOTS}/imgi_36_SoftShieldBoots_PinkReflective_OffFigure_5e9f0ef1-e3c5-4c8a-a743-bdc9ba498811_330x.jpg`;
const IMG_BO5 = `${DIR_BOOTS}/imgi_30_SoftShieldBoots_Black_OffFigure_4_330x.jpg`;
const IMG_BO6 = `${DIR_BOOTS}/imgi_38_SoftShieldDogBoots_Camo_OffFigure_7e3fe995-25b8-45ad-b1cf-0bf21a74a445_330x.jpg`;

const IMG_HA1 = `${DIR_SUMMER}/imgi_149_canada-pooch-splatter-everything-dog-harness-front-view_a85e7060-37b1-483d-b322-d29521b9655d_grande.jpg`;
const IMG_HA2 = `${DIR_SUMMER}/imgi_150_EverythingHarness_Reflective_Side_a66d3386-3055-471e-885d-40e1f57afdb6_grande.jpg`;
const IMG_HA3 = `${DIR_COOLING}/imgi_52_MaxChillCoolingHarness_BelowTheFold_Carousel_3_ad0941f5-0995-45b2-8502-5cc1a6a4b86e.jpg`;
const IMG_HA4 = `${DIR_SUMMER}/imgi_153_ChillSeekerCoolingHarness_BlueGreen_Side_grande.jpg`;
const IMG_HA5 = `${DIR_VESTS}/imgi_98_HarnessPuffer_Black_1_grande.jpg`;
const IMG_HA6 = `${DIR_SUMMER}/imgi_149_canada-pooch-splatter-everything-dog-harness-front-view_a85e7060-37b1-483d-b322-d29521b9655d_grande.jpg`;

const IMG_TR1 = `${DIR_JACKETS}/imgi_147_UtilityParka_Black_Front_grande.jpg`;
const IMG_TR2 = `${DIR_VESTS}/imgi_98_HarnessPuffer_Black_1_grande.jpg`;
const IMG_TR3 = `${DIR_JACKETS}/imgi_145_Shiny_Puffer_Vest_in_Black_Canada_Pooch_Dog_Puffer_Vest_color..black_size..14_side_grande.jpg`;
const IMG_TR4 = `${DIR_VESTS}/imgi_108_ReversiblePufferVest_PinkPurple_Side_grande.jpg`;
const IMG_TR5 = `${DIR_JACKETS}/imgi_150_CompleteControlHarnessJacket_Black_Side_2_grande.jpg`;
const IMG_TR6 = `${DIR_JACKETS}/imgi_143_ExpeditionCoat_Reflective_Front_grande.jpg`;

const IMG_OD1 = `${DIR_JACKETS}/imgi_147_UtilityParka_Black_Front_grande.jpg`;
const IMG_OD2 = `${DIR_JACKETS}/imgi_143_ExpeditionCoat_Reflective_Front_grande.jpg`;
const IMG_OD3 = `${DIR_VESTS}/imgi_98_HarnessPuffer_Black_1_grande.jpg`;
const IMG_OD4 = `${DIR_JACKETS}/imgi_140_CompleteCoverageWinterCoat_Black_Side_grande.jpg`;
const IMG_OD5 = `${DIR_JACKETS}/imgi_147_UtilityParka_Black_Front_grande.jpg`;
const IMG_OD6 = `${DIR_VESTS}/imgi_101_UltimateStretchVest_Black_Side_grande.jpg`;

export const PRODUCTS: Product[] = [

  // ── PARKAS & JACKETS (7) ─────────────────────────────────────────────────
  {
    id: 'pj1', name: 'Expedition Parka', price: 89, category: 'Parkas & Jackets',
    rating: 4.9, reviewCount: 2847,
    imageUrl: IMG_PJ1,
    description: 'Flagship winter parka with water-resistant outer shell, premium insulation, and ergonomic design for maximum comfort.',
    recommendationReason: 'Perfect for Golden Retrievers in cold climates. XXL sizing with 2 cm comfort allowance.',
    recommendedFor: ['Golden Retriever', 'Labrador', 'German Shepherd'],
    sizes: ['XS','S','M','L','XL','XXL'], badge: 'AI Top Pick', inStock: true, returnRate: 0.08,
  },
  {
    id: 'pj2', name: 'Nordic Parka Suit', price: 118, category: 'Parkas & Jackets',
    rating: 4.8, reviewCount: 742,
    imageUrl: IMG_PJ2,
    description: 'Full-body protection with insulated legs, waterproof shell, and integrated hood for -30 °C.',
    recommendationReason: 'Leg coverage prevents ice-ball formation — designed for Nordic and working breeds.',
    recommendedFor: ['Husky', 'German Shepherd', 'Golden Retriever'],
    sizes: ['S','M','L','XL','XXL'], badge: 'Premium', inStock: true, returnRate: 0.07,
  },
  {
    id: 'pj3', name: 'Blizzard Puffer Jacket', price: 64, category: 'Parkas & Jackets',
    rating: 4.7, reviewCount: 1103,
    imageUrl: IMG_PJ3,
    description: 'Lightweight puffer with 600-fill recycled down. Slim profile allows full leg movement.',
    recommendationReason: 'Ideal mid-layer for Labradors who run warm. Vest-cut gives full range of motion.',
    recommendedFor: ['Labrador', 'Golden Retriever', 'Poodle'],
    sizes: ['XS','S','M','L','XL','XXL'], badge: undefined, inStock: true, returnRate: 0.09,
  },
  {
    id: 'pj4', name: 'Sherpa Mountain Jacket', price: 96, category: 'Parkas & Jackets',
    rating: 4.8, reviewCount: 534,
    imageUrl: IMG_PJ4,
    description: 'Sherpa-lined shell with quilted body and ribbed cuffs. Reflective piping for low-light visibility.',
    recommendationReason: 'Sherpa lining provides extra warmth for German Shepherds on overnight camping trips.',
    recommendedFor: ['German Shepherd', 'Husky', 'Labrador'],
    sizes: ['S','M','L','XL','XXL'], badge: 'Best Seller', inStock: true, returnRate: 0.06,
  },
  {
    id: 'pj5', name: 'Frenchie Warm Wrap', price: 55, category: 'Parkas & Jackets',
    rating: 4.9, reviewCount: 678,
    imageUrl: IMG_PJ5,
    description: 'Purpose-built for brachycephalic breeds. Wide chest panel, no neck pressure, step-in design.',
    recommendationReason: 'Wide chest and no-neck-pressure design keeps French Bulldogs cozy without restricting breathing.',
    recommendedFor: ['French Bulldog'],
    sizes: ['XS','S','M'], badge: 'Breed Specific', inStock: true, returnRate: 0.04,
  },
  {
    id: 'pj6', name: 'Tundra Thermal Coat', price: 79, category: 'Parkas & Jackets',
    rating: 4.7, reviewCount: 412,
    imageUrl: IMG_PJ6,
    description: 'Four-way stretch thermal fabric with wind-block membrane for high-activity winter sports.',
    recommendationReason: 'Flexible thermal construction allows Huskies to maintain natural gait in heavy snow.',
    recommendedFor: ['Husky', 'German Shepherd'],
    sizes: ['M','L','XL','XXL'], badge: undefined, inStock: true, returnRate: 0.08,
  },
  {
    id: 'pj7', name: 'Arctic Fleece Liner', price: 42, category: 'Parkas & Jackets',
    rating: 4.6, reviewCount: 891,
    imageUrl: IMG_PJ7,
    description: 'Ultra-soft polar fleece inner layer. Wear alone on mild days or layer under a shell for maximum warmth.',
    recommendationReason: 'Great base layer for Poodles whose clipped coats offer less natural insulation.',
    recommendedFor: ['Poodle', 'French Bulldog'],
    sizes: ['XS','S','M','L','XL'], badge: undefined, inStock: true, returnRate: 0.10,
  },

  // ── RAINCOATS (6) ────────────────────────────────────────────────────────
  {
    id: 'rc1', name: 'Urban Rain Jacket', price: 64, category: 'Raincoats',
    rating: 4.7, reviewCount: 1923,
    imageUrl: IMG_RC1,
    description: 'Fully waterproof with taped seams and reflective trim. Lightweight and packable.',
    recommendationReason: 'Adjustable chest and neck closures provide a customisable fit for city walks.',
    recommendedFor: ['Husky', 'Poodle', 'Labrador'],
    sizes: ['XS','S','M','L','XL','XXL'], badge: 'Best Seller', inStock: true, returnRate: 0.11,
  },
  {
    id: 'rc2', name: 'Storm Shield Raincoat', price: 72, category: 'Raincoats',
    rating: 4.8, reviewCount: 1047,
    imageUrl: IMG_RC2,
    description: 'Heavy-duty waterproof coat with underbelly coverage, adjustable hood, and quick-dry lining.',
    recommendationReason: 'Full underbelly shield protects Golden Retrievers on muddy trail runs.',
    recommendedFor: ['Golden Retriever', 'Labrador', 'German Shepherd'],
    sizes: ['S','M','L','XL','XXL'], badge: 'AI Top Pick', inStock: true, returnRate: 0.07,
  },
  {
    id: 'rc3', name: 'Drizzle Day Poncho', price: 38, category: 'Raincoats',
    rating: 4.5, reviewCount: 2214,
    imageUrl: IMG_RC3,
    description: 'Ultra-lightweight poncho-style rain cover. Slips on in seconds for unexpected showers.',
    recommendationReason: 'Quick-on design is perfect for Labradors who fidget during dressing. No zips, no fuss.',
    recommendedFor: ['Labrador', 'Golden Retriever'],
    sizes: ['XS','S','M','L','XL','XXL'], badge: undefined, inStock: true, returnRate: 0.13,
  },
  {
    id: 'rc4', name: 'Puddle Jumper Slicker', price: 52, category: 'Raincoats',
    rating: 4.6, reviewCount: 887,
    imageUrl: IMG_RC4,
    description: 'Vibrant slicker with snap closures and reflective side panels for early morning or evening walks.',
    recommendationReason: 'Snap closure avoids Poodle coat tangles. Reflective panels keep them visible in dark rain.',
    recommendedFor: ['Poodle', 'French Bulldog'],
    sizes: ['XS','S','M','L','XL'], badge: 'New Arrival', inStock: true, returnRate: 0.09,
  },
  {
    id: 'rc5', name: 'Shepherd Storm Jacket', price: 84, category: 'Raincoats',
    rating: 4.8, reviewCount: 621,
    imageUrl: IMG_RC5,
    description: 'Extended back coverage with waterproof zip and high collar for long body-to-chest ratios.',
    recommendationReason: 'Extended back length sized for German Shepherd proportions — no gap between jacket and tail.',
    recommendedFor: ['German Shepherd', 'Husky'],
    sizes: ['M','L','XL','XXL'], badge: 'Breed Specific', inStock: true, returnRate: 0.05,
  },
  {
    id: 'rc6', name: 'Husky Waterproof Shell', price: 76, category: 'Raincoats',
    rating: 4.7, reviewCount: 498,
    imageUrl: IMG_RC6,
    description: 'Lightweight waterproof shell for thick double coats. Elasticated hem prevents riding up.',
    recommendationReason: "Sits over the Husky's double coat without compressing the insulating undercoat.",
    recommendedFor: ['Husky', 'German Shepherd'],
    sizes: ['M','L','XL','XXL'], badge: undefined, inStock: true, returnRate: 0.08,
  },

  // ── SUITS (6) ────────────────────────────────────────────────────────────
  {
    id: 'su1', name: 'Max Chill Snow Suit', price: 129, category: 'Suits',
    rating: 4.9, reviewCount: 1821,
    imageUrl: IMG_SU1,
    description: 'Full-body snow suit with sealed seams, padded belly guard, and integrated harness opening. -40 °C rated.',
    recommendationReason: 'Full belly and leg coverage prevents hypothermia for Golden Retrievers on ski hill trips.',
    recommendedFor: ['Golden Retriever', 'Labrador', 'Husky'],
    sizes: ['XS','S','M','L','XL','XXL'], badge: 'AI Top Pick', inStock: true, returnRate: 0.05,
  },
  {
    id: 'su2', name: 'Slush Suit Pro', price: 98, category: 'Suits',
    rating: 4.8, reviewCount: 943,
    imageUrl: IMG_SU2,
    description: 'Waterproof and windproof full-body suit for wet snow and slush conditions. Taped seams throughout.',
    recommendationReason: 'Slush-proof construction keeps Labradors dry on spring hikes when snow melts underfoot.',
    recommendedFor: ['Labrador', 'Golden Retriever', 'German Shepherd'],
    sizes: ['S','M','L','XL','XXL'], badge: 'Best Seller', inStock: true, returnRate: 0.06,
  },
  {
    id: 'su3', name: 'Frenchie Full Suit', price: 86, category: 'Suits',
    rating: 4.9, reviewCount: 512,
    imageUrl: IMG_SU3,
    description: 'Brachycephalic-safe full suit with open chest panel, step-in legs, and snap belly closure.',
    recommendationReason: 'Open chest panel prevents overheating — the safest full-suit option for French Bulldogs.',
    recommendedFor: ['French Bulldog'],
    sizes: ['XS','S','M'], badge: 'Breed Specific', inStock: true, returnRate: 0.04,
  },
  {
    id: 'su4', name: 'Husky Expedition Suit', price: 148, category: 'Suits',
    rating: 4.9, reviewCount: 387,
    imageUrl: IMG_SU4,
    description: 'Technical mountaineering suit with GoreTex-inspired fabric, integrated harness pass-through, and GPS pocket.',
    recommendationReason: "Designed for Huskies on multi-day expeditions — doesn't compress their double-coat insulation.",
    recommendedFor: ['Husky', 'German Shepherd'],
    sizes: ['L','XL','XXL'], badge: 'Premium', inStock: true, returnRate: 0.04,
  },
  {
    id: 'su5', name: 'Poodle Tailored Suit', price: 112, category: 'Suits',
    rating: 4.7, reviewCount: 298,
    imageUrl: IMG_SU5,
    description: 'Slim-cut suit tailored for the narrow waist of standard Poodles. Merino outer layer, fleece inner.',
    recommendationReason: "Tailored waist cut prevents the 'tent' effect common on Poodles wearing standard-sized suits.",
    recommendedFor: ['Poodle'],
    sizes: ['S','M','L','XL'], badge: 'New Arrival', inStock: true, returnRate: 0.07,
  },
  {
    id: 'su6', name: 'Lightweight Spring Suit', price: 74, category: 'Suits',
    rating: 4.6, reviewCount: 734,
    imageUrl: IMG_SU6,
    description: 'Thin shell suit for early spring and late fall. Water-repellent, packable, full-body coverage.',
    recommendationReason: 'Packable thin-shell keeps Golden Retrievers dry in early spring without overheating.',
    recommendedFor: ['Golden Retriever', 'Labrador'],
    sizes: ['XS','S','M','L','XL','XXL'], badge: undefined, inStock: true, returnRate: 0.09,
  },

  // ── SWEATERS & HOODIES (6) ───────────────────────────────────────────────
  {
    id: 'sw1', name: 'Classic Cable Knit Sweater', price: 48, category: 'Sweaters & Hoodies',
    rating: 4.8, reviewCount: 2103,
    imageUrl: IMG_SW1,
    description: 'Hand-feel cable knit construction in premium acrylic. Stretchy rib cuffs for a snug, comfortable fit.',
    recommendationReason: 'Stretchy cable knit fits over the Frenchie chest without neck pressure — looks great too.',
    recommendedFor: ['French Bulldog', 'Poodle'],
    sizes: ['XS','S','M','L','XL','XXL'], badge: 'Best Seller', inStock: true, returnRate: 0.08,
  },
  {
    id: 'sw2', name: 'Hoodie Flex', price: 56, category: 'Sweaters & Hoodies',
    rating: 4.7, reviewCount: 1456,
    imageUrl: IMG_SW2,
    description: 'Soft cotton-blend hoodie with kangaroo pocket and draw-string hood. Machine washable.',
    recommendationReason: 'Relaxed cotton hoodie is perfect for Golden Retrievers on casual indoor/outdoor days.',
    recommendedFor: ['Golden Retriever', 'Labrador'],
    sizes: ['XS','S','M','L','XL','XXL'], badge: undefined, inStock: true, returnRate: 0.10,
  },
  {
    id: 'sw3', name: 'Merino Wool Pullover', price: 78, category: 'Sweaters & Hoodies',
    rating: 4.9, reviewCount: 623,
    imageUrl: IMG_SW3,
    description: 'Superfine merino wool pullover. Temperature-regulating, anti-odour, and naturally soft.',
    recommendationReason: 'Merino self-regulates temperature — ideal for Labradors who go from cold cars to warm homes.',
    recommendedFor: ['Labrador', 'Golden Retriever', 'Poodle'],
    sizes: ['S','M','L','XL','XXL'], badge: 'Premium', inStock: true, returnRate: 0.06,
  },
  {
    id: 'sw4', name: 'Zip-Up Fleece Hoodie', price: 62, category: 'Sweaters & Hoodies',
    rating: 4.7, reviewCount: 891,
    imageUrl: IMG_SW4,
    description: 'Full-zip fleece hoodie with contrast trim. Easy on/off with full-length zip from neck to tail.',
    recommendationReason: 'Full-zip makes dressing large breeds like German Shepherds quick and stress-free.',
    recommendedFor: ['German Shepherd', 'Husky', 'Labrador'],
    sizes: ['M','L','XL','XXL'], badge: undefined, inStock: true, returnRate: 0.09,
  },
  {
    id: 'sw5', name: 'Husky Thermal Hoodie', price: 54, category: 'Sweaters & Hoodies',
    rating: 4.6, reviewCount: 432,
    imageUrl: IMG_SW5,
    description: 'Technical thermal fabric hoodie for active breeds. Four-way stretch, moisture-wicking inner layer.',
    recommendationReason: 'Moisture-wicking layer pulls sweat away from the Husky coat during high-intensity activity.',
    recommendedFor: ['Husky', 'German Shepherd'],
    sizes: ['L','XL','XXL'], badge: undefined, inStock: true, returnRate: 0.07,
  },
  {
    id: 'sw6', name: 'Poodle Elegant Cardigan', price: 72, category: 'Sweaters & Hoodies',
    rating: 4.8, reviewCount: 314,
    imageUrl: IMG_SW6,
    description: 'Open-front cardigan in bouclé knit. Designed to drape elegantly without snagging Poodle curls.',
    recommendationReason: "Bouclé weave does not snag Poodle curls — preserves the coat's natural ringlets.",
    recommendedFor: ['Poodle'],
    sizes: ['S','M','L','XL'], badge: 'New Arrival', inStock: true, returnRate: 0.06,
  },

  // ── COOLING (6) ──────────────────────────────────────────────────────────
  {
    id: 'co1', name: 'Cooling Hydro Vest', price: 48, category: 'Cooling',
    rating: 4.9, reviewCount: 1892,
    imageUrl: IMG_CO1,
    description: 'Evaporative cooling vest — soak, squeeze, and slip on. Keeps core temperature 10–15 °F cooler.',
    recommendationReason: 'Evaporative cooling prevents heat exhaustion for Golden Retrievers on summer hikes.',
    recommendedFor: ['Golden Retriever', 'Labrador', 'German Shepherd'],
    sizes: ['XS','S','M','L','XL','XXL'], badge: 'AI Top Pick', inStock: true, returnRate: 0.06,
  },
  {
    id: 'co2', name: 'UV Shield Mesh Vest', price: 36, category: 'Cooling',
    rating: 4.7, reviewCount: 1341,
    imageUrl: IMG_CO2,
    description: 'UPF 50+ lightweight mesh vest. Blocks UV rays while allowing full airflow for beach days.',
    recommendationReason: 'UPF 50+ mesh blocks UV rays without trapping heat — critical for fair-coated Poodles.',
    recommendedFor: ['Poodle', 'Golden Retriever', 'Labrador'],
    sizes: ['XS','S','M','L','XL'], badge: 'New Arrival', inStock: true, returnRate: 0.08,
  },
  {
    id: 'co3', name: 'Frenchie Breeze Tank', price: 32, category: 'Cooling',
    rating: 4.8, reviewCount: 764,
    imageUrl: IMG_CO3,
    description: 'Sleeveless open-weave tank for brachycephalic breeds. Wide neck, no belly band, maximum airflow.',
    recommendationReason: 'Open-weave and brachycephalic-safe no-neck design is the safest summer layer for Frenchies.',
    recommendedFor: ['French Bulldog'],
    sizes: ['XS','S','M'], badge: 'Breed Specific', inStock: true, returnRate: 0.04,
  },
  {
    id: 'co4', name: 'Ice Pack Harness Vest', price: 62, category: 'Cooling',
    rating: 4.8, reviewCount: 512,
    imageUrl: IMG_CO4,
    description: 'Harness with gel ice-pack pockets over shoulders and chest. Holds cold for 3 hours.',
    recommendationReason: "Gel ice packs counter the Husky's natural insulation during summer — prevents overheating.",
    recommendedFor: ['Husky', 'German Shepherd'],
    sizes: ['L','XL','XXL'], badge: 'Premium', inStock: true, returnRate: 0.05,
  },
  {
    id: 'co5', name: 'Beach Ready Rash Guard', price: 42, category: 'Cooling',
    rating: 4.7, reviewCount: 689,
    imageUrl: IMG_CO5,
    description: 'Quick-dry UPF 50+ nylon rash guard for swimming dogs. Four-way stretch, salt and chlorine resistant.',
    recommendationReason: 'Protects Golden Retrievers from UV and skin irritation after swimming in salt water.',
    recommendedFor: ['Golden Retriever', 'Labrador'],
    sizes: ['S','M','L','XL','XXL'], badge: 'Best Seller', inStock: true, returnRate: 0.07,
  },
  {
    id: 'co6', name: 'Summer Stripe Tee', price: 28, category: 'Cooling',
    rating: 4.5, reviewCount: 2103,
    imageUrl: IMG_CO6,
    description: 'Cotton-blend short-sleeve tee for casual summer outings. Machine washable, fade-resistant.',
    recommendationReason: 'Lightweight cotton lets Labradors stay stylish without overheating on café outings.',
    recommendedFor: ['Labrador', 'Poodle', 'French Bulldog'],
    sizes: ['XS','S','M','L','XL','XXL'], badge: undefined, inStock: true, returnRate: 0.10,
  },

  // ── BOOTS (6) ────────────────────────────────────────────────────────────
  {
    id: 'bo1', name: 'Hot Pavement Boots', price: 58, category: 'Boots & Shoes',
    rating: 4.9, reviewCount: 2341,
    imageUrl: IMG_BO1,
    description: 'Heat-resistant rubber soles rated to 200 °F. Protects paws from scorching pavement in summer.',
    recommendationReason: 'Rubber soles shield Labrador paw pads from urban pavement that can exceed 150 °F in summer.',
    recommendedFor: ['Labrador', 'Golden Retriever', 'French Bulldog'],
    sizes: ['XS','S','M','L','XL','XXL'], badge: 'AI Top Pick', inStock: true, returnRate: 0.07,
  },
  {
    id: 'bo2', name: 'Winter Trek Boots', price: 64, category: 'Boots & Shoes',
    rating: 4.8, reviewCount: 1876,
    imageUrl: IMG_BO2,
    description: 'Waterproof winter boots with non-slip lug soles and fleece inner lining. Velcro strap closure.',
    recommendationReason: 'Non-slip lug soles prevent slipping on ice — essential for large breeds like Golden Retrievers.',
    recommendedFor: ['Golden Retriever', 'Labrador', 'German Shepherd'],
    sizes: ['XS','S','M','L','XL','XXL'], badge: 'Best Seller', inStock: true, returnRate: 0.09,
  },
  {
    id: 'bo3', name: 'Trail Paw Protectors', price: 46, category: 'Boots & Shoes',
    rating: 4.7, reviewCount: 987,
    imageUrl: IMG_BO3,
    description: 'Lightweight trail boots with puncture-resistant sole and breathable mesh upper. Ideal for hiking.',
    recommendationReason: 'Puncture-resistant sole protects Husky paws on sharp rocky terrain without adding weight.',
    recommendedFor: ['Husky', 'German Shepherd', 'Labrador'],
    sizes: ['S','M','L','XL','XXL'], badge: undefined, inStock: true, returnRate: 0.11,
  },
  {
    id: 'bo4', name: 'Slip-On Paw Socks', price: 24, category: 'Boots & Shoes',
    rating: 4.5, reviewCount: 3412,
    imageUrl: IMG_BO4,
    description: 'Non-slip grip socks for hardwood floors and light outdoor use. Machine washable, set of 4.',
    recommendationReason: 'Non-slip grip prevents joint strain on hardwood floors — especially important for Frenchies prone to joint issues.',
    recommendedFor: ['French Bulldog', 'Poodle'],
    sizes: ['XS','S','M','L'], badge: undefined, inStock: true, returnRate: 0.12,
  },
  {
    id: 'bo5', name: 'Waterproof Rain Booties', price: 52, category: 'Boots & Shoes',
    rating: 4.7, reviewCount: 1123,
    imageUrl: IMG_BO5,
    description: 'Waterproof neoprene booties that seal out mud and rain. Reflective heel strip for visibility.',
    recommendationReason: 'Neoprene seal keeps Poodle paws dry and clean on muddy walks — no more post-walk paw wipes.',
    recommendedFor: ['Poodle', 'Golden Retriever', 'Labrador'],
    sizes: ['XS','S','M','L','XL'], badge: 'New Arrival', inStock: true, returnRate: 0.08,
  },
  {
    id: 'bo6', name: 'Tactical Dog Boots', price: 72, category: 'Boots & Shoes',
    rating: 4.8, reviewCount: 543,
    imageUrl: IMG_BO6,
    description: 'Military-grade boots with Cordura upper and Vibram-style lug sole. Built for extreme terrain.',
    recommendationReason: "Cordura and Vibram sole withstand the extreme terrain German Shepherds cover during working duties.",
    recommendedFor: ['German Shepherd', 'Husky'],
    sizes: ['M','L','XL','XXL'], badge: 'Premium', inStock: true, returnRate: 0.05,
  },

  // ── HARNESSES (6) ────────────────────────────────────────────────────────
  {
    id: 'ha1', name: 'Easy Walk No-Pull Harness', price: 46, category: 'Harnesses',
    rating: 4.9, reviewCount: 4521,
    imageUrl: IMG_HA1,
    description: 'Front-clip no-pull harness with padded chest plate and dual-point attachment. Reduces pulling by 70%.',
    recommendationReason: 'Front-clip design redistributes pull force — handlers report 70% less pulling from Golden Retrievers.',
    recommendedFor: ['Golden Retriever', 'Labrador', 'German Shepherd'],
    sizes: ['XS','S','M','L','XL','XXL'], badge: 'AI Top Pick', inStock: true, returnRate: 0.06,
  },
  {
    id: 'ha2', name: 'Reflective Safety Harness', price: 54, category: 'Harnesses',
    rating: 4.8, reviewCount: 2187,
    imageUrl: IMG_HA2,
    description: '360° reflective stitching harness for night and low-light walks. Padded for all-day comfort.',
    recommendationReason: '360° reflective stitching ensures Labradors are visible from 500 m in car headlights.',
    recommendedFor: ['Labrador', 'Golden Retriever', 'Poodle'],
    sizes: ['XS','S','M','L','XL','XXL'], badge: 'Best Seller', inStock: true, returnRate: 0.07,
  },
  {
    id: 'ha3', name: 'Adventure Pack Harness', price: 78, category: 'Harnesses',
    rating: 4.8, reviewCount: 932,
    imageUrl: IMG_HA3,
    description: 'Hiking harness with integrated saddlebags, grab handle, and rear light mount. Holds 2 lbs.',
    recommendationReason: 'Saddlebags let German Shepherds carry their own water and snacks on full-day hikes.',
    recommendedFor: ['German Shepherd', 'Husky', 'Labrador'],
    sizes: ['L','XL','XXL'], badge: 'Premium', inStock: true, returnRate: 0.06,
  },
  {
    id: 'ha4', name: 'Frenchie Step-In Harness', price: 38, category: 'Harnesses',
    rating: 4.9, reviewCount: 1843,
    imageUrl: IMG_HA4,
    description: 'Step-in harness with wide chest panel and no overhead neck loop. Designed for brachycephalic breeds.',
    recommendationReason: 'No overhead neck loop eliminates tracheal pressure on French Bulldogs — the safest harness design.',
    recommendedFor: ['French Bulldog'],
    sizes: ['XS','S','M'], badge: 'Breed Specific', inStock: true, returnRate: 0.04,
  },
  {
    id: 'ha5', name: 'Car Safety Harness', price: 62, category: 'Harnesses',
    rating: 4.7, reviewCount: 1287,
    imageUrl: IMG_HA5,
    description: 'Crash-tested car harness with seatbelt attachment. Certified to withstand 15G of force.',
    recommendationReason: 'Crash-tested construction keeps Golden Retrievers safely restrained during emergency braking.',
    recommendedFor: ['Golden Retriever', 'Labrador', 'German Shepherd'],
    sizes: ['S','M','L','XL','XXL'], badge: 'Safety Certified', inStock: true, returnRate: 0.05,
  },
  {
    id: 'ha6', name: 'Tracking Harness Pro', price: 94, category: 'Harnesses',
    rating: 4.8, reviewCount: 421,
    imageUrl: IMG_HA6,
    description: 'GPS-compatible tracking harness with Y-front design, handle, and reinforced attachment points.',
    recommendationReason: 'GPS-compatible slot and reinforced points give full control of Huskies in backcountry terrain.',
    recommendedFor: ['Husky', 'German Shepherd'],
    sizes: ['M','L','XL','XXL'], badge: undefined, inStock: true, returnRate: 0.06,
  },

  // ── TRAVEL (6) ──────────────────────────────────────────────────────────
  {
    id: 't1', name: 'Jet Set Travel Vest', price: 58, category: 'Travel',
    rating: 4.7, reviewCount: 1102,
    imageUrl: IMG_TR1,
    description: 'Airline-approved travel vest with calming compression and ID pocket. Reduces travel anxiety.',
    recommendationReason: 'Calming compression reduces travel anxiety in Golden Retrievers — tested on 500+ air journeys.',
    recommendedFor: ['Golden Retriever', 'Labrador', 'Poodle'],
    sizes: ['S','M','L','XL','XXL'], badge: 'AI Top Pick', inStock: true, returnRate: 0.06,
  },
  {
    id: 't2', name: 'Road Trip Blanket Coat', price: 49, category: 'Travel',
    rating: 4.6, reviewCount: 874,
    imageUrl: IMG_TR2,
    description: 'Reversible travel coat that doubles as a car-seat blanket. Waterproof one side, sherpa the other.',
    recommendationReason: 'Reversible design works as seat protector and destination coat — great for active Labradors.',
    recommendedFor: ['Labrador', 'Golden Retriever'],
    sizes: ['M','L','XL','XXL'], badge: undefined, inStock: true, returnRate: 0.09,
  },
  {
    id: 't3', name: 'Frenchie Fly Jacket', price: 62, category: 'Travel',
    rating: 4.8, reviewCount: 541,
    imageUrl: IMG_TR3,
    description: 'Breathable travel jacket for in-cabin flights with brachycephalic breeds. Open-chest, anti-overheat.',
    recommendationReason: 'Open-chest ventilation is critical for French Bulldogs in pressurised aircraft cabins.',
    recommendedFor: ['French Bulldog'],
    sizes: ['XS','S','M'], badge: 'Breed Specific', inStock: true, returnRate: 0.05,
  },
  {
    id: 't4', name: 'Poodle Travel Wrap', price: 54, category: 'Travel',
    rating: 4.7, reviewCount: 398,
    imageUrl: IMG_TR4,
    description: 'Merino-blend travel wrap with Velcro closure. Keeps Poodles calm in transit without snagging curls.',
    recommendationReason: 'Merino fibre does not snag Poodle curls — prevents coat matting common with synthetic garments.',
    recommendedFor: ['Poodle'],
    sizes: ['S','M','L','XL'], badge: 'New Arrival', inStock: true, returnRate: 0.07,
  },
  {
    id: 't5', name: 'Adventure Pack Coat', price: 78, category: 'Travel',
    rating: 4.8, reviewCount: 763,
    imageUrl: IMG_TR5,
    description: 'Integrated saddlebag coat with zippered pockets, handle grab, and seat-belt loop.',
    recommendationReason: 'Integrated handle and seatbelt loop give handlers control of large breeds in transit.',
    recommendedFor: ['German Shepherd', 'Labrador', 'Husky'],
    sizes: ['L','XL','XXL'], badge: 'Best Seller', inStock: true, returnRate: 0.06,
  },
  {
    id: 't6', name: 'Husky Trail Runner Pack', price: 86, category: 'Travel',
    rating: 4.9, reviewCount: 312,
    imageUrl: IMG_TR6,
    description: 'High-performance travel coat with saddlebags, hydration tube port, and GPS-collar-compatible slot.',
    recommendationReason: 'Purpose-designed for Huskies on multi-day backcountry travel — ample storage without impeding stride.',
    recommendedFor: ['Husky', 'German Shepherd'],
    sizes: ['L','XL','XXL'], badge: 'Premium', inStock: true, returnRate: 0.05,
  },

  // ── OUTDOOR (6) ─────────────────────────────────────────────────────────
  {
    id: 'o1', name: 'Alpine Explorer Vest', price: 52, category: 'Outdoor',
    rating: 4.8, reviewCount: 1456,
    imageUrl: IMG_OD1,
    description: 'Lightweight hiking vest with reflective details, D-ring attachment, and multiple adjustment straps.',
    recommendationReason: 'Stretch panels accommodate deep-chested breeds without restricting movement on steep ascents.',
    recommendedFor: ['German Shepherd', 'Husky', 'Golden Retriever'],
    sizes: ['XS','S','M','L','XL','XXL'], badge: undefined, inStock: true, returnRate: 0.09,
  },
  {
    id: 'o2', name: 'Summit Hi-Vis Jacket', price: 67, category: 'Outdoor',
    rating: 4.7, reviewCount: 892,
    imageUrl: IMG_OD2,
    description: 'High-visibility orange outdoor jacket with 3M reflective strips for hunting season and trails.',
    recommendationReason: 'High-vis orange keeps Golden Retrievers safe during hunting season forest walks.',
    recommendedFor: ['Golden Retriever', 'Labrador'],
    sizes: ['M','L','XL','XXL'], badge: 'Safety Certified', inStock: true, returnRate: 0.07,
  },
  {
    id: 'o3', name: 'Trail Blazer Harness Coat', price: 74, category: 'Outdoor',
    rating: 4.8, reviewCount: 671,
    imageUrl: IMG_OD3,
    description: 'Integrated harness and coat combo with ergonomic padding and handle for steep terrain.',
    recommendationReason: 'Combined harness-coat eliminates layering friction for German Shepherds on mountain trails.',
    recommendedFor: ['German Shepherd', 'Husky', 'Labrador'],
    sizes: ['M','L','XL','XXL'], badge: 'AI Top Pick', inStock: true, returnRate: 0.06,
  },
  {
    id: 'o4', name: 'Retriever Field Jacket', price: 61, category: 'Outdoor',
    rating: 4.7, reviewCount: 824,
    imageUrl: IMG_OD4,
    description: 'Heavy-duty waxed canvas field jacket with ripstop panels for brush and brambles.',
    recommendationReason: "Waxed canvas panels protect Golden Retriever's feathering coat from burrs on field outings.",
    recommendedFor: ['Golden Retriever', 'Labrador'],
    sizes: ['L','XL','XXL'], badge: 'Best Seller', inStock: true, returnRate: 0.08,
  },
  {
    id: 'o5', name: 'Husky Backcountry Shell', price: 92, category: 'Outdoor',
    rating: 4.9, reviewCount: 347,
    imageUrl: IMG_OD5,
    description: 'Technical hardshell for extreme outdoor conditions. Seam-sealed, GoreTex-inspired, articulated fit.',
    recommendationReason: "Technical hardshell sits over the Husky's double coat without compressing the insulating layer.",
    recommendedFor: ['Husky', 'German Shepherd'],
    sizes: ['M','L','XL','XXL'], badge: 'Premium', inStock: true, returnRate: 0.05,
  },
  {
    id: 'o6', name: 'Frenchie Park Puffer', price: 58, category: 'Outdoor',
    rating: 4.8, reviewCount: 492,
    imageUrl: IMG_OD6,
    description: 'Compact puffer for park visits. Step-in design, wide neck opening, snap closure.',
    recommendationReason: 'Wide neck opening and step-in design avoids neck-pressure issues for French Bulldogs.',
    recommendedFor: ['French Bulldog'],
    sizes: ['XS','S','M'], badge: 'Breed Specific', inStock: true, returnRate: 0.04,
  },

];

// ─── category groupings (matches Canada Pooch nav) ────────────────────────────
export const OUTERWEAR_CATEGORIES = ['Parkas & Jackets', 'Raincoats', 'Suits', 'Sweaters & Hoodies'] as const;
export const GEAR_CATEGORIES      = ['Cooling', 'Boots & Shoes', 'Harnesses', 'Travel', 'Outdoor'] as const;
export const ALL_CATEGORIES       = [...OUTERWEAR_CATEGORIES, ...GEAR_CATEGORIES] as const;

// legacy export (kept for any components still importing it)
export const PRODUCT_CATEGORIES = ALL_CATEGORIES;
export const SEASON_CATEGORIES   = [] as const;
export const ACTIVITY_CATEGORIES = [] as const;

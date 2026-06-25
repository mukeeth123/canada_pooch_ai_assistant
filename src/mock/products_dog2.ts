import type { Product } from '../types';

import C1 from '../assets/dog2/Coats_1/dog_1.png';
import C2 from '../assets/dog2/Coats_1/dog_2.png';
import C3 from '../assets/dog2/Coats_1/dog_3.png';
import C4 from '../assets/dog2/Coats_1/dog_4.png';
import C5 from '../assets/dog2/Coats_1/dog_5.png';
import C6 from '../assets/dog2/Coats_1/dog_6.png';
import C7 from '../assets/dog2/Coats_1/dog_7.png';
import C8 from '../assets/dog2/Coats_1/dog_8.png';
import C9 from '../assets/dog2/Coats_1/dog_9.png';
import C10 from '../assets/dog2/Coats_1/dog_10.png';
import C11 from '../assets/dog2/Coats_1/dog_11.png';
import C12 from '../assets/dog2/Coats_1/dog_12.png';

import B1 from '../assets/dog2/Boots_2/dog_1.png';
import B2 from '../assets/dog2/Boots_2/dog_2.png';
import B3 from '../assets/dog2/Boots_2/dog_3.png';
import B4 from '../assets/dog2/Boots_2/dog_4.png';
import B5 from '../assets/dog2/Boots_2/dog_5.png';
import B6 from '../assets/dog2/Boots_2/dog_6.png';
import B7 from '../assets/dog2/Boots_2/dog_7.png';
import B8 from '../assets/dog2/Boots_2/dog_8.png';

import H1 from '../assets/dog2/Harness_1/ha1.png';
import H2 from '../assets/dog2/Harness_1/ha2.png';
import H3 from '../assets/dog2/Harness_1/ha3.png';
import H4 from '../assets/dog2/Harness_1/ha4.png';
import H5 from '../assets/dog2/Harness_1/ha5.png';
import H6 from '../assets/dog2/Harness_1/ha6.png';
import H7 from '../assets/dog2/Harness_1/ha7.png';
import H8 from '../assets/dog2/Harness_1/ha8.png';

const prices = [20, 25, 30, 35, 40, 45, 60];
const getPrice = (id: number) => prices[id % prices.length];

export const PRODUCTS_DOG2: Product[] = [
  ...[C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12].map((img, i) => ({
    id: `d2_c${i + 1}`,
    name: `Premium Coat ${i + 1}`,
    price: getPrice(i),
    category: 'Parkas & Jackets' as const,
    rating: 4.5 + Math.random() * 0.4,
    reviewCount: 100 + Math.floor(Math.random() * 300),
    imageUrl: img,
    description: `A highly durable and warm coat designed for Dog 2.`,
    recommendationReason: `Perfectly aligns with the back and chest measurements.`,
    recommendedFor: ['Dog 2', 'Mixed Breed', 'Golden Retriever'],
    sizes: ['M', 'L', 'XL'],
    inStock: true,
    returnRate: 2 + Math.random() * 5,
  })),
  ...[B1, B2, B3, B4, B5, B6, B7, B8].map((img, i) => ({
    id: `d2_b${i + 1}`,
    name: `Explorer Boots ${i + 1}`,
    price: getPrice(i),
    category: 'Boots & Shoes' as const,
    rating: 4.2 + Math.random() * 0.7,
    reviewCount: 50 + Math.floor(Math.random() * 150),
    imageUrl: img,
    description: `Tough terrain boots ensuring safety and grip.`,
    recommendationReason: `Excellent paw width coverage for optimal comfort.`,
    recommendedFor: ['Dog 2', 'Mixed Breed'],
    sizes: ['M', 'L'],
    inStock: true,
    returnRate: 4 + Math.random() * 3,
  })),
  ...[H1, H2, H3, H4, H5, H6, H7, H8].map((img, i) => ({
    id: `d2_h${i + 1}`,
    name: `Comfort Harness ${i + 1}`,
    price: getPrice(i),
    category: 'Harnesses' as const,
    rating: 4.8,
    reviewCount: 200 + Math.floor(Math.random() * 200),
    imageUrl: img,
    description: `Adjustable everyday harness for full control.`,
    recommendationReason: `Neck to chest proportion fits like a glove.`,
    recommendedFor: ['Dog 2', 'Poodle', 'Mixed Breed'],
    sizes: ['S', 'M', 'L'],
    inStock: true,
    returnRate: 1 + Math.random() * 4,
  }))
];

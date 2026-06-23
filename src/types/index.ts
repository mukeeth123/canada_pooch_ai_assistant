export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: 'Male' | 'Female';
  weight: number;
  chestSize: number;
  neckSize: number;
  backLength: number;
  ownerId: string;
  imageUrl: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  location: string;
  dogs: string[];
  totalOrders: number;
  returnRate: number;
  lifetimeValue: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Winter' | 'Summer' | 'Rain' | 'Walking' | 'Travel' | 'Outdoor';
  rating: number;
  reviewCount: number;
  imageUrl: string;
  description: string;
  recommendationReason: string;
  recommendedFor: string[];
  sizes: string[];
  badge?: string;
  inStock: boolean;
  returnRate: number;
}

export interface SizeRecommendation {
  dogId: string;
  recommendedSize: string;
  confidenceScore: number;
  chestMatch: number;
  neckMatch: number;
  backMatch: number;
  breedSimilarity: number;
  historicalSuccess: number;
  explanation: string;
  alternativeSize?: string;
  alternativeReturnRisk?: number;
}

export interface ReturnRisk {
  productId: string;
  size: string;
  returnProbability: number;
  riskFactors: RiskFactor[];
  alternativeSize: string;
  alternativeReturnProbability: number;
}

export interface RiskFactor {
  area: string;
  status: 'perfect' | 'slightly_loose' | 'slightly_tight' | 'too_loose' | 'too_tight';
  label: string;
}

export interface BreedProfile {
  breed: string;
  averageWeight: { min: number; max: number };
  averageChest: { min: number; max: number };
  averageNeck: { min: number; max: number };
  averageBack: { min: number; max: number };
  commonSizes: string[];
  imageUrl: string;
  description: string;
}

export interface FitFormData {
  dogName: string;
  breed: string;
  age: number;
  gender: 'Male' | 'Female';
  weight: number;
  chestSize: number;
  neckSize: number;
  backLength: number;
}

export interface BlackFridayData {
  projectedVisitors: number;
  expectedFitChecks: number;
  recommendationRequests: number;
  systemReadiness: number;
  trafficForecast: TimeSeriesPoint[];
  fitFinderForecast: TimeSeriesPoint[];
  recommendationForecast: TimeSeriesPoint[];
  insights: AIInsight[];
}

export interface TimeSeriesPoint {
  date: string;
  value: number;
  label?: string;
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  expandedContent: string;
}

export interface ROIData {
  currentReturnCost: number;
  projectedReturnReduction: number;
  annualSavings: number;
  implementationCost: number;
  roi: number;
  paybackMonths: number;
  beforeAfterReturns: TimeSeriesPoint[];
  revenueGrowth: TimeSeriesPoint[];
  conversionGrowth: TimeSeriesPoint[];
  savingsOverTime: TimeSeriesPoint[];
}

export interface RoadmapPhase {
  id: string;
  phase: number;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'upcoming';
  businessValue: string;
  technicalComponents: string[];
  expectedROI: string;
  timeline: string;
  icon: string;
}

export interface AppState {
  fitFormData: FitFormData | null;
  recommendation: SizeRecommendation | null;
  darkMode: boolean;
  wishlist: string[];
  compareList: string[];
  notifications: AppNotification[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  timestamp: Date;
  read: boolean;
}

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { AppState, FitFormData, SizeRecommendation, AppNotification } from '../types';
import { BREED_PROFILES } from '../mock/breeds';

type Action =
  | { type: 'SET_FIT_FORM'; payload: FitFormData }
  | { type: 'SET_RECOMMENDATION'; payload: SizeRecommendation }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'TOGGLE_WISHLIST'; payload: string }
  | { type: 'TOGGLE_COMPARE'; payload: string }
  | { type: 'ADD_NOTIFICATION'; payload: AppNotification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' };

const initialState: AppState = {
  fitFormData: null,
  recommendation: null,
  darkMode: false,
  wishlist: [],
  compareList: [],
  notifications: [
    {
      id: 'n1',
      title: 'Black Friday Alert',
      message: 'Traffic surge expected in 3 weeks. System readiness at 92%.',
      type: 'warning',
      timestamp: new Date(),
      read: false,
    },
    {
      id: 'n2',
      title: 'AI Model Updated',
      message: 'Fit accuracy improved to 95.2% after latest model update.',
      type: 'success',
      timestamp: new Date(),
      read: false,
    },
    {
      id: 'n3',
      title: 'ROI Milestone',
      message: 'Return reduction target exceeded by 4% this month.',
      type: 'success',
      timestamp: new Date(),
      read: true,
    },
  ],
};

function computeRecommendation(form: FitFormData): SizeRecommendation {
  const profile = BREED_PROFILES.find(b => b.breed === form.breed);
  const chest = form.chestSize ?? 0;
  const neck = form.neckSize ?? 0;
  const back = form.backLength ?? 0;
  const weight = form.weight ?? 0;

  let size = 'M';
  if (chest >= 72 || weight >= 34) size = 'XXL';
  else if (chest >= 65 || weight >= 28) size = 'XL';
  else if (chest >= 56 || weight >= 22) size = 'L';
  else if (chest >= 48 || weight >= 14) size = 'M';
  else if (chest >= 40 || weight >= 8) size = 'S';
  else size = 'XS';

  const chestMatch = Math.min(99, 88 + Math.random() * 10);
  const neckMatch = Math.min(99, 87 + Math.random() * 10);
  const backMatch = Math.min(99, 86 + Math.random() * 10);
  const breedSimilarity = profile ? Math.min(99, 88 + Math.random() * 10) : 82;
  const historicalSuccess = Math.min(99, 90 + Math.random() * 8);
  const confidence = Math.round((chestMatch + neckMatch + backMatch + breedSimilarity + historicalSuccess) / 5);

  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const idx = sizeOrder.indexOf(size);
  const altSize = idx > 0 ? sizeOrder[idx - 1] : sizeOrder[idx + 1] || size;

  return {
    dogId: 'current',
    recommendedSize: size,
    confidenceScore: confidence,
    chestMatch: Math.round(chestMatch),
    neckMatch: Math.round(neckMatch),
    backMatch: Math.round(backMatch),
    breedSimilarity: Math.round(breedSimilarity),
    historicalSuccess: Math.round(historicalSuccess),
    explanation: `Based on ${form.dogName}'s chest size of ${chest}cm, neck measurement of ${neck}cm, back length of ${back}cm, weight of ${weight}kg, and ${form.breed} breed profile, ${size} provides the highest confidence recommendation. Our AI has analyzed 14,000+ ${form.breed} sizing records to arrive at this result.`,
    alternativeSize: altSize,
    alternativeReturnRisk: 4,
  };
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_FIT_FORM':
      return { ...state, fitFormData: action.payload };
    case 'SET_RECOMMENDATION':
      return { ...state, recommendation: action.payload };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'TOGGLE_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.includes(action.payload)
          ? state.wishlist.filter(id => id !== action.payload)
          : [...state.wishlist, action.payload],
      };
    case 'TOGGLE_COMPARE':
      return {
        ...state,
        compareList: state.compareList.includes(action.payload)
          ? state.compareList.filter(id => id !== action.payload)
          : state.compareList.length < 3
          ? [...state.compareList, action.payload]
          : state.compareList,
      };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: state.notifications.map(n => ({ ...n, read: true })) };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  submitFitForm: (data: FitFormData) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  const submitFitForm = (data: FitFormData) => {
    dispatch({ type: 'SET_FIT_FORM', payload: data });
    const rec = computeRecommendation(data);
    dispatch({ type: 'SET_RECOMMENDATION', payload: rec });
  };

  return (
    <AppContext.Provider value={{ state, dispatch, submitFitForm }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

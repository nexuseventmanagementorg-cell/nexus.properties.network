// src/types/index.ts

export type LanguageMode = 'en' | 'ur' | 'roman_ur';

export interface AIEmployee {
  id: string;
  name: string;
  role: string;
  department: 'Verification & Trust' | 'Lead & Deal Operations' | 'Valuation & Intelligence' | 'Automation & Communication' | 'Legal & Governance';
  description: string;
  welcomeMessage?: string;
  avatarIcon: string;
  status: 'ONLINE' | 'PROCESSING' | 'STANDBY';
  tasksCompleted: string;
  accuracy: string;
  specialization: string;
}

export interface PropertyItem {
  id: string;
  title: string;
  city: string;
  area: string;
  society: string;
  price: string;
  priceRaw: number; // in PKR Lacs/Crores
  category: 'Buy' | 'Rent' | 'Sell' | 'Invest' | 'Industrial' | 'Corporate' | 'Agriculture';
  size: string;
  bedrooms?: number;
  bathrooms?: number;
  trustScore: number; // 0 - 100
  leadLockStatus: 'SECURED' | 'AVAILABLE' | 'IN_ESCROW';
  verifiedHash: string;
  featuredTag: string;
  annualRoi?: string;
  image: string;
  coordinates: [number, number]; // lat, lng
  phase?: string;
  status?: string;
  features?: string[];
  agent?: string;
  verificationStatus?: string;
  sampleTags?: string[];
}

export interface CityNode {
  name: string;
  province: string;
  areasCount: number;
  activeListings: number;
  aiTrustIndex: number;
  lat: number;
  lng: number;
  topSocieties: string[];
}

export interface ProblemSolutionItem {
  id: number;
  title: string;
  crisisPoints: string[];
  nexusSolutions: string[];
  impactMetric: string;
  icon: string;
}

export interface UserEcosystem {
  id: string;
  title: string;
  role: string;
  headline: string;
  description: string;
  features: string[];
  badge: string;
  metrics: { label: string; value: string }[];
}

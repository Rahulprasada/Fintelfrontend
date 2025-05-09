// ESG Score Types
export type ESGScoreLevel = 'Excellent' | 'Good' | 'Caution' | 'Risky';
export type GreenwashingRisk = 'Low' | 'Medium' | 'High';

// ESG Pillar Data
export interface ESGPillarScore {
  name: 'Environmental' | 'Social' | 'Governance';
  score: number;
  change: number;
  issues: string[];
}

// ESG Company Score
export interface ESGCompanyScore {
  companyId: string;
  companyName: string;
  ticker: string;
  sector: string;
  industry: string;
  overallScore: number;
  previousScore: number;
  change: number;
  scoreLevel: ESGScoreLevel;
  pillars: ESGPillarScore[];
  lastUpdated: string;
}

// ESG Controversy
export interface ESGControversy {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  description: string;
  type: 'Environmental' | 'Social' | 'Governance';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  date: string;
  source: string;
  url?: string;
  impact: number; // Score impact
}

// ESG Risk
export interface ESGRisk {
  id: string;
  companyId: string;
  name: string;
  category: 'Environmental' | 'Social' | 'Governance'; 
  description: string;
  exposureLevel: 'Low' | 'Medium' | 'High';
  mitigation?: string;
  trend: 'Improving' | 'Stable' | 'Worsening';
}

// Greenwashing Flag
export interface GreenwashingFlag {
  id: string;
  companyId: string;
  title: string;
  description: string;
  claimText: string;
  conflictingEvidence: string;
  source: string;
  dateDetected: string;
  severity: 'Low' | 'Medium' | 'High';
  resolved: boolean;
  analystNotes?: string;
}

// ESG Data Source
export interface ESGDataSource {
  id: string;
  name: string;
  type: 'Regulatory' | 'News' | 'Database' | 'NGO' | 'Research';
  description: string;
  logo?: string;
  url?: string;
}

// ESG Trend Data Point
export interface ESGTrendPoint {
  date: string;
  score: number;
}

// ESG Alert Config
export interface ESGAlertConfig {
  id: string;
  userId: string;
  name: string;
  type: 'ScoreDrop' | 'Controversy' | 'RiskChange' | 'GreenwashingFlag';
  threshold?: number;
  targetCompanies: string[] | 'all';
  targetSectors?: string[];
  active: boolean;
  emailNotification: boolean;
  appNotification: boolean;
}

// ESG Alert
export interface ESGAlert {
  id: string;
  alertConfigId: string;
  companyId: string;
  companyName: string;
  eventType: 'ScoreDrop' | 'Controversy' | 'RiskChange' | 'GreenwashingFlag';
  title: string;
  description: string;
  date: string;
  viewed: boolean;
}

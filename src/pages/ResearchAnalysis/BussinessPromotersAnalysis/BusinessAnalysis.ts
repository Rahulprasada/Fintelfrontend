export type MOATType = 'Cost' | 'Network' | 'Brand' | 'Scale' | 'Switching' | 'Process' | 'Regulatory' | 'Content' | 'Other';

export interface MOATAnalysis {
  id: string;
  type: MOATType;
  description: string;
  strength: 'Low' | 'Medium' | 'High';
  lastUpdated: Date;
}

export interface SWOTItem {
  id: string;
  text: string;
  lastUpdated: Date;
}

export interface SWOT {
  strengths: SWOTItem[];
  weaknesses: SWOTItem[];
  opportunities: SWOTItem[];
  threats: SWOTItem[];
}

export interface BusinessModelItem {
  id: string;
  category: string;
  description: string;
  percentage?: number; // For revenue sources
}

export interface BusinessModel {
  narrative: string;
  revenueSources: BusinessModelItem[];
  valueChain: BusinessModelItem[];
}

export interface PromoterHolding {
  quarter: string;
  date: Date;
  percentage: number;
}

export interface InsiderTransaction {
  id: string;
  personName: string;
  role: string;
  transactionType: 'Buy' | 'Sell';
  quantity: number;
  price: number;
  date: Date;
}

export interface PledgingData {
  quarter: string;
  date: Date;
  percentage: number;
}

export interface RedFlag {
  id: string;
  category: 'Promoter' | 'Governance' | 'Insider' | 'Other';
  severity: 'Low' | 'Medium' | 'High';
  description: string;
  source: string;
  date: Date;
  acknowledged: boolean;
  analystNote?: string;
}

export interface Remuneration {
  personName: string;
  role: string;
  year: string;
  amount: number;
  percentageChange: number;
  profitPercentage?: number;
}

export interface BoardMember {
  id: string;
  name: string;
  role: string;
  isIndependent: boolean;
  isPromoter: boolean;
  since: Date;
  expertise: string[];
}

export interface RelatedPartyTransaction {
  id: string;
  entity: string;
  relationship: string;
  amount: number;
  description: string;
  date: Date;
  isRecurring: boolean;
}

export interface GovernanceScore {
  overall: number; // 0-100
  boardIndependence: number; // 0-100
  auditQuality: number; // 0-100
  disclosureQuality: number; // 0-100
  relatedPartyTransactions: number; // 0-100
  shareholderRights: number; // 0-100
}

export interface AnalystComment {
  id: string;
  section: 'MOAT' | 'SWOT' | 'BusinessModel' | 'Promoter' | 'Governance' | 'RedFlag' | 'General';
  text: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface BusinessAnalysisVersion {
  id: string;
  name: string;
  timestamp: Date;
  createdBy: string;
  tags: string[];
  isPublic: boolean;
}

export interface PeerComparison {
  companyId: string;
  companyName: string;
  governanceScore: number;
  promoterPledging: number;
  boardIndependence: number;
  redFlagsCount: number;
}

export interface BusinessAnalysis {
  id: string;
  companyId: string;
  companyName: string;
  sector: string;
  createdAt: Date;
  updatedAt: Date;
  moat: MOATAnalysis[];
  swot: SWOT;
  businessModel: BusinessModel;
  promoterHolding: PromoterHolding[];
  insiderTransactions: InsiderTransaction[];
  pledgingData: PledgingData[];
  redFlags: RedFlag[];
  remuneration: Remuneration[];
  boardMembers: BoardMember[];
  relatedPartyTransactions: RelatedPartyTransaction[];
  governanceScore: GovernanceScore;
  analystComments: AnalystComment[];
  versions: BusinessAnalysisVersion[];
  peerComparisons: PeerComparison[];
  linkedReportIds: string[];
}

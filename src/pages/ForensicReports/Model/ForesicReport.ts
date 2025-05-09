export interface LeadershipProfile {
    id: string;
    name: string;
    role: string;
    riskScore: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    background: string;
    redFlags: RedFlagEvent[];
    directorships: Directorship[];
    insiderActivities: InsiderActivity[];
  }
  
  export interface RedFlagEvent {
    id: string;
    date: string;
    type: string;
    description: string;
    impact: string;
    severity: 'Low' | 'Medium' | 'High';
  }
  
  export interface Directorship {
    id: string;
    companyName: string;
    role: string;
    startDate: string;
    endDate?: string;
    isActive: boolean;
  }
  
  export interface InsiderActivity {
    id: string;
    date: string;
    type: 'Buy' | 'Sell' | 'Pledge' | 'Release' | 'RPT';
    quantity: number;
    value: number;
    details: string;
  }
  
  export interface InsiderTradeLog {
    id: string;
    insiderName: string;
    designation: string;
    type: 'Buy' | 'Sell';
    quantity: number;
    value: number;
    date: string;
    pricePerShare: number;
  }
  
  export interface PledgeData {
    date: string;
    pledgedPercentage: number;
    totalHolding: number;
  }
  
  export interface RelatedPartyTransaction {
    id: string;
    date: string;
    counterparty: string;
    relationship: string;
    nature: string;
    value: number;
    approvalStatus: string;
  }
  
  export interface GovernanceScore {
    id: string;
    companyId: string;
    overallScore: number;
    leadershipScore: number;
    insiderTradingScore: number;
    pledgingScore: number;
    rptScore: number;
    accountingScore: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    history: GovernanceScoreHistory[];
  }
  
  export interface GovernanceScoreHistory {
    date: string;
    score: number;
  }
  
  export interface ForensicCompany {
    id: string;
    name: string;
    ticker: string;
    sector: string;
    governanceScore: number;
    riskLevel: 'Low' | 'Medium' | 'High';
  }
  
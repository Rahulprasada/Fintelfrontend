export interface MacroIndicator {
    name: string;
    value: number;
    change: number;
    unit: string;
    trend: 'up' | 'down' | 'flat';
    color: string;
    backgroundColor: string;
  }
  
  export interface SectorPerformance {
    sector: string;
    performance: number;
    change: number;
    trend: 'up' | 'down' | 'flat';
    recommendation: 'overweight' | 'underweight' | 'neutral';
    color: string;
  }
  
  export interface TrendData {
    date: string;
    value: number;
  }
  
  export interface TrendIndicator {
    name: string;
    data: TrendData[];
    color: string;
  }
  
  export interface CurrencyData {
    currency: string;
    value: number;
    change: number;
    trend: 'up' | 'down' | 'flat';
  }
  
  export interface BusinessCyclePhase {
    name: 'Early Expansion' | 'Late Expansion' | 'Early Contraction' | 'Late Contraction';
    description: string;
    color: string;
    startDate: string;
    expectedEndDate?: string;
    indicators: {
      name: string;
      value: number;
      trend: 'up' | 'down' | 'flat';
    }[];
    recommendedSectors: string[];
    recommendedAssetClasses: string[];
    recommendedFactors: string[];
  }
  
  export interface CycleHistoryEvent {
    phase: string;
    startDate: string;
    endDate: string;
    description: string;
    marketPerformance: number;
    color: string;
  }
  
  export interface FlowData {
    date: string;
    fii: number;
    dii: number;
    mf: number;
  }
  
  export interface SectorFlowData {
    sector: string;
    fiiFlow: number;
    diiFlow: number;
    netFlow: number;
    percentChange: number;
    trend: 'up' | 'down' | 'flat';
  }
  
  export interface StockFlowData {
    symbol: string;
    name: string;
    fiiFlow: number;
    diiFlow: number;
    netFlow: number;
    percentChange: number;
    trend: 'up' | 'down' | 'flat';
  }
  
  export interface HeatmapData {
    sector: string;
    stocks: {
      symbol: string;
      name: string;
      flowIntensity: number; // -10 to 10
    }[];
  }
  
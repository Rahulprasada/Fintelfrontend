export type TimeFrame = 'intraday' | 'daily' | 'weekly' | 'monthly';
export type SignalSource = 'ml' | 'rule-based';
export type SignalAction = 'BUY' | 'SELL' | 'SHORT' | 'HOLD';
export type TechnicalIndicator = 'RSI' | 'MACD' | 'SMA' | 'EMA' | 'Bollinger' | 'ATR' | 'VWAP';
export type MLModel = 'trend-classification' | 'reversal-prediction' | 'support-resistance' | 'volume-profile';
export type PositionSizingMethod = 'Kelly' | 'Fixed' | 'Volatility' | 'Equal' | 'Manual';
export type ExecutionMode = 'Manual' | 'Semi-Auto' | 'Full-Auto';
export type OrderType = 'Market' | 'Limit' | 'Stop-Loss' | 'SL-M';
export type OrderStatus = 'Placed' | 'Pending' | 'Filled' | 'Failed' | 'Cancelled';
export type BrokerProvider = 'Zerodha' | 'IIFL' | 'Dhan' | 'Interactive Brokers' | 'Upstox';

export interface SignalRule {
  id: string;
  indicator: TechnicalIndicator;
  comparator: '<' | '>' | '=' | '<=' | '>=';
  value: number | string;
  conjunction?: 'AND' | 'OR';
}

export interface Signal {
  id: string;
  timestamp: Date;
  symbol: string;
  action: SignalAction;
  price: number;
  confidence?: number; // ML confidence score, if applicable
  rules?: SignalRule[];
}

export interface SignalStrategy {
  id: string;
  name: string;
  description: string;
  source: SignalSource;
  timeFrame: TimeFrame;
  indicators: TechnicalIndicator[];
  mlModel?: MLModel;
  rules: SignalRule[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SizingRule {
  id: string;
  type: 'max-per-trade' | 'max-per-sector' | 'max-drawdown' | 'min-trade';
  value: number; // Percentage or absolute value
}

export interface PositionSizing {
  id: string;
  name: string;
  method: PositionSizingMethod;
  initialCapital: number;
  rules: SizingRule[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SizedPosition {
  signalId: string;
  symbol: string;
  action: SignalAction;
  amount: number;
  percentage: number;
  shares?: number;
}

export interface BacktestSettings {
  id: string;
  name: string;
  signalStrategyId: string;
  positionSizingId: string;
  startDate: Date;
  endDate: Date;
  assetUniverse: string[]; // List of symbols
  optimizationParameters?: {
    parameter: string;
    min: number;
    max: number;
    step: number;
  }[];
}

export interface BacktestResults {
  id: string;
  settingsId: string;
  metrics: {
    cagr: number;
    sharpe: number;
    sortino: number;
    maxDrawdown: number;
    winRate: number;
    averageGain: number;
    averageLoss: number;
  };
  equityCurve: { date: Date; value: number }[];
  drawdownCurve: { date: Date; value: number }[];
  trades: BacktestTrade[];
  optimizationResults?: {
    parameter: string;
    value: number;
    sharpe: number;
    cagr: number;
  }[];
}

export interface BacktestTrade {
  id: string;
  entryDate: Date;
  entryPrice: number;
  exitDate?: Date;
  exitPrice?: number;
  symbol: string;
  action: SignalAction;
  quantity: number;
  pnl?: number;
  returnPercentage?: number;
}

export interface ExecutionSettings {
  id: string;
  name: string;
  strategyId: string;
  positionSizingId: string;
  mode: ExecutionMode;
  broker: BrokerProvider;
  orderType: OrderType;
  isPaperTrading: boolean;
  maxRetries: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExecutionOrder {
  id: string;
  symbol: string;
  quantity: number;
  price: number;
  type: OrderType;
  action: 'BUY' | 'SELL';
  status: OrderStatus;
  brokerOrderId?: string;
  timestamp: Date;
  fills?: {
    price: number;
    quantity: number;
    timestamp: Date;
  }[];
  remarks?: string;
}

export interface ExecutionLog {
  id: string;
  timestamp: Date;
  executionSettingsId: string;
  type: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
  message: string;
  details?: any;
}

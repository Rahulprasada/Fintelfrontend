import {
  MacroIndicator,
  SectorPerformance,
  TrendIndicator,
  CurrencyData,
  BusinessCyclePhase,
  CycleHistoryEvent,
  FlowData,
  SectorFlowData,
  StockFlowData,
  HeatmapData,
} from "./MarcoIntelligence";

// Macro Dashboard Data
export const macroIndicators: MacroIndicator[] = [
    {
      name: "GDP Growth (YoY)",
      value: 6.8,
      change: 0.3,
      unit: "%",
      trend: "up",
      color: "#10B981",
      backgroundColor: "linear-gradient(to right, #d4ffe6, #ffffff)",
    },
    {
      name: "Inflation (CPI)",
      value: 5.2,
      change: -0.1,
      unit: "%",
      trend: "down",
      color: "#F97316",
      backgroundColor: "linear-gradient(to right, #faf0f0, #ffffff)",
    },
    {
      name: "Repo Rate",
      value: 6.5,
      change: 0,
      unit: "%",
      trend: "flat",
      color: "#6366F1",
      backgroundColor: "linear-gradient(to right, #d4ecfc, #ffffff)",
    },
    {
      name: "Unemployment",
      value: 7.2,
      change: 0.2,
      unit: "%",
      trend: "up",
      color: "#EF4444",
      backgroundColor: "linear-gradient(to right, #fff8f0, #ffffff)",
    },
    {
      name: "10Y Yield",
      value: 7.12,
      change: -0.05,
      unit: "%",
      trend: "down",
      color: "#8B5CF6",
      backgroundColor: "linear-gradient(to right, #d4ecfc, #ffffff)",
    },
    {
      name: "IIP Growth",
      value: 4.2,
      change: 1.1,
      unit: "%",
      trend: "up",
      color: "#10B981",
      backgroundColor: "linear-gradient(to right, #d4ffe6, #ffffff)",
    },
  ];
  

export const sectorPerformance: SectorPerformance[] = [
  {
    sector: "Financial Services",
    performance: 12.4,
    change: 2.3,
    trend: "up",
    recommendation: "overweight",
    color: "#10B981",
  },
  {
    sector: "IT",
    performance: -3.2,
    change: -1.5,
    trend: "down",
    recommendation: "underweight",
    color: "#EF4444",
  },
  {
    sector: "FMCG",
    performance: 5.7,
    change: 0.8,
    trend: "up",
    recommendation: "neutral",
    color: "#F59E0B",
  },
  {
    sector: "Auto",
    performance: 8.9,
    change: 3.2,
    trend: "up",
    recommendation: "overweight",
    color: "#10B981",
  },
  {
    sector: "Pharma",
    performance: -1.3,
    change: -2.1,
    trend: "down",
    recommendation: "neutral",
    color: "#F59E0B",
  },
  {
    sector: "Metal",
    performance: 15.3,
    change: 4.3,
    trend: "up",
    recommendation: "overweight",
    color: "#10B981",
  },
  {
    sector: "Oil & Gas",
    performance: 2.1,
    change: 0.5,
    trend: "flat",
    recommendation: "neutral",
    color: "#F59E0B",
  },
  {
    sector: "Realty",
    performance: -5.8,
    change: -3.2,
    trend: "down",
    recommendation: "underweight",
    color: "#EF4444",
  },
];

export const gdpTrendData: TrendIndicator = {
  name: "GDP Growth (YoY)",
  color: "#10B981",
  data: [
    { date: "2022-Q1", value: 4.1 },
    { date: "2022-Q2", value: 4.5 },
    { date: "2022-Q3", value: 5.2 },
    { date: "2022-Q4", value: 5.8 },
    { date: "2023-Q1", value: 6.1 },
    { date: "2023-Q2", value: 6.5 },
    { date: "2023-Q3", value: 6.8 },
    { date: "2023-Q4", value: 7.0 },
  ],
};

export const inflationTrendData: TrendIndicator = {
  name: "Inflation (CPI)",
  color: "#F97316",
  data: [
    { date: "2022-01", value: 6.3 },
    { date: "2022-03", value: 6.5 },
    { date: "2022-05", value: 6.8 },
    { date: "2022-07", value: 7.0 },
    { date: "2022-09", value: 6.7 },
    { date: "2022-11", value: 6.2 },
    { date: "2023-01", value: 5.8 },
    { date: "2023-03", value: 5.6 },
    { date: "2023-05", value: 5.4 },
    { date: "2023-07", value: 5.3 },
    { date: "2023-09", value: 5.2 },
  ],
};

export const yieldCurveTrendData: TrendIndicator = {
  name: "10Y-2Y Yield Spread",
  color: "#8B5CF6",
  data: [
    { date: "2022-01", value: 1.5 },
    { date: "2022-03", value: 1.3 },
    { date: "2022-05", value: 1.1 },
    { date: "2022-07", value: 0.8 },
    { date: "2022-09", value: 0.5 },
    { date: "2022-11", value: 0.2 },
    { date: "2023-01", value: -0.1 },
    { date: "2023-03", value: -0.3 },
    { date: "2023-05", value: -0.2 },
    { date: "2023-07", value: -0.1 },
    { date: "2023-09", value: 0.1 },
  ],
};

export const currencyData: CurrencyData[] = [
  { currency: "USD/INR", value: 83.12, change: 0.15, trend: "up" },
  { currency: "EUR/INR", value: 89.45, change: -0.22, trend: "down" },
  { currency: "GBP/INR", value: 104.87, change: 0.31, trend: "up" },
  { currency: "JPY/INR", value: 0.57, change: -0.01, trend: "down" },
  { currency: "CNY/INR", value: 11.42, change: 0.08, trend: "up" },
];

// Business Cycle Data
export const currentCyclePhase: BusinessCyclePhase = {
  name: "Late Expansion",
  description:
    "Economy growing but showing signs of slowing. Inflation rising with central banks tightening policy.",
  color: "#F59E0B",
  startDate: "2023-03-01",
  indicators: [
    { name: "GDP Growth", value: 6.8, trend: "flat" },
    { name: "Inflation", value: 5.2, trend: "up" },
    { name: "Unemployment", value: 7.2, trend: "down" },
    { name: "Capacity Utilization", value: 82, trend: "up" },
    { name: "PMI", value: 53.4, trend: "down" },
  ],
  recommendedSectors: ["Energy", "Materials", "Industrials", "Financials"],
  recommendedAssetClasses: [
    "Commodities",
    "Cyclical Equities",
    "High Yield Bonds",
  ],
  recommendedFactors: ["Value", "Dividend Yield", "Quality"],
};

export const cycleHistory: CycleHistoryEvent[] = [
  {
    phase: "Early Contraction",
    startDate: "2020-03-01",
    endDate: "2020-08-31",
    description: "COVID-19 induced economic shutdown",
    marketPerformance: -28.5,
    color: "#EF4444",
  },
  {
    phase: "Late Contraction",
    startDate: "2020-09-01",
    endDate: "2021-01-31",
    description: "Recovery beginning with vaccine development",
    marketPerformance: 15.2,
    color: "#F97316",
  },
  {
    phase: "Early Expansion",
    startDate: "2021-02-01",
    endDate: "2023-02-28",
    description: "Rapid post-COVID recovery with stimulus",
    marketPerformance: 42.8,
    color: "#10B981",
  },
  {
    phase: "Late Expansion",
    startDate: "2023-03-01",
    endDate: "Present",
    description: "Growth moderating with inflationary pressures",
    marketPerformance: 8.4,
    color: "#F59E0B",
  },
];

// FII & Smart Money Tracker Data
export const flowTimelineData: FlowData[] = [
  { date: "2023-09-01", fii: -1250, dii: 950, mf: 780 },
  { date: "2023-09-08", fii: -820, dii: 1120, mf: 650 },
  { date: "2023-09-15", fii: -450, dii: 670, mf: 520 },
  { date: "2023-09-22", fii: 320, dii: 480, mf: 610 },
  { date: "2023-09-29", fii: 750, dii: 290, mf: 580 },
  { date: "2023-10-06", fii: 1200, dii: -350, mf: 420 },
  { date: "2023-10-13", fii: 1650, dii: -580, mf: 390 },
  { date: "2023-10-20", fii: 980, dii: 120, mf: 450 },
  { date: "2023-10-27", fii: 720, dii: 320, mf: 510 },
];

export const sectorFlowData: SectorFlowData[] = [
  {
    sector: "Financial Services",
    fiiFlow: 2450,
    diiFlow: 1850,
    netFlow: 4300,
    percentChange: 3.2,
    trend: "up",
  },
  {
    sector: "IT",
    fiiFlow: -1280,
    diiFlow: -750,
    netFlow: -2030,
    percentChange: -2.1,
    trend: "down",
  },
  {
    sector: "FMCG",
    fiiFlow: 780,
    diiFlow: 950,
    netFlow: 1730,
    percentChange: 1.5,
    trend: "up",
  },
  {
    sector: "Auto",
    fiiFlow: 1650,
    diiFlow: 1240,
    netFlow: 2890,
    percentChange: 2.8,
    trend: "up",
  },
  {
    sector: "Pharma",
    fiiFlow: -850,
    diiFlow: 320,
    netFlow: -530,
    percentChange: -0.7,
    trend: "down",
  },
  {
    sector: "Metal",
    fiiFlow: 1950,
    diiFlow: 1120,
    netFlow: 3070,
    percentChange: 4.2,
    trend: "up",
  },
  {
    sector: "Oil & Gas",
    fiiFlow: 650,
    diiFlow: -320,
    netFlow: 330,
    percentChange: 0.5,
    trend: "flat",
  },
  {
    sector: "Realty",
    fiiFlow: -720,
    diiFlow: -530,
    netFlow: -1250,
    percentChange: -3.1,
    trend: "down",
  },
];

export const stockFlowData: StockFlowData[] = [
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank",
    fiiFlow: 850,
    diiFlow: 620,
    netFlow: 1470,
    percentChange: 3.2,
    trend: "up",
  },
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    fiiFlow: 720,
    diiFlow: 540,
    netFlow: 1260,
    percentChange: 2.8,
    trend: "up",
  },
  {
    symbol: "INFY",
    name: "Infosys",
    fiiFlow: -450,
    diiFlow: -320,
    netFlow: -770,
    percentChange: -2.1,
    trend: "down",
  },
  {
    symbol: "TCS",
    name: "TCS",
    fiiFlow: -520,
    diiFlow: -280,
    netFlow: -800,
    percentChange: -2.3,
    trend: "down",
  },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank",
    fiiFlow: 620,
    diiFlow: 480,
    netFlow: 1100,
    percentChange: 2.5,
    trend: "up",
  },
  {
    symbol: "SBIN",
    name: "State Bank of India",
    fiiFlow: 580,
    diiFlow: 420,
    netFlow: 1000,
    percentChange: 2.2,
    trend: "up",
  },
  {
    symbol: "HINDUNILVR",
    name: "Hindustan Unilever",
    fiiFlow: 320,
    diiFlow: 280,
    netFlow: 600,
    percentChange: 1.3,
    trend: "up",
  },
  {
    symbol: "MARUTI",
    name: "Maruti Suzuki",
    fiiFlow: 480,
    diiFlow: 350,
    netFlow: 830,
    percentChange: 1.8,
    trend: "up",
  },
  {
    symbol: "SUNPHARMA",
    name: "Sun Pharma",
    fiiFlow: -280,
    diiFlow: 150,
    netFlow: -130,
    percentChange: -0.4,
    trend: "down",
  },
  {
    symbol: "TATASTEEL",
    name: "Tata Steel",
    fiiFlow: 520,
    diiFlow: 380,
    netFlow: 900,
    percentChange: 3.9,
    trend: "up",
  },
];

export const heatmapData: HeatmapData[] = [
  {
    sector: "Financial Services",
    stocks: [
      { symbol: "HDFCBANK", name: "HDFC Bank", flowIntensity: 7.5 },
      { symbol: "ICICIBANK", name: "ICICI Bank", flowIntensity: 6.2 },
      { symbol: "SBIN", name: "State Bank of India", flowIntensity: 5.8 },
      { symbol: "AXISBANK", name: "Axis Bank", flowIntensity: 4.3 },
      { symbol: "KOTAKBANK", name: "Kotak Bank", flowIntensity: 3.1 },
    ],
  },
  {
    sector: "IT",
    stocks: [
      { symbol: "INFY", name: "Infosys", flowIntensity: -6.8 },
      { symbol: "TCS", name: "TCS", flowIntensity: -7.2 },
      { symbol: "WIPRO", name: "Wipro", flowIntensity: -5.4 },
      { symbol: "TECHM", name: "Tech Mahindra", flowIntensity: -4.9 },
      { symbol: "HCLTECH", name: "HCL Technologies", flowIntensity: -3.8 },
    ],
  },
  {
    sector: "Auto",
    stocks: [
      { symbol: "MARUTI", name: "Maruti Suzuki", flowIntensity: 6.5 },
      { symbol: "TATAMOTORS", name: "Tata Motors", flowIntensity: 5.8 },
      { symbol: "M&M", name: "Mahindra & Mahindra", flowIntensity: 4.7 },
      { symbol: "BAJAJ-AUTO", name: "Bajaj Auto", flowIntensity: 3.6 },
      { symbol: "HEROMOTOCO", name: "Hero MotoCorp", flowIntensity: 2.9 },
    ],
  },
  {
    sector: "Metal",
    stocks: [
      { symbol: "TATASTEEL", name: "Tata Steel", flowIntensity: 8.2 },
      { symbol: "HINDALCO", name: "Hindalco", flowIntensity: 7.6 },
      { symbol: "JSWSTEEL", name: "JSW Steel", flowIntensity: 6.9 },
      { symbol: "VEDL", name: "Vedanta", flowIntensity: 5.4 },
      { symbol: "COALINDIA", name: "Coal India", flowIntensity: 4.8 },
    ],
  },
];

export const macroNews = [
  {
    title: "RBI holds repo rate at 6.5%, maintains stance",
    date: "2023-10-05",
    source: "Economic Times",
  },
  {
    title: "India's GDP growth projected at 7% for FY 2023-24",
    date: "2023-09-28",
    source: "Business Standard",
  },
  {
    title: "Inflation eases to 5.2% in September",
    date: "2023-10-12",
    source: "Mint",
  },
  {
    title: "USD/INR hits new all-time high of 83.40",
    date: "2023-10-19",
    source: "Financial Express",
  },
  {
    title: "Manufacturing PMI rises to 56.2 in September",
    date: "2023-10-02",
    source: "Business Today",
  },
];

export const countryOptions = [
  "India",
  "US",
  "China",
  "Japan",
  "Eurozone",
  "UK",
  "Brazil",
];
export const timeframeOptions = [
  "1M",
  "3M",
  "6M",
  "YTD",
  "1Y",
  "3Y",
  "5Y",
  "MAX",
];
export const exportOptions = ["PDF", "Excel", "CSV", "PNG"];

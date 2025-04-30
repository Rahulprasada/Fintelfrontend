export type ModelType = "dcf-2stage" | "dcf-3stage" | "pe-multiple" | "ev-ebitda" | "comparables" | "custom";

export interface ValuationModel {
  id: string;
  name: string;
  type: ModelType;
  company: string;
  sector: string;
  analyst: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isDraft: boolean;
  // These will be populated later based on the model type
  assumptions?: Record<string, any>;
  calculations?: Record<string, any>;
  results?: {
    targetPrice?: number;
    upside?: number;
    valuationRange?: {
      low: number;
      high: number;
    };
  };
  // New fields for version tracking
  versionHistory?: ModelVersion[];
  currentVersion?: string;
}

export interface ModelVersion {
  id: string;
  label: string;
  createdAt: Date;
  author: string;
  notes?: string;
  assumptions: Record<string, any>;
  results?: {
    targetPrice?: number;
    upside?: number;
    valuationRange?: {
      low: number;
      high: number;
    };
  };
}

export interface ModelTemplate {
  id: ModelType;
  name: string;
  description: string;
  icon: string;
  defaultAssumptions?: Record<string, any>;
}

export const MODEL_TEMPLATES: ModelTemplate[] = [
  {
    id: "dcf-2stage",
    name: "DCF (2-Stage)",
    description: "Discounted Cash Flow model with 2 stages of growth",
    icon: "chart-bar",
    defaultAssumptions: {
      wacc: 10,
      terminalGrowthRate: 3,
      forecastPeriod: 5,
      revenueGrowthRate: 15,
      ebitMargin: 20,
      taxRate: 25,
      capexPercent: 10,
    }
  },
  {
    id: "dcf-3stage",
    name: "DCF (3-Stage)",
    description: "Discounted Cash Flow model with 3 stages of growth",
    icon: "chart-bar",
    defaultAssumptions: {
      wacc: 10,
      terminalGrowthRate: 3,
      forecastPeriod1: 3,
      forecastPeriod2: 5,
      growthRate1: 20,
      growthRate2: 10,
      ebitMargin: 20,
      taxRate: 25,
      capexPercent: 10,
    }
  },
  {
    id: "pe-multiple",
    name: "P/E Multiple",
    description: "Price-to-Earnings multiple valuation",
    icon: "chart-pie",
    defaultAssumptions: {
      peRatio: 15,
      earningsGrowthRate: 10,
      forecastPeriod: 3,
    }
  },
  {
    id: "ev-ebitda",
    name: "EV/EBITDA",
    description: "Enterprise Value to EBITDA multiple valuation",
    icon: "chart-pie",
    defaultAssumptions: {
      evEbitdaRatio: 8,
      ebitdaGrowthRate: 8,
      netDebt: 0,
      forecastPeriod: 3,
    }
  },
  {
    id: "comparables",
    name: "Comparables",
    description: "Valuation based on comparable companies",
    icon: "users",
    defaultAssumptions: {
      peerCompanies: [],
      metrics: ["pe", "ev_ebitda", "ev_sales", "pb"],
      weightings: {
        pe: 0.3,
        ev_ebitda: 0.3,
        ev_sales: 0.2,
        pb: 0.2
      }
    }
  },
  {
    id: "custom",
    name: "Custom",
    description: "Build a custom valuation model from scratch",
    icon: "file-text",
    defaultAssumptions: {}
  }
];

// Export model format options
export const EXPORT_FORMATS = ["pdf", "excel", "link"] as const;
export type ExportFormat = typeof EXPORT_FORMATS[number];

// Sensitivity analysis parameters
export interface SensitivityParameter {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValues: number[];
}

export const SENSITIVITY_PARAMETERS: Record<string, SensitivityParameter> = {
  wacc: {
    key: "wacc",
    label: "WACC (%)",
    min: 5,
    max: 15,
    step: 1,
    defaultValues: [8, 9, 10]
  },
  terminalGrowthRate: {
    key: "terminalGrowthRate",
    label: "Terminal Growth (%)",
    min: 2,
    max: 8,
    step: 1,
    defaultValues: [4, 5, 6]
  },
  revenueGrowthRate: {
    key: "revenueGrowthRate",
    label: "Revenue CAGR (%)",
    min: 0,
    max: 30,
    step: 5,
    defaultValues: [10, 15, 20]
  },
  ebitMargin: {
    key: "ebitMargin",
    label: "EBIT Margin (%)",
    min: 10,
    max: 40,
    step: 5,
    defaultValues: [20, 25, 30]
  }
};
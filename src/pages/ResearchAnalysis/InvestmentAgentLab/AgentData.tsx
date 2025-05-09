import { Agent } from "./Agent";


export const agentData: Agent[] = [
  {
    id: "buffett",
    name: "Warren Buffett",
    style: "Value & Moat-based",
    description: "Looks for consistent compounders with economic moats, strong ROE, low debt",
    avatar: "/placeholder.svg",
    bio: "The Oracle of Omaha and one of the world's most successful investors, known for his value-based approach and long-term thinking.",
    rules: [
      "ROE > 15%",
      "Debt/Equity < 0.5",
      "P/B < 3",
      "Durable competitive advantage"
    ],
    holdingPeriod: "5+ years",
    strengths: ["Compounding", "Safety", "Margin of safety"],
    weaknesses: ["Misses hyper-growth", "Tech-averse"],
    historicalAlpha: "+11.2% CAGR since 2010",
    filters: {
      "ROE": "> 15%",
      "Debt/Equity": "< 0.5",
      "P/B": "< 3",
      "P/E": "< 25"
    }
  },
  {
    id: "ackman",
    name: "Bill Ackman",
    style: "Activist Growth",
    description: "Focuses on undervalued growth plays with catalysts (turnarounds, spin-offs)",
    avatar: "/placeholder.svg",
    bio: "Founder of Pershing Square Capital Management, known for concentrated positions and activist campaigns to unlock shareholder value.",
    rules: [
      "Strong cash flow",
      "High barriers to entry", 
      "Simple business model",
      "Catalyst for value unlock"
    ],
    holdingPeriod: "3-5 years",
    strengths: ["Concentrated positions", "Activist approach"],
    weaknesses: ["Higher volatility", "Public battles"],
    historicalAlpha: "+9.8% CAGR since 2010",
    filters: {
      "Cash Flow Yield": "> 6%",
      "ROIC": "> 12%",
      "Market Share": "Top 3 in industry",
      "EV/EBITDA": "< 12x"
    }
  },
  {
    id: "munger",
    name: "Charlie Munger",
    style: "Quality + Simplicity",
    description: "Avoids complexity, loves mental models, focuses on rational business behavior",
    avatar: "/placeholder.svg",
    bio: "Warren Buffett's partner and former Vice-Chairman of Berkshire Hathaway, known for rational thinking and multidisciplinary approach.",
    rules: [
      "High quality business",
      "Management with integrity",
      "Simple to understand",
      "Sustainable advantage"
    ],
    holdingPeriod: "10+ years",
    strengths: ["Quality focus", "Avoiding mistakes"],
    weaknesses: ["Very conservative", "Limited tech exposure"],
    historicalAlpha: "+10.5% CAGR since 2010",
    filters: {
      "ROCE": "> 18%",
      "Profit Margin": "> 15%",
      "Debt/EBITDA": "< 2x",
      "Growth Rate": "> 8%"
    }
  },
  {
    id: "fisher",
    name: "Phil Fisher",
    style: "Scuttlebutt & Growth",
    description: "Invests in innovative, scalable businesses with high R&D and visionary leadership",
    avatar: "/placeholder.svg",
    bio: "Pioneer of the 'scuttlebutt' research method and growth investing, focusing on innovative companies with exceptional management.",
    rules: [
      "Industry leadership",
      "Innovative R&D",
      "Superior management",
      "Sales organization"
    ],
    holdingPeriod: "5+ years",
    strengths: ["Growth identification", "Long-term thinking"],
    weaknesses: ["Valuation discipline", "Vulnerable to bubbles"],
    historicalAlpha: "+12.3% CAGR since 2010",
    filters: {
      "Revenue Growth": "> 15%",
      "R&D/Revenue": "> 7%",
      "Gross Margin": "> 40%",
      "Market Position": "Top 2 in segment"
    }
  },
  {
    id: "druckenmiller",
    name: "Stan Druckenmiller",
    style: "Macro-Growth Rotation",
    description: "Follows cycles, interest rates, capital flows; strong on tactical rotation",
    avatar: "/placeholder.svg",
    bio: "Legendary macro investor who managed George Soros' Quantum Fund and founder of Duquesne Capital, known for big macro calls.",
    rules: [
      "Follow liquidity trends",
      "Focus on regime shifts",
      "Concentrate when conviction is high",
      "Cut losses quickly"
    ],
    holdingPeriod: "6 months - 2 years",
    strengths: ["Macro understanding", "Timing", "Flexibility"],
    weaknesses: ["Higher turnover", "Less predictable"],
    historicalAlpha: "+14.5% CAGR since 2010",
    filters: {
      "Relative Strength": "Top quartile",
      "Earnings Surprise": "Positive last 2 qtrs",
      "Beta": "0.8-1.5",
      "Volume Growth": "Increasing"
    }
  },
  {
    id: "buffetter",
    name: "Warren Buffett",
    style: "Value & Moat-based",
    description: "Looks for consistent compounders with economic moats, strong ROE, low debt",
    avatar: "/placeholder.svg",
    bio: "The Oracle of Omaha and one of the world's most successful investors, known for his value-based approach and long-term thinking.",
    rules: [
      "ROE > 15%",
      "Debt/Equity < 0.5",
      "P/B < 3",
      "Durable competitive advantage"
    ],
    holdingPeriod: "5+ years",
    strengths: ["Compounding", "Safety", "Margin of safety"],
    weaknesses: ["Misses hyper-growth", "Tech-averse"],
    historicalAlpha: "+11.2% CAGR since 2010",
    filters: {
      "ROE": "> 15%",
      "Debt/Equity": "< 0.5",
      "P/B": "< 3",
      "P/E": "< 25"
    }
  },
  {
    id: "ackmaner",
    name: "Bill Ackman",
    style: "Activist Growth",
    description: "Focuses on undervalued growth plays with catalysts (turnarounds, spin-offs)",
    avatar: "/placeholder.svg",
    bio: "Founder of Pershing Square Capital Management, known for concentrated positions and activist campaigns to unlock shareholder value.",
    rules: [
      "Strong cash flow",
      "High barriers to entry", 
      "Simple business model",
      "Catalyst for value unlock"
    ],
    holdingPeriod: "3-5 years",
    strengths: ["Concentrated positions", "Activist approach"],
    weaknesses: ["Higher volatility", "Public battles"],
    historicalAlpha: "+9.8% CAGR since 2010",
    filters: {
      "Cash Flow Yield": "> 6%",
      "ROIC": "> 12%",
      "Market Share": "Top 3 in industry",
      "EV/EBITDA": "< 12x"
    }
  },
  {
    id: "mungerer",
    name: "Charlie Munger",
    style: "Quality + Simplicity",
    description: "Avoids complexity, loves mental models, focuses on rational business behavior",
    avatar: "/placeholder.svg",
    bio: "Warren Buffett's partner and former Vice-Chairman of Berkshire Hathaway, known for rational thinking and multidisciplinary approach.",
    rules: [
      "High quality business",
      "Management with integrity",
      "Simple to understand",
      "Sustainable advantage"
    ],
    holdingPeriod: "10+ years",
    strengths: ["Quality focus", "Avoiding mistakes"],
    weaknesses: ["Very conservative", "Limited tech exposure"],
    historicalAlpha: "+10.5% CAGR since 2010",
    filters: {
      "ROCE": "> 18%",
      "Profit Margin": "> 15%",
      "Debt/EBITDA": "< 2x",
      "Growth Rate": "> 8%"
    }
  },
];
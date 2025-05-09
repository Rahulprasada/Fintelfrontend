import { 
    ESGCompanyScore, 
    ESGControversy, 
    ESGRisk,
    GreenwashingFlag,
    ESGDataSource,
    ESGTrendPoint,
    ESGAlert,
    ESGAlertConfig
  } from "./ESGIntellegence";

  
  // Mock Companies with ESG Scores
  export const esgCompanies: ESGCompanyScore[] = [
    {
      companyId: "c1",
      companyName: "Tata Consultancy Services",
      ticker: "TCS.NS",
      sector: "Information Technology",
      industry: "IT Services",
      overallScore: 85,
      previousScore: 81,
      change: 4,
      scoreLevel: "Excellent",
      pillars: [
        {
          name: "Environmental",
          score: 82,
          change: 3,
          issues: ["Carbon Emission Reduction", "Energy Efficiency", "Water Management"]
        },
        {
          name: "Social",
          score: 87,
          change: 5,
          issues: ["Employee Training", "Diversity & Inclusion", "Community Development"]
        },
        {
          name: "Governance",
          score: 86,
          change: 4,
          issues: ["Board Independence", "Executive Compensation", "Reporting Transparency"]
        }
      ],
      lastUpdated: "2025-04-15"
    },
    {
      companyId: "c2",
      companyName: "Infosys Ltd",
      ticker: "INFY.NS",
      sector: "Information Technology",
      industry: "IT Services",
      overallScore: 82,
      previousScore: 80,
      change: 2,
      scoreLevel: "Excellent",
      pillars: [
        {
          name: "Environmental",
          score: 78,
          change: 1,
          issues: ["Carbon Emission Reduction", "Renewable Energy", "Electronic Waste"]
        },
        {
          name: "Social",
          score: 84,
          change: 2,
          issues: ["Employee Wellness", "Diversity & Inclusion", "Human Rights"]
        },
        {
          name: "Governance",
          score: 84,
          change: 3,
          issues: ["Board Structure", "Audit & Compliance", "Shareholder Rights"]
        }
      ],
      lastUpdated: "2025-04-10"
    },
    {
      companyId: "c3",
      companyName: "HDFC Bank Ltd",
      ticker: "HDFCBANK.NS",
      sector: "Financials",
      industry: "Banking",
      overallScore: 74,
      previousScore: 75,
      change: -1,
      scoreLevel: "Good",
      pillars: [
        {
          name: "Environmental",
          score: 68,
          change: -2,
          issues: ["Sustainable Financing", "Paper Reduction", "Operational Footprint"]
        },
        {
          name: "Social",
          score: 75,
          change: 0,
          issues: ["Financial Inclusion", "Employee Benefits", "Customer Privacy"]
        },
        {
          name: "Governance",
          score: 79,
          change: -1,
          issues: ["Risk Management", "Compliance Framework", "Ethical Business Practices"]
        }
      ],
      lastUpdated: "2025-04-18"
    },
    {
      companyId: "c4",
      companyName: "Reliance Industries",
      ticker: "RELIANCE.NS",
      sector: "Energy",
      industry: "Oil & Gas",
      overallScore: 65,
      previousScore: 62,
      change: 3,
      scoreLevel: "Good",
      pillars: [
        {
          name: "Environmental",
          score: 58,
          change: 4,
          issues: ["Emissions Management", "Waste Reduction", "Water Conservation"]
        },
        {
          name: "Social",
          score: 69,
          change: 2,
          issues: ["Community Relations", "Employee Safety", "Supply Chain Management"]
        },
        {
          name: "Governance",
          score: 68,
          change: 3,
          issues: ["Corporate Structure", "Disclosure Practices", "Anti-corruption Policies"]
        }
      ],
      lastUpdated: "2025-04-05"
    },
    {
      companyId: "c5",
      companyName: "ITC Ltd",
      ticker: "ITC.NS",
      sector: "Consumer Staples",
      industry: "Consumer Products",
      overallScore: 72,
      previousScore: 70,
      change: 2,
      scoreLevel: "Good",
      pillars: [
        {
          name: "Environmental",
          score: 71,
          change: 4,
          issues: ["Sustainable Farming", "Packaging Innovation", "Forest Conservation"]
        },
        {
          name: "Social",
          score: 76,
          change: 1,
          issues: ["Rural Development", "Employee Welfare", "Consumer Health"]
        },
        {
          name: "Governance",
          score: 69,
          change: 1,
          issues: ["Board Diversity", "Stakeholder Engagement", "Business Ethics"]
        }
      ],
      lastUpdated: "2025-04-12"
    },
    {
      companyId: "c6",
      companyName: "Coal India Ltd",
      ticker: "COALINDIA.NS",
      sector: "Energy",
      industry: "Coal",
      overallScore: 48,
      previousScore: 45,
      change: 3,
      scoreLevel: "Caution",
      pillars: [
        {
          name: "Environmental",
          score: 35,
          change: 2,
          issues: ["Air Pollution", "Land Reclamation", "Water Contamination"]
        },
        {
          name: "Social",
          score: 56,
          change: 4,
          issues: ["Worker Safety", "Community Relations", "Health Impact"]
        },
        {
          name: "Governance",
          score: 53,
          change: 3,
          issues: ["State Ownership", "Transparency", "Stakeholder Engagement"]
        }
      ],
      lastUpdated: "2025-04-08"
    },
    {
      companyId: "c7",
      companyName: "Adani Enterprises",
      ticker: "ADANIENT.NS",
      sector: "Industrials",
      industry: "Conglomerate",
      overallScore: 43,
      previousScore: 41,
      change: 2,
      scoreLevel: "Caution",
      pillars: [
        {
          name: "Environmental",
          score: 38,
          change: 3,
          issues: ["Coal Mining Impact", "Biodiversity Loss", "Greenhouse Gas Emissions"]
        },
        {
          name: "Social",
          score: 45,
          change: 1,
          issues: ["Community Displacement", "Labor Relations", "Indigenous Rights"]
        },
        {
          name: "Governance",
          score: 46,
          change: 2,
          issues: ["Ownership Structure", "Political Connections", "Disclosure Quality"]
        }
      ],
      lastUpdated: "2025-04-14"
    },
    {
      companyId: "c8",
      companyName: "Hindustan Unilever",
      ticker: "HINDUNILVR.NS",
      sector: "Consumer Staples",
      industry: "FMCG",
      overallScore: 81,
      previousScore: 79,
      change: 2,
      scoreLevel: "Excellent",
      pillars: [
        {
          name: "Environmental",
          score: 83,
          change: 3,
          issues: ["Plastic Reduction", "Water Stewardship", "Sustainable Sourcing"]
        },
        {
          name: "Social",
          score: 84,
          change: 2,
          issues: ["Product Safety", "Rural Access", "Employee Wellbeing"]
        },
        {
          name: "Governance",
          score: 76,
          change: 1,
          issues: ["Board Structure", "Audit Processes", "Ethical Marketing"]
        }
      ],
      lastUpdated: "2025-04-16"
    },
    {
      companyId: "c9",
      companyName: "Maruti Suzuki",
      ticker: "MARUTI.NS",
      sector: "Consumer Discretionary",
      industry: "Automotive",
      overallScore: 64,
      previousScore: 61,
      change: 3,
      scoreLevel: "Good",
      pillars: [
        {
          name: "Environmental",
          score: 59,
          change: 4,
          issues: ["Emissions Compliance", "Fuel Efficiency", "Manufacturing Waste"]
        },
        {
          name: "Social",
          score: 67,
          change: 2,
          issues: ["Road Safety", "Labor Practices", "Skills Development"]
        },
        {
          name: "Governance",
          score: 66,
          change: 3,
          issues: ["Joint Venture Governance", "Regulatory Compliance", "Anti-corruption"]
        }
      ],
      lastUpdated: "2025-04-09"
    },
    {
      companyId: "c10",
      companyName: "Vedanta Ltd",
      ticker: "VEDL.NS",
      sector: "Materials",
      industry: "Mining",
      overallScore: 38,
      previousScore: 42,
      change: -4,
      scoreLevel: "Risky",
      pillars: [
        {
          name: "Environmental",
          score: 32,
          change: -5,
          issues: ["Toxic Waste", "Air & Water Pollution", "Habitat Destruction"]
        },
        {
          name: "Social",
          score: 41,
          change: -2,
          issues: ["Community Conflicts", "Worker Safety", "Human Rights"]
        },
        {
          name: "Governance",
          score: 41,
          change: -4,
          issues: ["Corporate Structure", "Regulatory Violations", "Transparency Issues"]
        }
      ],
      lastUpdated: "2025-04-11"
    }
  ];
  
  // Controversies
  export const esgControversies: ESGControversy[] = [
    {
      id: "con1",
      companyId: "c10",
      companyName: "Vedanta Ltd",
      title: "Toxic Waste Leak in Tamil Nadu",
      description: "A major toxic waste leak from Vedanta's copper smelter contaminated groundwater affecting local villages. The company faces regulatory action and community protests.",
      type: "Environmental",
      severity: "Critical",
      date: "2025-03-12",
      source: "Environmental Monitoring Agency",
      url: "#",
      impact: -8
    },
    {
      id: "con2",
      companyId: "c7",
      companyName: "Adani Enterprises",
      title: "Indigenous Land Rights Dispute",
      description: "Adani's mining project faces accusations of violating indigenous land rights. Local tribes have filed lawsuits claiming lack of consent and improper consultation.",
      type: "Social",
      severity: "High",
      date: "2025-03-18",
      source: "Human Rights Watch",
      url: "#",
      impact: -6
    },
    {
      id: "con3",
      companyId: "c6",
      companyName: "Coal India Ltd",
      title: "Excess Carbon Emissions Reported",
      description: "Independent auditors found that Coal India underreported carbon emissions by approximately 28% in their sustainability reports for the past two years.",
      type: "Environmental",
      severity: "High",
      date: "2025-02-28",
      source: "Climate Accountability Institute",
      url: "#",
      impact: -7
    },
    {
      id: "con4",
      companyId: "c3",
      companyName: "HDFC Bank Ltd",
      title: "Data Privacy Breach",
      description: "HDFC Bank reported a data breach affecting approximately 120,000 customers. Personal and financial information was potentially exposed to unauthorized parties.",
      type: "Governance",
      severity: "Medium",
      date: "2025-03-25",
      source: "Financial Times",
      url: "#",
      impact: -4
    },
    {
      id: "con5",
      companyId: "c4",
      companyName: "Reliance Industries",
      title: "Labor Violations at Manufacturing Unit",
      description: "Labor department investigation found multiple violations including excessive working hours and inadequate safety measures at a petrochemical plant.",
      type: "Social",
      severity: "Medium",
      date: "2025-03-05",
      source: "Ministry of Labor",
      url: "#",
      impact: -5
    }
  ];
  
  // ESG Risks
  export const esgRisks: ESGRisk[] = [
    {
      id: "risk1",
      companyId: "c4",
      name: "Transition to Low-Carbon Economy",
      category: "Environmental",
      description: "Risk of stranded assets as global economy shifts away from fossil fuels. Potential regulatory penalties and carbon taxes could impact profitability.",
      exposureLevel: "High",
      mitigation: "Company has announced renewable energy investments, but they remain a small portion of overall business.",
      trend: "Stable"
    },
    {
      id: "risk2",
      companyId: "c4",
      name: "Water Stress in Manufacturing",
      category: "Environmental",
      description: "Operations in water-stressed regions face potential disruptions and increased costs for water procurement.",
      exposureLevel: "Medium",
      mitigation: "Water recycling initiatives implemented at 60% of facilities.",
      trend: "Improving"
    },
    {
      id: "risk3",
      companyId: "c7",
      name: "Environmental Regulatory Compliance",
      category: "Governance",
      description: "History of regulatory violations creates risk of fines, operational disruptions, and reputational damage.",
      exposureLevel: "High",
      mitigation: "Limited evidence of systematic improvement in compliance procedures.",
      trend: "Worsening"
    },
    {
      id: "risk4",
      companyId: "c10",
      name: "Community Relations",
      category: "Social",
      description: "Ongoing conflicts with local communities near mining sites threaten operating licenses and create legal and reputational risks.",
      exposureLevel: "High",
      mitigation: "Community engagement programs launched but with limited effectiveness to date.",
      trend: "Worsening"
    },
    {
      id: "risk5",
      companyId: "c3",
      name: "Data Security & Privacy",
      category: "Governance",
      description: "Handling of sensitive personal and financial data creates exposure to breaches and regulatory penalties under data protection laws.",
      exposureLevel: "Medium",
      mitigation: "Cybersecurity investments increased by 35% in past year with enhanced monitoring.",
      trend: "Improving"
    }
  ];
  
  // Greenwashing Flags
  export const greenwashingFlags: GreenwashingFlag[] = [
    {
      id: "gw1",
      companyId: "c6",
      title: "Misleading 'Clean Coal' Campaign",
      description: "Company advertises 'clean coal technology' while investing minimally in emissions reduction.",
      claimText: "Our clean coal technology represents the future of sustainable energy production with minimal environmental impact.",
      conflictingEvidence: "Third-party emissions testing shows minimal improvement vs. conventional coal. Company spent only 2% of capital expenditure on clean technology.",
      source: "Energy Transition Monitor",
      dateDetected: "2025-02-15",
      severity: "High",
      resolved: false
    },
    {
      id: "gw2",
      companyId: "c7",
      title: "Exaggerated Renewable Commitment",
      description: "Company announced major renewable energy transition while simultaneously expanding coal operations.",
      claimText: "We are committed to achieving carbon neutrality by 2040 with major investments in renewable energy.",
      conflictingEvidence: "Company has allocated 85% of new capital expenditure to coal projects over the past year while renewables received only 8%.",
      source: "Climate Action Tracker",
      dateDetected: "2025-03-10",
      severity: "High",
      resolved: false,
      analystNotes: "Clear case of public relations not matching actual business strategy."
    },
    {
      id: "gw3",
      companyId: "c4",
      title: "Misleading Carbon Footprint Calculation",
      description: "Company excludes significant scope 3 emissions from suppliers in carbon footprint reporting.",
      claimText: "We reduced our carbon footprint by 22% in the past year through operational excellence.",
      conflictingEvidence: "When including scope 3 emissions, carbon footprint actually increased by 5%. Methodology change not clearly disclosed in sustainability report.",
      source: "Greenhouse Gas Protocol Audit",
      dateDetected: "2025-01-20",
      severity: "Medium",
      resolved: false
    },
    {
      id: "gw4",
      companyId: "c10",
      title: "Selective Sustainability Reporting",
      description: "Company highlights positive environmental projects while omitting significant environmental violations.",
      claimText: "Our comprehensive sustainability report showcases our commitment to environmental stewardship across all operations.",
      conflictingEvidence: "Sustainability report omits mention of four major environmental violations resulting in $12M in fines during the reporting period.",
      source: "Environmental Regulatory Database",
      dateDetected: "2025-04-02",
      severity: "Medium",
      resolved: false
    }
  ];
  
  // ESG Data Sources
  export const esgDataSources: ESGDataSource[] = [
    {
      id: "ds1",
      name: "SEBI Filings",
      type: "Regulatory",
      description: "Official company filings with Securities and Exchange Board of India",
      url: "#"
    },
    {
      id: "ds2",
      name: "Carbon Disclosure Project",
      type: "NGO",
      description: "Global disclosure system for environmental impact",
      url: "#"
    },
    {
      id: "ds3",
      name: "MSCI ESG Ratings",
      type: "Database",
      description: "Independent ESG rating methodology",
      url: "#"
    },
    {
      id: "ds4",
      name: "Sustainalytics",
      type: "Database",
      description: "ESG risk ratings and research",
      url: "#"
    },
    {
      id: "ds5",
      name: "ESG News Monitor",
      type: "News",
      description: "AI-powered aggregation of ESG news across global sources",
      url: "#"
    }
  ];
  
  // ESG Score Trends
  export const esgTrendData: Record<string, ESGTrendPoint[]> = {
    "c1": [
      { date: "2024-05", score: 74 },
      { date: "2024-06", score: 75 },
      { date: "2024-07", score: 76 },
      { date: "2024-08", score: 77 },
      { date: "2024-09", score: 78 },
      { date: "2024-10", score: 79 },
      { date: "2024-11", score: 79 },
      { date: "2024-12", score: 80 },
      { date: "2025-01", score: 81 },
      { date: "2025-02", score: 82 },
      { date: "2025-03", score: 84 },
      { date: "2025-04", score: 85 }
    ],
    "c4": [
      { date: "2024-05", score: 58 },
      { date: "2024-06", score: 59 },
      { date: "2024-07", score: 60 },
      { date: "2024-08", score: 59 },
      { date: "2024-09", score: 61 },
      { date: "2024-10", score: 62 },
      { date: "2024-11", score: 61 },
      { date: "2024-12", score: 62 },
      { date: "2025-01", score: 63 },
      { date: "2025-02", score: 64 },
      { date: "2025-03", score: 65 },
      { date: "2025-04", score: 65 }
    ],
    "c10": [
      { date: "2024-05", score: 46 },
      { date: "2024-06", score: 45 },
      { date: "2024-07", score: 44 },
      { date: "2024-08", score: 45 },
      { date: "2024-09", score: 43 },
      { date: "2024-10", score: 44 },
      { date: "2024-11", score: 42 },
      { date: "2024-12", score: 43 },
      { date: "2025-01", score: 42 },
      { date: "2025-02", score: 40 },
      { date: "2025-03", score: 41 },
      { date: "2025-04", score: 38 }
    ]
  };
  
  // Sector Average ESG Scores
  export const sectorESGScores = [
    { sector: "Information Technology", score: 76, change: 2.1 },
    { sector: "Healthcare", score: 72, change: 1.5 },
    { sector: "Financials", score: 68, change: 0.8 },
    { sector: "Consumer Staples", score: 70, change: 1.2 },
    { sector: "Consumer Discretionary", score: 65, change: 0.5 },
    { sector: "Industrials", score: 61, change: 0.2 },
    { sector: "Materials", score: 58, change: -0.4 },
    { sector: "Energy", score: 53, change: -1.1 },
    { sector: "Utilities", score: 59, change: 0.7 },
    { sector: "Telecommunications", score: 67, change: 1.0 }
  ];
  
  // ESG Alerts
  export const esgAlerts: ESGAlert[] = [
    {
      id: "alert1",
      alertConfigId: "config1",
      companyId: "c10",
      companyName: "Vedanta Ltd",
      eventType: "ScoreDrop",
      title: "ESG Score Drop Alert",
      description: "Vedanta's ESG score dropped by 4 points, falling into the 'Risky' category.",
      date: "2025-04-11",
      viewed: false
    },
    {
      id: "alert2",
      alertConfigId: "config2",
      companyId: "c10",
      companyName: "Vedanta Ltd",
      eventType: "Controversy",
      title: "Critical Controversy Alert",
      description: "New critical controversy detected: Toxic Waste Leak in Tamil Nadu.",
      date: "2025-03-12",
      viewed: true
    },
    {
      id: "alert3",
      alertConfigId: "config3",
      companyId: "c7",
      companyName: "Adani Enterprises",
      eventType: "Controversy",
      title: "High Severity Controversy Alert",
      description: "New controversy detected: Indigenous Land Rights Dispute.",
      date: "2025-03-18",
      viewed: false
    },
    {
      id: "alert4",
      alertConfigId: "config4",
      companyId: "c6",
      companyName: "Coal India Ltd",
      eventType: "GreenwashingFlag",
      title: "Greenwashing Detection Alert",
      description: "Potential greenwashing detected: Misleading 'Clean Coal' Campaign.",
      date: "2025-02-15",
      viewed: false
    }
  ];
  
  // ESG Alert Configurations
  export const esgAlertConfigs: ESGAlertConfig[] = [
    {
      id: "config1",
      userId: "user1",
      name: "Major Score Drop",
      type: "ScoreDrop",
      threshold: 3,
      targetCompanies: "all",
      active: true,
      emailNotification: true,
      appNotification: true
    },
    {
      id: "config2",
      userId: "user1",
      name: "Critical Controversies",
      type: "Controversy",
      targetCompanies: "all",
      active: true,
      emailNotification: true,
      appNotification: true
    },
    {
      id: "config3",
      userId: "user1",
      name: "Greenwashing Detection",
      type: "GreenwashingFlag",
      targetCompanies: "all",
      active: true,
      emailNotification: true,
      appNotification: true
    }
  ];
  
  // Export Format Options
  export const exportFormats = ["PDF", "Excel", "CSV"];
  
  // Current Selected Company (default)
  export const defaultCompanyId = "c1";
  
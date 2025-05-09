import { BusinessAnalysis } from "./BusinessAnalysis";


export const businessAnalysisSamples: BusinessAnalysis[] = [
  {
    id: "ba-001",
    companyId: "TCS",
    companyName: "Tata Consultancy Services",
    sector: "IT Services",
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-04-20"),
    moat: [
      {
        id: "moat-001",
        type: "Scale",
        description: "TCS benefits from significant scale economies, with over 600,000 employees globally and deep client relationships.",
        strength: "High",
        lastUpdated: new Date("2025-03-10")
      },
      {
        id: "moat-002",
        type: "Switching",
        description: "High switching costs for clients due to deep integration into client business processes and critical system management.",
        strength: "High",
        lastUpdated: new Date("2025-03-10")
      },
      {
        id: "moat-003",
        type: "Brand",
        description: "Strong brand recognition and reputation for reliable delivery in the enterprise IT services market.",
        strength: "Medium",
        lastUpdated: new Date("2025-03-12")
      }
    ],
    swot: {
      strengths: [
        {
          id: "str-001",
          text: "Industry-leading profit margins compared to peers",
          lastUpdated: new Date("2025-03-15")
        },
        {
          id: "str-002",
          text: "Strong cash reserves with zero debt",
          lastUpdated: new Date("2025-03-15")
        },
        {
          id: "str-003",
          text: "Diversified client base across industries and geographies",
          lastUpdated: new Date("2025-03-15")
        }
      ],
      weaknesses: [
        {
          id: "wk-001",
          text: "Lower revenue per employee than some competitors",
          lastUpdated: new Date("2025-03-15")
        },
        {
          id: "wk-002",
          text: "Slower adoption of next-gen technologies compared to boutique firms",
          lastUpdated: new Date("2025-03-15")
        }
      ],
      opportunities: [
        {
          id: "op-001",
          text: "Growing demand for AI and cloud transformation services",
          lastUpdated: new Date("2025-03-15")
        },
        {
          id: "op-002",
          text: "Expansion into product-based offerings from services",
          lastUpdated: new Date("2025-03-15")
        }
      ],
      threats: [
        {
          id: "th-001",
          text: "Increasing automation reducing traditional IT service needs",
          lastUpdated: new Date("2025-03-15")
        },
        {
          id: "th-002",
          text: "Tightening visa regulations in key markets like USA",
          lastUpdated: new Date("2025-03-15")
        },
        {
          id: "th-003",
          text: "Rising competition from cloud native service providers",
          lastUpdated: new Date("2025-04-20")
        }
      ]
    },
    businessModel: {
      narrative: "TCS operates primarily as an IT services and consulting company, offering a wide range of services including application development, infrastructure management, business process outsourcing, consulting, and digital transformation. The company follows a global delivery model with offshore development centers in India and nearshore centers worldwide.",
      revenueSources: [
        {
          id: "rev-001",
          category: "Application Services",
          description: "Custom application development, maintenance, and testing",
          percentage: 42
        },
        {
          id: "rev-002",
          category: "Infrastructure Services",
          description: "Data center, cloud, and workplace management",
          percentage: 28
        },
        {
          id: "rev-003",
          category: "Digital Transformation",
          description: "Cloud, analytics, IoT, and AI-driven solutions",
          percentage: 18
        },
        {
          id: "rev-004",
          category: "Consulting",
          description: "Business and technology consulting services",
          percentage: 8
        },
        {
          id: "rev-005",
          category: "Other Services",
          description: "BPO, platforms, products",
          percentage: 4
        }
      ],
      valueChain: [
        {
          id: "val-001",
          category: "Client Acquisition",
          description: "RFP participation, relationship management, industry events"
        },
        {
          id: "val-002",
          category: "Service Delivery",
          description: "Global delivery model with 70-30 offshore-onsite ratio"
        },
        {
          id: "val-003",
          category: "Talent Management",
          description: "Large-scale hiring from engineering colleges, training program"
        }
      ]
    },
    promoterHolding: [
      { quarter: "Q1 2023", date: new Date("2023-03-31"), percentage: 72.19 },
      { quarter: "Q2 2023", date: new Date("2023-06-30"), percentage: 72.19 },
      { quarter: "Q3 2023", date: new Date("2023-09-30"), percentage: 72.19 },
      { quarter: "Q4 2023", date: new Date("2023-12-31"), percentage: 72.20 },
      { quarter: "Q1 2024", date: new Date("2024-03-31"), percentage: 72.23 },
      { quarter: "Q2 2024", date: new Date("2024-06-30"), percentage: 72.30 },
      { quarter: "Q3 2024", date: new Date("2024-09-30"), percentage: 72.34 },
      { quarter: "Q4 2024", date: new Date("2024-12-31"), percentage: 72.38 }
    ],
    insiderTransactions: [
      {
        id: "ins-001",
        personName: "Rajesh Gopinathan",
        role: "Former CEO",
        transactionType: "Sell",
        quantity: 5000,
        price: 3540,
        date: new Date("2023-07-15")
      },
      {
        id: "ins-002",
        personName: "N. Ganapathy Subramaniam",
        role: "COO",
        transactionType: "Buy",
        quantity: 1200,
        price: 3250,
        date: new Date("2023-08-10")
      },
      {
        id: "ins-003",
        personName: "K. Krithivasan",
        role: "CEO",
        transactionType: "Buy",
        quantity: 2000,
        price: 3650,
        date: new Date("2024-01-22")
      }
    ],
    pledgingData: [
      { quarter: "Q1 2023", date: new Date("2023-03-31"), percentage: 0.00 },
      { quarter: "Q2 2023", date: new Date("2023-06-30"), percentage: 0.00 },
      { quarter: "Q3 2023", date: new Date("2023-09-30"), percentage: 0.00 },
      { quarter: "Q4 2023", date: new Date("2023-12-31"), percentage: 0.00 },
      { quarter: "Q1 2024", date: new Date("2024-03-31"), percentage: 0.00 },
      { quarter: "Q2 2024", date: new Date("2024-06-30"), percentage: 0.00 },
      { quarter: "Q3 2024", date: new Date("2024-09-30"), percentage: 0.00 },
      { quarter: "Q4 2024", date: new Date("2024-12-31"), percentage: 0.00 }
    ],
    redFlags: [],
    remuneration: [
      {
        personName: "K. Krithivasan",
        role: "CEO",
        year: "2024",
        amount: 250000000, // 25 crore INR
        percentageChange: 8.5,
        profitPercentage: 0.18
      },
      {
        personName: "Samir Seksaria",
        role: "CFO",
        year: "2024",
        amount: 120000000, // 12 crore INR
        percentageChange: 7.2,
        profitPercentage: 0.09
      }
    ],
    boardMembers: [
      {
        id: "board-001",
        name: "N. Chandrasekaran",
        role: "Chairman",
        isIndependent: false,
        isPromoter: true,
        since: new Date("2017-02-21"),
        expertise: ["Technology", "Business Strategy", "Leadership"]
      },
      {
        id: "board-002",
        name: "K. Krithivasan",
        role: "CEO & Managing Director",
        isIndependent: false,
        isPromoter: false,
        since: new Date("2023-06-01"),
        expertise: ["IT Services", "Client Management", "Operations"]
      },
      {
        id: "board-003",
        name: "O. P. Bhatt",
        role: "Director",
        isIndependent: true,
        isPromoter: false,
        since: new Date("2012-04-02"),
        expertise: ["Banking", "Finance", "Governance"]
      },
      {
        id: "board-004",
        name: "Aarthi Subramanian",
        role: "Director",
        isIndependent: false,
        isPromoter: true,
        since: new Date("2017-07-12"),
        expertise: ["Technology", "Digital", "Business Transformation"]
      },
      {
        id: "board-005",
        name: "Keki Mistry",
        role: "Director",
        isIndependent: true,
        isPromoter: false,
        since: new Date("2018-12-26"),
        expertise: ["Finance", "Audit", "Risk Management"]
      }
    ],
    relatedPartyTransactions: [
      {
        id: "rpt-001",
        entity: "Tata Sons Private Limited",
        relationship: "Parent Company",
        amount: 185000000, // 18.5 crore INR
        description: "Brand equity contribution",
        date: new Date("2024-01-15"),
        isRecurring: true
      },
      {
        id: "rpt-002",
        entity: "Tata Motors Limited",
        relationship: "Fellow Subsidiary",
        amount: 1250000000, // 125 crore INR
        description: "IT services and solutions",
        date: new Date("2024-02-28"),
        isRecurring: true
      }
    ],
    governanceScore: {
      overall: 87,
      boardIndependence: 65,
      auditQuality: 95,
      disclosureQuality: 90,
      relatedPartyTransactions: 85,
      shareholderRights: 92
    },
    analystComments: [
      {
        id: "com-001",
        section: "MOAT",
        text: "TCS's scale advantage is significant and has continued to strengthen with market share gains.",
        createdAt: new Date("2025-03-15"),
        updatedAt: new Date("2025-03-15"),
        createdBy: "Rohit Sharma"
      },
      {
        id: "com-002",
        section: "Governance",
        text: "Strong governance framework with high transparency, though board independence could be improved.",
        createdAt: new Date("2025-03-20"),
        updatedAt: new Date("2025-04-10"),
        createdBy: "Rohit Sharma"
      }
    ],
    versions: [
      {
        id: "ver-001",
        name: "Initial Draft",
        timestamp: new Date("2025-03-15"),
        createdBy: "Rohit Sharma",
        tags: ["draft"],
        isPublic: false
      },
      {
        id: "ver-002",
        name: "Q1 2025 Update",
        timestamp: new Date("2025-04-20"),
        createdBy: "Rohit Sharma",
        tags: ["quarterly", "published"],
        isPublic: true
      }
    ],
    peerComparisons: [
      {
        companyId: "INFO",
        companyName: "Infosys",
        governanceScore: 82,
        promoterPledging: 0,
        boardIndependence: 75,
        redFlagsCount: 0
      },
      {
        companyId: "WIPRO",
        companyName: "Wipro",
        governanceScore: 78,
        promoterPledging: 0,
        boardIndependence: 70,
        redFlagsCount: 0
      },
      {
        companyId: "HCLTECH",
        companyName: "HCL Technologies",
        governanceScore: 75,
        promoterPledging: 0,
        boardIndependence: 60,
        redFlagsCount: 0
      },
      {
        companyId: "TECHM",
        companyName: "Tech Mahindra",
        governanceScore: 72,
        promoterPledging: 0,
        boardIndependence: 65,
        redFlagsCount: 0
      }
    ],
    linkedReportIds: ["report-001", "report-002"]
  },
  {
    id: "ba-002",
    companyId: "ZEE",
    companyName: "Zee Entertainment",
    sector: "Media & Entertainment",
    createdAt: new Date("2025-02-10"),
    updatedAt: new Date("2025-04-15"),
    moat: [
      {
        id: "moat-004",
        type: "Brand",
        description: "Strong brand recognition in Indian entertainment with popular channels like Zee TV.",
        strength: "Medium",
        lastUpdated: new Date("2025-03-05")
      },
      {
        id: "moat-005",
        type: "Content",
        description: "Large content library and regional language coverage across markets.",
        strength: "Medium",
        lastUpdated: new Date("2025-03-05")
      }
    ],
    swot: {
      strengths: [
        {
          id: "str-004",
          text: "Strong presence in regional markets",
          lastUpdated: new Date("2025-03-05")
        },
        {
          id: "str-005",
          text: "Substantial content library with digital rights",
          lastUpdated: new Date("2025-03-05")
        }
      ],
      weaknesses: [
        {
          id: "wk-003",
          text: "Corporate governance concerns",
          lastUpdated: new Date("2025-03-05")
        },
        {
          id: "wk-004",
          text: "Promoter pledging and debt burden",
          lastUpdated: new Date("2025-03-05")
        }
      ],
      opportunities: [
        {
          id: "op-003",
          text: "OTT platform ZEE5 growth potential",
          lastUpdated: new Date("2025-03-05")
        },
        {
          id: "op-004",
          text: "International market expansion",
          lastUpdated: new Date("2025-03-05")
        }
      ],
      threats: [
        {
          id: "th-004",
          text: "Intense competition from global streaming platforms",
          lastUpdated: new Date("2025-03-05")
        },
        {
          id: "th-005",
          text: "Declining TV advertising revenue",
          lastUpdated: new Date("2025-03-05")
        }
      ]
    },
    businessModel: {
      narrative: "Zee Entertainment is a media and entertainment company with operations across television broadcasting, digital content, and film production. Revenue comes primarily from advertising, subscription, and content syndication.",
      revenueSources: [
        {
          id: "rev-006",
          category: "Advertising",
          description: "TV and digital advertising revenue",
          percentage: 55
        },
        {
          id: "rev-007",
          category: "Subscription",
          description: "TV channel and ZEE5 subscriptions",
          percentage: 35
        },
        {
          id: "rev-008",
          category: "Content Syndication",
          description: "Licensing content to other platforms",
          percentage: 8
        },
        {
          id: "rev-009",
          category: "Other",
          description: "Movie distribution, licensing",
          percentage: 2
        }
      ],
      valueChain: [
        {
          id: "val-004",
          category: "Content Creation",
          description: "TV shows, movies, and digital content production"
        },
        {
          id: "val-005",
          category: "Distribution",
          description: "Cable, DTH, OTT platforms"
        },
        {
          id: "val-006",
          category: "Marketing",
          description: "Cross-promotion across channels and platforms"
        }
      ]
    },
    promoterHolding: [
      { quarter: "Q1 2023", date: new Date("2023-03-31"), percentage: 3.99 },
      { quarter: "Q2 2023", date: new Date("2023-06-30"), percentage: 3.99 },
      { quarter: "Q3 2023", date: new Date("2023-09-30"), percentage: 4.01 },
      { quarter: "Q4 2023", date: new Date("2023-12-31"), percentage: 4.05 },
      { quarter: "Q1 2024", date: new Date("2024-03-31"), percentage: 4.05 },
      { quarter: "Q2 2024", date: new Date("2024-06-30"), percentage: 4.05 },
      { quarter: "Q3 2024", date: new Date("2024-09-30"), percentage: 4.05 },
      { quarter: "Q4 2024", date: new Date("2024-12-31"), percentage: 4.05 }
    ],
    insiderTransactions: [
      {
        id: "ins-004",
        personName: "Punit Goenka",
        role: "CEO",
        transactionType: "Sell",
        quantity: 100000,
        price: 290,
        date: new Date("2023-05-15")
      },
      {
        id: "ins-005",
        personName: "Punit Goenka",
        role: "CEO",
        transactionType: "Sell",
        quantity: 150000,
        price: 275,
        date: new Date("2023-11-20")
      }
    ],
    pledgingData: [
      { quarter: "Q1 2023", date: new Date("2023-03-31"), percentage: 64.15 },
      { quarter: "Q2 2023", date: new Date("2023-06-30"), percentage: 64.15 },
      { quarter: "Q3 2023", date: new Date("2023-09-30"), percentage: 64.15 },
      { quarter: "Q4 2023", date: new Date("2023-12-31"), percentage: 64.15 },
      { quarter: "Q1 2024", date: new Date("2024-03-31"), percentage: 64.15 },
      { quarter: "Q2 2024", date: new Date("2024-06-30"), percentage: 64.15 },
      { quarter: "Q3 2024", date: new Date("2024-09-30"), percentage: 64.15 },
      { quarter: "Q4 2024", date: new Date("2024-12-31"), percentage: 64.15 }
    ],
    redFlags: [
      {
        id: "rf-001",
        category: "Promoter",
        severity: "High",
        description: "Consistently high pledging (>60%) of promoter shares for multiple quarters",
        source: "Exchange Filings",
        date: new Date("2023-03-31"),
        acknowledged: true,
        analystNote: "High risk of selling pressure if share price falls significantly"
      },
      {
        id: "rf-002",
        category: "Insider",
        severity: "Medium",
        description: "Multiple insider selling events by CEO ahead of disappointing results",
        source: "Exchange Filings",
        date: new Date("2023-11-20"),
        acknowledged: true,
        analystNote: "Concerning pattern of insider sales before negative announcements"
      },
      {
        id: "rf-003",
        category: "Governance",
        severity: "High",
        description: "SEBI investigation into related party transactions",
        source: "Regulatory Filing",
        date: new Date("2024-02-15"),
        acknowledged: false
      }
    ],
    remuneration: [
      {
        personName: "Punit Goenka",
        role: "CEO",
        year: "2024",
        amount: 150000000, // 15 crore INR
        percentageChange: 12.5,
        profitPercentage: 2.8
      }
    ],
    boardMembers: [
      {
        id: "board-006",
        name: "R. Gopalan",
        role: "Chairman",
        isIndependent: true,
        isPromoter: false,
        since: new Date("2019-11-25"),
        expertise: ["Finance", "Public Administration"]
      },
      {
        id: "board-007",
        name: "Punit Goenka",
        role: "CEO & MD",
        isIndependent: false,
        isPromoter: true,
        since: new Date("2010-01-01"),
        expertise: ["Media", "Entertainment", "Business Strategy"]
      },
      {
        id: "board-008",
        name: "Adesh Kumar Gupta",
        role: "Director",
        isIndependent: true,
        isPromoter: false,
        since: new Date("2015-12-30"),
        expertise: ["Finance", "Audit", "Compliance"]
      }
    ],
    relatedPartyTransactions: [
      {
        id: "rpt-003",
        entity: "Essel Corporate Resources",
        relationship: "Promoter Group Entity",
        amount: 45000000, // 4.5 crore INR
        description: "Corporate service charges",
        date: new Date("2023-07-15"),
        isRecurring: true
      },
      {
        id: "rpt-004",
        entity: "Zee Media Corporation",
        relationship: "Promoter Group Entity",
        amount: 220000000, // 22 crore INR
        description: "Content sharing and promotion",
        date: new Date("2023-08-30"),
        isRecurring: true
      }
    ],
    governanceScore: {
      overall: 42,
      boardIndependence: 60,
      auditQuality: 35,
      disclosureQuality: 45,
      relatedPartyTransactions: 20,
      shareholderRights: 50
    },
    analystComments: [
      {
        id: "com-003",
        section: "RedFlag",
        text: "The high promoter pledge is a significant concern, especially given the declining promoter holding.",
        createdAt: new Date("2025-03-10"),
        updatedAt: new Date("2025-03-10"),
        createdBy: "Rohit Sharma"
      },
      {
        id: "com-004",
        section: "Governance",
        text: "Related party transactions require deeper investigation. Current disclosures lack transparency on pricing mechanisms.",
        createdAt: new Date("2025-03-12"),
        updatedAt: new Date("2025-04-15"),
        createdBy: "Rohit Sharma"
      }
    ],
    versions: [
      {
        id: "ver-003",
        name: "Initial Review",
        timestamp: new Date("2025-03-10"),
        createdBy: "Rohit Sharma",
        tags: ["draft", "high-risk"],
        isPublic: false
      },
      {
        id: "ver-004",
        name: "Post-SEBI Investigation Update",
        timestamp: new Date("2025-04-15"),
        createdBy: "Rohit Sharma",
        tags: ["quarterly", "regulatory"],
        isPublic: true
      }
    ],
    peerComparisons: [
      {
        companyId: "SUNTV",
        companyName: "Sun TV Network",
        governanceScore: 58,
        promoterPledging: 0,
        boardIndependence: 65,
        redFlagsCount: 0
      },
      {
        companyId: "TV18",
        companyName: "Network18 Media",
        governanceScore: 65,
        promoterPledging: 0,
        boardIndependence: 70,
        redFlagsCount: 0
      },
      {
        companyId: "PVR",
        companyName: "PVR INOX",
        governanceScore: 72,
        promoterPledging: 5,
        boardIndependence: 75,
        redFlagsCount: 0
      }
    ],
    linkedReportIds: ["report-003"]
  }
];

export const getBusinessAnalysisByCompany = (companyId: string) => {
  return businessAnalysisSamples.find(analysis => analysis.companyId === companyId);
};

export const getBusinessAnalysisById = (id: string) => {
  return businessAnalysisSamples.find(analysis => analysis.id === id);
};

export const companiesList = [
  { id: "TCS", name: "Tata Consultancy Services", sector: "IT Services" },
  { id: "INFO", name: "Infosys", sector: "IT Services" },
  { id: "WIPRO", name: "Wipro", sector: "IT Services" },
  { id: "HCLTECH", name: "HCL Technologies", sector: "IT Services" },
  { id: "TECHM", name: "Tech Mahindra", sector: "IT Services" },
  { id: "ZEE", name: "Zee Entertainment", sector: "Media & Entertainment" },
  { id: "SUNTV", name: "Sun TV Network", sector: "Media & Entertainment" },
  { id: "TV18", name: "Network18 Media", sector: "Media & Entertainment" },
  { id: "PVR", name: "PVR INOX", sector: "Media & Entertainment" },
  { id: "BHARTIARTL", name: "Bharti Airtel", sector: "Telecommunications" },
  { id: "RELIANCE", name: "Reliance Industries", sector: "Conglomerate" },
  { id: "HDFCBANK", name: "HDFC Bank", sector: "Banking" },
  { id: "ICICIBANK", name: "ICICI Bank", sector: "Banking" },
  { id: "SBIN", name: "State Bank of India", sector: "Banking" }
];

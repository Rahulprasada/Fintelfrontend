import {
  ReportTemplate,
  Alert,
  UserRole,
  User,
  RoleChangeAudit,
  BrokerConnection,
  Order,
  Portfolio
} from "./ToolsModel";


// Report Templates Mock Data
export const reportTemplates: ReportTemplate[] = [
  {
    id: "template-1",
    name: "Standard Equity Research Report",
    description: "Default template for equity research reports",
    createdBy: "Rohit Sharma",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-03-10T14:45:00Z",
    reportType: "Equity",
    sections: [
      {
        id: "sec-1",
        title: "Executive Summary",
        description: "Brief overview of the investment case",
        order: 1,
        required: true,
        content: "Provide a concise summary of your investment thesis and key findings."
      },
      {
        id: "sec-2",
        title: "Investment Rationale",
        description: "Detailed explanation of the investment thesis",
        order: 2,
        required: true,
      },
      {
        id: "sec-3",
        title: "Valuation & Financials",
        description: "Financial analysis and valuation methodology",
        order: 3,
        required: true,
      },
      {
        id: "sec-4",
        title: "Risk Factors",
        description: "Key risks to the investment thesis",
        order: 4,
        required: true,
      }
    ],
    defaultFields: [
      {
        id: "field-1",
        name: "Analyst Name",
        key: "analystName",
        value: "{analyst_name}",
        type: "token"
      },
      {
        id: "field-2",
        name: "Report Date",
        key: "reportDate",
        value: "{current_date}",
        type: "date"
      },
      {
        id: "field-3",
        name: "Disclaimer",
        key: "disclaimer",
        value: "This report is prepared for informational purposes only and should not be considered as investment advice.",
        type: "text"
      }
    ],
    branding: {
      logo: "/assets/logo.png",
      primaryColor: "#4a6bff",
      secondaryColor: "#f0f6ff",
      footerText: "© 2024 FinWise Research. All Rights Reserved.",
      disclaimerText: "SEBI Registration No: INH000001234",
      headerOptions: {
        showLogo: true,
        showTitle: true,
        showDate: true
      }
    },
    version: 2,
    previousVersions: [
      { version: 1, updatedAt: "2024-01-15T10:30:00Z" }
    ]
  },
  {
    id: "template-2",
    name: "ESG Analysis Report",
    description: "Template for ESG-focused research reports",
    createdBy: "Ananya Patel",
    createdAt: "2024-02-20T09:15:00Z",
    updatedAt: "2024-02-20T09:15:00Z",
    reportType: "ESG",
    sections: [
      {
        id: "sec-1",
        title: "ESG Overview",
        description: "Summary of ESG performance",
        order: 1,
        required: true
      },
      {
        id: "sec-2",
        title: "Environmental Factors",
        description: "Analysis of environmental practices and metrics",
        order: 2,
        required: true
      },
      {
        id: "sec-3",
        title: "Social Responsibility",
        description: "Assessment of social initiatives and policies",
        order: 3,
        required: true
      },
      {
        id: "sec-4",
        title: "Governance Structure",
        description: "Evaluation of corporate governance",
        order: 4,
        required: true
      },
      {
        id: "sec-5",
        title: "ESG Scoring & Recommendations",
        description: "Final ESG score and investment recommendations",
        order: 5,
        required: true
      }
    ],
    defaultFields: [
      {
        id: "field-1",
        name: "Analyst Name",
        key: "analystName",
        value: "{analyst_name}",
        type: "token"
      },
      {
        id: "field-2",
        name: "Report Date",
        key: "reportDate",
        value: "{current_date}",
        type: "date"
      },
      {
        id: "field-3",
        name: "ESG Framework",
        key: "esgFramework",
        value: "This report follows the MSCI ESG Rating methodology",
        type: "text"
      }
    ],
    branding: {
      logo: "/assets/logo.png",
      primaryColor: "#34a853",
      secondaryColor: "#e8f5e9",
      footerText: "© 2024 FinWise ESG Research. All Rights Reserved.",
      disclaimerText: "SEBI Registration No: INH000001234",
      headerOptions: {
        showLogo: true,
        showTitle: true,
        showDate: true
      }
    },
    version: 1
  }
];

// Alerts Mock Data
export const alerts: Alert[] = [
  {
    id: "alert-1",
    name: "RSI Overbought Alert",
    description: "Alert when RSI crosses 70 for coverage stocks",
    category: "Market",
    conditions: [
      {
        id: "cond-1",
        field: "RSI",
        operator: ">",
        value: 70
      }
    ],
    notificationMethod: ["in-app", "email"],
    createdBy: "Rohit Sharma",
    createdAt: "2024-03-01T08:30:00Z",
    isActive: true,
    history: [
      {
        id: "hist-1",
        triggeredAt: "2024-03-15T14:22:00Z",
        status: "Acknowledged",
        acknowledgedBy: "Rohit Sharma",
        acknowledgedAt: "2024-03-15T14:35:00Z"
      },
      {
        id: "hist-2",
        triggeredAt: "2024-04-02T10:45:00Z",
        status: "Triggered"
      }
    ]
  },
  {
    id: "alert-2",
    name: "Inflation Rate Alert",
    description: "Alert when India's CPI inflation exceeds 7%",
    category: "Macro",
    conditions: [
      {
        id: "cond-1",
        field: "CPI_Inflation_Rate",
        operator: ">",
        value: 7
      }
    ],
    notificationMethod: ["in-app", "email", "sms"],
    createdBy: "Ananya Patel",
    createdAt: "2024-02-15T11:20:00Z",
    isActive: true
  },
  {
    id: "alert-3",
    name: "ESG Score Drop Alert",
    description: "Alert when any portfolio company's ESG score falls below 50",
    category: "ESG",
    conditions: [
      {
        id: "cond-1",
        field: "ESG_Score",
        operator: "<",
        value: 50
      }
    ],
    notificationMethod: ["in-app", "email"],
    createdBy: "Rohit Sharma",
    createdAt: "2024-03-10T09:45:00Z",
    isActive: false,
    snoozedUntil: "2024-05-15T00:00:00Z"
  },
  {
    id: "alert-4",
    name: "Report Approval Alert",
    description: "Alert when a submitted report is approved",
    category: "Research",
    conditions: [
      {
        id: "cond-1",
        field: "report_status",
        operator: "=",
        value: "Approved"
      }
    ],
    notificationMethod: ["in-app"],
    createdBy: "Vikram Mehta",
    createdAt: "2024-01-25T16:15:00Z",
    isActive: true
  }
];

// User Roles & Permissions Mock Data
export const userRoles: UserRole[] = [
  {
    id: "role-1",
    name: "Analyst",
    description: "Can create research reports and submit for review",
    permissions: [
      { resource: "reports", action: "create" },
      { resource: "reports", action: "read" },
      { resource: "reports", action: "update" },
      { resource: "valuation", action: "create" },
      { resource: "valuation", action: "read" },
      { resource: "valuation", action: "update" },
      { resource: "watchlists", action: "create" },
      { resource: "watchlists", action: "read" },
      { resource: "watchlists", action: "update" },
    ],
    createdAt: "2023-12-01T10:00:00Z",
    updatedAt: "2023-12-01T10:00:00Z"
  },
  {
    id: "role-2",
    name: "Portfolio Manager",
    description: "Can approve research and execute portfolio decisions",
    permissions: [
      { resource: "reports", action: "create" },
      { resource: "reports", action: "read" },
      { resource: "reports", action: "update" },
      { resource: "reports", action: "approve" },
      { resource: "valuation", action: "create" },
      { resource: "valuation", action: "read" },
      { resource: "valuation", action: "update" },
      { resource: "valuation", action: "approve" },
      { resource: "watchlists", action: "create" },
      { resource: "watchlists", action: "read" },
      { resource: "watchlists", action: "update" },
      { resource: "watchlists", action: "delete" },
      { resource: "trading", action: "create" },
      { resource: "trading", action: "read" },
      { resource: "trading", action: "update" },
    ],
    createdAt: "2023-12-01T10:15:00Z",
    updatedAt: "2024-02-10T14:30:00Z"
  },
  {
    id: "role-3",
    name: "Admin",
    description: "Full access to all platform features and settings",
    permissions: [
      { resource: "reports", action: "create" },
      { resource: "reports", action: "read" },
      { resource: "reports", action: "update" },
      { resource: "reports", action: "delete" },
      { resource: "reports", action: "approve" },
      { resource: "valuation", action: "create" },
      { resource: "valuation", action: "read" },
      { resource: "valuation", action: "update" },
      { resource: "valuation", action: "delete" },
      { resource: "valuation", action: "approve" },
      { resource: "watchlists", action: "create" },
      { resource: "watchlists", action: "read" },
      { resource: "watchlists", action: "update" },
      { resource: "watchlists", action: "delete" },
      { resource: "trading", action: "create" },
      { resource: "trading", action: "read" },
      { resource: "trading", action: "update" },
      { resource: "trading", action: "delete" },
      { resource: "users", action: "create" },
      { resource: "users", action: "read" },
      { resource: "users", action: "update" },
      { resource: "users", action: "delete" },
      { resource: "settings", action: "create" },
      { resource: "settings", action: "read" },
      { resource: "settings", action: "update" },
      { resource: "settings", action: "delete" },
    ],
    createdAt: "2023-12-01T10:30:00Z",
    updatedAt: "2023-12-01T10:30:00Z"
  },
  {
    id: "role-4",
    name: "Viewer",
    description: "Read-only access to approved research",
    permissions: [
      { resource: "reports", action: "read" },
      { resource: "valuation", action: "read" },
      { resource: "watchlists", action: "read" },
    ],
    createdAt: "2023-12-01T10:45:00Z",
    updatedAt: "2024-01-15T09:20:00Z"
  }
];

export const users: User[] = [
  {
    id: "user-1",
    name: "Rohit Sharma",
    email: "rohit@finwise.com",
    roleId: "role-2",
    roleName: "Portfolio Manager",
    isActive: true,
    lastLogin: "2024-04-10T08:45:00Z"
  },
  {
    id: "user-2",
    name: "Ananya Patel",
    email: "ananya@finwise.com",
    roleId: "role-1",
    roleName: "Analyst",
    isActive: true,
    lastLogin: "2024-04-09T16:20:00Z"
  },
  {
    id: "user-3",
    name: "Vikram Mehta",
    email: "vikram@finwise.com",
    roleId: "role-3",
    roleName: "Admin",
    isActive: true,
    lastLogin: "2024-04-10T10:15:00Z"
  },
  {
    id: "user-4",
    name: "Priya Singh",
    email: "priya@finwise.com",
    roleId: "role-1",
    roleName: "Analyst",
    isActive: true,
    customPermissions: [
      { resource: "reports", action: "approve" }
    ],
    lastLogin: "2024-04-08T14:30:00Z"
  },
  {
    id: "user-5",
    name: "Ajay Kumar",
    email: "ajay@finwise.com",
    roleId: "role-4",
    roleName: "Viewer",
    isActive: false,
    lastLogin: "2024-03-15T11:25:00Z"
  }
];

export const roleChangeAudits: RoleChangeAudit[] = [
  {
    id: "audit-1",
    userId: "user-4",
    userName: "Priya Singh",
    previousRoleId: "role-1",
    previousRoleName: "Analyst",
    newRoleId: "role-1",
    newRoleName: "Analyst",
    changedBy: "user-3",
    changedAt: "2024-02-12T14:30:00Z"
  },
  {
    id: "audit-2",
    userId: "user-2",
    userName: "Ananya Patel",
    previousRoleId: "role-4",
    previousRoleName: "Viewer",
    newRoleId: "role-1",
    newRoleName: "Analyst",
    changedBy: "user-3",
    changedAt: "2024-01-10T09:45:00Z"
  }
];

// Broker Connections Mock Data
export const brokerConnections: BrokerConnection[] = [
  {
    id: "broker-1",
    userId: "user-1",
    brokerName: "Zerodha",
    accountId: "ZH1234",
    status: "Connected",
    connectionType: "OAuth",
    lastSyncAt: "2024-04-10T08:00:00Z",
    tradingMode: "Live"
  },
  {
    id: "broker-2",
    userId: "user-1",
    brokerName: "Interactive Brokers",
    accountId: "U1234567",
    status: "Connected",
    connectionType: "API Key",
    lastSyncAt: "2024-04-10T08:05:00Z",
    tradingMode: "Paper",
    paperTradingBalance: 1000000
  },
  {
    id: "broker-3",
    userId: "user-3",
    brokerName: "Dhan",
    accountId: "DH5678",
    status: "Error",
    connectionType: "OAuth",
    lastSyncAt: "2024-04-01T10:15:00Z",
    tradingMode: "Live",
    error: "Authentication token expired"
  }
];

export const orders: Order[] = [
  {
    id: "order-1",
    symbol: "INFY",
    quantity: 100,
    price: 1550.75,
    type: "Limit",
    side: "Buy",
    status: "Executed",
    brokerId: "broker-1",
    brokerName: "Zerodha",
    createdAt: "2024-04-09T10:30:00Z",
    executedAt: "2024-04-09T10:30:05Z",
    executionPrice: 1550.50,
    strategyId: "strategy-1"
  },
  {
    id: "order-2",
    symbol: "TCS",
    quantity: 50,
    price: 3800.25,
    type: "Market",
    side: "Buy",
    status: "Executed",
    brokerId: "broker-1",
    brokerName: "Zerodha",
    createdAt: "2024-04-09T11:15:00Z",
    executedAt: "2024-04-09T11:15:02Z",
    executionPrice: 3801.75,
    strategyId: "strategy-1"
  },
  {
    id: "order-3",
    symbol: "HDFCBANK",
    quantity: 75,
    price: 1620.00,
    type: "Limit",
    side: "Sell",
    status: "Failed",
    brokerId: "broker-1",
    brokerName: "Zerodha",
    createdAt: "2024-04-10T09:45:00Z",
    error: "Insufficient holdings"
  },
  {
    id: "order-4",
    symbol: "AAPL",
    quantity: 20,
    price: 172.50,
    type: "Limit",
    side: "Buy",
    status: "Pending",
    brokerId: "broker-2",
    brokerName: "Interactive Brokers",
    createdAt: "2024-04-10T15:30:00Z",
    strategyId: "strategy-2"
  }
];

export const portfolios: Portfolio[] = [
  {
    userId: "user-1",
    brokerConnectionId: "broker-1",
    holdings: [
      {
        symbol: "INFY",
        quantity: 100,
        averagePrice: 1550.50,
        currentPrice: 1575.25,
        value: 157525,
        pnl: 2475,
        pnlPercent: 1.59
      },
      {
        symbol: "TCS",
        quantity: 50,
        averagePrice: 3801.75,
        currentPrice: 3850.00,
        value: 192500,
        pnl: 2412.5,
        pnlPercent: 1.27
      },
      {
        symbol: "RELIANCE",
        quantity: 30,
        averagePrice: 2450.25,
        currentPrice: 2505.75,
        value: 75172.5,
        pnl: 1665,
        pnlPercent: 2.27
      }
    ],
    lastSyncAt: "2024-04-10T08:00:00Z"
  },
  {
    userId: "user-1",
    brokerConnectionId: "broker-2",
    holdings: [
      {
        symbol: "AAPL",
        quantity: 50,
        averagePrice: 170.25,
        currentPrice: 173.75,
        value: 8687.5,
        pnl: 175,
        pnlPercent: 2.06
      },
      {
        symbol: "MSFT",
        quantity: 25,
        averagePrice: 380.50,
        currentPrice: 390.25,
        value: 9756.25,
        pnl: 243.75,
        pnlPercent: 2.56
      }
    ],
    lastSyncAt: "2024-04-10T08:05:00Z"
  }
];

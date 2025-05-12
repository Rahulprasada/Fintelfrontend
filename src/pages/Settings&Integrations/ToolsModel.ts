export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  reportType: ReportType;
  sections: TemplateSection[];
  defaultFields: DefaultField[];
  branding: BrandingOptions;
  version: number;
  previousVersions?: { version: number; updatedAt: string }[];
}

export type ReportType = "Equity" | "ESG" | "Macro" | "Custom";

export interface TemplateSection {
  id: string;
  title: string;
  description?: string;
  order: number;
  required: boolean;
  content?: string;
}

export interface DefaultField {
  id: string;
  name: string;
  key: string;
  value: string;
  type: "text" | "date" | "token" | "image";
}

export interface BrandingOptions {
  logo?: string;
  primaryColor: string;
  secondaryColor?: string;
  footerText: string;
  disclaimerText: string;
  headerOptions: {
    showLogo: boolean;
    showTitle: boolean;
    showDate: boolean;
  };
}

// Alert Manager models
export interface Alert {
  id: string;
  name: string;
  description?: string;
  category: AlertCategory;
  conditions: AlertCondition[];
  notificationMethod: NotificationMethod[];
  createdBy: string;
  createdAt: string;
  isActive: boolean;
  snoozedUntil?: string;
  history?: AlertHistory[];
}

export type AlertCategory = "Research" | "Market" | "Macro" | "ESG" | "Portfolio" | "System";

export interface AlertCondition {
  id: string;
  field: string;
  operator: ">" | "<" | "=" | ">=" | "<=" | "!=" | "contains" | "not_contains";
  value: string | number | boolean;
}

export type NotificationMethod = "in-app" | "email" | "sms";

export interface AlertHistory {
  id: string;
  triggeredAt: string;
  status: "Triggered" | "Acknowledged" | "Resolved";
  acknowledgedBy?: string;
  acknowledgedAt?: string;
}

// User Roles & Permissions models
export interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  resource: string;
  action: PermissionAction;
}

export type PermissionAction = "create" | "read" | "update" | "delete" | "approve";

export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  roleName: string;
  isActive: boolean;
  customPermissions?: Permission[];
  lastLogin?: string;
}

export interface RoleChangeAudit {
  id: string;
  userId: string;
  userName: string;
  previousRoleId: string;
  previousRoleName: string;
  newRoleId: string;
  newRoleName: string;
  changedBy: string;
  changedAt: string;
}

// Broker API Integrations models
export interface BrokerConnection {
  id: string;
  userId: string;
  brokerName: string;
  accountId: string;
  status: "Connected" | "Disconnected" | "Error";
  connectionType: "OAuth" | "API Key";
  lastSyncAt?: string;
  tradingMode: "Paper" | "Live";
  paperTradingBalance?: number;
  error?: string;
}

export interface Order {
  id: string;
  symbol: string;
  quantity: number;
  price: number;
  type: "Market" | "Limit";
  side: "Buy" | "Sell";
  status: "Pending" | "Executed" | "Cancelled" | "Failed";
  brokerId: string;
  brokerName: string;
  createdAt: string;
  executedAt?: string;
  executionPrice?: number;
  strategyId?: string;
  error?: string;
}

export interface Portfolio {
  userId: string;
  brokerConnectionId: string;
  holdings: PortfolioHolding[];
  lastSyncAt: string;
}

export interface PortfolioHolding {
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice?: number;
  value?: number;
  pnl?: number;
  pnlPercent?: number;
}

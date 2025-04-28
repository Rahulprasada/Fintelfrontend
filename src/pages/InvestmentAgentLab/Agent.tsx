export interface Agent {
    id: string;
    name: string;
    style: string;
    description: string;
    avatar: string;
    bio: string;
    rules: string[];
    holdingPeriod: string;
    strengths: string[];
    weaknesses: string[];
    historicalAlpha: string;
    filters: {
      [key: string]: string | number;
    };
  }
  
  export interface AgentSet {
    id: string;
    name: string;
    agentIds: string[];
    createdAt: Date;
  }
  
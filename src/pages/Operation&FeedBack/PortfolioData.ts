import { Watchlist,ResearchSubmission, ResearchVersion, Comment } from "./PortfolioModel";

export const watchlists: Watchlist[] = [
  {
    id: "wl1",
    name: "High Conviction Midcaps - FY26",
    description: "Midcap companies with strong growth potential for FY26",
    items: [
      {
        id: "item1",
        ticker: "TCS.NS",
        companyName: "Tata Consultancy Services",
        sector: "Technology",
        coverageStatus: "Under Coverage",
        priority: true,
        notes: "Waiting for Q1 results to update model",
        addedDate: "2024-04-15T10:30:00Z",
        addedBy: "Rohit Sharma",
        customFields: {
          strategy: "Long-term growth",
          focus: "Digital transformation"
        }
      },
      {
        id: "item2",
        ticker: "INFY.NS",
        companyName: "Infosys Limited",
        sector: "Technology",
        coverageStatus: "Under Coverage",
        priority: true,
        notes: "Monitoring new leadership transition",
        addedDate: "2024-04-10T11:20:00Z",
        addedBy: "Rohit Sharma"
      },
      {
        id: "item3",
        ticker: "HDFCBANK.NS",
        companyName: "HDFC Bank",
        sector: "Banking",
        coverageStatus: "Under Coverage",
        priority: true,
        notes: "Anticipating merger synergy benefits",
        addedDate: "2024-03-22T09:15:00Z",
        addedBy: "Priya Kapoor"
      },
      {
        id: "item4",
        ticker: "BAJFINANCE.NS",
        companyName: "Bajaj Finance",
        sector: "Financial Services",
        coverageStatus: "Watch Only",
        priority: false,
        notes: "Valuation concerns at current levels",
        addedDate: "2024-03-18T14:40:00Z",
        addedBy: "Rohit Sharma"
      },
      {
        id: "item5",
        ticker: "ADANIENT.NS",
        companyName: "Adani Enterprises",
        sector: "Diversified",
        coverageStatus: "Dropped",
        priority: false,
        notes: "Governance concerns persist",
        addedDate: "2024-02-05T16:30:00Z",
        addedBy: "Priya Kapoor"
      }
    ],
    createdBy: "Rohit Sharma",
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-04-18T11:30:00Z",
    sharedWith: ["Priya Kapoor", "Vikram Singh"]
  },
  {
    id: "wl2",
    name: "Renewable Energy Plays",
    description: "Companies positioned for energy transition",
    items: [
      {
        id: "item6",
        ticker: "NTPC.NS",
        companyName: "NTPC Limited",
        sector: "Power",
        coverageStatus: "Under Coverage",
        priority: true,
        notes: "Green hydrogen pivot looks promising",
        addedDate: "2024-03-10T09:30:00Z",
        addedBy: "Rohit Sharma"
      },
      {
        id: "item7",
        ticker: "TATAPOWER.NS",
        companyName: "Tata Power",
        sector: "Power",
        coverageStatus: "Under Coverage",
        priority: false,
        notes: "Solar scale-up progress to be monitored",
        addedDate: "2024-03-12T13:45:00Z",
        addedBy: "Vikram Singh"
      }
    ],
    createdBy: "Vikram Singh",
    createdAt: "2024-02-20T14:15:00Z",
    updatedAt: "2024-03-15T10:45:00Z",
    sharedWith: ["Rohit Sharma"]
  }
];

export const researchSubmissions: ResearchSubmission[] = [
  {
    id: "rs1",
    title: "TCS Q4 FY24 Results Analysis",
    type: "Report",
    description: "Comprehensive analysis of TCS Q4 results with valuation update",
    submittedBy: "Rohit Sharma",
    submittedAt: "2024-04-16T15:30:00Z",
    reviewerId: "Vikram Singh",
    status: "Approved",
    reviewedAt: "2024-04-17T11:20:00Z",
    feedback: "Good analysis. Approved with minor suggestions in comments.",
    documentUrl: "/documents/tcs-q4-analysis.pdf",
    version: "1.2",
    tags: ["IT Services", "Quarterly Results"],
    company: "Tata Consultancy Services",
    sector: "Technology"
  },
  {
    id: "rs2",
    title: "Infosys DCF Update - Post Q4",
    type: "Valuation",
    description: "Updated DCF model for Infosys reflecting Q4 performance",
    submittedBy: "Priya Kapoor",
    submittedAt: "2024-04-15T09:45:00Z",
    status: "Pending Review",
    documentUrl: "/documents/infosys-dcf-update.xlsx",
    version: "1.0",
    tags: ["IT Services", "DCF", "Valuation"],
    company: "Infosys Limited",
    sector: "Technology"
  },
  {
    id: "rs3",
    title: "HDFC Bank - Merger Impact Analysis",
    type: "Analysis",
    description: "Deep dive into HDFC-HDFC Bank merger synergies and impacts",
    submittedBy: "Rohit Sharma",
    submittedAt: "2024-03-28T16:15:00Z",
    reviewerId: "Vikram Singh",
    status: "Revision Requested",
    reviewedAt: "2024-03-30T10:30:00Z",
    feedback: "Please update NIM projections based on the latest management commentary",
    documentUrl: "/documents/hdfc-merger-analysis.pdf",
    version: "1.1",
    tags: ["Banking", "Merger Analysis"],
    company: "HDFC Bank",
    sector: "Banking"
  }
];

export const researchVersions: ResearchVersion[] = [
  {
    id: "v1",
    parentId: "rs1",
    version: "1.0",
    title: "TCS Q4 FY24 Results Analysis - Initial Draft",
    documentUrl: "/documents/tcs-q4-analysis-v1.pdf",
    createdBy: "Rohit Sharma",
    createdAt: "2024-04-15T14:20:00Z",
    status: "Draft",
    notes: "Initial draft for internal review"
  },
  {
    id: "v2",
    parentId: "rs1",
    version: "1.1",
    title: "TCS Q4 FY24 Results Analysis - Review Draft",
    documentUrl: "/documents/tcs-q4-analysis-v1.1.pdf",
    createdBy: "Rohit Sharma",
    createdAt: "2024-04-16T10:30:00Z",
    status: "Submitted",
    notes: "Updated with peer comparison section"
  },
  {
    id: "v3",
    parentId: "rs1",
    version: "1.2",
    title: "TCS Q4 FY24 Results Analysis - Final",
    documentUrl: "/documents/tcs-q4-analysis-v1.2.pdf",
    createdBy: "Rohit Sharma",
    createdAt: "2024-04-16T15:30:00Z",
    status: "Approved",
    notes: "Final version with all PM feedback incorporated"
  },
  {
    id: "v4",
    parentId: "rs3",
    version: "1.0",
    title: "HDFC Bank - Merger Impact Analysis - Initial",
    documentUrl: "/documents/hdfc-merger-analysis-v1.pdf",
    createdBy: "Rohit Sharma",
    createdAt: "2024-03-27T11:45:00Z",
    status: "Draft",
    notes: "First draft for internal review"
  },
  {
    id: "v5",
    parentId: "rs3",
    version: "1.1",
    title: "HDFC Bank - Merger Impact Analysis - Submitted",
    documentUrl: "/documents/hdfc-merger-analysis-v1.1.pdf",
    createdBy: "Rohit Sharma",
    createdAt: "2024-03-28T16:15:00Z",
    status: "Rejected",
    notes: "NIM projections need updates"
  }
];

export const comments: Comment[] = [
  {
    id: "c1",
    documentId: "rs1",
    section: "Valuation Section",
    content: "Please revise the terminal growth rate assumption to match our house view of 4%",
    createdBy: "Vikram Singh",
    createdAt: "2024-04-16T16:45:00Z",
    status: "Resolved",
    replies: [
      {
        id: "r1",
        commentId: "c1",
        content: "Updated the terminal growth rate to 4% as per house view",
        createdBy: "Rohit Sharma",
        createdAt: "2024-04-16T17:30:00Z"
      },
      {
        id: "r2",
        commentId: "c1",
        content: "Confirmed. This looks good now.",
        createdBy: "Vikram Singh",
        createdAt: "2024-04-17T09:15:00Z"
      }
    ]
  },
  {
    id: "c2",
    documentId: "rs3",
    section: "NIM Projection",
    content: "The NIMs seem optimistic considering the recent RBI guidance. Please recalibrate.",
    createdBy: "Vikram Singh",
    createdAt: "2024-03-30T10:25:00Z",
    status: "Open",
    replies: [
      {
        id: "r3",
        commentId: "c2",
        content: "I'll adjust these based on the latest management call transcript",
        createdBy: "Rohit Sharma",
        createdAt: "2024-03-30T11:40:00Z"
      }
    ]
  },
  {
    id: "c3",
    documentId: "rs3",
    section: "Executive Summary",
    content: "Please add a note about the regulatory approval timeline",
    createdBy: "Vikram Singh",
    createdAt: "2024-03-30T10:35:00Z",
    status: "Open",
    replies: []
  }
];

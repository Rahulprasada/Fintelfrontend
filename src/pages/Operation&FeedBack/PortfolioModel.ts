export interface WatchlistItem {
  id: string;
  ticker: string;
  companyName: string;
  sector: string;
  coverageStatus: 'Under Coverage' | 'Watch Only' | 'Dropped';
  priority: boolean;
  notes: string;
  addedDate: string;
  addedBy: string;
  customFields?: Record<string, string>;
}

export interface Watchlist {
  id: string;
  name: string;
  description?: string;
  items: WatchlistItem[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  sharedWith: string[];
}

export interface ResearchSubmission {
  id: string;
  title: string;
  type: 'Report' | 'Valuation' | 'Analysis' | 'Note';
  description: string;
  submittedBy: string;
  submittedAt: string;
  reviewerId?: string;
  status: 'Draft' | 'Pending Review' | 'Approved' | 'Rejected' | 'Revision Requested';
  reviewedAt?: string;
  feedback?: string;
  documentUrl: string;
  version: string;
  tags: string[];
  company?: string;
  sector?: string;
}

export interface ResearchVersion {
  id: string;
  parentId: string;
  version: string;
  title: string;
  documentUrl: string;
  createdBy: string;
  createdAt: string;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
  notes?: string;
}

export interface Comment {
  id: string;
  documentId: string;
  section?: string;
  content: string;
  createdBy: string;
  createdAt: string;
  status: 'Open' | 'Resolved' | 'Archived';
  replies: Reply[];
}

export interface Reply {
  id: string;
  commentId: string;
  content: string;
  createdBy: string;
  createdAt: string;
}

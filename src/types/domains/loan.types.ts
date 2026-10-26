import { Signature } from "../types";


export type VerificationDocument = {
  _id?: string;
  id?: string;
  type: string;
  documentId?: string;
  mime?: string;
  url?: string;
  documentURL?: string;
};

export type Guarantor = {
  _id: string;
  fullName: string;
  phoneNumber: string;
  relationship: string;
  bvn: string;
  email: string;
  verified: boolean;
  guarantorId: string;
  documentsRequired: string[];
  verificationDocuments: VerificationDocument[];
};

export type LoanGuarantorProps = {
  guarantors: Guarantor[];
  signature?: Signature

  onAddDocument?: (guarantor: Guarantor) => void;
  onRemoveDocument?: (
    guarantor: Guarantor,
    document: VerificationDocument
  ) => void;
};


export type LoanDuration = "today" | "7 days" | "30 days" | "all" | "custom"

export type LoanStatus = 'pending' | 'disbursed-bank' | 'rejected';

export interface GetLoansParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: LoanStatus;
  startDate?: string;
  endDate?: string;
  duration?: LoanDuration;
}


export interface Loan {
  loanId: string;
  loanProfileId: {
    firstName: string;
    lastName: string;
  };
  appliedAt: string;
  amount: number;
  interestAmount: number;
  status: LoanStatus;
}

export interface LoanFilters {
  search: string;
  status: LoanStatus | 'all';
  startDate: string;
  endDate: string;
  duration: LoanDuration
}

export type RepaymentTimeframe =
  | 'today'
  | 'yesterday'
  | 'last7days'
  | 'last30days'
  | 'custom';

export type RepaymentStatus =
  | 'pending'
  | 'paid'
  | 'late'
  | 'partially_paid'
  | 'all';

export type RepaymentSortBy =
  | 'dueDate'
  | 'amount'
  | 'status'
  | 'paidAt';

export type SortOrder = 'asc' | 'desc';

export interface RepaymentQuery {
  timeframe?: RepaymentTimeframe;
  status?: RepaymentStatus;
  search?: string;
  sortBy?: RepaymentSortBy;
  sortOrder?: SortOrder;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}


export interface LoanRepayment {
  _id: string;
  repaymentId: string;
  loanId: string;
  userId: string;
  appliedBy: string;

  amount: number;
  paidAmount: number;
  accruedAmount: number;

  status: string;
  dueDate: string;
  paidAt?: string | null;
  createdAt: string;
  updatedAt: string;

  user?: {
    userId: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  } | null;

  applicant?: {
    userId: string;
    username: string;
    walletName: string;
    phoneNumber: string;
  } | null;

  loan?: {
    loanId: string;
    status: string;
    totalAmount: number;
  } | null;

  agent?: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
  } | null;
}

export interface RepaymentSummary {
  paidCount: number;
  pendingCount: number;
  totalCollectedAmount: number;
  totalCount: number;
  totalDueAmount: number;
  totalPendingAmount: number;
}

export interface RepaymentPagination {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface RepaymentListingData {
  repayments: LoanRepayment[];
  summary: RepaymentSummary;
  filter: {
    agentId: string | null;
    startDate: string;
    endDate: string;
    status: string;
    timeframe: string;
  };
}

export interface RepaymentListingResponse {
  data: RepaymentListingData;
  pagination: RepaymentPagination;
}

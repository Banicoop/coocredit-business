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


export type LoanStatus = 'pending' | 'disbursed-bank' | 'rejected';

export interface GetLoansParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: LoanStatus;
  startDate?: string;
  endDate?: string;
}

// export interface PaginationMeta {
//   page: number;
//   totalPages: number;
//   total: number;
//   limit?: number;
//   pageSize?: number;
// }

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

// export interface GetLoansResponse {
//   success?: boolean;
//   data: Loan[];
//   pagination: PaginationMeta;
//   error?: string;
// }

export interface LoanFilters {
  search: string;
  status: LoanStatus | 'all';
  startDate: string;
  endDate: string;
}

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



export interface Transaction {
  _id: string;
  userId: string;
  transactionId: number;
  transactionReference: string;
  processorResponseCode: string;
  processorResponseReference: string;
  transactionStatus: string;

  transactionAmount: number;
  transactionValueAmount: number;
  transactionFeeAmount: number;

  beneficiaryAccountName: string;
  beneficiaryAccountNumber: string;
  beneficiaryBankName: string;
  beneficiaryBankCode: string;

  senderAccountName: string;
  senderAccountNumber: string;
  senderBankName: string;
  senderBankCode: string;

  narration: string;
  transactionMode: string;
  transactionType: string;
  transactionEvent: string;

  transactionStartDate: string;
  transactionEndDate: string;

  transactionFees: unknown[];

  bonusPotCreditAmount: number;
  bonusPotDebitAmount: number;
  purchaseToken: string;

  createdAt: string;
  updatedAt: string;
}

export type Commission = {
  _id: string;
  taskType?: 'disbursement_commission' | 'repayment_commission' | string;
  amount: number;
  rewardPoints: number;
  loanId?: string;
  repaymentId?: string;
  status: string;
  calculatedAt: string;
  payableAt?: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    LastName?: string;
    product?: string;
    userId?: string;
  };
};

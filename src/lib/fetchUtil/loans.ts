'use server';

import { getData } from "../api";

export type LoanStatus = 'pending' | 'approved' | 'rejected';

export interface GetLoansParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: LoanStatus;
  startDate?: string;
  endDate?: string;
}

export const getAllLoans = async (
  params: GetLoansParams = {}
) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== ''
    ) {
      query.set(key, String(value));
    }
  });

  const url = `admin/loans/business?${query.toString()}`;

  return getData(url);
};

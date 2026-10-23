'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getAllLoans, getDailyRepayments } from '../fetchUtil/loans';
import { loanQueryKeys } from './queries/keys';
import { GetLoansParams, RepaymentQuery } from '@/types/domains/loan.types';


export const useGetAllLoans = (
  params: GetLoansParams = {}
) => {
  return useQuery({
    queryKey: loanQueryKeys.list(params),

    queryFn: async () => {
      const response = (await getAllLoans(params) as any);

      if (!response || response.error) {
        throw new Error(
          response?.error || 'Failed to fetch loans'
        );
      }

      return response;
    },

    placeholderData: keepPreviousData,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useGetDailyRepayment = (
  query: RepaymentQuery = {}
) => {
  const isCustom = query.timeframe === 'custom';

  const canFetch =
    !isCustom ||
    (
      Boolean(query.startDate) &&
      Boolean(query.endDate) &&
      query.startDate! <= query.endDate!
    );

  return useQuery({
    queryKey: ['repayments', query],

    queryFn: async () => {
      const res = await getDailyRepayments(query) as any;

      if (!res || res.error || res.success === false) {
        throw new Error(
          res?.error ||
          res?.message ||
          'Failed to fetch repayments'
        );
      }

      return res;
    },

    enabled: canFetch,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};


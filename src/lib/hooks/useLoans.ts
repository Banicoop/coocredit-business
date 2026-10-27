'use client';

import { keepPreviousData, useQuery, useMutation, useQueryClient  } from '@tanstack/react-query';
import { getAllLoans, getDailyRepayments } from '../fetchUtil/loans';
import { loanQueryKeys } from './queries/keys';
import { GetLoansParams, RepaymentQuery } from '@/types/domains/loan.types';
import { approveBusinessLoans, rejectBusinessLoans } from '../manager.actions';
import { unwrap } from '../api';

type LoanActionInput = {
  loanId: string;
};

type RejectLoanInput = LoanActionInput & {
  reason?: string;
};



export const useGetAllLoans = (
  params: GetLoansParams = {},
) => {
  const duration= params.duration ?? 'all';
  const isCustom = duration === 'custom';

  const canFetch =
    !isCustom ||
    (!!params.startDate &&
      !!params.endDate &&
      params.startDate <= params.endDate);

  const queryParams: GetLoansParams = {
    ...params,
    duration,
    ...(isCustom
      ? {}
      : {
          startDate: undefined,
          endDate: undefined,
        }),
  };

  return useQuery({
    queryKey: loanQueryKeys.list(queryParams),

    queryFn: async () => {
      const response = await getAllLoans(queryParams) as any;

      if (!response || response.error) {
        throw new Error(
          response?.error || 'Failed to fetch loans',
        );
      }

      return response;
    },

    placeholderData: keepPreviousData,
    enabled: canFetch,
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




const invalidateLoanQueries = async (
  queryClient: ReturnType<typeof useQueryClient>,
  loanId: string,
) => {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: ['loans'],
    }),
    queryClient.invalidateQueries({
      queryKey: ['loan', loanId],
    }),
  ]);
};

export const useApproveBusinessLoan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ loanId }: LoanActionInput) =>
      unwrap(approveBusinessLoans({ loanId })),

    onSuccess: async (_data, { loanId }) => {
      await invalidateLoanQueries(queryClient, loanId);
    },
  });
};

export const useRejectBusinessLoan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ loanId, reason }: RejectLoanInput) =>
      unwrap(rejectBusinessLoans({ loanId, reason })),

    onSuccess: async (_data, { loanId }) => {
      await invalidateLoanQueries(queryClient, loanId);
    },
  });
};


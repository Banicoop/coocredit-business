'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getAllLoans, GetLoansParams } from '../fetchUtil/loans';

export const loanQueryKeys = {
  all: ['loans'] as const,

  lists: () => [...loanQueryKeys.all, 'list'] as const,

  list: (params: GetLoansParams) =>
    [...loanQueryKeys.lists(), params] as const,
};

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


'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getAllCustomers, GetCustomersParams } from '../fetchUtil/customers';


export const loanQueryKeys = {
  all: ['customers'] as const,

  lists: () => [...loanQueryKeys.all, 'list'] as const,

  list: (params: GetCustomersParams) =>
    [...loanQueryKeys.lists(), params] as const,
};

export const useGetAllCustomers = (
  params: GetCustomersParams = {}
) => {
  return useQuery({
    queryKey: loanQueryKeys.list(params),

    queryFn: async () => {
      const response = (await getAllCustomers(params) as any);

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


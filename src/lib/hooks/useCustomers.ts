'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getAllCustomers, getAllLeads, GetCustomersParams, GetLeadsParams,  } from '../fetchUtil/customers';


export const customersQueryKeys = {
  all: ['customers'] as const,

  lists: () => [...customersQueryKeys.all, 'customers'] as const,

  list: (params: GetCustomersParams) =>
    [...customersQueryKeys.lists(), params] as const,
};

export const leadsQueryKeys = {
  all: ['leads'] as const,

  lists: () => [...leadsQueryKeys.all, 'leads'] as const,

  list: (params: GetLeadsParams) =>
    [...leadsQueryKeys.lists(), params] as const,
};


export const useGetAllCustomers = (
  params: GetCustomersParams = {}
) => {
  return useQuery({
    queryKey: customersQueryKeys.list(params),

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


export const useGetAllLeads = (
  params: GetLeadsParams = {}
) => {
  return useQuery({
    queryKey: leadsQueryKeys.list(params),

    queryFn: async () => {
      const response = (await getAllLeads(params) as any);

      if (!response || response.error) {
        throw new Error(
          response?.error || 'Failed to fetch leads'
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


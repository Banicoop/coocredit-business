'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getAllCustomers, getAllLeads, GetCustomersParams, GetLeadsParams,  } from '../fetchUtil/customers';
import { customersQueryKeys, leadsQueryKeys } from './queries/keys';


export const useGetAllCustomers = (params: GetCustomersParams = {}) => {
  return useQuery({
    queryKey: ["customers", params],
    queryFn: () => getAllCustomers(params),
    placeholderData: (previousData) => previousData,
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


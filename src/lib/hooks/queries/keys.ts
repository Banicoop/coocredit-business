import { GetCustomersParams, GetLeadsParams } from "@/lib/fetchUtil/customers";
import { GetLoansParams } from "@/types/domains/loan.types";


export const loanQueryKeys = {
  all: ['loans'] as const,

  lists: () => [...loanQueryKeys.all, 'list'] as const,

  list: (params: GetLoansParams) =>
    [...loanQueryKeys.lists(), params] as const,
};

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

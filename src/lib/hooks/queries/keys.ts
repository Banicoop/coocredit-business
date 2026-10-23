import { GetLoansParams } from "@/types/domains/loan.types";


export const loanQueryKeys = {
  all: ['loans'] as const,

  lists: () => [...loanQueryKeys.all, 'list'] as const,

  list: (params: GetLoansParams) =>
    [...loanQueryKeys.lists(), params] as const,
};

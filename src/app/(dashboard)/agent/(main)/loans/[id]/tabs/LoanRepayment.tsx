"use client";

import LoanRepayment from "@/components/ui/loans/LoanRepayment";
import { loanRepaymentSummary } from "@/types/domains/loan.types";
import { PaginationMeta } from "@/types/types";
import { useParams } from "next/navigation";


const LoanRepaymentTab = ({ repayments, summary, pagination }: {repayments: any, summary: loanRepaymentSummary, pagination: PaginationMeta}) => {

  const { id } = useParams()

  return (
    <LoanRepayment
      repayments={repayments}
      pagination={pagination}
      summary={summary}
      href={`/agent/loans/${id}`}
    />
  );
};

export default LoanRepaymentTab;

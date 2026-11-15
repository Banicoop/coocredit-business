"use client";

import LoanRepayment from "@/components/ui/loans/LoanRepayment";
import { useParams } from "next/navigation";


const LoanRepaymentTab = ({ repayments, summary }: {repayments: any, summary: any}) => {

  const { id } = useParams()

  return (
    <LoanRepayment
      repayments={repayments}
      summary={summary}
      href={`/agent/loans/${id}`}
    />
  );
};

export default LoanRepaymentTab;

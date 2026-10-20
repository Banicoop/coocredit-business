"use client";

import LoanRepayment from "@/components/ui/loans/LoanRepayment";
import { useParams } from "next/navigation";


const LoanRepaymentTab = ({ repayments }: {repayments: any}) => {

  const { id } = useParams()

  return (
    <LoanRepayment
      repayments={repayments}
      href={`/agent/loans/${id}`}
    />
  );
};

export default LoanRepaymentTab;

'use client';

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { BackButton } from "@/components/primitives/buttons/BackButton";
import { FlexCol } from "@/components/ui/ui-layout";
// import { newLoanAction } from "@/lib/actions/agent.actions";
import { LoanApplicationPayload } from "@/schema/loan.schema";
import NewLoanApplication from "../_sections/NewLoanApplication";
import { CardSkeleton } from "@/helpers/skeleton";
import { useNewLoan } from "@/lib/hooks/useLoans";

const LoanApplicationContent = () => {
  const searchParams = useSearchParams();

  const customerId = searchParams.get('customerId');
  const businessId = searchParams.get('businessId');

  if (!customerId || !businessId) return null;

  const { mutate, isPending } = useNewLoan();

  const handleSubmit = async (payload: LoanApplicationPayload) => {
    mutate(payload, {
      onSuccess: (response) => {
        toast.success(response.message);
      },

      onError: (error) => {
        toast.error(error.message || "Loan application failed.");
      },
    });
  };

  return (
    <FlexCol className="gap-6">
      <BackButton label="Back" />
      <NewLoanApplication
        userId={customerId}
        businessId={businessId}
        onSubmit={handleSubmit}
      />
    </FlexCol>
  );
};

const LoanApplicationPage = () => (
  <Suspense fallback={<CardSkeleton />}>
    <LoanApplicationContent />
  </Suspense>
);

export default LoanApplicationPage;

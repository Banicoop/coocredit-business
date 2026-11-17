'use client';

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { BackButton } from "@/components/primitives/buttons/BackButton";
import { FlexCol } from "@/components/ui/ui-layout";
import { newLoanAction } from "@/lib/actions/agent.actions";
import { LoanApplicationPayload } from "@/schema/loan.schema";
import NewLoanApplication from "../_sections/NewLoanApplication";
import { CardSkeleton } from "@/helpers/skeleton";

const LoanApplicationContent = () => {
  const searchParams = useSearchParams();

  const customerId = searchParams.get('customerId');
  const businessId = searchParams.get('businessId');

  if (!customerId || !businessId) return null;

  const applyLoan = async (payload: LoanApplicationPayload) => {
    try {
      const res = await newLoanAction(payload);
      if (!res.data) {
        toast.error(res.error);
        return;
      }
      toast.success(res.message);
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <FlexCol className="gap-6">
      <BackButton label="Back" />
      <NewLoanApplication
        userId={customerId}
        businessId={businessId}
        onSubmit={applyLoan}
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

'use client';

import { BackButton } from "@/components/primitives/buttons/BackButton";
import { FlexCol } from "@/components/ui/ui-layout";
import { useSearchParams } from "next/navigation";
import { newLoanAction } from "@/lib/actions/agent.actions";
import { LoanApplicationPayload } from "@/schema/loan.schema";
import { toast } from "sonner";
import NewLoanApplication from "../_sections/NewLoanApplication";

const LoanApplicationPage = () => {

    const searchParams = useSearchParams();

    const bussinessId = searchParams.get('customerId');
    const customerId = searchParams.get('businessId');

    if(!customerId || !bussinessId) return null;
    
    const applyLoan = async (payload: LoanApplicationPayload) => {
      try {
        const res = await newLoanAction(payload);
        if(!res.data){
          toast.error(res.error);
          return
        }
        toast.success(res.message)
      } catch (error) {
         toast.error('Something went wrong!');
      }
    }

  return (
    <FlexCol className="gap-6">
        <BackButton label='Back'/>

        <NewLoanApplication userId={customerId} businessId={bussinessId} onSubmit={applyLoan}/>
    </FlexCol>
  )
}

export default LoanApplicationPage

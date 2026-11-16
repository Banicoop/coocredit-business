'use client';

import { BackButton } from "@/components/primitives/buttons/BackButton";
import { FlexCol } from "@/components/ui/ui-layout";
import { useParams } from "next/navigation";
import NewLoanApplication from "../../../_sections/NewLoanApplication";
import { newLoanAction } from "@/lib/actions/agent.actions";
import { LoanApplicationPayload } from "@/schema/loan.schema";
import { toast } from "sonner";

const LoanApplicationPage = () => {
    const { id } = useParams<{id: string}>();

    if(!id) return null;
    
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

        <NewLoanApplication userId={id} businessId={id} onSubmit={applyLoan}/>
    </FlexCol>
  )
}

export default LoanApplicationPage

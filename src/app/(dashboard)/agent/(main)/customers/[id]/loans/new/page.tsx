'use client';

import { BackButton } from "@/components/primitives/buttons/BackButton";
import { FlexCol } from "@/components/ui/ui-layout";
import { useParams } from "next/navigation";
import NewLoanApplication from "../../../_sections/NewLoanApplication";

const LoanApplicationPage = () => {
    const { id } = useParams<{id: string}>();

    if(!id) return null;

  return (
    <FlexCol className="gap-6">
        <BackButton label='Back'/>

        <NewLoanApplication userId={id} businessId="" onSubmit={async() => {}}/>
    </FlexCol>
  )
}

export default LoanApplicationPage

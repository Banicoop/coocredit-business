import { BackButton } from '@/components/primitives/buttons/BackButton';
import RepaymentBreakdown from '@/components/tables/LoanRepayment';
import LoanRepayment from '@/components/ui/loans/LoanRepayment';
import { FlexCol } from '@/components/ui/ui-layout';
import { agentGetLoanRepayment } from '@/lib/api.agent';
import { IDParam } from '@/types/types';


const LoanRepaymentHistory = async ({params}: IDParam) => {

  const { id} = await params;

  const res = await agentGetLoanRepayment(id) as any;

  const { data: repayment, error} = res;

    if (!repayment || error) {
      return (
        <FlexCol className="gap-4">
          <BackButton />
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm font-medium text-slate-500">{error}</p>
          </div>
        </FlexCol>
      );
    }
  
  return (
    <FlexCol className='gap-6'>
        <BackButton />

        <LoanRepayment repayments={repayment} href={`/manager/portfolio/${id}`}/>

        {/* <RepaymentBreakdown repayments={repayment} /> */}
    </FlexCol>
  )
}

export default LoanRepaymentHistory;

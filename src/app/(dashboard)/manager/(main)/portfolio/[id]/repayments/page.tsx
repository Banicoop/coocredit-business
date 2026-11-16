import { BackButton } from '@/components/primitives/buttons/BackButton';
import LoanRepayment from '@/components/ui/loans/LoanRepayment';
import { FlexCol } from '@/components/ui/ui-layout';
import { agentGetLoanRepayment } from '@/lib/api.agent';
import { LoanRepaymentHistoryProps } from '@/types/domains/loan.types';



const LoanRepaymentHistory = async ({params}: LoanRepaymentHistoryProps) => {

  const search = await params;

  const page = Math.max(
    Number(search.page) || 1,
    1
  );

  const size = Math.max(
    Number(search.size) || 50,
    1
  );
  const res = await agentGetLoanRepayment(search.id, {
    page, size
  }) as any;
  const pagination = res.pagination

  const { data: repayment, error} = res;


    if (res.error) {
      return (
        <FlexCol className="gap-4">
          <BackButton />
          {/* <CardError/> */}
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm font-medium text-slate-500">{error}</p>
          </div>
        </FlexCol>
      );
    }
  
  return (
    <FlexCol className='gap-6'>
        <BackButton />

        <LoanRepayment 
          summary={res.summary} 
          repayments={repayment} 
          pagination={pagination}
          href={`/manager/portfolio/${search.id}`}
        />

    </FlexCol>
  )
}

export default LoanRepaymentHistory;

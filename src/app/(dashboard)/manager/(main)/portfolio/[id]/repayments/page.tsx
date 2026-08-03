import { BackButton } from '@/components/primitives/buttons/BackButton';
import { FlexCol } from '@/components/ui/ui-layout';
import { getLoanHistory } from '@/lib/api';
import { IDParam } from '@/types/types';


const LoanRepaymentHistory = async ({params}: IDParam) => {

  const { id} = await params;

  const res = await getLoanHistory(id) as any;

  const { data: repayment, error} = res;

    if (!repayment || repayment === null || repayment?.length === 0) {
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
    </FlexCol>
  )
}

export default LoanRepaymentHistory;

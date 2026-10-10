import { PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import { agentGetAllLoans, agentGetDashboardOverview } from '@/lib/api.agent';
import LoanApplicationTable from '@/components/tables/LoanApplicationTable';
import LoanCardsSection from './_sections/LoanCardsSection';


const Loans = async () => {

  const loans = await agentGetAllLoans() as any;

  const data = await agentGetDashboardOverview() as any;

  // console.log('LOANS', loans);

  return (
    <Grid className='gap-y-7 w-full'>
      <PageHeader title='Loan Applications' />

      <LoanCardsSection data={data}/>

      <LoanApplicationTable data={loans?.data ?? []} pagination={loans?.pagination} error={loans?.error} />
  
    </Grid>
  )
}

export default Loans;

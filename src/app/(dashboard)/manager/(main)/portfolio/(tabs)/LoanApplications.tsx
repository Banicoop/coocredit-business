import ManagersLoanTable from '@/components/tables/ManagersLoanTable';
import { PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import { getAllLoans } from '@/lib/api';


const LoanApplicationsTab = async () => {

  const data = await getAllLoans() as any;

  // console.log('ALL LOANS', data?.data);

  return (
    <Grid className='gap-6'>
        <PageHeader
            title='Loan Applications' 
            description='Manage and review incoming enterprise loan requests.' />

            <ManagersLoanTable data={data?.data ?? []} error={data.error}/>

    </Grid>
  )
}

export default LoanApplicationsTab;

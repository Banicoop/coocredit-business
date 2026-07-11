import LoanApplicationTable from '@/components/tables/LoanApplicationTable';
import { PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import { getData } from '@/lib/api';


const LoanApplicationsTab = async () => {

    const data = await getData('admin/loans/business') as any;

  return (
    <Grid className='gap-6'>
        <PageHeader
            title='Loan Applications' 
            description='Manage and review incoming enterprise loan requests.' />

        <LoanApplicationTable data={data?.data ?? []}/>
    </Grid>
  )
}

export default LoanApplicationsTab;

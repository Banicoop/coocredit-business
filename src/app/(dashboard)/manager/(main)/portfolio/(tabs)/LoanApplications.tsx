import { PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import { getAllLoans } from '@/lib/api';
import React from 'react'

const LoanApplications = async () => {

    const data = await getAllLoans();

    console.log('Loan Applications Data:', data);
  return (
    <Grid className='gap-6'>
        <PageHeader
            title='Loan Applications' 
            description='Manage and review incoming enterprise loan requests.' />
    </Grid>
  )
}

export default LoanApplications;

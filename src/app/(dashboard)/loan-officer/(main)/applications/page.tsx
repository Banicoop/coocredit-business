import { PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import React from 'react'
import LoanApplications from './_sections/LoanApplications';

const ApplicationsPage = () => {
  return (
    <Grid className='gap-6'>
      <PageHeader title='Loan Applications' description='Manage and review incoming enterprise loan requests.' />
      <LoanApplications/>
    </Grid>
  )
}

export default ApplicationsPage;

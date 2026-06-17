import { FlexCol, Grid } from '@/components/ui/ui-layout';
import React from 'react'
import LoanOfficerOverview from './_sections/LoanOfficerOverview';

const LoanOfficerDashboard = () => {
  return (
    <Grid className='gap-6'>
      <LoanOfficerOverview/>
    </Grid>
  )
}

export default LoanOfficerDashboard;

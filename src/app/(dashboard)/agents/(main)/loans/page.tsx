import { PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import React from 'react'
import { LoanWidget } from './_sections/LoanItems';
import LoanHistory from './_sections/LoanHistory';

const Loans = () => {
  return (
    <Grid className='gap-y-4 w-full'>
      <PageHeader title='Loan Applications' />

      <Grid className='gap-4 grid-cols-6 w-full'>
        {/* MAIN */}
        <Grid className='col-span-4 gap-y-4'>
          <Grid className='grid-cols-2 lg:grid-cols-4 gap-3.5'>
            <LoanWidget/>
            <LoanWidget/>
            <LoanWidget/>
            <LoanWidget/>
          </Grid>
          <LoanHistory/>
        </Grid>

        {/* LEFT COLUMN */}
        <Grid className='bg-amber-600 col-span-2'>B</Grid>
      </Grid>
    </Grid>
  )
}

export default Loans;

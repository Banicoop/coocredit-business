import { PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import { Download, Plus } from 'lucide-react';
import React from 'react'
import RepaymentCards from './_sections/RepaymentCards';
import RepaymentSchedule from './_sections/RepaymentSchedule';

const RepaymentsPage = () => {
  return (
    <Grid className='gap-6'>
      <PageHeader
        title='Repayments Performance'
        description='Real-time recovery monitoring and schedule management.'
        actions={[
          {
            label: 'Export Report',
            icon: <Download size={16}/>,
            variant: 'secondary'
          },
          {
            label: 'Log Payment',
            variant: 'primary',
            icon: <Plus size={16}/>
          },
        ]}
      />
      <RepaymentCards/>
      <RepaymentSchedule/>
    </Grid>
  )
}

export default RepaymentsPage;

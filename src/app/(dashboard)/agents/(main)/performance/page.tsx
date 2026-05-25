import { PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import React from 'react'
import PerformanceScore from './_sections/PerformanceScore';
import TargetBreakdown from './_sections/TargetBreakdown';

const AgentPerformance = () => {
  return (
    <Grid className='gap-4'>
      <PageHeader title='Performance' />
      <PerformanceScore/>
      <TargetBreakdown/>
    </Grid>
  )
}

export default AgentPerformance;

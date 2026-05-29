import { PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import React from 'react'
import PerformanceScore from './_sections/PerformanceScore';
import TargetBreakdown from './_sections/TargetBreakdown';
import TopAgents from './_sections/TopAgents';
import IncentiveRoadMap from './_sections/IncentiveRoadMap';

const AgentPerformance = () => {
  return (
    <Grid className='gap-4'>
      <PageHeader title='Performance' />
      <PerformanceScore/>
      <TargetBreakdown/>
      <Grid className='gap-6 md:grid-cols-2'>
        <TopAgents/>
        <IncentiveRoadMap/>
      </Grid>
    </Grid>
  )
}

export default AgentPerformance;

import Typography from '@/components/primitives/Typography';
import AgentCustomerTable from '@/components/tables/AgentCustomerTable';
import ErrorPage from '@/components/ui/ErrorPage';
import { Grid } from '@/components/ui/ui-layout';
import React from 'react'

const AgentleadTab = ({leads}: {leads: any}) => {

  if(!leads) return <ErrorPage label={leads?.error || 'Failed to load customer data'} href='/' />

  return (
    <Grid className='gap-5'>
      <Typography variant='h3' font='atomic'>Leads</Typography>
      <AgentCustomerTable data={leads?.data ?? []} error={leads?.error}/>
    </Grid>
  )
}

export default AgentleadTab;

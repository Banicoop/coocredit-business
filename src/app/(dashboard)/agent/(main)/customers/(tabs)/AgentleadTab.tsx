import Typography from '@/components/primitives/Typography';
import AgentCustomerTable from '@/components/tables/AgentCustomerTable';
import { Grid } from '@/components/ui/ui-layout';
import React from 'react'

const AgentleadTab = ({leads}: {leads: any}) => {


  return (
    <Grid className='gap-5'>
      <Typography>Leads</Typography>
      <AgentCustomerTable data={leads?.data ?? []} error={leads?.error}/>
    </Grid>
  )
}

export default AgentleadTab;

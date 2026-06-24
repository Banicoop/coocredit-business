import { Tabs } from '@/components/ui/Tabs';
import { Grid } from '@/components/ui/ui-layout';
import React from 'react'

const tabs = [
  {
    label: 'Loan Officers',
    value: 'loanOfficer'
  },
  {
    label: 'Super Agents',
    value: 'super_agent'
  },
]

const TeamPage = () => {
  return (
    <Grid>
      <Tabs items={tabs} defaultValue='loanOfficer'/>
    </Grid>
  )
}

export default TeamPage;

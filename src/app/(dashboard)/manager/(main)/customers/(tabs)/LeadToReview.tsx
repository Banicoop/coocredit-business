import CustomersTable from '@/components/tables/CustomersTable';
import { PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import React from 'react'

const LeadToReview = ({data, error}: {data: any[], error: string}) => {
  return (
    <Grid className='gap-6'>
        <PageHeader title='Pending Customer Acquisition'/>
        <CustomersTable initialData={data ?? []} error={error} isLead/>
    </Grid>
  )
}

export default LeadToReview;

import CustomersTable from '@/components/tables/CustomersTable';
import CustomersStats from '@/components/tables/CustonersStats';
import { Grid } from '@/components/ui/ui-layout';
import React from 'react'

const CustomersTab = () => {
  return (
    <Grid className='gap-6'>
        <CustomersStats/>

        <CustomersTable initialData={[]}/>
    </Grid>
  )
}

export default CustomersTab;

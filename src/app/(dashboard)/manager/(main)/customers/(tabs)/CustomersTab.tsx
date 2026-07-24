import CustomersTable from '@/components/tables/CustomersTable';
import CustomersStats from '@/components/tables/CustonersStats';
import { Grid } from '@/components/ui/ui-layout';


const CustomersTab = ({data, error}: {data: any[], error: string}) => {

  return (
    <Grid className='gap-6'>
        <CustomersStats/>

        <CustomersTable initialData={data ?? []} error={error}/>
    </Grid>
  )
}

export default CustomersTab;

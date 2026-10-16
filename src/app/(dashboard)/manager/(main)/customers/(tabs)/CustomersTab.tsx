import CustomersTable from '@/components/tables/CustomersTable';
import CustomersStats from '@/components/tables/CustonersStats';
import { Grid } from '@/components/ui/ui-layout';
import { PaginationMeta } from '@/types/types';


interface CustomersTabProps {
  data: any[];
  search: string; 
  error?: string;
  pagination: PaginationMeta;
  onSearchChange: (val: string) => void;
  isLoading: boolean;
  isFetching: boolean
}


const CustomersTab = ({data, error, pagination, onSearchChange, isFetching, isLoading, search}: CustomersTabProps) => {

  return (
    <Grid className='gap-6'>
        <CustomersStats/>

        <CustomersTable 
          initialData={data} error={error} 
          search={search}
          onSearchChange={onSearchChange}
          isFetching={isFetching}
          isLoading={isLoading}
          pagination={pagination}
          />
    </Grid>
  )
}

export default CustomersTab;

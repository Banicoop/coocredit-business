import { PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import { CalendarDays, Download } from 'lucide-react';
import CardsAndInsight, { Quality } from './(main)/_section/CardsAndInsight';
import DisbursementCollectionChart from './(main)/_section/DSChart';
import BranchCharts from './(main)/_section/BranchCharts';
import { getManagerDashboardStats } from '@/lib/api';
import ErrorPage from '@/components/ui/ErrorPage';


const ManagerDashboard = async () => {

  const data = await getManagerDashboardStats({startDate: '', endDate: ''}) as any;

  if(!data) return <ErrorPage label='Retry'/>

  return (
    <Grid className='gap-6'>

      <CardsAndInsight stats={data.data}/>

      <Grid className='grid-cols-4 gap-6'>
        <DisbursementCollectionChart className='col-span-3'/>
        <Quality/>
      </Grid>

      <BranchCharts />

    </Grid>
  )
}

export default ManagerDashboard;

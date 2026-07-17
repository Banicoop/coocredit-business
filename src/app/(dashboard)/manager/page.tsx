import { PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import { CalendarDays, Download } from 'lucide-react';
import CardsAndInsight, { Quality } from './(main)/_section/CardsAndInsight';
import DisbursementCollectionChart from './(main)/_section/DSChart';
import BranchCharts from './(main)/_section/BranchCharts';
import { getManagerDashboardStats } from '@/lib/api';


const ManagerDashboard = async () => {

  const data = await getManagerDashboardStats() as any;

  console.log('DATA:', data?.data);

  return (
    <Grid className='gap-6'>
      <PageHeader
        title='Dashboard Overview' 
        description='Real-time overview of Lagos Central performance metrics.'
        actions={[
          {
            label: 'Last 30 Days',
            icon: <CalendarDays size={18} className='text-ring'/>,
            textClassName: 'text-ring font-semibold'
          },
          {
            label: 'Download',
            icon: <Download size={18}/>,
            variant: 'primary'
          },
        ]}
        />

      <CardsAndInsight/>

      <Grid className='grid-cols-4 gap-6'>
        <DisbursementCollectionChart className='col-span-3'/>
        <Quality/>
      </Grid>

      <BranchCharts />

    </Grid>
  )
}

export default ManagerDashboard;

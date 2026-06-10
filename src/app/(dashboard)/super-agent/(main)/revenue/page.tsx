import { Grid } from '@/components/ui/ui-layout';
import RevenueWidget from './_sections/RevenueWidget';
import RevenueCharts from './_sections/RevenueCharts';
import RevenueTable from './_sections/RevenueTable';


const RevenuePage = () => {
  return (
    <Grid className='gap-5'>
      <RevenueWidget/>
      <RevenueCharts/>
      <RevenueTable/>
    </Grid>
  )
}

export default RevenuePage;

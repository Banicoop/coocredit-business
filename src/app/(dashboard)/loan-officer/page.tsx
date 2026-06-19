import { Grid } from '@/components/ui/ui-layout';
import LoanOfficerOverview from './_sections/LoanOfficerOverview';
import CardSection from './_sections/CardSection';
import RepaymentChart from './_sections/RepaymentChart';
import { RecentActivities } from '@/components/ui/RecentActivities';
import { recentActivities } from '@/constant/data';
import HPAppsTable from './_sections/HPAppsTable';


const LoanOfficerDashboard = () => {
  return (
    <Grid className='gap-6'>
      <LoanOfficerOverview/>
      <CardSection/>
      <Grid className='md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <RepaymentChart className='lg:col-span-2'/>
         <RecentActivities
              activities={recentActivities}
              // onViewAll={() => router.push('/activity-logs')}
          />
      </Grid>
      <HPAppsTable/>
    </Grid>
  )
}

export default LoanOfficerDashboard;

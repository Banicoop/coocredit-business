import Typography from '@/components/primitives/Typography';
import {PageHeader} from '@/components/ui/PageHeader';
import { FlexCol, Grid } from '@/components/ui/ui-layout';
import { ArrowUp } from 'lucide-react';
import { LoanPipeline, Commissions, Rank } from './_sections/LoanPipeline';
import RecentApps from './_sections/RecentApps';
import QuickActions from './_sections/QuickActions';
import DailyTasks from './_sections/DailyTasks';
import { formatDate } from '@/utils/funcs';
import { agentGetAllLoans, agentGetDashboardOverview, agentGetMyProfile } from '@/lib/api.agent';
import { cn } from '@/lib/utils';



const Widget = ({title, num, percent}: {title: string, num: number, percent: number}) => {
  return(
    <Grid className='gap-1 bg-white rounded-lg px-5 py-2.5 border'>
      <Typography variant='small' weight='semibold' color='primary'>{title}</Typography>
      <div className="flex items-baseline gap-1">
        <Typography variant='h1' color='default'>{num}</Typography>
        <Typography variant='small' color='success' startIcon={<ArrowUp size={18}/>}>{percent}%</Typography>
      </div>
    </Grid>
  )
}

const AgentDashboard = async () => {

  const data = await agentGetDashboardOverview() as any;
  const loans = await agentGetAllLoans() as any;
  const me = await agentGetMyProfile() as any;

  return (
    <Grid className={cn('gap-5 p-5')}>
      <PageHeader 
        title={`Welcome${me?.data?.lastName ? `, ${me.data.lastName}` : ''} 👋`}
        description={formatDate(new Date())} className='text-2xl'/>
      
      <section className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        <Widget title='TOTAL ONBOARDED TODAY' num={data?.data?.customerOnboarding?.today?.count} percent={12}/>
        <Widget title='THIS WEEK' num={data?.data?.customerOnboarding?.thisWeek?.count} percent={12}/>
        <Widget title='THIS MONTH' num={data?.data?.customerOnboarding?.thisMonth?.count} percent={12}/>
        <Widget title='ACTIVE APPLICATIONS' num={data?.data?.loanApplications?.activeApplications?.count} percent={12}/>
      </section>


      <div className="flex flex-col lg:flex-row gap-5">
        <FlexCol className='gap-4 flex-1 lg:flex-2'>
          <LoanPipeline/>
          <RecentApps loans={loans.data} error={loans.error}/>
          <Commissions/>
        </FlexCol>

        <FlexCol className='gap-4 flex-1 lg:flex-[1.5]'>
          <DailyTasks/>
          <QuickActions/>
          <Rank/>
        </FlexCol>
      </div>
    </Grid>
  )
}

export default AgentDashboard;

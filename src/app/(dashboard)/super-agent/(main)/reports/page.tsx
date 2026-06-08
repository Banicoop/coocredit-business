import { PageHeader } from '@/components/ui/PageHeader';
import { Grid, GridItem } from '@/components/ui/ui-layout';
import { AlertTriangle, Calendar, CheckCircleIcon, Download, Ellipsis, Info, SquareArrowOutUpRight, TrendingUp, UserPlusIcon } from 'lucide-react';
import Typography from '@/components/primitives/Typography';
import { LiveLedger, TargetCard } from './_sections/reportCards';
import Performance from './_sections/Performance';
import OnBoardingChart from './_sections/OnBoardingChart';
import LoanDistribution from './_sections/LoanDistribution';


const ReportsPage = () => {
  return (
    <Grid className='gap-5'>
      <PageHeader 
        title='Performance Analytics' 
        description='Team Reports' 
        titleClass='text-[14px] uppercase font-bold text-primary tracking-widest'
        descClass='text-primary2 text-[30px] font-bold'
        actions={[
          {
            label: 'This month',
            variant: 'secondary',
            icon: <Calendar size={16}/>
          },
          {
            label: 'Export Ledger',
            variant: 'primary',
            icon: <Download size={16}/>,
            className: 'bg-[#00164E]',
            textClassName: 'bg-[#00164E]'
          }
        ]}
        />

      <Grid className='grid-cols-3 gap-6'>
        <GridItem className='gap-5 py-6'>
          <Grid className='grid-cols-[1fr_auto]'>
              <Typography variant='p' weight='semibold' color='primary2'>Target Achievement</Typography>
              <Ellipsis size={24} className='cursor-pointer'/>
          </Grid>
          <TargetCard 
            label='Quarterly Revenue' 
            val='₦24,500,000 / ₦32M' 
            desc={<Typography color='success' startIcon={<TrendingUp size={14}/>} variant='small'>+12.4% vs LY</Typography>}
            percent={75}/>
          <TargetCard 
            label='Customer Acquisition' 
            val='1,240 / 2,800' 
            desc={<Typography color='active' startIcon={<Info size={14}/>} variant='small'>Tracking normal</Typography>}
            percent={44}/>
        </GridItem>
        <Performance className='col-span-2'/>

        <OnBoardingChart className='col-span-2'/>

        <LoanDistribution/>

        <LiveLedger 
          title='Live Transaction Ledger'
          activity={<Typography color='active' endIcon={<SquareArrowOutUpRight size={16}/>}>View Audit Log</Typography>}
          items={[
            {info: '₦250,000 Disbursement', desc: 'Client: Adebayo Logistics', id: 'LID-9281', icon: <CheckCircleIcon className='text-primary'/>, timestamp: '2 min ago'},
            {info: 'Repayment Overdue', desc: 'Client: Sarah’s Bakery', id: 'LID-8812', icon: <AlertTriangle size={22} className='text-chart-5'/>, timestamp: '1h ago'},
            {info: 'New Merchant Onboarded', desc: 'Agent: Chinonso Okafor', id: 'UID-4402', icon: <UserPlusIcon className='text-primary'/>, timestamp: '2h ago'},
            {info: 'KYC Verification Success', desc: 'Agent: Babatunde Sulaiman', id: 'UID-5519', icon: <CheckCircleIcon className='text-primary'/>, timestamp: '3h ago'},
          ]}
          className='col-span-3'
        />
      </Grid>
    </Grid>
  )
}

export default ReportsPage;

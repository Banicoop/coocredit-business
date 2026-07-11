import { ColItem, PageHeader } from '@/components/ui/PageHeader';
import { Flex, FlexCol, Grid, GridItem } from '@/components/ui/ui-layout';
import Typography from '@/components/primitives/Typography';
import { AlertTriangle, TimerOff, TrendingUpDown } from 'lucide-react';
import { ProgressBar } from '@/components/ui/ProgessBar';
import { agentGetAllLoans } from '@/lib/api.agent';
import { cn } from '@/lib/utils';
import LoanApplicationTable from '@/components/tables/LoanApplicationTable';
import LoanCardsSection from './_sections/LoanCardsSection';


const Loans = async () => {

  const loans = await agentGetAllLoans() as any


  // console.log('LOANS:', loans?.data);

  return (
    <Grid className='gap-y-7 w-full'>
      <PageHeader title='Loan Applications' />

      <LoanCardsSection/>

      <Grid className='gap-4 md:grid-cols-6 w-full'>
        {/* MAIN */}
        <Grid className='col-span-4 gap-y-4'>
          <LoanApplicationTable data={loans?.data}/>
        </Grid>

        {/* LEFT COLUMN */}
        <Grid className='col-span-4 md:col-span-2 h-fit'>
          <Grid className='gap-6'>
            <GridItem className={cn('border-t-4 border-t-primary gap-5 bg-card p-5')}>
              <Typography variant='h4' weight='bold' color='active' startIcon={<TrendingUpDown size={24} />}>Application Insights</Typography>

              <Flex className='gap-2'>
                <div className="p-2.5 rounded-full flex items-center justify-center bg-[#EFF6FF]">
                  <TimerOff size={18} className='text-primary'/>
                </div>
                <ColItem item1='Avg. Approval Time' item2='2.3 Days' className1='' className2='text-[16px] text-[#0F1C2C] font-semibold'/>
              </Flex>

              <Flex className='gap-2'>
                <div className="p-2.5 rounded-lg flex items-center justify-center bg-[#FFFBEB]">
                  <AlertTriangle size={18} className='text-[#A43700]'/>
                </div>
                <ColItem item1='Top Reject Reason' item2='Incomplete KYC' className1='' className2='text-[15px] text-[#0F1C2C] font-semibold'/>
              </Flex>

              <FlexCol className='bg-[#EEF4FF] p-4 rounded-lg gap-1.5'>
                <Typography variant='h6' weight='semibold' color='primary'>DISBURSEMENT ALERTS</Typography>
                <Typography variant='span'>₦2.4M scheduled for payout in next 4 hours.</Typography>
                <Typography color='primary' variant='span'>Bank validation successful for 12 new accounts.</Typography>
              </FlexCol>
            </GridItem>

            <Grid className='bg-brand p-4 rounded-lg gap-2.5'>
              <Typography variant='h4' color='light' weight='bold'>System Performance</Typography>
              <Typography variant='p' color='light'>Your acquisition rate is up 12% from last week.</Typography>
              <ProgressBar value={60} className='bg-[#0053CC]'/>
              <Typography variant='small' color='light' weight='semibold' className='text-center'>TARGET: ₦15.0M / ₦20M</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Loans;

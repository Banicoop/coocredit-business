import { ColItem, PageHeader } from '@/components/ui/PageHeader';
import { Flex, FlexCol, Grid, GridItem } from '@/components/ui/ui-layout';
import React from 'react'
import { LoanWidget } from './_sections/LoanItems';
import LoanHistory from './_sections/LoanHistory';
import Typography from '@/components/primitives/Typography';
import { AlertTriangle, SendHorizontal, TimerOff, TimerReset, TrendingUpDown, Columns3, FlipVertical2, Columns3Cog } from 'lucide-react';
import { ProgressBar } from '@/components/ui/ProgessBar';

const Loans = () => {
  return (
    <Grid className='gap-y-4 w-full'>
      <PageHeader title='Loan Applications' />

      <Grid className='gap-4 md:grid-cols-6 w-full'>
        {/* MAIN */}
        <Grid className='col-span-4 gap-y-4'>
          <Grid className='grid-cols-2 lg:grid-cols-4 gap-3.5'>
            <LoanWidget label='SUBMITTED' val='47' textColor='text-primary' borderColor='border-primary' icon={<SendHorizontal size={20} className='text-primary '/>}/>
            <LoanWidget label='Pending Approval' val='17' textColor='text-[#A43700]' borderColor='border-[#A43700]' icon={<FlipVertical2 size={20} className='text-[#A43700] ' />}/>
            <LoanWidget label='APPROVED' val='4' textColor='text-[#506070]' borderColor='border-[#506070]' icon={<Columns3Cog size={20} className='text-[#506070]' />}/>
            <LoanWidget label='DISBURSED' val='26' textColor='text-[#059669]' borderColor='border-[#059669]' icon={<Columns3 size={20} className='text-[#059669]' />}/>
          </Grid>
          <LoanHistory/>
        </Grid>

        {/* LEFT COLUMN */}
        <Grid className='col-span-4 md:col-span-2 h-fit'>
          <Grid className='gap-4'>
            <GridItem className='border-t-4 border-t-primary gap-2.5'>
              <Typography variant='h4' weight='bold' color='active' startIcon={<TrendingUpDown size={24} />}>Application Insights</Typography>

              <Flex className='gap-2'>
                <div className="p-2.5 rounded-full flex items-center justify-center bg-[#EFF6FF]">
                  <TimerOff size={18} className='text-primary'/>
                </div>
                <ColItem item1='Avg. Approval Time' item2='2.3 Days' className1='' className2='text-[18px] text-[#0F1C2C] font-bold'/>
              </Flex>

              <Flex className='gap-2'>
                <div className="p-2.5 rounded-lg flex items-center justify-center bg-[#FFFBEB]">
                  <AlertTriangle size={18} className='text-[#A43700]'/>
                </div>
                <ColItem item1='Top Reject Reason' item2='Incomplete KYC' className1='' className2='text-[18px] text-[#0F1C2C] font-bold'/>
              </Flex>

              <FlexCol className='bg-[#EEF4FF] p-2.5 rounded-lg gap-1.5'>
                <Typography variant='h4' weight='semibold' color='primary'>DISBURSEMENT ALERTS</Typography>
                <Typography variant='p' weight='bold'>₦2.4M scheduled for payout in next 4 hours.</Typography>
                <Typography color='primary'>Bank validation successful for 12 new accounts.</Typography>
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

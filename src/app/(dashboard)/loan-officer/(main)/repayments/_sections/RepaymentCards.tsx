import Typography from '@/components/primitives/Typography';
import { ColItem } from '@/components/ui/PageHeader';
import { Flex, FlexCol, Grid, GridItem } from '@/components/ui/ui-layout';
import React from 'react'
import { InfoItem } from '../../portfolio/(tabs)/PortfolioSummary';
import { DollarSign, Landmark } from 'lucide-react';
import { LoanOfficerCardWidget } from '@/components/ui/cards';
import { ProgressBar } from '@/components/ui/ProgessBar';
import Button from '@/components/primitives/buttons/Button';

const RepaymentCards = () => {
  return (
    <Grid className='grid-cols-3 gap-4'>
        <GridItem className='gap-2.5 border-t-4 border-t-primary'>
            <Typography variant='small' color='primary' weight='semibold'>CURRENT COLLECTION RATE</Typography>
            <FlexCol className='w-40 h-40 rounded-full justify-center items-center border-4 border-primary mx-auto'>
                <Typography variant='h1' color='primary2'>88.2%</Typography>
                <Typography variant='small' className='py-1 px-2.5 bg-accent rounded-md text-primary'>+2.4% vs last month</Typography>
            </FlexCol>
            <hr className='h-px'/>
            <Grid className='grid-cols-2'>
                <InfoItem title='Target' val='92.0%'/>
                <InfoItem title='Forecast' val='89.5%'/>
            </Grid>
        </GridItem>
        <Grid className='grid-cols-2 h-fit col-span-2 gap-4'>
            <LoanOfficerCardWidget
                icon={<DollarSign size={20} className='text-primary' />}
                percent={'1.2% overdue'}
                isNegative
                title='Total Amount Due' 
                desc={
                <Flex className='gap-2'>
                    <ProgressBar value={60} className='bg-primary'/>
                    <Typography color='active' variant='small' weight='semibold'>60%</Typography>
                </Flex>}
                amount={`₦${(428502070).toLocaleString()}`}/>
            <LoanOfficerCardWidget
                icon={<Landmark size={20} className='text-chart-2' />}
                percent={'On track'}
                title='Total Collected' 
                desc={
                <Flex className='gap-2'>
                    <ProgressBar value={70} className='bg-chart-2'/>
                    <Typography color='success' variant='small' weight='semibold'>70%</Typography>
                </Flex>}
                amount={`₦${(428502070).toLocaleString()}`}/>
            <Flex className='col-span-2 rounded-lg bg-primary2 p-4 gap-2.5'>
                <ColItem 
                    item1='14 High-Risk Accounts Detected' 
                    item2='Manual intervention required for delinquent accounts exceeding 30 days.'
                    className1='text-card font-semibold'
                    className2='text-card/40'
                />
                <Button variant='light'>Review Now</Button>
            </Flex>
        </Grid>
    </Grid>
  )
}

export default RepaymentCards;

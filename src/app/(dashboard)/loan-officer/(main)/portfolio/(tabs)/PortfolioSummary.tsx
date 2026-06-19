import Button from '@/components/primitives/buttons/Button';
import Typography from '@/components/primitives/Typography';
import { ColItem } from '@/components/ui/PageHeader';
import { Flex, FlexCol, Grid, GridItem } from '@/components/ui/ui-layout';
import React from 'react';
import { SummaryCard } from '../_sections/PortfolioCards';
import { ProgressBar } from '@/components/ui/ProgessBar';
import { cn } from '@/lib/utils';
import { ShieldCheck, ShieldHalf } from 'lucide-react';

export const InfoItem = ({title, val}: {title: string, val: string}) => (
    <ColItem
        item1={title} 
        item2={val} 
        className1='text-ring font-semibold text-[10px]' 
        className2='text-primary2 font-semibold'/>
)



const PortfolioSummary = () => {
  return (
    <Grid className='md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <GridItem className={cn('gap-4 p-6 lg:col-span-2')}>
            <Flex className='justify-between'>
                <Typography variant='h5' color='primary2' weight='semibold'>Loan Portfolio Summary</Typography>
                <Button variant='ghost' className='font-bold'>Edit terms</Button>
            </Flex>
            <hr className='h-px'/>
            <Grid className='grid-cols-3 gap-4'>
                <SummaryCard title='TOTAL LOAN AMOUNT' 
                desc={'₦850,000.00'} 
                others={<Typography variant='small' color='success'>+12.5% Annual Interest</Typography>}/>
                <SummaryCard title='AMOUNT OUTSTANDING' 
                desc={'₦342,100.50'} 
                others={<ProgressBar value={56} className='bg-primary'/>}/>
                <SummaryCard title='TENURE / PROGRESS' 
                desc={'12 Months'} others={<Typography variant='small' color='primary' weight='semibold'>Month 7 of 12</Typography>}/>
            </Grid>
            <hr className='h-px'/>
            <Grid className='grid-cols-4'>
                <InfoItem title='DISBURSEMENT DATE' val='12 Jan, 2024'/>
                <InfoItem title='MATURITY DATE' val='12 Jan, 2025'/>
                <InfoItem title='LOAN TYPE' val='Asset Financing'/>
                <InfoItem title='PAYMENT FREQUENCY' val='Monthly'/>
            </Grid>
        </GridItem>
        <Grid className='gap-5 h-fit'>
            <GridItem className='gap-2.5'>
                <Flex className='justify-between'>
                    <Typography color='primary2' variant='h5' weight='semibold'>Collateral Info</Typography>
                    <ShieldCheck size={24} color='blue'/>
                </Flex>
                <Grid className='bg-tertiary border p-4 rounded-lg'>
                    <Typography color='primary'>Asset Type</Typography>
                    <Typography color='primary2' weight='semibold'>2x Mercedes Actros Trucks</Typography>
                    <Typography color='primary'>VIN: 2023-STR-9941 / 9942</Typography>
                </Grid>
                <Grid className='grid-cols-2'>
                    <InfoItem title='VALUATION' val='₦4,200,000' />
                    <InfoItem title='LTV RATIO' val='20.2%' />
                </Grid>
                <Button variant='light' className='border'>View Verification Documents</Button>
            </GridItem>

            <Grid className='gap-2.5 bg-primary2 p-5 rounded-lg'>
                <Flex className='justify-between'>
                    <Typography color='light' variant='h5' weight='semibold'>CREDIT RISK ASSESSMENT</Typography>
                    <ShieldHalf size={24} color='blue'/>
                </Flex>
                <Flex className='gap-2 items-baseline'>
                    <Typography variant='h1' color='light'>A+</Typography>
                    <Typography className='text-card/40 mt-2'>Low Probability of Default</Typography>
                </Flex>
                <FlexCol className='gap-2'>
                    <Flex className='justify-between'>
                        <Typography weight='semibold' variant='small' className='text-card/80'>Financial Health</Typography>
                        <Typography className='text-[#7FFC97] text-xs font-semibold'>Stable</Typography>
                    </Flex>
                    <ProgressBar value={56} className='bg-[#7FFC97]'/>
                </FlexCol>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default PortfolioSummary;

import Typography from '@/components/primitives/Typography';
import { ColItem } from '@/components/ui/PageHeader';
import { Flex, FlexCol } from '@/components/ui/ui-layout';
import { History, TrendingUp, TriangleAlert, Wallet2 } from 'lucide-react';
import React from 'react'

const Banner = () => {
  return (
    <FlexCol className='gap-6'>
        <FlexCol className='md:flex-row rounded-2xl'>
            <FlexCol className='flex-1 p-5 gap-2.5 bg-[#00164E] rounded-t-2xl md:rounded-t-none md:rounded-l-2xl'>
                <Typography className='text-card/60'>Total Wallet Balance</Typography>
                <Typography color='light' variant='h1'>₦42,850,200.50</Typography>
                <Flex className='gap-4'>
                    <Typography color='light' startIcon={<Wallet2 size={16}/>} className='px-3 py-2 text-xs md:text-sm rounded-lg bg-primary cursor-pointer'>Top up Wallet</Typography>
                    <Typography color='light' startIcon={<History size={16}/>} className='px-3 py-2 text-xs md:text-sm rounded-lg bg-[#FFFFFF1A] cursor-pointer'>View History</Typography>
                </Flex>
            </FlexCol>

            <FlexCol className='flex-1 p-5 gap-2.5 bg-[#00164E]/90 rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl'>
                <Typography className='text-card/60'>Accrued Commission</Typography>
                <Typography color='light' variant='h1'>₦1,420,000</Typography>
                <Flex className='items-start justify-between'>
                    <Typography startIcon={<TrendingUp size={16}/>} color='success'>+12.4% this month</Typography>
                    <FlexCol className='p-2.5 rounded-md border border-card/10 bg-card/5'>
                        <Typography className='text-card/40'>ACTIVE MANDATES</Typography>
                        <Typography color='light' variant='h4'>18 Ongoing</Typography>
                    </FlexCol>
                </Flex>
            </FlexCol>
        </FlexCol>

        <FlexCol className='bg-destructive/20 p-4 rounded-lg border border-[#BA1A1A1A] md:flex-row md:items-center justify-between gap-4'>
            <Flex className='gap-4'>
                <Flex className='justify-center rounded-full p-2.5 bg-destructive/30 w-max'>
                    <TriangleAlert size={20} className='text-destructive' />
                </Flex>
                <ColItem 
                    item1='Urgent: KYC Compliance Alert' 
                    item2='14 of your sub-agents have pending KYC documents. Failure to comply may restrict payout privileges.'
                    className1='text-destructive font-semibold text-lg'
                    className2='text-destructive'
                    />
            </Flex>
            <Typography color='destructive' className='cursor-pointer underline'>Resolve Now</Typography>
        </FlexCol>
    </FlexCol>
  )
}

export default Banner;

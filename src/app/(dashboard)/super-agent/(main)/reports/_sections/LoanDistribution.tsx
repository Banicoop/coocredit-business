import Typography from '@/components/primitives/Typography';
import { ColItem } from '@/components/ui/PageHeader';
import { ProgressBar } from '@/components/ui/ProgessBar';
import { Flex, FlexCol } from '@/components/ui/ui-layout';
import { ArrowRight } from 'lucide-react';
import React from 'react'

const LoanDistribution = () => {
  return (
    <FlexCol className='gap-4 bg-primary2 rounded-lg p-4'>
        <Typography variant='h4' color='light'>Loan Distribution</Typography>
        <FlexCol className='gap-2.5'>
            <Typography className='text-card/50'>SMALL BUSINESS</Typography>
            <Flex className='justify-between'>
                <Typography color='light'>₦14.2M</Typography>
                <Typography weight='bold' color='success'>+24%</Typography>
            </Flex>
            <ProgressBar value={70} className='bg-primary'/>
        </FlexCol>
        <FlexCol className='gap-2.5'>
            <Typography className='text-card/50'>AGRICULTURAL</Typography>
            <Flex className='justify-between'>
                <Typography color='light'>₦8.7M</Typography>
                <Typography weight='bold' className='text-[#93C5FD]'>+24%</Typography>
            </Flex>
            <ProgressBar value={70} className='bg-[#93C5FD]'/>
        </FlexCol>

        <Flex className='bg-ring py-3 px-4 rounded-md justify-between'>
            <ColItem 
                item1='TOTAL PORTFOLIO' 
                item2='₦22.9M'
                className1='text-card/50 text-[12px]'
                className2='text-card text-[18px] font-bold'
            />
            <Flex className='p-2 bg-white border shadow-sm rounded-lg'>
                <ArrowRight size={18}/>
            </Flex>
        </Flex>
    </FlexCol>
  )
}

export default LoanDistribution;

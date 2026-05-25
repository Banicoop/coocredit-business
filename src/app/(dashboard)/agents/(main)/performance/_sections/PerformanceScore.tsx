import Typography from '@/components/primitives/Typography';
import { ColItem } from '@/components/ui/PageHeader';
import { ProgressBar } from '@/components/ui/ProgessBar';
import { Flex, FlexCol, Grid, GridItem } from '@/components/ui/ui-layout';
import { Award, Flame } from 'lucide-react';
import React from 'react'

const PerformanceScore = () => {
  return (
    <Grid className='md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <GridItem className='lg:col-span-2'>A</GridItem>
        <Grid className='bg-primary rounded-lg p-4 gap-2.5'>
            <Flex className='justify-between'>
                <FlexCol>
                    <Typography variant='small' weight='semibold' className='text-[#DAE2FFB2]'>CURRENT TIER</Typography>
                    <Typography variant='h3' weight='bold' color='light'>Silver Elite</Typography>
                </FlexCol>
                <Award size={32} className='text-card' />
            </Flex>

            <FlexCol className='gap-1'>
                <Flex className='justify-between mt-4'>
                    <Typography color='light'>Progress to Gold</Typography>
                    <Typography color='light'>70%</Typography>
                </Flex>
                <ProgressBar value={70} className='bg-card' className2='bg-[#FFFFFF33]'/>
            </FlexCol>

            <Typography className='text-[#DAE2FFCC]'>Complete 12 more successful KYC approvals to unlock Gold Tier rewards.</Typography>

            <Typography weight='semibold' className='text-[#DAE2FFB2] uppercase mt-2.5'>Next Reward</Typography>

            <Flex className='border p-2.5 bg-[#FFFFFF1A] border-[#FFFFFF1A] rounded-lg gap-1.5'>
                <Flame size={20} className='text-card' />
                <ColItem 
                    item1='0.5% Commission Bonus' 
                    item2='Activates at 1,000 pts' 
                    className1='text-[#FFFFFF]' 
                    className2='text-[#DAE2FF99]'/>
            </Flex>
        </Grid>
    </Grid>
  )
}

export default PerformanceScore;

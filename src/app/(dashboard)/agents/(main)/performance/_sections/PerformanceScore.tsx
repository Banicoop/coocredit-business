import Typography from '@/components/primitives/Typography';
import { ColItem } from '@/components/ui/PageHeader';
import { ProgressBar } from '@/components/ui/ProgessBar';
import { Flex, FlexCol, Grid, GridItem } from '@/components/ui/ui-layout';
import { Award, Flame, Star } from 'lucide-react';
import React from 'react'

const PerformanceScore = () => {
  return (
    <Grid className='md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <GridItem className='md:grid-cols-2 lg:col-span-2 gap-2.5'>
            <Grid className='h-fit gap-4'>
                <Typography color='primary'>TOTAL AGENT SCORE</Typography>
                <Typography variant='h1' className='text-[40px]' endIcon={<span className='text-sm text-[#546474]'>/ 100</span>}>87 </Typography>
                <Typography 
                    startIcon={
                    <Flex className='p-1 rounded-full bg-primary'>
                        <Star size={10} className='text-card'/>
                    </Flex>} 
                    className='bg-accent w-fit h-fit rounded-lg py-1 px-4 text-primary'>Top 5% Nationwide</Typography>
                
                <Grid className='grid-cols-2 gap-2.5'>
                    <FlexCol className='bg-accent px-2.5 py-4 rounded-lg'>
                        <Typography color='primary' weight='bold' variant='p'>GLOBAL RANK</Typography>
                        <Typography variant='h5' weight='semibold'>No. 4</Typography>
                    </FlexCol>
                    <FlexCol className='bg-accent px-2.5 py-4 rounded-lg'>
                        <Typography color='primary' weight='bold' variant='p'>GROWTH</Typography>
                        <Typography variant='h5' className='text-chart-5' weight='semibold'>+12.4%</Typography>
                    </FlexCol>
                </Grid>
            </Grid>
            <Grid>B</Grid>
        </GridItem>
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

import Typography from '@/components/primitives/Typography';
import { ColItem } from '@/components/ui/PageHeader';
import { PipeLine } from '@/components/ui/cards';
import { Flex, FlexCol, Grid, GridItem } from '@/components/ui/ui-layout';
import { Sparkles } from 'lucide-react';
import React from 'react'


const IncentiveRoadMap = () => {
  return (
    <FlexCol className='gap-4'>
        <GridItem className='gap-4'>
            <Typography weight='bold' variant='h4'>Incentive Roadmap</Typography>
            <Flex>
                <PipeLine label='Base' stage='Achieved' className='bg-primary' numClassName='text-white' num={1}/>
                <PipeLine label='Silver' stage='Achieved' className='bg-primary' numClassName='text-white' num={2}/>
                <PipeLine label='Gold' stage='128 left' className='border-4 border-primary' numClassName='text-primary' num={3}/>
                <PipeLine label='Diamond' stage='Locked' className='bg-[#E5EFFF]' numClassName='text-[#546474]' num={4} last={true}/>
            </Flex>
            <Grid className='grid-cols-2 gap-4'>
                <GridItem>
                    <Typography color='primary' weight='semibold' className='mb-2.5'>UPCOMING BONUS</Typography>
                    <ColItem item1='₦25,000' item2='KYC Star Reward' className1='text-xl font-semibold' className2='text-primary text-xs'/>
                </GridItem>
                <GridItem>
                    <Typography color='primary' weight='semibold' className='mb-2.5'>TOTAL EARNINGS</Typography>
                    <ColItem item1='₦154,200' item2='Q3 Total' className1='text-xl font-semibold' className2='text-chart-5 text-xs'/>
                </GridItem>
            </Grid>
        </GridItem>

        <Flex className='bg-[#DBE9FE] rounded-lg justify-between p-4'>
            <ColItem 
                item1='Boost Your Score?' 
                item2='Review personalized tips for recovery.' 
                className1='font-semibold text-lg' 
                className2='text-muted'/>
            
            <Flex className='p-4 rounded-full bg-card'>
                <Sparkles size={20} className='text-primary' />
            </Flex>
        </Flex>
    </FlexCol>
  )
}

export default IncentiveRoadMap;

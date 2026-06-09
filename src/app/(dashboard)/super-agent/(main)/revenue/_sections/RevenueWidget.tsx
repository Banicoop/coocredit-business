import { ColItem, PageHeader } from '@/components/ui/PageHeader';
import { Flex, FlexCol, Grid } from '@/components/ui/ui-layout';
import { Calendar } from 'lucide-react';
import React from 'react'

const RevenueWidget = () => {
  return (
    <Grid className='gap-4'>
        <PageHeader
            title='Revenue & Commission' 
            description='Financial performance tracking for Q3 2024'
            actions={[
            {
                label:'Last 30 Days',
                variant: 'secondary',
                icon: <Calendar size={16}/>
            },
            {
                label:'Export Report',
                variant: 'primary',

            },
            ]}
        />

        <Grid className='grid-cols-5 gap-4'>
            <FlexCol className='bg-primary p-5 rounded-lg col-span-2 gap-2.5'>
                <ColItem 
                    className=''
                    item1='Total Commission Earned' 
                    item2='₦ 4,820,000.00' 
                    className1='text-card/70'
                    className2='text-card font-bold text-[40px]'
                    />
                
                <Flex className='gap-4'>
                    <ColItem 
                        className='border-r border-r-card/70 px-4'
                        item1='LAST MONTH' 
                        item2='₦ 1,240,000' 
                        className1='text-card/70'
                        className2='text-card font-bold '
                        />
                    <ColItem 
                        className='px-4'
                        item1='ACTIVE DEALS' 
                        item2='18 Loans' 
                        className1='text-card/70'
                        className2='text-card font-bold'
                        />
                </Flex>
            </FlexCol>
        </Grid>
    </Grid>
  )
}

export default RevenueWidget;

import { CustomBarChart } from '@/components/charts/CustomBarChart';
import Typography from '@/components/primitives/Typography';
import { ColItem } from '@/components/ui/PageHeader';
import { Flex } from '@/components/ui/ui-layout';
import { cn } from '@/lib/utils';
import React from 'react'


const BarTitle = () => (
    <Flex className='justify-between w-full'>
        <ColItem 
            item1='Onboarding Trends' 
            item2='Weekly user activation rates'
            className1='text-primary2 font-semibold text-[20px]'
            className2='text-ring'
        />
        <Flex className='gap-2'>
            <Typography variant='small' color='active' weight='semibold' startIcon={<div className='w-2 h-2 rounded-full bg-[#0053CC]'/>}>DIRECT</Typography>
            <Typography variant='small' weight='semibold' color='primary' startIcon={<div className='w-2 h-2 rounded-full bg-[#DBE9FE]'/>}>REFERRAL</Typography>
        </Flex>
    </Flex>
)

const data = [
  {
    name: 'Mon',
    referral: 4000,
    direct: 2400,
  },
  {
    name: 'Tues',
    referral: 3000,
    direct: 1398,
  },
  {
    name: 'Wed',
    referral: 2000,
    direct: 9800,
  },
  {
    name: 'Thurs',
    referral: 2780,
    direct: 3908,
  },
  {
    name: 'Fri',
    referral: 2000,
    direct: 9800,
  },
  {
    name: 'Sat',
    referral: 2780,
    direct: 3908,
  },
  {
    name: 'Sun',
    referral: 2780,
    direct: 3908,
  },
]

const OnBoardingChart = ({className}: {className: string}) => {
  return (
    <CustomBarChart 
        className={cn(className)}
        xDataKey="name"
        data={data}
        height={250}
        showLegend={false}
        showYAxis={false}
        title={<BarTitle/>}
        barSize={40}
            bars={[
            {
                dataKey: 'direct',
                label: 'Direct',
                color: '#0053CC',
                stackId: 'name',
                radius: [0, 0 , 0, 0],
            },
            {
                dataKey: 'referral',
                label: 'Referral',
                color: '#DBE9FE',
                stackId: 'name',
                radius: [0, 0 , 0, 0],
            },
            ]}
    />
  )
}

export default OnBoardingChart;

import { CustomBarChart } from '@/components/charts/CustomBarChart';
import Typography from '@/components/primitives/Typography';
import { Flex, Grid } from '@/components/ui/ui-layout';
import React from 'react';
import ApprBreakDown from './ApprBreakDown';

const data = [
  {
    name: 'Jan',
    submitted: 4000,
    approved: 2400,
  },
  {
    name: 'Feb',
    submitted: 3000,
    approved: 1398,
  },
  {
    name: 'Mar',
    submitted: 2000,
    approved: 9800,
  },
  {
    name: 'Apr',
    submitted: 2780,
    approved: 3908,
  },
  {
    name: 'May',
    submitted: 2000,
    approved: 9800,
  },
  {
    name: 'Jun',
    submitted: 2780,
    approved: 3908,
  },
]

const BarTitle = () => (
  <Flex className='w-full justify-between'>
    <Typography variant='h4' weight='bold' font='manrope'>Customer Onboarding Trend</Typography>
    <Flex className='gap-2'>
      <Typography startIcon={<div className='w-3 h-3 bg-[#0053CC] rounded-full' />} className='text-[#0053CC]'>Submitted</Typography>
      <Typography startIcon={<div className='w-3 h-3 bg-[#DBE9FE] rounded-full' />} className='text-[#DBE9FE]'>Approved</Typography>
    </Flex>
  </Flex>
)

const CustomerCharts = () => {
  return (
    <Grid className='md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <CustomBarChart 
          className='lg:col-span-2'
          data={data} 
          title={<BarTitle/>}
            xDataKey="name"
            height={400}
            showLegend={false}
            showXAxis={false}
            showYAxis={false}
              bars={[
                {
                  dataKey: 'submitted',
                  label: 'Submitted',
                  color: '#0053CC',
                  stackId: 'total',
                  radius: [0, 0 , 0, 0],
                },
                {
                  dataKey: 'approved',
                  label: 'Approved',
                  color: '#DBE9FE',
                  stackId: 'total',
                },
              ]}
          />
        <ApprBreakDown/>
    </Grid>
  )
}

export default CustomerCharts;

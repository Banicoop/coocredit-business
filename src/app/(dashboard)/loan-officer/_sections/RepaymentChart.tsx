import { CustomBarChart } from '@/components/charts/CustomBarChart';
import Typography from '@/components/primitives/Typography';
import { Tabs } from '@/components/ui/Tabs';
import { FlexCol } from '@/components/ui/ui-layout';
import { cn } from '@/lib/utils';
import React from 'react';

const tabs = [
    {
        label: 'Weekly',
        value: 'weekly'
    },
    {
        label: 'Monthly',
        value: 'monthly'
    },
]

const BarTitle = () => (
    <FlexCol className='md:flex-row md:justify-between gap-2.5 w-full'>
        <FlexCol>
            <Typography weight='semibold'>Repayment Activity</Typography>
            <Typography color='primary'>Repayment volume vs forecast (Last 30 days)</Typography>
        </FlexCol>

        <Tabs items={tabs} defaultValue='weekly'/>
    </FlexCol>
)

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

const RepaymentChart = ({className}: {className: string}) => {

  return (
    <CustomBarChart
        className={cn('', className)}
        data={data} 
        title={<BarTitle/>}
        xDataKey="name"
        height={250}
        showLegend={false}
        showYAxis={false}
        barSize={40}
            bars={[
            {
                dataKey: 'approved',
                label: 'Repayment',
                color: '#0053CC',
                radius: [0, 0 , 0, 0],
            },
            {
                dataKey: 'submitted',
                label: 'Forcast',
                color: '#DBE9FE',
                radius: [0, 0 , 0, 0],
            },
            ]}
        />
  )
}

export default RepaymentChart;

import { CustomBarChart } from '@/components/charts/CustomBarChart';
import CustomPieChart from '@/components/charts/CustomPiechart';
import Typography from '@/components/primitives/Typography';
import { Flex, Grid } from '@/components/ui/ui-layout';
import React from 'react'

const BarTitle = () => (
    <Flex className='justify-between w-full'>
        <Typography weight='semibold' color='primary2'>Loan Volume Trend</Typography>
        <Typography font='manrope' startIcon={<div className='w-2 h-2 rounded-full bg-primary'/>}>Commission</Typography>
    </Flex>
)

const PieFooter = () => (
    <Grid className='gap-2.5'>
        <Flex className='justify-between bg-accent p-2.5 rounded-md'>
            <Typography startIcon={<div className='w-2 h-2 rounded-full bg-primary'/>}>Performing</Typography>
            <Typography weight='semibold' color='primary2'>₦ 2.4M</Typography>
        </Flex>
        <Flex className='justify-between bg-accent p-2.5 rounded-md'>
            <Typography startIcon={<div className='w-2 h-2 rounded-full bg-[#0053CC]'/>}>In Progress</Typography>
            <Typography weight='semibold' color='primary2'>₦ 1.2M</Typography>
        </Flex>
        <Flex className='justify-between bg-accent p-2.5 rounded-md'>
            <Typography startIcon={<div className='w-2 h-2 rounded-full bg-[#BA1A1A]'/>}>Default Risk</Typography>
            <Typography weight='semibold' color='primary2'>₦ 45k</Typography>
        </Flex>
    </Grid>
)


const data = [
  {
    name: 'Jan',
    amount: 4000,
  },
  {
    name: 'Feb',
    amount: 3000,
  },
  {
    name: 'March',
    amount: 2000,
  },
  {
    name: 'Apr',
    amount: 2780,
  },
  {
    name: 'May',
    amount: 2000,
  },
  {
    name: 'Jun',
    amount: 2000,
  },
  {
    name: 'Jul',
    amount: 2000,
  }
]

const data2 = [
  { name: 'Performing', value: 100, fill: "#DBE9FE" },
  { name: 'In Progress', value: 200, fill: "#0053CC" }, 
  { name: 'Default Risk', value: 50, fill: "#BA1A1A" }
]

const RevenueCharts = () => {
  return (
    <Grid className='md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <CustomBarChart 
            className='lg:col-span-2'
            xDataKey='name'
            data={data}
            title={<BarTitle/>}
            showLegend={false}
            showYAxis={false}
            bars={[
                {
                dataKey: 'amount',
                label: 'Commission',
                color: '#0053CC',
                radius: [0, 0 , 0, 0],
                }
            ]}
        />
        <CustomPieChart
            className=''
            data={data2}
            title={<Typography color='primary2' weight='semibold' variant='p'>Portfolio Health</Typography>}
            footer={<PieFooter/>}
            />
    </Grid>
  )
}

export default RevenueCharts;

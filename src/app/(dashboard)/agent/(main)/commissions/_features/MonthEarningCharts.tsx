import { CustomBarChart } from '@/components/charts/CustomBarChart';
import CustomPieChart from '@/components/charts/CustomPiechart';
import Typography from '@/components/primitives/Typography';
import { Flex, FlexCol, Grid } from '@/components/ui/ui-layout';

const data = [
  {
    name: 'Jan',
    pending: 4000,
    completed: 2400,
  },
  {
    name: 'Feb',
    pending: 3000,
    completed: 1398,
  },
  {
    name: 'Mar',
    pending: 2000,
    completed: 9800,
  },
  {
    name: 'Apr',
    pending: 2780,
    completed: 3908,
  },
  {
    name: 'May',
    pending: 2000,
    completed: 9800,
  },
  {
    name: 'Jun',
    pending: 2780,
    completed: 3908,
  },
]

const data2 = [
  { name: 'Completed', value: 100, fill: "#0053CC" },
  { name: 'Pending', value: 200, fill: "#DBE9FE" }, 
]

const BarTitle = () => (
    <FlexCol className='md:flex-row justify-between md:items-center w-full gap-4'>
        <Typography variant='h3'>Monthly Earnings</Typography>
        <Flex className='gap-2'>
            <Typography className='text-[#E5EFFF]' startIcon={<div className='w-3 h-3 bg-[#E5EFFF]'/>}>Pending Payout</Typography>
            <Typography weight='semibold' color='active' startIcon={<div className='w-3 h-3 bg-[#0053CC]'/>}>Completed Payout</Typography>
        </Flex>
    </FlexCol>
)

const PieFooter = () => (
    <FlexCol className='gap-2'>
        <Typography 
            color='active' 
            startIcon={<div className='w-3 h-3 rounded-full bg-[#0053CC]'/>}>Completed Payout</Typography>
        <Typography 
            className='text-[#E5EFFF]'
            startIcon={<div className='w-3 h-3 rounded-full bg-[#E5EFFF]'/>}>Pending Payout</Typography>
    </FlexCol>
)


const MonthEarningCharts = () => {
  return (
    <Grid className='gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <CustomBarChart 
            className='lg:col-span-2'
            title={<BarTitle/>}
            data={data} 
            height={350} 
            showLegend={false} 
            showYAxis={false}
            xDataKey='name'
            barSize={45}
                bars={[
                    {
                        dataKey: 'completed',
                        label: 'Complete Payout',
                        color: '#0053CC',
                        stackId: 'commissions'
                    },
                    {
                        dataKey: 'pending',
                        label: 'Pending',
                        color: '#E5EFFF',
                        stackId: 'commissions'
                    },
                ]}
        />
        <CustomPieChart 
            data={data2} 
            title={<Typography variant='h5' weight='semibold'>Commision Tracker</Typography>} 
            footer={<PieFooter/>}/>
    </Grid>
  )
}

export default MonthEarningCharts;
